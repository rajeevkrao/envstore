import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
	
export default defineNuxtConfig({
	css: ['vue-toastification/dist/index.css', 'ant-design-vue/dist/antd.dark.css'],
	ssr: false,
	vite: {
		plugins: [
			Components({
				resolvers: [AntDesignVueResolver({ resolveIcons: true, importStyle: 'css' })],
			}),
		],
		ssr: {
			noExternal: ['moment', 'compute-scroll-into-view', 'ant-design-vue', '@ant-design/icons-vue'],
		},
	},
	runtimeConfig: {
		public: {
			storageAccount: '',
		},
	},
});