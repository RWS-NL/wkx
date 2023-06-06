import copy from 'rollup-plugin-copy';

export default {
	input: 'src/wkx.mjs',
	output: [{ file: 'dist/wkx.mjs', format: 'esm' }],
	external: ['node:buffer'],
	plugins: [
		copy({
			targets: [{ src: 'src/wkx.d.mts', dest: 'dist/' }]
		})
	]
};
