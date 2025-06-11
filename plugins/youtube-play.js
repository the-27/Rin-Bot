/*
import yts from 'yt-search';
import fetch from 'node-fetch';
import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';

const handler = async (m, { conn, args, usedPrefix }) => {
  if (!args[0]) {
    return await conn.sendMessage(m.chat, { 
      text: `*${emoji} Ingresa un título para buscar en YouTube.*`
    }, { quoted: m });
  }

  await m.react('⚽');

  try {
    const searchResults = await searchVideos(args.join(" "));
    if (!searchResults.length) throw new Error('No se encontraron resultados.');

    const video = searchResults[0];
    const thumbnail = await (await fetch(video.thumbnail)).buffer();

    const messageText = formatMessageText(video);

    await conn.sendMessage(m.chat, {
      image: thumbnail,
      caption: messageText,
      footer: 'seleccione una opcion',
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 1000,
        isForwarded: true
      },
      buttons: generateButtons(video, usedPrefix),
      headerType: 1,
      viewOnce: true
    }, { quoted: m });

    await m.react('✅');

  } catch (e) {
    console.error(e);
    await m.react('❌');
    await conn.sendMessage(m.chat, { text: '⚠︎ Ocurrió un error al buscar el video. Inténtalo de nuevo más tarde.' }, { quoted: m });
  }
};

// Función de búsqueda YouTube
async function searchVideos(query) {
  try {
    const res = await yts(query);
    return res.videos.slice(0, 10).map(video => ({
      title: video.title,
      url: video.url,
      thumbnail: video.thumbnail,
      channel: video.author.name,
      published: video.timestamp || 'No disponible',
      views: video.views?.toLocaleString() || 'No disponible',
      duration: video.duration.timestamp || 'No disponible'
    }));
  } catch (error) {
    console.error('Error en yt-search:', error.message);
    return [];
  }
}

// Formato visual del resultado principal
function formatMessageText(video) {
  return (
`\`\`\`🎧 Resultado encontrado 🌴\`\`\`

≡ *🌴 \`Titulo\`* ${video.title}
≡ *🍨 \`Duracion\`* ${video.duration}
≡ *🍓 \`Canal\`* ${video.channel}
≡ *🍬 \`Vistas\`* ${video.views}
≡ *🥯 \`Pubicado\`* ${video.ago}
≡ *🪸 \`Link\`* ${video.url}
`
  );
}

// Botones con opciones de audio y video con fuente decorativa
function generateButtons(video, usedPrefix) {
  return [
    {
      buttonId: `${usedPrefix}yta ${video.url}`,
      buttonText: { displayText: '🎵 A U D I O' },
      type: 1
    },
    {
      buttonId: `${usedPrefix}ytv ${video.url}`,
      buttonText: { displayText: '📽️ V I D E O' },
      type: 1
    }
  ];
}

handler.help = ['play3'];
handler.tags = ['descargas'];
handler.command = ['play3'];

export default handler;
*/


import yts from 'yt-search';
import fetch from 'node-fetch';

const handler = async (m, { conn, args, usedPrefix}) => {
  if (!args[0]) {
    return await conn.sendMessage(m.chat, {
      text: `⚠️ Ingresa un título para buscar en YouTube.*`
    }, { quoted: m});
  }

  await m.react('⚽');

  try {
    const searchResults = await searchVideos(args.join(" "));
    if (!searchResults.length) throw new Error('No se encontraron resultados.');

    const video = searchResults[0];
    const thumbnail = await (await fetch(video.thumbnail)).buffer();
    const messageText = formatMessageText(video);

    await conn.sendMessage(m.chat, {
      image: thumbnail,
      caption: messageText,
      footer: 'Seleccione una opción',
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 1000,
        isForwarded: true
      },
      buttons: generateButtons(video, usedPrefix),
      headerType: 1,
      viewOnce: true
  }, { quoted: m});

    await m.react('✅');

  } catch (e) {
    console.error(e);
    await m.react('❌');
    await conn.sendMessage(m.chat, { text: '⚠︎ Ocurrió un error al buscar el video. Inténtalo de nuevo más tarde.'}, { quoted: m});
  }
};

// 🔎 Función de búsqueda en YouTube
async function searchVideos(query) {
  try {
    const res = await yts(query);
    return res.videos.slice(0, 10).map(video => ({
      title: video.title,
      url: video.url,
      thumbnail: video.thumbnail,
      channel: video.author.name,
      published: video.timestamp || 'No disponible',
      views: video.views?.toLocaleString() || 'No disponible',
      duration: video.duration || 'No disponible'
     }));
  } catch (error) {
    console.error('Error en yt-search:', error.message);
    return [];
  }
}

// 🎨 Formateo del mensaje
function formatMessageText(video) {
  return (
    `🎧 *Resultado encontrado* 🌴

> 𑁯᧙📌 *Título:* ${video.title}
> 𑁯᧙⏳ *Duración:* ${video.duration}
> 𑁯᧙📺 *Canal:* ${video.channel}
> 𑁯᧙👁️ *Vistas:* ${video.views}
> 𑁯᧙🗓️ *Publicado:* ${video.published}
> 𑁯᧙🔗 *Link:* ${video.url}`
);
}

// 🎛️ Generación de botones interactivos
function generateButtons(video, usedPrefix) {
  return [
    { buttonId: `${usedPrefix}yta ${video.url}`, buttonText: { displayText: '🎵 Audio'}, type: 1},
    { buttonId: `${usedPrefix}ytv ${video.url}`, buttonText: { displayText: '📽️ Video'}, type: 1}
  ];
}

handler.help = ['play3'];
handler.tags = ['descargas'];
handler.command = ['play3'];

export default handler;