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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});