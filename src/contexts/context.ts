/** @format */

import { useContext } from 'react';
import { LoadingContext } from './loading.context';
import { ThemeContext } from './theme.context';

const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context)
		throw new Error('useTheme must be used inside the theme provider');
	return context;
};

const useLoading = () => {
	const context = useContext(LoadingContext);
	if (!context) {
		throw new Error('useLoading must be used within a LoadingProvider');
	}
	return context;
};

export { useLoading };

export { useTheme };
