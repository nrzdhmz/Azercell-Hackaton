import json
import random
import time

# Define possible values for each field
balance_values = [round(random.uniform(0, 10), 2) for _ in range(1000)]
packet_values = ['GencOl-3', 'GencOl-6', 'GencOl-9']
severity_values = ['Medium', 'Critical', 'High']
status_values = ['Resolved', 'Active']
fault_types = [
    "Signal Degradation",
    "Link Down",
    "Low Signal Strength",
    "Disk Failure",
    "Security Alert",
    "High Call Dropping Rate",
    "No Dial Tone",
    "Power Supply Failure",
    "Fiber Optic Cable Cut",
    "Incorrect Service Configuration",
    "High CPU Usage",
    "Line of Sight Obstruction"
]

# Predefined list of dates
date_values = [
    "2024-01-19", "2024-02-19", "2024-03-19", "2024-04-19", "2024-05-19",
    "2024-06-19", "2024-07-19", "2024-08-19", "2024-09-19", "2024-10-19"
]

# Predefined list of notes
notes_templates = [
    "Demo fault for illustration",
    "Issue resolved by replacing faulty component",
    "Fault identified through monitoring tools, cable repaired",
    "Customer reported slow internet speeds",
    "Disk monitoring system detected a failing drive",
    "Security system flagged a potential intrusion attempt",
    "Customer service reports increased call drop complaints",
    "Customer reported no dial tone, issue resolved through re-provisioning",
    "Network monitoring identified device outage, power supply replaced",
    "Outage reported, identified as fiber optic cable cut, repairs coordinated",
    "Customer reported missing channels, configuration corrected",
    "Monitoring system identified high CPU load on DNS server",
    "Alert triggered due to loss of signal on microwave link"
]

# Predefined list of root causes
root_causes = [
    "Hardware malfunction (identified)",
    "Cable damage (repaired)",
    "Line provisioning error (corrected)",
    "Human error during service activation (corrected)",
    "Third-party construction accident (repaired)",
    "N/A (investigating potential interference)",
    "N/A (undergoing diagnostics)",
    "N/A (investigating suspicious activity)",
    "N/A (investigating network congestion)",
    "N/A (investigating potential traffic surge)",
    "N/A (investigating potential weather interference)"
]

# Predefined list of estimated repair times
estimated_repair_times = [
    "1 hour (actual)",
    "4 hours (actual)",
    "1 hour (estimated)",
    "4 hours (estimated)",
    "30 minutes (actual)",
    "8 hours (actual)",
    "1 hour (actual)",
    "2 hours (estimated)",
    "30 minutes (actual)",
    "1 hour (actual)",
    "N/A",
    "8 hours (actual)",
    "1 hour (actual)",
    "4 hours (estimated)"
]

# Predefined list of impacts
impacts = [
    "Reduced network coverage, dropped calls",
    "Complete loss of connectivity for affected devices",
    "Complete loss of internet connectivity for affected devices",
    "Slower data transfer speeds, potential outages",
    "Reduced internet speeds, potential connection drops",
    "Potential service outages, data loss risk",
    "Potential unauthorized access attempts",
    "Frequent call interruptions for customers",
    "Customers unable to make outgoing calls",
    "Loss of connectivity for remote network sites",
    "Widespread service outages for multiple customers",
    "Customer not receiving subscribed services",
    "Slow website loading times, potential service disruptions",
    "Loss of connectivity for remote network sites"
]

# Predefined list of device names
device_names = [
    "Cell Tower CT-202",
    "Switch SW-305",
    "Fiber Optic Cable FIBER-001",
    "Customer CPE-1234",
    "Server SVR-007",
    "Firewall FW-999",
    "Voice Gateway VG-100",
    "Customer CPE-5678",
    "Router RTR-202",
    "Backbone Network",
    "Customer CPE-9012",
    "DNS Server DNS-01",
    "Microwave Link MWNK-Link1"
]

# Function to generate a single JSON object with fixed and random fields
def generate_customer_data():
    # Generate random fields
    balance = random.choice(balance_values)
    packet = random.choice(packet_values)
    severity = random.choices(severity_values, weights=[0.65, 0.05, 0.30])[0]
    status = random.choices(status_values, weights=[0.8, 0.2])[0]
    date_time = random.choice(date_values)
    fault_type = random.choice(fault_types)
    
    # Generate random values for new fields
    customer_id = random.randint(1000, 2000)
    churn = random.choices(['Yes', 'No'], weights=[0.45, 0.55])[0]
    contract_type = random.choice(['Postpaid', 'Prepaid'])
    data_usage_gb = random.randint(0, 12)
    minutes = random.randint(0, 98)
    auto_renewal = random.choice([True, False])
    
    # Randomly select values for additional fields
    root_cause = random.choice(root_causes)
    estimated_repair_time = random.choice(estimated_repair_times)
    impact = random.choice(impacts)
    device_name = random.choice(device_names)
    
    # Randomly select a notes template
    notes = random.choice(notes_templates)
    
    # Prepare JSON object with specific keys
    customer_data = {"CustomerID": customer_id,"ContractType": contract_type,"DataUsageGB": data_usage_gb,"Churn": churn,
        "packet": packet,"minutes": minutes,"balance": balance,"autoRenewal": auto_renewal,"deviceName": device_name,
        "faultType": fault_type,"dateTime": date_time,"severity": severity,"impact": impact,"status": status,
        "estimatedRepairTime": estimated_repair_time,"rootCause": root_cause,"notes": notes}
    
    return customer_data

# Main function to generate data and write to JSON file
def generate_initial_data():
    data = []
    
    # Generate 1000 JSON objects
    for _ in range(500):
        customer_data = generate_customer_data()
        data.append(customer_data)
    
    # Write initial data to JSON file with the entire data as an array
    file_path = 'data.json'
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=2)
    
    print(f"Generated {len(data)} initial records and saved to {file_path}.")
    
    return data

# Function to continuously append data every 10 seconds
def append_data_continuously():
    # Generate initial batch of data
    data = generate_initial_data()
    
    while True:
        # Wait for 10 seconds
        time.sleep(10)
        
        # Generate new data object
        new_customer_data = generate_customer_data()
        
        # Append new data to existing data list
        data.append(new_customer_data)
        
        # Append new data to JSON file
        with open('data.json', 'w') as f:
            json.dump(data, f, indent=2)
        
        print(f"Appended new record to {len(data)} records in total.")

# Main execution
if __name__ == "__main__":
    append_data_continuously()
