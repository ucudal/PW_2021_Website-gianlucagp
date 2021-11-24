const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cookieparser = require("cookie-parser");
const cors = require('cors')
const router = express.Router();

// allow the app to use express
const app = express();

// allow the app to use cookieparser
app.use(helmet());

// allow the app to use cookieparser
app.use(cookieparser());

// allow the express server to process POST request rendered by the ejs files 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// allow the express server to read and render the static css file
app.use(express.static(__dirname + '/docs'));

app.get('/',function(req,res){
    res.render(path.join(__dirname+'/docs/index.html'));
    //__dirname : It will resolve to your project folder.
});

///////endpoint

const experiencias = {"experiencia_laboral":[{"empresa":"cdargent" ,"puesto":"interno","descripcion":"aburrido" , "fechaInicio": new Date("2020-07-15"), "fechaFin": new Date("2021-07-15")}, {"empresa":"tata" ,"puesto":"chorro","descripcion":"malandro" , "fechaInicio": new Date("2020-07-15"), "fechaFin": new Date("2021-07-15")}, {"empresa":"devoto" ,"puesto":"chorro","descripcion":"malandro" , "fechaInicio": new Date("2020-07-15"), "fechaFin": new Date("2021-07-15")}]};


app.get('/', function(req, res) {
    res.send("¡Hola mundo!")
  });
  
  app.get('/experiencia-laboral', function(req, res) {
    res.send(experiencias)
  });
  
  app.get('/experiencia-laboral.json', function(req, res) {
    res.send(experiencias)
  });
  
  app.get('/experiencia-laboral/:empresa', function(req, res) {
    var experience = null;
    for (j = 0; j < experiencias.experiencia_laboral.length; j++) {
      if(experiencias.experiencia_laboral[j].empresa.localeCompare(req.params.empresa)===0){
        experience=experiencias.experiencia_laboral[j];
      }
    }
    if(experience == null){
      res.status(404).send("404 no existe esa empresa");
    }else{
      res.send(experience);
    }
    /*const experiencia = experiencias.find(c => JSON.parse(c).nombreContacto.empresa.localeCompare(JSON.parse(req.params).empresa)===0);
    if(!experiencia) res.status(404).send("404 no existe esa empresa");
    res.send(experiencia);*/
  });


//app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');

module.exports=app;