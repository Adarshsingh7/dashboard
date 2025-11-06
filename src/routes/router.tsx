import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './RootLayout';
import DashboardLayout from './DashboardLayout';
import Home from '@/pages/Home';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				path: '',
				element: <DashboardLayout />,
				children: [
					{
						path: '',
						element: <Home />,
					},
				],
			},
		],
	},
]);

export default router;
