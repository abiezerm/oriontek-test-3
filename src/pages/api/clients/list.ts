import { firebaseApp } from '@/firebase/config';
import { clientConverter } from '@/models/client';
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

const firestore = getFirestore(firebaseApp);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const q = query(collection(firestore, 'clients')).withConverter(clientConverter);
	const snapshot = await getDocs(q);
	const data = snapshot.docs.map((d) => d.data());
	res.status(200).json(data);
}
