import LoadingProvider from '@/contexts/loading.context';
import { Outlet } from 'react-router-dom';

function RootLayout() {
	// The one and only purpose of the root layout will to add the context providers
	return (
		<LoadingProvider>
			<Outlet />;
		</LoadingProvider>
	);
}

export default RootLayout;
