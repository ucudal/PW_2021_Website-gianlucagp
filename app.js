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

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("view engine", "ejs");

// render the ejs views
app.set("views", path.join(__dirname, "/docs/views"));


app.get('/',function(req,res){
    let PW_2021_CV_Contacto = req.cookies.PW_2021_CV_Contacto;
    
    return res.render(path.join(__dirname+'/docs/index.html', {
        PW_2021_CV_Contacto,
      }));
    //__dirname : It will resolve to your project folder.
});

app.get("/welcome", (req, res) => {
    // get the username
    let PW_2021_CV_Contacto = req.cookies.PW_2021_CV_Contacto;
  
    // render welcome page
    return res.render("welcome", {
      PW_2021_CV_Contacto,
    });
  });

app.post("/process_login", (req, res) => {
    // get the data
    let { nombreContacto, emailContacto, commentContacto } = req.body;
    let nombre= nombreContacto;
    let pass= emailContacto;
    let comm = commentContacto;
  
    let userdetails_test = {
      nombreContacto: nombre,
      emailContacto: pass,
      commentContacto:comm
    };
  
    // basic check
    if (nombreContacto.localeCompare("") != 0) {
      console.log(userdetails_test);
      // saving the data to the cookies
      res.cookie("PW_2021_CV_Contacto", JSON.stringify(userdetails_test));
      // redirect
      return res.redirect("/welcome");
    } else {
      // redirect with a fail msg
      return res.redirect("/login?msg=fail");
    }
  });


app.get("/login", (req, res) => {
    // check if there is a msg query
    let bad_auth = req.query.msg ? true : false;
    let PW_2021_CV_Contacto = req.cookies.PW_2021_CV_Contacto;
  
    // if there exists, send the error.
    if (bad_auth) {
      res.status(404).send("Falta el nombre de contacto.");
      return res.render(path.join(__dirname+'/docs/login.ejs', {
        error: "Falta el nombre de contacto.",
      }));
    } else {
      // else just render the login
      return res.render("login", {
        PW_2021_CV_Contacto,
      });
    }
  });

  app.get("/logout", (req, res) => {
    // clear the cookie
    res.clearCookie("PW_2021_CV_Contacto");
    // redirect to login
    return res.redirect("/");
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
//cookies




//app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');

module.exports=app;