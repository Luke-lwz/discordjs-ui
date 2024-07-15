import { ButtonStyle, ActionRowBuilder, EmbedBuilder } from "discord.js";

export default function notFoundPage({
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
    .setTitle("Not Found")
    .setDescription("**404** - Page not found")
    .setColor("#63a8f7");
  render({
    components: [actionRow],
    embeds: [embed],
  });
}
