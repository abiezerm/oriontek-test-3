import { formControlStyles } from '@/styles/form-control-styles';
import { FormControl, FormHelperText, Grid, Input, InputLabel } from '@mui/material';
import { useMemo } from 'react';
import {
	FieldErrors,
	FieldValues,
	UseFormRegister
} from 'react-hook-form';

type AddressProps = {
	field: Record<'id', string>;
	errors: FieldErrors<FieldValues>;
	index: number;
	register: UseFormRegister<any>;
};

export default function AddressEntry({ field, errors = {}, index, register }: AddressProps) {
	const keyLine = useMemo(() => `addressList.${index}.line`, [index]);
	const keyLabel = useMemo(() => `addressList.${index}.label`, [index]);

	return (
		<>
			<div className="container">
				<Grid container spacing={1}>
					<Grid item xs={4}>
						<FormControl style={formControlStyles} variant="standard">
							<InputLabel shrink={true} htmlFor={keyLabel}>
								Label {index + 1}
							</InputLabel>
							<Input
								{...register(keyLabel, { required: true })}
								error={errors['label'] !== undefined}
								id={keyLabel}
								aria-describedby="address-label"
							/>
							{errors['label'] && <FormHelperText error>Address label is required</FormHelperText>}
						</FormControl>
					</Grid>
					<Grid item xs={8}>
						<FormControl style={formControlStyles} variant="standard">
							<InputLabel shrink={true} htmlFor={keyLine}>
								Address {index + 1}
							</InputLabel>
							<Input
								{...register(keyLine, { required: true })}
								error={errors['line'] !== undefined}
								id={keyLine}
								aria-describedby="address-line"
							/>
							{errors['line'] && <FormHelperText error>Address line is required</FormHelperText>}
						</FormControl>
					</Grid>
				</Grid>
			</div >
			<style jsx>{`
				.container {
					display: flex;
					flex-direction: row;
					width: 100%;
					margin: 10px;
				}
			`}
			</style>
		</>
	);
}
