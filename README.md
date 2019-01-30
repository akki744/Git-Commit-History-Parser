# Git Commit History Parser

It enables you to convert your git commit history or git logs from a `.txt` file to a structured `.json` file which can further be used for various analysis purposes.

### Prerequisites
- Install [Node.JS](https://nodejs.org/en/ "Node.JS").
- Install [Typescript](https://www.npmjs.com/package/typescript "Typescript") globally. (`npm install -g typescript`)
- Install [Visual Studio Code](https://code.visualstudio.com/ "Visual Studio Code") or any other editor.

### Getting Started
- Clone this repository on your local.
- Open Command Prompt.
- Run `cd {projectRootDirectory}` to navigate to the project root directory and then run `npm install`to install all the dependency packages.
- Go to any of your git project root folder and open [Git Bash](https://git-scm.com/downloads "Git Bash") and run `git log > logs.txt` to get the git commit history or git logs in `logs.txt` file.
- Copy the `logs.txt` file to `{projectRootDirectory}/data/`.
- Now, go back to the current project root folder and run `build.bat "./data" "{path-to-output-folder}"`.

	For Example: `build.bat "./data" "./"`
- A `.json` file for each input file will be created in the output folder.

#### input.txt
    commit 32464ba4fed0cf9c530ff5a577394890a2779e8a
    Merge: c071139 28f5c6b
    Author: Aakash Prakash <aakash.prakash@accoliteindia.com>
    Date:   Thu Jan 24 12:48:21 2019 +0530
    
        Second Commit
    
    commit e2450846b1b76857f6433eb1462e3fd8c1c03020
    Author: Aakash Prakash <aakash.prakash@accoliteindia.com>
    Date:   Wed Jan 23 19:08:16 2019 +0530
    
        First Commit
    


#### output.json

    {
        "count": 2,
        "values": [
            {
                "commit": "32464ba4fed0cf9c530ff5a577394890a2779e8a",
                "merge": "c071139 28f5c6b",
                "author": "Aakash Prakash <aakash.prakash@accoliteindia.com>",
                "date": "Thu Jan 24 12:48:21 2019 +0530",
                "message": "Second Commit"
            },
            {
                "commit": "e2450846b1b76857f6433eb1462e3fd8c1c03020",
                "merge": "",
                "author": "Aakash Prakash <aakash.prakash@accoliteindia.com>",
                "date": "Wed Jan 23 19:08:16 2019 +0530",
                "message": "First Commit"
            }
        ]
    }

**Note: If no path to output folder is provided then it will automatically take the current directory.**
