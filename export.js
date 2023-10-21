const fs = require("fs");

function getcode(i) {
  const tx = fs.readFileSync(`docs/SWC-${i}.md`).toString("utf-8");

  const reg = /\`\`\`solidity\n((.|\n)*?)\n\`\`\`/gm;
  const match = tx.match(reg);

  return match;
}

function saveCode(n, codes) {
  if (codes) {
    codes.forEach((code, i) => {
      fs.writeFileSync(
        `src/${n}-${i}.sol`,
        code
          .replace("```solidity\n", "// SPDX-License-Identifier: MIT\n")
          .replace(/\n```/, "")
      );
    });
  }
}

for (let start = 100; start <= 136; start++) {
  const codes = getcode(start);
  saveCode(start, codes);
  console.log(start, "ok");
}
