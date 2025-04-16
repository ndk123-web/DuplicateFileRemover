# File Duplication Removal & Organizing Script

This script is designed to find and remove duplicate files in a directory and organize them by file extension into separate folders. It checks for duplicate files based on the `copy` pattern (like "filename copy 1", "filename copy 2") and organizes files into separate folders by their extension.

---

## 🚀 **Features**

- **Remove Duplicate Files**: Detects files with the "copy" pattern and removes duplicates.
- **Organize Files by Extension**: After removing duplicates, files are moved into folders based on their extension (e.g., `.txt`, `.html`, `.jpg`).
- **Flexible Directory Handling**: The script works with any directory specified by the user.
- **Error Handling**: Handles errors and logs issues like missing directories or failed file operations.

---

## 🛠 **Setup Instructions**

### **1. Clone the Repository**
Clone the repository to your local machine using Git:

```bash
git clone https://github.com/yourusername/repository-name.git
```

### **2. Install Dependencies**
This project uses Node.js. Make sure you have Node.js installed. You can download it from [here](https://nodejs.org/).

Once Node.js is installed, install the necessary dependencies:

```bash
npm install crypto-js
```

---

## ⚙️ **How It Works**

1. **Directory Scanning**: The script scans all files in the `AllFiles` directory.
2. **File Duplication Check**: It identifies duplicates based on the `copy` pattern (e.g., `filename copy 1`).
3. **File Movement**: Once duplicates are removed, the script moves the remaining files into directories based on their extensions (`.txt`, `.html`, etc.).
4. **Error Logging**: If any errors occur (e.g., missing files or permission issues), they will be logged.

---

## 📝 **Script Usage**

### **1. Update Directory Path**
Make sure to specify the correct directory path in the script.

```javascript
const dirPath = "AllFiles"; // Set your directory path
```

### **2. Run the Script**

To execute the script, simply run:

```bash
node yourScriptName.js
```

This will start the process of finding duplicates and organizing files based on their extension.

---

## 📂 **Directory Structure**

```
├── AllFiles/              # The directory containing all files.
├───── txt/                   # Folder for .txt files.
├───── html/                  # Folder for .html files.
├───── images/                # Folder for image files (e.g., .jpg, .png).
├── main.js                # The script that handles duplication and organization.
└── README.md              # This README file.
```

---

## ⚠️ **Important Notes**

- Ensure the script is run with appropriate permissions to access the specified directories.
- The script only works within **the same filesystem** for moving files. If you need to move files across different drives, extra code for copying and deleting would be required.
- You can modify the regex pattern in the script if the file naming convention changes (e.g., different duplicate naming pattern).


## 🏅 **Contributing**

Feel free to fork this project, make improvements, or suggest features. Open an issue or create a pull request if you want to contribute.

---
