// ************************************* Author :- Aakash Prakash(akki744) *************************************
// Import all the required modules
import * as fs from "fs";
import * as lineReader from "line-reader";

// Enum to specify format type of the commit
// ThreeLine - Commit, Author, Date and Message
// FourLine - Commit, Merge, Author, Date and Message
enum FormatType{
    ThreeLine = 1,
    FourLine,
    Other
}

// Function to remove all the unnecessary appended data from the message
function filterMessage(message: string, line: string) {
    if(message.indexOf(line) == -1) {
        return message;
    }
    return message.substring(0, message.indexOf(line));
}

// Parser class to parse git commit history .txt files to formatted .json file
export class Parser{

    // Function to parse an 'inputFile' and create an 'outputFile'
    public parse(inputFile: string, outputFolder: string = "./") {

        // Verify the format for output folder
        if(outputFolder[outputFolder.length - 1] !== "/") {
            outputFolder += "/";
        }

        // If incorrect output folder is provided use current directory
        if(!fs.existsSync(outputFolder)) {
            outputFolder = "./";
        }

        // Extract name of input file from input file path 
        let start: number = 0;
        let end: number = 0;
        if (inputFile.lastIndexOf("/") !== -1) {
            start = inputFile.lastIndexOf("/") + 1;
        }
        if(inputFile.lastIndexOf(".") !== -1) {
            end = inputFile.lastIndexOf(".");
        }

        // Create output file name from input file name
        let outputFile: string = outputFolder + inputFile.substring(start, end) + " - output.json";

        // Make sure that the output file name doesn't exist in the output folder
        let count = 1;
        while (fs.existsSync(outputFile)) {
            outputFile = outputFile.substring(0, outputFile.indexOf(" - output")) + " - output"
            + count.toString() + ".json";
            count++;
        }

        // Proceed only if the input file exists
        if (fs.existsSync(inputFile)) {

            // Define Variables
            let line1: string = "";
            let line2: string = "";
            let line3: string = "";
            let line4: string = "";
            let message: string = "";
            let results: any = {};
            let result: any;
            let atleastOne: boolean = false;

            // Initialize result object members
            results.count = 0;
            results.values = [];

            // Perform the following operations for each line
            lineReader.eachLine(inputFile, function(line, last) {
                
                // Proceed only if it is not an empty line
                if(line.trim() !== "") {

                    // Shift the lines by one place
                    line1 = line2;
                    line2 = line3;
                    line3 = line4;
                    line4 = line.trim();
                    
                    // Find format type of the commit
                    let type: number = FormatType.Other;

                    if(line1.startsWith("commit") && line2.startsWith("Merge:") && 
                        line3.startsWith("Author:") && line4.startsWith("Date:")) {
                    
                        type = FormatType.FourLine;
                    
                    } else if(line2.startsWith("commit") && line3.startsWith("Author:") &&
                                line4.startsWith("Date:")) {
                    
                        type = FormatType.ThreeLine;
                    
                    }
                    
                    // Append the current line to the message
                    message += line;
                    message += "\n";

                    // Do the following for three line commit format type 
                    if (type == FormatType.ThreeLine) {

                        // Add the commit details to result only if it is not the first time
                        if(atleastOne) {
                            message = filterMessage(message, line2);
                            result.message = message.trim();
                            results.values.push(result);
                        }

                        // Create a new result object
                        // Extract the data from each line removing all the headers from the lines
                        result = {};
                        result.commit = line2.substring("commit".length, line2.length).trim();
                        result.merge = "";
                        result.author = line3.substring("Author:".length, line3.length).trim();
                        result.date = line4.substring("Date:".length, line4.length).trim();

                        // Next time will not be the first time
                        atleastOne = true;

                        // Initialize message
                        message = "";
                    
                    } 
                    // Do the following for four line commit format type 
                    else if (type == FormatType.FourLine) {

                        // Add the commit details to result only if it is not the first time
                        if(atleastOne) {
                            message = filterMessage(message, line1);
                            result.message = message.trim();
                            results.values.push(result);
                        }
                        
                        // Create a new result object
                        // Extract the data from each line removing all the headers from the lines
                        result = {};
                        result.commit = line1.substring("commit".length, line1.length).trim();
                        result.merge = line2.substring("Merge:".length, line2.length).trim();
                        result.author = line3.substring("Author:".length, line3.length).trim();
                        result.date = line4.substring("Date:".length, line4.length).trim();

                        // Next time will not be the first time
                        atleastOne = true;

                        // Initialize message
                        message = "";
                        
                    }

                }

                // Do the following if it is the last line
                if(last){

                    // Do the following if there is atleast one commit in the input file
                    if(atleastOne) {

                        // Push the last result object to the results object
                        result.message = message.trim();
                        results.values.push(result);

                        // Set the total no. of commits
                        results.count = results.values.length;
                        
                        // Write the results object to the output file
                        fs.writeFile(outputFile, JSON.stringify(results), "utf8", function(err) {
                            if (err != null) {
                            console.log(err);
                            }
                        });
                    
                    }

                }

            });

        }

    }

    // Parse all files and outputFolder is optional
    public parseAll(inputFolder: string, outputFolder: string = "./") {

        // Verify the format for input folder and output folder
        if(inputFolder[inputFolder.length - 1] !== "/") {
            inputFolder += "/";
        }
        if(outputFolder[outputFolder.length - 1] !== "/") {
            outputFolder += "/";
        }

        // If incorrect output folder is provided use current directory
        if(!fs.existsSync(outputFolder)) {
            outputFolder = "./";
        }

        // Create an output folder in the outputFolder if not already exists
        outputFolder += "output/";
        if(!fs.existsSync(outputFolder)) {
            fs.mkdirSync(outputFolder);
        }

        // Proceed only if the input folder exists
        if (fs.existsSync(inputFolder)) {

            // Do the following for each input file
            for (const inputFile of fs.readdirSync(inputFolder)) {
                
                // Parse the input file
                this.parse(inputFolder + inputFile, outputFolder);

            }

        }

    }

}