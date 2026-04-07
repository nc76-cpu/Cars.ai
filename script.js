const chatBox = document.getElementById("chat-box");
const input = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  fetch("YOUR_GEM_ENDPOINT_HERE", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: text })
  })
  .then(res => res.json())
  .then(data => {
    const botReply = `Of course. ${data.answer || "I'm sorry, but I don't have information about that in my documents."}`;
    addMessage(botReply, "bot");
  })
  .catch(() => {
    addMessage("I'm sorry — something went wrong on my side. Let me try again.", "bot");
  });
}
