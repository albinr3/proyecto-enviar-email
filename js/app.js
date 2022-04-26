//Variables
const sendBtn = document.querySelector("#enviar");
const resetBtn = document.querySelector("#resetBtn");
const email = document.querySelector("#email");
const subject = document.querySelector("#asunto");
const message = document.querySelector("#mensaje");
const form = document.querySelector("#enviar-mail");
const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


loadEventListeners()
//eventlistener
function loadEventListeners() {
    //when the app starts
    document.addEventListener("DOMContentLoaded", startApp);

    //form fields
    email.addEventListener("blur", validateForm);
    subject.addEventListener("blur", validateForm);
    message.addEventListener("blur", validateForm);

    //submit button
    form.addEventListener("submit", sendEmail);

    //reset form
    resetBtn.addEventListener("click", resetFields);


}

//functions
function startApp() {
    sendBtn.disabled = true;
    sendBtn.classList.add("cursor-not-allowed", "opacity-50");
}

//validate form
function validateForm(e) {

    //validate if there is text on the field
    if(e.target.value.length > 0 ) {
        //delete the errors
        const error = document.querySelector("p.error");
        if(error){
            error.remove();
        };
        
        e.target.style.border = "2px solid green";

    }else {
        e.target.style.border = "2px solid red";
        showError("Todos los campos son obligatorios");
    };

    //validate email with regular expresion
    if(e.target.type === "email") {
        

        if(re.test( e.target.value ) ) {
            const error = document.querySelector("p.error");
            if(error){
                error.remove();
            };
            e.target.style.border = "2px solid green";
        } else if(e.target.value === ""){
            const error = document.querySelector("p.error");
            if(error){
                error.remove();
            };
            showError("Todos los campos son obligatorios");
        } else {
            e.target.style.border = "2px solid red";
            showError("El email no es correcto!");
        }
    }

    //if everything is ok
    if( re.test( email.value ) && message.value !== "" && subject.value !== ""){
        sendBtn.disabled = false;
        sendBtn.classList.remove("cursor-not-allowed", "opacity-50");
    }

}

function showError(message) {
    let textError = document.createElement("p");
    textError.textContent = message;
    textError.style.border = "1px solid red";
    textError.style.color = "red";
    textError.style.marginTop = "5px";
    textError.classList.add("error"); //to identify the error message

    //avoid duplicate error message
    const errors = document.querySelectorAll(".error"); //to know if there is an error
    if(errors.length < 1) {
        form.appendChild(textError);
    };

}

function sendEmail(e) {
    e.preventDefault();

    //Showing the spinner
    const spinner = document.querySelector("#spinner");
    spinner.style.display = "flex";

    //after 3 seconds of showinf the spinner

    setTimeout( () => {
        spinner.style.display = "none";
        console.log("mensaje enviado");
        resetFields();}, 3000);
}

function resetFields() {
    //#1 way
    // email.value = "";
    // subject.value = "";
    // message.value = '';
    // 

    //#2 way
    form.reset();
    email.style.border = "";
    subject.style.border = "";
    message.style.border = '';

    startApp();
}