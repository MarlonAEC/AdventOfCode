export interface File {
  name: string;
  size: number;
}

export class Directory {
  size: number;
  path: string;
  listOfFileSizes: number[];
  listOfSubdirectories: Directory[];

  getDirectorySize() {
    return this.size;
  }
  getDirectoryPath() {
    return this.path;
  }
  setSize(value: number) {
    this.size = value;
  }
  addFileSize(fileSize: number) {
    this.listOfFileSizes.push(fileSize);
  }
  addSubDirectory(subdirectory: Directory) {
    this.listOfSubdirectories.push(subdirectory);
  }
  constructor(path: string = "/") {
    this.size = 0;
    this.path = path;
    this.listOfFileSizes = [];
    this.listOfSubdirectories = [];
  }
}

export type FileSystem = {
  [key: string]: Directory;
};
