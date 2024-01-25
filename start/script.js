"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScroll = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

const nav = document.querySelector(".nav__links");

//Плавный скролл
btnScroll.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  console.log(e.target);

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//Табы

const tabs = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabContainer.addEventListener("click", function (e) {
  e.preventDefault();
  const clicked = e.target.closest(".operations__tab");
  if (!clicked) return;
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");

  tabsContent.forEach((content) =>
    content.classList.remove("operations__content--active")
  );
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//Прозрачное окно

function hover(event, opacity) {
  if (event.target.classList.contains("nav__link")) {
    const link = event.target;
    const sibling = link.closest(".nav").querySelectorAll(".nav__link");

    sibling.forEach((element) => {
      if (element !== link) {
        element.style.opacity = this;
      }
    });
  }
}

nav.addEventListener("mouseover", hover.bind(0.5));
nav.addEventListener("mouseout", hover.bind(1));

//Липкий хедер
const navContainer = document.querySelector(".nav");

function callBack(entries) {
  if (!entries[0].isIntersecting) {
    navContainer.classList.add("sticky");
  } else {
    navContainer.classList.remove("sticky");
  }
}
const options = {
  trashhold: 0.1,
  rootMargin: "-90px",
};

const observer = new IntersectionObserver(callBack, options);

observer.observe(document.querySelector(".header"));

//Всплытие секций

const allSectionsObserver = document.querySelectorAll(".section");
function revealSection(entries, observe) {
  if (entries[0].isIntersecting) {
    entries[0].target.classList.remove("section--hidden");
    observe.unobserve(entries[0].target);
  }
}
const sectionObserver = new IntersectionObserver(revealSection, {
  threshold: 0.15,
});

allSectionsObserver.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// подгрузка изображений

const images = document.querySelectorAll("img[data-src]");

function loadImg(entries, observer) {
  entries[0].target.src = entries[0].target.dataset.src;
  entries[0].target.classList.remove("lazy-img");
}

const imgObserver = new IntersectionObserver(loadImg, { threshold: 0.15 });

images.forEach((img) => {
  imgObserver.observe(img);
});

//слайдер

const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnRight = document.querySelector(".slider__btn--right");
const btnLeft = document.querySelector(".slider__btn--left");

let currSlide = 0;
const maxSlides = slides.length;



slides.forEach(function (slide, i) {
  slide.style.transform = `translateX(${100 * i}%)`;
});

function goToSlider(slide) {
  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - slide)}%) `;
  });
}

function nextSlide() {
  if (currSlide === maxSlides - 1) {
    currSlide = 0;
  } else {
    currSlide++;
  }
  goToSlider(currSlide);
}

function prevSlide() {
  if (currSlide === 0) {
    currSlide = maxSlides - 1;
  } else {
    currSlide--;
  }

  goToSlider(currSlide);
}

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);
