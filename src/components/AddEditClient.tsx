import { Address } from '@/models/address';
import { Client } from '@/models/client';
import { formControlStyles } from '@/styles/form-control-styles';
import { EmailRegexExpression } from '@/utils/regex-expressions';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormHelperText,
	Grid,
	Input,
	InputLabel
} from '@mui/material';
import axios from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import AddressList from './AddressList';

export type AddEditClientProps = {
	selectedRowId: string | null;
	setSelectedRowId: Dispatch<SetStateAction<string | null>>;
	clientList: Client[];
	setClientList: Dispatch<SetStateAction<Client[]>>;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	title: string;
};

export function AddEditClient({
	selectedRowId,
	setSelectedRowId,
	clientList,
	setClientList,
	open = false,
	setOpen,
	title
}: AddEditClientProps) {
	const {
		control,
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors }
	} = useForm();
	const [addressList, setAddressList] = useState<Address[]>([]);

	useEffect(() => {
		if (!selectedRowId) {
			return;
		}
		axios
			.post(`/api/clients/${selectedRowId}`)
			.then((res) => {
				const client = res.data;
				Object.keys(client).forEach((key) => setValue(key, client[key]?.toString() ?? ''));
				setAddressList((client as Client)?.addressList ?? []);
			})
			.catch((_) => {
				toast.error('Failure retrieving client. Please reload and try again.');
			});
	}, [selectedRowId, setValue]);

	const onSubmitValid = (data: any) => {
		const client: Client = Object.assign(new Client(), data);
		const adding = client.id === '';
		axios
			.post(`/api/clients/${adding ? 'add' : 'update'}`, client)
			.then((res) => {
				handleClose();
				const clientResponse = res.data as Client;
				if (adding) {
					setClientList([...clientList, clientResponse]);
				}
				if (client.id !== '') {
					setClientList(clientList.map((c) => (c.id === clientResponse.id ? clientResponse : c)));
				}
				toast.success('Client saved successfully');
			})
			.catch((_) => {
				toast.error('Failure while trying to save client. Please try again later.');
			});
	};

	const handleClose = () => {
		setOpen(false);
		reset();
		setSelectedRowId(null);
		setAddressList([]);
	};

	return (
		<Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<Box component="form" sx={{ '&': { maxWidth: '1000px' } }} noValidate autoComplete="off">
					<Grid container spacing={1}>
						<Grid item xs={6}>
							<FormControl style={formControlStyles} variant="standard">
								<InputLabel shrink={true} htmlFor="firstName">
									First Name
								</InputLabel>
								<Input
									{...register('firstName', { required: true })}
									error={errors.firstName !== undefined}
									id="firstName"
									aria-describedby="client-first-name"
								/>
								{errors.firstName && <FormHelperText error>First name is required</FormHelperText>}
							</FormControl>
						</Grid>
						<Grid item xs={6}>
							<FormControl style={formControlStyles} variant="standard">
								<InputLabel shrink={true} htmlFor="lastName">
									Last Name
								</InputLabel>
								<Input
									{...register('lastName', { required: true })}
									id="lastName"
									aria-describedby="client-last-name"
								/>
								{errors.lastName && <FormHelperText error>Last name is required</FormHelperText>}
							</FormControl>
						</Grid>
						<Grid item xs={6}>
							<FormControl style={formControlStyles} variant="standard">
								<InputLabel shrink={true} htmlFor="age">
									Age
								</InputLabel>
								<Input
									{...register('age', {
										required: true,
										valueAsNumber: true,
										min: 1
									})}
									type="number"
									id="age"
									aria-describedby="client-age"
								/>
								{errors.age && <FormHelperText error>Age must be greater than 0</FormHelperText>}
							</FormControl>
						</Grid>
						<Grid item xs={6}>
							<FormControl style={formControlStyles} variant="standard">
								<InputLabel shrink={true} htmlFor="email">
									Email
								</InputLabel>
								<Input
									{...register('email', {
										required: true,
										pattern: EmailRegexExpression
									})}
									id="email"
									aria-describedby="client-email"
								/>
								{errors.email && (
									<FormHelperText error>Email is required and must be valid</FormHelperText>
								)}
							</FormControl>
						</Grid>
						<Grid item xs={12} style={{ marginTop: 10, width: '100%' }}>
							<AddressList
								control={control}
								register={register}
								errors={errors}
								addressList={addressList}
							/>
						</Grid>
					</Grid>
				</Box>
				<DialogActions>
					<Button color="primary" onClick={handleClose}>
						Cancel
					</Button>
					<Button type="submit" color="success" onClick={handleSubmit(onSubmitValid)}>
						Save
					</Button>
				</DialogActions>
			</DialogContent>
		</Dialog>
	);
}
