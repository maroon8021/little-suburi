import fs from 'fs';

const BASE = "./src/utils/data/jsons/";

/**
 * 
 * @param path start with "/"
 * @returns 
 */
const read = async <T>(path: string) => {
  const data = JSON.parse(
    fs.readFileSync(`${BASE}${path}.json`, "utf8")
  ) as T;
  return data
}

const write = async <T>(path: string, data: T) => {
  fs.writeFileSync
  (
    `${BASE}${path}.json`,
    JSON.stringify(data, null, 2)
  );
}