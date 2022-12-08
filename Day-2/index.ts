import { readFileSync } from "fs";

function valueOfRound(a: string, b: string) {
  if (b === "X") {
    if (a === "A") return 3;
    else if (a === "B") return 0;
    return 6;
  } else if (b === "Y") {
    if (a === "A") return 6;
    else if (a === "B") return 3;
    return 0;
  } else {
    if (a === "A") return 0;
    else if (a === "B") return 6;
    return 3;
  }
}
function partTwoValueOfRound(a: string, b: string) {
  if (b === "X") {
    //I need to lose
    if (a === "A") return 3 + 0;
    else if (a === "B") return 1 + 0;
    return 2 + 0;
  } else if (b === "Y") {
    //I need to draw
    if (a === "A") return 1 + 3;
    else if (a === "B") return 2 + 3;
    return 3 + 3;
  } else {
    //I need to win
    if (a === "A") return 2 + 6;
    else if (a === "B") return 3 + 6;
    return 1 + 6;
  }
}

function countTotalScore() {
  const input = readFileSync("./input.txt", "utf-8");
  const value = {
    X: 1,
    Y: 2,
    Z: 3,
  };
  const arr = input.split(/\r?\n/);
  let sol: number = 0;
  let sol2: number = 0;
  arr.map((item) => {
    const played = item.split(" ");
    const valuePlayed = played[1] === "X" ? 1 : played[1] === "Y" ? 2 : 3;
    sol += valuePlayed + valueOfRound(played[0], played[1]);
    sol2 += partTwoValueOfRound(played[0], played[1]);
    console.log(sol2, partTwoValueOfRound(played[0], played[1]));
  });
  console.log(sol, sol2);
}
countTotalScore();
