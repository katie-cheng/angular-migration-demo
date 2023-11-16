import { TransactionStatusPipe } from './transaction-status.pipe';

describe('TransactionStatusPipe', () => {
  const pipe = new TransactionStatusPipe();

  it('is instantiable', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms a representative value', () => {
    expect(pipe.transform('12345678' as never)).toBeDefined();
  });
});
