import { animate, inView } from "motion"


document.addEventListener('DOMContentLoaded', function () {
	animate(
		'.header-block',
		{ transform: 'none' },
		{ delay: 0.2, duration: 2, easing: [0.17, 0.55, 0.55, 1] }
	),
	inView("#intro", () => {
		animate(
			'.header-bottom-block',
	 		{ transform: 'none' },
	 		{ delay: 0.2, duration: 2, easing: [0.17, 0.55, 0.55, 1] }
	 	)
	})
})