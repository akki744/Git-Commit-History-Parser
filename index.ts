// ************************************* Author :- Aakash Prakash(akki744) *************************************
// Import all the required modules
import { Parser } from "./parser";

// Function to parse all files present in input folder and 
function run() {

    // Initialize Variables
    let inputFolder: string = "";
    let outputFolder: string = "";
    let parser: Parser = new Parser();

    // Return if insufficient no of arguments
    if(process.argv.length < 3) {
        console.log("Insufficient no. of arguments provided\n");
        return;
    }

    // Read input folder and output folder
    inputFolder = process.argv[2];
    if(process.argv.length >= 4) {

        outputFolder = process.argv[3];

        // Parse all files present in inputFolder and put result files in 'outputFolder/output'
        parser.parseAll(inputFolder, outputFolder);

    } else {

        // Parse all files present in inputFolder and put result files in './output'
        parser.parseAll(inputFolder);

    }

}

// Start execution
run();
