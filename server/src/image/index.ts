import { Request, Response, Router } from "express";
import multer, { FileFilterCallback } from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import path from "path";

const uploadImageRouter = Router();

const s3 = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  const filetypes = /jpeg|jpg|webp|gif|svg|bmp|png/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  console.log(`File Mimetype: ${file.mimetype}`);
  console.log(
    `File Extension: ${path.extname(file.originalname).toLowerCase()}`
  );
  console.log(`Mimetype Valid: ${mimetype}`);
  console.log(`Extname Valid: ${extname}`);

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error("Only images are allowed"));
};

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "sportsdot", // replace with your bucket name
    key: (
      _req: Request,
      file: Express.Multer.File,
      cb: (error: any, key?: string) => void
    ): void => {
      cb(null, `${Date.now().toString()}${path.extname(file.originalname)}`); // file name
    },
  }),
  fileFilter: fileFilter,
}).fields([
  { name: "avatar", maxCount: 1 },
  { name: "images", maxCount: 3 },
]);

const pitchImageUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "sportsdot",
    key: (
      _req: Request,
      file: Express.Multer.File,
      cb: (error: any, key?: string) => void
    ): void => {
      cb(null, `${Date.now().toString()}${path.extname(file.originalname)}`);
    },
  }),
  fileFilter: fileFilter,
}).array("pitchImages", 10);

uploadImageRouter.post("/upload", (req: Request, res: Response) => {
  upload(req, res, (err: any) => {
    if (err) {
      console.error("Upload Error:", err);
      return res.status(500).json({ error: err.message || err });
    }

    try {
      console.log("Files:", req.files);
      console.log("Body:", req.body);

      if (req.files) {
        const avatar = (req.files as any).avatar
          ? (req.files as any).avatar[0].location
          : null;
        const images = (req.files as any).images
          ? (req.files as any).images.map((file: any) => file.location)
          : [];
        console.log("Uploaded avatar:", avatar);
        console.log("Uploaded images:", images);
        console.log("Other form data:", req.body);

        res.json({ avatar, images });
      } else {
        res.status(400).send("Error uploading images");
      }
    } catch (error: any) {
      console.error("Processing Error:", error);
      return res.status(500).json({
        error: error.message || error,
      });
    }
  });
});

uploadImageRouter.post("/upload-avatar", (req: Request, res: Response) => {
  pitchImageUpload(req, res, (err: any) => {
    if (err) {
      console.error("Upload Error:", err);
      return res.status(500).json({ error: err.message || err });
    }

    try {
      console.log("Files:", req.files);
      console.log("Body:", req.body);

      const pitchImages = (req.files as Express.Multer.File[])
        ? (req.files as any).map((file: any) => file.location)
        : [];

      console.log("Uploaded pitch images:", pitchImages);
      console.log("Other form data:", req.body);

      res.json({ pitchImages });
    } catch (error: any) {
      console.error("Processing Error:", error);
      return res.status(500).json({
        error: error.message || error,
      });
    }
  });
});

export default uploadImageRouter;
