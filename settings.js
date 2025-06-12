import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botNumber = '' //Ejemplo: 573218138672

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.owner = [
// <-- Número @s.whatsapp.net -->
  ['51969214380', '🜲 Propietario 🜲', true],
  ['51994114690', '🜲 Propietario 1 🜲', true],
  ['51935851085', '🜲 Propietario 2 🜲', true],
  ['51919199620', '🜲 Propietario 3 🜲', true],
  ['51988013368', '🜲 Propietario 4 🜲', true],
  
// <-- Número @lid -->
  ['117094280605916', 'black', true],
  ['258892692984006', 'DevAlexJs', true]
];

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.mods = []
global.suittag = ['51969214380'] 
global.prems = []

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.libreria = 'Baileys'
global.baileys = 'V 6.7.17' 
global.vs = '2.2.5'
global.nameqr = '𝑰𝒔𝒂𝒈𝒊-𝒖𝒍𝒕𝒓𝒂'
global.namebot = '✿𝒊𝒔𝒂𝒈𝒊 - 𝒖𝒍𝒕𝒓𝒂✿'
global.sessions = 'Sessions'
global.jadi = 'JadiBots' 
global.blackJadibts = true

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.packname = '⪛𒆜꙰ꫂ𝐈♤𝐒𝐀𝐆𝐈•-𝄟≛⃝𝐁𝐎𓆩𝐓𝄟≛⪜'
global.botname = ' ✦⃟⛧┋ ➪ _ＩＳＡＧＩ ⛧ ＹＯＩＣＨＩ_ ⚽┋⃟✧'
global.wm = 'ᬊᬁ࿔᭄ྀιʂαɠι ✿ꦿ⚽ℬ𝒪𝒯᭄✿'
global.author = 'mᥲძᥱ ᑲᥡ : 🌈ᵀ͢ᴴᴱ𝄟⏤͟͟͞͞⃝Black'
global.dev = '© Modified by:  ꧁𓊈𒆜𝖙𝖍𝖊•𝒃𝒍𝒂𝒄𝒌𒆜𓊉꧂'
global.textbot = '「 ⚽ 𝐈𝐒𝐀𝐆𝐈 - 𝐘𝐎𝐈𝐂𝐇𝐈 🌴 」• 𝙋𝙤𝙬𝙚𝙧𝙚𝙙 𝙗𝙮 ꧁⟣٭𝖙𝖍𝖊_𝚋𝚕𝚊𝚌𝚔٭⟢꧂'
global.etiqueta = '٭𝚋𝚕𝚊𝚌𝚔٭'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.moneda = 'coins'
global.welcom1 = '🏔️ Edita El Welcome con #setwelcome'
global.welcom2 = '🌿 Edita El Welcome con #setbye'
global.banner = 'https://files.catbox.moe/7m1fbp.jpg'
global.avatar = 'https://files.catbox.moe/gd7zpq.jpg'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.gp1 = 'https://whatsapp.com/channel/0029Vb6BDQc0lwgsDN1GJ31i'
global.comunidad1 = ''
global.channel = 'https://whatsapp.com/channel/0029Vb6BDQc0lwgsDN1GJ31i'
global.channel2 = 'https://whatsapp.com/channel/0029Vb6BDQc0lwgsDN1GJ31i'
global.md = 'https://github.com/the-27/Isagi-Bot.git'
global.correo = 'blackoficial2025@gmail.com'
global.cn ='https://whatsapp.com/channel/0029Vb6BDQc0lwgsDN1GJ31i';

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.catalogo = fs.readFileSync('./src/catalogo.jpg');
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}
global.ch = {
ch1: '120363416409380841@newsletter',
}
global.multiplier = 60

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment   

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})
