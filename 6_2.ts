const input = await Deno.readTextFile("6_input.txt");
const rows = input.split("\n");

const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
let guardStartRow = -1;
let guardStartColumn = -1;

// 774,1609,1616,1657,1653,1680,1638

for (let row = 0; row < rows.length; row++) {
  guardStartColumn = rows[row].indexOf("^");

  if (guardStartColumn !== -1) {
    guardStartRow = row;
    break;
  }
}

console.log(guardStartRow, guardStartColumn);

type State = {
  row: number;
  column: number;
  direction: number;
};

const charAt = (row: number, column: number, map: string[]): string | undefined => {
  if (row < 0 || row >= map.length || column < 0 || column >= map[0].length) {
    return undefined;
  }
  return map[row][column];
};

const setObstacleAt = (row: number, column: number, map: string[]) => {
  if (
    row < 0 || row >= map.length || column < 0 || column >= map[0].length ||
    (row === guardStartRow && column === guardStartColumn)
  ) {
    return map;
  }
  map = map.slice();
  map[row] = map[row].substring(0, column) + "#" + map[row].substring(column + 1);
  return map;
};

const step = (state: State, map: string[]): State | undefined => {
  const [dr, dc] = directions[state.direction];
  const nextChar = charAt(state.row + dr, state.column + dc, map);

  if (!nextChar) {
    return undefined;
  }

  if (nextChar === "#") {
    return { ...state, direction: (state.direction + 1) % 4 };
  }

  return {
    row: state.row + dr,
    column: state.column + dc,
    direction: state.direction,
  };
};

const doesMapHaveLoop = (state: State | undefined, map: string[]): boolean => {
  const visited = new Set<string>();
  while (state) {
    const key = `${state.row},${state.column},${state.direction}`;
    if (visited.has(key)) {
      return true;
    }
    visited.add(key);
    state = step(state, map);
  }
  return false;
};

let state: State | undefined = {
  row: guardStartRow,
  column: guardStartColumn,
  direction: 0,
};

let loops = 0;
while (state) {
  // Check for loop if we place a obstacle now
  const [dr, dc] = directions[state.direction];
  const loopMap = setObstacleAt(state.row + dr, state.column + dc, rows);
  loops += doesMapHaveLoop(state, loopMap) ? 1 : 0;

  state = step(state, rows);
}

console.log(rows);
