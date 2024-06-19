import { exec } from 'child_process';

// Function to run each script sequentially
function runScripts() {
    console.log('Starting reset.js...');
    exec('node reset.js', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error running server.js: ${error.message}`);
            return;
        }
        console.log(stdout);

        console.log('Starting server.js...');
        exec('node server.js', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error running reset.js: ${error.message}`);
                return;
            }
            console.log(stdout);
            console.log('Both scripts have finished running.');
        });
    });
}

// Run the scripts
runScripts();
