/**
 * Vercel always sets CI=true. react-scripts then fails the production build
 * on warnings. Those warnings are pre-existing (Bootstrap's color-adjust
 * autoprefixer notice, and ESLint style rules) and are not compile errors.
 * Setting CI=false keeps the same build and lets it finish.
 */
const { spawn } = require("child_process");
const path = require("path");

const root = path.join(__dirname, "..");
const reactScripts = path.join(
  root,
  "node_modules",
  "react-scripts",
  "bin",
  "react-scripts.js"
);

const child = spawn(process.execPath, [reactScripts, "build"], {
  cwd: root,
  stdio: "inherit",
  env: {
    ...process.env,
    CI: "false",
  },
});

child.on("close", (code) => {
  process.exit(code === null ? 1 : code);
});
