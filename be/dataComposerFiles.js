const fs = require('fs');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

const commitMessages = require("./data/gitlog.json");
const issues = require("./data/issues-with-commit-messages-extracted.json");

async function executeCommand(command) {
    try {
      const { stdout, stderr } = await exec(command);
  
      if (stderr) {
        console.error(`Error: ${stderr}`);
        return []; // Return empty array on error
      }
  
      // Split the stdout into an array of lines
      const outputLines = stdout.split('\n').map(line => line.trim()).filter(Boolean);
      
      return outputLines;
    } catch (error) {
      console.error(`Error executing command: ${error}`);
      return []; // Return empty array on error
    }
}

async function main() {
  for (const issue of issues) {
    issue.modifiedFiles = [];
  }

  for (const commitMessage of commitMessages) {
      let foundIssue = issues.find(issue => issue["Issue key"] == commitMessage.issue_id);
      if (!foundIssue) {
          console.log("Issue not found: " + commitMessage.issue_id);
          continue;
      }

      const filesInCommit = await executeCommand('cd c:\\work\\code_quest\\git\\resource-app && git show --pretty="" --name-only ' + commitMessage.hash);
      if (!foundIssue.modifiedFiles) {
        foundIssue.modifiedFiles = [];
      }
      let mergedFileList = Array.from(new Set(foundIssue.modifiedFiles.concat(filesInCommit)));
      foundIssue.modifiedFiles = mergedFileList;

      // foundIssue.Description += '\n' + commitMessage.commit_message;
  }

  for (const issue of issues) {
    issue.modifiedFiles = issue.modifiedFiles.join(', ');
  }


  // stringify JSON Object
  var jsonContent = JSON.stringify(issues);
  
  fs.writeFile("./issues-with-files-extracted-3.json", jsonContent, 'utf8', function (err) {
      if (err) {
          console.log("An error occured while writing JSON Object to File.");
          return console.log(err);
      }
  
      console.log("JSON file has been saved.");
  });
}

main();
