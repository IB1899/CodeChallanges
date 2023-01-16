//! The audio
let audio = new Audio;

//* This will auto play the song except the initial refresh.
audio.autoplay = true;

interface songs {
    id: number;
    song: string;
    singer: string;
    img: string;
    audio: string;
}

//! The songs data
let Songs: songs[] = [
    { id: 0, song: "First song/clip", singer: "First Singer", img: "music-1.jpg", audio: "music-1.mp3" },
    { id: 1, song: "Second song/clip", singer: "Second Singer", img: "music-2.jpg", audio: "music-2.mp3" },
    { id: 2, song: "Third song/clip", singer: "Third Singer", img: "music-3.jpg", audio: "music-3.mp3" },
    { id: 3, song: "Fourth song/clip", singer: "Fourth Singer", img: "music-4.jpg", audio: "music-4.mp3" },
    { id: 4, song: "Fifth song/clip", singer: "Fifth Singer", img: "music-5.jpg", audio: "music-5.mp3" },
    { id: 5, song: "Sixth song/clip", singer: "Sixth Singer", img: "music-6.jpg", audio: "music-6.mp3" }
]

//! The container
let container = document.querySelector(".container") as HTMLDivElement;

//! Places to show the song's data
let middle = document.querySelector(".middle") as HTMLDivElement;
let img = middle.querySelector("img") as HTMLImageElement;
let h2 = middle.querySelector("h2") as HTMLHeadElement;
let h3 = middle.querySelector("h3") as HTMLHeadElement;

//! The initial set up
let id = Math.floor(Math.random() * 6)
img.src = `images/${Songs[id].img}`;
h2.textContent = Songs[id].song;
h3.textContent = Songs[id].singer;
audio.src = `audios/${Songs[id].audio}`;

//! Playing next & previous song
let next = document.querySelector("#play-next") as HTMLSpanElement;
let previous = document.querySelector("#play-previous") as HTMLSpanElement;

//* Play next song
next.onclick = () => {
    if (id !== 5) { //? Not to go pass the existed songs
        id += 1
        img.src = `images/${Songs[id].img}`;
        h2.textContent = Songs[id].song;
        h3.textContent = Songs[id].singer;
        audio.src = `audios/${Songs[id].audio}`;
        play.querySelector("i")!.textContent = "pause";

        audioManipulation();
    }
}

//* Play previous song
previous.onclick = () => {
    if (id !== 0) { //? Not to go pass the existed songs
        id -= 1
        img.src = `images/${Songs[id].img}`;
        h2.textContent = Songs[id].song;
        h3.textContent = Songs[id].singer;
        audio.src = `audios/${Songs[id].audio}`;
        play.querySelector("i")!.textContent = "pause";

        audioManipulation();
    }
}

//! An icon to open the songsList
let songsListButton = document.querySelector("#songsListButton") as HTMLSpanElement;

//! The songs list
let songsList = document.querySelector(".songs") as HTMLDivElement;


//* When clicking the songsListButton open the songs list
songsListButton.onclick = () => container.classList.add("openSongList");


//* Adding the songs to the songsList.
Songs.forEach((song: songs) => {
    let music = document.createElement("div");
    music.classList.add("song")

    let h2Song = document.createElement("h2");
    let h3Song = document.createElement("h3");

    h2Song.textContent = song.song;
    h3Song.textContent = song.singer;

    music.append(h2Song);
    music.append(h3Song);

    let span = document.createElement("span");

    //* To check when the id changes 
    setInterval(() => {
        //? If the the music is running add "playing" beside it
        if (id === song.id) {
            span.classList.add("playing");
            span.textContent = "playing...";
            music.append(span);
        }
        else { //? if not the then delete its value, so when we change the song delete "playing" from the previous one and add it to the new one
            span.textContent = ""
        }
    }, 4000)

    songsList.append(music);

    //* When clicking on a song in the songs list play it.
    music.onclick = () => {

        id = song.id;

        img.src = `images/${Songs[id].img}`;
        h2.textContent = Songs[id].song;
        h3.textContent = Songs[id].singer;
        audio.src = `audios/${Songs[id].audio}`;

        play.querySelector("i")!.textContent = "pause";
        container.classList.remove("openSongList");

        audioManipulation();
    }
});


//! Button to close the songs list
let closeButton = document.querySelector("#close") as HTMLSpanElement;

closeButton.onclick = () => container.classList.remove("openSongList");

//! The play button (to play the song or stop playing them)
let play = document.querySelector(".play") as HTMLSpanElement;

//* When clicking the play button 
play.onclick = () => {

    //? If playing stop , If not playing play.
    if (play.querySelector("i")!.textContent === "pause") {

        play.querySelector("i")!.textContent = "play_arrow"
        audio.pause();
    }
    else {
        play.querySelector("i")!.textContent = "pause"
        audio.play();
    }
}

//! The slider represents audio's progress.
let slider = middle.querySelector("input[type=range]") as HTMLInputElement;
let currentTime = middle.querySelector(".currentTime") as HTMLSpanElement;
let totalTime = middle.querySelector(".totalTime") as HTMLSpanElement;

//* Manipulating the time of the audio.
let audioManipulation = () => {

    currentTime.textContent = "0";
    slider.valueAsNumber = 0;

    //* The purpose of the timeout is that because we can't access the audio's duration immediately.
    setTimeout(() => {

        //* Displaying the audio's currentTime & duration in a <span>
        currentTime.textContent = Math.floor(audio.currentTime).toString();
        totalTime.textContent = Math.floor(audio.duration).toString();

        //* Setting the max value of the slider to audio's duration.
        slider.max = Math.floor(audio.duration).toString();

        //! Manipulating the audio's time.
        //* When changing the slider's value => Update the audio's current time to that value.
        slider.oninput = () => {
            audio.currentTime = slider.valueAsNumber;
            currentTime.textContent = slider.value;
        }

        //* Updating the displayed time each second.
        setInterval(() => {
            currentTime.textContent = Math.floor(audio.currentTime).toString();
            slider.valueAsNumber = Math.floor(audio.currentTime);
        }, 1000)

    }, 3000);
}
audioManipulation();


//! Button to make the song run in a loop
let loop = document.querySelector("#loop") as HTMLSpanElement;

loop.onclick = () => {
    //? If no loop make one , if we have loop cancel it.
    if (loop.textContent === "sync_alt") {

        audio.loop = true;
        loop.textContent = "all_inclusive";
    }
    else {
        audio.loop = false;
        loop.textContent = "sync_alt";
    }
}