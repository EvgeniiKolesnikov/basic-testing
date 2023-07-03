// Uncomment the code below and write your tests
import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';
import _ from 'lodash';

const initialBalance = 777;
const moveBalance = 1000;
const depositBalance = 111;
const withdrawBalance = 50;
const transferBalance = 50;

const bank = getBankAccount(initialBalance);
const anotherBank = new BankAccount(555);

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(bank.getBalance()).toEqual(777);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bank.withdraw(moveBalance)).toThrow(
      new InsufficientFundsError(initialBalance),
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => bank.transfer(moveBalance, anotherBank)).toThrow(
      new InsufficientFundsError(initialBalance),
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bank.transfer(moveBalance, bank)).toThrow(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    const initBalance = bank.getBalance();
    expect(bank.deposit(depositBalance).getBalance()).toBe(
      initBalance + depositBalance,
    );
  });

  test('should withdraw money', () => {
    const initBalance = bank.getBalance();
    expect(bank.withdraw(withdrawBalance).getBalance()).toEqual(
      initBalance - withdrawBalance,
    );
  });

  test('should transfer money', () => {
    const initBalance = bank.getBalance();
    const initBalanceAnotherBank = anotherBank.getBalance();
    bank.transfer(transferBalance, anotherBank);

    expect(bank.getBalance()).toEqual(initBalance - transferBalance);
    expect(anotherBank.getBalance()).toEqual(
      initBalanceAnotherBank + transferBalance,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(_, 'random').mockReturnValue(1);
    const fetchBalance = await bank.fetchBalance();
    expect(fetchBalance).toEqual(expect.any(Number));
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(_, 'random').mockReturnValue(1);
    await bank.synchronizeBalance();
    expect(bank.getBalance()).toEqual(expect.any(Number));
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(_, 'random').mockReturnValue(0);
    await expect(bank.synchronizeBalance()).rejects.toThrow(
      new SynchronizationFailedError(),
    );
  });
});
