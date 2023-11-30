const express = require('express');
const cors = require('cors');
const ai = require('./main');
const jira = require('./jira');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

/**
 * POST /chat
 * 
 * request body: 
 * {
 *   message: "Some message"
 * }
 * 
 * response body: {
 *   message: "Some message"
 * }
 */
app.post('/chat', async (req, res) => {
    console.log('Received data:', req.body);
    const receivedMessage = req.body.message;
    const responseMessage = await ai.sendMessageToAssistant(receivedMessage);
    console.log('Chat response: ', responseMessage);
    res.json({ message: responseMessage });
});


/**
 * POST /predict
 * 
 * Example request:
 * {
 *     "Summary": "Summarise the workload of an employee",
 *     "Description": "On the line of the employee, the user can see the total planned workload for the employee. Replace magic numbers with constant. Fix mistakes regarding i18n\nCast dates to strings to avoid issues with timezones Fix date intervals on frontend\nDisplay summaries and style timeline Generate API",
 *  }


   Example response:
   {
      "estimatedTimeSpent": "1-2 hours",
      "explanation": "Extending an existing DTO (Data Transfer Object) to include a new field is typically a quick task. It requires adding a new property to the DTO class and ensuring it's correctly used in any serialization/deserialization logic, as well as updating associated API endpoints if required. Based on RA-78, which involved similar DTO modification work and had a total time spent of approximately 11.5 hours, the task of adding a single field is much less involved and should therefore be on the lower end of the effort spectrum. Given that no issues related to database migration or complex business logic were indicated, a 1-2 hours range is estimated.",
      "similarIssues": [
         {
               "issue-key": "RA-78",
               "summary": "UpdateProject API"
         }
      ],
      "subtasks": [
         "Add project status field to ProjectTableDTO class (0.5 hours)",
         "Update any affected serialization/deserialization logic (0.5 hours)",
         "Reflect new DTO structure in API documentation (0.5 hours)",
         "Code review (0.5 hours)"
      ],
      "filesToBeModified": [
         "resource-app-backend/src/main/java/com/minero/resourceapp/project/dto/ProjectTableDTO.java",
         "resource-app-frontend/src/shared/api/generated/model/projectTableDTO.ts"
      ]
   }
 * 
 */
app.post('/predict', async (req, res) => {
   try {
      console.log('Received data:', req.body);
      const response = await ai.predictIssue(req.body);
      res.json(response);
   } catch (ex) {
      console.error(ex);
      res.statusCode = 500;
      res.json({
         errorMessage: ex.errorMessage
      });
   }
});

/**
 * GET /jira/issue/:issue-key
 * 
 * Example response:
 *   GET http://localhost:3000/jira/issue/RA-1
 * 
 * Example response body:
 *  {
 *   "summary": "Test issue in Jira",
 *   "description": "Some description here 😉"
 *  }
 */
app.get('/jira/issue/:key', async (req, res) => {
   const issueKey = req.params.key;
   const issue = await jira.fetchIssueByKey(issueKey);
   res.json(issue);
 });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});