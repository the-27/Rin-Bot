let handler = async (m, { conn, args }) => {
    let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    let user = global.db.data.users[userId]
    let img = [ 
"https://qu.ax/wLRYM.jpg",
"https://qu.ax/sqlKC.jpg"
  ].getRandom()
    let name = conn.getName(userId)
    let txt = `
        ・･ ⴕ⌛𝗕꯭𝐈፝𝚵꯭𝐍፝𝐕꯭𝜩፝𝐍꯭𝐈𝗗꯭፝𝚹꯭💊᳸ⴕ₊･・
                 ᮢ ۪۪۪۪۪۪֘࣪࣪͜⏜͜𑂶ּ࣪࣪࣪࣪︵᷼ᜒ𝆬࣪࣪࣪࣪࣪ ۪۪۪۪۪۪۪   ᮬ⃘࣭࣭࣭᷼❀⃘࣭࣭࣭᷼  ᜒ𝆬 ͜ᮬ۪۪۪۪۪۪۪࣪࣪࣪࣪࣪⏜͜𑂶ּ࣪࣪࣪࣪︵۪۪۪۪۪۪࣪࣪͜  ᷑ ᮢ
ֹི࣭࣭࣭࣭࣭࣮ׅ۪۪۪۪۪۪۪۪۪ٜ࣪࣪࣪࣪᷼✾ֹྀ࣭࣭࣭࣭࣭࣮ׅ۪۪۪۪۪۪۪۪۪ٜ࣪࣪࣪࣪᷼⏝𝐌𝐄𝐍𝐔 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐒⏝ֹི࣭࣭࣭࣭࣭࣮ׅ۪۪۪۪۪۪۪۪۪ٜ࣪࣪࣪࣪᷼✾ֹྀ࣭࣭࣭࣭࣭࣮ׅ۪۪۪۪۪۪۪۪۪ٜ࣪࣪࣪࣪᷼
 ╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪━╈̷̸̳࣭࣪

> Hola @${userId.split('@')[0]} aqui esta el menu de descargas.

*ㅤㅤㅤㅤ╭┅»•»💀ᬼ«•«┅┅┅𓍼𓄼𓄹᭣𓏲┅┅┅╮*
ㅤㅤㅤㅤil.ㅤㅤㅤ🅛̶̟̟̟͋͜͡🅘̶̟̟͋͜͡🅢̶̟͋͜͡🅣̶̟̟͋͜͡🅐̟̟̟̇͜ㅤㅤㅤㅤ.li
*ㅤㅤㅤㅤ╰┅┅┅𓍼𓄼𓄹᭣𓏲┅┅ »•»💀ᬼ«•«┅╯*

━⃨⃛━╼─╍╍╍─╍▻◅╍─╍╍╼╼━⃨⃛╍╍
❥ 🧁 _.pinterestdl *<url>*
❥ 🧁 _.tksearch *<búsqueda>*_
❥ 🧁 _.tkseguir
❥ 🧁 _.facebook - fb_
❥ 🧁 _.gitclone *<url git>*_
❥ 🧁 _.instagram - ig_
❥ 🧁 _.mediafire - mf_
❥ 🧁 _.mega_
❥ 🧁 _.apk_
❥ 🧁 _.npmdl_
❥ 🧁 _.pinvid *<link>*_
❥ 🧁 _.playlist_
❥ 🧁 _.play_
❥ 🧁 _.play2_
❥ 🧁 _.spotify_
❥ 🧁 _.tiktokrandom_
❥ 🧁 _.snapchat_
❥ 🧁 _.tiktok - tt_
❥ 🧁 _.tt2_
❥ 🧁 _.tiktokimg_ 
❥ 🧁 _.tiktokmp3_ 
❥ 🧁 _.tiktokhd_
❥ 🧁 _.twitter *<url>*_
❥ 🧁 _.xnxxdl_
❥ 🧁 _.xvideosdl_
❥ 🧁 _.ytmp4doc_ 
❥ 🧁 _.ytmp3doc_ 
❥ 🧁 _.yta_
❥ 🧁 _.ytv_
❥ 🧁 _.sound_
❥ 🧁 _.play3_
❥ 🧁 _.apk2_
━⃨⃛━╼─╍╍╍─╍▻◅╍─╍╍╼╼━⃨⃛╍╍
`.trim()

  await conn.sendMessage(m.chat, { 
      text: txt,
      contextInfo: {
          mentionedJid: [m.sender, userId],
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
              newsletterJid: channelRD.id,
              newsletterName: channelRD.name,
              serverMessageId: -1,
          },
          forwardingScore: 999,
          externalAdReply: {
              title: botname,
              body: textbot,
              thumbnailUrl: img,
              sourceUrl: redes,
              mediaType: 1,
              showAdAttribution: true,
              renderLargerThumbnail: true,
          },
      },
  }, { quoted: m })

}

handler.help = ['menudl']
handler.tags = ['main']
handler.command = ['menudescargas', 'menudl']

export default handler
