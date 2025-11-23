/** @format */

import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './RootLayout';
import DashboardLayout from './DashboardLayout';
import Home from '@/pages/Home';
import { DataTable, userColumns } from '@/components/SuperTable';
import { userService } from '@/utils/user.service';

// eslint-disable-next-line react-refresh/only-export-components
const Table = () => {
	const users = userService.findAll({ total: 3 });
	return (
		<div className='rounded-sm border'>
			<div className='overflow-x-auto'>
				<DataTable<User, User[]>
					columns={userColumns}
					data={users}
				/>
			</div>
		</div>
	);
};

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
					{
						path: '/table',
						element: <Table />,
					},
				],
			},
		],
	},
]);

export default router;
