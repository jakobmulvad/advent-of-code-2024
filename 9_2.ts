const input = await Deno.readTextFile("9_input.txt");

let fileIdMap: { size: number; fileId: number | undefined }[] = [];

let isFile = true;
let fileId = 0;
for (const char of input) {
  const fill = isFile ? fileId++ : undefined;
  fileIdMap.push({ size: Number(char), fileId: fill });
  isFile = !isFile;
}

const moveRightFileLeft = (): boolean => {
  for (let i = fileIdMap.length - 1; i >= 0; i--) {
    if (fileIdMap[i].fileId === undefined) {
      continue;
    }
    for (let j = 0; j < i; j++) {
      if (fileIdMap[j].fileId !== undefined) {
        continue;
      }

      if (fileIdMap[j].fileId == undefined && fileIdMap[j].size >= fileIdMap[i].size) {
        const freespace = fileIdMap[j];
        fileIdMap[j] = fileIdMap[i];
        fileIdMap[i] = { size: fileIdMap[j].size, fileId: undefined };
        fileIdMap.splice(j + 1, 0, { size: freespace.size - fileIdMap[j].size, fileId: undefined });
        return true;
      }
    }
  }
  return false;
};

while (moveRightFileLeft()) {}

const fileIdMapFlat = fileIdMap.reduce((acc, { size, fileId }) => {
  return acc.concat(Array(size).fill(fileId));
}, []);

const checksum = fileIdMapFlat.reduce((acc, fileId, index) => {
  if (fileId === undefined) {
    return acc;
  }
  return acc + index * fileId;
}, 0);

console.log(checksum);
