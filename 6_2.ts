const input = await Deno.readTextFile("6_input.txt");
const rows = input.split("\n").map((row) => row.replaceAll(".", "0"));

const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
let guardDirection = 0;
let guardRow = -1;
let guardColumn = -1;

for (let row = 0; row < rows.length; row++) {
  guardColumn = rows[row].indexOf("^");

  if (guardColumn !== -1) {
    guardRow = row;
    break;
  }
}

const charAt = (row: number, column: number): string | undefined => {
  if (row < 0 || row >= rows.length || column < 0 || column >= rows[0].length) {
    return undefined;
  }
  return rows[row][column];
};

type Visit = [number, number, number];

const hasLoopInDirection = (row: number, column: number, direction: number, visits: Visit[]): boolean => {
  let [dr, dc] = directions[direction];

  const loopVisits = visits.slice();

  let nextChar;
  while (nextChar = charAt(row + dr, column + dc)) {
    if (nextChar === "#") {
      direction = (direction + 1) % 4;
      [dr, dc] = directions[direction];
      continue;
    }

    row += dr;
    column += dc;

    if (loopVisits.some(([r, c, d]) => r === row && c === column && d === direction)) {
      // we have already been here moving the same direction
      return true;
    }

    loopVisits.push([row, column, direction]);
  }
  return false;
};

let loops = 0;

const visits: Visit[] = [];
const step = () => {
  visits.push([guardRow, guardColumn, guardDirection]);
  const [dr, dc] = directions[guardDirection];
  const nextChar = charAt(guardRow + dr, guardColumn + dc);

  if (!nextChar) {
    return false;
  }

  if (nextChar === "#") {
    guardDirection = (guardDirection + 1) % 4;
    return true;
  }

  if (hasLoopInDirection(guardRow, guardColumn, (guardDirection + 1) % 4, visits)) {
    loops++;
  }

  guardRow += dr;
  guardColumn += dc;

  return true;
};

while (step()) {
}

console.log(rows.join("\n"), loops);
