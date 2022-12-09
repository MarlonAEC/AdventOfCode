const { readFileSync, promises: fsPromises } = require("fs");

const readData = () => {
  const input = readFileSync("./input.txt", "utf-8");
  const arr: string[] = input.split(/\r?\n/);
  const n = arr.length;
  const m = arr[0].length;

  //Initialization
  let biggestFromTop = new Array(n);
  let biggestFromBottom = new Array(n);
  let biggestFromLeft = new Array(n);
  let biggestFromRight = new Array(n);
  for (let i = 0; i < n; ++i) {
    biggestFromTop[i] = new Array(m);
    for (let j = 0; j < m; j++) {
      if (i == 0) {
        biggestFromTop[i][j] = { tall: parseInt(arr[i][j]), pos: i };
      } else {
        biggestFromTop[i][j] = {
          tall: Math.max(
            parseInt(biggestFromTop[i - 1][j].tall),
            parseInt(arr[i][j])
          ),
          pos:
            parseInt(biggestFromTop[i - 1][j].tall) > parseInt(arr[i][j])
              ? i - 1
              : i,
        };
      }
    }
  }
  for (let i = n - 1; i >= 0; i--) {
    biggestFromBottom[i] = new Array(m);
    for (let j = 0; j < m; j++) {
      if (i == n - 1) {
        biggestFromBottom[i][j] = { tall: parseInt(arr[i][j]), pos: i };
      } else {
        biggestFromBottom[i][j] = {
          tall: Math.max(
            parseInt(biggestFromBottom[i + 1][j].tall),
            parseInt(arr[i][j])
          ),
          pos:
            parseInt(biggestFromBottom[i + 1][j].tall) > parseInt(arr[i][j])
              ? i + 1
              : i,
        };
      }
    }
  }
  for (let i = 0; i < n; ++i) {
    biggestFromLeft[i] = new Array(m);
    for (let j = 0; j < m; j++) {
      if (j == 0) {
        biggestFromLeft[i][j] = { tall: parseInt(arr[i][j]), pos: j };
      } else {
        biggestFromLeft[i][j] = {
          tall: Math.max(
            parseInt(biggestFromLeft[i][j - 1].tall),
            parseInt(arr[i][j])
          ),
          pos:
            parseInt(biggestFromLeft[i][j - 1].tall) > parseInt(arr[i][j])
              ? j - 1
              : j,
        };
      }
    }
  }
  for (let i = 0; i < n; ++i) {
    biggestFromRight[i] = new Array(m);
    for (let j = m - 1; j >= 0; j--) {
      if (j == m - 1) {
        biggestFromRight[i][j] = { tall: parseInt(arr[i][j]), pos: j };
      } else {
        biggestFromRight[i][j] = {
          tall: Math.max(
            parseInt(biggestFromRight[i][j + 1].tall),
            parseInt(arr[i][j])
          ),
          pos:
            parseInt(biggestFromRight[i][j + 1].tall) > parseInt(arr[i][j])
              ? j + 1
              : j,
        };
      }
    }
  }

  let sol = 0;
  let solPart2 = 0;
  //   console.log(
  //     biggestFromTop,
  //     "\n",
  //     biggestFromRight,
  //     "\n",
  //     biggestFromBottom,
  //     "\n",
  //     biggestFromLeft
  //   );
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (i == 0 || j == 0 || i == n - 1 || j == m - 1) sol++;
      else {
        let isVisible = false;
        if (biggestFromBottom[i + 1][j].tall < parseInt(arr[i][j])) {
          isVisible = true;
          //console.log("IS VISIBLE FROM BOTTOM: ", i, ", ", j);
        }

        if (biggestFromTop[i - 1][j].tall < parseInt(arr[i][j])) {
          isVisible = true;
          //console.log("IS VISIBLE FROM TOP: ", i, ", ", j);
        }

        if (biggestFromLeft[i][j - 1].tall < parseInt(arr[i][j])) {
          isVisible = true;
          //console.log("IS VISIBLE FROM LEFT: ", i, ", ", j);
        }

        if (biggestFromRight[i][j + 1].tall < parseInt(arr[i][j])) {
          isVisible = true;
          //console.log("IS VISIBLE FROM RIGHT: ", i, ", ", j);
        }
        // console.log(
        //   biggestFromTop,
        //   "\n",
        //   biggestFromRight,
        //   "\n",
        //   biggestFromBottom,
        //   "\n",
        //   biggestFromLeft
        // );
        let amountVisibleFromBottom =
          biggestFromBottom[i + 1][j].tall >= parseInt(arr[i][j])
            ? biggestFromBottom[i + 1][j].pos - i
            : n - i - 1;
        let amountVisibleFromTop =
          biggestFromTop[i - 1][j].tall >= parseInt(arr[i][j])
            ? i - biggestFromTop[i - 1][j].pos
            : i;
        let amountVisibleFromRight =
          biggestFromRight[i][j + 1].tall >= parseInt(arr[i][j])
            ? biggestFromRight[i][j + 1].pos - j
            : m - j - 1;
        let amountVisibleFromLeft =
          biggestFromLeft[i][j - 1].tall >= parseInt(arr[i][j])
            ? j - biggestFromLeft[i][j - 1].pos
            : j;
        console.log("TOP: ", amountVisibleFromTop);
        console.log("BOTTOM: ", amountVisibleFromBottom);
        console.log("RIGHT: ", amountVisibleFromRight);
        console.log("LEFT: ", amountVisibleFromLeft);
        console.log(i, ", ", j);
        let totalVisible =
          amountVisibleFromBottom *
          amountVisibleFromLeft *
          amountVisibleFromRight *
          amountVisibleFromTop;
        if (isVisible) {
          if (totalVisible > solPart2) solPart2 = totalVisible;
          sol++;
        }
      }
    }
  }
  console.log("SOL: ", sol);
  console.log("SOL PART 2: ", solPart2);
};

readData();
