import test from 'ava';
import parse from 'csv-parse';
import transform from 'stream-transform';
import { parseCSVFile } from '../lib/csv-transform';
const { readFile } = require('fs').promises;

test('parses csv file and writes the transformed data to disk', async t => {
    await parseCSVFile('./tests/test.csv', {UUID: "col1", Make: "col3", Year: "col2"});
    const result = (await readFile('./tests/test.csv.out')).toString();
    const expected = `foo\t\tbin\t\t\tbar\t\t\t\t
a\t\tc\t\t\tb\t\t\t\t
some\t\tvalues\t\t\t\t\t\t\t
`;
    t.is(result, expected);
});

test('parse missing csv file', async t => {
    await t.throwsAsync(async () => await parseCSVFile('./non-existent.csv'));
});
