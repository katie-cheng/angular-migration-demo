import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  const pipe = new TruncatePipe();

  it('is instantiable', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms a representative value', () => {
    expect(pipe.transform('12345678' as never)).toBeDefined();
  });
});
