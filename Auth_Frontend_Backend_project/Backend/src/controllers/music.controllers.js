import sessionModel from "../models/session.model.js"
import userModel from "../models/user.model.js"
import musicModel from "../models/music.model.js"
import uploadFile from "../services/storage.service.js"
import albumModel from "../models/album.model.js"
import config from "../config/config.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export async function createMusic(req, res) {
    const { title, genre } = req.body
    if (req.file && title && genre) {
        const result = await uploadFile(req.file)
        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: req.user._id,
            genre
        })
        return res.status(201).json({
            message: 'Music created successfully',
            Music: music
        })
    }
    else {
        return res.status(400).json({
            error: 'Provide the required data'
        })
    }
}


export async function createAlbum(req, res) {
    const { title, genre } = req.body

    const specificArtist = await userModel.findById(req.user._id)
    const specificMusic = await musicModel.find({ artist: specificArtist._id })

    const tracks = specificMusic.map(m => ({
        title: m.title,
        audioUrl: m.uri,
        music: m._id
    }))

    if (req.file && title && genre) {
        const result = await uploadFile(req.file)
        const album = await albumModel.create({
            title,
            artist: req.user._id,
            genre,
            coverImage: result.url,
            tracks
        })

        return res.status(201).json({
            message: 'Album created'
        })
    }
    else {
        return res.status(400).json({
            error: 'Bad Request'
        })
    }
}


export async function getAllMusic(req,res){
    const music = await musicModel.find()
    .populate("artist")
    if(!music){
        return res.status(401).json({
            error: 'Music notfound'
        })
    }
    else{
        return res.status(200).json({
            message: 'All Music Fethced successfully',
            Music : music
        })
    }
}


export async function getAllAlbum(req,res){
    const albums = await albumModel.find().select("title genre").populate("artist")
    if(!albums){
        return res.status(401).json({
            error: 'Albums not found'
        })
    }
    else{
        res.status(200).json({
            message : "All Albums fetched",
            Albums : albums
        })
    }
}