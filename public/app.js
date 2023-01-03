"use strict";
//! The volumeSlider. to manipulate the sound volume.
let volumeSlider = document.querySelector("#sliderInput");
//* When changing the input of the volumeSlider run this function
volumeSlider.oninput = () => {
    //? 'audio.volume' accepts a range between 0 , 1
    audio.volume = volumeSlider.valueAsNumber;
};
//-------------------------------------------------------------------------
//! Check box. to show and hide the letters in the keys
let checkBox = document.querySelector("#checkBox");
//! Blocks. to change its classlist
let blocks = document.querySelectorAll(".block");
//* Show and hide the letters when clicking the checkbox.
checkBox.onclick = () => {
    if (checkBox.checked === false) {
        blocks.forEach(block => block.classList.add("hide"));
    }
    else {
        blocks.forEach(block => block.classList.remove("hide"));
    }
};
//-------------------------------------------------------------------------
//! The piano keys
let keys = document.querySelectorAll(".key");
//! Instance of the Audio class to manipulate audio files
let audio = new Audio("");
//* Clicking the keys.
keys.forEach(key => {
    //* Each key has a specific value.
    key.onclick = () => {
        //! The key value "key.dataset.key" = the audio file name ,
        //* so when clicking on each key it will play different audio files
        audio.src = `audio/${key.dataset.key}.wav`;
        audio.play();
    };
});
//* Clicking the keyboard.
//* When clicking the keyboard button play the same tune of the letter.
document.onkeydown = (e) => {
    keys.forEach(key => {
        //? Check the clicked keyboard key is in the list of keys 
        if (e.key === key.dataset.key) {
            audio.src = `audio/${e.key}.wav`;
            audio.play();
            key.classList.add("active");
            setTimeout(() => {
                key.classList.remove("active");
            }, 100);
        }
    });
    //! or
    // let AllKeys:string[];
    // keys.forEach(key=>{
    //     AllKeys.push(key.dataset.key!);
    //     if(AllKeys.includes(e.key)){
    //          run the audio
    //     }
    // })
};
//-------------------------------------------------------------------------
