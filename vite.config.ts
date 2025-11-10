import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ReactCompilerConfig = {
  target: '18'
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react({
      babel: {
        plugins: [
          ["babel-plugin-react-compiler", ReactCompilerConfig],
        ],
      },
    })],
    resolve: {
      alias: {
        '@_assets': path.resolve(__dirname, 'src/assets'),
        '@_modalImages': path.resolve(__dirname, 'src/assets/modal'),
        '@_components': path.resolve(__dirname, 'src/admin/components'),
        '@_menu': path.resolve(__dirname, 'src/admin/components/Menu'),
        '@_modal': path.resolve(__dirname, 'src/admin/components/Modal'),
        '@_navbar': path.resolve(__dirname, 'src/all/component/sibebar'),
        '@_notfound': path.resolve(__dirname, 'src/admin/components/NotFound'),
        '@_pages': path.resolve(__dirname, 'src/admin/page'),
        '@_main': path.resolve(__dirname, 'src/admin/page/Main'),
        '@_notice': path.resolve(__dirname, 'src/all/component/Notice'),
        '@_styles': path.resolve(__dirname, 'src/App.css'),
        '@_page': path.resolve(__dirname, 'src/student/page'),
        '@_component': path.resolve(__dirname, 'src/student/component'),
        '@_all': path.resolve(__dirname, 'src/all'),
        '@_api': path.resolve(__dirname, 'src/api'),
        '@_util': path.resolve(__dirname, 'src/student/util'),
      }
    },
    server: {
      proxy: {
        '/ara': {
          target: env.VITE_API_URL || 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => `/api${path}`
        },
        '/tch': {
          target: env.VITE_API_URL || 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => `/api${path}`
        },
        '/std': {
          target: env.VITE_API_URL || 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => `/api${path}`
        }
      }
    }
  }
});
