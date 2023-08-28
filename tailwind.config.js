/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./node_modules/headlessui/react/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-inter)"],
			},
			colors: {
				'timeRed': '#E63D31',
				'greyShade': 'rgba(0, 0, 0, 0.02)',
				'timeRedHover': '#D93A2F',
				'blackShade': '#242629',
				'almostBlack': '#25282B',
				'darkWhite': '#EBEBEB',
				'darkGrey': '#C0C0C0',
				'baseGrey' : '#F0F0F0'
			},
			borderRadius: {
				'small': '8px',
				'medium': '20px'
			},
			margin: {
				'medium': "72px",
				'mediumXl': '120px',
				'xl' : '142px',
				'2xl' : '216px'
			},
			padding: {
				'medium': "72px",
				'mediumXl': '120px',
				'xl' : '142px',
				'2xl' : '216px'
			}
		},
	},
	plugins: [],
}

