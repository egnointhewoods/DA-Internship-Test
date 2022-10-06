const form = document.getElementById('form');

const formValues = {
    firstName: document.getElementById('firstName'),
    lastName: document.getElementById('lastName'),
    address: document.getElementById('address'),
    dateOfBirth: document.getElementById('dateOfBirth'),
    gender: document.getElementById('gender'),
    notes: document.getElementById('notes'),
};
const tableRow = document.querySelector('.tableRow');

const trashIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" class="bi bi-x" viewBox="0 0 16 16">
<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>`;



let id = localStorage.length;

function constructTableElement(){
    let parsedData = () => {
        let arr = [];
        for (let i = 0; i < localStorage.length; i++){
            let parsedLineOfData = JSON.parse(localStorage.getItem(i));
            arr.push(parsedLineOfData);
        }
        return arr;        
    }     
    let deleteBtns = [];
    let tableRows = [];
    parsedData().map((data)=> {

        if(data !== "Deleted"){           
            tableRow.innerHTML +=  
            `
                <tr class = "tableTr" id = "row${data.id}">
                    <td data-label="ID">${data.id}</td>
                    <td data-label="First Name">${data.firstName}</td>
                    <td data-label="Last Name">${data.lastName}</td>
                    <td data-label="Address">${data.address}</td>
                    <td data-label="Date Of Birth">${data.dateOfBirth ? data.dateOfBirth : 'N/A'}</td>
                    <td data-label="Gender">${data.gender ? data.gender : 'N/A'}</td>
                    <td class="buttonTd"><button id="${data.id}" class="deleteBtn">${trashIcon}</button></td>
                </tr>
            `
        }       
    })

    //If the innerHTML of the table element is empty the local storage will be cleared.

    if(tableRow.innerHTML.length == 17){
        localStorage.clear();
    }

    function deleteRow(id){
        event.stopPropagation();
        localStorage.setItem(id, JSON.stringify('Deleted'));
        location.reload();
    }
    function getNotes(id){

        //removes the word 'row' from the ID
        let slicedId = id.slice(3);

        let notes = JSON.parse(localStorage.getItem(slicedId)).notes;
        notes? alert(notes) : alert(`No Notes`);
    }
    for (let i = 0; i < localStorage.length; i++){
        deleteBtns[i] = {
            button: document.getElementById(i),
        };
        tableRows[i] = {
            tableRow: document.getElementById(`row${i}`),
        };
        tableRows[i].tableRow?.addEventListener('click', () => getNotes(tableRows[i].tableRow.id))

        deleteBtns[i].button?.addEventListener('click', () => deleteRow(deleteBtns[i].button.id))
    }
}



if(localStorage.length > 0){
    constructTableElement();
}


form.addEventListener('submit', (event) => {
    event.preventDefault();
    if(localStorage.length == 0){
        id = 0;
    }
    
    let data = {}
    for (const property in formValues) {
        let key = formValues[property].name;
        data[key] = formValues[property].value;
    }
    data.id = id;

    localStorage.setItem(id, JSON.stringify(data));
    tableRow.innerHTML = '';
    constructTableElement();
    id++;
    document.querySelector('form').reset(); //Clears the form inputs
})