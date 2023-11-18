const commitMessages = require("./gitlog.json");
const issues = require("./resource-app-JIRA.json");
const fs = require('fs');


for (const commitMessage of commitMessages) {
    let foundIssue = issues.find(issue => issue["Issue key"] == commitMessage.issue_id);
    if (!foundIssue) {
        console.log("Issue not found: " + commitMessage.issue_id);
        continue;
    }

    foundIssue.Description += '\n' + commitMessage.commit_message;
}



 
// stringify JSON Object
var jsonContent = JSON.stringify(issues);
 
fs.writeFile("./issues-with-commit-messages.json", jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
 
    console.log("JSON file has been saved.");
});
