import fetch from 'node-fetch';
import axios from 'axios';

let handler = async (m, { conn, text}) => {
  if (!text) return conn.reply(m.chat, `🌷 𝒊𝒏𝒈𝒓𝒆𝒔𝒂 𝒆𝒍 𝒏𝒐𝒎𝒃𝒓𝒆 𝒅𝒆 𝒍𝒂 𝒄𝒂𝒏𝒄𝒊𝒐𝒏 𝒅𝒆 *Soundcloud.*`, m);

  await m.react('🕒');

  try {
    let api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/soundcloud-search?text=${encodeURIComponent(text)}`);
    let json = await api.json();
    if (!json || json.length === 0) throw new Error("❌ No se encontraron resultados.");

    let { url, title} = json[0];

    let api2 = await fetch(`https://apis-starlights-team.koyeb.app/starlight/soundcloud?url=${url}`);
    let json2 = await api2.json();
    if (!json2 ||!json2.link) throw new Error("❌ No se pudo obtener el audio.");

    let { link, image} = json2;
    let audioBuffer = await getBuffer(link);

    let txt = `🎵 *${title}*\n\n🔗 ${url}\n\n☁️ Procesando el audio, aguarde un momento...`;

    
    await conn.reply(m.chat, txt, m);

    
    await conn.sendMessage(m.chat, {
      audio: audioBuffer,
      fileName: `${title}.mp3`,
      mimetype: 'audio/mpeg'
}, { quoted: m});

    await m.react('✅');

} catch (e) {
    await m.react('❌');
    return conn.reply(m.chat, ` Error: ${e.message}`, m);
}
};

handler.help = ['soundcloud', 'sound'];
handler.tags = ['descargas'];
handler.command = ['soundcloud', 'sound'];

export default handler;

const getBuffer = async (url) => {
  try {
    const res = await axios.get(url, { responseType: 'arraybuffer'});
    return res.data;
} catch (e) {
    console.error(`Error al obtener audio: ${e}`);
    return null;
}
};
