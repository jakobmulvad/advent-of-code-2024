const input = await Deno.readTextFile("12_input.txt");

const rows = input.split("\n");
const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];

const charAt = (row: number, column: number): string | undefined => {
  if (row < 0 || row >= rows.length || column < 0 || column >= rows[0].length) {
    return undefined;
  }
  return rows[row][column];
};

const visited = new Set<string>();

const getPlotAt = (row: number, column: number, plant: string): { perimiter: number; area: number } => {
  if (charAt(row, column) !== plant) {
    return { perimiter: 1, area: 0 };
  }

  const key = `${row},${column}`;
  if (visited.has(key)) {
    return { perimiter: 0, area: 0 };
  }

  visited.add(key);

  let perimiter = 0;
  let area = 1;

  for (const [dr, dc] of directions) {
    const r = row + dr;
    const c = column + dc;

    const { perimiter: p, area: a } = getPlotAt(r, c, plant);
    perimiter += p;
    area += a;
  }

  return { perimiter, area };
};

let sum = 0;
for (let row = 0; row < rows.length; row++) {
  for (let column = 0; column < rows[row].length; column++) {
    const cellKey = `${row},${column}`;
    if (visited.has(cellKey)) {
      continue;
    }
    const plot = getPlotAt(row, column, charAt(row, column)!);
    sum += plot.area * plot.perimiter;
  }
}

console.log(sum);
