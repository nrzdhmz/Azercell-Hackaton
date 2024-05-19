import customerData from '../data.json' with {type: 'json'};


document.addEventListener('DOMContentLoaded', function() {
  const findButton = document.querySelector('.find');
  if (findButton) {
    findButton.addEventListener('click', handleSearch);
  }
});


function handleSearch() {
  const searchInputValue = document.getElementById('searchInput').value.trim();
  const jsonTextarea = document.getElementById('jsonResult');
  const objectCountDiv = document.querySelector('.objectCount');

  jsonTextarea.value = '';
  jsonTextarea.rows = 10;
  objectCountDiv.textContent = '0';

  if (isValidSearchFormat(searchInputValue)) {
    try {
      const searchObj = JSON.parse(searchInputValue);

      const matchedCustomers = customerData.filter(customer => {
        for (const key in searchObj) {
          if (customer[key] !== searchObj[key]) {
            return false;
          }
        }
        return true;
      });

      if (matchedCustomers.length > 0) {
        jsonTextarea.value = JSON.stringify(matchedCustomers, null, 2);

        if (matchedCustomers.length > 10) {
          const currentRows = jsonTextarea.rows;
          jsonTextarea.rows = Math.min(currentRows + 15);
        }else if(matchedCustomers.length > 3){
          const currentRows = jsonTextarea.rows;
          jsonTextarea.rows = Math.min(currentRows + 10, 50);
        }
      } else {
        jsonTextarea.value = 'No matching customers found.';
      }

      objectCountDiv.textContent = matchedCustomers.length.toString();

    } catch (error) {
      alert('Invalid search format. Please use {key:value} format.');
      console.error(error);
    }
  } else {
    alert('Invalid search format. Please use {key:value} format.');
  }
}

function isValidSearchFormat(input) {
  try {
    const searchObj = JSON.parse(input);
    return typeof searchObj === 'object' && Object.keys(searchObj).length === 1 && typeof searchObj[Object.keys(searchObj)[0]] !== 'object';
  } catch (error) {
    return false;
  }
}
