let input = await Deno.readTextFile("3_input.txt");

let ignored: RegExpExecArray | null = null;

// remove everything between a don't and a do
while (ignored = /(don't\(\)[^]*?do\(\))/gu.exec(input)) {
  input = input.slice(0, ignored.index) +
    input.slice(ignored.index + ignored[0].length);
}

const muls = input.match(/(mul\(\d{1,3},\d{1,3}\))/g);

const sum = muls!.reduce((acc, curr) => {
  const [a, b] = curr.slice(4, -1).split(",").map(Number);
  return acc += a * b;
}, 0);

console.log(sum);
