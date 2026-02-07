const logEl = document.getElementById("log");
const input = document.getElementById("cmdInput");
const btnVerMais = document.getElementById("btnVerMais");

let introRunning = true;

function esc(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

/* ===== EFEITO DIGITANDO ===== */
function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }

async function typeToLog(text, speed = 18){
  for (const ch of text){
    if (!introRunning) return;
    logEl.textContent += ch;
    await sleep(speed);
  }
}

function trimLog(){
  const maxChars = 9000;
  if (logEl.textContent.length > maxChars){
    logEl.textContent = logEl.textContent.slice(-6500);
  }
}

function addPromptLine(cmd){
  logEl.textContent += `C:\\Users\\Jean> ${cmd}\n`;
  trimLog();
}

function normalize(cmd){
  return cmd.trim().toLowerCase().replace(/\s+/g, " ");
}

/* ===== COMANDOS ===== */
function printCommands(){
  logEl.textContent +=
`Comandos e ações:
- help: mostra esta lista de comandos
- sobre: mostra quem eu sou
- servicos: mostra o que eu faço
- contato: mostra como falar comigo
- ver mais: abre a página do portfólio
- cls: limpa a tela

ou clique em VER MAIS

`;
  trimLog();
}

function sobre(){
  logEl.textContent += `Olá, eu sou o Jean Tech Studio.\n\n`;
  trimLog();
}

function servicos(){
  logEl.textContent +=
`Serviços:
- MTA (criação/configuração)
- MU Online (configuração)
- Discord (setup)
- TeamSpeak 3 (setup)
- Banner (criação)
- Edição de vídeo

`;
  trimLog();
}

function contato(){
  logEl.textContent += `Contato: adicione WhatsApp/Discord/Email no portfólio.\n\n`;
  trimLog();
}

function cls(){
  logEl.textContent = "";
}

/* ===== LÓGICA ===== */
function handle(cmdRaw){
  const cmd = normalize(cmdRaw);

  if (!cmd){
    logEl.textContent += `Digite "help" para ver os comandos.\n\n`;
    trimLog();
    return;
  }

  if (cmd === "help") return printCommands();
  if (cmd === "sobre") return sobre();
  if (cmd === "servicos" || cmd === "serviços") return servicos();
  if (cmd === "contato") return contato();
  if (cmd === "cls" || cmd === "clear" || cmd === "limpar") return cls();

  if (cmd === "ver mais" || cmd === "vermais" || cmd === "portfolio" || cmd === "portfólio"){
    window.location.href = "portfolio.html";
    return;
  }

  logEl.textContent += `'${cmd}' não é reconhecido. Digite "help".\n\n`;
  trimLog();
}

/* ===== INTRO ===== */
async function intro(){
  logEl.textContent = "";

  await typeToLog("Olá, eu sou o Jean Tech Studio.\n", 16);
  await typeToLog("Use os seguintes comandos para tais ações:\n\n", 16);

  await typeToLog(
`- help: mostra esta lista de comandos
- sobre: mostra quem eu sou
- servicos: mostra o que eu faço
- contato: mostra como falar comigo
- ver mais: abre a página do portfólio
- cls: limpa a tela

ou clique em VER MAIS

`, 14);

  introRunning = false;
}

/* ===== EVENTOS ===== */
input.addEventListener("keydown", (e) => {
  if (introRunning) introRunning = false;

  if (e.key === "Enter"){
    const v = input.value;
    addPromptLine(esc(v));
    handle(v);
    input.value = "";
  }
});

btnVerMais.addEventListener("click", () => {
  window.location.href = "portfolio.html";
});

document.addEventListener("click", () => input.focus());

input.focus();
intro();
