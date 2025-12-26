import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
    },
  },
  // 兼容 react-notion-x 的样式
//   corePlugins: {
//     preflight: false,
//   },
};
export default config;