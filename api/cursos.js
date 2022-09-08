const axios = require('axios')
const cheerio = require('cheerio')

const url = 'https://blog.facialix.com/category/cupones/'

const getAllCurse = async (req,res) =>{
    try{
        res.json(await getPromos())
    }catch(err){
        console.log(err)
        return res.status(500).send('Server error')
    }
}
const getOneCurse = async (req,res) =>{
    const { params: {id},} = req
    const urlArray = id.toString()
    const data = await getPromosId(urlArray)
    try{
        res.json(data)
    }catch(err){
        console.log(err)
        return res.status(500).send('Server error')
    }
}

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

function getPromosId(id){
    const aux = axios(`https://blog.facialix.com/${id}`).then(res =>{
        var articles
        const html = res.data
        const $ = cheerio.load(html)

        $('.wp-container-2, .is-content-justification-center, .wp-block-buttons', html).each(function () {
            const url = $(this).find('a').attr('href')
            articles = {
                url
            }
        })
        return articles
    })
    return aux
}
module.exports = {getAllCurse, getOneCurse}
