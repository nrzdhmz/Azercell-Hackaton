import customerData from './data.json' with {type: 'json'};


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
const a = countSeverityByDate(customerData);

const xValues = [
  "2024-01-19", "2024-02-19", "2024-03-19", "2024-04-19", "2024-05-19",
  "2024-06-19", "2024-07-19", "2024-08-19", "2024-09-19", "2024-10-19"
];

new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{ 
      data: [a[1].medium,a[2].medium,a[3].medium,a[4].medium,a[5].medium,a[6].medium,a[7].medium,a[8].medium,a[9].medium,a[10].medium],
      borderColor: "red",
      fill: false
    }, { 
      data: [a[1].high,a[2].high,a[3].high,a[4].high,a[5].high,a[6].high,a[7].high,a[8].high,a[9].high,a[10].high],
      borderColor: "green",
      fill: false
    }, { 
      data: [8,7,4,6,2,3,2,4,3,2],
      borderColor: "blue",
      fill: false
    }]
  },
  options: {
    legend: {display: false}
  }
});

const checkboxes = document.querySelectorAll('.listItem');
const tableComponents = document.querySelectorAll('.tableComponent');
const dashboard = document.querySelector('.dashboard');
const tableContent = document.querySelector('#tableContent');
function filterTableComponents() {
  const checkedIds = Array.from(checkboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.id);
  if (checkedIds.length === 0) {
    dashboard.style.display = 'block';
    tableContent.style.display = 'none';
  } else {
    dashboard.style.display = 'none';
    tableContent.style.display = 'block';
    tableComponents.forEach(component => {
      if (checkedIds.includes(component.classList[1])) {
        component.style.display = 'block'; 
      } else {
        component.style.display = 'none'; 
      }
    });
  }
}
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', filterTableComponents);
});
filterTableComponents();


let keys = ["CustomerID", "balance", "status", "packet", "dateTime", "faultType"];


customerData.forEach(customer => {
  keys.forEach(key => {
    const columnDiv = tableContent.querySelector(`.${key}`);
    if (columnDiv) {
      const infoElements = columnDiv.querySelectorAll('.info');
      if (infoElements.length < 15) {
        const infoDiv = document.createElement('div');
        infoDiv.className = 'info';
        infoDiv.textContent = customer[key];
        columnDiv.appendChild(infoDiv);
      }
    }
  });
});


