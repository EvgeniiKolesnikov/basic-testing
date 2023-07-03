// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const log = jest.spyOn(console, 'log').mockImplementation();

    mockOne();
    expect(mockOne).toHaveBeenCalled();
    expect(log).not.toHaveBeenCalledWith('foo');

    mockTwo();
    expect(mockTwo).toHaveBeenCalled();
    expect(log).not.toHaveBeenCalledWith('bar');

    mockThree();
    expect(mockThree).toHaveBeenCalled();
    expect(log).not.toHaveBeenCalledWith('baz');
  });

  test('unmockedFunction should log into console', () => {
    const log = jest.spyOn(console, 'log').mockImplementation();
    unmockedFunction();
    expect(log).toHaveBeenCalledWith('I am not mocked');
  });
});
