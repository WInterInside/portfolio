export const initStudentProcess = () => {
	const process = document.querySelector("[data-student-process]");
	if (!process) return;

	const tabs = [...process.querySelectorAll("[data-student-step]")];
	const panels = [...process.querySelectorAll("[data-student-panel]")];
	const steps = process.querySelector(".students__steps");
	const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
	let currentIndex = 0;
	let visible = false;
	let userSelected = false;

	const activate = (index, moveFocus = false) => {
		currentIndex = (index + tabs.length) % tabs.length;
		tabs.forEach((tab, tabIndex) => {
			const active = tabIndex === currentIndex;
			tab.classList.toggle("is-active", active);
			tab.setAttribute("aria-selected", String(active));
			tab.tabIndex = active ? 0 : -1;
			panels[tabIndex].hidden = !active;
		});
		steps.style.setProperty("--student-progress", `${12.5 + currentIndex * 25}%`);
		steps.style.setProperty("--student-progress-mobile", currentIndex);
		if (moveFocus) tabs[currentIndex].focus();
	};

	tabs.forEach((tab, index) => {
		tab.addEventListener("click", () => {
			userSelected = true;
			activate(index);
		});
		tab.addEventListener("keydown", (event) => {
			const next = {
				ArrowRight: index + 1,
				ArrowDown: index + 1,
				ArrowLeft: index - 1,
				ArrowUp: index - 1,
				Home: 0,
				End: tabs.length - 1,
			};
			if (!(event.key in next)) return;
			event.preventDefault();
			userSelected = true;
			activate(next[event.key], true);
		});
	});

	if ("IntersectionObserver" in window) {
		const observer = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
		}, { threshold: 0.25 });
		observer.observe(process);
	} else {
		visible = true;
	}

	window.setInterval(() => {
		if (!visible || userSelected || document.hidden || reducedMotion.matches || process.matches(":hover") || process.contains(document.activeElement)) return;
		activate(currentIndex + 1);
	}, 5500);
};
