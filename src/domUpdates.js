//NOTE: Your DOM manipulation will occur in this file
const waterDay = document.querySelector('#waterDay');
const waterWeek = document.querySelector('#waterWeek')
//Here are 2 example functions just to demonstrate one way you can export/import between the two js files. You'll want to delete these once you get your own code going.

const  waterDayUpdate = (date, hydrationData) => {
  waterDay.innerHTML = '';
  waterDay.innerHTML = `<div> <h1>${date}</h1> <p>${hydrationData}</p> </div>`
}

const  waterWeekUpdate = (hydrationArray) => {
  waterWeek.innerHTML = '';
  for(i = hydrationArray.lenght - 8 ; i < hydrationArray.length; i++) {
    waterWeek.innerHTML += `<div class = 'week-view'>
                            <p>${hydrationArray[i].date}</p>
                            <p>${hydrationArray[i].numOunces}</p>
                            </div>` 
}
}

export {
  waterDayUpdate,
  waterWeekUpdate
}


  