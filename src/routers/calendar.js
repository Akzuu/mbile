const express = require('express')
const ical = require('ical')

const router = new express.Router()

router.get('/calendar', async (req, res) => {
    res.render('calendar', {
        title: 'mbile.fi',
        name: 'Team Tumppi vs *'
    })
})

// milliseconds between calendar updates
// 86400000 = 1 day
const calendar_cache_duration = 86400000
var pop_calendar_data = null
var pop_calendar_updated = null
// This is not currently used, but has future potential for
// API solutions
router.get('/calendar/data.json', async (req, res) => {
    const url = process.env.POP_CALENDAR
    
    if(pop_calendar_data 
      && new Date().getTime() < pop_calendar_updated+calendar_cache_duration){
      res.json(pop_calendar_data)
    } else try {
        await ical.fromURL(url,{}, (error, data) => {
            if (error) {
                throw new Error(error)
            }
            pop_calendar_data = parsePOPData(data)
            pop_calendar_updated = new Date().getTime()
            res.json(pop_calendar_data)
        })
    } catch(e) {
        console.log(e)
        res.status(500).send(e)
    }
})

function parsePOPData(data){
  parsedData = [];
  for(let key in data){
    let val = data[key];
    if(val["type"] == "VEVENT"){
      parsedData.push({
        id: val["uid"],
        start: val["start"],
        end: val["end"],
        title: val["summary"],
        extendedProps: {
          description: val["description"],
          location: val["location"]
          }
      });
    }
  }
  return parsedData
}

module.exports = router