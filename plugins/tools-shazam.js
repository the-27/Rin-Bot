/*import acrcloud from 'acrcloud'

let acr = new acrcloud({
  host: 'identify-eu-west-1.acrcloud.com',
  access_key: 'c33c767d683f78bd17d4bd4991955d81',
  access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu'
})
let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || q.mediaType || ''
  if (/video|audio/.test(mime)) {
  let buffer = await q.download()
  let { status, metadata } = await acr.identify(buffer)
  if (status.code !== 0) throw status.msg 
  let { title, artists, album, genres, release_date } = metadata.music[0]
  let txt = '╭─⬣「 *Whatmusic Tools* 」⬣\n'
      txt += `│  ≡◦ *🍭 Titulo ∙* ${title}${artists ? `\n│  ≡◦ *👤 Artista ∙* ${artists.map(v => v.name).join(', ')}` : ''}`
      txt += `${album ? `\n│  ≡◦ *📚 Album ∙* ${album.name}` : ''}${genres ? `\n│  ≡◦ *🪴 Genero ∙* ${genres.map(v => v.name).join(', ')}` : ''}\n`
      txt += `│  ≡◦ *🕜 Fecha de lanzamiento ∙* ${release_date}\n`
      txt += `╰─⬣`
     conn.reply(m.chat, txt, m)
  } else return conn.reply(m.chat, `${emoji} Etiqueta un audio o video de poca duración con el comando *${usedPrefix + command}* para ver que música contiene.`, m)
}
handler.help = ['whatmusic <audio/video>']
handler.tags = ['tools']
handler.command = ['shazam', 'whatmusic']
//handler.limit = 1
handler.register = true 
export default handler

*/


import acrcloud from 'acrcloud';

let acr = new acrcloud({
  host: 'identify-eu-west-1.acrcloud.com',
  access_key: 'c33c767d683f78bd17d4bd4991955d81',
  access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu'
});

let handler = async (m, { conn, usedPrefix, command}) => {
  let q = m.quoted? m.quoted: m;
  let mime = (q.msg || q).mimetype || q.mediaType || '';

  if (/video|audio/.test(mime)) {
    let buffer = await q.download();
    if (!buffer) return conn.reply(m.chat, '❗ No se pudo descargar el archivo. Intenta de nuevo.', m);

    try {
      let { status, metadata} = await acr.identify(buffer);
      if (status.code!== 0) {
        return conn.reply(m.chat, `❌ Error al identificar la música: ${status.msg}`, m);
}

      let { title, artists, album, genres, release_date} = metadata.music?.[0] || {};
      let txt = `╭─⬣「 *Identificación Musical* 」⬣\n`;
      txt += `│ 🎵 *Título:* ${title || 'No disponible'}\n`;
      txt += artists? `│ 👤 *Artista:* ${artists.map(v => v.name).join(', ')}\n`: '';
      txt += album? `│ 📚 *Álbum:* ${album.name}\n`: '';
      txt += genres? `│ 🎶 *Género:* ${genres.map(v => v.name).join(', ')}\n`: '';
      txt += `│ 🕜 *Fecha de lanzamiento:* ${release_date || 'No disponible'}\n`;
      txt += `╰─⬣`;

      return conn.reply(m.chat, txt, m);
} catch (error) {
      console.error(error);
      return conn.reply(m.chat, `❌ Ocurrió un error al procesar el audio: ${error.message}`, m);
}
} else {
    return conn.reply(m.chat, `❗ Etiqueta un audio o video con el comando *${usedPrefix + command}* para identificar la música.`, m);
}
};

handler.help = ['whatmusic <audio/video>'];
handler.tags = ['tools'];
handler.command = ['shazam', 'whatmusic'];
handler.register = true;

export default handler;
