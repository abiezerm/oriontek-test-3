import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { firebaseApp } from '../config';

const db = getFirestore(firebaseApp);
export async function addData<T>(collection: string, id: string, data: any) {
	let result = null;
	let error = null;

	try {
		result = await setDoc(doc(db, collection, id), data, {
			merge: true
		});
	} catch (e) {
		error = e;
	}

	return { result, error };
}
