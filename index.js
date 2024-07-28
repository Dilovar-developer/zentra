const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/send-message', async (req, res) => {
  const { name, phone, email, message } = req.body;
  const text = `Имя: ${name}\nТелефон: ${phone}\nEmail: ${email}\nСообщение: ${message}`;

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: text
    });
    res.send('Сообщение отправлено!');
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send('Ошибка при отправке сообщения');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
