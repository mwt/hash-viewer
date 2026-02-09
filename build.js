const fs = require("node:fs/promises");
const path = require("node:path");
const { minify } = require("terser");

/* Write minified versions of dependencies to assets/js/ */

const deps = [
    { name: "dompurify", specifier: "dompurify/dist/purify.js" },
    { name: "lz-string", specifier: "lz-string" },
    { name: "marked", specifier: "marked/lib/marked.umd.js", force: true },
    { name: "mathjax", specifier: "mathjax", copy: true }
];

async function buildDeps() {
    /* Delete node directory if it exists and then recreate it */
    await fs.rm(path.join(__dirname, "assets", "js", "node"), { recursive: true, force: true });
    await fs.mkdir(path.join(__dirname, "assets", "js", "node"), { recursive: true });

    await Promise.all(
        deps.map(async ({ name, specifier, force, copy }) => {
            let filePath;
            if (copy) {
                const packageName = specifier.split("/")[0];
                const packageDir = path.dirname(require.resolve(packageName + "/package.json"));
                const subPath = specifier.substring(packageName.length + 1);
                filePath = path.join(packageDir, subPath);
                
                /* If file path is a directory, copy the whole directory. Otherwise, copy the file */
                if ((await fs.stat(filePath)).isDirectory()) {
                    const outDir = path.join(__dirname, "assets", "js", "node", name);
                    await fs.cp(filePath, outDir, { recursive: true });
                    return;
                } else {
                    const outPath = path.join(__dirname, "assets", "js", "node", `${name}`);
                    await fs.copyFile(filePath, outPath);
                    return;
                }
            }
            else if (force) {
                /* Fallback: resolve package dir and append specifier path */
                const packageName = specifier.split("/")[0];
                const packageDir = path.dirname(require.resolve(packageName + "/package.json"));
                const subPath = specifier.substring(packageName.length + 1);
                filePath = path.join(packageDir, subPath);
            } else {
                filePath = require.resolve(specifier);
            }

                const source = await fs.readFile(filePath, "utf8");
                const result = await minify(source, { compress: true, mangle: true });
                if (!result.code) {
                    throw new Error(`Minifier did not return output for ${name}.`);
                }

                /* Create the minified output file */
                const outPath = path.join(__dirname, "assets", "js", "node", `${name}.min.js`);
                await fs.writeFile(outPath, result.code);
            })
    );
}

buildDeps().catch((error) => {
    console.error(error);
    process.exit(1);
});
