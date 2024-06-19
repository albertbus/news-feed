const fs = require('fs');
const path = require('path');

// Function to delete files ending with '_rss_feed.json'
function deleteRSSFiles(folderPath) {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach(file => {
            if (file.endsWith('_rss_feed.json')) {
                const filePath = path.join(folderPath, file);
                fs.unlink(filePath, err => {
                    if (err) {
                        console.error(`Error deleting file ${filePath}:`, err);
                    } else {
                        console.log(`Deleted file: ${filePath}`);
                    }
                });
            }
        });
    });
}

// Usage: Replace 'folderPath' with the path to your folder containing the files
const folderPath = './'; // Example: './data' or './files'
deleteRSSFiles(folderPath);
