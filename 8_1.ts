const input = await Deno.readTextFile("8_input.txt");

const rows = input.split("\n");

const findOccurances = (search: string): [number, number][] => {
  const result: [number, number][] = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    for (let j = 0; j < row.length; j++) {
      if (row[j] === search) {
        result.push([i, j]);
      }
    }
  }
  return result;
};

let antinodes: [number, number][] = [];

for (let i = 0; i < rows.length; i++) {
  const row = rows[i];
  for (let j = 0; j < row.length; j++) {
    if (row[j] !== ".") {
      for (const [r, c] of findOccurances(row[j])) {
        if (i !== r && j !== c) {
          antinodes.push([i + (i - r), j + (j - c)]);
        }
      }
    }
  }
}

antinodes = antinodes
  .filter(([r, c]) => r >= 0 && c >= 0 && r < rows.length && c < rows[0].length)
  .filter(([r, c], i, arr) => arr.findIndex(([r2, c2]) => r === r2 && c === c2) === i);

console.log(antinodes);
console.log(antinodes.length);
