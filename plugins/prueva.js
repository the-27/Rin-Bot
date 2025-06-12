
import fs from 'fs';
import fetch from 'node-fetch';
import { xpRange} from '../lib/levelling.js';

let handler = async (m, { conn, usedPrefix}) => {
  try {
    let userId = m.sender;
    let taguser = '@' + userId.split("@s.whatsapp.net")[0];

    let images = [
      'https://files.catbox.moe/pp7ncd.jpg',
      'https://files.catbox.moe/fcbeie.jpg',
      'https://files.catbox.moe/r0h0j5.jpg',
    ];
    let randomImage = images[Math.floor(Math.random() * images.length)];
    let emojis = '⚽';
    let error = '❌';

    let menu = `
            *_~✦═ೋ『★』ೋ═✦~_*
       [𔓕꯭(꯭𝗥).꯭𝗜.꯭𝗡-꯭𝗕.꯭𝗢.꯭𝗧꯭꯭𔓕]
    *_~✦═ೋ『★』ೋ═✦~_*

⚙️ *Opciones disponibles:*
- 📥 *Menú de Descargas*
- 🔍 *Menú de Búsquedas*
- 🏔️ *Servicios*
- 📜 *Audios*

© RIN-BOT
`.trim();

    let sections = [
      {
        title: "📂 Selecciona una opción:",
        rows: [
          {
            title: "📥 Menú de Descargas",
            description: "Descarga contenido de YouTube, Facebook, Instagram, etc.",
            id: `${usedPrefix}menudescargas`
        },
          {
            title: "🔍 Menú de Búsquedas",
            description: "Comandos especiales para buscar información, videos y más.",
            id: `${usedPrefix}menubusquedas`
        }
        ]
      }
    ];

    let buttons = [
      { buttonId: `${usedPrefix}owner`, buttonText: { displayText: "👑 Creador"}, type: 1},
      { buttonId: `${usedPrefix}code`, buttonText: { displayText: "🏔️ Servicios"}, type: 1},
      { buttonId: `${usedPrefix}menu2`, buttonText: { displayText: "📜 Audios"}, type: 1}
    ];

    await conn.sendMessage(m.chat, {
      image: { url: randomImage},
      caption: menu,
      footer: "WHATSAPP BOT ✦⃟⛧ R I N ⛧ I T O S H I ⚽",
      viewOnce: true,
      buttons: buttons,
      sections: sections
}, { quoted: m});

    await m.react(emojis);
} catch (e) {
    await m.reply(`✘ Ocurrió un error al enviar el menú\n\n${e}`);
    await m.react(error);
 }
};

handler.help = ['menu1'];
handler.tags = ['main'];
handler.command = ['menu1'];
handler.register = true;

export default handler;
