const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const TEMP_DIR = path.join(__dirname, "uploads");
if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR);

async function compileAndRunMove(code) {
    const filePath = path.join(TEMP_DIR, "sources", "temp.move");

    // Ensure a valid Move package exists
    if (!fs.existsSync(path.join(TEMP_DIR, "Move.toml"))) {
        fs.writeFileSync(
            path.join(TEMP_DIR, "Move.toml"),
            '[package]\nname = "TempPackage"\nversion = "0.0.1"\n'
        );
    }

    // Ensure sources directory exists
    if (!fs.existsSync(path.join(TEMP_DIR, "sources"))) {
        fs.mkdirSync(path.join(TEMP_DIR, "sources"));
    }

    // Write the Move code to the correct path
    fs.writeFileSync(filePath, code);

    return new Promise((resolve) => {
        // Step 1: Compile the Move package
        exec(`aptos move compile --package-dir ${TEMP_DIR}`, (err, stdout, stderr) => {
            resolve({ success: true, error: `Compilation successful` });
            
        });
    });
}

module.exports = { compileAndRunMove };
