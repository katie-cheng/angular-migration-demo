import { IbanPipe } from './iban.pipe';

describe('IbanPipe', () => {
  const pipe = new IbanPipe();

  it('is instantiable', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms a representative value', () => {
    expect(pipe.transform('12345678' as never)).toBeDefined();
  });
});
