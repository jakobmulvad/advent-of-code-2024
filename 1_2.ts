const rows = (await Deno.readTextFile("1_input.txt"))
  .split("\n")
  .filter(Boolean)
  .map((row) => row.split("   "));

const left = rows.map((row) => Number(row[0]));
const right = rows.map((row) => Number(row[1]));

const similarity = left.map((value, i) => {
  const occurences = right.filter((x) => x === value).length;
  return occurences * value;
});

const summed = similarity.reduce((acc, curr) => acc += curr, 0);

console.log(summed);
