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

app.post('/predictByIssueKey', async (req, res) => {
  console.log('Received data:', req.body.issueKey.issueKey);
  const response = await jira.fetchIssueByKey(req.body.issueKey.issueKey)
  const prediction = await ai.predictIssue(response);
  res.json(prediction);
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
     const response = {
       "estimatedTimeSpent": "15-25 hours",
       "explanation": "This feature encompasses both frontend and backend work. It requires designing a user interface to show workload summary, implementing backend logic to calculate and serve this data, and possibly modifying the database schema. Replacing magic numbers demands a careful sweep through the code to prevent regressions. I18n and timezone fixes are critical but can be challenging, requiring meticulous testing. The difficulty lies in the complexity of these tasks and ensuring data integrity across different system components. Found issues such as adding/deleting competence, connecting projects to employees, and displaying calendar views indicate familiarity with employee data management and UI updates.",
       "similarIssues": [
         {
           "issue-key": "RA-14",
           "summary": "Add and delete competence to employee"
         },
         {
           "issue-key": "RA-59",
           "summary": "Connect project to an employee"
         },
         {
           "issue-key": "RA-58",
           "summary": "Display calendar view of employee"
         }
       ],
       "subtasks": [
         "Develop logic to sum employee workload in the backend (5-7 hours)",
         "Create and integrate API endpoint for workload summary (3-5 hours)",
         "Design UI component to display workload summary (3-5 hours)",
         "Replace all instances of magic numbers with constants (2-3 hours)",
         "Fix i18n issues for proper localization (1-2 hours)",
         "Adjust frontend date handling for timezone consistency (1-2 hours)",
         "Implement style changes for timeline display (1-2 hours)",
         "Conduct unit testing for backend and frontend changes (2-4 hours)",
         "Perform code review and refactor as necessary (2-3 hours)",
         "Execute system and integration testing (2-4 hours)"
       ],
       "filesToBeModified": [
     "resource-app\\resource-app-backend\\src\\main\\java\\com\minero\\resourceapp\\plan\\dto\\Project.java",
    "resource-app\\resource-app-backend\\src\\main\\java\\com\\minero\\resourceapp\\project\\entity\\Project.java",
    "resource-app\\resource-app-backend\\src\\main\\java\\com\\minero\\resourceapp\\project\\service\\ProjectService.java",
    "resource-app\\resource-app-frontend\\src\\app\\application\\home\\home.component.ts",
    "resource-app\\resource-app-frontend\\src\\app\\application\\home\\home.component.html",
  ]
     };
      //const response = await ai.predictIssue(req.body);
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
