import { Address } from '@/models/address';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import {
	Control,
	FieldErrors,
	FieldValues,
	UseFormRegister,
	useFieldArray
} from 'react-hook-form';
import AddressEntry from './AddressEntry';

type AddressListProps = {
	control: Control<FieldValues, any>;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors<FieldValues>;
	addressList: Address[];
};

export default function AddressList({
	control,
	register,
	errors,
	addressList
}: AddressListProps) {
	const { fields, append, remove, replace } = useFieldArray({
		control,
		name: 'addressList',
		shouldUnregister: true
	});

	useEffect(() => {
		replace([...addressList]);
	}, [addressList, replace]);

	const onDeleteClick = (index: number) => {
		remove(index);
	};

	const onAddClick = () => {
		append(new Address());
	};

	return (
		<>
			<div className="container">
				<div style={{ display: 'flex' }}>
					<Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
						Addresses
					</Typography>
					<Button variant="outlined" color="success" onClick={() => onAddClick()}>
						<AddIcon />
					</Button>
				</div>
				{fields.map((field, index) => (
					<div className="address-container" key={field.id}>
						<AddressEntry
							field={field}
							errors={(errors.addressList as FieldErrors)?.[index] as FieldErrors}
							index={index}
							register={register}
						/>
						<div className="address-delete-container">
							<Button variant="outlined" color="error" size="small" onClick={() => onDeleteClick(index)}>
								<DeleteIcon />
							</Button>
						</div>
					</div>
				))}
			</div>
			<style jsx>{`
				.container {
					width: 100%;
				}

				.address-container {
					display: flex;
				}

				.address-delete-container {
					display: flex;
					align-items: center;
				}
			`}</style>
		</>
	);
}
