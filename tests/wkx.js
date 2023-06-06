/* eslint-disable guard-for-in */

import eql from 'deep-eql';

import { Geometry, MultiPoint, Point } from '../dist/wkx.mjs';

const tests = {
	'2D': require('./testdata.json'),
	Z: require('./testdataZ.json'),
	M: require('./testdataM.json'),
	ZM: require('./testdataZM.json')
};

import assert from 'assert';

function assertParseWkt(data) {
	assert(eql(Geometry.parse(data.wkt), eval(data.geometry)));
}

function assertParseWkb(data) {
	let geometry = data.wkbGeometry ? data.wkbGeometry : data.geometry;
	geometry = eval(geometry);
	geometry.srid = undefined;
	assert(eql(Geometry.parse(Buffer.from(data.wkb, 'hex')), geometry));
}

function assertParseWkbXdr(data) {
	let geometry = data.wkbGeometry ? data.wkbGeometry : data.geometry;
	geometry = eval(geometry);
	geometry.srid = undefined;
	assert(eql(Geometry.parse(Buffer.from(data.wkbXdr, 'hex')), geometry));
}

function assertParseEwkt(data) {
	const geometry = eval(data.geometry);
	geometry.srid = 4326;
	assert(eql(Geometry.parse(`SRID=4326;${data.wkt}`), geometry));
}

function assertParseEwkb(data) {
	let geometry = data.wkbGeometry ? data.wkbGeometry : data.geometry;
	geometry = eval(geometry);
	geometry.srid = 4326;
	assert(eql(Geometry.parse(Buffer.from(data.ewkb, 'hex')), geometry));
}

function assertParseEwkbXdr(data) {
	let geometry = data.wkbGeometry ? data.wkbGeometry : data.geometry;
	geometry = eval(geometry);
	geometry.srid = 4326;
	assert(eql(Geometry.parse(Buffer.from(data.ewkbXdr, 'hex')), geometry));
}

function assertParseEwkbNoSrid(data) {
	let geometry = data.wkbGeometry ? data.wkbGeometry : data.geometry;
	geometry = eval(geometry);
	assert(eql(Geometry.parse(Buffer.from(data.ewkbNoSrid, 'hex')), geometry));
}

function assertParseEwkbXdrNoSrid(data) {
	let geometry = data.wkbGeometry ? data.wkbGeometry : data.geometry;
	geometry = eval(geometry);
	assert(eql(Geometry.parse(Buffer.from(data.ewkbXdrNoSrid, 'hex')), geometry));
}

function assertParseTwkb(data) {
	const geometry = eval(data.geometry);
	geometry.srid = undefined;
	assert(eql(Geometry.parseTwkb(Buffer.from(data.twkb, 'hex')), geometry));
}

function assertParseGeoJSON(data) {
	let geometry = data.geoJSONGeometry ? data.geoJSONGeometry : data.geometry;
	geometry = eval(geometry);
	geometry.srid = 4326;
	assert(eql(Geometry.parseGeoJSON(data.geoJSON), geometry));
}

function assertToWkt(data) {
	assert.equal(eval(data.geometry).toWkt(), data.wkt);
}

function assertToWkb(data) {
	assert.equal(eval(data.geometry).toWkb().toString('hex'), data.wkb);
}

function assertToEwkt(data) {
	const geometry = eval(data.geometry);
	geometry.srid = 4326;
	assert.equal(geometry.toEwkt(), `SRID=4326;${data.wkt}`);
}

function assertToEwkb(data) {
	const geometry = eval(data.geometry);
	geometry.srid = 4326;
	assert.equal(geometry.toEwkb().toString('hex'), data.ewkb);
}

function assertToTwkb(data) {
	assert.equal(eval(data.geometry).toTwkb().toString('hex'), data.twkb);
}

function assertToGeoJSON(data) {
	assert(eql(eval(data.geometry).toGeoJSON(), data.geoJSON));
}

