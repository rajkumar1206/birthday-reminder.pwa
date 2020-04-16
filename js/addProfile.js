let userProfileInfo = [];
const userInfoForm = document.querySelector('.userprofile');
const container = document.querySelector('.doop');
const pname = userInfoForm.querySelector('.pname');
const pdob = pname.nextElementSibling;
const pdes = pdob.nextElementSibling;

if(localStorage.getItem("userProfileInfo")){
    userProfileInfo = JSON.parse(localStorage.getItem('userProfileInfo'));
}

const renderUserInfo = () => {
    if(userProfileInfo.length){
        container.innerHTML = "";
        console.log(userProfileInfo);
        container.innerHTML = `<h3 class="pink-text">Acc Info:</h3><br />
                                <h3 class="pink-text">Name: </h3><h3 class="blue-text">
                                    ${userProfileInfo[0].name}
                                </h3><br /> 
                                <h3 class="pink-text">Date of Birth: </h3><h3 class="blue-text">
                                    ${userProfileInfo[0].dob}
                                </h3><br />
                                <h3 class="pink-text">Description:</h3><h3 class="blue-text">
                                    ${userProfileInfo[0].description}
                                </h3>`;
    }
};

renderUserInfo();
userInfoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    userProfileInfo = [{name: pname.value, dob: pdob.value, description: pdes.value}];
    localStorage.setItem('userProfileInfo', JSON.stringify(userProfileInfo));
    renderUserInfo();

})
