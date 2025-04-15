const fs = require('fs');
const path = require('path');

const fileName = "AllFiles"; // Folder to scan for files
const totalFilesArray = []; // Stores normalized filenames to check duplicates

// Regex to match filenames like "file copy", "file copy 2", etc.
const duplicateRegex = /^(.+?) copy(?: \d+)?(\.[a-zA-Z0-9]+)?$/;

const DuplicateFileRemover = async () => {
    try {
        // Read all files from the target directory
        const myFiles = await fs.promises.readdir(path.join(__dirname, fileName));
        
        for (const file of myFiles) {
            const ext = path.extname(file); // Get file extension (.txt, .jpg, etc.)
            const baseName = path.basename(file, ext); // Get filename without extension
            const fullPath = path.join(__dirname, fileName, file); // Full path to the file

            // Check if the file is a duplicate based on name pattern
            const match = baseName.match(duplicateRegex);
            const normalizedName = match ? match[1] : baseName; // Remove " copy" pattern if present

            const key = normalizedName + ext; // Unique key for comparison (e.g. "file.txt")

            if (totalFilesArray.includes(key)) {
                // File is a duplicate, delete it
                console.log(`${file} is a duplicate of ${key}, deleting...`);
                await fs.promises.unlink(fullPath);
            } else {
                // File is unique, add to the list
                totalFilesArray.push(key);
                console.log(`${file} added as unique`);
            }
        }

        console.log("Done checking for duplicates.");
    } catch (err) {
        console.log("Error in DuplicateFileRemover:", err.message);
    }
};

DuplicateFileRemover();
