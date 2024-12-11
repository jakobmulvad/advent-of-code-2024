const input = await Deno.readTextFile("11_input.txt");
let stones = input.split(" ");

const blink = (stone: string): string[] | string => {
  if (stone === "0") {
    return "1";
  }
  if (stone.length % 2 === 0) {
    const split = [stone.slice(0, stone.length / 2), parseInt(stone.slice(stone.length / 2)).toString()];
    return split;
  }
  return (parseInt(stone) * 2024).toString();
};

for (let i = 0; i < 25; i++) {
  stones = stones.flatMap(blink);
}

console.log(stones.length);
