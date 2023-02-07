
let username = document.getElementById("username");
let password = document.getElementById("password");
let message = document.querySelector('.message');

username.addEventListener('textInput', userVerify);
password.addEventListener('textInput', passVerify);

localStorage.setItem("username", "G1S11");
localStorage.setItem("password", "G1S11");

function validated(e){

    e.preventDefault(e);
    clearError();

    if(username.value === ""){
        showError("Please fill in your username")
        username.focus();
        return false;
    }

    if(password.value === ""){
        showError("Please fill in your password")
        password.focus();
        return false;
    }

    if (username.value == localStorage.getItem("username")) {
        if (password.value == localStorage.getItem("password")) {
            window.location.href = "resume.html";
        }
        else {
            showError("Incorrect password");
            password.focus();
            return false;
        }
    } else {
        showError("Invalid username");
        username.focus();
        return false;
    }
}

function showError(errorMessage){
    message.style.visibility = "visible";
    message.innerText = errorMessage;
}

function clearError(){
    message.style.visibility = "hidden";
}

function userVerify(){
    if(username.value !== ""){
        message.style.visibility = "hidden";
        return true;
    }
}

function passVerify(){
    if(password.value !== ""){
        message.style.visibility = "hidden";
        return true;
    }
}

function preventBack() {
    window.history.forward();
}

setTimeout("preventBack()", 0);
window.onunload = function () { null };