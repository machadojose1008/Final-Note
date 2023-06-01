import debounce, { removeHTMLTags, findNotebookPosition, findDeckPosition, findCardPosition } from '../helpers';

describe('removeHtmlTags', () => {
    test('remove tags HTML de uma string', () => {
        const input = '<p>Hello <strong>world</strong>!</p>';
        const expected = 'Hello world!';
        const result = removeHTMLTags(input);
        expect(result).toEqual(expected);
    });

    test('Retorna um string vazia se o input for vazio', () => {
        const input = '';
        const expected = '';
        const result = removeHTMLTags(input);
        expect(result).toEqual(expected);
    });
});

describe('FindNotebookPosition', () => {
    test('Encontra a posição do notebook em um array de notebooks', async () => {
        const notebooks = [{ id: 1 }, { id: 2 }, { id: 3 }];
        const id = 2;
        const expected = 1;
        const result = await findNotebookPosition(notebooks, id);
        expect(result).toEqual(expected);
    });

    test('Retorna -1 se o notebook não for encontrado', async () => {
        const notebooks = [{ id: 1 }, { id: 2 }, { id: 3 }];
        const id = 4;
        const expected = -1;
        const result = await findNotebookPosition(notebooks, id);
        expect(result).toEqual(expected);
    });
});

describe('FindDeckPosition', () => {
    test('Encontra a posição do deck no array de decks', async () => {
        const decks = [{ id: 1 }, { id: 2 }, { id: 3 }];
        const id = 2;
        const expected = 1;
        const result = await findDeckPosition(decks, id);
        expect(result).toEqual(expected);
    });

    test('Retorna -1 se o deck não for encontrado', async () => {
        const decks = [{ id: 1 }, { id: 2 }, { id: 3 }];
        const id = 4;
        const expected = -1;
        const result = await findDeckPosition(decks, id);
        expect(result).toEqual(expected);
    });


});


describe('findCardPosition', () => {
    test('Encontra a posição do card no array de cards', async () => {
      const cards = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const id = 2;
      const expected = 1;
      const result = await findCardPosition(cards, id);
      expect(result).toEqual(expected);
    });
  
    test('Retorna -1 se o deck não for encontrado', async () => {
      const cards = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const id = 4;
      const expected = -1;
      const result = await findCardPosition(cards, id);
      expect(result).toEqual(expected);
    });
  });

jest.useFakeTimers();

describe('Debounce', () => {

    test('execute a função definida somente após o atraso definido', () => {
        const originalFunction = jest.fn();
        const debouncedFuntion = debounce(originalFunction, 200);

        debouncedFuntion();
        expect(originalFunction).not.toBeCalled();

        // avança 199ms no tempo
        jest.advanceTimersByTime(199);
        expect(originalFunction).not.toBeCalled();

        // Avança mais 1 ms no tempo, totalizando 200ms
        jest.advanceTimersByTime(1);
        expect(originalFunction).toBeCalled();
        expect(originalFunction).toHaveBeenCalledTimes(1);
    });

    test('Não execute a função definida se ela for chamada novamente dentro do tempo de espera', () => {
        const originalFunction = jest.fn();
        const debouncedFuntion = debounce(originalFunction, 200);

        debouncedFuntion();
        expect(originalFunction).not.toBeCalled();

        // Avança 100ms no tempo 
        jest.advanceTimersByTime(100);
        debouncedFuntion();
        expect(originalFunction).not.toBeCalled();

        // Avança mais 100ms, totalizando 200ms
        jest.advanceTimersByTime(100);
        expect(originalFunction).not.toBeCalled();

        // Avança mais 100ms, totalizando 300ms
        jest.advanceTimersByTime(100);
        expect(originalFunction).toBeCalled();
        expect(originalFunction).toBeCalledTimes(1);
    });

});

