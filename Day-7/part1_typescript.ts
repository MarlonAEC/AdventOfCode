import { Directory, FileSystem } from "./FileSystem";

const { readFileSync, promises: fsPromises } = require("fs");

const moveUpCurrentPath: (path: string) => string = (path) => {
  const arrOfDirectories = path.split("/");
  arrOfDirectories.pop();
  return arrOfDirectories.join("/");
};

const moveDownCurrentPath: (path: string, directory: string) => string = (
  path,
  directory
) => {
  if (path == "/") return path + directory;
  return directory != "/" ? path + "/" + directory : "/";
};

let sol = 0;
const totalAvailable = 70000000;
const unusedSpace = 30000000;
const directorySizes: number[] = [];

const readData = () => {
  const input = readFileSync("./input.txt", "utf-8");
  const arr = input.split(/\r?\n/);
  console.log(arr);
  let currentPath = "";

  const filesystem: FileSystem = {};
  arr.map((value: string) => {
    if (value == "$ cd ..") {
      currentPath = moveUpCurrentPath(currentPath);
    } else if (value.match(/\$ cd ([a-zA-Z]+|\/{1})/)) {
      const subDirectory = value.split(" ")[2];
      const newCurrentPath = moveDownCurrentPath(currentPath, subDirectory);
      if (!filesystem[newCurrentPath]) {
        const newDirectory = new Directory(newCurrentPath);
        filesystem[newCurrentPath] = newDirectory;
      }
      currentPath = newCurrentPath;
    } else if (value.match(/[0-9]+ [a-zA-Z]+/)) {
      const fileSize = value.split(" ")[0];
      //console.log(currentPath);
      filesystem[currentPath].addFileSize(parseInt(fileSize));
    } else if (value.match(/dir [a-zA-Z]+/)) {
      const dir = value.split(" ")[1];
      const newSubDirectory = new Directory(currentPath + dir);
      const newPath = moveDownCurrentPath(currentPath, dir);
      filesystem[newPath] = newSubDirectory;
      filesystem[currentPath].addSubDirectory(newSubDirectory);
    }
  });

  recursivelyCalculateSize(filesystem["/"]);
  console.log("SOL: ", sol);
  const usedSpace = filesystem["/"].getDirectorySize();
  let smallestDirectory = usedSpace;
  directorySizes.forEach((directory) => {
    const totalAfterRemoved = usedSpace - directory;
    if (
      totalAvailable - totalAfterRemoved >= unusedSpace &&
      smallestDirectory > directory
    ) {
      smallestDirectory = directory;
    }
  });
  console.log("SOL PART 2: ", smallestDirectory);
  console.log(
    filesystem["/"].getDirectorySize(),
    totalAvailable - filesystem["/"].getDirectorySize()
  );
};

const recursivelyCalculateSize: (filesystem: Directory) => void = (
  filesystem: Directory
) => {
  let filesTotalSize = 0;
  filesystem.listOfFileSizes.forEach((fileSize) => {
    filesTotalSize += fileSize;
  });

  let subDirectoriesSize = 0;
  filesystem.listOfSubdirectories.forEach((subDirectory) => {
    recursivelyCalculateSize(subDirectory);
    subDirectoriesSize += subDirectory.getDirectorySize();
  });

  const total = filesTotalSize + subDirectoriesSize;
  filesystem.setSize(total);
  directorySizes.push(total);
  if (filesystem.getDirectorySize() <= 100000)
    sol += filesystem.getDirectorySize();
};

readData();
