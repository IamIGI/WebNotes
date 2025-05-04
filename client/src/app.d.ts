// See https://svelte.dev/docs/kit/types#app.d.ts

import type { UserWithoutPassword } from '$lib/api/generated';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: UserWithoutPassword | undefined;
			accessToken: string | undefined;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
