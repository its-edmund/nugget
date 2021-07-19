import dotenv from "dotenv";
import cron from "cron";
import Discord, {
  ClientUser,
  EmbedField,
  EmbedFieldData,
  GuildMemberManager,
  Message,
  TextChannel,
} from "discord.js";
dotenv.config();

const client = new Discord.Client();

let members = [];

client.on("ready", () => {
  // 50 7 * * 0
  const scheduledReminder = new cron.CronJob("50 7 * * 0", async () => {
    const guild = await client.channels.fetch("766184350446125108");
    (guild as TextChannel).send("@everyone Time for nuggets meeting!");
  });

  scheduledReminder.start();
});

client.on("message", async (message) => {
  if (message.content === "&points") {
    let members = await client.guilds.cache.get("766184350446125106").members
      .cache;

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
