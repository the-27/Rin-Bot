
import fs from 'fs'
import fetch from 'node-fetch'
import { xpRange} from '../lib/levelling.js'

let handler = async (m, { conn, usedPrefix, __dirname}) => {
  try {
    let userId = m.sender
    let { exp, coin, level, role} = global.db.data.users[userId] || { exp: 0, coin: 0, level: 0, role: 'Sin rango'}
    let { min, xp, max} = xpRange(level, global.multiplier || 1)
    let name = await conn.getName(userId)

    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let perfil = await conn.profilePictureUrl(userId, 'image').catch(_ => 'https://files.catbox.moe/g6u1f5.jpg')
    let taguser = '@' + userId.split("@s.whatsapp.net")[0]

    let images = [
      'https://files.catbox.moe/pp7ncd.jpg',
      'https://files.catbox.moe/fcbeie.jpg';
      'https://files.catbox.moe/r0h0j5.jpg'
    ]
    let randomImage = images[Math.floor(Math.random() * images.length)]
    let totalCommands = Object.values(global.plugins).filter((v) => v.help && v.tags).length;
    let emojis = '⚽'
    let error = '❌'

    let menu = `
        *_~✦═ೋ『★』ೋ═✦~_*
       [𔓕꯭(꯭𝗜).꯭𝗦.꯭𝗔.꯭𝗚.꯭𝗜-꯭𝗕.꯭𝗢.꯭𝗧꯭꯭𔓕]
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
‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎
ꪶ𝆺𝆭𝆹𝅥ᜓ᮫𝆂߭݊🅻𝝸᪵ᜓ᮫𝆂߭݊ꥇ𝐒꯭፝֟𝐓ꥇ᮫݊߭ᜓ𝐀᪵ᜓ᮫𝆂߭⿻፝֟͢🅳ꭼ𝆂ꥇ꯭፝֟𝐂𝐨𝐦𝐚𝐧𝐝𝐨𝐬ꥇ݊߭𝆺𝅥𝆹𝆭ꫂ
─҉͙͙͙͙͙͙͙͙͙͙͛-♡--^┄┅┉┅┄⧫◊┄┄┉┅┄^--♡-──҉͙͙͙͙͙͙͙͙͙͙͛
*✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧*
> ᥴrᥱᥲ ᥙᥒ *sᥙᑲ-ᑲ᥆𝗍* ᥴ᥆ᥒ 𝗍ᥙ ᥒúmᥱr᥆ ᥙ𝗍іᥣіzᥲᥒძ᥆ *#qr* o *#code*
ׅׄ︶ٜٜٜٜׄ߭ׄ߭ׄ߭ׄ߭⏝ׅׄ︶ٜٜׄ߭ׄ߭⏝ׄ.ׅ︶ٜٜׄ߭ׄ߭⏝ׅׄ︶ٜٜׄ߭ׄ߭⏝ٜׄׄ߭⏝ׅׄ.︶ٜٜٜٜׄ߭ׄ߭ׄ߭ׄ߭

╭──⬣「 *🏔️ _INFO_ ❕* 」⬣
│ ≡◦ .menu
│ ≡◦ .uptime
│ ≡◦ .script
│ ≡◦ .staff
│ ≡◦ .creador
│ ≡◦ .grupos
│ ≡◦ .estado
│ ≡◦ .infobot
│ ≡◦ .sug
│ ≡◦ .ping
│ ≡◦ .reportar *<text>*
│ ≡◦ .reglas
│ ≡◦ .speed
│ ≡◦ .sistema
│ ≡◦ .usuarios
│ ≡◦ .ds
│ ≡◦ .funciones
│ ≡◦ .editautoresponder
╰───────────────╯

╭──⬣「 *🔎 _SEARCH_ 🔍* 」⬣
│ ≡◦ .animeinfo
│ ≡◦ .animesearch
│ ≡◦ .cuevana
│ ≡◦ .githubsearch
│ ≡◦ .searchhentai
│ ≡◦ .google *<búsqueda>*
│ ≡◦ .imagen *<query>*
│ ≡◦ .infoanime
│ ≡◦ .githubstalk *<query>*
│ ≡◦ .soundcloudsearch *<txt>*
│ ≡◦ .pinterest
│ ≡◦ .pornhubsearch
│ ≡◦ .spotifysearch *<texto>*
│ ≡◦ .ytsearch2 <text>
│ ≡◦ .npmjs
│ ≡◦ .tiktoksearch *<txt>*
│ ≡◦ .tweetposts
│ ≡◦ .xnxxs
│ ≡◦ .xvsearch
│ ≡◦ .yts
╰───────────────╯

╭──⬣「 *⚙️ _SUB BOTS_ 🤖* 」⬣
│ ≡◦ .qr
│ ≡◦ .code
│ ≡◦ .token
│ ≡◦ .sockets
│ ≡◦ .deletesesion
│ ≡◦ .pausarai
╰───────────────╯

╭──⬣「 *🎉 _FUN_ 🎊* 」⬣
│ ≡◦ .gay <@tag> | <nombre> 
│ ≡◦ .lesbiana <@tag> | <nombre> 
│ ≡◦ .pajero <@tag> | <nombre> 
│ ≡◦ .pajera <@tag> | <nombre> 
│ ≡◦ .puto <@tag> | <nombre> 
│ ≡◦ .puta <@tag> | <nombre> 
│ ≡◦ .manco <@tag> | <nombre> 
│ ≡◦ .manca <@tag> | <nombre> 
│ ≡◦ .rata <@tag> | <nombre>
│ ≡◦ .prostituta <@tag> | <nombre> 
│ ≡◦ .amigorandom
│ ≡◦ .jalamela
│ ≡◦ .simi
│ ≡◦ .chiste
│ ≡◦ .consejo
│ ≡◦ .doxear <mension>
│ ≡◦ .facto
│ ≡◦ .prostituto <@tag> | <nombre>
│ ≡◦ .formarpareja
│ ≡◦ .formarpareja5
│ ≡◦ .frase
│ ≡◦ .huevo @user
│ ≡◦ .chupalo <mencion>
│ ≡◦ .aplauso <mencion>
│ ≡◦ .marron <mencion>
│ ≡◦ .suicidar
│ ≡◦ .iqtest <mencion>
│ ≡◦ .meme
│ ≡◦ .morse
│ ≡◦ .nombreninja *<texto>*
│ ≡◦ .paja
│ ≡◦ .personalidad <mencion>
│ ≡◦ .pregunta 
│ ≡◦ .piropo 
│ ≡◦ .zodiac *🍃*
│ ≡◦ .ship 
│ ≡◦ .sorte 
│ ≡◦ .top [texto]
│ ≡◦ .formartrio <mencion>
│ ≡◦ .tt 
╰───────────────╯

╭──⬣「 *🕹️ GAME 🎮* 」⬣
│ ≡◦ .ahorcado
│ ≡◦ .delxo
│ ≡◦ .genio *<pregunta>*
│ ≡◦ .math *<mode>*
│ ≡◦ .ppt 
│ ≡◦ .pvp
│ ≡◦ .sopa
│ ≡◦ .ttt
╰───────────────╯

╭──⬣「 *🧧 _ANIME_ 🎐* 」⬣
│ ≡◦ .angry/enojado @tag
│ ≡◦ .bath/bañarse @tag
│ ≡◦ .bite/morder @tag
│ ≡◦ .bleh/lengua @tag
│ ≡◦ .blush/sonrojarse @tag
│ ≡◦ .bored/aburrido @tag
│ ≡◦ .nights/noches
│ ≡◦ .dias/days
│ ≡◦ .coffe/cafe @tag
│ ≡◦ .cry/llorar @tag
│ ≡◦ .cuddle/acurrucarse @tag
│ ≡◦ .dance/bailar @tag
│ ≡◦ .drunk/borracho @tag
│ ≡◦ .eat/comer @tag
│ ≡◦ .facepalm/palmada @tag
│ ≡◦ .happy/feliz @tag
│ ≡◦ .hello/hola @tag
│ ≡◦ .hug/abrazar @tag
│ ≡◦ .kill/matar @tag
│ ≡◦ .kiss2/besar2 @tag
│ ≡◦ .kiss/besar @tag
│ ≡◦ .laugh/reirse @tag
│ ≡◦ .lick/lamer @tag
│ ≡◦ .love2/enamorada @tag
│ ≡◦ .patt/acariciar @tag
│ ≡◦ .poke/picar @tag
│ ≡◦ .pout/pucheros @tag
│ ≡◦ .ppcouple
│ ≡◦ .preg/embarazar @tag
│ ≡◦ .punch/golpear @tag
│ ≡◦ .run/correr @tag
│ ≡◦ .sad/triste @tag
│ ≡◦ .scared/asustada @tag
│ ≡◦ .seduce/seducir @tag
│ ≡◦ .shy/timida @tag
│ ≡◦ .slap/bofetada @tag
│ ≡◦ .sleep/dormir @tag
│ ≡◦ .smoke/fumar @tag
│ ≡◦ .think/pensando @tag
│ ≡◦ .undress/encuerar @tag
│ ≡◦ .waifu
╰───────────────╯

╭──⬣「 *🎑 _PERFIL_ 🎟️* 」⬣
│ ≡◦ .reg
│ ≡◦ .unreg
│ ≡◦ .profile
│ ≡◦ .marry *[mension / etiquetar]*
│ ≡◦ .divorce
│ ≡◦ .setgenre *<text>*
│ ≡◦ .delgenre
│ ≡◦ .setbirth *<text>*
│ ≡◦ .delbirth
│ ≡◦ .setdesc *<text>*
│ ≡◦ .deldesc
╰───────────────╯

╭──⬣「 *📥 _DOWNLOAD_ 📤* 」⬣
│ ≡◦ .animedl
│ ≡◦ .fb
│ ≡◦ .sound
│ ≡◦ .gitclone *<url git>*
│ ≡◦ .gdrive
│ ≡◦ .ig
│ ≡◦ .mediafire <url>
│ ≡◦ .mega
│ ≡◦ .apk <nombre>
│ ≡◦ .pinvid *<link>*
│ ≡◦ .apk2 <busqueda>
│ ≡◦ .npmdl
│ ≡◦ .tt2
│ ≡◦ .play
│ ≡◦ .play2
│ ≡◦ .ytmp3doc
│ ≡◦ .ytmp4doc
│ ≡◦ .yta
│ ≡◦ .ytv
│ ≡◦ .mp3
│ ≡◦ .tiktokrandom
│ ≡◦ .spotify
│ ≡◦ .tiktokhd
│ ≡◦ .snapchat *<link>*
│ ≡◦ .terabox
│ ≡◦ .tiktok *<url>*
│ ≡◦ .tiktokmp3 *<url>*
│ ≡◦ .tiktokimg <url>
│ ≡◦ .twitter <url>
│ ≡◦ .xvideosdl
│ ≡◦ .xnxxdl
│ ≡◦ .pindl
╰───────────────╯

╭──⬣「 *👻 _STALK_ 🌴* 」⬣
│ ≡◦ .tiktokstalk *<usuario>*
│ ≡◦ .kwaistalk *<usuario>*
│ ≡◦ .telegramstalk *<nombre_usuario>*
│ ≡◦ .youtubestalk *<nombre de usuario>*
╰───────────────╯

╭──⬣「 *💎 _PREMIUM_ 👑* 」⬣
│ ≡◦ .comprarpremium
│ ≡◦ .premium
│ ≡◦ .vip
│ ≡◦ .spamwa <number>|<mesage>|<no of messages>
╰───────────────╯

╭──⬣「 *🌐 _RPG_ 🥇* 」⬣
│ ≡◦ .aventura
│ ≡◦ .baltop
│ ≡◦ .bank / bal
│ ≡◦ .cazar 
│ ≡◦ .codigo *<cantida de coins>*
│ ≡◦ .canjear *<código>*
│ ≡◦ .cartera
│ ≡◦ .apostar *<cantidad>*
│ ≡◦ .cf
│ ≡◦ .cofre
│ ≡◦ .crimen
│ ≡◦ .daily
│ ≡◦ .depositar 
│ ≡◦ .explorar
│ ≡◦ .gremio
│ ≡◦ .halloween
│ ≡◦ .heal
│ ≡◦ .inventario 
│ ≡◦ .mensual
│ ≡◦ .mazmorra
│ ≡◦ .minar
│ ≡◦ .navidad
│ ≡◦ .retirar
│ ≡◦ .robar
│ ≡◦ .robarxp
│ ≡◦ .ruleta *<cantidad> <color>*
│ ≡◦ .buyall
│ ≡◦ .buy
│ ≡◦ .protituirse
│ ≡◦ .work
│ ≡◦ .pay / transfer 
│ ≡◦ .semanal
│ ≡◦ .levelup
│ ≡◦ .lvl @user
│ ≡◦ .slot *<apuesta>*
╰───────────────╯

╭──⬣「 *👑 _GACHA_ 🌸* 」⬣
│ ≡◦ .rw
│ ≡◦ .reclamar 
│ ≡◦ .harem
│ ≡◦ .waifuimage
│ ≡◦ .charinfo
│ ≡◦ .topwaifus [pagina]
│ ≡◦ .regalar <nombre del personaje> @usuario
│ ≡◦ .vote <personaje>
╰───────────────╯

╭──⬣「 *🌿 _STICKERS_ 🍓* 」⬣
│ ≡◦ .sticker <img>
│ ≡◦ .sticker <url>
│ ≡◦ .setmeta
│ ≡◦ .delmeta
│ ≡◦ .bratvid <texto>
│ ≡◦ .pfp @user
│ ≡◦ .qc
│ ≡◦ .toimg (reply)
│ ≡◦ .brat
│ ≡◦ .bratvid <texto>
│ ≡◦ .emojimix  *<emoji+emoji>*
│ ≡◦ .wm <packname>|<author>
╰───────────────╯

╭──⬣「 *🔧 _TOOLS_ 🛠️* 」⬣
│ ≡◦ .letra *<texto>*
│ ≡◦ .fake
│ ≡◦ .hd
│ ≡◦ .detectar
│ ≡◦ .clima *<ciudad/país>*
│ ≡◦ .join
│ ≡◦ .nuevafotochannel
│ ≡◦ .nosilenciarcanal
│ ≡◦ .silenciarcanal
│ ≡◦ .noseguircanal
│ ≡◦ .seguircanal 
│ ≡◦ .avisoschannel 
│ ≡◦ .resiviravisos 
│ ≡◦ .inspect 
│ ≡◦ .inspeccionar 
│ ≡◦ .eliminarfotochannel 
│ ≡◦ .reactioneschannel 
│ ≡◦ .reaccioneschannel 
│ ≡◦ .nuevonombrecanal 
│ ≡◦ .nuevadescchannel
│ ≡◦ .setavatar
│ ≡◦ .setbanner
│ ≡◦ .seticono
│ ≡◦ .setmoneda
│ ≡◦ .setname nombre1/nombre2
│ ≡◦ .cal *<ecuacion>*
│ ≡◦ .horario
│ ≡◦ .read
│ ≡◦ .traducir <idoma>
│ ≡◦ .say
│ ≡◦ .whatmusic <audio/video>
│ ≡◦ .paisinfo
│ ≡◦ .ssweb
│ ≡◦ .tamaño *<cantidad>*
│ ≡◦ .document *<audio/video>*
│ ≡◦ .translate
│ ≡◦ .up
│ ≡◦ .enhance
│ ≡◦ .wikipedia
╰───────────────╯

╭──⬣「 *⚙️ _GRUPOS_ ⚙️* 」⬣
│ ≡◦ .admins
│ ≡◦ .agregar
│ ≡◦ .advertencia <@user>
│ ≡◦ .delwarn
│ ≡◦ .grupo abrir / cerrar
│ ≡◦ .group open / close
│ ≡◦ .delete
│ ≡◦ .demote <@user>
│ ≡◦ .promote <@user>
│ ≡◦ .encuesta <text|text2>
│ ≡◦ .kickfantasmas
│ ≡◦ .gpbanner
│ ≡◦ .gpdesc
│ ≡◦ .gpname
│ ≡◦ .hidetag
│ ≡◦ .infogrupo
│ ≡◦ .kick <@user>
│ ≡◦ .kicknum
│ ≡◦ .listonline
│ ≡◦ .link
│ ≡◦ .listadv
│ ≡◦ .mute
│ ≡◦ .unmute
│ ≡◦ .config
│ ≡◦ .restablecer
│ ≡◦ .setbye
│ ≡◦ .setwelcome
│ ≡◦ .testwelcome
│ ≡◦ .setemoji <emoji>
│ ≡◦ .invocar *<mensaje opcional>*
╰───────────────╯

╭──⬣「 *🔞 _NSFW_ 📛* 」⬣
│ ≡◦ .sixnine/69 @tag
│ ≡◦ .anal/culiar @tag
│ ≡◦ .blowjob/mamada @tag
│ ≡◦ .boobjob/rusa @tag
│ ≡◦ .cum/leche @tag
│ ≡◦ .fap/paja @tag
│ ≡◦ .follar @tag
│ ≡◦ .fuck/coger @tag
│ ≡◦ .footjob/pies @tag
│ ≡◦ .fuck2/coger2 @tag
│ ≡◦ .grabboobs/agarrartetas @tag
│ ≡◦ .grop/manosear @tag
│ ≡◦ .penetrar @user
│ ≡◦ .lickpussy/coño @tag
│ ≡◦ .r34 <tag>
│ ≡◦ .sexo/sex @tag
│ ≡◦ .spank/nalgada @tag
│ ≡◦ .suckboobs/chupartetas @tag
│ ≡◦ .violar/perra @tag
│ ≡◦ .lesbianas/tijeras @tag
│ ≡◦ .pack
│ ≡◦ .tetas
│ ≡◦ .undress/encuerar
╰───────────────╯

╭──⬣「 *👤 _OWNER_ 👑* 」⬣
│ ≡◦ .addcoins *<@user>*
│ ≡◦ .addowner / delowner
│ ≡◦ .addprem [@user] <days>
│ ≡◦ .añadirxp
│ ≡◦ .copia
│ ≡◦ .autoadmin
│ ≡◦ .banuser <@tag> <razón>
│ ≡◦ .banlist
│ ≡◦ .bcgc
│ ≡◦ .block / unblock
│ ≡◦ .blocklist
│ ≡◦ .chetar *@user* / *<número>*
│ ≡◦ .cleartmp
│ ≡◦ .creargc
│ ≡◦ .deletefile
│ ≡◦ .delprem <@user>
│ ≡◦ .deschetar *@user* / *<número>*
│ ≡◦ .dsowner
│ ≡◦ =>
│ ≡◦ >
│ ≡◦ $
│ ≡◦ .fetch
│ ≡◦ .getplugin
│ ≡◦ .grouplist
│ ≡◦ .salir
│ ≡◦ .let
│ ≡◦ .prefix [prefix]
│ ≡◦ .quitarcoin *<@user>* / all
│ ≡◦ .quitarxp *<@user>*
│ ≡◦ .resetprefix
│ ≡◦ .restablecerdatos
│ ≡◦ .restart / reiniciar
│ ≡◦ .reunion
│ ≡◦ .savefile <ruta/nombre>
│ ≡◦ .saveplugin
│ ≡◦ .setcmd *<texto>*
│ ≡◦ .delcmd
│ ≡◦ .listcmd
│ ≡◦ .setimage
│ ≡◦ .setstatus <teks>
│ ≡◦ .spam2
│ ≡◦ .unbanuser <@tag>
│ ≡◦ .ip <alamat ip>
│ ≡◦ .update / fix
╰───────────────╯

╭──⬣「 *⚽ _IA - AI_ 📚* 」⬣
│ ≡◦ .dalle
│ ≡◦ .demo *<texto>*
│ ≡◦ .flux *<texto>*
│ ≡◦ .gemini
│ ≡◦ .ia
│ ≡◦ .llama
╰───────────────╯

╭──⬣「 *🧩 _TRANSFORMADOR_ 🏔️* 」⬣
│ ≡◦ .tourl <imagen>
│ ≡◦ .catbox
│ ≡◦ .tourl3
│ ≡◦ .togifaud
│ ≡◦ .tomp3
│ ≡◦ .tovideo
│ ≡◦ .tts <lang> <teks>
│ ≡◦ .tts2
╰───────────────╯

© ${textbot}
`.trim();

    const buttons = [
      { buttonId: `${usedPrefix}owner`, buttonText: { displayText: "👑 CREADOR 👑"}, type: 1},
      { buttonId: `${usedPrefix}code`, buttonText: { displayText: "⚙️ SERBOT 🏔️"}, type: 1},
      { buttonId: `${usedPrefix}menu2`, buttonText: { displayText: "📜 MENU AUDIOS 📜"}, type: 1},
    ];

    await conn.sendMessage(m.chat, {
      image: { url: randomImage},
      caption: menu,
      buttons: buttons,
      footer: "WHATSAPP BOT ✦⃟⛧┋ ➪ _R I N ⛧ I T O S H I_ ⚽┋⃟✧",
      viewOnce: true,
    }, { quoted: m});

    await m.react(emojis)
  } catch (e) {
    await m.reply(`✘ Ocurrió un error al enviar el menú\n\n${e}`)
    await m.react(error)
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'help', 'menú', 'allmenú', 'allmenu', 'menucompleto']
handler.register = true
export default handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}
