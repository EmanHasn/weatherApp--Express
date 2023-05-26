const express = require("express");
const path = require("path");
const geocode = require("./tools/geocode");
const forecast = require("./tools/forecast");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3001;
const PublicFolder = path.join(__dirname , "../public")
app.use(express.static (PublicFolder));

app.set('view engine' , "hbs"); 

//rename views folder
const viewsDirectory = path.join(__dirname , "../temp1/views");
app.set('views' , viewsDirectory);

//header paartials path
const PathPartials = path.join(__dirname , "../temp1/partials")
hbs.registerPartials(PathPartials);



app.get("/" , (req , res)=>{
    res.render('index' , {
        title:"home page",
        desc:"home page desc"
    })
})

app.get('/weather' , (req , res)=>{
    if(!req.query.address) {
        return res.send({
            error:"please provide address"
        })
    }
    geocode(req.query.address , (error , data)=>{
        if(error) {
            return res.send({error})
        }
        forecast(data.latitude , data.longtitude , (error , forecastData)=>{
            if(error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location : req.query.address,
                latitude : data.latitude,
                longtitude : data.longtitude
            })
        })
    })
})


app.get("*" , (req ,res)=>{
    res.render('404error' , {
        title:"error page",
        desc:"error page desc"
    })
})

app.listen(port , ()=>{
    console.log("everything is ok")
})
