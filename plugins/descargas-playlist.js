/*import yts from 'yt-search';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    if (!text) {
        return conn.reply(m.chat, 
            `${lenguajeGB['smsAvisoMG']()}𝙀𝙎𝘾𝙍𝙄𝘽𝘼 𝙀𝙇 𝙉𝙊𝙈𝘽𝙍𝙀 𝘿𝙀 𝙐𝙉 𝙑𝙄𝘿𝙀𝙊 𝙊 𝘾𝘼𝙉𝘼𝙇 𝘿𝙀 𝙔𝙊𝙐𝙏𝙐𝘽𝙀\n\n𝙒𝙍𝙄𝙏𝙀 𝙏𝙃𝙀 𝙉𝘼𝙈𝙀 𝙊𝙁 𝘼 𝙔𝙊𝙐𝙏𝙐𝘽𝙀 𝙑𝙄𝘿𝙀𝙊 𝙊𝙍 𝘾𝙃𝘼𝙉𝙉𝙀𝙇`, 
            fkontak, m
        );
    }
    
    try {
        let result = await yts(text);
        let ytres = result.videos;
        let teskd = `𝘽𝙪𝙨𝙦𝙪𝙚𝙙𝙖 𝙙𝙚 *${text}*`;

        let listSections = [];
        for (let v of ytres) {
            listSections.push({
                title: `${htki} 𝙍𝙀𝙎𝙐𝙇𝙏𝘼𝘿𝙊𝙎 ${htka}`,
                rows: [
                    {
                        header: '𝗔 𝗨 𝗗 𝗜 𝗢',
                        title: "",
                        description: `${v.title} | ${v.timestamp}\n`, 
                        id: `${usedPrefix}ytmp3 ${v.url}`
                    },
                    {
                        header: "𝗩 𝗜 𝗗 𝗘 𝗢",
                        title: "" ,
                        description: `${v.title} | ${v.timestamp}\n`, 
                        id: `${usedPrefix}ytmp4 ${v.url}`
                    }, 
                    {
                        header: "𝗔 𝗨 𝗗 𝗜 𝗢   𝗗 𝗢 𝗖",
                        title: "" ,
                        description: `${v.title} | ${v.timestamp}\n`, 
                        id: `${usedPrefix}ytmp3doc ${v.url}`
                    }, 
                    {
                        header: "𝗩 𝗜 𝗗 𝗘 𝗢   𝗗 𝗢 𝗖",
                        title: "" ,
                        description: `${v.title} | ${v.timestamp}\n`, 
                        id: `${usedPrefix}ytmp4doc ${v.url}`
                    }
                ]
            });
        }
        
        await conn.sendList(m.chat, 
            `${htki} *𝙍𝙀𝙎𝙐𝙇𝙏𝘼𝘿𝙊𝙎* ${htka}\n`, 
            `\n𝘽𝙪𝙨𝙦𝙪𝙚𝙙𝙖 𝙙𝙚: ${text}`, 
            `𝗕 𝗨 𝗦 𝗖 𝗔 𝗥`, 
            listSections, 
            fkontak
        );
    } catch (e) {
        await conn.sendButton(m.chat, 
            `\n${wm}`, 
            lenguajeGB['smsMalError3']() + '#report ' + usedPrefix + command, 
            null, 
            [[lenguajeGB.smsMensError1(), `#reporte ${lenguajeGB['smsMensError2']()} *${usedPrefix + command}*`]], 
            null, 
            null, 
            m
        );
        console.log(e);
    }
}

handler.help = ['playlist'];
handler.tags = ['dl'];
handler.command = ['playlist', 'ytbuscar'];
handler.limit = 1;
handler.level = 3;
*/

import yts from 'yt-search';

let handler = async (m, { conn, usedPrefix, text, command}) => {
    if (!text) {
        return conn.reply(m.chat,
            "🌴 *Por favor, escribe el nombre de un video o canal de YouTube.*",
            m.sender, m
);
}

    try {
        let result = await yts(text);
        let ytres = result.videos;

        if (!ytres || ytres.length === 0) {
            return conn.reply(m.chat, "❌ No se encontraron resultados para tu búsqueda.", m);
}

        let listSections = ytres.map(v => ({
            title: "🔎 Resultados de búsqueda",
            rows: [
                { title: "🎵 Audio", description: `${v.title} | ${v.timestamp}`, id: `${usedPrefix}ytmp3 ${v.url}`},
                { title: "🎥 Video", description: `${v.title} | ${v.timestamp}`, id: `${usedPrefix}ytmp4 ${v.url}`},
                { title: "📜 Audio (Doc)", description: `${v.title} | ${v.timestamp}`, id: `${usedPrefix}ytmp3doc ${v.url}`},
                { title: "📜 Video (Doc)", description: `${v.title} | ${v.timestamp}`, id: `${usedPrefix}ytmp4doc ${v.url}`}
            ]
}));

        await conn.sendList(m.chat,
            "*📜 Resultados de búsqueda*",
            `🔍 Término: ${text}`,
            "✅ Selecciona una opción",
            listSections,
            m.sender
);
} catch (e) {
        await conn.sendButton(m.chat,
            "⚠️ Ha ocurrido un error. Por favor, repórtalo con el siguiente comando:",
            `#report ${usedPrefix + command}`,
            null,
            [["Enviar reporte", `#report ${usedPrefix + command}`]],
            m
);
        console.error(e);
}
};

handler.help = ['playlist'];
handler.tags = ['descargas'];
handler.command = ['playlist', 'ytbuscar'];
handler.limit = 1;
handler.level = 3;

export default handler;
