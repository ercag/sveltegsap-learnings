import { redirect } from '@sveltejs/kit';

export const actions = {
    /**
     * @param {import('@sveltejs/kit').RequestEvent} event
     */
    default: async ({ cookies }) => {
        // Remove the session cookie
        cookies.delete('session', { path: '/' });
        // Redirect to the login page after logout
        throw redirect(303, '/login');
    }
}; 