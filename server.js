const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

const ACCESS_TOKEN = 2065705510271503;
const featuredHeroesIds = [70,265,298,491,542,546];
let heroes = [];


const fetchSuperHero = async () => {
    heroes = [];
    for (const heroId of featuredHeroesIds) {
        const { data:powerstats } = await axios.get(`https://superheroapi.com/api/${ACCESS_TOKEN}/${heroId}/powerstats`);
        const { data:image } = await axios.get(`https://superheroapi.com/api/${ACCESS_TOKEN}/${heroId}/image`)
        let data = { name:powerstats.name, powerstats, imgUrl:image.url, id:powerstats.id };
        heroes.push(data)
    }
}

fetchSuperHero();

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.get("/", async ( req, res ) => {
    res.send(heroes);
})

app.listen(port, () => {
    console.log("App is listening on port 3001");
})