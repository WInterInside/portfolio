import { initNavigation } from "./modules/navigation.js";
import { initClock } from "./modules/clock.js";
import { initCarousel } from "./modules/carousel.js";
import { initProjectPreview } from "./modules/project-preview.js";
import { initBirdAnimation } from "./modules/bird-animation.js";
import { initTabs } from "./modules/tabs.js";
import { initReveal } from "./modules/reveal.js";
import { initStudentProcess } from "./modules/student-process.js";
import { initReviewSlider } from "./modules/review-slider.js";
import { initSinapsPreview } from "./modules/sinaps-preview.js";

const initApp = () => {
	initNavigation();
	initClock();
	initCarousel();
	initProjectPreview();
	initBirdAnimation();
	initTabs();
	initReveal();
	initStudentProcess();
	initReviewSlider();
	initSinapsPreview();
};

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initApp, { once: true });
} else {
	initApp();
}
