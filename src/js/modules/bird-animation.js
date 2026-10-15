export const initBirdAnimation = () => {
	const bird = document.querySelector("[data-bird-frame]");
	if (!bird || !window.IntersectionObserver) return;

	const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
	const sources = Array.from(
		{ length: 30 },
		(_, index) => `./assets/bird-frames/frame-${String(index).padStart(2, "0")}.png`,
	);
	let frames = null;
	let frameIndex = 0;
	let direction = 1;
	let lastFrameTime = 0;
	let visible = false;
	let animationId = 0;

	const tick = (time) => {
		if (!visible || document.hidden || reducedMotion.matches) {
			animationId = 0;
			return;
		}

		if (time - lastFrameTime >= 1000 / 30) {
			frameIndex += direction;
			if (frameIndex === sources.length - 1 || frameIndex === 0) direction *= -1;
			if (frames[frameIndex].complete && frames[frameIndex].naturalWidth) {
				bird.src = sources[frameIndex];
			}
			lastFrameTime = time;
		}
		animationId = requestAnimationFrame(tick);
	};

	const update = () => {
		if (visible && !document.hidden && !reducedMotion.matches) {
			if (!frames) {
				frames = sources.map((source) => {
					const frame = new Image();
					frame.src = source;
					return frame;
				});
			}
			if (!animationId) animationId = requestAnimationFrame(tick);
		} else if (animationId) {
			cancelAnimationFrame(animationId);
			animationId = 0;
		}
		if (reducedMotion.matches) bird.src = sources[0];
	};

	const observer = new IntersectionObserver(
		(entries) => {
			visible = entries[0].isIntersecting;
			update();
		},
		{ rootMargin: "150px 0px" },
	);
	observer.observe(bird);
	document.addEventListener("visibilitychange", update);
	reducedMotion.addEventListener("change", update);
};
