import { YesNoPipe } from './yes-no.pipe';

describe('YesNoPipe', () => {
  const pipe = new YesNoPipe();

  it('is instantiable', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms a representative value', () => {
    expect(pipe.transform(true as never)).toBeDefined();
  });
});
