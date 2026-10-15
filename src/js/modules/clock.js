export const initClock = () => {
	const clock = document.querySelector("[data-clock]");
	if (!clock) return;

	const time = clock.querySelector("[data-clock-time]");
	const seconds = clock.querySelector("[data-clock-seconds]");
	const weekday = clock.querySelector("[data-clock-weekday]");
	const date = clock.querySelector("[data-clock-date]");
	if (!time || !seconds || !weekday || !date) return;

	const weekdayFormatter = new Intl.DateTimeFormat("ru-RU", { weekday: "long" });
	const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
	let timeoutId;

	const render = () => {
		const now = new Date();
		time.textContent = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
		seconds.textContent = String(now.getSeconds()).padStart(2, "0");
		weekday.textContent = weekdayFormatter.format(now);
		date.textContent = dateFormatter.format(now);
		clock.setAttribute("datetime", now.toISOString());
	};

	const schedule = () => {
		if (document.hidden) return;
		timeoutId = window.setTimeout(() => {
			render();
			schedule();
		}, 1000 - (Date.now() % 1000));
	};

	document.addEventListener("visibilitychange", () => {
		window.clearTimeout(timeoutId);
		if (!document.hidden) {
			render();
			schedule();
		}
	});

	render();
	schedule();
};
