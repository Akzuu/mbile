const express = require('express')
const ical = require('ical')

const router = new express.Router()

router.get('/calendar', async (req, res) => {
    res.render('calendar', {
        title: 'mbile.fi',
        name: 'Team Tumppi vs *',
        calendar_url: process.env.CALENDAR_URL
    })
})

// This is not currently used, but has future potential for
// API solutions
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