import path from "path";

const [, , problemName, variantName, language, _version] = process.argv;
if (!problemName || !variantName) {
    console.error(
        "Usage: bun run-test <problemName> <variantName> <language> [<version>=v1]",
    );
    process.exit(1);
}
if (variantName.search(/\.(ts|js|c|cpp|java)/))
    if (!["ts", "js", "c", "cpp", "java"].includes(language)) {
        console.error("Language is required: ts|js|c|cpp|java");
        process.exit(1);
    }

const version = _version ?? "v1";

const specPath = path.resolve(
    `./packages/problems/${version}/${problemName}/${language}/problem.spec.ts`,
);
const solutionFilePath = path.resolve(
    `./packages/solutions/${language}/${version}/${problemName}/${variantName}.${language}`,
);

console.log(`Routing ${problemName}.spec.ts to target: ${variantName}.ts...`);

const result = Bun.spawnSync({
    stdio: ["inherit", "inherit", "inherit"],
    cmd: ["bun", "test", specPath],
    env: {
        ...process.env,
        SOLUTION_PATH: solutionFilePath,
        SOLUTION_VARIANT: variantName,
        SOLUTION_LANGUAGE: language,
    },
});

process.exit(result.exitCode ?? 0);
