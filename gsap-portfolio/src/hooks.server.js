import { staticUser } from './stores/authStore';
import { redirect } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
    const session = event.cookies.get('session');

    // Simple session check (replace with proper auth in production)
    event.locals.user = null; // Initialize user property

    if (session === 'authenticated') {
        event.locals.user = staticUser;
    } else if (event.url.pathname.startsWith('/admin')) {
        throw redirect(303, '/login');
    }

    // Add debug logs
    console.log('Session cookie:', session);
    console.log('Request path:', event.url.pathname);
    console.log('User status:', event.locals.user);

    const response = await resolve(event);

    // Set session cookie on successful login
    if (event.url.pathname === '/login' && event.request.method === 'POST') {
        response.headers.set(
            'set-cookie',
            'session=authenticated; Path=/; HttpOnly; SameSite=Lax'
        );
    }

    return response;
}; 