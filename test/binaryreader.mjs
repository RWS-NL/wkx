import assert from 'node:assert';
import { Buffer } from 'node:buffer';
import BinaryReader from '../src/binaryreader.mjs';

describe('wkx', () => {
	describe('BinaryReader', () => {
		it('readVarInt', () => {
			assert.equal(new BinaryReader(Buffer.from('01', 'hex')).readVarInt(), 1);
			assert.equal(new BinaryReader(Buffer.from('ac02', 'hex')).readVarInt(), 300);
		});
	});
});
