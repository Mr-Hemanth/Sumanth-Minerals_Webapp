// Usage: node scripts/hash-password.mjs
// Asks for the new admin password twice (typing is hidden), then prints the
// ADMIN_PASSWORD_HASH line to paste into Vercel and .env.local.
// The password is never passed on the command line, so it stays out of shell history.
import { scryptSync, randomBytes } from "node:crypto";

function ask(question) {
  return new Promise((resolve, reject) => {
    const { stdin, stdout } = process;
    if (!stdin.isTTY) return reject(new Error("Run this in a terminal window."));
    stdout.write(question);
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");
    let value = "";
    const onData = (ch) => {
      if (ch === "\r" || ch === "\n" || ch === "\u0004") {
        stdin.setRawMode(false);
        stdin.pause();
        stdin.removeListener("data", onData);
        stdout.write("\n");
        resolve(value);
      } else if (ch === "\u0003") { // Ctrl+C
        stdin.setRawMode(false);
        stdout.write("\n");
        process.exit(130);
      } else if (ch === "\u007f" || ch === "\b") { // Backspace
        value = value.slice(0, -1);
      } else {
        value += ch;
      }
    };
    stdin.on("data", onData);
  });
}

const password = await ask("New admin password (min 12 chars): ").catch((e) => {
  console.error(e.message);
  process.exit(1);
});
if (password.length < 12) {
  console.error("Too short: use at least 12 characters.");
  process.exit(1);
}
if (password !== (await ask("Type it again: "))) {
  console.error("The two passwords do not match. Nothing was changed.");
  process.exit(1);
}

const salt = randomBytes(16).toString("hex");
const hash = scryptSync(password, salt, 64).toString("hex");
console.log(`\nADMIN_PASSWORD_HASH=${salt}:${hash}\n`);
console.log("Paste the value after = into Vercel (Settings > Environment Variables), then redeploy.");
