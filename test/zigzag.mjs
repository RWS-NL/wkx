import assert from 'node:assert';
import * as ZigZag from '../src/zigzag.mjs';

describe('wkx', () => {
	describe('ZigZag', () => {
		it('encode', () => {
			assert.equal(ZigZag.encode(-1), 1);
			assert.equal(ZigZag.encode(1), 2);
			assert.equal(ZigZag.encode(-2), 3);
			assert.equal(ZigZag.encode(2), 4);
		});
		it('decode', () => {
			assert.equal(ZigZag.decode(1), -1);
			assert.equal(ZigZag.decode(2), 1);
			assert.equal(ZigZag.decode(3), -2);
			assert.equal(ZigZag.decode(4), 2);
		});
	});
});
