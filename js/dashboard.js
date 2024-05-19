import customerData from '../data.json' with {type: 'json'};


const checkboxes = document.querySelectorAll('.listItem');
const tableComponents = document.querySelectorAll('.tableComponent');
const dashboard = document.querySelector('.dashboard');
const right = document.querySelector('.right');
const tableContent = document.querySelector('#tableContent');
const search = document.querySelector(".search");

function filterTableComponents() {
  const checkedIds = Array.from(checkboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.id);

  if (checkedIds.length === 0) {
    dashboard.style.display = 'block';
    right.style.display = 'block';
    tableContent.style.display = 'none';
  } else {
    dashboard.style.display = 'none';
    right.style.display = 'none';
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