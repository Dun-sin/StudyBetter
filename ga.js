import ReactGA from 'react-ga';

export const initGA = () => {
	ReactGA.initialize('G-M48YDC11FD');
};

export const logPageView = () => {
	ReactGA.set({ page: window.location.pathname });
	ReactGA.pageview(window.location.pathname);
};
