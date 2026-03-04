import { execSync } from "child_process";

export function remarkModifiedTime() {
  return function (tree, file) {
    const filepath = file.history[0];
    if (!filepath) return;
    try {
      const result = execSync(
        `git log -1 --pretty="format:%cI" "${filepath}"`,
        { encoding: "utf8" },
      );
      if (result) {
        file.data.astro ??= {};
        file.data.astro.frontmatter ??= {};
        file.data.astro.frontmatter.lastModified = result.trim();
      }
    } catch {
      // No git history or not a repo; leave lastModified unset
    }
  };
}
