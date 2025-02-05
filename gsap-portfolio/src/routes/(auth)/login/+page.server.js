import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ cookies }) => {
        cookies.set('session', 'authenticated', { path: '/' });
        throw redirect(303, '/admin/dashboard');
    }
}; 