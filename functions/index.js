import * as functions from "firebase-functions";
import express from 'express';
import bodyParser from 'body-parser';
import { VertexAI } from '@google-cloud/vertexai';
import cors from 'cors'; // This line was changed
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
//const API_PORT = 3001; // The port for our backend API
app.use(cors());


// Middleware to parse JSON request bodies
app.use(bodyParser.json());


// IMPORTANT: No need for CORS middleware here because Vite's proxy handles it
//const API_KEY = process.env.GEMINI_API_KEY;
//const weatherApiKey=process.env.WEATHER_API_KEY;
const project = 'tripplanner-472108'; // Your GCP Project ID
const location = 'us-central1'; // Your Vertex AI region
const model = 'gemini-2.5-flash';


const vertex_ai = new VertexAI({ project, location });
const generativeModel = vertex_ai.getGenerativeModel({ model });
/*


async function get_weather_forecast(location, date) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(location)}&appid=${weatherApiKey}&units=metric`;


    try {
        const response = await axios.get(url);
        const forecastData = response.data;
       
        const targetDate = new Date(date);
        const targetDateString = targetDate.toISOString().split('T')[0];
       
        let dailyForecast = null;
        for (const item of forecastData.list) {
            if (item.dt_txt.startsWith(targetDateString) && item.dt_txt.includes('12:00:00')) {
                dailyForecast = item;
                break;
            }
        }
       
        if (dailyForecast) {
            return {
                conditions: dailyForecast.weather[0].description,
                temperature: dailyForecast.main.temp,
                feelsLike: dailyForecast.main.feels_like,
                humidity: dailyForecast.main.humidity,
                windSpeed: dailyForecast.wind.speed,
                rain: dailyForecast.weather[0].main === 'Rain' || dailyForecast.weather[0].description.includes('rain')
            };
        } else {
            return {
                conditions: 'not available',
                temperature: 'not available',
                rain: false
            };
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error(`Weather data not found for location: ${location}`);
            return {
                conditions: 'not found',
                temperature: 'not found',
                rain: false
            };
        } else {
            console.error("Error fetching weather data:", error.message);
            return {
                conditions: 'error',
                temperature: 'error',
                rain: false
            };
        }
    }
}


const generativeModel = vertex_ai.getGenerativeModel({
    model: 'gemini-2.5-flash',
    tools: {
        function_declarations: [{
            name: "get_weather_forecast",
            description: "Get the weather forecast for a specific location and date.",
            parameters: {
                type: "object",
                properties: {
                    location: { type: "string" },
                    date: { type: "string" }
                },
                required: ["location", "date"]
            }
        }]
    }
});


app.post('/api/generate-itinerary', async (req, res) => {
    try {
        const tripData = req.body;
        const prompt = `
            You are an AI-powered travel agent. Generate a detailed trip itinerary in JSON format. The JSON must strictly follow this structure:


            {
              "destination": "string",
              "duration": "string",
              "totalBudget": "string",
              "highlights": ["string", "string", "string"],
              "days": [
                {
                  "day": "number",
                  "title": "string",
                  "morning": { "activity": "string", "time": "string", "location": "string" },
                  "afternoon": { "activity": "string", "time": "string", "location": "string" },
                  "evening": { "activity": "string", "time": "string", "location": "string" }
                }
              ],
              "recommendations": ["string", "string", "string"]
            }


            Here are the user's preferences:
            - Destination: ${tripData.destination}
            - Start Date: ${tripData.startDate}
            - End Date: ${tripData.endDate}
            - Number of Travelers: ${tripData.travelers}
            - Budget: ${tripData.budget}
            - Trip Type: ${tripData.tripType}
            - Interests: ${tripData.interests.join(', ')}
            - Accommodation: ${tripData.accommodation}
            - Transportation: ${tripData.transportation}


            If you have access to weather information, use it to suggest activities that are suitable for the conditions (e.g., indoor activities for rain, outdoor activities for clear skies). Do not include any text or markdown outside of the JSON object.
        `;


        const chat = generativeModel.startChat();


        // Send the initial prompt to the model.
        // It will either return a function call or the final content.
        let result = await chat.sendMessage(prompt);


        // Check for a function call using optional chaining
        const functionCall = result?.response?.candidates?.[0]?.content?.parts?.[0]?.functionCall;


        if (functionCall && functionCall.name === "get_weather_forecast") {
            console.log("Model requested weather data. Executing tool...");
            const { location, date } = functionCall.args;
           
            // Execute the local function to get weather data
            const weatherData = await get_weather_forecast(location, date);
           
            // Send the function output back to the model for the final response
           


            result = await chat.sendMessage({
                role: 'tool',
                parts: [{
                    tool_response: {
                        name: "get_weather_forecast",
                        content: JSON.stringify(weatherData)
                    }
                }]
            });




            console.log("Final itinerary generated using weather data.");
        } else {
            console.log("Final itinerary generated without a function call.");
        }


        // Parse the final content, regardless of the path taken
        const finalContent = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
       
        if (finalContent) {
            const itinerary = JSON.parse(finalContent);
            res.json(itinerary);
        } else {
            console.error('AI response was empty or malformed.');
            res.status(500).json({ error: 'Failed to get a valid response from the AI.' });
        }


    } catch (error) {
        console.error('Error generating itinerary:', error);
        res.status(500).json({ error: 'Failed to generate trip itinerary.' });
    }
});


app.listen(API_PORT, () => {
    console.log(`Backend API server listening on http://localhost:${API_PORT}`);
});




*/










app.post('/generate-itinerary', async (req, res) => {
  try {
    const tripData = req.body;
    const prompt = `
      You are an AI-powered travel agent. Generate a detailed trip itinerary in JSON format. The JSON must strictly follow this structure:


      {
        "destination": "string",
        "duration": "string",
        "totalBudget": "string",
        "highlights": ["string", "string", "string"],
        "days": [
          {
            "day": "number",
            "title": "string",
            "morning": { "activity": "string", "time": "string", "location": "string" },
            "afternoon": { "activity": "string", "time": "string", "location": "string" },
            "evening": { "activity": "string", "time": "string", "location": "string" }
          }
        ],
        "recommendations": ["string", "string", "string"]
      }


      Here are the user's preferences:
      - Destination: ${tripData.destination}
      - Start Date: ${tripData.startDate}
      - End Date: ${tripData.endDate}
      - Number of Travelers: ${tripData.travelers}
      - Budget: ${tripData.budget}
      - Trip Type: ${tripData.tripType}
      - Interests: ${Array.isArray(tripData.interests) ? tripData.interests.join(', ') : 'None'}
      - Accommodation: ${tripData.accommodation}
      - Transportation: ${tripData.transportation}


      Do not include any text or markdown outside of the JSON object.
    `;


    const stream = await generativeModel.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });


    const content = stream.response.candidates[0].content.parts[0].text;
    const itinerary = JSON.parse(content);
    res.json(itinerary);


  } catch (error) {
    console.error('Error generating itinerary:', error);
    res.status(500).json({ error: 'Failed to generate trip itinerary.' });
  }
});


export const api = functions.https.onRequest(app);

/*
app.listen(API_PORT, () => {
  console.log(`Backend API server listening on http://localhost:${API_PORT}`);
});

*/






