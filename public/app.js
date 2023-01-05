"use strict";
//! The container
let afterScreening = document.querySelector(".afterScreening");
//! The first capture button
let firstButton = document.querySelector(".firstButton");
//! The close button
let Close = document.querySelector("#close");
firstButton.onclick = async () => {
    try {
        //* mediaDevices provides access to connected media inputs like camera , microphones and screen sharing.
        let stream = await navigator.mediaDevices.getDisplayMedia();
        let video = document.createElement("video");
        video.onloadedmetadata = () => {
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");
            //* Passing video's width & height as canvas's width & height
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            video.play();
            //* Drawing an image from the captured video stream
            ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
            //* Terminating first video track of the stream
            stream.getVideoTracks()[0].stop();
            afterScreening.classList.add("show");
            let img = afterScreening.querySelector("img");
            img.src = canvas.toDataURL();
        };
        video.srcObject = stream;
    }
    catch (err) {
        alert("Failed to capture the screen");
    }
};
Close.onclick = () => {
    afterScreening.classList.remove("show");
};
