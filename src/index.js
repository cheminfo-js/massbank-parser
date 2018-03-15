const camelCase = require('camelcase');
const Papa = require('papaparse');

/**
 *
 * @param {string} data
 * @return {object} containing the parsed massbank file
 */
export default function massbankParser(data) {
  let result = {
    chemical: {},
    mass: {},
    chromatography: {},
  };
  let lines = data.split(/[\r\n]+/);
  let type, subtype, value;
  for (let line of lines) {
    if (!line || line === '//') continue;
    if (line.indexOf(':') > 0) { // new value
      let parts = line.split(/: */);
      let types = parts[0].split('$');
      type = camelCase(types[0]);
      if (typeAlias[type]) type = typeAlias[type];
      subtype = types.length > 1 ? camelCase(types[1]) : '';
      value = parts[1];
    } else {
      value = line;
    }
    appendValue(result, type, subtype, value);
  }

  parseArray(result);

  return result;
}

const typeAlias = {
  ch: 'chemistry',
  ac: 'acquisition',
  ms: 'mass',
  pk: 'peak'
};

const subTypes = {
  link: 1,
  massSpectrometry: 1,
  chromatography: 1,
  focusedIon: 1,
  dataProessing: 1,

};


function parseArray(result) {
  if (result.peak && result.peak.annotation) {
    result.peak.annotation = Papa.parse(result.peak.annotation.replace(/\n +/g, '\n'), {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      delimiter: ' ',
    }).data;
  }

  if (result.peak && result.peak.peak) {
    result.peak.peak = Papa.parse(result.peak.peak.replace(/\n +/g, '\n'), {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      delimiter: ' ',
    }).data;
  }
}

function appendValue(result, type, subtype, value) {
  if (subtype) {
    if (!result[type]) result[type] = {};
    if (subTypes[subtype]) {
      if (!result[type][subtype]) result[type][subtype] = {};
      let parts = value.split(' ');

      let subsubtype = camelCase(parts.slice(0, subTypes[subtype]).join(' '));
      if (!result[type][subtype][subsubtype]) result[type][subtype][subsubtype] = '';
      result[type][subtype][subsubtype] += parts.slice(subTypes[subtype]).join(' ');
    } else {
      if (!result[type][subtype]) {
        result[type][subtype] = '';
      } else {
        result[type][subtype] += '\n';
      }
      result[type][subtype] += value;
    }
  } else {
    if (result[type]) {
      result[type] += '\n';
    } else {
      result[type] = '';
    }
    result[type] += value;
  }
}
