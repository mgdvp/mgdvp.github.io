let timer;
let started = false;
let paused = false;
let minutesInput = document.getElementById('minutes');
let secondsInput = document.getElementById('seconds');
let totalSeconds;

function closeHint() {
  document.getElementById('hint').remove();
}

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

secondsInput.onfocus = () => {
  closeHint();
}
minutesInput.onfocus = () => {
  closeHint();
}

document.getElementById('start').addEventListener('click', startOrPause);
document.getElementById('reset').addEventListener('click', resetTimer);

function startOrPause(e) {
  if(!started && !paused){
    document.getElementById('reset').style.display = 'inline';
    totalSeconds = parseInt(minutesInput.value || 0) * 60 + parseInt(secondsInput.value || 0);
    minutesInput.readOnly = true;
    secondsInput.readOnly = true;
    started = true;
    e.target.textContent = 'Pause';

    startTimer();

  } else if(started && !paused){
    paused = true;
    e.target.textContent = 'Resume';
    clearInterval(timer);
  } else if(started && paused){
    paused = false;
    e.target.textContent = 'Pause';
    startTimer();
  }
}

function startTimer() {
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
  paused = false;
  document.getElementById('reset').style.display = 'none';
  document.getElementById('start').textContent = 'Start';
  minutesInput.value = '40';
  secondsInput.value = '00';
  minutesInput.readOnly = false;
  secondsInput.readOnly = false;
}

// bg image select logic
const bgButtons = document.getElementById('bgs').querySelectorAll('[id^="bg"]');

bgButtons.forEach(button => {
  button.addEventListener('click', () => {
    const bgId = button.id;
    document.getElementById('bgimg').src = `backgrounds/${bgId}.jpg`;

    document.querySelector('.selected')?.classList.remove('selected');
    button.classList.add('selected');
  });
});


document.getElementById('close-modal').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'none';
});
document.getElementById('select-bg').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'block';
});

document.getElementById('playlist').addEventListener('change', () => {
  const playlistId = document.getElementById('playlist').value;
  const iframe = document.querySelector('iframe');
  iframe.src = `https://open.spotify.com/embed/playlist/${playlistId}?theme=0`;
});

function focusMode() {
  
}