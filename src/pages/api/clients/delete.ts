import { firebaseApp } from '@/firebase/config';
import {
	collection,
	documentId,
	getDocs,
	getFirestore,
	query,
	where,
	writeBatch
} from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

const firestore = getFirestore(firebaseApp);
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const body = req.body;
	if (body === null || body.clientIds === null) {
		res.status(400).end();
		return;
	}
	const batch = writeBatch(firestore);
	const clientIds: string[] = body.clientIds;
	const clientsRef = collection(firestore, 'clients');
	const q = query(clientsRef, where(documentId(), 'in', clientIds));
	const querySnapshot = await getDocs(q);
	querySnapshot.docs.forEach((doc) => {
		batch.delete(doc.ref);
	});
	await batch.commit();
	res.status(200).end();
}
