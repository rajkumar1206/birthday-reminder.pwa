let reminderList = [];
let list = localStorage.getItem('reminderList');
const reminder_ul = document.querySelector('.rem-collect');
if(!list){
    localStorage.setItem('reminderList', JSON.stringify(reminderList));
} else {
    reminder_ul.innerHTML = '<li class="collection-item">No Reminders for you</li>'
}


const reminderForm = document.querySelector('.reminder');

reminderList = JSON.parse(localStorage.getItem('reminderList'));

const reRender = (n = 0) => {
    if(reminderList.length != 0 || n==1){
        localStorage.setItem('reminderList', JSON.stringify(reminderList));
        reminder_ul.innerHTML = '';
        for(let i = 0; i< reminderList.length; i++){
            var node = document.createElement("li");
            var textnode = document.createTextNode(reminderList[i].name);
            node.setAttribute('class', 'collection-item');
            node.setAttribute('id', reminderList[i].id);
            node.appendChild(textnode);
            node.innerHTML = `<i class="material-icons right red-text">clear</i>`+ node.innerHTML;                           
            reminder_ul.appendChild(node); 
        } 
    } if(reminderList.length == 0 && n == 1) {
        reminder_ul.innerHTML = '<li class="collection-item">No Reminders for you</li>'
    }
}

reRender();

reminderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const reminder = reminderForm.querySelector('.validate').value + ' - ' + reminderForm.querySelector('.datepicker').value;
    let obj = { id: Math.random(), name: reminder };
    reminderList.unshift(obj);
    reRender();
    reminderForm.querySelector('.validate').value = '';
    reminderForm.querySelector('.datepicker').value='';
})

reminder_ul.addEventListener('click', (e) => {
    if(e.target.closest('li').id){
        reminderList = reminderList.filter(rem => rem.id != e.target.closest('li').id);
        localStorage.setItem('reminderList', JSON.stringify(reminderList));
        
    }
    reRender(1);
})