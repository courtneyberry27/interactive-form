const entireForm = document.querySelector('#entire-form');
const name = document.getElementById('name');
const email = document.querySelector('#mail');
const otherTitle = document.querySelector('#other-title');
otherTitle.style.display = 'none';
const otherLabel = document.querySelector("#other-label")
otherLabel.style.display = "none";
const jobs = document.querySelectorAll('#title');
const designs = document.querySelectorAll('#design');
const colors = document.querySelector('#color');
const allColorsDiv = document.querySelector('#colors-js-puns select');
const iLoveJSColors = document.querySelectorAll('#color option:nth-child(n+4)');
const jsPunsColors = document.querySelectorAll('#color option:nth-child(-n+3)');
const activitiesInputs = document.querySelectorAll('.activities input');
const activitiesDiv = document.querySelector('.activities');
const totalCostDiv = document.createElement('div');
activitiesDiv.appendChild(totalCostDiv);
const paymentMethods = document.querySelector('#payment');
const creditCard = document.querySelector('.credit-card');
const paypal = document.querySelector('.paypal');
const bitcoin = document.querySelector('.bitcoin');
const ccNum = document.querySelector('#cc-num');
const zip = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
const expMonth = document.querySelector('#exp-month');
const expYear = document.querySelector('#exp-year');
const selectMethodOption = paymentMethods.firstElementChild;
const submitButton = document.querySelector('#submit-btn');


/******************************* 
 *General Information Section
 ********************************/
name.focus(); //the cursor automatically starts in name input

//making the other box and label only appear when the other option is selected
for (let i = 0; i < jobs.length; i += 1) {
    jobs[i].addEventListener('change', (event) => {
        if (event.target.value == 'other') {
            otherTitle.style.display = '';
            otherLabel.style.display = '';
        } else {
            otherTitle.style.display = 'none';
            otherLabel.style.display = 'none';
        }
    });
}

/******************************* 
 *T-shirt Selection Section
 ********************************/
colors.style.display = 'none'; //hides color options until theme is selected

//loop through design themes to get correct colors for each theme
for (let i = 0; i < designs.length; i += 1) {
    designs[i].addEventListener('change', (e) => {
        if (e.target.value === "js puns") {
            colors.style.display = '';
            for (let i = 0; i < jsPunsColors.length; i += 1) {
                allColorsDiv.removeChild(iLoveJSColors[i]);
                allColorsDiv.appendChild(jsPunsColors[i]);
            }
        } else if (e.target.value === "heart js") {
            colors.style.display = '';
            for (let i = 0; i < iLoveJSColors.length; i += 1) {
                allColorsDiv.removeChild(jsPunsColors[i]);
                allColorsDiv.appendChild(iLoveJSColors[i]);
            }
        } else {
            colors.style.display = 'none';
        }
    });
}

/******************************* 
 *Activities Section
 ********************************/
let totalCost = 0;
totalCostDiv.textContent = `Total: $${totalCost}`; //displays initial cost of zero

/*FUNCTION: disabledActivity - disables and changes color of events with conflicting times upon clicking an event
 *index [integer] - gives the index of the conflicting event to be disabled
 *returns [totalCost] - increases the total cost upon checking a box
 */
function disableActivity(index) {
    activitiesInputs[index].disabled = true;
    activitiesInputs[index].parentNode.style.color = 'grey';
    return totalCost += 100
}

/*FUNCTION: reEnabledActivity - re-enables and changes color back to original of events with conflicting times upon clicking an event
 *index [integer] - gives the index of the conflicting event to be re-enabled
 *returns [totalCost] - decreases the total cost upon unchecking a box
 */
function reEnableActivity(index) {
    activitiesInputs[index].disabled = false;
    activitiesInputs[index].parentNode.style.color = '';
    return totalCost -= 100;
}

//loops through the entire list of activity checkboxes
for (let i = 0; i < activitiesInputs.length; i += 1) {
    //EVENT LISTENER FOR ACTIVITIES CHECKBOX
    activitiesInputs[i].addEventListener('change', (e) => {
        const activityTarget = e.target;
        const isChecked = e.target.checked;
        if (activityTarget === activitiesInputs[0] && isChecked) { //adds main conference $200
            totalCost += 200;
        } else if (activityTarget === activitiesInputs[0] && !isChecked) { //removes main conference -$200
            totalCost -= 200;
        } else if (activityTarget === activitiesInputs[1] && isChecked) { //adds js frameworks workshop $100
            disableActivity(3);
        } else if (activityTarget === activitiesInputs[1] && !isChecked) { //removes js frameworks workshop -$100
            reEnableActivity(3);
        } else if (activityTarget === activitiesInputs[2] && isChecked) { //adds js libraries workshop $100
            disableActivity(4);
        } else if (activityTarget === activitiesInputs[2] && !isChecked) { //removes js libraries workshop -$100
            reEnableActivity(4);
        } else if (activityTarget === activitiesInputs[3] && isChecked) { //adds express workshop $100
            disableActivity(1);
        } else if (activityTarget === activitiesInputs[3] && !isChecked) { //removes express workshop -$100
            reEnableActivity(1);
        } else if (activityTarget === activitiesInputs[4] && isChecked) { //adds node.js workshop $100
            disableActivity(2)
        } else if (activityTarget === activitiesInputs[4] && !isChecked) { //removes node.js workshop -$100
            reEnableActivity(2);
        } else if (activityTarget === activitiesInputs[5] && isChecked) { //adds build tools workshop $100
            totalCost += 100;
        } else if (activityTarget === activitiesInputs[5] && !isChecked) { //removes build tools workshop -$100
            totalCost -= 100;
        } else if (activityTarget === activitiesInputs[6] && isChecked) { //adds npm workshop $100
            totalCost += 100;
        } else if (activityTarget === activitiesInputs[6] && !isChecked) { //removes npm workshop -$100
            totalCost -= 100;
        }

        totalCostDiv.textContent = `Total: $${totalCost}`; //displays total cost after events are added
    });
}

