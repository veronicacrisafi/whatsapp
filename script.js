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
