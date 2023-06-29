window.addEventListener('DOMContentLoaded', () => {
	//tabs
	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader');
	function hideTabContent() {
		tabsContent.forEach(item => {
			item.style.display = 'none';
		});
		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});
	};
	function showTabContent(i = 0) {
		tabsContent[i].style.display = 'block';
		tabs[i].classList.add('tabheader__item_active');
	};
	hideTabContent();
	showTabContent();
	tabsParent.addEventListener('click', (event) => {
		const target = event.target;
		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				};
			});
		};
	});

	//timer
	const timeEnd = '2023-07-20';
	function getTimeRemainig(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date()),
			days = Math.floor(t / (1000 * 60 * 60 * 24)),
			hours = Math.floor(t / (1000 * 60 * 60) % 24),
			minutes = Math.floor((t / 1000 / 60) % 60),
			seconds = Math.floor((t / 1000) % 60);
		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	};
	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = document.querySelector('#days'),
			hours = document.querySelector('#hours'),
			minutes = document.querySelector('#minutes'),
			seconds = document.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		function updateClock() {
			const t = getTimeRemainig(endtime);
			days.innerHTML = t.days;
			hours.innerHTML = t.hours;
			minutes.innerHTML = t.minutes;
			seconds.innerHTML = t.seconds;
			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	};
	setClock('.timer', timeEnd);

	//modal
	//	const modalTrider = document.querySelectorAll('[data-modal]'),
	//		modal = document.querySelector('.modal'),
	//		modalClose = document.querySelector('[data-close]');
	//	modalTrider.forEach(btn => {
	//		btn.addEventListener('click', () => {
	//			modal.classList.add('show');
	//			modal.classList.remove('hide');
	//			document.body.style.overflow = 'hidden';
	//		});
	//	});
	//	modalClose.addEventListener('click', () => {
	//		modal.classList.add('hide');
	//		modal.classList.remove('show');
	//		document.body.style.overflow = '';
	//	});
	//	modal.addEventListener('click', (e) => {
	//		if (e.target === modal) {
	//			modal.classList.add('hide');
	//			modal.classList.remove('show');
	//			document.body.style.overflow = '';
	//		}
	//	});
	//	document.addEventListener('keydown', (e)=>{
	//		if (e.code === 'Escape'){
	//			modal.classList.add('hide');
	//			modal.classList.remove('show');
	//			document.body.style.overflow = '';
	//		}
	//	});

	//new modal
	const modalTriggers = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal'),
		modalClose = document.querySelector('[data-close]');
	function showModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
	}
	function hideModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = '';
	}
	modalTriggers.forEach(btn => {
		btn.addEventListener('click', showModal);
	});
	modalClose.addEventListener('click', hideModal);
	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			hideModal();
		}
	});
	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape') {
			hideModal();
		}
	});

	//slides
	const slides = document.querySelectorAll('.offer__slide'),
	      prev = document.querySelector('.offer__slider-prev'),
	      next = document.querySelector('.offer__slider-next'),
	      total = document.querySelector('#total'),
	      current = document.querySelector('#current');

	let slideIndex = 1;
	showSlides(slideIndex);

	total.textContent = slides.length < 10 ? `0${slides.length}` : slides.length;

	function showSlides(n) {
		slideIndex = n > slides.length ? 1 : n < 1 ? slides.length : n;

		slides.forEach(item => {
			item.classList.remove('show');
			item.classList.add('hide');
		});

		slides[slideIndex - 1].classList.add('show');
		slides[slideIndex - 1].classList.remove('hide');

		current.textContent = slides.length < 10 ? `0${slides.length}` : slideIndex;
	}

	function plusSlides(n) {
		showSlides(slideIndex += n);
	}

	prev.addEventListener('click', () => plusSlides(-1));
	next.addEventListener('click', () => plusSlides(1));
});

