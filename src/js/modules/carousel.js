export const initCarousel = () => {
	const carousel = document.querySelector("[data-carousel]");
	if (!carousel) return;

	const viewport = carousel.querySelector("[data-carousel-viewport]");
	const slides = [...carousel.querySelectorAll("[data-slide]")];
	const previousButton = carousel.querySelector("[data-carousel-prev]");
	const nextButton = carousel.querySelector("[data-carousel-next]");
	const currentNumber = carousel.querySelector("[data-carousel-current]");
	const progress = carousel.querySelector("[data-carousel-progress]");

	if (!viewport || !previousButton || !nextButton || !currentNumber || !progress || slides.length < 2) return;

	let currentIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains("project-slide--fishart")));
	let pointerStart = null;

	const render = (announce = false) => {
		const previousIndex = (currentIndex - 1 + slides.length) % slides.length;
		const nextIndex = (currentIndex + 1) % slides.length;

		slides.forEach((slide, index) => {
			const state =
				index === currentIndex
					? "active"
					: index === previousIndex
						? "prev"
						: index === nextIndex
							? "next"
							: "hidden";
			slide.dataset.state = state;
			slide.inert = state !== "active";
			slide.setAttribute("aria-hidden", String(state !== "active"));
		});

		currentNumber.textContent = String(currentIndex + 1).padStart(2, "0");
		currentNumber.parentElement.setAttribute("aria-live", announce ? "polite" : "off");
		progress.style.width = `${((currentIndex + 1) / slides.length) * 100}%`;
		carousel.dispatchEvent(new CustomEvent("carousel:change", { detail: { currentIndex } }));
	};

	const goTo = (index) => {
		currentIndex = (index + slides.length) % slides.length;
		render(true);
	};

	previousButton.addEventListener("click", () => goTo(currentIndex - 1));
	nextButton.addEventListener("click", () => goTo(currentIndex + 1));

	viewport.addEventListener("keydown", (event) => {
		if (event.target !== viewport) return;
		if (event.key === "ArrowRight") {
			event.preventDefault();
			goTo(currentIndex + 1);
		}
		if (event.key === "ArrowLeft") {
			event.preventDefault();
			goTo(currentIndex - 1);
		}
		if (event.key === "Home") {
			event.preventDefault();
			goTo(0);
		}
		if (event.key === "End") {
			event.preventDefault();
			goTo(slides.length - 1);
		}
	});

	viewport.addEventListener("pointerdown", (event) => {
		if (event.target.closest("a, button")) return;
		pointerStart = { x: event.clientX, y: event.clientY, id: event.pointerId };
	});

	viewport.addEventListener("pointerup", (event) => {
		if (!pointerStart || event.pointerId !== pointerStart.id) return;
		const differenceX = event.clientX - pointerStart.x;
		const differenceY = event.clientY - pointerStart.y;
		pointerStart = null;
		if (Math.abs(differenceX) > 55 && Math.abs(differenceX) > Math.abs(differenceY) * 1.3) {
			goTo(currentIndex + (differenceX < 0 ? 1 : -1));
		}
	});
	viewport.addEventListener("pointercancel", () => {
		pointerStart = null;
	});

	render();
};
