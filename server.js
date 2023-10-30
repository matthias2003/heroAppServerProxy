const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = 3001;

const featuredHeroesIds = [70,265,298,491,542,546];

const fetchSuperHero = async (heroId) => {
        const dataPowerstats = axios.get(`https://superheroapi.com/api/${process.env.ACCESS_TOKEN}/${heroId}/powerstats`);
        const dataImage = axios.get(`https://superheroapi.com/api/${process.env.ACCESS_TOKEN}/${heroId}/image`);
        const [ {data:powerstats }, { data:image }] = await Promise.all([dataPowerstats, dataImage]);
        return { name:powerstats.name, powerstats, imgUrl:image.url, id:powerstats.id };
}

const searchHeroesByName = async (name) => {
    return axios.get(`https://superheroapi.com/api/${process.env.ACCESS_TOKEN}/search/${name}`);
}

const getTotalHeroInfoById = async (id) => {
    const  data  = await axios.get(`https://superheroapi.com/api/${process.env.ACCESS_TOKEN}/${id}`);
    return data;
}

app.use(cors({
    // origin: 'https://hero-app-six.vercel.app'
    origin: 'http://localhost:3000'
}));

app.get("/", async ( req, res ) => {
    let heroes = []
    for (const heroId of featuredHeroesIds) {
        const data = fetchSuperHero(heroId);
        heroes.push(data);
    }
    
    const dataHeroes = await Promise.all(...[heroes]);
    res.send(dataHeroes);
})

app.get("/search/:name", async ( req, res ) => {
    const name = req.params.name
    const { data } = await searchHeroesByName(name)
    res.send(data)
})

app.get("/details/:id", async ( req, res ) => {
    const id = req.params.id
    const { data } = await getTotalHeroInfoById(id);
    res.send(data);
})


app.listen(port, () => {
    console.log("App is listening on port 3001");
})