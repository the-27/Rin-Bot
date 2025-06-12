¡
import fs from 'fs';
import fetch from 'node-fetch';
import { xpRange} from '../lib/levelling.js';

let handler = async (m, { conn, usedPrefix}) => {
  try {
    let userId = m.sender;
    let userData = global.db.data.users[userId] || { exp: 0, coin: 0, level: 0, role: 'Sin rango'};
    let { exp, coin, level, role} = userData;
    let { min, xp, max} = xpRange(level, global.multiplier || 1);
    let name = await conn.getName(userId);
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);
    let totalreg = Object.keys(global.db.data.users).length;
    let perfil = await conn.profilePictureUrl(userId, 'image').catch(() => 'https://files.catbox.moe/g6u1f5.jpg');
    let taguser = '@' + userId.split("@s.whatsapp.net")[0];

    let images = [
      'https://files.catbox.moe/pp7ncd.jpg',
      'https://files.catbox.moe/fcbeie.jpg',
      'https://files.catbox.moe/r0h0j5.jpg'
    ];
    let randomImage = images[Math.floor(Math.random() * images.length)];
    let totalCommands = Object.values(global.plugins).filter(v => v.help && v.tags).length;

    let menu = `
🎩 *Hola ${taguser}, soy ${botname}*
📌 *Modo:* Privado
📊 *Usuarios:* ${totalreg}
🔧 *Comandos disponibles:* ${totalCommands}
⏳ *Tiempo activo:* ${uptime}

🎯 *Tu Perfil:*
👤 *Cliente:* ${name}
💎 *Exp:* ${exp}
🪙 *Coins:* ${coin}
📈 *Nivel:* ${level}
🏆 *Rango:* ${role}`;

    let sections = [
      {
        title: "🛠️ Opciones",
        rows: [
          { title: "📥 Descargas", description: "Descarga contenido de plataformas como YouTube, Facebook, etc.", id: `${usedPrefix}menudescargas`},
          { title: "🔍 Búsquedas", description: "Encuentra información en línea, música, videos y más.", id: `${usedPrefix}menubusquedas`}
        ]
}
    ];

    const buttons = [
      { buttonId: `${usedPrefix}owner`, buttonText: { displayText: "👑 Creador"}, type: 1},
      { buttonId: `${usedPrefix}code`, buttonText: { displayText: "🏔️ Servidor"}, type: 1},
      { buttonId: `${usedPrefix}menu2`, buttonText: { displayText: "📜 Menú Audios"}, type: 1}
    ];

    await conn.sendMessage(m.chat, {
      image: { url: randomImage},
      caption: menu,
      buttons: buttons,
      footer: "WHATSAPP BOT ✦⃟⛧┋ ➪ _R I N ⛧ I T O S H I_ ⚽┋⃟✧",
      viewOnce: true
}, { quoted: m});

    await m.react('⚽');
} catch (e) {
    await m.reply(`❌ Ocurrió un error al enviar el menú:\n\n${e.message}`);
    await m.react('❌');
}
};

handler.help = ['menu'];
handler.tags = ['main'];
handler.command = ['menu', 'help', 'menú', 'menucompleto'];
handler.register = true;
export default handler;

function clockString(ms) {
  let seconds = Math.floor((ms / 1000) % 60);
  let minutes = Math.floor((ms / (1000 * 60)) % 60);
  let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  return `${hours}H ${minutes}M ${seconds}S`;
}
