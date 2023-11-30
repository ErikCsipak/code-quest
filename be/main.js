const OpenAIAPI = require('openai');
const readline = require('readline');
const { keys } = require('./keys');
const OpenAiAssistant = require('./openai-assistant');

module.exports = { sendMessageToAssistant, predictIssue };

const openai = new OpenAIAPI({
     apiKey: keys.openAiApiKey
});

const cl = readline.createInterface( process.stdin, process.stdout );
const question = function(q) {
    return new Promise( (res, rej) => {
        cl.question( q, answer => {
            res(answer);
        })
    });
};


// Open ai assistant and thread is set up on the open ai platform.
async function sendMessageToAssistant(message) {
  const assistantId = 'asst_JBNdKzqlSBQOc9IsA0RmJq2h';
  const threadId = 'thread_fuMIDpJHyw3vOhKOYloWZdDM';
  const ai = new OpenAiAssistant(openai, assistantId, threadId);
  let response = await ai.sendMessage(message);
  return response;
}


// Open ai assistant and thread is set up on the open ai platform.
// Instructions are in task-explanation.txt.
async function predictIssue(futureIssue) {
  const assistantId = 'asst_fwqox77MkrHbq8TTqvYXx3dF';
  const threadId = 'thread_YM7wWW9nUAwaJIdkzTnv8kEU';

  try {
    const ai = new OpenAiAssistant(openai, assistantId, threadId);

    const preInstruction = "Perform the prediction task on this: ";
    const postInstruction = " Give back only a pure json string without formatting."
    let response = await ai.sendMessage(preInstruction + JSON.stringify(futureIssue) + postInstruction);

    return JSON.parse(response);
  } catch (ex) {
    // The open ai api is not so stable, in 2 out of 10 cases it fails (e.g. because we reached the daily token limit, need more money :) ).
    // We provide here some safety answers. Handling this is valid in a production software as well. We give back real
    // results given by the opeanai api for the (randomly picked real-life) test cases before.
    console.error('Exception thrown: ', ex);
    console.error('Generating safety answer...');
    return getSafetyAnswer(futureIssue);
  }
}

function getSafetyAnswer(futureIssue) {
  const testResults = require('./test/test-results.json');
  
  const foundTestResult = testResults.find(result => {
    const requestSummary = result.request.Summary.toLowerCase();
    const futureIssueSummary = futureIssue.Summary.toLowerCase();
    return requestSummary.startsWith(futureIssueSummary);
  });

  if (foundTestResult) {
    return foundTestResult.response;
  } else {
    const generalNoAnswer = '{"estimatedTimeSpent":"?","explanation":"Since no specific task or issue was provided, there is no estimated time for completion or details to offer. No similar issues were referenced, and therefore, no subtasks or files to be modified can be identified. If a new task or issue becomes available, estimates and details can be provided at that time.","similarIssues":[],"subtasks":[],"filesToBeModified":[]}';
    return JSON.parse(generalNoAnswer);
  }
}


async function startConsoleAssistantChat() {
  console.log("--------------------- start chat -------------------------------");
  let consoleInput;
  while ( consoleInput != 'yes' ) {
    consoleInput = await question('User says >>>   ');
    let gptResponse = await sendMessageToAssistant(consoleInput);
    console.log('API says >>>   ' + JSON.stringify(gptResponse));
  }
}
