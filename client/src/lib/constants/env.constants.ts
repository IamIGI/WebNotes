function getEnv(key: string, defaultValue?: string) {
	const value = import.meta.env[key] || defaultValue;
	if (!value) throw new Error(`Environment variable ${key} is not defined`);

	return value;
}

const PROD = getEnv('VITE_PROD');
const PROD_SERVER_URL = getEnv('VITE_API_SERVER_URL_PROD');

export default {
	PROD,
	PROD_SERVER_URL
};
