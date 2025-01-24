import { ObjectId } from 'mongodb';
import { GoogleGenerativeAI } from '@google/generative-ai';

const key = process.env.GEMINI_KEY;
const genAI = new GoogleGenerativeAI(key);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
        responseMimeType: "application/json"
    },
});

export async function getSuggestions(req, res) {
    const { listId } = req.params;
    const { listsCollection } = res.locals.db;
    const result = await listsCollection.findOne({ _id: new ObjectId(listId) }, { projection: { questions: 1, _id: 0 } });

    const questions = result?.questions;

    let prompt = '';
    if (questions.length === 0) {
        prompt = 'Suggest me 10 beginner questions to start learning Data Structures and Algorithms.'
    } else {
        prompt = "Suggest me new questions based on the topics covered in the following questions. Each topic should contain five questions and respond using this json JSON schema: Question = {'questionName': string} Topic = {'topicName': string, 'questionList': Array<Question>} Return: Array<Topic>";

        result?.questions.forEach((question, index) => {
            prompt += ` ${index + 1}. ${question.name}`
        });
    }

    try {
        const geminiResult = await model.generateContent(prompt);
        const response = geminiResult.response.text();
        let data = JSON.parse(response);
        if (!Array.isArray(data)) {
            data = data[Object.keys(data)[0]];
        }
        return res.status(200).send(data);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server Error');
    }
}