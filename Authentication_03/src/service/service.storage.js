import imageKit from "@imagekit/nodejs"
import config from "../config/config.js"

const imageKit01 = new imageKit({
    privateKey : config.privateKey,
    publicKey : config.publicKey
})

async function uploadFile(file) {
    const result = await imageKit01.files.upload({
        file: file.buffer.toString("base64"),
        fileName: file.originalname
    })

    return result
}

export default uploadFile


