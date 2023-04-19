/* RegExp */
let regexp_inputNumber = /^([0-9]){2}$/;

let countdownIntervalId;
let startTime;
let remainingTime; 
let audio;
let compteurUtilisations;

/* PastValue */
let lastRemainingTimeMinutes;
let lastRemainingTimeSecondes;

/* Boolean */
let isSound;

/* ElementById */
let minutesInput;
let secondsInput;
let startBtn;
let stopBtn;
let resetBtn;
let compteurSerie;
let progressBar;
let countdownPreset;
let muteBtn;
let soundBtn;

window.addEventListener("DOMContentLoaded", () => {
    console.info("DOM fully loaded and parsed, start JS");

    muteBtn = _id('mute-btn');
    soundBtn = _id('sound-btn');

    muteBtn.addEventListener('click', soundReverse);
    soundBtn.addEventListener('click', soundReverse);

    audio = new Audio('./assets/sounds/alarme_bipcourt.mp3');
    isSound = true;
    muteBtn.disabled = isSound;
    soundBtn.disabled = !isSound;

    minutesInput = _id('minutes');
    secondsInput = _id('seconds');

    startBtn = _id('start-btn');
    stopBtn = _id('stop-btn');
    resetBtn = _id('reset-btn');

    compteurSerie = _id("compteur-de-serie");
    compteurUtilisations = 1;
    compteurSerie.innerHTML = compteurUtilisations;

    progressBar = _id('progress-bar');

    countdownPreset = _id("countdown-preset");
    
    minutesInput.addEventListener('input', addLeadingZero);
    secondsInput.addEventListener('input', addLeadingZero);

    startBtn.addEventListener('click', startCountdown);
    stopBtn.addEventListener('click', stopCountdown);
    resetBtn.addEventListener('click', resetCountdown);

    countdownPreset.addEventListener('change', updateCountdownPreset);

    minutesInput.addEventListener('change', updateCountPreset);
    secondsInput.addEventListener('change', updateCountPreset);

    updateCountPreset();
    loadPreset();
    startBtn.disabled = false;
    stopBtn.disabled = true;
});

/* BUTTONS */
function startCountdown() {
    const minutes = parseInt(minutesInput.value);
    const seconds = parseInt(secondsInput.value);
    startBtn.disabled = true;
    stopBtn.disabled = false;
    countdownPreset.disabled = true;

    if (isNaN(minutes) || isNaN(seconds)) {
        alert('Please enter a valid number for minutes and seconds.');
        return;
    }

    remainingTime = minutes * 60 + seconds;

    if (remainingTime <= 0) {
        alert('Please enter a valid time for the countdown.');
        return;
    }

    startTime = new Date().getTime();
    countdownIntervalId = setInterval(updateCountdown, 1000);
}
function stopCountdown() {
    if (remainingTime > 0) {
        clearInterval(countdownIntervalId);
        updateProgressBar(0,"stop");
        startBtn.disabled = false;
        stopBtn.disabled = true;
        countdownPreset.disabled = true;
    }
}
function resetCountdown() {
    clearInterval(countdownIntervalId);
    updateProgressBar(0,"reset");
    startBtn.disabled = false;
    stopBtn.disabled = true;
    countdownPreset.disabled = false;
    compteurUtilisations = 1;
    compteurSerie.innerHTML = compteurUtilisations;
    minutesInput.value = twoDigits(lastRemainingTimeMinutes);
    secondsInput.value = twoDigits(lastRemainingTimeSecondes);
}

/* COUNT UPDATE DOWN*/
function updateCountdown() {
    remainingTime -= 1;

    if (remainingTime < 0) {
        clearInterval(countdownIntervalId);
        updateProgressBar(0,"reset");
        startBtn.disabled = false;
        stopBtn.disabled = true;
        countdownPreset.disabled = false;

        if(isSound) audio.play();

        compteurUtilisations++;
        compteurSerie.innerHTML = compteurUtilisations;
        
        minutesInput.value = twoDigits(lastRemainingTimeMinutes);
        secondsInput.value = twoDigits(lastRemainingTimeSecondes);

        return;
    }

    const totalTime = lastRemainingTimeMinutes * 60 + lastRemainingTimeSecondes;
    updateProgressBar(totalTime,"start");

    let minutes = Math.floor(remainingTime / 60);
    let seconds = Math.floor(remainingTime % 60);

    minutesInput.value = twoDigits(minutes);
    secondsInput.value = twoDigits(seconds);
}

/* PREGRESS BAR */
function updateProgressBar(totalTime, who) {
    console.log(totalTime, who);
    if(who == "start") {
        progressBar.style.setProperty("--total-time", `${totalTime}s`);
        progressBar.style.setProperty("--state-play", "running");
    }
    if(who == "stop") {
        progressBar.style.setProperty("--state-play", "paused");
    }
    if(who == "reset") {
        progressBar.style.setProperty("--total-time", `${totalTime}s`);
        progressBar.style.setProperty("--state-play", "paused");
        progressBar.style.animation = 'none';
        progressBar.offsetHeight;
        progressBar.style.animation = null; 
    }
}

/* SOUND */
function soundReverse() {
    isSound = !isSound;
    muteBtn.disabled = isSound;
    soundBtn.disabled = !isSound;
}

/* PRESET */
function updateCountdownPreset() {
    const values = countdownPreset.value;
    const minutes = values.split(":")[0];
    const seconds = values.split(":")[1];
    
    minutesInput.value = twoDigits(minutes);
    secondsInput.value = twoDigits(seconds);
    updateCountPreset();
}
function loadPreset() {
    for (let i = 0; i < 6; i++) {
        const minutes = twoDigits(i);
        ajouterOption(minutes+":00");    
        ajouterOption(minutes+":30");  
    }
}
function ajouterOption(value) {
    if(value == "00:00") return false;
    let option = document.createElement("option");
    option.text = value;
    option.value = value;
    if(value == "01:00") option.selected = true;
    countdownPreset.add(option);
}

/* SAVE PRESET IF RESET */
function updateCountPreset(e) {
    if(regexp_inputNumber.test(e.target.value)) {
        const minutes = parseInt(minutesInput.value);
        const seconds = parseInt(secondsInput.value);
        
        lastRemainingTimeMinutes = minutes;
        lastRemainingTimeSecondes = seconds;
    } else {
        e.target.value = twoDigits(e.target.value);
        updateCountPreset(e);
    }
}

/* OUTILS */
// function addLeadingZero(e) {
//     const input = e.target;
//     if (input.value.length === 1) {
//         input.value = '0' + input.value;
//     }
// }
// function twoDigits(string) {
//     return string.toString().padStart(2, '0');
// }

