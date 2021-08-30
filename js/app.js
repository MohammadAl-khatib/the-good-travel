`use strict`;
let table = document.getElementById('table');
let form = document.getElementById('form');
let objArray = [];

function createTravel(placeName, tripPlace, transportType) {
    this.placeName = placeName;
    this.tripPlace = tripPlace;
    this.transportType = transportType;
    objArray.push(this);
}

form.addEventListener('submit', submitHandler);

function submitHandler(event) {
    event.preventDefault();
    let placeName = event.target.placeName.value;
    let tripPlace = event.target.tripPlace.value;
    let typeOfTransport = event.target.typeOfTransport.value;
    new createTravel(placeName, tripPlace, typeOfTransport);
    localStorage.tripData = JSON.stringify(objArray);
    clearTable();
    render();
}

getdata();
render();

function render() {
    for (let i = 0; i < objArray.length; i++) {
        let trElement = document.createElement('tr');
        table.append(trElement);

        let tdElement = document.createElement('td');
        trElement.append(tdElement);
        let imgElement = document.createElement('img');
        tdElement.append(imgElement);
        imgElement.src = '../img/places/' + objArray[i].tripPlace + '.png';

        let td2Element = document.createElement('td');
        trElement.append(td2Element);
        let p1Element = document.createElement('p');
        td2Element.append(p1Element);
        p1Element.textContent = 'Place Name: ' + objArray[i].placeName;
        
        let p2Element = document.createElement('p');
        td2Element.append(p2Element);
        p2Element.textContent = 'Trip Place: ' +objArray[i].tripPlace;

        let p3Element = document.createElement('p');
        td2Element.append(p3Element);
        p3Element.textContent = 'Type of Transport: ' +objArray[i].transportType;
    }
}

function clearTable(){
    let tableLength = table.rows.length;
    for(let i=0;i<tableLength;i++){
        table.deleteRow(0);
    }
}

function getdata (){
    if (localStorage.tripData){
        let tripData = JSON.parse(localStorage.tripData);
        for (let i=0; i<tripData.length;i++){
            new createTravel(tripData[i].placeName,tripData[i].tripPlace,tripData[i].transportType)
        }
    }
}