/*
let handler = async(m, { conn, usedPrefix, command }) => {

let img = `https://files.catbox.moe/191v1r.jpg`;
let txt = `╭ - - - - - - -✎ 🌹   ❜ ⊹
    *︵₊˚꒰Ꮺ mᥲᥒᥙᥲᥣ ⍴ᥲrᥲ ᥱძі𝗍ᥲr 𝗍ᥙ ⍴ᥱr𝖿іᥣ*
    *꒰ ୨⚔️୧─・┈・୨⚡୧・┈・─୨⚔️୧ ꒱*
    ₊˚୨🍧 *${usedPrefix}setbirth*\n> ✦ 𝐸𝑑𝑖𝑡𝑎 𝑡𝑢 𝑓𝑒𝑐𝒉𝑎 𝑑𝑒 𝑐𝑢𝑚𝑝𝑙𝑒𝑎ñ𝑜𝑠 🎂.
    ₊˚୨💥 *${usedPrefix}delbirth*\n> ✦ 𝐸𝑙𝑖𝑚𝑖𝑛𝑎 𝑡𝑢 𝑓𝑒𝑐𝒉𝑎 𝑑𝑒 𝑐𝑢𝑚𝑝𝑙𝑒𝑎ñ𝑜𝑠 🎂.
    ₊˚୨⚔️ *${usedPrefix}setdesc*\n> ♡ 𝐸𝑑𝑖𝑡𝑎 𝐿𝑎 𝑑𝑒𝑠𝑐𝑟𝑖𝑝𝑐𝑖ó𝑛 𝑑𝑒 𝑡𝑢 𝑝𝑒𝑟𝑓𝑖𝑙.
    ₊˚୨🍁 *${usedPrefix}setdesc*\n> ♡ 𝐸𝑙𝑖𝑚𝑖𝑛𝑎 𝐿𝑎 𝑑𝑒𝑠𝑐𝑟𝑖𝑝𝑐𝑖ó𝑛 𝑑𝑒 𝑡𝑢 𝑝𝑒𝑟𝑓𝑖𝑙.
    ₊˚୨🌲 *${usedPrefix}setgenre*\n> ✐ 𝐸𝑑𝑖𝑡𝑎 𝑡𝑢 𝑔𝑒𝑛𝑒𝑟𝑜 𝑒𝑛 𝑡𝑢 𝑝𝑒𝑟𝑓𝑖𝑙.
    ₊˚୨🏜️ *${usedPrefix}delgenre*\n> ✐ 𝐸𝑙𝑖𝑚𝑖𝑛𝑎 𝑡𝑢 𝑔𝑒𝑛𝑒𝑟𝑜 𝑒𝑛 𝑡𝑢 𝑝𝑒𝑟𝑓𝑖𝑙.
    ₊˚୨❄️ *${usedPrefix}marry*\n> ᰔᩚ 𝐶𝑎𝑠𝑎𝑡𝑒 𝑐𝑜𝑛 𝑢𝑛𝑎 𝑝𝑒𝑟𝑠𝑜𝑛𝑎.
    ₊˚୨🍥 *${usedPrefix}divorce*\n> ঔ 𝐷𝑖𝑣𝑜𝑟𝑐𝑖𝑎𝑡𝑒 𝑑𝑒 𝑢𝑛𝑎 𝑝𝑒𝑟𝑠𝑜𝑛𝑎.
    ٭꒷꒦ ✨︶︶︶︶︶︶︶︶︶︶ 🔥꒦꒷٭`;

   const buttons = [
      { buttonId: `${usedPrefix}owner`, buttonText: { displayText: "👑 CREADOR 👑"}, type: 1},
      { buttonId: `${usedPrefix}code`, buttonText: { displayText: "⚙️ SERBOT 🏔️"}, type: 1},
      { buttonId: `${usedPrefix}menu2`, buttonText: { displayText: "📜 MENU AUDIOS 📜"}, type: 1},
    ];

    await conn.sendMessage(m.chat, {
      image: { url: img},
      caption: txt,
      buttons: buttons,
      m.react('👻');
      footer: "WHATSAPP BOT ✦⃟⛧┋ ➪ _R I N ⛧ I T O S H I_ ⚽┋⃟✧",
      viewOnce: true,
    }, { quoted: m});

}

handler.command = ['perfildates', 'pedates', 'perd'];
handler.tag = ['rg'];
handler.help = ['perfildates'];
handler.coin = 2; 

export default handler;
*/

let handler = async (m, { conn, usedPrefix}) => {
  let img = `https://files.catbox.moe/191v1r.jpg`;
  let txt = `╭ - - - - - - -✎ 🌹   ❜ ⊹
*︵₊˚꒰Ꮺ Manual para editar tu perfil*
*꒰ ୨⚔️୧─・┈・୨⚡୧・┈・─୨⚔️୧ ꒱*
₊˚୨🍧 *${usedPrefix}setbirth*\n> ✦ Edita tu fecha de cumpleaños 🎂.
₊˚୨💥 *${usedPrefix}delbirth*\n> ✦ Elimina tu fecha de cumpleaños 🎂.
₊˚୨⚔️ *${usedPrefix}setdesc*\n> ♡ Edita la descripción de tu perfil.
₊˚୨🍁 *${usedPrefix}deldesc*\n> ♡ Elimina la descripción de tu perfil.
₊˚୨🌲 *${usedPrefix}setgenre*\n> ✐ Edita tu género en tu perfil.
₊˚୨🏜️ *${usedPrefix}delgenre*\n> ✐ Elimina tu género en tu perfil.
₊˚୨❄️ *${usedPrefix}marry*\n> ᰔᩚ Cásate con una persona.
₊˚୨🍥 *${usedPrefix}divorce*\n> ঔ Divórciate de una persona.
╰───────────────⋆`;

  const buttons = [
     { 
       buttonId: `${usedPrefix}profile`,
       buttonText: { displayText: "🏔️ ⍴ᥱr𝖿іᥣ"}, type: 1
     },
     { 
       buttonId: `${usedPrefix}p`,
       buttonText: { displayText: "🏓 ⍴іᥒg"}, type: 1
     },
  ];

  await conn.sendMessage(m.chat, {
    image: { url: img},
    caption: txt,
    footer: "✦⃟⛧┋ ➪ _R I N ⛧ I T O S H I_ ⚽┋⃟✧",
    buttons: buttons,
    viewOnce: true,
}, { quoted: m});

  await m.react('👻');
};

handler.command = ['perfildates', 'pedates', 'perd'];
handler.tag = ['rg'];
handler.help = ['perfildates'];
handler.coin = 2;

export default handler;