let countdownIntervalId;
let startTime;
let remainingTime;
let lastRemainingTimeMinutes;
let lastRemainingTimeSecondes;
let audio;
let compteurUtilisations;
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

    muteBtn = document.getElementById('mute-btn');
    soundBtn = document.getElementById('sound-btn');

    muteBtn.addEventListener('click', soundReverse);
    soundBtn.addEventListener('click', soundReverse);

    audio = new Audio('./assets/sounds/alarme_bipcourt.mp3');
    isSound = true;
    muteBtn.disabled = isSound;
    soundBtn.disabled = !isSound;

    minutesInput = document.getElementById('minutes');
    secondsInput = document.getElementById('seconds');

    startBtn = document.getElementById('start-btn');
    stopBtn = document.getElementById('stop-btn');
    resetBtn = document.getElementById('reset-btn');

    compteurSerie = document.getElementById("compteur-de-serie");
    compteurUtilisations = 1;
    compteurSerie.innerHTML = compteurUtilisations;

    progressBar = document.getElementById('progress-bar');

    countdownPreset = document.getElementById("countdown-preset");
    
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
        progressBar.style.animation = null; 
        progressBar.offsetHeight;
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
    if(value == "00:00") return;
    let option = document.createElement("option");
    option.text = value;
    option.value = value;
    if(value == "01:00") option.selected = true;
    countdownPreset.add(option);
}

/* SAVE PRESET IF RESET */
function updateCountPreset() {
    const minutes = parseInt(minutesInput.value);
    const seconds = parseInt(secondsInput.value);

    lastRemainingTimeMinutes = minutes;
    lastRemainingTimeSecondes = seconds;
}

/* OUTILS */
function addLeadingZero(e) {
    const input = e.target;
    if (input.value.length === 1) {
        input.value = '0' + input.value;
    }
}
function twoDigits(string) {
    return string.toString().padStart(2, '0');
}

