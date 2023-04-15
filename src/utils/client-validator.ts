import { Client } from '@/models/client';
import { isEmailAddressValid, neitherNullNorEmptyFields } from './validator';

export const isValid = (client: Client) => {
	if (!neitherNullNorEmptyFields(client, 'firstName', 'lastName', 'email')) {
		return false;
	}
	if (!isEmailAddressValid(client.email)) {
		return false;
	}
	if (client.age <= 0) {
		return false;
	}
	return true;
};
