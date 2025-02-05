import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
    console.log('Admin layout user check:', locals.user);

    if (!locals.user) {
        console.log('Redirecting to login from admin layout');
        throw redirect(302, '/login');
    }
    return { user: locals.user };
}; 