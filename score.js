var audioPlayer = document.querySelector('.green-audio-player');
var play = audioPlayer.querySelector('#play');
var pause = audioPlayer.querySelector('#pause');
var playpauseBtn = audioPlayer.querySelector('.play-pause-btn');
var loading = audioPlayer.querySelector('.loading');
var progress = audioPlayer.querySelector('.progress');
var sliders = audioPlayer.querySelectorAll('.slider');
var currentTime = audioPlayer.querySelector('.current-time');
var totalTime = audioPlayer.querySelector('.total-time');
var score = audioPlayer.querySelector('#score');

const params_ = new URLSearchParams(window.location);
const params = new URLSearchParams(params_.get("search"));

var player = document.createElement("audio");
player.setAttribute("src",`score/${params.get("id")}/${params.get("src_audio")}`);
$("#player_")[0].appendChild(player);

var draggableClasses = ['pin'];
var currentlyDragged = null;

window.addEventListener('mousedown', function(event) {
  
  if(!isDraggable(event.target)) return false;
  
  currentlyDragged = event.target;
  let handleMethod = currentlyDragged.dataset.method;
  onGrab();
  
  this.addEventListener('mousemove', window[handleMethod], false);
  this.addEventListener('mousemove', whenDragging);

  window.addEventListener('mouseup', () => {
	if (currentlyDragged) {onRelease()};
	currentlyDragged = false;
	window.removeEventListener('mousemove', window[handleMethod], false);
  }, false);
});

playpauseBtn.addEventListener('click', togglePlay);
player.addEventListener('timeupdate', updateProgress);
player.addEventListener('loadedmetadata', () => {
  totalTime.textContent = formatTime(player.duration);
});
player.addEventListener('canplay', makePlay);
player.addEventListener('ended', function(){
	play.style.display = "block";
	pause.style.display = "none";
	player.currentTime = 0;
	initPlay()
});

sliders.forEach(slider => {
  let pin = slider.querySelector('.pin');
  slider.addEventListener('click', window[pin.dataset.method]);
});

function isDraggable(el) {
  let canDrag = false;
  let classes = Array.from(el.classList);
  draggableClasses.forEach(draggable => {
    if(classes.indexOf(draggable) !== -1)
      canDrag = true;
  })
  return canDrag;
}

function inRange(event) {
  let rangeBox = getRangeBox(event);
  let rect = rangeBox.getBoundingClientRect();
  let direction = rangeBox.dataset.direction;
  if(direction == 'horizontal') {
    var min = rangeBox.offsetLeft;
    var max = min + rangeBox.offsetWidth;   
    if(event.clientX < min || event.clientX > max) return false;
  } else {
    var min = rect.top;
    var max = min + rangeBox.offsetHeight; 
    if(event.clientY < min || event.clientY > max) return false;  
  }
  return true;
}

function updateProgress() {
  var current = player.currentTime;
  var percent = (current / player.duration) * 100;
  progress.style.width = percent + '%';

//  var w_score = eval(window.getComputedStyle(document.getElementById("score")).width.replace("px", ""));
//  document.getElementById("score").style.left =  -Math.min(percent/100*(w_score), w_score - 960) + 'px';
  
//	$("#score").animate({ 
//        left: -percent/100*(w_score - 960) + 'px',
//      }, 260);
	
  currentTime.innerHTML = formatTime(current);
}

function whenDragging() {
	var current = player.currentTime;
	var percent = (current / player.duration) * 100;
	
	var w_score = eval(window.getComputedStyle(document.getElementById("score")).width.replace("px", ""));
	var w_panneau = eval(getComputedStyle($("body")[0]).getPropertyValue('--panneau-width').replace("px", ""));
	
	document.getElementById("score").style.left =  -Math.min(percent/100*(w_score), w_score - w_panneau) + 'px';
}

function getRangeBox(event) {
  let rangeBox = event.target;
  let el = currentlyDragged;
  if(event.type == 'click' && isDraggable(event.target)) {
    rangeBox = event.target.parentElement.parentElement;
  }
  if(event.type == 'mousemove') {
    rangeBox = el.parentElement.parentElement;
  }
  return rangeBox;
}

function getCoefficient(event) {
  let slider = getRangeBox(event);
  let rect = slider.getBoundingClientRect();
  let K = 0;
  if(slider.dataset.direction == 'horizontal') {
    
    let offsetX = event.clientX - slider.offsetLeft;
    let width = slider.clientWidth;
    K = offsetX / width;    
    
  } else if(slider.dataset.direction == 'vertical') {
    
    let height = slider.clientHeight;
    var offsetY = event.clientY - rect.top;
    K = 1 - offsetY / height;
    
  }
  return K;
}

function rewind(event) {
  if(inRange(event)) {
    player.currentTime = player.duration * getCoefficient(event);
  }
}

function formatTime(time) {
  var min = Math.floor(time / 60);
  var sec = Math.floor(time % 60);
  return min + ':' + ((sec<10) ? ('0' + sec) : sec);
}

function togglePlay() {
	
	if(player.paused) {
		play.style.display = "none";
		pause.style.display = "block";
		player.play();
		initPlay();
	} else {
		play.style.display = "block";
		pause.style.display = "none";
		player.pause();
		$("#score").stop(true, false);
	}  
}

function makePlay() {
	playpauseBtn.style.display = 'block';
	loading.style.display = 'none';
}

function initPlay() {
	
	var w_score = eval(window.getComputedStyle(document.getElementById("score")).width.replace("px", ""));
	var w_panneau = eval(getComputedStyle($("body")[0]).getPropertyValue('--panneau-width').replace("px", ""));
	
	$("#score").animate({ 
							left: -(w_score - w_panneau) + 'px',
						}, {
							duration: (player.duration * (1 - (w_panneau / w_score)) - player.currentTime) * 1000, 
							easing: "linear", 
							progress: function() {
								if (player.currentTime >= player.duration * (1 - (w_panneau / w_score))) {
									$("#score").stop(true, true);
								}
							}
						});
}

function onGrab() {
	$("#score").stop(true, false);
}

function onRelease() {
	
	if(!player.paused) {
		initPlay();
	}
}