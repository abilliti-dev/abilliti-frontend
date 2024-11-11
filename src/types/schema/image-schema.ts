import { z } from "zod";

export const imageSchema = z.custom<File>(
  (file) => {
    // must be file type
    if (!(file instanceof File)) return false;

    // max size: 5 MB
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) return false;

    // only allow image extensions
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) return false;

    return true;
  },
  { message: "File must be an image and less than 5MB." }
);
