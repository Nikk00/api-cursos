const express = require('express')
const router = express.Router()
const axios = require('axios')
const cheerio = require('cheerio')

const url = 'https://blog.facialix.com/category/cupones/'

router.get('/',async (req,res) =>{
    try{
        res.setHeader('Content-type', 'text/event-stream')
        res.setHeader('Access-Control-Allow-Origin', '*')

        const jsonContent =JSON.stringify(await getPromos())
        res.write(jsonContent)

        const intervalId = setInterval(async() => {
            const jsonContent =JSON.stringify(await getPromos())
            res.write(jsonContent)
        }, 60000)

        res.on('close', () => {
            console.log('Connection closed')
            clearInterval(intervalId)
            res.end()
        })
        
    }catch(err){
        console.log(err)
        return res.status(500).send('Server error')
    }
})
function getPromos(){
    const aux = axios(url).then(res =>{
        const articles = []
        const html = res.data
        const $ = cheerio.load(html)
        $('.post-title', html).each(function () {
            const title = $(this).find('a').text()
            const url = $(this).find('a').attr('href')
            articles.push({
                title,
                url
            })
        })
        return articles
    })
    return aux
}
module.exports = router
