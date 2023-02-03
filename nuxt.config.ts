	export default defineNuxtConfig({
		css: [/* 'vue-toastification/dist/index.css', 'ant-design-vue/dist/antd.css', '/assets/styles/main.scss' */],
		ssr: false,
		vite: {
			plugins: [
				/* Components({
					// add option {resolveIcons: true} as parameter for resolving problem with icons
					resolvers: [AntDesignVueResolver({ resolveIcons: true, importStyle: 'css' })],
				}), */
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