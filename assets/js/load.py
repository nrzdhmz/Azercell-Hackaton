import json
import random

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

# Generate 1000 JSON objects with specific keys including "dateTime" and "faultType"
data = []
for i in range(1000):
    balance = balance_values[i]
    packet = random.choice(packet_values)
    # Adjusting severity distribution
    severity = random.choices(severity_values, weights=[0.65, 0.05, 0.30])[0]
    # Adjusting status distribution
    status = random.choices(status_values, weights=[0.8, 0.2])[0]
    date_time = random.choice(date_values)  # Randomly select date from date_values
    fault_type = random.choice(fault_types)  # Randomly select fault type
    
    # Prepare JSON object with specific keys
    customer_data = {
        "balance": balance,
        "packet": packet,
        "severity": severity,
        "status": status,
        "dateTime": date_time,
        "faultType": fault_type
    }
    
    data.append(customer_data)

# Write data to a new JSON file
file_path = 'generated_data.json'
with open(file_path, 'w') as f:
    json.dump(data, f, indent=2)

print(f"Generated {len(data)} records and saved to {file_path}.")
