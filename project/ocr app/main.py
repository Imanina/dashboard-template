from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, HTMLResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi import Request
import pytesseract
from PIL import Image
import io
import spacy
import re
from typing import Dict, List
import uvicorn
import os
import logging
import cv2
import numpy as np
from PyPDF2 import PdfReader
import pandas as pd
from datetime import datetime
import requests
import json

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Invoice OCR and NER API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create templates directory if it doesn't exist
os.makedirs("templates", exist_ok=True)

# Mount static files and templates
templates = Jinja2Templates(directory="templates")

# Load spaCy model
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    print("Downloading spaCy model...")
    spacy.cli.download("en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")

# Supabase configuration
SUPABASE_URL = "https://tptzziuyxrhlvzizydyu.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwdHp6aXV5eHJobHZ6aXp5ZHl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1OTQ3ODksImV4cCI6MjA2MDE3MDc4OX0.wb2enR3_Nn3A4COFLvJLuBbExQQN2z3cueuqPKy3mKc"

def get_headers():
    """Get headers for Supabase API requests."""
    return {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json"
    }

def get_training_data():
    """Fetch training data from Supabase."""
    try:
        url = f"{SUPABASE_URL}/rest/v1/invoice_training_data"
        response = requests.get(url, headers=get_headers())
        response.raise_for_status()
        return response.json()
    except Exception as e:
        logger.error(f"Error fetching training data: {str(e)}")
        return []

def preprocess_image(image):
    """Preprocess image to improve OCR accuracy."""
    # Convert PIL Image to OpenCV format
    img = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
    
    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Apply adaptive thresholding
    gray = cv2.adaptiveThreshold(
        gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2
    )
    
    # Apply dilation to connect text components
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3,3))
    gray = cv2.dilate(gray, kernel, iterations=1)
    
    # Apply erosion to remove noise
    gray = cv2.erode(gray, kernel, iterations=1)
    
    # Apply median blur to remove noise
    gray = cv2.medianBlur(gray, 3)
    
    # Increase contrast
    gray = cv2.convertScaleAbs(gray, alpha=1.5, beta=0)
    
    # Convert back to PIL Image
    return Image.fromarray(gray)

def extract_with_spacy_regex(text: str) -> Dict:
    """Extract information using spaCy and regex patterns."""
    logger.info("Starting spaCy and regex extraction...")
    result = {
        "document_code": None,
        "invoice_date_time": None,
        "supplier_name": None,
        "supplier_tin": None,
        "supplier_address": None,
        "buyer_name": None,
        "buyer_tin": None,
        "buyer_address": None
    }
    
    try:
        # Process with spaCy
        doc = nlp(text)
        logger.info(f"Processed text with spaCy, found {len(doc.ents)} entities")
        
        # Extract dates using spaCy
        for ent in doc.ents:
            if ent.label_ == "DATE":
                result["invoice_date_time"] = ent.text
                logger.info(f"Found date: {ent.text}")
        
        # Common patterns for invoice data
        patterns = {
            "document_code": r"(?i)(?:invoice|doc|document|receipt)(?:\s+(?:no|number|#|\.\s*no))?[\s#:]+([A-Z0-9-]+)",
            "supplier_tin": r"(?i)(?:supplier|company|vendor|seller)[\s:]+(?:TIN|Tax\s+(?:ID|Number)|Income\s+Tax\s+Number)[\s:]+([A-Z0-9-]+)",
            "buyer_tin": r"(?i)(?:buyer|company|customer|client)[\s:]+(?:TIN|Tax\s+(?:ID|Number)|Income\s+Tax\s+Number)[\s:]+([A-Z0-9-]+)",
            "supplier_name": r"(?i)(?:supplier|company|vendor|seller|bill\s+from)[\s:]+(?:name|company)[\s:]+([A-Za-z0-9\s.,]+)",
            "buyer_name": r"(?i)(?:buyer|company|customer|client|bill\s+to)[\s:]+(?:name|company)[\s:]+([A-Za-z0-9\s.,]+)",
            "supplier_address": r"(?i)(?:supplier|company|seller|vendor)[\s:]+(?:address|location)[\s:]+([A-Za-z0-9\s.,]+)",
            "buyer_address": r"(?i)(?:buyer|company|customer)[\s:]+(?:address|location)[\s:]+([A-Za-z0-9\s.,]+)"
        }
        
        # Apply regex patterns
        for field, pattern in patterns.items():
            match = re.search(pattern, text)
            if match:
                result[field] = match.group(1).strip()
                logger.info(f"Found {field}: {result[field]}")
        
        logger.info("Completed spaCy and regex extraction")
        return result
    except Exception as e:
        logger.error(f"Error in spaCy and regex extraction: {str(e)}")
        return result

