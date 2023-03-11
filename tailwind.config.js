/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				brand: '#2D4C65',
				dark: '#282c34',
				mid: '#101A22',
				light: '#D9DDE0',
			},
			fontSize: {
				f2xs: 'var(--step--2)',
				fxs: 'var(--step--1)',
				fsm: 'var(--step-0)',
				fmd: 'var(--step-1)',
				flg: 'var(--step-2)',
				fxl: 'var(--step-3)',
				f2xl: 'var(--step-4)',
				f3xl: 'var(--step-5)',
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
};
