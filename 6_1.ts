const input = await Deno.readTextFile("6_input.txt");
const rows = input.split("\n");

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

let visits = 0;
const step = () => {
  if (charAt(guardRow, guardColumn) !== "X") {
    rows[guardRow] = rows[guardRow].slice(0, guardColumn) + "X" + rows[guardRow].slice(guardColumn + 1);
    visits++;
  }

  const [dr, dc] = directions[guardDirection];
  const nextChar = charAt(guardRow + dr, guardColumn + dc);

  if (!nextChar) {
    return false;
  }

  if (nextChar === "#") {
    guardDirection = (guardDirection + 1) % 4;
    return true;
  }

  guardRow += dr;
  guardColumn += dc;

  return true;
};

while (step()) {}

console.log(rows.join("\n"), visits);
