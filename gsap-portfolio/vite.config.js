import { sveltekit } from '@sveltejs/kit/vite';

export default {
    plugins: [sveltekit()],
    optimizeDeps: {
        exclude: ['clsx', 'devalue'] // Add problematic deps here
    }
}; 