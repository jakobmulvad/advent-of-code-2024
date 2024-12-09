const input = await Deno.readTextFile("7_input.txt");

const rows = input.split("\n").map((row) => {
  const [result, rest] = row.split(":");
  return {
    result: parseInt(result),
    numbers: rest.trim().split(" ").map((n) => parseInt(n)),
  };
});

const canNumbersResultIn = (numbers: number[], result: number, acc: number): boolean => {
  if (numbers.length === 1) {
    return numbers[0] + acc === result || numbers[0] * acc === result;
  }

  return canNumbersResultIn(numbers.slice(1), result, acc * numbers[0]) ||
    canNumbersResultIn(numbers.slice(1), result, acc + numbers[0]);
};

const couldBeTrue = rows
  .filter(({ result, numbers }) => canNumbersResultIn(numbers, result, 0))
  .reduce((acc, { result }) => acc + result, 0);

console.log(couldBeTrue);
