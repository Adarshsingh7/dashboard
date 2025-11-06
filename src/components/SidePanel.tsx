import { Link } from 'react-router-dom';

import { ChevronDown, ChevronUp, MoreHorizontal, User2 } from 'lucide-react';

import {
	SidebarFooter,
	SidebarHeader,
	SidebarMenuAction,
	SidebarProvider,
	SidebarTrigger,
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuBadge,
} from '@/components/ui/sidebar';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface dropdownItemContentProps extends MenuProps {
	dropdownItemContent: { title: string; action: () => void }[];
}

interface BadgedMenuProps extends MenuProps {
	badgeNumber: number;
}

function Header() {
	return (
		<SidebarHeader>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton>
								Select Workspace
								<ChevronDown className='ml-auto' />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='w-56'>
							<DropdownMenuItem>
								<span>Acme Inc</span>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<span>Acme Corp.</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarHeader>
	);
}

function Footer() {
	return (
		<SidebarFooter>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton>
								<User2 /> Username
								<ChevronUp className='ml-auto' />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							side='top'
							className='w-56'
						>
							<DropdownMenuItem>
								<span>Account</span>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<span>Billing</span>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<span>Sign out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	);
}

function CollapsibleMenu({ title, content }: CollapsibleMenuProps) {
	return (
		<Collapsible
			defaultOpen
			className='group/collapsible'
		>
			<SidebarGroup>
				<SidebarGroupLabel asChild>
					<CollapsibleTrigger className='flex items-center gap-2 font-bold hover:opacity-80 px-2 py-1 rounded-md cursor-pointer'>
						<span>{title}</span>
						<ChevronDown className='ml-auto transition-transform' />
					</CollapsibleTrigger>
				</SidebarGroupLabel>
				<CollapsibleContent>
					<SidebarGroupContent>
						<SidebarMenu>
							{content?.map((item, idx) => (
								<Content
									node={[item]}
									key={idx}
								/>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</CollapsibleContent>
			</SidebarGroup>
		</Collapsible>
	);
}

function NormalMenu({ icon, title, action }: MenuProps) {
	return (
		<SidebarMenuItem>
			<SidebarMenuButton
				className='cursor-default'
				asChild
				onClick={action}
			>
				<Link to='/'>
					{icon}
					<span>{title}</span>
				</Link>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
}

function ActionMenu({
	icon,
	title,
	action,
	dropdownItemContent,
}: dropdownItemContentProps) {
	return (
		<SidebarMenuItem>
			<SidebarMenuButton
				asChild
				onClick={action}
			>
				<span>
					{icon}
					<span>{title}</span>
				</span>
			</SidebarMenuButton>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<SidebarMenuAction>
						<MoreHorizontal />
					</SidebarMenuAction>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					side='left'
					align='start'
				>
					{dropdownItemContent.map((item) => (
						<DropdownMenuItem
							key={item.title}
							onSelect={item.action}
						>
							{item.title}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</SidebarMenuItem>
	);
}

function BadgedMenu({ icon, action, title, badgeNumber }: BadgedMenuProps) {
	return (
		<SidebarMenuItem>
			<SidebarMenuButton
				onClick={action}
				className='cursor-default'
				asChild
			>
				<span>
					{icon}
					<span>{title}</span>
				</span>
			</SidebarMenuButton>
			<SidebarMenuBadge>{badgeNumber}</SidebarMenuBadge>
		</SidebarMenuItem>
	);
}

function Content({ node }: PanelContentProps) {
	return (
		<SidebarContent>
			<SidebarMenu>
				{node.map((item, idx) => {
					const menu = item;

					// Normal Menu
					if (
						'action' in menu &&
						!('dropdownItemContent' in menu) &&
						!('badgeNumber' in menu) &&
						!('content' in menu)
					) {
						return (
							<NormalMenu
								key={idx}
								icon={menu.icon}
								title={menu.title}
								action={menu.action}
							/>
						);
					}

					// Action Menu
					if ('dropdownItemContent' in menu) {
						return (
							<ActionMenu
								key={idx}
								icon={menu.icon}
								title={menu.title}
								action={menu.action}
								dropdownItemContent={menu.dropdownItemContent}
							/>
						);
					}

					// Badged Menu
					if ('badgeNumber' in menu) {
						return (
							<BadgedMenu
								key={idx}
								icon={menu.icon}
								title={menu.title}
								action={menu.action}
								badgeNumber={menu.badgeNumber}
							/>
						);
					}

					// Collapsible Menu (recursive)
					// Change this condition:
					if ('content' in menu) {
						return (
							<CollapsibleMenu
								key={idx}
								icon={menu.icon}
								title={menu.title}
								content={menu.content} // Change from 'node' to 'content'
							/>
						);
					}

					return null;
				})}
			</SidebarMenu>
		</SidebarContent>
	);
}

function AppSidebar({ children }: { children: React.ReactNode }) {
	return (
		<Sidebar variant='floating'>
			<Header />
			{children}
			<Footer />
		</Sidebar>
	);
}

function Main({ children }: { children?: React.ReactNode }) {
	return (
		<main className='flex-1 p-4 relative'>
			<div className='flex gap-5 sticky top-0 bg-white/50 py-2 mb-4 border-b z-50 backdrop-blur-sm'>
				<SidebarTrigger />
				<div>
					<span className='text-gray-400'>/dashboard/home</span>
				</div>
			</div>
			{children}
		</main>
	);
}

function SidePanel({
	node,
	children,
}: {
	node: PanelContentProps;
	children?: React.ReactNode;
}) {
	return (
		<SidebarProvider>
			<AppSidebar>
				<Content node={node.node} />
			</AppSidebar>
			<Main>{children}</Main>
		</SidebarProvider>
	);
}

export default SidePanel;
