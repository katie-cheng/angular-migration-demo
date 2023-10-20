import { MaskedAccountPipe } from './masked-account.pipe';

describe('MaskedAccountPipe', () => {
  const pipe = new MaskedAccountPipe();

  it('is instantiable', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms a representative value', () => {
    expect(pipe.transform('12345678' as never)).toBeDefined();
  });
});
