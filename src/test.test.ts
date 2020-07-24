test('adds 1 + 2 to equal 3', () => {

  const arr = [
    {i: 1, v: '1'},
    {i: 2, v: '2'},
    {i: 3, v: '3'},
  ]

    expect(arr).toEqual(
      expect.arrayContaining([
        expect.objectContaining({i:1}),
      ]) &&
      expect.not.arrayContaining([
        expect.objectContaining({i:4}),
      ])
    )
  });