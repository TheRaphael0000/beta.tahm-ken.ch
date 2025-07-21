import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			}

			// You can avoid using the back on you computer if you
			// use the production back-end by using the proxy below
			// please dont push this :)
			// '/api': {
			//     target: 'https://tahm-ken.ch',
			//     changeOrigin: true,
			// }
		}
	}
});
