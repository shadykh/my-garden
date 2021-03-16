'use strict';

// Table header
let tableHeader = ['#', 'Image', 'Name', 'Season'];


//Constructor 
function Flower (flowerName, flowerCategory, flowerSeason){

    this.flowerName = flowerName;
    this.flowerCategory = flowerCategory;
    this.flowerSeason = flowerSeason;
    this.flowerPath = '';

    Flower.all.push(this);
}
//All constructor array 
Flower.all = [];

//Constructor prototype toLowerCase 
Flower.prototype.toLowerCase = function(){
    this.flowerCategory = this.flowerCategory.toLowerCase();
}

//Constructor prototype to make the image path
Flower.prototype.path = function(){
    this.flowerPath = `./assets/${this.flowerCategory}.jpeg`;
}


// Rendering if there is any data before
getDataFromLocal();



// Form part
const formElement = document.getElementById('flowerForm');

formElement.addEventListener('submit', function(event){

    event.preventDefault();

    let newFlowerName = event.target.flowersName.value;
    let newFlowerCategory = event.target.flowerCategory.value;
    let newFlowerSeason = event.target.flowerSeason.value;

    formElement.reset();

    const nFlower = new Flower(newFlowerName, newFlowerCategory, newFlowerSeason);

    nFlower.toLowerCase();

    nFlower.path();

    localStorage.setItem('flowersData', JSON.stringify(Flower.all) );

    const divElement = document.getElementById('tableDiv');

    divElement.innerHTML = '';

    getDataFromLocal();


})



// Function to get dat from local storage
function getDataFromLocal(){
    let localData = localStorage.getItem('flowersData');

    if (localData){
        Flower.all = JSON.parse(localData);
        renderData();
    }
}

// Function to render the data
function renderData(){
    const divElement = document.getElementById('tableDiv');

    const tableElement = document.createElement('table');
    divElement.appendChild(tableElement);
    tableElement.setAttribute('id','tableData')

    const trHeadElement = document.createElement('tr');
    tableElement.appendChild(trHeadElement);

    for (let i =0; i<tableHeader.length; i++){

        const thElement = document.createElement('th');
        trHeadElement.appendChild(thElement);
        thElement.textContent = tableHeader[i];
    }

    for (let j = 0; j<Flower.all.length;j++){
        const trDataElement = document.createElement('tr');
        tableElement.appendChild(trDataElement); 

        const tdDeleteElement = document.createElement('td');
        trDataElement.appendChild(tdDeleteElement);
        tdDeleteElement.textContent = 'X';
        tdDeleteElement.setAttribute('onClick','deleteMe(this)');

        const tdImageElement = document.createElement('img');
        tdImageElement.src = Flower.all[j].flowerPath;
        trDataElement.appendChild(tdImageElement);

        const tdNameElement = document.createElement('td');
        trDataElement.appendChild(tdNameElement);
        tdNameElement.textContent = Flower.all[j].flowerName;

        const tdSeasonElement = document.createElement('td');
        trDataElement.appendChild(tdSeasonElement);
        tdSeasonElement.textContent = Flower.all[j].flowerSeason;

    }

}

// Function to delete the row
function deleteMe(meIamHere){
    const tableElement = document.getElementById('tableData');

    let tableRowIndex = meIamHere.parentNode.rowIndex;

    tableElement.deleteRow(tableRowIndex);

    Flower.all.splice(tableRowIndex-1,1);

    localStorage.setItem('flowersData', JSON.stringify(Flower.all) );

    
    const divElement = document.getElementById('tableDiv');

    divElement.innerHTML = '';

    getDataFromLocal();


}


// Function to clear the local storage
function clearLocalStorage(){
    localStorage.clear();
    window.location.reload('Refresh');
}
