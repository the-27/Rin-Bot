import acrcloud from 'acrcloud';

const acr = new acrcloud({
  host: 'identify-eu-west-1.acrcloud.com',
  access_key: 'c33c767d683f78bd17d4bd4991955d81',
  access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu'
});

const handler = async (m, { conn, usedPrefix, command}) => {
  const q = m.quoted? m.quoted: m;
  const mime = (q.msg || q).mimetype || q.mediaType || '';

  if (!/audio|video/.test(mime)) {
    return conn.reply(m.chat, `${emoji} Etiqueta un audio o video de poca duración con el comando *${usedPrefix + command}* para ver que música contiene.`, m);
  }

  try {
    const buffer = await q.download();
    if (!buffer) throw new Error('No se pudo descargar el archivo.');

    const result = await acr.identify(buffer);
    const { status, metadata} = result;

    if (status.code!== 0) {
      return conn.reply(m.chat, `❌ No se pudo reconocer la canción. Intenta con un audio más claro.`, m);
  }

    const info = metadata.music?.[0];
    if (!info) {
      return conn.reply(m.chat, `❌ No se encontraron detalles de la canción.`, m);
  }

    const title = info.title || 'Desconocido';
    const artist = info.artists?.map(a => a.name).join(', ') || 'Desconocido';
    const album = info.album?.name || 'No disponible';
    const releaseDate = info.release_date || 'No disponible';
    const genres = info.genres?.map(g => g.name).join(', ') || 'No especificado';

    const response =
`╭─⬣「 *Whatmusic Tools* 」⬣
│ ≡• 🏷️ *Título:* ${title}
│ ≡• 👤 *Artista:* ${artist}
│ ≡• 💿 *Álbum:* ${album}
│ ≡• 🗓️ *Lanzamiento:* ${releaseDate}
│ ≡• 🎧 *Género:* ${genres}
╰─⬣`;

    const buttons = [
      {
        buttonId: `${usedPrefix}playaudio ${title}`,
        buttonText: { displayText: "DESCARGAR"},
        type: 1
      }
    ];

  await conn.sendMessage(m.chat, {
    caption: response,
    buttons: buttons,
    viewOnce: true
}, { quoted: m});

  } catch (e) {
    console.error(e);
    await conn.reply(m.chat, `❌ Ocurrió un error al identificar la canción: ${e.message}`, m);
  }
};

handler.help = ['whatmusic <audio/video>'];
handler.tags = ['tools'];
handler.command = ['whatmusic', 'shazam'];
handler.register = true;

export default handler;