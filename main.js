const fs = require("fs"); // use for file operations
const path = require("path"); // use for path operations
const CryptoJS = require("crypto-js"); // use for encryption , hashing

const dirPath = "AllFiles"; // actual DirName where all files are

const uniqueFilesWithExt = []; // Array to store unique files with extensions and hash of each file content
const duplicateNameRegex = /^(.+?) copy (\d+)$/; // Regex to find duplicate file names

// Generate hash of a file inside given filePath
const getFileHash = async (fullPath) => {
  const data = await fs.promises.readFile(fullPath);
  const wordArray = CryptoJS.lib.WordArray.create(data);
  return CryptoJS.SHA256(wordArray).toString();
};

// Move file to extension folder
const moveFileToExtensionFolder = async (file, ext) => {
  const cleanExt = ext.replace(".", "").toLowerCase(); // example: .txt -> txt
  const targetFolder = path.join(__dirname, dirPath, cleanExt);

  try {
    await fs.promises.mkdir(targetFolder, { recursive: true }); // Create folder if not exists

    const oldPath = path.join(__dirname, dirPath, file); // Get old path
    const newPath = path.join(targetFolder, file); // Get new path

    await fs.promises.rename(oldPath, newPath); // Move File from old path to new path
    console.log(`Moved: ${file} ➡️ ${cleanExt}/`); // message for debug
  } catch (err) {
    console.log(`Error moving file ${file}:`, err.message); // if error occured
  }
};

const removeDuplicateFiles = async () => {
  try {
    const files = await fs.promises.readdir(path.join(__dirname, dirPath)); // Get all files in directory

    // iterating over all files
    for (const file of files) {
      const ext = path.extname(file); // extract extension of file
      const fileName = path.basename(file, ext); // extract only name of file
      const duplicateMatch = fileName.match(duplicateNameRegex); // check name using regex
      let baseName = duplicateMatch ? duplicateMatch[1] : fileName; // if duplicate name then assign to baseName else fileName

      // Get full path
      const fullPath = path.join(__dirname, dirPath, file);

      // Check if path is file
      const stats = await fs.promises.stat(fullPath);
      if (!stats.isFile()) continue; // Skip folders

      // above function return hash of file getFileHash
      const fileHash = await getFileHash(fullPath);

      // Check if file already exists
      const alreadyExists = uniqueFilesWithExt.find(
        (obj) =>
          obj.fileName === baseName && obj.ext === ext && obj.hash === fileHash
      );

      // If file already exists then simply delete it
      if (alreadyExists) {
        console.log(`Duplicate File Found (by hash):`, file);
        await fs.promises.unlink(fullPath); // DELETE the duplicate file
        console.log(`Deleted Duplicate: ${file}`);
      }
      // Else add to uniqueFilesWithExt
      else {
        uniqueFilesWithExt.push({
          fileName: baseName,
          ext: ext,
          hash: fileHash,
        });

        // Move file to extension folder
        // at the same time add it to the Directory
        await moveFileToExtensionFolder(file, ext);
      }
    }
    console.log("\nFinal Unique files:", uniqueFilesWithExt);
  } catch (err) {
    console.log("Error in removeFn:", err.message);
  }
};

const processDirectory = async () => {
  try {
    await removeDuplicateFiles();
  } catch (err) {
    console.log("Error in Process Dir:", err.message);
  }
};

processDirectory();
