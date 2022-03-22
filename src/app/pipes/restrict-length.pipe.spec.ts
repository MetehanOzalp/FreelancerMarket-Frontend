import { RestrictLengthPipe } from './restrict-length.pipe';

describe('RestrictLengthPipe', () => {
  it('create an instance', () => {
    const pipe = new RestrictLengthPipe();
    expect(pipe).toBeTruthy();
  });
});
