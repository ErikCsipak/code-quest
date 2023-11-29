const express = require('express');
const cors = require('cors');
const ai = require('./main');

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
    res.json({ message: responseMessage });
});


/**
 * POST /predict
 * 
 * Example request:
 * {
      "Summary": "Summarise the workload of an employee",
      "Description": "On the line of the employee, the user can see the total planned workload for the employee. Replace magic numbers with constant. Fix mistakes regarding i18n\nCast dates to strings to avoid issues with timezones Fix date intervals on frontend\nDisplay summaries and style timeline Generate API",
   }


   Example response
   {
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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});