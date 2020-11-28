// Check if the given input is valid
function isValidInput() {
    addFormValidation()
    return formValidation.reduce((aggr, item) => validateInput(item.id, item.test) && aggr, true);
}

// Check that the input is both not empty and follows the expected format
const formValidation = [
    {id: 'fname', test: composef(notEmpty, alphabetic)},
    {id: 'lname', test: composef(notEmpty, alphabetic)},
    {id: 'phone', test: composef(notEmpty, numeric)},
    {id: 'address', test: composef(notEmpty, alphanumeric)},
    {id: 'zip', test: composef(notEmpty, numeric)},
    {id: 'country', test: composef(notEmpty, alphabetic)},
    {id: 'county', test: composef(notEmpty, alphabetic)},
    {id: 'email', test: composef(notEmpty, validEmail)},
];

// Compose functions and see if the
// validation tests return an error or null
function composef(...funcs) {
    return input => funcs.reduce((error, test) => error || test(input), null);
}

// Validate input and display an error message if the input is not valid
function validateInput(id, test) {
    const value = document.getElementById(id);
    const msgEl = document.getElementById(id + "Error");
    const error = test(value);
    msgEl.innerHTML = error;
    if(!error) {
        msgEl.style.visibility = 'hidden';
        return true;
    }
    msgEl.style.visibility = '';
    return false;
}

// Re-validate form when the user deselects a field
function addFormValidation() {
    formValidation.forEach(item => {
        const input = document.getElementById(item.id);
        input.addEventListener("blur", () => validateInput(item.id, item.test));
    });
}

// Check that the input is not empty
function notEmpty(input)
{
    if(input.value.length == 0)
    {
        return "This field is required.";
    }
    return null;
}

// Check that the input is alphabetic
function alphabetic(input)
{
    const letters = /^[A-Za-z_ ]+$/;
    if(input.value.match(letters))
    {
        return null;
    }
    return "May only contain letters.";
}

// Check that the input is numeric
function numeric(input)
{
    const numbers = /^[0-9_ ]+$/;
    if(input.value.match(numbers))
    {
        return null;
    }
    return "May only contain numbers.";
}

// Check that the input is alphanumeric
function alphanumeric(input)
{
    const letters = /^[0-9a-zA-Z_ ]+$/;
    if(input.value.match(letters))
    
        return null;
    }
    return "May only contain numbers and letters.";
}

// Check that the input is of a valid Email format
function validEmail(input)
{
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.value))
    {
        return null;
    }
    return "Invalid email."
}
