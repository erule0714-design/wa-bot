const makeWASocket = require('@whiskeysockets/baileys').default
const { useMultiFileAuthState } = require('@whiskeysockets/baileys')

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./auth')
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        browser: ["Ubuntu", "Chrome", "110.0"]
    })
    const nomor = "6285174141307"
    if (!sock.authState.creds.registered) {
        setTimeout(async () => {
            const code = await sock.requestPairingCode(nomor)
            console.log(`KODE: ${code}`)
        }, 3000)
    }
    sock.ev.on('creds.update', saveCreds)
}
startBot()
