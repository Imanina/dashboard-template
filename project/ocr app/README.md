# OCR and NER Classification Project

This project combines Optical Character Recognition (OCR) with Named Entity Recognition (NER) for document processing and classification.

## Setup Instructions

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
- Windows:
```bash
.\venv\Scripts\activate
```
- Linux/Mac:
```bash
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Install Tesseract OCR:
- Windows: Download and install from https://github.com/UB-Mannheim/tesseract/wiki
- Linux: `sudo apt-get install tesseract-ocr`
- Mac: `brew install tesseract`

5. Download spaCy model:
```bash
python -m spacy download en_core_web_sm
```

## Project Structure
- `main.py`: Main application file
- `requirements.txt`: Python dependencies
- `README.md`: Project documentation

## Usage
Run the main application:
```bash
python main.py
``` 