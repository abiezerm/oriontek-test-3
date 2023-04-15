import { EmailRegexExpression } from './regex-expressions';

export function neitherNullNorEmptyFields<T>(object: T, ...fields: (keyof T)[]) {
	return fields.every((field) => {
		const objectField = object[field];
		if (!objectField) {
			return false;
		}
		if (typeof objectField === 'string' && objectField.trim() === '') {
			return false;
		}
		return true;
	});
}

export function isEmailAddressValid(email: string) {
	if (!email) {
		return false;
	}
	return EmailRegexExpression.test(email);
}
