import { AddEditClient } from '@/components/AddEditClient';
import { Client } from '@/models/client';
import { Button, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams, GridRowSelectionModel } from '@mui/x-data-grid';
import axios from 'axios';
import { useConfirm } from 'material-ui-confirm';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const columns: GridColDef[] = [
	{ field: 'firstName', headerName: 'First name', width: 200 },
	{ field: 'lastName', headerName: 'Last name', width: 200 },
	{
		field: 'age',
		headerName: 'Age',
		type: 'number',
		width: 150,
		headerAlign: 'left',
		align: 'left'
	},
	{
		field: 'email',
		headerName: 'Email',
		width: 250,
		headerAlign: 'left',
		align: 'left'
	}
];

export default function ClientsList({ rows = [] }: { rows: Client[] }) {
	// dialog = AddOrEditClient
	const [clientList, setClientList] = useState<Client[]>([]);
	const [openDialog, setOpenDialog] = useState(false);
	const [dialogTitle, setDialogTitle] = useState('');
	const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
	const [selectedIds, setSelectedIds] = useState<string[]>([]);
	const confirm = useConfirm();

	useEffect(() => {
		setClientList(rows);
	}, [rows]);

	const showDialog = (title: string) => {
		setOpenDialog(true);
		setDialogTitle(title);
	};

	const onAddClick = () => {
		setSelectedRowId(null);
		showDialog('Adding New Client');
	};

	const onRowDoubleClick = (gridRowParams: GridRowParams<Client>) => {
		setSelectedRowId(gridRowParams.id.toString());
		showDialog(`Client ${gridRowParams.row.firstName} ${gridRowParams.row.lastName}`);
	};

	const onRowSelectionModelChange = (e: GridRowSelectionModel) => {
		setSelectedIds((e as string[]) ?? []);
	};

	const onDeleteClick = async () => {
		try {
			await confirm({
				title: 'Deleting Clients...',
				description:
					'Are you sure you want to remove the selected client(s)?' + '\nThis action is permanent!'
			});
			await axios.post('/api/clients/delete', { clientIds: selectedIds });
			setClientList(clientList.filter((c) => selectedIds.includes(c.id) === false));
			toast.success('Clients deleted successfully.');
		} catch (error) {
			if (!error) {
				return;
			}
			toast.error(
				'Failure trying to remove the selected clients. Please reload and try again later.'
			);
		}
	};

	return (
		<>
			<AddEditClient
				selectedRowId={selectedRowId}
				setSelectedRowId={setSelectedRowId}
				clientList={clientList}
				setClientList={setClientList}
				open={openDialog}
				setOpen={setOpenDialog}
				title={dialogTitle}
			/>
			<div className="container">
				<div style={{ display: 'flex', marginBottom: 5 }}>
					<Typography sx={{ flex: '1 1 100%' }} variant="h5" id="tableTitle" component="div">
						Clients
					</Typography>
					<Button
						style={{ marginRight: 10 }}
						variant="outlined"
						color="success"
						onClick={() => onAddClick()}
					>
						Add
					</Button>
					<Button
						variant="outlined"
						color="error"
						disabled={selectedIds.length === 0}
						onClick={() => onDeleteClick()}
					>
						Delete
					</Button>
				</div>
				<DataGrid
					rows={clientList}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: {
								pageSize: 10
							}
						}
					}}
					onRowSelectionModelChange={(e) => onRowSelectionModelChange(e)}
					pageSizeOptions={[5, 10, 50]}
					checkboxSelection
					disableRowSelectionOnClick
					onRowDoubleClick={(e) => onRowDoubleClick(e)}
				/>
			</div>
			<style jsx>{`
				.container {
					height: 80vh;
					width: 100%;
				}
			`}</style>
		</>
	);
}

export async function getServerSideProps() {
	const res = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/clients/list`);
	const rows = res.data;
	return { props: { rows } };
}
