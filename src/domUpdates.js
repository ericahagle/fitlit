//NOTE: Your DOM manipulation will occur in this file
const waterDay = document.querySelector('#waterDay');
const waterWeek = document.querySelector('#waterWeek')
//Here are 2 example functions just to demonstrate one way you can export/import between the two js files. You'll want to delete these once you get your own code going.

function waterDayUpdate(date, hydrationData) {
  waterDay.innerHTML = '';
  waterDay.innerHTML = `<div> <h1>${date}</h1> <p>${hydrationData}</p>`
}

function waterWeekUpdate(date, hydrationArray) {
  waterWeek.innerHTML = '';
  hydrationArray.forEach(element => waterWeek.innerHTML += `<div><p>${element.date}</p><p>${element.mumOunces}</p></div>` )
}

export {
  waterDayUpdate,
  waterWeekUpdate
}


  