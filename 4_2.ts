const input = await Deno.readTextFile("4_input.txt");

const rows = input.split("\n").filter(Boolean);
const numColumns = rows[0].length;
const mas = "MAS";

const matchDirection = (
  row: number,
  column: number,
  dx: number,
  dy: number,
) => {
  const charAt = (row: number, column: number): string | undefined => {
    if (row < 0 || row >= rows.length || column < 0 || column >= numColumns) {
      return undefined;
    }
    return rows[row][column];
  };

  for (let i = 0; i < mas.length; i++) {
    if (charAt(row + i * dy, column + i * dx) !== mas[i]) {
      return false;
    }
  }

  return true;
};

const xmasAt = (row: number, column: number): boolean => {
  const fromTopLeft = matchDirection(row, column, 1, 1) || matchDirection(row + 2, column + 2, -1, -1);
  const fromBottomLeft = matchDirection(row + 2, column, 1, -1) || matchDirection(row, column + 2, -1, 1);
  return fromTopLeft && fromBottomLeft;
};

let matches = 0;

for (let row = 0; row < rows.length; row++) {
  for (let column = 0; column < numColumns; column++) {
    if (xmasAt(row, column)) {
      matches++;
    }
  }
}

console.log(matches);
