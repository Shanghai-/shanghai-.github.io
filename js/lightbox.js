var lightbox, boxImage, prevArrow, nextArrow;
var currentGroup, currentIdx, maxIdx;
var groups = {};

// Fired when the DOM is loaded (not IE8 compatible)
document.addEventListener('DOMContentLoaded', function(event) {
	lightbox = document.getElementById('lightbox');
	boxImage = document.getElementById('lightbox-content');
	prevArrow = document.getElementById('prevArrow');
	nextArrow = document.getElementById('nextArrow');

	for (var img of document.images) {
		console.log("Hi mom!");
		if (img.dataset.group !== undefined) {
			if (groups[img.dataset.group] === undefined) {
				groups[img.dataset.group] = [];
			}
			groups[img.dataset.group].push(img.src);
		}
	}

	currentGroup = null;

	window.addEventListener("keydown", function(e) {
		if (e.defaultPrevented) return;
		switch (e.key) {
			case 'ArrowRight':
				nextImg();
				e.preventDefault();
				break;

			case 'ArrowLeft':
				prevImg();
				e.preventDefault();
				break;

			case 'Escape':
			case 'Esc':
				closeLightbox();
				e.preventDefault();
				break;
		}
	}, true);
});

function showLightbox(el) {
	if (el.dataset.group !== undefined) {
		currentGroup = groups[el.dataset.group];
		currentIdx = currentGroup.indexOf(el.src);
		maxIdx = currentGroup.length - 1;
		if (currentIdx > 0) prevArrow.style.display = 'block';
		if (currentIdx < maxIdx) nextArrow.style.display = 'block';
	} else {
		currentGroup = null;
		currentIdx = 0;
		maxIdx = 0;
	}

	setLightboxImg(el.src);
	lightbox.style.display = 'block';
}

function nextImg() {
	if (currentGroup === null) return;
	if (currentIdx === maxIdx) return;
	if (currentIdx++ === 0) prevArrow.style.display = 'block';
	if (currentIdx === maxIdx) nextArrow.style.display = 'none';

	setLightboxImg(currentGroup[currentIdx]);
}

function prevImg() {
	if (currentGroup === null) return;
	if (currentIdx === 0) return;
	if (currentIdx-- === maxIdx) nextArrow.style.display = 'block';
	if (currentIdx === 0) prevArrow.style.display = 'none';
	
	setLightboxImg(currentGroup[currentIdx]);
}

function closeLightbox() {
	lightbox.style.display = 'none';
	prevArrow.style.display = 'none';
	nextArrow.style.display = 'none';
}

function setLightboxImg(img) {
	boxImage.style.backgroundImage = 'url("' + img + '")';
}