def extract_with_training_data(text: str) -> Dict:
    """Extract information using training data from Supabase."""
    logger.info("Starting training data extraction...")
    result = {
        "document_code": None,
        "invoice_date_time": None,
        "supplier_name": None,
        "supplier_tin": None,
        "supplier_address": None,
        "buyer_name": None,
        "buyer_tin": None,
        "buyer_address": None
    }
    
    try:
        # Get training data from Supabase
        training_data = get_training_data()
        logger.info(f"Retrieved {len(training_data)} training examples from Supabase")
        
        if not training_data:
            logger.info("No training data found in Supabase.")
            return result
        
        # Try to match patterns from training data
        for training_item in training_data:
            training_entities_data = training_item.get("entities")
            if isinstance(training_entities_data, str):
                try:
                    training_entities = json.loads(training_entities_data).get("entities", [])
                except json.JSONDecodeError:
                    logger.error(f"Error decoding JSON entities from training data: {training_entities_data}")
                    training_entities = []
            elif isinstance(training_entities_data, dict):
                training_entities = training_entities_data.get("entities", [])
            else:
                logger.warning(f"Unexpected format for entities in training data: {training_entities_data}")
                training_entities = []
            
            logger.info(f"Processing {len(training_entities)} entities from training data")
            
            for entity in training_entities:
                entity_type = entity.get("type")
                entity_text = entity.get("text")
                entity_variations = entity.get("variations", []) # Get variations, default to empty list
                entity_labels = entity.get("labels", []) # Get labels, default to empty list

                if not entity_type:
                    continue

                # --- Attempt to match using full text/variations ---
                texts_to_match = [entity_text] if entity_text else []
                if isinstance(entity_variations, list):
                     texts_to_match.extend([v for v in entity_variations if isinstance(v, str)])

                if not texts_to_match and not entity_labels: # Also check if labels exist
                    logger.warning(f"Entity of type {entity_type} has no text, variations, or labels to match.")
                    continue

                logger.info(f"Attempting to match type '{entity_type}' with texts: {texts_to_match} and labels: {entity_labels}")

                found_match = False
                matched_value = None # Variable to store the extracted value

                # First, try matching full text/variations
                for text_to_match in texts_to_match:
                    cleaned_text = text_to_match.strip()
                    if not cleaned_text: continue

                    # Existing pattern logic (simplified for clarity here, actual regex from previous step is used)
                    # This part remains largely the same as the previous modification
                    # It handles cases like 'Label: Value' or just 'Value'
                    match_label_value = re.match(r'(.+?)[:\.\s#]+(.+)', cleaned_text) # Look for 'Label' followed by :, ., space, or #, then 'Value'

                    if match_label_value:
                        label_part = re.escape(match_label_value.group(1).strip())
                        value_part = re.escape(match_label_value.group(2).strip())
                        pattern = r'(?i)' + label_part + r'[\s:\.\s#]+' + value_part # Case-insensitive, flexible separator
                    else:
                         pattern = r'(?i)' + re.escape(cleaned_text)

                    # Add word boundaries if appropriate
                    if pattern and pattern[3:].isalnum(): # Check if pattern (after (?i)) is alphanumeric
                         pattern = r'\b' + pattern[3:] + r'\b'
                         pattern = r'(?i)' + pattern # Add case-insensitive flag back

                    logger.info(f"Trying pattern from text/variation: '{pattern}'")
                    match = re.search(pattern, text, re.IGNORECASE)

                    if match:
                         matched_value = match.group(0).strip() # Capture and strip the full matched text
                         logger.info(f"Match found for text/variation pattern '{pattern}': {matched_value}")
                         found_match = True
                         break # Found a match using text/variation, no need to try others or labels

                # If no match found yet, attempt to match using labels
                if not found_match and isinstance(entity_labels, list):
                    logger.info(f"No match found with text/variations. Trying with labels: {entity_labels}")
                    for label in entity_labels:
                        cleaned_label = label.strip()
                        if not cleaned_label: continue

                        # Create pattern to match label and capture the following value
                        # Pattern: word boundary, escaped label, flexible separator, capturing group for value
                        pattern = r'(?i)\b' + re.escape(cleaned_label) + r'[\s:\.\s#]+(.+)'

                        logger.info(f"Trying pattern from label: '{pattern}'")
                        match = re.search(pattern, text, re.IGNORECASE)

                        if match and match.group(1): # Check if pattern matched AND captured a value
                            matched_value = match.group(1).strip() # Capture and strip the value from group 1
                            logger.info(f"Match found for label pattern '{pattern}', extracted value: {matched_value}")
                            found_match = True
                            break # Found a match using a label, no need to try other labels


                # Assign the matched value if found
                if found_match and matched_value is not None:
                     # Assign the found value to the result dictionary
                     # Ensure the key is lowercase to match the result dict structure
                     result_key = entity_type.lower()
                     if result_key in result and not result[result_key]: # Only assign if the field is still None
                         result[result_key] = matched_value
                         logger.info(f"Assigned extracted value for {entity_type}: {matched_value}")

                # If a match was found and assigned, move to the next entity
                if found_match:
                     continue # Move to the next entity type
        
        logger.info("Completed training data extraction")
        return result
    except Exception as e:
        logger.error(f"Error in training data extraction: {str(e)}")
        return result

