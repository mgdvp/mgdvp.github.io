let timer;
let started = false;
let minutesInput = document.getElementById('minutes');
let secondsInput = document.getElementById('seconds');

secondsInput.oninput = (e) => {
  if(e.target.value > 59){
    e.target.value = e.target.value.slice(-1);
  }
  if(e.target.value.length > 2){
    e.target.value = e.target.value.slice(1);
  }
}

minutesInput.oninput = (e) => {
  if(e.target.value.length > 2){
    e.target.value = e.target.value.slice(-1);
  }
}

function startTimer() {
  if(!started){
    let totalSeconds = parseInt(minutesInput.value || 0) * 60 + parseInt(secondsInput.value || 0);
    minutesInput.readOnly = true;
    secondsInput.readOnly = true;
    started = true;
    updateInputs(totalSeconds);
  
    timer = setInterval(function() {
      if (totalSeconds <= 0) {
        clearInterval(timer);
        minutesInput.value = '00';
        secondsInput.value = '00';
      } else {
        totalSeconds--;
        updateInputs(totalSeconds);
      }
    }, 1000);
  }
}

function updateInputs(totalSeconds) {
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  let displayMinutes = `${minutes < 10 ? '0' : ''}${minutes}`;
  let displaySeconds = `${seconds < 10 ? '0' : ''}${seconds}`;

  minutesInput.value = displayMinutes;
  secondsInput.value = displaySeconds;
}

function resetTimer() {
  clearInterval(timer);
  started = false;
  minutesInput.value = '40';
  secondsInput.value = '00';
}
