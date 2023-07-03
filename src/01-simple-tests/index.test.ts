// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 1, action: Action.Add })).toBe(2);
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Add })).toBe(4);
    expect(simpleCalculator({ a: 0, b: 4, action: Action.Add })).toBe(4);
    expect(simpleCalculator({ a: 5, b: 0, action: Action.Add })).toBe(5);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 1, action: Action.Subtract })).toBe(0);
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Subtract })).toBe(0);
    expect(simpleCalculator({ a: 0, b: 4, action: Action.Subtract })).toBe(-4);
    expect(simpleCalculator({ a: 5, b: 0, action: Action.Subtract })).toBe(5);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 1, action: Action.Multiply })).toBe(1);
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Multiply })).toBe(4);
    expect(simpleCalculator({ a: 0, b: 4, action: Action.Multiply })).toBe(0);
    expect(simpleCalculator({ a: 5, b: 0, action: Action.Multiply })).toBe(0);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 1, action: Action.Divide })).toBe(1);
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Divide })).toBe(1);
    expect(simpleCalculator({ a: 0, b: 4, action: Action.Divide })).toBe(0);
    expect(simpleCalculator({ a: 5, b: 0, action: Action.Divide })).toBe(
      Infinity,
    );
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 1, action: Action.Exponentiate })).toBe(
      1,
    );
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Exponentiate })).toBe(
      4,
    );
    expect(simpleCalculator({ a: 0, b: 4, action: Action.Exponentiate })).toBe(
      0,
    );
    expect(simpleCalculator({ a: 5, b: 0, action: Action.Exponentiate })).toBe(
      1,
    );
  });

  test('should return null for invalid action', () => {
    const unknownAction: unknown = 'unknownAction';
    expect(simpleCalculator({ a: 1, b: 1, action: unknownAction })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const unknownA: unknown = 'unknownA';
    const unknownB: unknown = 'unknownB';
    expect(
      simpleCalculator({ a: unknownA, b: 1, action: Action.Add }),
    ).toBeNull();
    expect(
      simpleCalculator({ a: 2, b: unknownB, action: Action.Divide }),
    ).toBeNull();
  });
});
