from supabase import create_client, Client
import json

# Initialize Supabase client with your credentials
supabase: Client = create_client(
    "https://tptzziuyxrhlvzizydyu.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwdHp6aXV5eHJobHZ6aXp5ZHl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1OTQ3ODksImV4cCI6MjA2MDE3MDc4OX0.wb2enR3_Nn3A4COFLvJLuBbExQQN2z3cueuqPKy3mKc"
)

def test_entity_types():
    """Test fetching entity types from Supabase."""
    try:
        result = supabase.table("entity_types").select("*").execute()
        print("\nEntity Types:")
        for entity in result.data:
            print(f"- {entity['name']}: {entity['description']}")
        return True
    except Exception as e:
        print(f"Error fetching entity types: {str(e)}")
        return False

def test_training_data():
    """Test fetching training data from Supabase."""
    try:
        result = supabase.table("invoice_training_data").select("*").execute()
        print("\nTraining Data:")
        for data in result.data:
            print(f"\nInvoice Text: {data['invoice_text'][:100]}...")
            entities = json.loads(data['entities'])['entities']
            print("Entities:")
            for entity in entities:
                print(f"- {entity['type']}: {entity['text']}")
        return True
    except Exception as e:
        print(f"Error fetching training data: {str(e)}")
        return False

def add_new_training_example():
    """Test adding a new training example."""
    try:
        new_example = {
            "invoice_text": """Document Code: INV00014
            Invoice Date & Time: 09/08/2024 04:30:15
            Supplier Name: Digital Solutions Sdn Bhd
            Supplier TIN: C456789123456
            Supplier Address: Suite 8, Digital Hub, 50088 Kuala Lumpur
            Buyer Name: John Lim
            Buyer TIN: IG987654321123
            Buyer Address: 78, Jalan Digital, 50100 Kuala Lumpur, Malaysia""",
            "entities": json.dumps({
                "entities": [
                    {"text": "INV00014", "type": "DOCUMENT_CODE", "start": 15, "end": 23},
                    {"text": "09/08/2024 04:30:15", "type": "INVOICE_DATETIME", "start": 45, "end": 64},
                    {"text": "Digital Solutions Sdn Bhd", "type": "SUPPLIER_NAME", "start": 80, "end": 105},
                    {"text": "C456789123456", "type": "SUPPLIER_TIN", "start": 120, "end": 133},
                    {"text": "Suite 8, Digital Hub, 50088 Kuala Lumpur", "type": "SUPPLIER_ADDRESS", "start": 152, "end": 190},
                    {"text": "John Lim", "type": "BUYER_NAME", "start": 203, "end": 212},
                    {"text": "IG987654321123", "type": "BUYER_TIN", "start": 224, "end": 238},
                    {"text": "78, Jalan Digital, 50100 Kuala Lumpur, Malaysia", "type": "BUYER_ADDRESS", "start": 250, "end": 290}
                ]
            })
        }
        
        result = supabase.table("invoice_training_data").insert(new_example).execute()
        print("\nSuccessfully added new training example!")
        print(f"New example ID: {result.data[0]['id']}")
        return True
    except Exception as e:
        print(f"Error adding new training example: {str(e)}")
        return False

if __name__ == "__main__":
    print("Testing Supabase Connection...")
    
    # Test entity types
    print("\n1. Testing Entity Types...")
    entity_types_success = test_entity_types()
    
    # Test training data
    print("\n2. Testing Training Data...")
    training_data_success = test_training_data()
    
    # Test adding new example
    print("\n3. Testing Adding New Training Example...")
    add_example_success = add_new_training_example()
    
    # Print summary
    print("\nTest Summary:")
    print(f"Entity Types Test: {'✓' if entity_types_success else '✗'}")
    print(f"Training Data Test: {'✓' if training_data_success else '✗'}")
    print(f"Add Example Test: {'✓' if add_example_success else '✗'}") 