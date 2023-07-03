// Uncomment the code below and write your tests
import path from 'path';
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    const timeout = 500;

    doStuffByTimeout(callback, timeout);

    expect(setTimeout).toBeCalled();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), timeout);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    const timeout = 500;

    doStuffByTimeout(callback, timeout);
    expect(callback).not.toBeCalled();

    jest.runAllTimers();
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    const interval = 500;

    doStuffByInterval(callback, interval);

    jest.runOnlyPendingTimers();
    expect(setInterval).toBeCalled();
    expect(setInterval).toHaveBeenLastCalledWith(
      expect.any(Function),
      interval,
    );
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    const interval = 500;

    doStuffByInterval(callback, interval);

    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledTimes(1);

    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const join = jest.spyOn(path, 'join');
    const pathToFile = '/pathToFile.txt';

    await readFileAsynchronously(pathToFile);
    expect(join).toBeCalledTimes(1);
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = '/nofile.txt';
    const file = await readFileAsynchronously(pathToFile);
    expect(file).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = '/file.txt';
    const fileContent = 'content';

    const file = await readFileAsynchronously(pathToFile);
    expect(file).toBe(fileContent);
  });
});
