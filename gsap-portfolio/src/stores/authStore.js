import { writable } from 'svelte/store';

// Proper JSDoc type definition for JavaScript files
/**
 * @typedef {Object} User
 * @property {string} username
 * @property {string} password
 * @property {'admin'|'user'} role
 */

/** @type {User} */
export const staticUser = {
    username: 'admin',
    password: 'admin',
    role: 'admin'
};

export const authStore = writable({
    /** @type {User | null} */
    user: null,
    isAuthenticated: false
});