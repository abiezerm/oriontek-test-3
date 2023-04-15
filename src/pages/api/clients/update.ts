import { firebaseApp } from '@/firebase/config';
import { Client } from '@/models/client';
import { isValid } from '@/utils/client-validator';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

const firestore = getFirestore(firebaseApp);
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
	const { id, ...updateRequest } = client;
	const docRef = doc(firestore, 'clients', id);
	await updateDoc(docRef, updateRequest);
	res.status(200).json(client);
}
