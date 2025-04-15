## ✅ Your Updated Script with Short Comments

```js
const fs = require('fs');
const path = require('path');

const fileName = "AllFiles"; // Folder to scan for files
const totalFilesArray = []; // Stores original filenames to compare duplicates

// Regex to match filenames like "file copy", "file copy 2", etc.
const duplicateRegex = /^(.+?) copy(?: \d+)?(\.[a-zA-Z0-9]+)?$/;

const DuplicateFileRemover = async () => {
    try {
        // Read all files from the directory
        const myFiles = await fs.promises.readdir(path.join(__dirname, fileName));
        
        for (const file of myFiles) {
            const ext = path.extname(file); // Get extension (.txt, .jpg, etc.)
            const baseName = path.basename(file, ext); // Get filename without extension
            const fullPath = path.join(__dirname, fileName, file); // Absolute file path

            // Normalize duplicate filenames (remove " copy" or " copy 1" etc.)
            const match = baseName.match(duplicateRegex);
            const normalizedName = match ? match[1] : baseName;

            const key = normalizedName + ext; // Create unique key like "file.txt"

            if (totalFilesArray.includes(key)) {
                // Duplicate found — delete it
                console.log(`🗑️ ${file} is a duplicate of ${key}, deleting...`);
                await fs.promises.unlink(fullPath);
            } else {
                // Not a duplicate — keep it
                totalFilesArray.push(key);
                console.log(`✅ ${file} added as unique`);
            }
        }

        console.log("✅ Done checking for duplicates.");
    } catch (err) {
        console.log("❌ Error in DuplicateFileRemover:", err.message);
    }
};

DuplicateFileRemover();
```

---

## 📄 README.md for Your Project

Here's a basic `README.md` file you can include in your project folder:

---

```markdown
# 🔄 Duplicate File Remover (Node.js)

This script scans a folder for duplicate files based on their **names** and **auto-generated copy patterns** (like `file`, `file copy`, `file copy 2`) and deletes the duplicates.

---

## 🧠 How It Works

- Looks for files inside the `AllFiles` directory.
- Uses a regular expression to detect files with names like:
  - `file copy`
  - `file copy 1`
  - `file copy 2`
- Keeps the original file (e.g., `file.txt`) and deletes the rest.
- Only checks filenames (not file contents).

---

## 🛠️ Requirements

- Node.js installed

---

## 📁 Folder Structure

```
project-folder/
├── AllFiles/
│   ├── file.txt
│   ├── file copy.txt
│   └── file copy 2.txt
├── duplicateRemover.js
└── README.md
```

---

## 🚀 How to Use

1. Place all your files inside the `AllFiles` folder.
2. Run the script:

```bash
node duplicateRemover.js
```

3. The console will show which files were kept or deleted.

---

## 📌 Notes

- Make sure to back up your files before running the script.
- This version **does not** compare file contents — only names.
- You can extend the script to check content using hashing (SHA256).

---

## 📞 Author

Made with ❤️ by [Navnath]
```