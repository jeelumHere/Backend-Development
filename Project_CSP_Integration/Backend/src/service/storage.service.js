const imageKit = require("@imagekit/nodejs")


const imageKit01 = new imageKit({
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
})

async function uploadFile(buffer){
    const result = await imageKit01.files.upload({
        file : buffer.toString("base64"),
        fileName: "MyFile.jpeg"
    })

    return result;
}

module.exports = uploadFile

