import fs from 'fs'
import Parser from '../Parser'

test('parses categories fine', () => {
    const mockComponent = {
        setState: jest.fn()
    };
    Parser.getInput = function () {
        return fs.readFileSync('./src/example.csv', {encoding: 'utf8'});
    }
    Parser.mapData(mockComponent);
    let parsed = mockComponent.setState.mock.calls[0][0].data;

    expect(parsed.headers).toMatchObject(["ID", "SKU", "Short description", "Description", "Categories", "Images"]);
    expect(parsed.data[0].Categories).toEqual([["Performance Parts"], ["Ford PowerStroke Performance", "1994 - 2003 7.3 Power Stroke"], ["Ford PowerStroke Performance"]]);
});