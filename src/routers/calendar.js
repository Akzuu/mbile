const express = require('express')
const ical = require('ical')

const router = new express.Router()

router.get('/calendar', async (req, res) => {
    res.render('calendar', {
        title: 'mbile.fi',
		name: 'Team Tumppi vs *'
    })
})

router.get('/calendar/data', async (req, res) => {
    const url = process.env.CALENDAR_URL
    try {
        await ical.fromURL(url,{}, (error, data) => {
            if (error) {
                throw new Error(error)
            }
            res.send(data)
        })
    } catch(e) {
        res.send(500).send(e)
    }
})

module.exports = router