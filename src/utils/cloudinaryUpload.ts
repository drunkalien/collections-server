import { v2 as cloudinary } from "cloudinary";
import DataURIParser from "datauri/parser";

export function cloudinaryUpload(file: DataURIParser) {
  return cloudinary.uploader.upload(file.content!);
}
