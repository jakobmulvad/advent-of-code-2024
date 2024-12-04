const rows = (await Deno.readTextFile("1_input.txt"))
  .split("\n")
  .filter(Boolean)
  .map((row) => row.split("   "));

const left = rows.map((row) => Number(row[0]));
const right = rows.map((row) => Number(row[1]));

left.sort();
right.sort();

const diff = left.map((_, i) => Math.abs(left[i] - right[i]));
const summed = diff.reduce((acc, curr) => acc + curr, 0);

console.log(summed);
