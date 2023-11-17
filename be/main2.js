const openai = require('openai');
const fs = require('fs');

// Set your OpenAI API key
openai.apiKey = 'YOUR_API_KEY';

// Read your JSON dataset
const data = JSON.parse(fs.readFileSync('your_dataset.json', 'utf8'));

// Process the dataset in chunks
const chunkSize = 10; // Define your chunk size

async function processChunks() {
  for (let i = 0; i < data.length; i += chunkSize) {
    const chunk = data.slice(i, i + chunkSize);
    const completions = [];

    // Process each chunk of data
    chunk.forEach(item => {
      const { Summary, Description } = item;
      const prompt = `Issue summary: ${Summary}, Issue description: ${Description}`;

      // Push the completion promise into the array
      completions.push(
        openai.Completion.create({
          engine: 'text-davinci-002', // Adjust the engine as needed
          prompt,
          max_tokens: 150 // Adjust as needed
        })
      );
    });

    try {
      // Handle the completions for each chunk synchronously
      const responses = await Promise.all(completions);

      // Handle each response
      responses.forEach(response => {
        console.log(response.choices[0].text);
        // Do further processing with the response here
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

// Call the function to start processing chunks
processChunks();