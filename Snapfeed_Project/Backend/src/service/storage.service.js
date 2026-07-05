const ImageKit = require("@imagekit/nodejs")

const imageKit01 = new ImageKit({
    privateKey: process.env.PRIVATE_KEY,
    publicKey: process.env.PUBLIC_KEY,
})

async function uploadFile(file) {
    const result = await imageKit01.files.upload({
        file: file.buffer.toString("base64"),
        fileName: file.originalname
    })

    return result
}

module.exports = uploadFile
