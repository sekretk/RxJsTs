import { TestScheduler } from 'rxjs/testing';

function sum(a: number, b: number) {
    return a + b;
  }

it('timertest TestScheduler', () => {
    expect(sum(1, 2)).toBe(3);
})