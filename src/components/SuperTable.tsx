/** @format */

import type {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
} from '@tanstack/react-table';
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

// eslint-disable-next-line react-refresh/only-export-components
export const userColumns: ColumnDef<User, unknown>[] = [
	{
		accessorKey: 'id',
		header: 'User ID',
	},
	{
		accessorKey: 'username',
		header: 'Username',
	},
	{
		accessorKey: 'email',
		header: 'Email',
	},
	{
		accessorKey: 'email_verified',
		header: 'Email Verified',
	},
	{
		accessorKey: 'roles',
		header: 'Roles',
		cell: ({ row }) => row.original.roles.join(', '),
	},
	{
		accessorKey: 'status',
		header: 'Status',
	},
	{
		accessorKey: 'last_login_at',
		header: 'Last Login',
		cell: ({ row }) =>
			row.original.last_login_at
				? new Date(row.original.last_login_at).toLocaleString()
				: 'Never',
	},
	{
		accessorKey: 'profile.full_name',
		header: 'Full Name',
	},
	{
		accessorKey: 'profile.avatar_url',
		header: 'Avatar',
		cell: ({ row }) => (
			<img
				src={row.original.profile.avatar_url}
				alt='avatar'
				className='w-8 h-8 rounded-full'
			/>
		),
	},
	{
		accessorKey: 'preferences.theme',
		header: 'Theme',
	},
	{
		accessorKey: 'preferences.language',
		header: 'Language',
	},
	{
		accessorKey: 'created_at',
		header: 'Created At',
		cell: ({ row }) => new Date(row.original.created_at).toLocaleString(),
	},
	{
		accessorKey: 'updated_at',
		header: 'Updated At',
		cell: ({ row }) => new Date(row.original.updated_at).toLocaleString(),
	},
	{
		header: 'Delete',
		cell: ({ row }) => {
			const onDelete = () => {
				alert(`Deleting user with ID: ${row.original.id}`);
			};
			return (
				<Button
					onClick={onDelete}
					variant={'destructive'}
				>
					Delete
				</Button>
			);
		},
	},
	{
		header: 'Edit',
		cell: ({ row }) => {
			const onEdit = () => {
				alert(`Editing user with ID: ${row.original.id}`);
			};
			return <Button onClick={onEdit}>Edit</Button>;
		},
	},
];

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});
	const [globalFilter, setGlobalFilter] = useState('');

	console.log(data);

	const table = useReactTable({
		data,
		columns,
		pageCount: 3,
		onPaginationChange: (e) => {
			console.log('pagination', e);
		},
		// manualPagination: true,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		onGlobalFilterChange: setGlobalFilter,
		globalFilterFn: (row, _columnId, filterValue) => {
			const searchValue = String(filterValue).toLowerCase();
			const rowValues = Object.values(row.original as Record<string, unknown>);

			const searchInValue = (value: unknown): boolean => {
				if (value == null) return false;
				if (typeof value === 'object' && !Array.isArray(value)) {
					return Object.values(value as Record<string, unknown>).some(
						searchInValue
					);
				}
				if (Array.isArray(value)) {
					return (value as unknown[]).some(searchInValue);
				}
				return String(value).toLowerCase().includes(searchValue);
			};

			return rowValues.some(searchInValue);
		},
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
			globalFilter,
		},
	});

	return (
		<div className='w-full flex flex-col gap-4'>
			<div className='flex items-center mx-4 mt-4'>
				<Input
					placeholder='Search all fields...'
					value={globalFilter ?? ''}
					onChange={(event) => setGlobalFilter(event.target.value)}
					className='max-w-sm'
				/>
				<Button
					variant='outline'
					className='ml-2'
				>
					Add Record
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='outline'
							className='ml-auto'
						>
							Columns <ChevronDown />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className='capitalize'
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className='overflow-hidden rounded-md border mx-4'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder ? null : (
												<div
													className={
														header.column.getCanSort()
															? 'flex items-center gap-2 cursor-pointer select-none'
															: undefined
													}
													onClick={
														header.column.getCanSort()
															? header.column.getToggleSortingHandler()
															: undefined
													}
												>
													{flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
													{header.column.getIsSorted() === 'asc' ? (
														<ChevronDown className='rotate-180 w-4 h-4' />
													) : header.column.getIsSorted() === 'desc' ? (
														<ChevronDown className='w-4 h-4' />
													) : null}
												</div>
											)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className='flex items-center justify-end space-x-2 mx-4 mb-4'>
				<div className='text-muted-foreground flex-1 text-sm'>
					{table.getFilteredSelectedRowModel().rows.length} of{' '}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className='space-x-2'>
					<Button
						variant='outline'
						size='sm'
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant='outline'
						size='sm'
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
