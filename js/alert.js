import customerData from '../data.json' with {type: 'json'};

function countActiveFaultsBySeverity(faults) {
  let counts = {
    "Medium": 0,
    "High": 0,
    "Critical": 0
  };

  faults.forEach(fault => {
    if (fault.status === "Active") {
      switch (fault.severity) {
        case "Medium":
          counts.Medium++;
          break;
        case "High":
          counts.High++;
          break;
        case "Critical":
          counts.Critical++;
          break;
      }
    }
  });

  return counts;
}

let activeFaultCounts = countActiveFaultsBySeverity(customerData);
console.log(activeFaultCounts);


const xcValues = ["Medium", "Crutiality", "High"];
const ycValues = [activeFaultCounts.High, activeFaultCounts.Medium, activeFaultCounts.Critical];
const barColors = [
  "#b91d47",
  "#00aba9",
  "#2b5797"
];

new Chart("myChart", {
  type: "doughnut",
  data: {
    labels: xcValues,
    datasets: [{
      backgroundColor: barColors,
      data: ycValues
    }]
  },
  options: {
    title: {
      display: true,
      text: "Active Faults"
    }
  }
});


