const Discord = require('discord.js');
const client = new Discord.Client({disableEveryone : true});
const channel = new Discord.Channel(client);
const config = require("./config.json")
const prefix = config.prefix
const owner_id = config.owner_id
const fs = require('fs')
const opus = require('node-opus')


client.login(config.token);
client.on('ready', () => {

console.log(`online`);
});


	client.on('message', msg => {

	if (msg.content.toLowerCase().includes('@everyone')) return;
	if (msg.content.toLowerCase().includes('@here')) return; //usually unnecessary because of "disableEveryone : true"
	if (msg.author.bot) return;
	let server = msg.member.guild


	if (msg.content.toLowerCase().startsWith(prefix + 'leave')) {

			if (msg.member.voiceChannel === undefined) msg.channel.send('join a voice channel first'); return;

			msg.channel.send('bye ' + msg.author.username + ' <:wave:597914311423426560>');
			msg.member.voiceChannel.leave(); 

	}else if (msg.content.toLowerCase().startsWith(prefix + 'play')) {
			msg.member.voiceChannel.join().then(function(connection){
			console.log('Joined voice channel for ' + msg.author.username + ' in ' + msg.member.guild)
		const { Client, RichEmbed } = require('discord.js');
		const embed = new Discord.RichEmbed()
			.setAuthor(msg.author.avatarURL, msg.author.tag)
			.setDescription('joined ' + msg.member.voiceChannel.name)			
			.setColor(msg.member.displayHexColor)
		msg.channel.send(embed); });

	}else if (msg.content.length === 1) {

	console.log('===\n' + msg.author.username + ', ' + msg.channel.name)

	const filename = './sounds/' + msg.content + '.mp3'

	fs.exists(filename, (exists) => {

		if (exists) { (function(connection) { connection.playFile(filename); }); } }); } });
	

