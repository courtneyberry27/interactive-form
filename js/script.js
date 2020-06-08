const entireForm = document.querySelector('#entire-form');
const submitButton = document.querySelector('#submit-btn');



/******************************* 
 *General Information Section
 ********************************/
const name = document.getElementById('name');
const email = document.querySelector('#mail');
const otherTitle = document.querySelector('#other-title');
otherTitle.style.display = 'none';
const otherLabel = document.querySelector("#other-label")
otherLabel.style.display = "none";
const jobs = document.querySelectorAll('#title');

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
const designs = document.querySelectorAll('#design');
const colors = document.querySelector('#color');
const allColorsDiv = document.querySelector('#colors-js-puns select');
const iLoveJSColors = document.querySelectorAll('#color option:nth-child(n+4)');
const jsPunsColors = document.querySelectorAll('#color option:nth-child(-n+3)');

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
const activitiesInputs = document.querySelectorAll('.activities input');
const activitiesDiv = document.querySelector('.activities');
const totalCostDiv = document.createElement('div');
activitiesDiv.appendChild(totalCostDiv);
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

//makes sure users cannot select the "Select Method of Payment" option in the drop down list

function hide(paymentChoice) {
    paymentChoice.style.display = 'none';
}

function show(paymentChoice) {
    paymentChoice.style.display = '';
}
//makes credit card the default option and removes select payment option
paymentMethods.removeChild(selectMethodOption);
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
const regexName = /^[A-Za-z]+\s?[A-Za-z]+$/;
const regexEmail = /^[^@]+@[^@.]+\.[a-z]+$/i;
const regexCCNum = /^[0-9]{13,16}$/;
const regexZip = /^[0-9]{5}$/;
const regexCVV = /^[0-9]{3}$/;

submitButton.addEventListener('click', (e) => {
    validateAll();

    if (validateAll() == true) {
        console.log("submitted");

    } else {
        e.preventDefault();
    }
});

/*FUNCTION: validate - calls all validation functions
 *returns [boolean] - true or false based on whether or not the form is complete
 */
function validateAll() {
    validateAspect(name, regexName);
    validateAspect(email, regexEmail);
    validateActivity();
    validateAspect(ccNum, regexCCNum);
    validateAspect(zip, regexZip);
    validateAspect(cvv, regexCVV);

    if (validateAspect(name, regexName) == true && validateAspect(email, regexEmail) == true && validateActivity() == true && validateAspect(ccNum, regexCCNum) == true && validateAspect(zip, regexZip) == true && validateAspect(cvv, regexCVV) == true) {
        return true;
    } else if (validateAspect(name, regexName) == true && validateAspect(email, regexEmail) == true && validateActivity() == true && (selectMethodOption.value == 'paypal' || selectMethodOption.value == "bitcoin")) {
        return true;
    } else {
        return false;
    }

}



/*FUNCTION: validateAspect - checks to see if aspect is true or false with given regex 
 *aspect [input element] - this is name, email, ccNum, zip, and cvv
 *regex [regex] - this is the regular expressin for evaluating whether the aspect is true or false
 *returns [boolean] - true or false based on whether or not the input is valid
 */

function validateAspect(aspect, regex) {

    const value = aspect.value;
    const check = regex.test(value);

    if (check == true) {
        aspect.style.border = "";
        return true;
    } else {
        aspect.style.border = "3px solid fuchsia";
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
        activitiesDiv.style.border = "3px solid fuchsia";
        return false;
    }

}

