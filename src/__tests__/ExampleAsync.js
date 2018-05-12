async function fetchData(){
    return await "peanut butter";
}

test('the data is peanut butter', () => {
    expect.assertions(1);
    return fetchData().then(data => {
        expect(data).toBe('peanut butter');
    });
});