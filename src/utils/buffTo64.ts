import DataURIParser from "datauri/parser";
import path from "path";

export function buffTo64(file: Express.Multer.File) {
  const parser = new DataURIParser();
  return parser.format(path.extname(file.originalname).toString(), file.buffer);
}
