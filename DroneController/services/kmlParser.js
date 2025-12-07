const { XMLParser } = require('fast-xml-parser');

function parseKML(kmlContent) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    parseAttributeValue: true,
    trimValues: true
  });

  const result = parser.parse(kmlContent);

  const polygon = extractPolygonCoordinates(result);

  if (!polygon || polygon.length === 0) {
    throw new Error('Polygon not found in KML file');
  }

  return polygon;
}

function extractPolygonCoordinates(kmlData) {
  let coordinatesText = null;

  function traverse(obj) {
    if (!obj || typeof obj !== 'object') return;

    if (obj.Polygon?.outerBoundaryIs?.LinearRing?.coordinates) {
      coordinatesText = obj.Polygon.outerBoundaryIs.LinearRing.coordinates;
      return;
    }

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        traverse(obj[key]);
        if (coordinatesText) return;
      }
    }
  }

  traverse(kmlData);

  if (!coordinatesText) {
    return null;
  }

  const coordArray = coordinatesText
    .trim()
    .split(/\s+/)
    .map(coord => {
      const parts = coord.split(',');
      if (parts.length >= 2) {
        return {
          lat: parseFloat(parts[1]),
          lon: parseFloat(parts[0]),
          alt: parts[2] ? parseFloat(parts[2]) : 0
        };
      }
      return null;
    })
    .filter(coord => coord !== null);

  return coordArray;
}

module.exports = { parseKML };
