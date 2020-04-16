const urlParams = new URLSearchParams(window.location.search);
const userId = parseFloat(urlParams.get('id'));
const name = document.querySelector('.name');
const dob = name.nextElementSibling.nextElementSibling;
const des = dob.nextElementSibling.nextElementSibling;
const editForm = document.querySelector('form');
const editValue = Array.from(editForm.children);
const ename = editValue[0];
const edob = editValue[1];
const edes = editValue[2];
const deleteButton = document.querySelector('.delete');
const backButton = deleteButton.nextElementSibling;

let userProfileList = JSON.parse(localStorage.getItem('birthdayStorageList'));
let data = {};
let i = 0;

const reRenderEdit = () => {
    i = 0;
    for(i =0;i<userProfileList.length;i++){
        if(userId === userProfileList[i].id){
            data = userProfileList[i];
            break;
        }
    }

    name.innerHTML = `Name: <h5 class="blue-text">${data.name}</h5>`;
    dob.innerHTML = `Date of Birth: <h5 class="blue-text">${data.dob.date+" "+ data.dob.month+" "+data.dob.year}</h5>`;
    des.innerHTML = `Description: <h5 class="blue-text">${data.description}</h5>`;

    ename.value = data.name;
    edob.value = data.dob.month+" "+data.dob.date+", "+data.dob.year;
    edes.value = data.description;
}

reRenderEdit();

editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let name = ename.value;
    let dob = edob.value;
    let des = edes.value;
    data = {id: userId, name, dob: {date: parseInt(dob.slice(4, 6)),month: dob.slice(0, 3), year: parseInt(dob.slice(7, 12))}, description: des };
    userProfileList[i] = data;
    localStorage.setItem('birthdayStorageList', JSON.stringify(userProfileList));
    reRenderEdit();
    window.location.href = '/edit.html?id='+userId;
});

deleteButton.addEventListener('click', (e) => {
    e.preventDefault();    
    userProfileList.splice(i, 1);
    localStorage.setItem('birthdayStorageList', JSON.stringify(userProfileList));
    window.location.href = '/';
})

backButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '/index.html';
})