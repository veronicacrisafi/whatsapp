const input = document.querySelector("input");
const button = document.querySelector("button");
const chatBox = document.querySelector(".chat-box");

const messages = [
  {
    type: "sent",
    text: "Ciao, come va?",
    time: "26/11/2025 21:04:00",
  },
  {
    type: "received",
    text: "tutto bene grazie e tu?",
    time: "26/11/2025 21:08:00",
  },
];

// preparo l'indirizzo da chiamare
const endpoint =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyAO9c1FT7ntF_NVmxy_4P7UyZtHbGBV_QE";

//preparazione system prompt
const systemprompt =
  "Sei Silvia, un'amica che risponde in modo amichevole e informale. Rispondi in italiano, con un tono cordiale e naturale, come farebbe un'amica in una chat. Mantieni le risposte brevi e spontanee.";

//mostra i messaggi in pagina tramite la funzione
showMessages();

//aggiungo l'evento che al click mi invia il messaggio e me lo aggiunge alla lista dei messaggi
button.addEventListener("click", sendMessage);

// pressio tasto invio
input.addEventListener("keydown", function (event) {
  //controllo che il tasto sia Enter quindi invio
  if (event.key === "Enter") sendMessage();
});

function showMessages() {
  // svuoto chat
  chatBox.innerHTML = "";

  // per ciuscuno dei messaggi creami...
  for (const message of messages) {
    chatBox.innerHTML += `<div class="chat-row ${message.type}">
            <div class="chat-message">
                <p>${message.text}</p>
                <time datetime="${message.time}">${message.time}</time>
            </div>
        </div>`;
  }
}

// funzione per aggiungere i messaggi

function addMessage(messageType, messageText) {
  const newMessage = {
    type: messageType,
    text: messageText,
    time: new Date().toLocaleString(),
  };
  messages.push(newMessage);

  //mostra i messaggi in pagina tramite la funzione

  showMessages();
}

// funzione invio messaggio
function sendMessage() {
  const insertedText = input.value.trim(); //il trim controlla che non ci siano spazi vuoti
  // controllo che non sia vuoto, usando solo il return blocca tutto
  if (insertedText === "") return;
  // aggiungi il nuovo messaggio racchiuso nella funzione addMessage
  addMessage("sent", insertedText);
  //svuoto l'input dopo l'invio
  input.value = "";
  //riporta il cursore sull'input post invio
  input.focus();
  // scorro in automatico alla fine del box della chat
  chatBox.scrollTop = chatBox.scrollHeight;
}

//implementazione AI

//funzione per formattare la chat in un formato gradito a gemini
function formatChatForGemini() {
  //preparo array per nuova chat
  const formattedChat = [];

  //per ciascun messaggio
  for (const message of messages) {
    //creo e aggiungo un nuovo oggetto alla mia chat formattata
    formattedChat.push({
      parts: [{ text: message.text }],
      role: message.type === "sent" ? "user" : "model",
    });
  }

  //aggiungo il systemPromp all'inizio

  formattedChat.unshift({
    role: "user",
    parts: [{ text: systemprompt }],
  });

  return formattedChat;
}
formatChatForGemini();
