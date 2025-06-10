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
  ['51969214380', '🜲 Propietario 🜲', true],
  ['51994114690', '🜲 Propietario 1 🜲', true],
  ['51935851085', '🜲 Propietario 2 🜲', true],
  ['51919199620'],
  ['51988013368']
];

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.mods = []
global.suittag = ['51969214380'] 
global.prems = []

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.libreria = 'Baileys'
global.baileys = 'V 6.7.16' 
global.vs = '2.2.0'
global.nameqr = '𝒓𝒊𝒏-𝒖𝒍𝒕𝒓𝒂'
global.namebot = '✿𝒓𝒊𝒏 - 𝒖𝒍𝒕𝒓𝒂✿'
global.sessions = 'Sessions'
global.jadi = 'JadiBots' 
global.blackJadibts = true

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.packname = '⪛𒆜꙰ꫂ𝐑♤𝐈𝐍•-𝄟≛⃝𝐁𝐎𓆩𝐓𝄟≛⪜'
global.botname = '✦⃟⛧┋ ➪ _R I N ⛧ I T O S H I_ ⚽┋⃟✧'
global.wm = 'ᬊᬁ࿔᭄ྀɾιɳ ✿ꦿ⚽ℬ𝒪𝒯᭄✿'
global.author = 'mᥲძᥱ ᑲᥡ : 🌈ᵀ͢ᴴᴱ𝄟⏤͟͟͞͞⃝Black'
global.dev = '© Modified by:  ꧁𓊈𒆜𝖙𝖍𝖊•𝒃𝒍𝒂𝒄𝒌𒆜𓊉꧂'
global.textbot = '「 ⚽ 𝐑𝐈𝐍 - 𝐈𝐓𝐎𝐒𝐇𝐈 🌴 」• 𝙋𝙤𝙬𝙚𝙧𝙚𝙙 𝙗𝙮 ꧁⟣٭𝖙𝖍𝖊_𝚋𝚕𝚊𝚌𝚔٭⟢꧂'
global.etiqueta = '٭𝚋𝚕𝚊𝚌𝚔٭'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.moneda = 'coins'
global.welcom1 = '🏔️ Edita Con El Welcome con #setwelcome'
global.welcom2 = '🏔️ Edita Con El Welcome con #setbye'
global.banner = 'https://files.catbox.moe/3w0epg.jpg'
global.avatar = 'https://files.catbox.moe/pp7ncd.jpg'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.gp1 = 'https://whatsapp.com/channel/0029Vb6BDQc0lwgsDN1GJ31i'
global.comunidad1 = ''
global.channel = 'https://whatsapp.com/channel/0029Vb6BDQc0lwgsDN1GJ31i'
global.channel2 = 'https://whatsapp.com/channel/0029Vb6BDQc0lwgsDN1GJ31i'
global.md = 'https://github.com/the-27/Rin-Bot.git'
global.correo = 'blackoficial2025@gmail.com'
global.cn ='https://whatsapp.com/channel/0029Vb6BDQc0lwgsDN1GJ31i';

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.gp1 = 'https://chat.whatsapp.com/CDw7hpI30WjCyKFAVLHNhZ'
global.comunidad1 = 'https://chat.whatsapp.com/I0dMp2fEle7L6RaWBmwlAa'
global.channel = 'https://whatsapp.com/channel/0029VbAfPu9BqbrEMFWXKE0d'
global.channel2 = 'https://whatsapp.com/channel/0029VbAfPu9BqbrEMFWXKE0d'
global.md = 'https://github.com/The-King-Destroy/Yuki_Suou-Bot'
global.correo = 'thekingdestroy507@gmail.com'
global.cn ='https://whatsapp.com/channel/0029VapSIvR5EjxsD1B7hU3T';

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.catalogo = fs.readFileSync('./src/catalogo.jpg');
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}
global.ch = {
ch1: '120363417186717632@newsletter',
}
global.multiplier = 70

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
