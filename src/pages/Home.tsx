import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
	Users,
	BookOpen,
	TrendingUp,
	Award,
	BarChart3,
	Calendar,
	Clock,
	ArrowUpRight,
	ArrowDownRight,
} from 'lucide-react';
import {
	LineChart,
	Line,
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
	Legend,
} from 'recharts';

const Dashboard = () => {
	// Sample data for charts
	const enrollmentData = [
		{ name: 'Mon', students: 45 },
		{ name: 'Tue', students: 52 },
		{ name: 'Wed', students: 48 },
		{ name: 'Thu', students: 61 },
		{ name: 'Fri', students: 55 },
		{ name: 'Sat', students: 38 },
		{ name: 'Sun', students: 42 },
	];

	const coursePerformance = [
		{ name: 'React', completed: 85, inProgress: 45, notStarted: 20 },
		{ name: 'Node.js', completed: 72, inProgress: 38, notStarted: 15 },
		{ name: 'Python', completed: 90, inProgress: 52, notStarted: 18 },
		{ name: 'UI/UX', completed: 65, inProgress: 41, notStarted: 22 },
	];

	const categoryData = [
		{ name: 'Development', value: 45, color: '#3b82f6' },
		{ name: 'Design', value: 25, color: '#8b5cf6' },
		{ name: 'Business', value: 20, color: '#10b981' },
		{ name: 'Marketing', value: 10, color: '#f59e0b' },
	];

	const stats = [
		{
			title: 'Total Students',
			value: '2,543',
			change: '+12.5%',
			trend: 'up',
			icon: Users,
			color: 'text-blue-500',
			bgColor: 'bg-blue-500/10',
		},
		{
			title: 'Active Courses',
			value: '48',
			change: '+3.2%',
			trend: 'up',
			icon: BookOpen,
			color: 'text-emerald-500',
			bgColor: 'bg-emerald-500/10',
		},
		{
			title: 'Completion Rate',
			value: '78.3%',
			change: '+5.1%',
			trend: 'up',
			icon: TrendingUp,
			color: 'text-violet-500',
			bgColor: 'bg-violet-500/10',
		},
		{
			title: 'Certifications',
			value: '1,234',
			change: '-2.3%',
			trend: 'down',
			icon: Award,
			color: 'text-amber-500',
			bgColor: 'bg-amber-500/10',
		},
	];

	const recentActivity = [
		{
			student: 'Sarah Johnson',
			course: 'Advanced React',
			action: 'Completed',
			time: '2 min ago',
		},
		{
			student: 'Mike Chen',
			course: 'Node.js Basics',
			action: 'Enrolled',
			time: '15 min ago',
		},
		{
			student: 'Emma Davis',
			course: 'UI/UX Design',
			action: 'Started Module 3',
			time: '1 hour ago',
		},
		{
			student: 'James Wilson',
			course: 'Python Pro',
			action: 'Completed Quiz',
			time: '2 hours ago',
		},
	];

	return (
		<div className='min-h-screen bg-background p-6 md:p-8 lg:p-10'>
			<div className='w-full max-w-[1600px] mx-auto space-y-8'>
				{/* Header */}
				<div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
					<div>
						<h1 className='text-3xl md:text-4xl font-bold tracking-tight'>
							Dashboard
						</h1>
						<p className='text-muted-foreground mt-2'>
							Welcome back! Here's what's happening with your learning platform.
						</p>
					</div>
					<div className='flex gap-3'>
						<Button
							variant='outline'
							className='gap-2'
						>
							<Calendar className='h-4 w-4' />
							Last 7 days
						</Button>
						<Button className='gap-2'>
							<BarChart3 className='h-4 w-4' />
							View Reports
						</Button>
					</div>
				</div>

				{/* Stats Grid */}
				<div className='grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
					{stats.map((stat, index) => (
						<Card
							key={index}
							className='overflow-hidden'
						>
							<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
								<CardTitle className='text-sm font-medium'>
									{stat.title}
								</CardTitle>
								<div className={`${stat.bgColor} p-2 rounded-lg`}>
									<stat.icon className={`h-4 w-4 ${stat.color}`} />
								</div>
							</CardHeader>
							<CardContent>
								<div className='text-3xl font-bold'>{stat.value}</div>
								<div className='flex items-center gap-1 text-xs mt-2'>
									{stat.trend === 'up' ? (
										<ArrowUpRight className='h-4 w-4 text-emerald-500' />
									) : (
										<ArrowDownRight className='h-4 w-4 text-red-500' />
									)}
									<span
										className={
											stat.trend === 'up' ? 'text-emerald-500' : 'text-red-500'
										}
									>
										{stat.change}
									</span>
									<span className='text-muted-foreground'>from last month</span>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Charts Row */}
				<div className='grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-7'>
					{/* Student Enrollment Trend */}
					<Card className='col-span-4'>
						<CardHeader>
							<CardTitle>Student Enrollment Trend</CardTitle>
							<CardDescription>
								Daily new enrollments over the past week
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ResponsiveContainer
								width='100%'
								height={300}
							>
								<LineChart data={enrollmentData}>
									<CartesianGrid
										strokeDasharray='3 3'
										className='stroke-muted'
									/>
									<XAxis
										dataKey='name'
										className='text-xs'
									/>
									<YAxis className='text-xs' />
									<Tooltip
										contentStyle={{
											backgroundColor: 'hsl(var(--background))',
											border: '1px solid hsl(var(--border))',
											borderRadius: '8px',
										}}
									/>
									<Line
										type='monotone'
										dataKey='students'
										stroke='hsl(var(--primary))'
										strokeWidth={2}
										dot={{ fill: 'hsl(var(--primary))' }}
									/>
								</LineChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>

					{/* Category Distribution */}
					<Card className='col-span-3'>
						<CardHeader>
							<CardTitle>Course Categories</CardTitle>
							<CardDescription>Distribution by category</CardDescription>
						</CardHeader>
						<CardContent>
							<ResponsiveContainer
								width='100%'
								height={300}
							>
								<PieChart>
									<Pie
										data={categoryData}
										cx='50%'
										cy='50%'
										innerRadius={60}
										outerRadius={100}
										paddingAngle={2}
										dataKey='value'
									>
										{categoryData.map((entry, index) => (
											<Cell
												key={`cell-${index}`}
												fill={entry.color}
											/>
										))}
									</Pie>
									<Tooltip
										contentStyle={{
											backgroundColor: 'hsl(var(--background))',
											border: '1px solid hsl(var(--border))',
											borderRadius: '8px',
										}}
									/>
								</PieChart>
							</ResponsiveContainer>
							<div className='grid grid-cols-2 gap-3 mt-4'>
								{categoryData.map((cat, index) => (
									<div
										key={index}
										className='flex items-center gap-2'
									>
										<div
											className='w-3 h-3 rounded-full'
											style={{ backgroundColor: cat.color }}
										/>
										<span className='text-sm text-muted-foreground'>
											{cat.name} ({cat.value}%)
										</span>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Course Performance and Recent Activity */}
				<div className='grid gap-6 md:grid-cols-2'>
					{/* Course Performance */}
					<Card>
						<CardHeader>
							<CardTitle>Course Performance</CardTitle>
						</CardHeader>
						<CardContent>
							<ResponsiveContainer
								width='100%'
								height={350}
							>
								<BarChart data={coursePerformance}>
									<CartesianGrid
										strokeDasharray='3 3'
										className='stroke-muted'
									/>
									<XAxis
										dataKey='name'
										className='text-xs'
									/>
									<YAxis className='text-xs' />
									<Tooltip
										contentStyle={{
											backgroundColor: 'hsl(var(--background))',
											border: '1px solid hsl(var(--border))',
											borderRadius: '8px',
										}}
									/>
									<Legend />
									<Bar
										dataKey='completed'
										fill='#10b981'
										name='Completed'
										radius={[4, 4, 0, 0]}
									/>
									<Bar
										dataKey='inProgress'
										fill='#3b82f6'
										name='In Progress'
										radius={[4, 4, 0, 0]}
									/>
									<Bar
										dataKey='notStarted'
										fill='#94a3b8'
										name='Not Started'
										radius={[4, 4, 0, 0]}
									/>
								</BarChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>

					{/* Recent Activity */}
					<Card>
						<CardHeader>
							<CardTitle>Recent Activity</CardTitle>
							<CardDescription>Latest student interactions</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='space-y-4'>
								{recentActivity.map((activity, index) => (
									<div
										key={index}
										className='flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0'
									>
										<div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0'>
											<Users className='h-5 w-5 text-primary' />
										</div>
										<div className='flex-1 space-y-1'>
											<p className='text-sm font-medium leading-none'>
												{activity.student}
											</p>
											<p className='text-sm text-muted-foreground'>
												{activity.action}{' '}
												<span className='font-medium text-foreground'>
													{activity.course}
												</span>
											</p>
											<div className='flex items-center gap-1 text-xs text-muted-foreground'>
												<Clock className='h-3 w-3' />
												{activity.time}
											</div>
										</div>
									</div>
								))}
							</div>
							<Button
								variant='outline'
								className='w-full mt-4'
							>
								View All Activity
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
