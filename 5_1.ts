const input = await Deno.readTextFile("5_input.txt");

const rows = input.split("\n");
const emptyLineIndex = rows.indexOf("");
const orderings = rows.slice(0, emptyLineIndex).map((row) => row.split("|"));
const updates = rows.slice(emptyLineIndex + 1);

const isCorrect = (update: string[]) => {
  for (let i = 0; i < update.length; i++) {
    const left = update[i];
    const correct = update.slice(i + 1).every((right) => {
      return orderings.every(([leftOrder, rightOrder]) => {
        return !(right === leftOrder && left === rightOrder);
      });
    });

    if (!correct) {
      return false;
    }
  }
  return true;
};

let sum = 0;
for (const update of updates) {
  const updateOrder = update.split(",");
  const correct = isCorrect(updateOrder);
  sum += correct ? Number(updateOrder[(updateOrder.length - 1) / 2]) : 0;
}

console.log(sum);
