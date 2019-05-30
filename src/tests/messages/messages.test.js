import messages from '../../messages';

describe('messages', () => {
  it('has English', () => {
    const actual = 'en' in messages;

    expect(actual).toEqual(true);
  });
  it('has Ukraininan', () => {
    const actual = 'uk' in messages;

    expect(actual).toEqual(true);
  });
  it('English and Ukraininan have the same keys', () => {
    const en = Object.keys(messages['en']);
    const uk = Object.keys(messages['uk']);

    expect(en).toEqual(uk);
  });
});