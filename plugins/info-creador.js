function handler(m, { conn}) {
  const suittag = '51969214380'; 
  const name = 'BLACK.OFC';
  const packname = '✦⃟⛧┋ ➪ _R I N ⛧ I T O S H I_ ⚽┋⃟✧';
  const dev = '© Modified by:  ꧁𓊈𒆜𝖙𝖍𝖊•𝒃𝒍𝒂𝒄𝒌𒆜𓊉꧂';
  const channel = 'https://whatsapp.com/channel/0029Vb6BDQc0lwgsDN1GJ31i';
  const banner = 'https://files.catbox.moe/pp7ncd.jpg';
  
  const vcard = `BEGIN:VCARD
VERSION:3.0
N:;${name};;;
FN:${name}
ORG:PANDA
TEL;type=CELL;type=VOICE;waid=${suittag}:${suittag}
END:VCARD`;

  conn.sendMessage(m.chat, {
    contacts: {
      displayName: `${name}`,
      contacts: [{ vcard}]
  },
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      externalAdReply: {
        showAdAttribution: true,
        title: packname,
        body: dev,
        thumbnailUrl: banner,
        mediaType: 1,
        mediaUrl: channel,
        sourceUrl: channel,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m});
}

handler.help = ['owner'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;
