const input = await Deno.readTextFile("13_input.txt");

const rows = input.split("\n");

let row = 0;
const machines = [];
const parseLine = (line: string, delimiter: string): number[] =>
  line.split(":")[1].split(",").map((x) => x.split(delimiter)[1]).map(Number);
while (row < rows.length) {
  machines.push({
    a: parseLine(rows[row++], "+"),
    b: parseLine(rows[row++], "+"),
    prize: parseLine(rows[row++], "="),
  });
  row++;
}

let sum = 0;
for (const machine of machines) {
  console.log(machine);
  let best: { a: number; b: number; tokens: number } | undefined;
  for (let a = 0; a < 101; a++) {
    for (let b = 0; b < 101; b++) {
      const x = machine.a[0] * a + machine.b[0] * b;
      const y = machine.a[1] * a + machine.b[1] * b;
      if (x === machine.prize[0] && y === machine.prize[1]) {
        const tokens = 3 * a + b;
        if (!best || tokens < best.tokens) {
          best = { a, b, tokens };
        }
      }
    }
  }
  sum += best?.tokens ?? 0;
}

console.log(sum);
