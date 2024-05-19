import customerData from '../data.json' with {type: 'json'};

function countFaultsByDate(customers) {
  const countsByDate = {};

  customers.forEach(customer => {
    const date = customer.dateTime;
    const faultType = customer.faultType;

    if (!countsByDate[date]) {
      countsByDate[date] = {};
    }

    if (!countsByDate[date][faultType]) {
      countsByDate[date][faultType] = 0;
    }

    countsByDate[date][faultType]++;
  });

  const countsArray = Object.keys(countsByDate).map(date => ({
    date: date,
    ...countsByDate[date]
  }));

  return countsArray;
}

const a = countFaultsByDate(customerData);

const xValues = [
  "2024-01-19", "2024-02-19", "2024-03-19", "2024-04-19", "2024-05-19","2024-06-19", "2024-07-19", "2024-08-19", "2024-09-19", "2024-10-19"
];


function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
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

const datasets = xfValues.map(faultType => ({
  label: faultType,
  data: a.map(dateObj => dateObj[faultType] || 0),
  borderColor: getRandomColor(),
  fill: false
}));

new Chart("myChart3", {
  type: "line",
  data: {
    labels: xValues,
    datasets: datasets
  },
  options: {
    legend: { display: true }
  }
});

