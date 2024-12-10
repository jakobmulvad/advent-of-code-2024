const input = await Deno.readTextFile("9_input.txt");

let fileIdMap: (number | undefined)[] = [];

let isFile = true;
let fileId = 0;
for (const char of input) {
  const fill = isFile ? fileId++ : undefined;
  fileIdMap = fileIdMap.concat(new Array(parseInt(char)).fill(fill));
  isFile = !isFile;
}

for (let i = fileIdMap.length - 1; i >= 0; i--) {
  if (fileIdMap[i] === undefined) {
    continue;
  }
  for (let j = 0; j < i; j++) {
    if (fileIdMap[j] !== undefined) {
      continue;
    }
    const tmp = fileIdMap[j];
    fileIdMap[j] = fileIdMap[i];
    fileIdMap[i] = tmp;
  }
}

const checksum = fileIdMap.reduce((acc, fileId, index) => {
  if (fileId === undefined) {
    return acc;
  }
  return acc + index * fileId;
}, 0);

console.log(checksum);
