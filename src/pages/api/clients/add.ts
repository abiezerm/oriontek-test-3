import { firebaseApp } from '@/firebase/config';
import { Client } from '@/models/client';
import { isValid } from '@/utils/client-validator';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

const db = getFirestore(firebaseApp);
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const body = req.body;
	if (body === null) {
		res.status(400).end();
		return;
	}
	const client: Client = Object.assign(new Client(), body);
	if (!isValid(client)) {
		res.status(400).end();
		return;
	}
	const { id, ...addRequest } = client;
	const docRef = await addDoc(collection(db, 'clients'), addRequest);
	client.id = docRef.id;
	res.status(200).json(client);
}
