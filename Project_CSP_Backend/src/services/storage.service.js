const imageKit = require("@imagekit/nodejs")

const imageKit01 = new imageKit({
    privateKey : "private_gYfuI60SYAr1ba5xlsL1f51jqBI="
})

async function uploadFile(buffer){
    const result = await imageKit01.files.upload({
        file : buffer.toString("base64"),
        fileName: "leteepo.jpeg"
    })

    return result;
}

module.exports = uploadFile