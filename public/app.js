"use strict";
//* Adding options to the select element Hours.
let Hours = document.querySelector("#hours");
for (let i = 1; i <= 12; i++) {
    i = i < 10 ? "0" + i : i;
    let option = document.createElement("option");
    option.value = `${i}`;
    option.textContent = `${i}`;
    Hours.add(option);
}
//* Adding options to the select element Minutes.
let Minutes = document.querySelector("#minutes");
for (let i = 0; i <= 59; i++) {
    i = i < 10 ? "0" + i : i;
    let option = document.createElement("option");
    option.value = `${i}`;
    option.textContent = `${i}`;
    Minutes.add(option);
}
//Todo------------------------------------------------------------------------
//! To play ringtone when the alarm rings
let audio = new Audio("files/ringtone.mp3");
//! Clear alarm button
let button = document.querySelector("button");
//! To disable the inputs after we set the alarm
let Setting = document.querySelector(".settings");
//! To set or clear the alarm
let IsAlarmSated = false;
//! The satedAlarm by the user
let satedAlarm;
//* PM or AM
let Time = document.querySelector("#time");
//* Setting the alarm
let SetAlarm = () => {
    //? If we have sated the alarm. clear it
    if (IsAlarmSated) {
        Hours.value = Hours[0].textContent;
        Minutes.value = Minutes[0].textContent;
        Time.value = Time[0].textContent;
        satedAlarm = "";
        audio.pause();
        button.textContent = "Set Alarm";
        Setting.classList.remove("disable");
        IsAlarmSated = false;
    }
    else {
        //* Checking if the alarm's inputs valid.
        if (Hours.value === "Hour" || Minutes.value === "Minutes" || Time.value === "AM/PM") {
            return alert("Please enter a valid time");
        }
        satedAlarm = `${Hours.value}:${Minutes.value}:00: ${Time.value}`;
        button.textContent = "Clear Alarm";
        Setting.classList.add("disable");
        IsAlarmSated = true;
    }
};
button.onclick = SetAlarm;
//Todo------------------------------------------------------------------------
//! Header to show the current time
let time = document.querySelector(".time");
//* Showing & updating & checking the time.
setInterval(() => {
    let date = new Date();
    let hour = date.getHours();
    //? If hour less or equal 12 set it to PM else it's AM
    let AMOrPM = hour <= 12 ? "AM" : "PM";
    let TwelveHourFormat = (date.getHours() + 24) % 12 || 12;
    //? Adding 0 if the hour is less the 10
    TwelveHourFormat = TwelveHourFormat < 10 ? "0" + TwelveHourFormat : TwelveHourFormat;
    let minutes = date.getMinutes();
    //? Adding 0 if the minute is less the 10
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let seconds = date.getSeconds();
    //? Adding 0 if the second is less the 10
    seconds = seconds < 10 ? "0" + seconds : seconds;
    let currentTime = `${TwelveHourFormat}:${minutes}:${seconds}: ${AMOrPM}`;
    time.textContent = currentTime;
    //* Checking the satedAlarm with the current time
    if (satedAlarm === currentTime) {
        audio.play();
        audio.loop = true;
    }
}, 1000);
