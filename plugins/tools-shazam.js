import fs from 'fs'
import acrcloud from 'acrcloud'
let acr = new acrcloud({
host: 'identify-eu-west-1.acrcloud.com',
access_key: 'c33c767d683f78bd17d4bd4991955d81',
access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu'
})

let handler = async (m) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (/audio|video/.test(mime)) { if ((q.msg || q).seconds > 20) return m.reply(`${emoji} Etiqueta un audio o video de poca duración con el comando *${usedPrefix + command}* para ver que música contiene.`)
await conn.reply(m.chat, wait, m)
let media = await q.download()
let ext = mime.split('/')[1]
fs.writeFileSync(`./tmp/${m.sender}.${ext}`, media)
let res = await acr.identify(fs.readFileSync(`./tmp/${m.sender}.${ext}`))
let { code, msg } = res.status
if (code !== 0) throw msg
let { title, artists, album, genres, release_date } = res.metadata.music[0]
let txt = `
𝙍𝙀𝙎𝙐𝙇𝙏𝘼𝘿𝙊 𝘿𝙀 𝙇𝘼 𝘽𝙐𝙎𝙌𝙐𝙀𝘿𝘼𝙎 

• 📌 𝙏𝙄𝙏𝙐𝙇𝙊: ${title}
• 👨‍🎤 𝘼𝙍𝙏𝙄𝙎𝙏𝘼: ${artists !== undefined ? artists.map(v => v.name).join(', ') : 'No encontrado'}
• 💾 𝘼𝙇𝘽𝙐𝙈: ${album.name || 'No encontrado'}
• 🌐 𝙂𝙀𝙉𝙀𝙍𝙊: ${genres !== undefined ? genres.map(v => v.name).join(', ') : 'No encontrado'}
• 📆 𝙁𝙀𝘾𝙃𝘼 𝘿𝙀 𝙇𝘼𝙉𝙕𝘼𝙈𝙄𝙀𝙉𝙏𝙊: ${release_date || 'No encontrado'}
`.trim()
fs.unlinkSync(`./tmp/${m.sender}.${ext}`)
m.reply(txt)
} else throw '𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝘼 𝘼 𝙐𝙉 𝘼𝙐𝘿𝙄𝙊 𝙊 𝙑𝙄𝘿𝙀𝙊'
}
handler.command = ['shazam', 'whatmusic']
export default handler