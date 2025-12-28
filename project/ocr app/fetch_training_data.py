import os
import json
import requests
import sys

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
    """Fetch all training data from Supabase."""
    try:
        url = f"{SUPABASE_URL}/rest/v1/invoice_training_data"
        print(f"Fetching training data from: {url}")
        
        response = requests.get(url, headers=get_headers())
        print(f"Response status code: {response.status_code}")
        
        response.raise_for_status()
        
        if response.text:
            data = response.json()
            print(f"Successfully fetched {len(data)} training examples")
            return data
        else:
            print("No training data found")
            return []
            
    except requests.exceptions.RequestException as e:
        print(f"Request error: {str(e)}")
        if hasattr(e.response, 'text'):
            print(f"Error response: {e.response.text}")
        return []
    except Exception as e:
        print(f"Error fetching training data: {str(e)}")
        return []

def main():
    # Fetch training data
    training_data = get_training_data()
    
    # Print the training data
    print("\nTraining Data:")
    for i, example in enumerate(training_data, 1):
        print(f"\nExample {i}:")
        print(f"Invoice Text: {example['invoice_text'][:100]}...")  # Print first 100 chars
        print("Entities:")
        # Check if entities is a string (needs parsing) or already a dict
        if isinstance(example['entities'], str):
            entities = json.loads(example['entities'])['entities']
        else:
            entities = example['entities']['entities']
            
        for entity in entities:
            print(f"  - {entity['type']}: {entity['text']}")

if __name__ == "__main__":
    main() 