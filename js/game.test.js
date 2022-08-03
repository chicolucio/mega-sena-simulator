import { Game } from "./game";

function range(start, end, step = 1) {
  const len = Math.floor((end - start) / step) + 1;
  return Array(len)
    .fill()
    .map((_, idx) => start + idx * step);
}

test("Add and remove single number", () => {
  let example = new Game();
  expect(example.maxNumbers).toBe(6);
  example.addNumber(1);
  expect(example.values).toStrictEqual([1]);
  example.addNumber(2);
  expect(example.values).toStrictEqual([1, 2]);
  example.removeNumber(1);
  expect(example.values).toStrictEqual([2]);
});

test("Verify it is sorted", () => {
  let example = new Game();
  expect(example.values).toStrictEqual([]);
  for (let number of range(3, 1, -1)) {
    example.addNumber(number);
  }
  expect(example.values).toStrictEqual([1, 2, 3]);
});

test("Don't add if full", () => {
  let example = new Game();
  for (let number of range(1, 6)) {
    example.addNumber(number);
  }
  expect(example.values).toStrictEqual([1, 2, 3, 4, 5, 6]);
  expect(() => {
    example.addNumber(7);
  }).toThrow();
  expect(example.values).toStrictEqual([1, 2, 3, 4, 5, 6]);
  // expect()
});

test("Don't add if already in game", () => {
  let example = new Game();
  example.addNumber(1);
  expect(() => {
    example.addNumber(1);
  }).toThrow();
  expect(example.values).toStrictEqual([1]);
});

test("Don't remove if not in game", () => {
  let example = new Game();
  example.addNumber(1);
  example.removeNumber(1);
  expect(example.values).toStrictEqual([]);
  expect(() => {
    example.removeNumber(1);
  }).toThrow();
  expect(example.values).toStrictEqual([]);
});
