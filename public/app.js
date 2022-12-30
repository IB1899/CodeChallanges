"use strict";
//! ctrl + f =>  searching for key words
//* The letters
let letters = document.querySelectorAll(".letter");
//* Display the letters when we click on them
let h1 = document.createElement("h1");
document.body.prepend(h1);
letters.forEach(letter => {
    //? Making sure we're clicking only on the letters
    if (letter.textContent === "enter" || letter.textContent === "delete" || letter.textContent === "uppercase") { }
    else {
        letter.onclick = () => {
            h1.textContent += letter.textContent;
        };
    }
});
//* Turning the letters to uppercase
let uppercase = document.querySelector(".uppercase");
uppercase.onclick = () => {
    //? Check if the letters are already uppercase turn them to lowercase , and reverse
    function isUpperCase(str) {
        //* Returns true if the parameter is uppercase  , and false if it's lowercase
        return str === str.toUpperCase();
    }
    letters.forEach(letter => {
        var _a, _b;
        //! Turn letters only
        if (letter.textContent === "enter" || letter.textContent === "delete" || letter.textContent === "uppercase") { }
        else {
            if (isUpperCase(letter.textContent)) {
                letter.textContent = (_a = letter.textContent) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase();
            }
            else {
                letter.textContent = (_b = letter.textContent) === null || _b === void 0 ? void 0 : _b.toUpperCase();
            }
        }
    });
};
//* Adding space button
let space = document.querySelector(".space");
space.onclick = () => {
    h1.textContent += space.textContent;
};
//* Deleting a letter
let Delete = document.querySelector(".delete");
Delete.onclick = () => {
    if (h1.textContent) {
        h1.textContent = h1.textContent.toString().slice(0, -1);
    }
};
//* Submit the text and hide the keyboard
let enter = document.querySelector(".enter");
let keyboard = document.querySelector(".keyboard");
let result = document.querySelector("h1");
enter.onclick = () => {
    if (h1.textContent) {
        let result = document.createElement("h1");
        result.className = "result";
        document.body.prepend(result);
        keyboard.classList.add("done");
        result.textContent = h1.textContent;
        h1.style.cssText = "display:none;";
    }
};
