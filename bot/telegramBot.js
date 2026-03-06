const TelegramBot = require("node-telegram-bot-api");
const { createClient } = require("@supabase/supabase-js");

const token = process.env.TELEGRAM_BOT_TOKEN;
const appUrl = process.env.APP_URL || "https://escrovia.com";

if (!token) {
  throw new Error("Missing TELEGRAM_BOT_TOKEN");
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  await bot.sendMessage(
    chatId,
    `Welcome to Escrovia. Link your account here: ${appUrl}/dashboard?linkTelegram=true`
  );
});

bot.onText(/\/deals/, async (msg) => {
  const chatId = msg.chat.id;
  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("telegram_id", String(chatId))
    .single();

  if (!user) {
    return bot.sendMessage(chatId, "No linked account found. Use /start first.");
  }

  const { data: deals } = await supabase
    .from("deals")
    .select("id,status,amount")
    .or(`buyer_id.eq.${user.id},seller_id.eq.${user.id}`)
    .in("status", ["pending", "accepted", "escrow funded", "delivered"])
    .limit(5);

  if (!deals?.length) return bot.sendMessage(chatId, "No active deals.");

  const lines = deals.map((deal) => `#${deal.id} · ${deal.status} · $${deal.amount}`);
  return bot.sendMessage(chatId, `Active deals:\n${lines.join("\n")}`);
});

bot.onText(/\/notifications/, async (msg) => {
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, "Notifications are enabled by default for linked accounts.");
});

console.log("Escrovia Telegram bot running...");
