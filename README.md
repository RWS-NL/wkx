# wkx

A WKT/WKB/EWKT/EWKB/TWKB/GeoJSON parser and serializer with support for

-   Point
-   LineString
-   Polygon
-   MultiPoint
-   MultiLineString
-   MultiPolygon
-   GeometryCollection

## Examples

The following examples show you how to work with wkx.

```javascript
import wkx from '@rws-nl/wkx';

//Parsing a WKT string
const geometry = wkx.Geometry.parse('POINT(1 2)');

//Parsing an EWKT string
const geometry = wkx.Geometry.parse('SRID=4326;POINT(1 2)');

//Parsing a node Buffer containing a WKB object
const geometry = wkx.Geometry.parse(wkbBuffer);

//Parsing a node Buffer containing an EWKB object
const geometry = wkx.Geometry.parse(ewkbBuffer);

//Parsing a node Buffer containing a TWKB object
const geometry = wkx.Geometry.parseTwkb(twkbBuffer);

//Parsing a GeoJSON object
const geometry = wkx.Geometry.parseGeoJSON({
	type: 'Point',
	coordinates: [1, 2]
});

//Serializing a Point geometry to WKT
const wktString = new wkx.Point(1, 2).toWkt();

//Serializing a Point geometry to WKB
const wkbBuffer = new wkx.Point(1, 2).toWkb();

//Serializing a Point geometry to EWKT
const ewktString = new wkx.Point(1, 2, undefined, undefined, 4326).toEwkt();

//Serializing a Point geometry to EWKB
const ewkbBuffer = new wkx.Point(1, 2, undefined, undefined, 4326).toEwkb();

//Serializing a Point geometry to TWKB
const twkbBuffer = new wkx.Point(1, 2).toTwkb();

//Serializing a Point geometry to GeoJSON
const geoJSONObject = new wkx.Point(1, 2).toGeoJSON();
```
