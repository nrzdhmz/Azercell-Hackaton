import customerData from '../data.json' with {type: 'json'};

function countContractTypes(customers) {
  let packet1 = 0;
  let packet2 = 0;
  let packet3 = 0;
  let high = 0;
  let medium = 0;
  let critical = 0;

  customers.forEach(customer => {
    if (customer.packet === "GencOl-3") {
      packet1++;
    } else if (customer.packet === "GencOl-6") {
      packet2++;
    } else if (customer.packet === "GencOl-9") {
      packet3++;
    } 
    if (customer.severity === "High") {
      high++;
    } else if (customer.severity === "Medium") {
      medium++;
    } else if (customer.severity === "Critical") {
      critical++;
    }
  });

  return {
    high,
    medium,
    critical,
    packet1,
    packet2,
    packet3
  };
}

const contractCounts = countContractTypes(customerData);

const isFaultPage = document.title.includes("Fault");

let keys = ["CustomerID", "balance", "minutes", "autoRenewal", "DataUsageGB", "packet"];
let faultKeys = ["CustomerID", "deviceName", "faultType", "dateTime", "severity", "estimatedRepairTime","rootCause","status","impact"];

const tableContent = document.querySelector('#tableContent .logEventTable');
const selectedKeys = isFaultPage ? faultKeys : keys;

customerData.reverse();

customerData.forEach(customer => {
  selectedKeys.forEach(key => {
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

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  if (!isFaultPage) {
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['GencOl-3', contractCounts.packet1 ],
      ['GencOl-6', contractCounts.packet2 ],
      ['GencOl-9', contractCounts.packet3 ]
    ]);

    var options = {
      title: 'Payment'
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
  } else {
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Medium', contractCounts.medium],
      ['High', contractCounts.high],
      ['Critical', contractCounts.critical],
    ]);

    var options = {
      title: 'Vulnerability',
      is3D: true,
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart_3d'));
    chart.draw(data, options);
  }

  const xfValues = [
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
  ];

  let faultTypeCounts = {};
  xfValues.forEach(value => {
    faultTypeCounts[value] = 0;
  });

  customerData.forEach(customer => {
    const faultType = customer.faultType;
    if (faultType && xfValues.includes(faultType)) {
      faultTypeCounts[faultType]++;
    }
  });

  const b = xfValues.map(value => ({ name: value, count: faultTypeCounts[value] }));

  const yfValues = [b[0].count, b[1].count, b[2].count, b[3].count, b[4].count, b[5].count, b[6].count, b[7].count, b[8].count, b[9].count, b[10].count, b[11].count];
  const barfColors = ["blue","orange","brown","blue","orange","brown","blue","orange","brown","blue","orange","brown","blue"];

  new Chart("myChart", {
    type: "bar",
    data: {
      labels: xfValues,
      datasets: [{
        backgroundColor: barfColors,
        data: yfValues
      }]
    },
    options: {
      legend: {display: false},
      title: {
        display: true,
        text: isFaultPage ? "Events" : "Fault Types"
      }
    }
  });
}