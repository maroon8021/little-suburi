import fs from "fs";
import path from "path";

export const getPages = (directory: string) => {
  console.log("directory", directory);
  const files = searchFiles(directory);
  console.log("files", files);
  const pages = files.map((file) =>
    file.replace(directory, "").replace(".tsx", "").replace("index", "")
  );

  return pages as string[];
};

const searchFiles = (directory: string): string[] => {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const files: string[] = entries.flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      return searchFiles(fullPath);
    } else if (entry.isFile() && entry.name.endsWith(".tsx")) {
      return fullPath;
    }
    return [];
  });
  return files;
};
