function getEnv(key: string, defaultValue?: string) {
	const value = import.meta.env[key] || defaultValue;
	if (!value) throw new Error(`Environment variable ${key} is not defined`);

	return value;
}

const API_URL =
	getEnv('VITE_ENV') === 'PROD' ? getEnv('VITE_API_SERVER_URL_PROD') : 'http://localhost:4000';

const ENV = getEnv('VITE_ENV');
const PROD_SERVER_URL = getEnv('VITE_API_SERVER_URL_PROD');

export default {
	API_URL,
	ENV,
	PROD_SERVER_URL
};
