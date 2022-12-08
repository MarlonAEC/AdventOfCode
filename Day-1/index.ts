const { readFileSync, promises: fsPromises } = require("fs");

function countMaxCalories() {
  const input = readFileSync("./input.txt", "utf-8");
  const arr = input.split(/\r?\n/);
  const elfs: number[] = [];
  let currentElf: number = 0;
  for (let i = 0; i < arr.length; i++) {
    let value = parseInt(arr[i]);
    if (!isNaN(value)) {
      currentElf += value;
    } else {
      elfs.push(currentElf);
      currentElf = 0;
    }
  }
  elfs.sort(function (a, b) {
    return a - b;
  });
  console.log(
    elfs[elfs.length - 1] + elfs[elfs.length - 2] + elfs[elfs.length - 3]
  );
  console.log(Math.max(...elfs));
}

countMaxCalories();
