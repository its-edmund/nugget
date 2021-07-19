import dotenv from "dotenv";
import Discord, {
  ClientUser,
  EmbedField,
  EmbedFieldData,
  GuildMemberManager,
  Message,
} from "discord.js";
dotenv.config();

const client = new Discord.Client();

let members = [];

client.on("message", async (message) => {
  if (message.content === "&points") {
    let members = await (
      await client.guilds.fetch(message.guild.id)
    ).members.cache;

    members = members.filter((member) => {
      console.log(member.user.bot);
      return !member.user.bot;
    });

    const exampleEmbed = new Discord.MessageEmbed()
      .setColor("#ff6700")
      .setTitle("Nugget Points")
      .setDescription("Here are the points each nugget has:")
      .addFields(
        members.map((member) => {
          return {
            name: member.user.username,
            value: 5,
          } as EmbedFieldData;
        })
      )
      .setTimestamp();

    message.channel.send(exampleEmbed);
  }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);
