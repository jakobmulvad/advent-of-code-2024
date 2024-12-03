const rows = (await Deno.readTextFile("2_input.txt"))
  .split("\n")
  .map((row) => row.split(" ").map(Number));

const compEvery = (
  arr: number[],
  predicate: (left: number, right: number) => boolean,
) => {
  for (let i = 1; i < arr.length; i++) {
    if (!predicate(arr[i - 1], arr[i])) {
      return false;
    }
  }
  return true;
};

const isSafe = (row: number[]) => {
  const diff = (left: number, right: number) => {
    const diff = Math.abs(left - right);
    return diff > 0 && diff < 4;
  };

  if (compEvery(row, (left, right) => left < right && diff(left, right))) {
    return true; // all increasing
  }

  if (compEvery(row, (left, right) => left > right && diff(left, right))) {
    return true; // all decreasing
  }

  return false;
};

const safeRows = rows.filter(isSafe);

console.log(safeRows.length);
