import express, { Express } from "express";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const redirectsPath = path.join(__dirname, "redirects.json");
const urlMapping: Record<string, string> = JSON.parse(
  fs.readFileSync(redirectsPath, "utf-8")
);

app.get("/Trackmania/:fileName", (req, res) => {
  const fileName = req.params.fileName;

  if (urlMapping[fileName]) {
    res.redirect(301, urlMapping[fileName]); // Permanent redirect
  } else {
    res.status(404).send("File not found");
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
