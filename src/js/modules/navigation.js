export const initNavigation = () => {
	const header = document.querySelector("[data-header]");
	const headerNav = header?.querySelector("[data-navigation]");
	const menuToggle = header?.querySelector("[data-menu-toggle]");
	const headerLinks = [...(headerNav?.querySelectorAll('a[href^="#"]') ?? [])];
	const dock = document.querySelector("[data-dock-navigation]");
	const viewport = dock?.querySelector("[data-dock-viewport]");
	const sections = [...document.querySelectorAll("main > section[id], #student-reviews")];
	const links = [...(viewport?.querySelectorAll('a[href^="#"]') ?? [])];
	const mobile = window.matchMedia("(max-width: 850px)");
	const navGroups = {
		bird: "projects",
		perimeter: "projects",
		yoga: "projects",
		luma: "projects",
		emails: "projects",
		toolkit: "experience",
		libraries: "experience",
		about: "experience",
	};

	if (!header || !headerNav || !menuToggle || !dock || !viewport || !sections.length) return;

	let currentSection = "";
	let frame = 0;

	const setMenuOpen = (open) => {
		const isOpen = open && mobile.matches;
		header.classList.toggle("is-menu-open", isOpen);
		menuToggle.setAttribute("aria-expanded", String(isOpen));
		menuToggle.setAttribute("aria-label", isOpen ? "Закрыть меню" : "Открыть меню");
		headerNav.inert = mobile.matches && !isOpen;
	};

	const setCurrentSection = (id) => {
		if (id === currentSection) return;
		currentSection = id;

		for (const link of links) {
			if (link.hash === `#${id}`) {
				link.setAttribute("aria-current", "location");
			} else {
				link.removeAttribute("aria-current");
			}
		}
		for (const link of headerLinks) {
			if (link.hash === `#${id}`) link.setAttribute("aria-current", "location");
			else link.removeAttribute("aria-current");
		}
	};

	const update = () => {
		frame = 0;
		const isMobile = mobile.matches;
		header.classList.toggle("is-compact", isMobile && window.scrollY > 48);

		const isDockVisible = !isMobile && header.getBoundingClientRect().bottom <= 0;
		dock.classList.toggle("is-visible", isDockVisible);
		dock.inert = !isDockVisible;
		dock.setAttribute("aria-hidden", String(!isDockVisible));

		const position = window.innerHeight * 0.4;
		let activeSection = sections[0].id;
		for (const section of sections) {
			if (section.getBoundingClientRect().top > position) break;
			activeSection = section.id;
		}
		setCurrentSection(navGroups[activeSection] ?? activeSection);
	};

	const scheduleUpdate = () => {
		if (!frame) frame = window.requestAnimationFrame(update);
	};
	const updateAfterResize = () => {
		currentSection = "";
		setMenuOpen(false);
		scheduleUpdate();
	};

	menuToggle.addEventListener("click", () => {
		setMenuOpen(!header.classList.contains("is-menu-open"));
	});
	headerNav.addEventListener("click", (event) => {
		if (event.target.closest("a")) setMenuOpen(false);
	});
	document.addEventListener("click", (event) => {
		if (!header.contains(event.target)) setMenuOpen(false);
	});
	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && header.classList.contains("is-menu-open")) {
			setMenuOpen(false);
			menuToggle.focus();
		}
	});
	window.addEventListener("scroll", scheduleUpdate, { passive: true });
	window.addEventListener("resize", updateAfterResize);
	mobile.addEventListener("change", updateAfterResize);
	setMenuOpen(false);
	update();
};
