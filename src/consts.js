// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const MAIN_NAVIGATION = [
	{
		href: "/writing",
		label: "Writing",
	},
	{
		href: "/about",
		label: "About",
	},
	{
		href: "/now",
		label: "Now",
	},
	{
		href: "/books",
		label: "Reading List",
	},
	{
		href: "/music",
		label: "Music",
	},
];

export const EXTERNAL_NAVIGATION = [
	{
		href: "https://github.com/dominickjay",
		label: "GitHub",
	},
	{
		href: "https://linkedin.com/in/dominickjay/",
		label: "LinkedIn",
	},
	{
		href: "https://bsky.app/profile/dominickjay.bsky.social",
		label: "Bluesky",
	},
	{
		href: "https://last.fm/user/zerosandones217",
		label: "Last.fm",
	},
	{
		href: "https://mastodon.social/@dominickjay",
		label: "Mastodon",
	},
];
export const SITE_TITLE = "Dominick Jay";
export const SITE_DESCRIPTION =
	"Explore this blog for practical guides, insightful articles, and continuous growth in your front-end expertise to aid you on your web development path.";
export const SITE_TAGLINE = "Leave it better than you found it";
export const CURRENT_POSITION = "Front-End Developer";
export const CURRENT_COMPANY = "Series Eight";
export const ABOUT_INTRO_SHORT = `Hi, I'm Dom, a [${CURRENT_POSITION}] `;
export const ABOUT_INTRO_MEDIUM = `${ABOUT_INTRO_SHORT} from Plymouth, UK.`;
export const ABOUT_INTRO_LONG = `${ABOUT_INTRO_SHORT} from Plymouth, UK. I am passionate about crafting great user experiences and sharing web development insights through my blog and CodePen experiments`;

export const ABOUT_INTRO = {
	short: ABOUT_INTRO_SHORT,
	medium: ABOUT_INTRO_MEDIUM,
	long: ABOUT_INTRO_LONG,
};

export const ABOUT_COMPANIES = [
	{
		id: "series-eight",
		label: "Series Eight",
		date: "2022 - present",
		jobTitle: "Front-End Developer",
		content: `At Series Eight, my professional journey has taken me through a variety of dynamic environments, including public and private sector companies like [Rowe IT], [GOSS Interactive], [n9Design], and [Logo CCP]. These experiences have been instrumental in shaping my holistic understanding of user experience, where thoughtful design and creative solutions are always top of mind.`,
	},
	{
		id: "rowe-it",
		label: "Rowe IT",
		date: "2019 - 2022",
		jobTitle: "Software Developer",
		content: `At Rowe IT, I was responsible for the development of a variety of websites, including a variety of e-commerce sites and a variety of custom built sites. I was also responsible for the development of a variety of mobile apps, including a variety of e-commerce apps and a variety of custom built apps.`,
		featuredWork: [],
	},
	{
		id: "goss-interactive",
		label: "GOSS Interactive",
		date: "2017 - 2019",
		jobTitle: "Creative Developer",
		content: `At GOSS Interactive, I was responsible for the development of a variety of websites, including a variety of e-commerce sites and a variety of custom built sites. I was also responsible for the development of a variety of mobile apps, including a variety of e-commerce apps and a variety of custom built apps.`,
		featuredWork: [],
	},
	{
		id: "n9-design",
		label: "n9 Design",
		date: "2016 - 2017",
		jobTitle: "Junior Front-End Developer",
		content: `At n9 Design, I was responsible for the development of a variety of websites, including a variety of e-commerce sites and a variety of custom built sites. I was also responsible for the development of a variety of mobile apps, including a variety of e-commerce apps and a variety of custom built apps.`,
		featuredWork: [],
	},
	{
		id: "logo-ccp",
		label: "Logo CCP",
		date: "2015 - 2016",
		jobTitle: "Junior Front-End Developer",
		content: `At Logo CCP, I was responsible for the development of a variety of websites, including a variety of e-commerce sites and a variety of custom built sites. I was also responsible for the development of a variety of mobile apps, including a variety of e-commerce apps and a variety of custom built apps.`,
		featuredWork: [],
	},
];

