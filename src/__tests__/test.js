import parse from '..';

import fs from 'fs';

let data = fs.readFileSync(`${__dirname}/data.txt`, 'utf8');
describe('test massbank-parser', () => {
  it('should return the same json', () => {
    expect(parse(data)).toMatchSnapshot();
  });
});
