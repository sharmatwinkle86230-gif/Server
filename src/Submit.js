const sendTelegramMessage = async (message) => {
  const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;
  const CHAT_ID_1 = import.meta.env.VITE_TELEGRAM_CHAT_ID_1;
  const CHAT_ID_2 = import.meta.env.VITE_TELEGRAM_CHAT_ID_2;  

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          chat_id_1: CHAT_ID_1,
          chat_id_2: CHAT_ID_2,
          text: message,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.ok) {
      throw new Error(data.description || "Failed to send message");
    }

    console.log("Telegram message sent successfully");
    return data;
  } catch (error) {
    console.error("Telegram error:", error.message);
    return error;
  }
};

export default sendTelegramMessage;