export const ABOUT_CONTENT = {
	short: `I have a background in crafting thoughtful user experiences gained from working in various design agencies and the private sector. This site serves as my personal space to explore new web technologies, which I actively share through my blog and hands-on projects on CodePen.`,
	medium: `My diverse background has shaped my focus on creating intuitive and engaging user experiences. This website is my space to explore new technologies and processes, which you can see in my blog and on my CodePen projects.`,
	long: `My professional journey has taken me through a variety of dynamic environments, including public and private sector companies like [Rowe IT], [GOSS Interactive], [n9Design], and [Logo CCP]. These experiences have been instrumental in shaping my holistic understanding of user experience, where thoughtful design and creative solutions are always top of mind.

    You can delve deeper into my work history on my resume. In my current role at ${CURRENT_COMPANY}, I'm fortunate to engage with a broad spectrum of cutting-edge technologies and development processes. Beyond my daily work, I maintain this website as a personal hub for exploration and knowledge sharing. I consistently update it with both visual enhancements and new content, treating it as a live playground to experiment with the latest concepts and techniques I'm learning or eager to adopt. My blog serves as a space for more in-depth reflections and insights, and you can also find smaller, focused projects showcasing my skills and explorations over on CodePen.

    This site truly embodies my continuous commitment to growth and my enthusiasm for sharing what I discover in the ever-evolving world of front-end development.`,
};

export const PROFILE_IMAGES = [
	{
		src: "/images/profile-image.png",
		alt: "My current professional headshot, representing my present self",
	},
	{
		src: "/images/kid-image.png",
		alt: "A young version of me, showing my early years and development",
	},
];

export const TESTIMONIALS = [
	{
		id: "testimonial-6",
		name: "Nate Holland",
		role: "Senior Designer",
		company: "Series Eight",
		description:
			"Working with Dom is always a pleasure. He’s incredibly knowledgeable, calm under pressure, and always willing to go the extra mile to get things right. As a designer, it’s refreshing to work with a developer who really understands the intent behind designs and executes them flawlessly. Couldn’t recommend him more.",
	},
	{
		id: "testimonial-5",
		name: "Kieran Halford",
		role: "Project Manager",
		company: "Series Eight",
		description:
			"Dom is one of the most reliable front-end developers I know and consistently delivers high-quality work. Beyond his technical ability, what really stands out is how clearly he communicates — he has a great way of explaining complex technical concepts in a way that’s easy for non-technical stakeholders to understand. He works well with both clients and internal teams, sets expectations clearly, and is dependable from start to finish. A genuinely strong developer and a pleasure to work with.",
	},
	{
		id: "testimonial-4",
		name: "Tristan Young",
		role: "Apprentice Software Engineer",
		company: "Rowe IT",
		description:
			"Dom was a great line manager. He would always check up on me and would try his hardest to address any issues or answer any questions I may have. Great person to work with.",
	},
	{
		id: "testimonial-3",
		name: "Terri Lamerton",
		role: "Principal Technical Consultant",
		company: "Rowe IT",
		description:
			"I have worked with Dom for a couple of years now and always found him friendly and easy to work with. Several times during the time we worked together he was given tasks that required learning new skills and each time he rose to the challenge.",
	},
	{
		id: "testimonial-2",
		name: "Ben Saul",
		role: "Managing Director",
		company: "Knowthis",
		description:
			"Dom is a pleasure to have around. A friendly, passionate, motivated individual who will stop at nothing to help if needed. Dom is a self driven guy who works equally well on his own as he does as part of a team. He is always looking for better ways to create solutions to problems and is great at dissecting code to create innovative creative. Highly recommended.",
	},
	{
		id: "testimonial-1",
		name: "Nick Warren",
		role: "Owner",
		company: "N9 Design",
		description:
			"During Dom's time with us at N9 Design, he delivered on every task thrown at him. He fitted in really well within our team and wasn't phased by our need for a very mixed skill-set, including full tech' responsibility on projects. Dom brings an air of calm and can-do with him and will be an asset to any team.",
	},
];
