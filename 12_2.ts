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

const getPlotAt = (
  row: number,
  column: number,
  plant: string,
): { edges: [number, number, number][]; area: number } => {
  const key = `${row},${column}`;
  if (visited.has(key)) {
    return { edges: [], area: 0 };
  }

  visited.add(key);

  let edges: [number, number, number][] = [];
  let area = 1;

  for (let i = 0; i < directions.length; i++) {
    const [dr, dc] = directions[i];
    const r = row + dr;
    const c = column + dc;
    const plantAt = charAt(r, c);

    if (plantAt !== plant) {
      edges.push([row, column, i]);
      continue;
    }

    const { edges: e, area: a } = getPlotAt(r, c, plant);
    edges = edges.concat(e);
    area += a;
  }

  return { edges, area };
};

const countHorizontal = (edges: [number, number, number][]): number => {
  let sides = 0;
  let followingEdge = false;
  for (let r = 0; r < rows.length; r++) {
    const edgesInRow = edges.filter((edge) => edge[0] === r);
    for (let c = 0; c < rows[r].length; c++) {
      const edgeHere = edgesInRow.some((edge) => edge[1] === c);
      if (!followingEdge && edgeHere) {
        sides++;
      }
      followingEdge = edgeHere;
    }
  }
  return sides;
};

const countVertical = (edges: [number, number, number][]): number => {
  let sides = 0;
  let followingEdge = false;
  for (let c = 0; c < rows[0].length; c++) {
    const edgesInColumn = edges.filter((edge) => edge[1] === c);
    for (let r = 0; r < rows.length; r++) {
      const edgeHere = edgesInColumn.some((edge) => edge[0] === r);
      if (!followingEdge && edgeHere) {
        sides++;
      }
      followingEdge = edgeHere;
    }
  }
  return sides;
};

const countSides = (edges: [number, number, number][]): number => {
  let sides = 0;
  for (let i = 0; i < directions.length; i++) {
    const edgesInDirection = edges.filter((edge) => edge[2] === i);
    const horizontal = i % 2 === 0;
    sides += horizontal ? countHorizontal(edgesInDirection) : countVertical(edgesInDirection);
  }
  return sides;
};

let sum = 0;
for (let row = 0; row < rows.length; row++) {
  for (let column = 0; column < rows[row].length; column++) {
    const cellKey = `${row},${column}`;
    if (visited.has(cellKey)) {
      continue;
    }
    const plot = getPlotAt(row, column, charAt(row, column)!);
    sum += countSides(plot.edges) * plot.area;
  }
}

console.log(sum);