describe('wkx', () => {
	describe('Geometry', () => {
		it('parse(wkt) - coordinate', () => {
			assert.deepEqual(Geometry.parse('POINT(1 2)'), new Point(1, 2));
			assert.deepEqual(Geometry.parse('POINT(1.2 3.4)'), new Point(1.2, 3.4));
			assert.deepEqual(Geometry.parse('POINT(1 3.4)'), new Point(1, 3.4));
			assert.deepEqual(Geometry.parse('POINT(1.2 3)'), new Point(1.2, 3));

			assert.deepEqual(Geometry.parse('POINT(-1 -2)'), new Point(-1, -2));
			assert.deepEqual(Geometry.parse('POINT(-1 2)'), new Point(-1, 2));
			assert.deepEqual(Geometry.parse('POINT(1 -2)'), new Point(1, -2));

			assert.deepEqual(Geometry.parse('POINT(-1.2 -3.4)'), new Point(-1.2, -3.4));
			assert.deepEqual(Geometry.parse('POINT(-1.2 3.4)'), new Point(-1.2, 3.4));
			assert.deepEqual(Geometry.parse('POINT(1.2 -3.4)'), new Point(1.2, -3.4));

			assert.deepEqual(Geometry.parse('POINT(1.2e1 3.4e1)'), new Point(12, 34));
			assert.deepEqual(Geometry.parse('POINT(1.2e-1 3.4e-1)'), new Point(0.12, 0.34));
			assert.deepEqual(Geometry.parse('POINT(-1.2e1 -3.4e1)'), new Point(-12, -34));
			assert.deepEqual(Geometry.parse('POINT(-1.2e-1 -3.4e-1)'), new Point(-0.12, -0.34));

			assert.deepEqual(Geometry.parse('MULTIPOINT(1 2,3 4)'), new MultiPoint([new Point(1, 2), new Point(3, 4)]));
			assert.deepEqual(Geometry.parse('MULTIPOINT(1 2, 3 4)'), new MultiPoint([new Point(1, 2), new Point(3, 4)]));
			assert.deepEqual(Geometry.parse('MULTIPOINT((1 2),(3 4))'), new MultiPoint([new Point(1, 2), new Point(3, 4)]));
			assert.deepEqual(Geometry.parse('MULTIPOINT((1 2), (3 4))'), new MultiPoint([new Point(1, 2), new Point(3, 4)]));
		});
		it('parse() - invalid input', () => {
			assert.throws(Geometry.parse, /first argument must be a string or Buffer/);
			assert.throws(() => {
				Geometry.parse('TEST');
			}, /Expected geometry type/);
			assert.throws(() => {
				Geometry.parse('POINT)');
			}, /Expected group start/);
			assert.throws(() => {
				Geometry.parse('POINT(1 2');
			}, /Expected group end/);
			assert.throws(() => {
				Geometry.parse('POINT(1)');
			}, /Expected coordinates/);
			assert.throws(() => {
				Geometry.parse('TEST');
			}, /Expected geometry type/);
			assert.throws(() => {
				Geometry.parse(Buffer.from('010800000000000000', 'hex'));
			}, /GeometryType 8 not supported/);
			assert.throws(() => {
				Geometry.parseTwkb(Buffer.from('a800c09a0c80b518', 'hex'));
			}, /GeometryType 8 not supported/);
			assert.throws(() => {
				Geometry.parseGeoJSON({ type: 'TEST' });
			}, /GeometryType TEST not supported/);
		});
	});

	function createTest(testKey, testData) {
		describe(testKey, () => {
			it('parse(wkt)', () => {
				assertParseWkt(testData[testKey]);
			});
			it('parse(wkb)', () => {
				assertParseWkb(testData[testKey]);
			});
			it('parse(wkb xdr)', () => {
				assertParseWkbXdr(testData[testKey]);
			});
			it('parse(ewkt)', () => {
				assertParseEwkt(testData[testKey]);
			});
			it('parse(ewkb)', () => {
				assertParseEwkb(testData[testKey]);
			});
			it('parse(ewkb xdr)', () => {
				assertParseEwkbXdr(testData[testKey]);
			});
			it('parse(ewkb no srid)', () => {
				assertParseEwkbNoSrid(testData[testKey]);
			});
			it('parse(ewkb xdr no srid)', () => {
				assertParseEwkbXdrNoSrid(testData[testKey]);
			});
			it('parseTwkb()', () => {
				assertParseTwkb(testData[testKey]);
			});
			it('parseGeoJSON()', () => {
				assertParseGeoJSON(testData[testKey]);
			});
			it('toWkt()', () => {
				assertToWkt(testData[testKey]);
			});
			it('toWkb()', () => {
				assertToWkb(testData[testKey]);
			});
			it('toEwkt()', () => {
				assertToEwkt(testData[testKey]);
			});
			it('toEwkb()', () => {
				assertToEwkb(testData[testKey]);
			});
			it('toTwkb()', () => {
				assertToTwkb(testData[testKey]);
			});
			it('toGeoJSON()', () => {
				assertToGeoJSON(testData[testKey]);
			});
		});
	}

	function createTests(testKey, testData) {
		describe(testKey, () => {
			for (const testDataKey in testData) {
				createTest(testDataKey, testData);
			}
		});
	}

	for (const testKey in tests) {
		createTests(testKey, tests[testKey]);
	}
});
