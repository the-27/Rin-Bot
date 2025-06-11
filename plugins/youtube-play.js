import yts from 'yt-search';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    throw `❗ Por favor ingresa un texto para buscar.\nEjemplo: ${usedPrefix + command} Nombre del video`;
  }

  
  const search = await yts(text);
  const videoInfo = search.all?.[0];

  if (!videoInfo) {
    throw '❗ No se encontraron resultados para tu búsqueda. Intenta con otro título.';
  }

  const body = `
> 𑁯᧙  🍓 *Título:* ${video.title}
> 𑁯᧙  📏 *Duración:* ${video.timestamp}
> 𑁯᧙  👁️ *Vistas:*  ${video.views.toLocaleString()}
> 𑁯᧙  🎨 *Autor:* ${video.author.name}
> 𑁯᧙  🕰️ *Publicado:* ${video.ago}
> 𑁯᧙  📝 *vídeo url:* ${video.url}`;

  await conn.sendMessage(
    m.chat,
    {
      image: { url: videoInfo.thumbnail },
      caption: body,
      footer: `Elige una de las opciones para descargar:`,
      buttons: [
        { buttonId: `.yta ${videoInfo.url}`, buttonText: { displayText: '🎵 Audio' } },
        { buttonId: `.ytv ${videoInfo.url}`, buttonText: { displayText: '📽️ Video' } },
      ],
      viewOnce: true,
      headerType: 4,
    },
    { quoted: m }
  );
  m.react('✅'); // Reacción de éxito
};

handler.command = ['play3'];
handler.tags = ['descargas']
handler.group = true
handler.limit = 6

export default handler;
