import express from "express";
import { dirname } from "path";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

import cors from "cors";
const __filename = fileURLToPath(import.meta.url);
import authRoutes from "./routes/authRoutes.mjs";
const __dirname = dirname(__filename);
const rootDir = path.join(__dirname, "../dist/baam");
const locales = ["en", "fa"];
const port = 8080;

const server = express();
server.use(bodyParser.json());

server.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);

server.use(express.static(rootDir));

server.get("/assets/*", (req, res) => {
  res.redirect(`/fa/${req.url}`);
});

locales.forEach((locale) => {
  server.get(`/${locale}/*`, (req, res) => {
    res.sendFile(path.resolve(rootDir, locale, "index.html"));
  });
});

const defaultLocale = "fa";

server.get("/", (req, res) => {
  res.redirect(`/${defaultLocale}`);
});

server.use("/api/auth", authRoutes);

server.listen(port, () => {
  console.log("app running");
});
