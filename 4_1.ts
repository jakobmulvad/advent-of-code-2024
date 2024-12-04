const input = await Deno.readTextFile("4_input.txt");

const rows = input.split("\n").filter(Boolean);
const numColumns = rows[0].length;
const xmas = "XMAS";
const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

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

  for (let i = 0; i < xmas.length; i++) {
    if (charAt(row + i * dy, column + i * dx) !== xmas[i]) {
      return false;
    }
  }

  return true;
};

let matches = 0;

for (let row = 0; row < rows.length; row++) {
  for (let column = 0; column < numColumns; column++) {
    for (const [dx, dy] of directions) {
      if (matchDirection(row, column, dx, dy)) {
        matches++;
      }
    }
  }
}

console.log(matches);
