const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3002;

app.set("view engine", "pug");
const corsOptions = {
  origin: "http://localhost:3002",
};

//Middleware

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors(corsOptions));

//Db Connection
const db = require("./models");
const dbConfig = require("./config/db.config")
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
  })
  .then(()=>{
      console.log("Successful connection to MongoDB");
      initial();
  })
  .catch(err =>{
      console.log("Connection error:", err);
      process.exit();
  })

  const initial = () =>{
      Role.estimatedDocumentCount((err, count) =>{
          if(!err && count === 0){
              new Role({
                  name:"user"
              }).save(err =>{
                  if(err){
                      console.log('Error', err)
                  }
                  console.log("Added 'user' to roles collection.");
              });

              new Role({
                  name:"moderator"
                  }).save(err =>{
                      if(err){
                          console.log("Error", err)
                      }
                      console.log("Added 'moderator' to roles collection.")
                  });
                new Role({
                    name:"admin"
                }).save(err =>{
                    if(err){
                        console.log("Error",err)
                    }
                    console.log("Added 'admin' to roles collection")
                })
          }
      })
  }

//Routes
require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)


app.get("/", (req, res) => {
  res.render("index", { title: "Hey!", message: "Hello from Pug!" });
});

app.get("/welcome", (req, res) => {
  res.render("welcome", {});
});
app.get("/login", (req, res) => {
  res.render("login");
});

//Server start
app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});



