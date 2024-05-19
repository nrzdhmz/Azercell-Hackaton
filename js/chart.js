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

const a = countSeverityByDate(customerData); 

const xValues = [
  "2024-01-19", "2024-02-19", "2024-03-19", "2024-04-19", "2024-05-19","2024-06-19", "2024-07-19", "2024-08-19", "2024-09-19", "2024-10-19"
];


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
