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
    prize: parseLine(rows[row++], "=").map((x) => x + 10_000_000_000_000),
  });
  row++;
}

// We will solve using linear algebra and vector decomposition - so need some helper functions
const dot = (a: number[], b: number[]) => a[0] * b[0] + a[1] * b[1];
const add = (a: number[], b: number[]) => [a[0] + b[0], a[1] + b[1]];
const scale = (a: number[], b: number) => [a[0] * b, a[1] * b];
const scale2x2 = (m22: number[][], n: number) => [
  [m22[0][0] * n, m22[0][1] * n],
  [m22[1][0] * n, m22[1][1] * n],
];
const inverse2x2 = (m22: number[][]) =>
  scale2x2([[m22[1][1], -m22[1][0]], [-m22[0][1], m22[0][0]]], 1 / ((m22[0][0] * m22[1][1]) - (m22[1][0] * m22[0][1])));

const mul2x2 = (m22: number[][], v2: number[]) => [dot(m22[0], v2), dot(m22[1], v2)];

let tokens = 0;
for (const machine of machines) {
  const { a, b, prize } = machine;

  // Idea: how can the prize vector be decomposed into button a and button b vectors?
  // We use that m[a,b] * λ = prize, and solve for λ by inverting the matrix [a,b]
  const inverseAB = inverse2x2([a, b]);
  const decomp = mul2x2(inverseAB, prize).map(Math.round); // we have to round because of floating point errors
  const result = add(scale(a, decomp[0]), scale(b, decomp[1]));

  if (result[0] === prize[0] && result[1] === prize[1]) {
    // We hit the prize exactly
    tokens += 3 * decomp[0] + decomp[1];
  }
}

console.log(tokens);
