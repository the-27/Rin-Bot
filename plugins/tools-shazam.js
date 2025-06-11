import fs from 'fs';
import acrcloud from 'acrcloud';

const acr = new acrcloud({
  host: 'identify-eu-west-1.acrcloud.com',
  access_key: 'c33c767d683f78bd17d4bd4991955d81',
  access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu'
});

const handler = async (m, { conn, usedPrefix, command}) => {
  const q = m.quoted? m.quoted: m;
  const mime = (q.msg || q).mimetype || '';

  if (!/audio|video/.test(mime)) {
    return conn.reply(m.chat, `🎵 *Etiqueta un audio o video con el comando* *${usedPrefix + command}* para identificar la canción.`, m);
  }

  if ((q.msg || q)?.seconds> 60) {
    return conn.reply(m.chat, '⏳ *El audio o video debe ser de máximo 1 minuto.* Intenta con uno más corto.', m);
  }

  await conn.reply(m.chat, '🔍 *Procesando... Por favor, espera.*', m);

  try {
    const media = await q.download();
    if (!media) throw new Error('No se pudo descargar el archivo.');

    const ext = mime.split('/')[1];
    const filePath = `./tmp/${m.sender}.${ext}`;

    fs.writeFileSync(filePath, media);
    const result = await acr.identify(fs.readFileSync(filePath));

    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    const { code, msg} = result.status;
    if (code!== 0) return conn.reply(m.chat, `❌ Error al identificar la canción: ${msg}`, m);

    const info = result.metadata.music?.[0];

    if (!info) return conn.reply(m.chat, '❌ No se encontraron detalles del audio.', m);

    const title = info.title || 'Desconocido';
    const artist = info.artists?.map(a => a.name).join(', ') || 'Desconocido';
    const album = info.album?.name || 'No disponible';
    const releaseDate = info.release_date || 'No disponible';
    const genres = info.genres?.map(g => g.name).join(', ') || 'No especificado';

    const response =
`🎶 *Resultado Encontrado*

• 🏷️ *Título:* ${title}
• 👤 *Artista:* ${artist}
• 💿 *Álbum:* ${album}
• 🗓️ *Lanzamiento:* ${releaseDate}
• 🎧 *Género:* ${genres}`;

    await conn.reply(m.chat, response, m);
} catch (error) {
    console.error(error);
    await conn.reply(m.chat, `❌ Error al procesar el audio: ${error.message}`, m);
}
};

handler.help = ['whatmusic <audio/video>'];
handler.tags = ['tools'];
handler.command = ['whatmusic', 'shazam'];
export default handler;