/******************************* 
 *Payment Info Section
 ********************************/
//makes sure users cannot select the "Select Method of Payment" option in the drop down list
selectMethodOption.disabled = true;

function hide(paymentChoice) {
    paymentChoice.style.display = 'none';
}

function show(paymentChoice) {
    paymentChoice.style.display = '';
}
//makes credit card the default option
hide(paypal);
hide(bitcoin);


//if statements selecting and displaying the correct payment option based on which option chosen in drop down list
for (let i = 0; i < paymentMethods.length; i += 1) {
    // EVENT LISTENER FOR DROP DOWN MENU
    paymentMethods.addEventListener('change', (event) => {
        if (event.target.value == 'credit card') {
            hide(paypal);
            hide(bitcoin);
            show(creditCard);
        } else if (event.target.value == 'paypal') {
            show(paypal);
            hide(bitcoin);
            hide(creditCard);
        } else if (event.target.value == 'bitcoin') {
            hide(paypal);
            show(bitcoin);
            hide(creditCard);
        }
    });
}

/******************************* 
Form Validation
********************************/
entireForm.addEventListener('submit', (e) => {
    validate();

    if (validate() == true) {

    } else {
        e.preventDefault();
    }
});

/*FUNCTION: validate - calls all validation functions
 *returns [boolean] - true or false based on whether or not the form is complete
 */
function validate() {
    validateName();
    validateEmail();
    validateActivity();
    validateCCNum();
    validateZip();
    validateCVV();

    if (validateName() == true && validateEmail() == true && validateActivity() == true && validateCCNum == true && validateZip == true && validateCVV == true) {
        return true;
    } else {
        return false;
    }
}

/*FUNCTION: validateName - checks to see if name is entered 
 *returns [boolean] - true or false based on whether or not the name is empty
 */
function validateName() {

    const nameValue = name.value;
    const regex = /^[A-Za-z]+\s?[A-Za-z]+$/;
    const check = regex.test(nameValue);

    if (check == true) {
        name.style.border = "";
        return true;
    } else {
        name.style.border = "5px solid red";
        return false;

    }

}

/*FUNCTION: validateEmail - checks to see if email is entered and in correct format
 *returns [boolean] - true or false based on whether or not the email is empty/notformatted correctly 
 */
function validateEmail() {
    const emailValue = email.value;
    const regex = /^[^@]+@[^@.]+\.[a-z]+$/i;
    const check = regex.test(emailValue);

    if (check == true) {
        email.style.border = "";
        return true;
    } else {
        email.style.border = "5px solid red";
        return false;
    }

}

/*FUNCTION: validateActivity - checks to see if at least on activity is selected 
 *returns [boolean] - true or false based on whether or not one or more is selected
 */
function validateActivity() {

    if (totalCost > 0) {
        activitiesDiv.style.border = "";
        return true;
    } else {
        activitiesDiv.style.border = "5px solid red";
        return false;
    }

}

/*FUNCTION: validateCCNum - checks to see if credit card number is entered and within 13-16 digits
 *returns [boolean] - true or false based on whether or not the number field is empty or not the correct numebr of digits
 */
function validateCCNum() {

    const ccNumValue = ccNum.value;
    const regex = /^[0-9]{13,16}$/;
    const check = regex.test(ccNumValue);

    if (check == true) {
        ccNum.style.border = "";
        return true;
    } else {
        ccNum.style.border = "5px solid red";
        return false;
    }

}

/*FUNCTION: validateZip - checks to see if zip is entered and 5 digits
 *returns [boolean] - true or false based on whether or not the zip is empty or not entered correctly
 */
function validateZip() {

    const zipValue = zip.value;
    const regex = /^[0-9]{5}$/;
    const check = regex.test(zipValue);

    if (check == true) {
        zip.style.border = "";
        return true;
    } else {
        zip.style.border = "5px solid red";
        return false;
    }

}

/*FUNCTION: validateCVV - checks to see if cvv is entered and 3 digits
 *returns [boolean] - true or false based on whether or not the cvv is empty or not 3 digits
 */
function validateCVV() {

    const cvvValue = cvv.value;
    const regex = /^[0-9]{3}$/;
    const check = regex.test(cvvValue);

    if (check == true) {
        cvv.style.border = "";
        return true;
    } else {
        cvv.style.border = "5px solid red";
        return false;
    }

}
