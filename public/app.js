"use strict";
//! The password
let password = document.querySelector(".password");
//! Copy password button
let CopyButton = document.querySelector("#copy");
//* When clicking the copy button => copy the password
let CopyPassword = async () => {
    //* Saving to the clipboard the password.textContent
    await navigator.clipboard.writeText(password.textContent);
    CopyButton.textContent = "done";
    CopyButton.style.cssText = "color:darkorchid;";
    setTimeout(() => {
        CopyButton.textContent = "content_copy";
    }, 1000);
};
CopyButton.onclick = CopyPassword;
//todo----------------------------------------------------------------------------
//! The slider that determents how long the generated password is.
let passwordSlider = document.querySelector("#slider");
//! Span to show the value of the "passwordSlider".
let PasswordLengthShow = document.querySelector("#PasswordLength");
//! A bar to show the password strength.
let PasswordStrength = document.querySelector(".PasswordStrength");
//* When changing the value of the 'passwordSlider' => set its value to 'PasswordLengthShow'.
passwordSlider.oninput = () => {
    PasswordLengthShow.textContent = passwordSlider.value;
    //* The strength of the password. conditions
    if (passwordSlider.valueAsNumber > 17 && passwordSlider.valueAsNumber < 25) {
        PasswordStrength.className = "strong";
    }
    else if (passwordSlider.valueAsNumber >= 25) {
        PasswordStrength.className = "veryStrong";
    }
    else if (passwordSlider.valueAsNumber < 13 && passwordSlider.valueAsNumber >= 8) {
        PasswordStrength.className = "weak";
    }
    else if (passwordSlider.valueAsNumber < 8) {
        PasswordStrength.className = "veryWeak";
    }
    else {
        PasswordStrength.className = "PasswordStrength";
    }
};
//todo-----------------------------------------------------------------------------
//! The checkboxes for making conditions on the generated password.
// let LowerCase = document.querySelector("#lowercase") as HTMLInputElement;
// let UpperCase = document.querySelector("#uppercase") as HTMLInputElement;
// let Numbers = document.querySelector("#number") as HTMLInputElement;
// let Symbols = document.querySelector("#symbols") as HTMLInputElement;
// let IncludeSpaces = document.querySelector("#IncludeSpaces") as HTMLInputElement;
let ExcludeDuplicates = document.querySelector("#ExcludeDuplicates");
let options = document.querySelectorAll(".PasswordSettings input");
//! The generate password button.
let GeneratePasswordButton = document.querySelector(".generate");
//* To invoke its properties based on the option.id
let charactersConditions = {
    lowercase: "qwertyuiopasdfghjklzxcvbnm",
    uppercase: "QWERTYUIOPASDFGHJKLZXCVBNM",
    number: "1234567890",
    symbols: "!@#$%^&*()-?/<>",
    IncludeSpaces: "          "
};
//* Generating strings & passing the generated strings to the password.
let GeneratePassword = () => {
    let characters = "";
    password.textContent = "";
    // //* Conditions based on the checks of the checkboxes
    // if (LowerCase.checked) { characters += "qwertyuiopasdfghjklzxcvbnm" }
    // if (UpperCase.checked) { characters += "QWERTYUIOPASDFGHJKLZXCVBNM" }
    // if (Numbers.checked) { characters += "1234567890" }
    // if (Symbols.checked) { characters += "!@#$%^&*()-?/<>" }
    // if (IncludeSpaces.checked) { characters += "          " }
    options.forEach(option => {
        if (option.checked) {
            //? Only the checked options here.
            if (option.id !== "ExcludeDuplicates") {
                //* Setting the characters value to be the 'charactersConditions' property based on the option id.
                characters += charactersConditions[option.id];
                //! Therefor the characters value will be the value of the checked options
            }
        }
    });
    //* Preventing an infinite loop. in case characters <= 38 and the ExcludeDuplicates is checked 
    if (characters.length <= 38) {
        ExcludeDuplicates.checked = false;
    }
    //* Loop according to the length of the passwordSlider
    for (let i = 0; i < passwordSlider.valueAsNumber; i++) {
        let randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length));
        // let randomCharacter:string = characters[Math.floor(Math.random() * characters.length)]
        //? If we don't want duplicates
        if (ExcludeDuplicates.checked) {
            //? If we don't have the latter => add the letter
            if (!password.textContent.includes(randomCharacter)) {
                password.textContent += randomCharacter;
            }
            //? If we have the letter already => run the loop one more time
            else {
                i -= 1;
            }
        }
        else {
            //* Each run it will return a random character
            password.textContent += randomCharacter;
        }
    }
};
GeneratePasswordButton.onclick = GeneratePassword;
//* To make it run in the initial refresh.
GeneratePassword();
