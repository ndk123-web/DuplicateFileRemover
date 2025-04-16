# 🔄 Duplicate File Remover (Node.js)


Project Members :

1. Navnath Kadam
2. Sahil Khillari
3. Yogest Gade
4. Prathamesh Nitnaware

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
├── main.js
└── README.md
```

---

## 🚀 How to Use

1. Place all your files inside the `AllFiles` folder.
2. Run the script:

```bash
node main.js
```

3. The console will show which files were kept or deleted.

---

## 📌 Notes

- Make sure to back up your files before running the script.
- This version **does not** compare file contents — only names.

---

## 📞 Author

Made with ❤️ by [Navnath]
```
