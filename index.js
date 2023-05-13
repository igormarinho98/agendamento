const express = require("express");
const app = express();
const mongoose = require("mongoose");
const appointmentService = require("./services/AppointmentService");
const AppointmentService = require("./services/AppointmentService");
    
    app.use(express.static("public"));

    app.use(express.urlencoded({extended: false}));
    app.use(express.json());

    app.set('view engine', 'ejs');

    mongoose.connect("mongodb+srv://igormarinholeo2014:EgpIbivRcxXXs6YP@cluster0.cpzxui5.mongodb.net/agendamento",{useNewUrlParser: true, useUnifiedTopology: true}); 

    app.get("/", (req, res) => {g
        res.render("index");
    });

    app.get("/cadastro", (req, res) => {
        res.render("create");
    })


    app.post("/create", async(req, res)=> {
       var status = await appointmentService.Create(
            req.body.name,
            req.body.email,
            req.body.description,
            req.body.cpf,
            req.body.date,
            req.body.time
            )

            if (status) {
                res.redirect("/")   
            } else {
                res.send(console.error)
            }
    })


    app.get("/getcalendar", async (req, res) => {
        var consulta = await AppointmentService.GetAll(false);
        res.json(consulta);
    });

    app.listen(3000, () => {});