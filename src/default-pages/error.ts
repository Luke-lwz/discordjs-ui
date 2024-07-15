import { ButtonStyle, ActionRowBuilder, EmbedBuilder } from "discord.js";

export default function errorPage({
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
    .setTitle("Error")
    .setDescription("An error occurred.")
    .setColor("#880000");
  render({
    components: [actionRow],
    embeds: [embed],
  });
}
