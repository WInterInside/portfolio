export const initProjectPreview = () => {
	const dialog = document.querySelector("[data-project-preview]");
	if (!dialog) return;

	const image = dialog.querySelector("[data-preview-image]");
	const heading = dialog.querySelector("[data-preview-heading]");
	const eyebrow = dialog.querySelector("[data-preview-eyebrow]");
	const scrollArea = dialog.querySelector("[data-preview-scroll]");
	const closeButton = dialog.querySelector("[data-preview-close]");
	const zoomButton = dialog.querySelector("[data-preview-zoom]");
	let openingButton = null;

	const setZoom = (zoomed) => {
		dialog.classList.toggle("project-preview--zoomed", zoomed);
		zoomButton.setAttribute("aria-pressed", String(zoomed));
		zoomButton.textContent = zoomed ? "По ширине" : "Увеличить";
	};
	image.addEventListener("load", () => {
		image.style.setProperty("--preview-zoom-width", `${Math.round(image.naturalWidth * 1.5)}px`);
	});

	document.addEventListener("click", (event) => {
		const button = event.target.closest("[data-preview-open]");
		if (!button) return;

		openingButton = button;
		const isMail = button.dataset.previewKind === "письма";
		const isReview = button.dataset.previewKind === "отзыв";
		dialog.classList.toggle("project-preview--mail", isMail);
		dialog.classList.toggle("project-preview--review", isReview);
		heading.textContent = button.dataset.previewTitle;
		eyebrow.textContent = isReview
			? "ОРИГИНАЛ ОТЗЫВА"
			: isMail
				? "ПРОСМОТР ПИСЬМА"
				: "ПРОСМОТР ПРОЕКТА";
		image.alt = `${isReview ? "Скриншот" : "Полный снимок"}: ${button.dataset.previewTitle}`;
		scrollArea.setAttribute("aria-label", isReview ? "Прокручиваемый скриншот отзыва" : "Прокручиваемый снимок проекта или письма");
		image.src = button.dataset.previewSrc;
		scrollArea.scrollTop = 0;
		scrollArea.scrollLeft = 0;
		setZoom(false);
		dialog.showModal();
		document.body.classList.add("is-preview-open");
		closeButton.focus();
	});

	closeButton.addEventListener("click", () => dialog.close());
	zoomButton.addEventListener("click", () =>
		setZoom(!dialog.classList.contains("project-preview--zoomed")),
	);
	dialog.addEventListener("click", (event) => {
		if (event.target === dialog) dialog.close();
	});
	dialog.addEventListener("close", () => {
		document.body.classList.remove("is-preview-open");
		image.removeAttribute("src");
		image.alt = "";
		dialog.classList.remove("project-preview--mail");
		dialog.classList.remove("project-preview--review");
		openingButton?.focus();
		openingButton = null;
	});
};
