const axios = require('axios');
const { keys } = require('./keys');

module.exports = { fetchIssueByKey };


// Jira credentials and API endpoint
const username = 'istvan.kadar@minero.hu';
const password = keys.jiraApiToken;
const jiraBaseUrl = 'https://codequest-minero.atlassian.net/rest/api/latest';

async function fetchIssueByKey(issueKey) {
    try {
        const response = await axios.get(`${jiraBaseUrl}/issue/${issueKey}`, {
            auth: {
                username,
                password,
            },
        });

        console.log(`Issue with key '${issueKey}':`);

        const summaryAndDesc = {
            summary: response.data.fields.summary,
            description: response.data.fields.description,
        }
        console.log(summaryAndDesc);
        return summaryAndDesc;
    } catch (error) {
        console.error('Error fetching issue from jira:', error.message);
        throw new Error('Error fetching issue from jira:', error.message)
    }
}
