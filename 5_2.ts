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

  if (!correct) {
    updateOrder.sort((a, b) => {
      if (orderings.findIndex(([left, right]) => left === a && right === b) !== -1) {
        return -1;
      }
      if (orderings.findIndex(([left, right]) => right === a && left === b) !== -1) {
        return 1;
      }
      return 0;
    });
    sum += Number(updateOrder[(updateOrder.length - 1) / 2]);
  }
}

console.log(sum);