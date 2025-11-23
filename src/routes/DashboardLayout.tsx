/** @format */

import SidePanel from '@/components/SidePanel';
// import { Outlet } from 'react-router-dom';
import {
	Home,
	Users,
	UserPlus,
	Shield,
	BookOpen,
	PlusCircle,
	Tags,
	FileText,
	ClipboardList,
	GraduationCap,
	Clock,
	BarChart,
	DollarSign,
	LineChart,
	Megaphone,
	MessageSquare,
	Bell,
	Settings,
	CreditCard,
	Lock,
	HelpCircle,
} from 'lucide-react';

import { Outlet } from 'react-router-dom';

const node: PanelContentProps = {
	node: [
		{
			icon: <Home />,
			title: 'Dashboard',
			action: () => console.log('Go to Dashboard'),
		},
		{
			icon: <Users />,
			title: 'User Management',
			content: [
				{
					icon: <Users />,
					title: 'All Users',
					action: () => console.log('View all users'),
				},
				{
					icon: <UserPlus />,
					title: 'Add User',
					action: () => console.log('Add new user'),
				},
				{
					icon: <Shield />,
					title: 'Roles & Permissions',
					action: () => console.log('Manage roles'),
				},
			],
		},
		{
			icon: <BookOpen />,
			title: 'Courses',
			content: [
				{
					icon: <BookOpen />,
					title: 'All Courses',
					action: () => console.log('View courses'),
				},
				{
					icon: <PlusCircle />,
					title: 'Create Course',
					action: () => console.log('Create course'),
				},
				{
					icon: <Tags />,
					title: 'Categories',
					action: () => console.log('Manage categories'),
				},
				{
					icon: <ClipboardList />,
					title: 'Assignments',
					action: () => console.log('Manage assignments'),
				},
			],
		},
		{
			icon: <GraduationCap />,
			title: 'Enrollments',
			content: [
				{
					icon: <FileText />,
					title: 'All Enrollments',
					action: () => console.log('View enrollments'),
				},
				{
					icon: <Clock />,
					title: 'Pending Requests',
					action: () => console.log('View pending requests'),
				},
			],
		},
		{
			icon: <BarChart />,
			title: 'Reports & Analytics',
			content: [
				{
					icon: <Users />,
					title: 'User Reports',
					action: () => console.log('User reports'),
				},
				{
					icon: <BookOpen />,
					title: 'Course Reports',
					action: () => console.log('Course reports'),
				},
				{
					icon: <DollarSign />,
					title: 'Revenue Reports',
					action: () => console.log('Revenue reports'),
				},
				{
					icon: <LineChart />,
					title: 'Performance',
					action: () => console.log('Performance analytics'),
				},
			],
		},
		{
			icon: <Megaphone />,
			title: 'Communication',
			content: [
				{
					icon: <Megaphone />,
					title: 'Announcements',
					action: () => console.log('Post announcement'),
				},
				{
					icon: <MessageSquare />,
					title: 'Messages',
					action: () => console.log('View messages'),
				},
			],
		},
		{
			icon: <Bell />,
			title: 'Notifications',
			badgeNumber: 5,
			action: () => console.log('View notifications'),
		},
		{
			icon: <Settings />,
			title: 'Settings',
			content: [
				{
					icon: <Settings />,
					title: 'General Settings',
					action: () => console.log('General settings'),
				},
				{
					icon: <CreditCard />,
					title: 'Billing & Subscription',
					action: () => console.log('Billing settings'),
				},
				{
					icon: <Lock />,
					title: 'Security',
					action: () => console.log('Security settings'),
				},
			],
		},
		{
			icon: <HelpCircle />,
			title: 'Help & Support',
			action: () => console.log('Help section'),
		},
	],
};

function DashboardLayout() {
	return (
		<div>
			<SidePanel node={node}>
				<Outlet />
			</SidePanel>
		</div>
	);
}

export default DashboardLayout;
