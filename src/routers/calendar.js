const express = require('express')
const ical = require('ical')

const router = new express.Router()

router.get('/calendar', async (req, res) => {
    res.render('calendar', {
        title: 'mbile.fi',
        name: 'Team Tumppi vs *'
    })
})

// This is not currently used, but has future potential for
// API solutions
router.get('/calendar/data.json', async (req, res) => {
    const url = process.env.POP_CALENDAR
    try {
        await ical.fromURL(url,{}, (error, data) => {
            if (error) {
                throw new Error(error)
            }
            console.log(typeof data)
            parsedData = parsePOPData((data))
            res.setHeader('content-type', 'application/json')
            res.send(JSON.stringify(parsedData))
        })
    } catch(e) {
        res.send(500).send(e)
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