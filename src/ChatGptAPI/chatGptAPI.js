import axios from 'axios'
import { messages } from '../Dialog-context';

const apiKey = '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';
const endpoint = 'https://api.openai.com/v1/chat/completions';

export const chatGptAPI = {

    sendMessageToGPT(message) {

        messages.push({ role: "user", content: message })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
        };

        const data = {
            model: 'gpt-3.5-turbo',
            messages,
        };

        return axios.post(endpoint, data, config)
            .then((res) => {
                messages.push({ role: "assistant", content: res.data.choices[0].message.content })
                return res.data
            })
            .catch((error) => {
                console.log(error)
            })
    },

}