def extract_combined(text: str) -> Dict:
    """Extract information using both spaCy/regex and training data approaches."""
    spacy_regex_result = extract_with_spacy_regex(text)
    training_data_result = extract_with_training_data(text)
    
    # Combine results, preferring training data matches
    combined_result = spacy_regex_result.copy()
    for key in combined_result:
        if training_data_result[key]:
            combined_result[key] = training_data_result[key]
    
    return combined_result

@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/process-invoice/")
async def process_invoice(file: UploadFile = File(...)):
    """
    Process an invoice image or PDF and extract relevant information using multiple approaches.
    """
    try:
        logger.info(f"Processing file: {file.filename}")
        contents = await file.read()
        file_extension = file.filename.split('.')[-1].lower()
        
        if file_extension == 'pdf':
            try:
                logger.info("Processing PDF file...")
                pdf_file = io.BytesIO(contents)
                pdf_reader = PdfReader(pdf_file)
                text = ""
                
                # Try to extract text directly from PDF
                for page in pdf_reader.pages:
                    page_text = page.extract_text()
                    if page_text:
                        text += page_text + "\n"
                
                # If no text was extracted, the PDF might be scanned
                if not text.strip():
                    logger.info("No text found in PDF, might be scanned. Using OCR...")
                    # Convert first page to image for OCR
                    first_page = pdf_reader.pages[0]
                    # Convert PDF to image
                    image = Image.open(io.BytesIO(contents))
                    # Preprocess image
                    processed_image = preprocess_image(image)
                    # Use custom OCR configuration
                    custom_config = r'--oem 3 --psm 6 -c preserve_interword_spaces=1'
                    text = pytesseract.image_to_string(processed_image, config=custom_config)
                
                logger.info(f"Extracted text from PDF: {text[:200]}...")  # Log first 200 chars
                
            except Exception as e:
                logger.error(f"Error processing PDF: {str(e)}")
                raise HTTPException(status_code=500, detail=f"Error processing PDF: {str(e)}")
        elif file_extension in ['jpg', 'jpeg', 'png']:
            try:
                logger.info("Processing image file...")
                image = Image.open(io.BytesIO(contents))
                # Preprocess image
                processed_image = preprocess_image(image)
                # Use custom OCR configuration
                custom_config = r'--oem 3 --psm 6 -c preserve_interword_spaces=1'
                text = pytesseract.image_to_string(processed_image, config=custom_config)
                logger.info(f"Extracted text from image: {text[:200]}...")  # Log first 200 chars
            except Exception as e:
                logger.error(f"Error processing image: {str(e)}")
                raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format")
        
        if not text.strip():
            logger.error("No text was extracted from the document")
            raise HTTPException(status_code=400, detail="No text could be extracted from the document")

        # Ensure text is a string
        if isinstance(text, bytes):
            text = text.decode("utf-8", errors="replace")

        # Process the extracted text using all three approaches
        logger.info("Starting text processing with all three models...")
        spacy_regex_data = extract_with_spacy_regex(text)
        training_data = extract_with_training_data(text)
        combined_data = extract_combined(text)
        
        logger.info("Completed all processing. Preparing response...")
        
        # Save results to Supabase
        save_data = {
            "invoice_filename": file.filename,
            "extracted_text": text,
            "spacy_regex_results": spacy_regex_data,
            "training_data_results": training_data,
            "combined_results": combined_data,
            # Initially, edited_results will be the same as combined_results
            "edited_results": combined_data
        }
        
        save_url = f"{SUPABASE_URL}/rest/v1/processed_invoices"
        save_headers = get_headers()
        save_headers["Prefer"] = "return=representation"
        
        logger.info("Saving processed data to Supabase...")
        save_response = requests.post(save_url, json=save_data, headers=save_headers)
        save_response.raise_for_status() # Raise an HTTPError for bad responses (4xx or 5xx)
        
        # Get the latest records ordered by creation time
        get_url = f"{SUPABASE_URL}/rest/v1/processed_invoices?order=created_at.desc"
        get_response = requests.get(get_url, headers=get_headers())
        get_response.raise_for_status()
        
        saved_record = save_response.json()[0]
        invoice_id = saved_record.get("id")
        
        if not invoice_id:
            logger.error("Could not retrieve invoice ID after saving to Supabase.")
            # Continue without ID, but log a warning or raise an exception if crucial
        else:
            logger.info(f"Data saved to Supabase with ID: {invoice_id}")

        response_data = {
            "status": "success",
            "invoice_id": invoice_id, # Include the ID in the response
            "extracted_text": text,
            "results": {
                "spacy_regex_model": spacy_regex_data,
                "training_data_model": training_data,
                "combined_model": combined_data
            }
        }
        logger.info(f"Response prepared: {json.dumps(response_data, indent=2)}")
        
        return response_data
        
    except Exception as e:
        logger.error(f"Error processing invoice: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/export-excel/")
