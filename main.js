import data from "./src/data";

// DOM elements
const replayBtn = document.getElementById("btn-replay");
const prevBtn = document.getElementById("btn-prev");
const playBtn = document.getElementById("btn-play");
const nextBtn = document.getElementById("btn-next");
const stopBtn = document.getElementById("btn-stop");
const audioElement = document.getElementById("player-audio");
const creditsButton = document.getElementById("credits-btn");

// Array of audio files' directories
const songsArray = data.map((item) => {
	return item.trackPath;
});
const songsCount = songsArray.length;

// set initial song when document loads
let currentSongIndex = 0;
setCurrentSong(currentSongIndex);
let isPlaying = false;

// Event listeners for player control btns
prevBtn.addEventListener("click", setPrevSong);

playBtn.addEventListener("click", switchSongOnOff);

nextBtn.addEventListener("click", setNextSong);

stopBtn.addEventListener("click", stopSong);

replayBtn.addEventListener("click", replaySong);

creditsButton.addEventListener("click", toggleCredits);

// Functions
function switchSongOnOff() {
	isPlaying = !isPlaying;
	if (isPlaying) {
		audioElement.play();
		playBtn.src = "src/assets/icons/btn-pause.svg";
	} else {
		audioElement.pause();
		playBtn.src = "src/assets/icons/btn-play.svg";
	}
}

function setNextSong() {
	currentSongIndex++;
	// when last song reached, go to first song
	if (currentSongIndex > songsCount - 1) {
		currentSongIndex = 0;
	}
	setCurrentSong(currentSongIndex);
	isPlaying = false;
	switchSongOnOff();
}

function setPrevSong() {
	currentSongIndex--;
	// when first song reached, go to last song
	if (currentSongIndex < 0) {
		currentSongIndex = songsCount - 1;
	}
	setCurrentSong(currentSongIndex);
	isPlaying = false;
	switchSongOnOff();
}

function setCurrentSong(index) {
	audioElement.src = "src/assets/" + songsArray[index];
	setSongInfo(index);
	setImage(index);
	getCredits(index);
}

function stopSong() {
	audioElement.load();
	isPlaying = false;
	playBtn.src = "src/assets/icons/btn-play.svg";
}

function replaySong() {
	audioElement.load();
	isPlaying = false;
	switchSongOnOff();
}

function setSongInfo(index) {
	const songTitleElement = document.getElementById("song-title");
	const songAuthorElement = document.getElementById("song-author");
	songTitleElement.textContent = data[index].title;
	songAuthorElement.textContent = data[index].author;
}

function setCredits(...elements) {
	const creditElements = elements;
	const container = document.getElementById("song-credits");
	container.innerHTML = "";
	creditElements.forEach((element) => {
		const p = document.createElement("p");
		p.innerHTML = element;
		container.appendChild(p);
	});
}

function getCredits(index) {
	// destructure source data
	const {
		title: songTitle,
		author: songAuthor,
		source: songSource,
		license: songLicense,
		img: {
			author: { name: imgAuthor, link: imgAuthorLink },
			source: imgSource,
			link: imgLink,
		},
	} = data[index];
	// prepare DOM element
	const musicInfo = `<p>"${songTitle}" ${songAuthor} (${songSource})</p><p>${songLicense}</p>`;

	const imgInfo = `Photo by <a href="${imgAuthorLink}">${imgAuthor}</a> on <a href="${imgLink}">${imgSource}</a>`;

	setCredits(musicInfo, imgInfo);
}

function toggleCredits() {
	const container = document.getElementById("song-credits");
	container.classList.toggle("player__credits-container--active");
}

function setImage(index) {
	const prevImg = data[index === 0 ? data.length - 1 : index - 1].img.imgPath;
	const currentImg = data[index].img.imgPath;
	const nextImg = data[index === data.length - 1 ? 0 : index + 1].img.imgPath;

	const container = document.getElementById("player-images");

	const prevImgElement = document.createElement("img");
	prevImgElement.src = "src/assets/" + prevImg;
	prevImgElement.classList.add("player__image-prev");

	const currentImgElement = document.createElement("img");
	currentImgElement.src = "src/assets/" + currentImg;
	currentImgElement.classList.add("player__image-current");

	const nextImgElement = document.createElement("img");
	nextImgElement.src = "src/assets/" + nextImg;
	nextImgElement.classList.add("player__image-next");

	container.innerHTML = "";
	container.appendChild(prevImgElement);
	container.appendChild(currentImgElement);
	container.appendChild(nextImgElement);
}
