import AnyPlacedTiles from '../../../utils/validateMove/AnyPlacedTiles';

describe('AnyPlacedTiles isSatidifed', () => {
  describe('when empty', () => {
    it('returns false and has error message', () => {
      const rule = new AnyPlacedTiles();

      const actual = rule.isSatisfied({placedTilesIndices: []});

      expect(actual).toEqual(false);
      expect(rule).toBeDefined();
    });
  });

  describe('when there are placed tiles', () => {
    it('returns true and error message is undefined', () => {
      const rule = new AnyPlacedTiles();

      const actual = rule.isSatisfied({placedTilesIndices: [{}]});

      expect(actual).toEqual(true);
      expect(rule.errorMessage).toBeNull();
    });
  });
});