/** @format */

import ScrollToTop from '@/components/wrappers/ScrollToTop';
import LoadingProvider from '@/contexts/loading.context';
import ThemeProvider from '@/contexts/theme.context';
import { Outlet } from 'react-router-dom';

function RootLayout() {
	// The one and only purpose of the root layout will to add the context providers
	return (
		<ThemeProvider>
			<LoadingProvider>
				<ScrollToTop>
					<Outlet />
				</ScrollToTop>
			</LoadingProvider>
		</ThemeProvider>
	);
}

export default RootLayout;
