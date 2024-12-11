const input = await Deno.readTextFile("11_input.txt");
const stones = input.split(" ");

const resolved: Map<string, number> = new Map();

const blink = (stone: string, depth: number): number => {
  if (depth === 0) {
    return 1;
  }

  const key = `${stone}-${depth}`;

  if (resolved.has(key)) {
    return resolved.get(key)!;
  }

  depth--;

  if (stone === "0") {
    const val = blink("1", depth);
    resolved.set(key, val);
    return val;
  }

  if (stone.length % 2 === 0) {
    const left = blink(stone.slice(0, stone.length / 2), depth);
    const right = blink(parseInt(stone.slice(stone.length / 2)).toString(), depth);
    resolved.set(key, left + right);
    return left + right;
  }

  const val = blink((parseInt(stone) * 2024).toString(), depth);
  return val;
};

let sum = 0;
for (const stone of stones) {
  sum += blink(stone, 75);
}

console.log(sum);
