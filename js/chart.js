import customerData from '../data.json' with {type: 'json'};

// console.log(customerData);
function countSeverityByDate(customers) {
  const countsByDate = {};
  
  customers.forEach(customer => {
    const date = customer.dateTime;
    if (!countsByDate[date]) {
      countsByDate[date] = {
        high: 0,
        medium: 0,
        critical: 0
      };
    }
    if (customer.severity === "High") {
      countsByDate[date].high++;
    } else if (customer.severity === "Medium") {
      countsByDate[date].medium++;
    } else if (customer.severity === "Critical") {
      countsByDate[date].critical++;
    }
  });
  
  const countsArray = Object.keys(countsByDate).map(date => ({
    date: date,
    high: countsByDate[date].high,
    medium: countsByDate[date].medium,
    critical: countsByDate[date].critical
  }));
  
  return countsArray;
}

const a = countSeverityByDate(customerData); // Assuming customerData is correctly parsed and available

const xValues = [
  "2024-01-19", "2024-02-19", "2024-03-19", "2024-04-19", "2024-05-19","2024-06-19", "2024-07-19", "2024-08-19", "2024-09-19", "2024-10-19"
];

// Verify 'a' array structure and length
// console.log(a);

new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{ 
      label: 'Medium',
      data: a.map(item => item.medium),
      borderColor: "red",
      fill: false
    }, { 
      label: 'High',
      data: a.map(item => item.high),
      borderColor: "green",
      fill: false
    }, { 
      label: 'Critical',
      data: a.map(item => item.critical),
      borderColor: "blue",
      fill: false
    }]
  },
  options: {
    legend: {display: true}
  }
});



const checkboxes = document.querySelectorAll('.listItem');
const tableComponents = document.querySelectorAll('.tableComponent');
const dashboard = document.querySelector('.dashboard');
const tableContent = document.querySelector('#tableContent');
const search = document.querySelector(".search");

function filterTableComponents() {
  const checkedIds = Array.from(checkboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.id);

  if (checkedIds.length === 0) {
    dashboard.style.display = 'block';
    tableContent.style.display = 'none';
  } else {
    dashboard.style.display = 'none';
    tableContent.style.display = 'flex';
    tableComponents.forEach(component => {
      if (checkedIds.includes(component.classList[1])) {
        component.style.display = 'block'; 
      } else {
        component.style.display = 'none'; 
      }
    });
  }
}

function filterListItems(searchTerm) {
  const searchFirstChar = searchTerm.charAt(0).toLowerCase();

  checkboxes.forEach(checkbox => {
    const label = checkbox.nextElementSibling.textContent.toLowerCase();
    const checkboxId = checkbox.id.toLowerCase();
    if (checkboxId.startsWith(searchFirstChar) || label.startsWith(searchTerm.toLowerCase())) {
      checkbox.parentElement.style.display = 'block';
    } else {
      checkbox.parentElement.style.display = 'none';
    }
  });
}

search.addEventListener('input', function() {
  const searchTerm = this.value.trim();
  if (searchTerm.length > 0) {
    filterListItems(searchTerm);
  } else {
    checkboxes.forEach(checkbox => {
      checkbox.parentElement.style.display = 'block';
    });
  }
});

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', filterTableComponents);
});

filterTableComponents();

// Populate table with customerData
const keys = ["CustomerID", "balance", "status", "packet", "dateTime", "faultType", "ContractType", "severity", "DataUsageGB", "Churn","minutes","autoRenewal"];

customerData.forEach(customer => {
  keys.forEach(key => {
    const columnDiv = tableContent.querySelector(`.${key}`);
    if (columnDiv) {
      const infoElements = columnDiv.querySelectorAll('.info');
      if (infoElements.length < 15) {
        const infoDiv = document.createElement('div');
        infoDiv.className = 'info';
        infoDiv.textContent = customer[key]; // Populate the value from customerData
        columnDiv.appendChild(infoDiv);
      }
    }
  });
});
