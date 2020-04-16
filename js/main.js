const form = document.querySelector('.addBirthdayForm');
const ul = document.querySelector(".birthdaylist");
const birthdayFormName = form.querySelector('.validate');
const birthdayFormDOB = form.querySelector('.datepicker');
const birthdayFormdesc = form.querySelector('.description');

const dateDict = {"Jan": 0, "Feb": 1, "Mar":2, "Apr": 3, "May": 4, "Jun": 5, "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11};

const birthdayStorageList = localStorage.getItem("birthdayStorageList") ? 
                            JSON.parse(localStorage.getItem("birthdayStorageList")) : 
                            [];



const findForwardDiff = (obj1, obj2, n) => {
    let t1 = obj1.dob.date;
    let m1 = dateDict[obj1.dob.month]+1;
    let t2 = obj2.dob.date;
    let m2 = dateDict[obj2.dob.month]+1;

    var date1 = new Date(m1+"/"+t1+"/"+(2019+0)); 
    var date2 = new Date(m2+"/"+t2+"/"+(2019+n));
    var Difference_In_Time = date2.getTime() - date1.getTime(); 
    var Difference_In_Days = Difference_In_Time / 1000 / 3600 / 24;
    if(Difference_In_Days > 30){
        return parseInt(Difference_In_Days/30) + " months";
    } else if (Difference_In_Days > 0){
        return parseInt(parseFloat(Difference_In_Days)+0.99) + ' Days';
    } else {
        return "TODAY";
    }
};


const findBirthdayListIndex = (obj) => {
    let list = [...birthdayStorageList];
    let { month , date } = obj.dob;
    let i = 0;
    for(i = 0 ; i<list.length; i++){
        if(dateDict[list[i].dob.month] == dateDict[month] && list[i].dob.date == date){
            // push notification
            // console.log('happy birthday');
        }
        if( dateDict[list[i].dob.month] > dateDict[month] || (dateDict[list[i].dob.month] == dateDict[month] && list[i].dob.date >= date) ){
            return i;
        }  
    }
    return i;
};

const renderBirthdayList = () => {
    if(birthdayStorageList.length !== 0){
        ul.innerHTML = '';
        let d = String(new Date());
        let object = {
            dob: {
                month: d.slice(4, 7), 
                date: parseInt(d.slice(8, 10))
            }
        };
        let ind = findBirthdayListIndex(object);
        let ref = 0, ref2 = 0;
        let birthdayStorageList = JSON.parse(localStorage.getItem('birthdayStorageList'));
        for( const ob of birthdayStorageList){
            // console.log(ob);
            let template = document.querySelector('#product');
            var clone = template.content.cloneNode(true);
            clone.querySelector('li').setAttribute('id', ob.id );
            clone.querySelector('.title').textContent = ob.name;
            let { date, month, year } = ob.dob;
            clone.querySelector('.dob').textContent = date + " " + month + " " + year;
            if(ref < ind){
                clone.querySelector('p').textContent = findForwardDiff(object, ob, 1);
                ul.appendChild(clone);
            } else {
                clone.querySelector('p').textContent = findForwardDiff(object, ob, 0);
                ul.insertBefore(clone, ul.children[ref2]);
                ref2 += 1;
            }
            
            ref += 1;
        }
    } else {
        addEmpty();
    }
    
}
// const renderBirthdayList = () => {
//     if(birthdayStorageList.length !== 0){
//         ul.innerHTML = '';
//         let birthdayStorageList = JSON.parse(localStorage.getItem('birthdayStorageList'));
//         for( const ob of birthdayStorageList){
//             let template = document.querySelector('#product');
//             var clone = template.content.cloneNode(true);
//             clone.querySelector('li').setAttribute('id', ob.id );
//             clone.querySelector('.title').textContent = ob.name;
//             let { date, month, year } = ob.dob;
//             clone.querySelector('.dob').textContent = date + " " + month + " " + year;
//             ul.appendChild(clone);
//         }
//     } else {
//         addEmpty();
//     }
    
// }

renderBirthdayList();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let name = birthdayFormName.value;
    let date = birthdayFormDOB.value;
    let desc = birthdayFormdesc.value;
    let day = parseInt(date.slice(4, 6));
    let mon = date.slice(0, 3);
    let year = parseInt(date.slice(7, 12));
    let obj = {id: Math.random(), name: name, dob: {date: day, month: mon, year: year }, description: desc};

    let index = findBirthdayListIndex({...obj});

    birthdayStorageList.splice(index, 0, obj);

    localStorage.setItem('birthdayStorageList', JSON.stringify(birthdayStorageList));
    
    renderBirthdayList();

    birthdayFormName.value = '';
    birthdayFormDOB.value = '';
    birthdayFormdesc.value = '';
    if ( ul.querySelector('.dumb') ){
        ul.removeChild( ul.querySelector('.collection-item'));
    }
    var elem = document.querySelector('.sidenav');
    var instance = M.Sidenav.getInstance(elem);
    instance.close();
});

function addEmpty(){
    if (ul.childElementCount == 0){
        var node = document.createElement("li");          
        var textnode = document.createTextNode("Your Birthday list is empty");
        node.setAttribute('class', 'collection-item dumb');
        node.appendChild(textnode);                              
        ul.appendChild(node); 
    }
};

addEmpty();

ul.addEventListener('click', (e) => {
    if(e.target.closest('li').id){
        window.location.href = '../edit.html?id='+e.target.closest('li').id;
    }
})
