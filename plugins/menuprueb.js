import fs from 'fs'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

let handler = async (m, { conn, usedPrefix }) => {
  try {
    let userId = m.sender
    let { exp, coin, level, role } = global.db.data.users[userId] || { exp: 0, coin: 0, level: 0, role: 'Sin rango' }
    let { min, xp, max } = xpRange(level, global.multiplier || 1)
    let name = await conn.getName(userId)

    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let perfil = await conn.profilePictureUrl(userId, 'image').catch(_ => 'https://files.catbox.moe/g6u1f5.jpg')
    let taguser = '@' + userId.split("@s.whatsapp.net")[0]

    let images = [
      'https://files.catbox.moe/pp7ncd.jpg',
      'https://files.catbox.moe/fcbeie.jpg',
      'https://files.catbox.moe/r0h0j5.jpg',
    ]
    let randomImage = images[Math.floor(Math.random() * images.length)]
    let totalCommands = Object.values(global.plugins).filter((v) => v.help && v.tags).length
    let emojis = '⚽'
    let error = '❌'

    let menu = `
*_~✦═ೋ『★』ೋ═✦~_*
[𔓕꯭(꯭𝗥).꯭𝗜.꯭𝗡-꯭𝗕.꯭𝗢.꯭𝗧꯭꯭𔓕]
*_~✦═ೋ『★』ೋ═✦~_*
╭──────────────
┃ *❤️ Hola ${taguser} Soy ${botname}*
╰──────────────
┏━━⌠ \`𝗜 𝗡 𝗙 𝗢 - 𝗕 𝗢 𝗧\` ⌡━━
┃╭━═┅═━––––––––─•
┃│• 𝙾𝚆𝙽𝙴𝚁: ᴏғᴄ
┃│• 𝙼𝙾𝙳𝙾: 𝙿𝚁𝙸𝚅𝙰𝙳𝙾
┃│• 𝙱𝙾𝚃: ${(conn.user.jid == global.conn.user.jid ? '`ᴏғɪᴄɪᴀʟ 🅞`' : '`sᴜʙ - ʙᴏᴛ 🅢`')}
┃│• 𝚄𝚂𝚄𝙰𝚁𝙸𝙾𝚂: ${totalreg}
┃│• 𝙲𝙾𝙼𝙰𝙽𝙳𝙾𝚂: ${totalCommands}
┃│• 𝙰𝙲𝚃𝙸𝚅𝙾: ${uptime}
┃╰━═┅═━––––––––─•
┗━━━━━━━━━━━━━━━━━━

┏━━⌠ \`𝗨 𝗦 𝗨 𝗔 𝗥 𝗜 𝗢\` ⌡━━━
┃ *╭ ╴ ╴╴╴╴╴╴╴╴╴╴╴*
┃│あ 𝙲𝙻𝙸𝙴𝙽𝚃𝙴: ${name}
┃│あ 𝙴𝚇𝙿: ${exp}
┃│あ 𝙲𝙾𝙸𝙽𝚂: ${coin}
┃│あ 𝙽𝙸𝚅𝙴𝙻: ${level}
┃│あ 𝚁𝙰𝙽𝙶𝙾: ${role}
┃ *╰ ╴ ╴╴╴╴╴╴╴╴╴╴╴*
┗━━━━━━━━━━━━━━━━━━

© ${textbot}
`.trim()

    // Botones rápidos
    const buttons = [
      { buttonId: `${usedPrefix}owner`, buttonText: { displayText: "👑 ᥴrᥱᥲძ᥆r" }, type: 1 },
      { buttonId: `${usedPrefix}code`, buttonText: { displayText: "🏔️ sᥱrᑲ᥆𝗍" }, type: 1 },
      { buttonId: `${usedPrefix}menu2`, buttonText: { displayText: "📜 mᥱᥒᥙ ᥲᥙძі᥆s" }, type: 1 }
    ]

    await conn.sendMessage(m.chat, {
      image: { url: randomImage },
      caption: menu,
      buttons: buttons,
      footer: "WHATSAPP BOT ✦⃟⛧┋ ➪ _R I N ⛧ I T O S H I_ ⚽┋⃟✧"
    }, { quoted: m })

    // Botones de lista (secciones)
    const listSections = [
      {
        title: "𝐒𝐄𝐋𝐄𝐂𝐂𝐈𝐎𝐍𝐄 𝐀𝐐𝐔𝐈",
        rows: [
          {
            title: "📥 Menú de Descargas",
            description: "🎧 Descargar desde YouTube, Facebook, IG, etc.",
            rowId: `${usedPrefix}menudescargas`
          },
          {
            title: "🔍 Menú de Búsquedas 🌐",
            description: "Buscar información, audios, videos y más.",
            rowId: `${usedPrefix}menubusquedas`
          }
        ]
      }
    ]

    await conn.sendMessage(m.chat, {
      text: "📂 Explora más comandos desde las siguientes secciones:",
      footer: "Bot WhatsApp por R I N ⚽",
      title: "🗂️ Menú Interactivo",
      buttonText: "🌟 ABRIR MENÚ 🌟",
      sections: listSections
    }, { quoted: m })

    await m.react(emojis)

  } catch (e) {
    await m.reply(`✘ Ocurrió un error al enviar el menú\n\n${e}`)
    await m.react('❌')
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'help', 'menú', 'allmenú', 'allmenu', 'menucompleto']
handler.register = true
export default handler

function clockString(ms) {
  let seconds = Math.floor((ms / 1000) % 60)
  let minutes = Math.floor((ms / (1000 * 60)) % 60)
  let hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
  return `${hours}H ${minutes}M ${seconds}S`
}
