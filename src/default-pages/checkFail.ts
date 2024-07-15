import { ButtonStyle, ActionRowBuilder, EmbedBuilder } from "discord.js";

export default function checkFailPage({
  interaction,
  ButtonBuilder,
  render,
  pathname,
}) {
  if (!interaction || !render || !ButtonBuilder) return;
  const btn = new ButtonBuilder()
    .setStyle(ButtonStyle.Secondary)
    .setLabel("🔄️")
    .navigateTo(pathname);

  const actionRow = new ActionRowBuilder().addComponents(btn);

  const embed = new EmbedBuilder()
    .setTitle("Disallowed")
    .setDescription("You are not allowed to go here")
    .setColor("#68398f");
  render({
    components: [actionRow],
    embeds: [embed],
  });
}
