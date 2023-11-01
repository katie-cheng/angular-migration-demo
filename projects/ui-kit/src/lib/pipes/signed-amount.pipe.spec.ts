import { SignedAmountPipe } from './signed-amount.pipe';

describe('SignedAmountPipe', () => {
  const pipe = new SignedAmountPipe();

  it('is instantiable', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms a representative value', () => {
    expect(pipe.transform(12.5 as never)).toBeDefined();
  });
});
