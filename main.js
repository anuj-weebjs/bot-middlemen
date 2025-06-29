require('dotenv').config()
const { Client, WebhookClient } = require('discord.js-selfbot-v13');
const express = require('express')

const client = new Client();
const token = process.env.TOKEN_DETOXI;
const makimaUserId = "1242713384810582066";
const makimaChannelId = "1370059451620528308";
const aoiUserId = "1274410272513200128";
const aoiChannelId = "1362743916641910855";
const aoiWebhookUrl = process.env.WEBHOOK_URI;


const app = express()
const port = 3008 || process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);
})

client.on('messageCreate', async(message) => {
  if(!message.content){
    return;
  }

  console.log(`${message.guild.name}/${message.author.username}:${message.content}`)
  
  if(message.author.id == aoiUserId){  
    
    if(message.channel.id == aoiChannelId){
      await client.channels.cache.get(makimaChannelId).send(message.content);
    }

    return;
  }

  if(message.channel.id == makimaChannelId && message.author.id != "1380945181796208694") {
    const webhookClient = new WebhookClient({ url: aoiWebhookUrl });

    let name;
    if(!message.author.globalName){
      name = message.author.username;
    }else{
      name = message.author.globalName
    }
    
    webhookClient.send({
      content: message.content,
      username: name,
      avatarURL: message.author.avatarURL()
    });
  }
})

client.login(token);