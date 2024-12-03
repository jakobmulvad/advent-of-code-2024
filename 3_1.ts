const input = await Deno.readTextFile("3_input.txt");

const muls = input.match(/(mul\(\d{1,3},\d{1,3}\))/g);

const sum = muls!.reduce((acc, curr) => {
  const [a, b] = curr.slice(4, -1).split(",").map(Number);
  return acc += a * b;
}, 0);

console.log(sum);
