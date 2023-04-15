import { firebaseApp } from '@/firebase/config';
import { clientConverter } from '@/models/client';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

const firestore = getFirestore(firebaseApp);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { id } = req.query;
	if (id === null || typeof id !== 'string') {
		res.status(400).end();
		return;
	}
	const docRef = doc(firestore, 'clients', id).withConverter(clientConverter);
	const docSnap = await getDoc(docRef);
	if (!docSnap.exists()) {
		res.status(404).end();
		return;
	}
	res.status(200).json(docSnap.data());
}
