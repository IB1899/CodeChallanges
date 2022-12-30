//! ctrl + f =>  searching for key words

//* The letters
let letters = document.querySelectorAll<HTMLDivElement>(".letter");

//* Display the letters when we click on them
let h1 = document.createElement("h1")!;
document.body.prepend(h1);

letters.forEach(letter => {

    //? Making sure we're clicking only on the letters
    if (letter.textContent === "enter" || letter.textContent === "delete" || letter.textContent === "uppercase") { }
    else {
        letter.onclick = () => {
            h1.textContent += letter.textContent!;
        }
    }
})

//* Turning the letters to uppercase
let uppercase = document.querySelector(".uppercase") as HTMLDivElement;
uppercase.onclick = () => {

    //? Check if the letters are already uppercase turn them to lowercase , and reverse
    function isUpperCase(str: string) {
        //* Returns true if the parameter is uppercase  , and false if it's lowercase
        return str === str.toUpperCase();
    }

    letters.forEach(letter => {

        //! Turn letters only
        if (letter.textContent === "enter" || letter.textContent === "delete" || letter.textContent === "uppercase") { }
        else {
            if (isUpperCase(letter.textContent!)) {
                letter.textContent = letter.textContent?.toLocaleLowerCase()!;
            }
            else {
                letter.textContent = letter.textContent?.toUpperCase()!;
            }
        }
    })
}

//* Adding space button
let space = document.querySelector(".space") as HTMLDivElement;
space.onclick = () => {
    h1.textContent += space.textContent!
}

//* Deleting a letter
let Delete = document.querySelector(".delete") as HTMLDivElement;
Delete.onclick = () => {
    if (h1.textContent) {
        h1.textContent = h1.textContent.toString().slice(0, -1);
    }
}

//* Submit the text and hide the keyboard
let enter = document.querySelector(".enter") as HTMLButtonElement;
let keyboard = document.querySelector(".keyboard") as HTMLDivElement;
let result = document.querySelector("h1") as HTMLHeadElement;
enter.onclick = () => {

    if (h1.textContent) {
        let result = document.createElement("h1");
        result.className = "result"
        document.body.prepend(result);

        keyboard.classList.add("done");
        result.textContent = h1.textContent;
        h1.style.cssText = "display:none;"
    }
}