async def export_excel(data: Dict):
    """
    Export processed invoice data to Excel format.
    """
    try:
        # Create a DataFrame from the processed data
        df = pd.DataFrame([data["processed_data"]])
        
        # Create a BytesIO object to store the Excel file
        output = io.BytesIO()
        
        # Write the DataFrame to Excel
        with pd.ExcelWriter(output, engine='openpyxl') as writer:
            df.to_excel(writer, sheet_name='Invoice Data', index=False)
            
            # If there are items, create a separate sheet for them
            if data["processed_data"].get("items"):
                items_df = pd.DataFrame(data["processed_data"]["items"])
                items_df.to_excel(writer, sheet_name='Line Items', index=False)
        
        # Set the pointer to the beginning of the BytesIO object
        output.seek(0)
        
        # Generate filename with timestamp
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"invoice_data_{timestamp}.xlsx"
        
        # Return the Excel file as a streaming response
        return StreamingResponse(
            output,
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
        
    except Exception as e:
        logger.error(f"Error exporting to Excel: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error exporting to Excel: {str(e)}")

@app.post("/save-training-example/")
async def save_training_example(data: Dict):
    """Save a new training example to Supabase."""
    try:
        training_data = {
            "invoice_text": data["invoice_text"],
            "entities": json.dumps(data["entities"])
        }
        
        url = f"{SUPABASE_URL}/rest/v1/invoice_training_data"
        response = requests.post(url, json=training_data, headers=get_headers())
        response.raise_for_status()
        
        return JSONResponse(content={
            "status": "success",
            "training_data_id": response.json()[0]["id"]
        })
        
    except Exception as e:
        logger.error(f"Error saving training example: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/edit-model-results/")
async def edit_model_results(data: Dict):
    """
    Edit the extracted results for a specific model and save to Supabase.
    
    Expected input format:
    {
        "invoice_id": "uuid_string",
        "model_type": "spacy_regex_model" | "training_data_model" | "combined_model",
        "field_updates": {
            "field_name": "new_value"
        }
    }
    """
    try:
        logger.info("Received model results edit request")
        logger.info(f"Request data: {json.dumps(data, indent=2)}")

        if not isinstance(data, dict):
            raise HTTPException(status_code=400, detail="Input must be a dictionary")

        required_fields = ["invoice_id", "model_type", "field_updates"]
        for field in required_fields:
            if field not in data:
                raise HTTPException(status_code=400, detail=f"Missing '{field}' in request")

        invoice_id = data["invoice_id"]
        model_type = data["model_type"]
        field_updates = data["field_updates"]

        # Validate model type
        valid_models = ["spacy_regex_model", "training_data_model", "combined_model"]
        if model_type not in valid_models:
            raise HTTPException(status_code=400, detail=f"Invalid model type. Must be one of: {', '.join(valid_models)}")

        # Validate field updates (basic type check - can be enhanced)
        # For simplicity, assuming all editable fields are strings for now
        # You might want more specific validation based on field name
        for field, value in field_updates.items():
             if not isinstance(value, (str, type(None))):
                 raise HTTPException(status_code=400, detail=f"Invalid type for field {field}. Expected string or null.")

        # --- Fetch, Update, and Save to Supabase ---

        # 1. Fetch the current record from Supabase
        fetch_url = f"{SUPABASE_URL}/rest/v1/processed_invoices?id=eq.{invoice_id}"
        logger.info(f"Fetching record from: {fetch_url}")
        fetch_response = requests.get(fetch_url, headers=get_headers())
        fetch_response.raise_for_status()

        records = fetch_response.json()

        if not records:
            logger.error(f"No record found with ID: {invoice_id}")
            raise HTTPException(status_code=404, detail=f"Invoice with ID {invoice_id} not found")

        current_record = records[0]

        # 2. Update the specific model's results in the record with field_updates
        # We will update the 'edited_results' field with the new values
        # If you intended to update the specific model's results (e.g., 'spacy_regex_results'),
        # the logic here would need to be adjusted.
        edited_results = current_record.get("edited_results", {}) # Get existing edited results or an empty dict

        # Apply updates to the edited_results. Prioritize fields from field_updates.
        # Ensure existing fields not in field_updates are kept if needed, though currently
        # the frontend sends all fields back in updatedData.
        updated_edited_results = edited_results.copy() # Start with current edited results
        updated_edited_results.update(field_updates) # Apply the new updates

        # 3. Prepare data for the update request to Supabase
        update_data = {
            "edited_results": updated_edited_results
        }

        # 4. Send the update request to Supabase
        update_url = f"{SUPABASE_URL}/rest/v1/processed_invoices?id=eq.{invoice_id}"
        logger.info(f"Updating record at: {update_url} with data: {json.dumps(update_data, indent=2)}")
        update_headers = get_headers()
        update_headers["Prefer"] = "return=representation"
        update_response = requests.patch(update_url, json=update_data, headers=update_headers)
        update_response.raise_for_status() # Raise an HTTPError for bad responses

        updated_record = update_response.json()[0]

        logger.info(f"Record with ID {invoice_id} updated successfully in Supabase.")

        # --- End Fetch, Update, and Save ---

        response_content = {
            "status": "success",
            "invoice_id": invoice_id,
            "model_type": model_type,
            "updated_fields": field_updates, # Return the fields that were updated
            "full_edited_results": updated_edited_results # Optionally return the full updated edited results
        }

        logger.info(f"Model results edit response prepared: {json.dumps(response_content, indent=2)}")
        return JSONResponse(content=response_content)

    except HTTPException as he:
        logger.error(f"HTTP Exception in edit model results endpoint: {str(he)}")
        raise he
    except Exception as e:
        logger.error(f"Error in edit model results endpoint: {str(e)}")
        logger.error(f"Error details: {type(e).__name__}")
        import traceback
        logger.error(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
