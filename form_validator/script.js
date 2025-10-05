const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

//show input errormessage
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

//show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

//check valid email
function checkEmail(input) {
  const isValidEmail = String(input.value.trim())
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  if (isValidEmail) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid.");
  }
}

//Check required field
function checkRequiredField(input) {
  let isValidInput = true;

  if (input.value.trim() === "") {
    showError(input, `${getFieldName(input.id)} is required.`);
    isValidInput = false;
  } else {
    showSuccess(input);
  }
  return isValidInput;
}

//Get titlecase fieldname
function getFieldName(input) {
  if (input == "confirmPassword") {
    return "Confirm password";
  }
  return input.charAt(0).toUpperCase() + input.slice(1);
}

//check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input.id)} must be at least ${min} characters.`
    );
    return false;
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input.id)} must be less than ${max} characters.`
    );
    return false;
  } else {
    showSuccess(input);
  }
  return true;
}

//check strong password
/*
^                               start anchor
(?=(.*[a-z]){1,})               lowercase letters. {1,} indicates that you want 1 of this group
(?=(.*[A-Z]){1,})               uppercase letters. {1,} indicates that you want 1 of this group
(?=(.*[0-9]){1,})               numbers. {1,} indicates that you want 1 of this group
(?=(.*[!@#$%^&*()\-__+.]){1,})  all the special characters in the [] fields. The ones used by regex are escaped by using the \ or the character itself. {1,} is redundant, but good practice, in case you change that to more than 1 in the future. Also keeps all the groups consistent
{8,}                            indicates that you want 8 or more
$                               end anchor
*/
function checkPasswordStrength(input) {
  const password = input.value.trim();
  let isStrongPassword = false;
  console.log(password);
  const hasAtleastOneLowerCase = new RegExp("^(?=(.*[a-z]){1,})").test(
    password
  );

  if (hasAtleastOneLowerCase) {
    const hasAtleastOneUpperCase = new RegExp("^(?=(.*[A-Z]){1,})").test(
      password
    );
    if (hasAtleastOneUpperCase) {
      const hasAtleastOneNumber = new RegExp("^(?=(.*[0-9]){1,})").test(
        password
      );
      if (hasAtleastOneNumber) {
        const hasAtleastOneSpecialCharacter = new RegExp(
          "^(?=(.*[!@#$%^&*()+]){1,})"
        ).test(password);
        if (hasAtleastOneSpecialCharacter) {
          isStrongPassword = true;
        } else {
          showError(input, "Password must have at least 1 special character.");
        }
      } else {
        showError(input, "Password must have at least 1 number.");
      }
    } else {
      showError(input, "Password must have at least 1 upper case character.");
    }
  } else {
    showError(input, "Password must have at least 1 lower case character.");
  }

  return isStrongPassword;
}
//check password match
function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Password do not match.");
    return false;
  }
  return true;
}

//check valid userName
function checkValidUsername(username) {
  if (checkRequiredField(username)) {
    if (checkLength(username, 3, 25)) {
    }
  }
}

//check valid email
function checkValidEmail(email) {
  if (checkRequiredField(email)) {
    if (checkEmail(email)) {
    }
  }
}

//check valid password
function checkValidPassword(password) {
  if (checkRequiredField(password)) {
    if (checkLength(password, 8, 20)) {
      if (checkPasswordStrength(password)) {
      }
    }
  }
}

//check valid confirm password
function checkValidConfirmPassword(input1, input2) {
  if (checkRequiredField(input2)) {
    if (checkPasswordMatch(input1, input2)) {
    }
  }
}
//Event listeners
form.addEventListener("submit", function (event) {
  event.preventDefault();

  checkValidUsername(username);
  checkValidEmail(email);
  checkValidPassword(password);
  checkValidConfirmPassword(password, confirmPassword);
});
