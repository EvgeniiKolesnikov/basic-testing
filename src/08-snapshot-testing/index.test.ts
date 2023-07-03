// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const list = generateLinkedList([1]);
    const expected = { value: 1, next: { value: null, next: null } };
    expect(list).toStrictEqual(expected);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const list = generateLinkedList([2]);
    const expected = { value: 2, next: { value: null, next: null } };
    expect(list).toMatchSnapshot(expected);
  });
});
