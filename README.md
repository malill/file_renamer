# File Renamer
Script iterates over all files in folder on same level called "files" and renames them

-> Renaming scheme is:
`oldFileName[0 - $maxIndex]$customText$appendIndex.xyz`
 
If a file name matches an already given file name, `appendIndex` increases by 1
