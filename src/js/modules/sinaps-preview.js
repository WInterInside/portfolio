export const initSinapsPreview = () => {
	const video = document.querySelector("[data-sinaps-preview-video]");
	if (!video || !window.IntersectionObserver) return;

	const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
	let visible = false;

	const update = () => {
		if (visible && !document.hidden && !reducedMotion.matches) {
			video.play().catch(() => {});
		} else {
			video.pause();
		}
	};

	const observer = new IntersectionObserver(
		(entries) => {
			visible = entries[0].isIntersecting;
			update();
		},
		{ rootMargin: "100px 0px" },
	);
	observer.observe(video);
	document.addEventListener("visibilitychange", update);
	reducedMotion.addEventListener("change", update);
};
