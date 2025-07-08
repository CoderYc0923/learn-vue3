import fs from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";

const pkgsDir = "./packages";
const dirs = fs.readdirSync(pkgsDir).filter((f) => {
  const pkgPath = path.join(pkgsDir, f, `package.json`);
  return fs.existsSync(pkgPath);
});

for (const dir of dirs) {
  console.log(`\n==== 正在打包：${dir} ====`);
  execSync(`cd ${pkgsDir}/${dir} && pnpm build`, { stdio: "inherit" });
}
