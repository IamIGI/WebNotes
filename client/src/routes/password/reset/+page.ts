export async function load({ url }) {
	const code = url.searchParams.get('code') || '';
	const exp = Number(url.searchParams.get('exp')) || null;
	const now = Date.now();

	console.log(code, exp);
	const linkIsValid = Boolean(code && exp && exp > now);
	console.log(linkIsValid);
	return { code, linkIsValid };
}
