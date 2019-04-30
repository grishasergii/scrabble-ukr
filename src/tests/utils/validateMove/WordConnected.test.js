import WordConnected from '../../../utils/validateMove/WordConnected';

describe('WordConnected.isSatisfied', () => {
  describe('when single letter is placed', () => {
    describe('when no already played tiles', () => {
      it('returns true and errorMessage is null', () => {
        const rule = new WordConnected();
        const tiles = [
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: {}}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        ];
        const boardSize = 5;
        const placedTilesIndices = [7];

        const actual = rule.isSatisfied({placedTilesIndices: placedTilesIndices, tiles: tiles, boardSize: boardSize});

        expect(actual).toEqual(true);
        expect(rule.errorMessage).toBeNull();
      });
    });
    describe('when is connected below', () => {
      it('returns true and errorMessage is null', () => {
        const rule = new WordConnected();
        const tiles = [
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: {}}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: {alreadyPlayed: true}}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        ];
        const boardSize = 5;
        const placedTilesIndices = [7];

        const actual = rule.isSatisfied({placedTilesIndices: placedTilesIndices, tiles: tiles, boardSize: boardSize});

        expect(actual).toEqual(true);
        expect(rule.errorMessage).toBeNull();
      });
    });
    describe('when is connected above', () => {
      it('returns true and errorMessage is null', () => {
        const rule = new WordConnected();
        const tiles = [
          {letter: null}, {letter: null}, {letter: {alreadyPlayed: true}}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: {}}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        ];
        const boardSize = 5;
        const placedTilesIndices = [7];

        const actual = rule.isSatisfied({placedTilesIndices: placedTilesIndices, tiles: tiles, boardSize: boardSize});

        expect(actual).toEqual(true);
        expect(rule.errorMessage).toBeNull();
      });
    });
    describe('when is connected from the left', () => {
      it('returns true and errorMessage is null', () => {
        const rule = new WordConnected();
        const tiles = [
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          {letter: null}, {letter: {alreadyPlayed: true}}, {letter: {}}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        ];
        const boardSize = 5;
        const placedTilesIndices = [7];

        const actual = rule.isSatisfied({placedTilesIndices: placedTilesIndices, tiles: tiles, boardSize: boardSize});

        expect(actual).toEqual(true);
        expect(rule.errorMessage).toBeNull();
      });
    });
    describe('when is connected from the right', () => {
      it('returns true and errorMessage is null', () => {
        const rule = new WordConnected();
        const tiles = [
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: {}}, {letter: {alreadyPlayed: true}}, {letter: null},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        ];
        const boardSize = 5;
        const placedTilesIndices = [7];

        const actual = rule.isSatisfied({placedTilesIndices: placedTilesIndices, tiles: tiles, boardSize: boardSize});

        expect(actual).toEqual(true);
        expect(rule.errorMessage).toBeNull();
      });
    });

    describe('when not connected', () => {
      it('returns false and errorMessage is not null', () => {
        const rule = new WordConnected();
        const tiles = [
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: {}}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: {alreadyPlayed: true}}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        ];
        const boardSize = 5;
        const placedTilesIndices = [6, 7, 9];

        const actual = rule.isSatisfied({placedTilesIndices: placedTilesIndices, tiles: tiles, boardSize: boardSize});

        expect(actual).toEqual(false);
        expect(rule.errorMessage !== null).toEqual(true);
      });
    });
  });
  describe('when multiple letters are placed', () => {
    describe('when cross the existing ones', () => {
      it('returns true and errorMessage is null', () => {
        const rule = new WordConnected();
        const tiles = [
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          {letter: null}, {letter: {}}, {letter: {}}, {letter: {alreadyPlayed: true}}, {letter: {}},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        ];
        const boardSize = 5;
        const placedTilesIndices = [6, 7, 9];

        const actual = rule.isSatisfied({placedTilesIndices: placedTilesIndices, tiles: tiles, boardSize: boardSize});

        expect(actual).toEqual(true);
        expect(rule.errorMessage).toBeNull();
      });
    });

    describe('when not connected', () => {
      it('returns false and errorMessage is not null', () => {
        const rule = new WordConnected();
        const tiles = [
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          {letter: null}, {letter: {}}, {letter: {}}, {letter: null}, {letter: {}},
          {letter: {alreadyPlayed: true}}, {letter: null}, {letter: null}, {letter: {alreadyPlayed: true}}, {letter: null},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
          {letter: null}, {letter: null}, {letter: null}, {letter: null}, {letter: null},
        ];
        const boardSize = 5;
        const placedTilesIndices = [6, 7, 9];

        const actual = rule.isSatisfied({placedTilesIndices: placedTilesIndices, tiles: tiles, boardSize: boardSize});

        expect(actual).toEqual(false);
        expect(rule.errorMessage !== null).toEqual(true);
      });
    });
  });
});