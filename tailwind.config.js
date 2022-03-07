// Tailwind가 이 파일을 바라보고 있고, 이 파일 내에 우리는 어디(components, pages ...)에서 tailwind를 사용할 것인지를 나타냄
module.exports = {
	content: [
		"./pages/**/*.{js,jsx,ts,tsx}", //pages폴더 내의 모든 폴더와 파일.{js,jsx,ts,tsx}
		"./components/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
