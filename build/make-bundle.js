const { promisify } = require("util")
const fs = require("fs")
const path = require("path")
const rollup = require("rollup")
const uglifyEs = require("uglify-js")
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const packageName = "discordjs-ui"
const srcPath = path.join(__dirname, "..", "src")
const compiledPath = path.join(__dirname, "compiled")
const distNpmPath = path.join(__dirname, "..")

console.log(srcPath, compiledPath, distNpmPath)
async function build() {
  let bundle = await rollup.rollup({
    input: path.join(compiledPath, "index.js")
  })
  let generated = await bundle.generate({
    format: "cjs",
    sourcemap: false
  })
  const code = generated.output[0].code;
  let minified = uglifyEs.minify(code)
  if (minified.error)
    throw minified.error
  await writeFile(path.join(distNpmPath, `${packageName}.min.js`), minified.code)
  await writeFile(path.join(distNpmPath, `${packageName}.d.ts`), await makeDefinitionsCode())
}
async function makeDefinitionsCode() {
  let defs = [
    "// -- Usage definitions --",
    removeLocalImportsExports((await readFile(path.join(srcPath, "exported-definitions.d.ts"), "utf-8")).trim()),
    "// -- Driver definitions --",
    removeLocalImportsExports((await readFile(path.join(srcPath, "driver-definitions.d.ts"), "utf-8")).trim()),
    "// -- Entry point definition --",
    removeSemicolons(
      removeLocalImportsExports((await readFile(path.join(compiledPath, "index.d.ts"), "utf-8")).trim()),
    )
  ]
  return defs.join("\n\n")
}
function removeLocalImportsExports(code) {
  let localImportExport = /^\s*(import|export) .* from "\.\/.*"\s*;?\s*$/
  return code.split("\n").filter(line => {
    return !localImportExport.test(line)
  }).join("\n").trim()
}
function removeSemicolons(code) {
  return code.replace(/;/g, "")
}
build().then(() => {
  console.log("done")
}, err => console.log(err.message, err.stack))