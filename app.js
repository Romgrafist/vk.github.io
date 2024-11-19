// Инициализация VK Bridge
vkBridge.send("VKWebAppInit");

document.getElementById("tattooForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Собираем данные из формы
    const formData = new FormData(e.target);
    const style = formData.get("style");
    const color = formData.getAll("color").join(", ");
    const size = formData.get("size");
    const placement = formData.get("placement");
    const contact = formData.get("contact");
    const comments = formData.get("comments");

    // Формируем сообщение
    const message = `
        🖌 Новый запрос на тату:
        - Стиль: ${style}
        - Цветность: ${color || "Не указано"}
        - Размер: ${size}
        - Место нанесения: ${placement}
        - Контакты: ${contact}
        - Комментарии: ${comments || "Нет"}
    `;

    // Отправка сообщения через VK API
    try {
        await vkBridge.send("VKWebAppCallAPIMethod", {
            method: "messages.send",
            params: {
                access_token: "ВАШ_ТОКЕН_СООБЩЕСТВА", // Замените на токен сообщества
                v: "5.131",
                peer_id: -GROUP_ID, // ID сообщества
                random_id: Date.now(),
                message: message,
            },
        });
        alert("Заявка успешно отправлена!");
    } catch (error) {
        console.error("Ошибка отправки:", error);
        alert("Произошла ошибка. Попробуйте снова.");
    }
});
