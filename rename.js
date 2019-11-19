/**
 * Script iterates over all files in folder on same level called "files" and renames them
 * -> Renaming scheme is:
 * 
 *  oldFilenName[0 - $maxIndex]$customText$appendIndex.xyz
 * 
 * If a file name matches an already given file name, appendIndex increases by 1
 */

var fs = require('fs');

var maxIndex = 10;
var customText = "_";

var fileFolderPath = "files";
var newFileArray = [];

fs.readdir(fileFolderPath, (err, files) => {
    if (err) {
        console.log(">>> ERROR: ", err);
        return;
    }

    files.forEach((oldFile, index) => {
        var appendIndex = 1;
        var newFile = getNewFile(oldFile, maxIndex, appendIndex);
        // If first newFile is equal to old file skip
        if (newFile == oldFile) {
            console.log(">>> SKIP: " + oldFile);
            return;
        }
        // Check if new file is already in folder and rename file with increased index
        while (newFileArray.includes(newFile) || files.includes(newFile)) {
            appendIndex++;
            newFile = getNewFile(oldFile, maxIndex, appendIndex);
            // Detect if the oldFile is already set to a newFile
            if (newFile == oldFile) {
                console.log(">>> SKIP: " + oldFile);
                return;
            }
        }
        // When newFile is already available with exact same name do nothing
        if (files.includes(newFile)) {
            console.log(">>> SKIP: " + oldFile);
            return;
        }
        newFileArray.push(newFile);
        var oldFilePath = fileFolderPath + "/" + oldFile;
        var newFilePath = fileFolderPath + "/" + newFile;
        renameFile(oldFilePath, newFilePath);
    })
})

getNewFile = (file, maxIndex, appendingText) => {
    let dotIndex = file.indexOf(".");
    let fileSubstring = file.substr(0, maxIndex);
    let fileEnding = file.substr(dotIndex, file.length);
    let newFile = fileSubstring + customText + appendingText + fileEnding;
    return newFile;
}

renameFile = (oldPath, newPath) => {
    console.log(">>> RENAMING: " + oldPath + " TO " + newPath);
    fs.rename(oldPath, newPath, (err) => {
        if (err) {
            console.log(">>> ERROR: ", err);
        }
    });
}