export const initReviewSlider = () => {
	const slider = document.querySelector("[data-review-slider]");
	if (!slider) return;

	const viewport = slider.querySelector("[data-review-viewport]");
	const cards = [...slider.querySelectorAll(".student-reviews__card")];
	const previous = slider.querySelector("[data-review-prev]");
	const next = slider.querySelector("[data-review-next]");
	const current = slider.querySelector("[data-review-current]");
	const total = slider.querySelector("[data-review-total]");
	const progress = slider.querySelector("[data-review-progress]");
	const singleCard = window.matchMedia("(max-width: 900px)");
	const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
	let page = 0;
	let programmatic = false;
	let settleTimer;
	let scrollFrame;

	const visibleCount = () => (singleCard.matches ? 1 : 2);
	const pageCount = () => Math.ceil(cards.length / visibleCount());
	const format = (value) => String(value).padStart(2, "0");
	const pageLeft = (index) => cards[index * visibleCount()].offsetLeft - cards[0].offsetLeft;

	const update = () => {
		const pages = pageCount();
		current.textContent = format(page + 1);
		total.textContent = format(pages);
		progress.style.width = `${((page + 1) / pages) * 100}%`;
		previous.disabled = page === 0;
		next.disabled = page === pages - 1;
	};

	const goTo = (index, animate = true) => {
		page = Math.max(0, Math.min(index, pageCount() - 1));
		update();
		programmatic = true;
		viewport.scrollTo({
			left: pageLeft(page),
			behavior: animate && !reducedMotion.matches ? "smooth" : "auto",
		});
		window.clearTimeout(settleTimer);
		settleTimer = window.setTimeout(() => {
			programmatic = false;
		}, animate && !reducedMotion.matches ? 500 : 0);
	};

	const syncFromScroll = () => {
		if (programmatic) return;
		let closest = 0;
		let distance = Infinity;
		for (let index = 0; index < pageCount(); index += 1) {
			const difference = Math.abs(viewport.scrollLeft - pageLeft(index));
			if (difference < distance) {
				closest = index;
				distance = difference;
			}
		}
		if (closest !== page) {
			page = closest;
			update();
		}
	};

	previous.addEventListener("click", () => goTo(page - 1));
	next.addEventListener("click", () => goTo(page + 1));
	viewport.addEventListener("keydown", (event) => {
		if (event.target !== viewport || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
		event.preventDefault();
		goTo(page + (event.key === "ArrowRight" ? 1 : -1));
	});
	viewport.addEventListener("scroll", () => {
		window.cancelAnimationFrame(scrollFrame);
		scrollFrame = window.requestAnimationFrame(syncFromScroll);
	}, { passive: true });
	singleCard.addEventListener("change", () => goTo(Math.min(page, pageCount() - 1), false));
	window.addEventListener("resize", () => goTo(page, false));
	update();
};
