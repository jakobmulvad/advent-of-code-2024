const input = await Deno.readTextFile("10_input.txt");

const rows = input.split("\n");
const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];

const isTrail = (height: number, row: number, column: number) => {
  if (row < 0 || row >= rows.length || column < 0 || column >= rows[row].length) {
    return false;
  }
  return parseInt(rows[row][column]) - height === 1;
};

const reachableFrom = (row: number, column: number, alreadyVisited: Set<string>): Set<string> => {
  const key = `${row},${column}`;
  if (alreadyVisited.has(key)) {
    return alreadyVisited;
  }
  alreadyVisited.add(key);

  const height = parseInt(rows[row][column]);
  for (const [dr, dc] of directions) {
    const r = row + dr;
    const c = column + dc;

    if (isTrail(height, r, c)) {
      reachableFrom(r, c, alreadyVisited);
    }
  }
  return alreadyVisited;
};

const peaks = new Set<string>();

for (let row = 0; row < rows.length; row++) {
  for (let column = 0; column < rows[row].length; column++) {
    if (rows[row][column] === "9") {
      peaks.add(`${row},${column}`);
    }
  }
}

let score = 0;
for (let row = 0; row < rows.length; row++) {
  for (let column = 0; column < rows[row].length; column++) {
    if (rows[row][column] === "0") {
      const reachable = reachableFrom(row, column, new Set());
      score += peaks.intersection(reachable).size;
    }
  }
}

console.log(score);
