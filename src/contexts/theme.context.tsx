/** @format */

import { createContext, useState } from 'react';

type ModeType = 'light' | 'dark';

interface ThemeType {
	theme: 'default';
	mode: ModeType;
	toggleMode: () => void;
}

const defaults: ThemeType = {
	theme: 'default',
	mode: 'light',
	toggleMode: () => {},
};

const ThemeContext = createContext<ThemeType>(defaults);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [mode, setMode] = useState<ModeType>('light');

	const toggleMode = () => {
		// getting the current theme and the theme to switch
		const current: ModeType = mode;
		const change: ModeType = mode === 'dark' ? 'light' : 'dark';

		// setting up the states
		setMode(change);

		// change the look of application
		const root = document.getElementById('root');
		root?.classList?.remove(current);
		root?.classList.add(change);
	};

	return (
		<ThemeContext.Provider value={{ theme: 'default', mode, toggleMode }}>
			{children}
		</ThemeContext.Provider>
	);
};

export { ThemeContext };
export default ThemeProvider;
