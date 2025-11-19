
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { Mongodb } from './db/db.js';
import url from './models/url.js';
import shortid from 'shortid';

Mongodb();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.post('/api/shorten', async (req, res) => {
    try {
        const { longurl } = req.body;
        const baseurl = process.env.BASE_URL;
        const checklong = await url.find({ longurl });
        if (checklong.length > 0) {
            return res.status(200).json({ shorturl: `${baseurl}/${checklong[0].shortid}` });
        }
        let id = shortid.generate();
        let urlfind = await url.find({shortid: id });
        console.log("all cods are",urlfind);
        if (urlfind.length>0) {
            return res.status(400).json({ message: "shortcode exists" });
        }
        const shorturl = `${baseurl}/${id}`;

        await url.create({ shortid: id, longurl, shorturl });
        console.log(shorturl);
        res.status(201).json({ shorturl });
    }
    catch (error) {
        res.status(500).json({ message: "server error" });
    }
})

app.get('/:shortid', async (req, res) => {
    try {
        const { shortid } = req.params;
        const urlfind = await url.find({ shortid });
        if (urlfind) {
            return res.redirect(urlfind[0].longurl);
        }
        else {
            return res.status(404).json({ message: "url not found" });
        }
    }
    catch (err) {
        res.status(500).json({ message: "server error" });
    }
})

app.get('/api/allLinks', async (req, res) => {
    try {
        const urls = await url.find({});
        res.status(200).json(urls);
    }
    catch (err) {
        res.status(500).json({ message: "server error" });
    }
})

app.delete('/api/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await url.findByIdAndDelete(id);
        res.status(200).json({ message: "url deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "server error" });
    }
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})