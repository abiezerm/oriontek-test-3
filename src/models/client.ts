import { FirestoreDataConverter } from 'firebase/firestore';
import { Address } from './address';

export class Client {
	id: string = '';
	firstName: string = '';
	lastName: string = '';
	email: string = '';
	age: number = 0;

	addressList: Address[] = [];
}

export const clientConverter: FirestoreDataConverter<Client> = {
	toFirestore: (client) => {
		const { id, ...data } = client;
		return data;
	},
	fromFirestore: (snapshot, options) => {
		const data = snapshot.data(options);
		const client = Object.assign(new Client(), data);
		client.id = snapshot.id;
		return client;
	}
};
