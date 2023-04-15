import { firebaseApp } from '@/firebase/config';
import axios from 'axios';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';

const firestore = getFirestore(firebaseApp);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const body = req.body;
	if (typeof body !== 'string') {
		res.status(400).end();
		return;
	}
	const response = await axios(`https://api.geoapify.com/v1/geocode/autocomplete`, {
		params: {
			text: body,
			apiKey: process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY
		}
	});
	res.status(200).json(response.data);
}
