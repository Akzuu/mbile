const express = require('express')
const JustWatch = require('justwatch-api')
const request = require('request')
const router = express.Router()



router.get('/movies', (req, res) => {
    res.render('movies', {
        title: 'mbile.fi',
        name: 'Team Tumppi vs *',
    })
})


router.get('/movies/data', (req, res) => {
    try {
        request(`https://apis.justwatch.com/content/titles/${req.query.type}/${req.query.id}/locale/fi_FI`,
        (error, response, body) => {
            if(error) {
                throw new Error(error)
            }
            res.send(JSON.parse(body))
        })
    } catch(e) {
        res.statusCode(500).send(e)
    }
})


// const search = async () => {
//     const jw = new JustWatch('fi_FI')
//     // const result = await jw.search({query: 'Kill Bill'})
//     // const providers = await jw.getProviders()
    
//     request('https://apis.justwatch.com/content/titles/movie/137220/locale/fi_FI',
//         (error, response, body) => {
//             console.log('error:', error)
//             console.log('statusCode', response && response.statusCode)
//             console.log('body:', body)
//         })
    
// }

// search()

module.exports = router