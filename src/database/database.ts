import Database from 'better-sqlite3';
import path from "path";
import fs from "fs";

const dbPath = path.resolve(__dirname, "../../database.db");
const schemaPath = fs.existsSync(path.resolve(__dirname, "./schema.sql"))
  ? path.resolve(__dirname, "./schema.sql")
  : path.resolve(__dirname, "../../src/database/schema.sql");

const db = new Database(dbPath);
db.pragma("foreign_keys = ON");

const schema = fs.readFileSync(schemaPath, "utf-8");
db.exec(schema);

const avaliacaoColumns = db.prepare("PRAGMA table_info(avaliacao)").all() as { name: string }[];
if (!avaliacaoColumns.some((column) => column.name === "id_produto")) {
  db.prepare("ALTER TABLE avaliacao ADD COLUMN id_produto INTEGER REFERENCES produto(id)").run();
}

export default db;
