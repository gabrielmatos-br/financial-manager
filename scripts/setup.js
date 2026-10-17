import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const envPath = join(import.meta.dirname, "..", "server", ".env");
const examplePath = join(import.meta.dirname, "..", "server", ".env.example");

if (!existsSync(envPath)) {
	if (existsSync(examplePath)) {
		copyFileSync(examplePath, envPath);
	}
}
