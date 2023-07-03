// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 1, action: Action.Add, expected: 2 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 0, b: 4, action: Action.Add, expected: 4 },
  { a: 5, b: 0, action: Action.Add, expected: 5 },

  { a: 1, b: 1, action: Action.Subtract, expected: 0 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 0, b: 4, action: Action.Subtract, expected: -4 },
  { a: 5, b: 0, action: Action.Subtract, expected: 5 },

  { a: 1, b: 1, action: Action.Multiply, expected: 1 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 0, b: 4, action: Action.Multiply, expected: 0 },
  { a: 5, b: 0, action: Action.Multiply, expected: 0 },

  { a: 1, b: 1, action: Action.Divide, expected: 1 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 0, b: 4, action: Action.Divide, expected: 0 },
  { a: 5, b: 0, action: Action.Divide, expected: Infinity },

  { a: 1, b: 1, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 0, b: 4, action: Action.Exponentiate, expected: 0 },
  { a: 5, b: 0, action: Action.Exponentiate, expected: 1 },

  { a: 'blah', b: 1, action: Action.Exponentiate, expected: null },
  { a: 2, b: 'blah', action: Action.Exponentiate, expected: null },
  { a: 0, b: 4, action: 'blah', expected: null },
  { a: 'blah', b: 'blah', action: 'blah', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'calculate $a $action $b should return $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
