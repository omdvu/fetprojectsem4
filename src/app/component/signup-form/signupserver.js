import express from "express";
import fs from "fs";
import cors from "cors";
const app = express();

app.use(cors({ origin:'http://localhost:4200'}));
app.use(express.json());

const port = process.env.port || 3000;

app.get("/electronics",(req,res) => {
    let prods = [];
    fs.readFile("allprods.txt","utf-8",(err,data) => {
        if(err){
            return res.status(500).send("Server error");
        }
        if(data != ''){
            let products = JSON.parse(data);
            for (let prod of products) {
                if(prod.category.id == 2){
                    prods.push(prod);
                }
            }
            return res.status(200).json(prods);
        }
    });
})

app.get("/furniture",(req,res) => {
    let prods = [];
    fs.readFile("allprods.txt","utf-8",(err,data) => {
        if(err){
            return res.status(500).send("Server error");
        }
        if(data != ''){
            let products = JSON.parse(data);
            for (let prod of products) {
                if(prod.category.id == 3){
                    prods.push(prod);
                }
            }
            return res.status(200).json(prods);
        }
    });
})

app.get("/clothes",(req,res) => {
    let prods = [];
    fs.readFile("allprods.txt","utf-8",(err,data) => {
        if(err){
            return res.status(500).send("Server error");
        }
        if(data != ''){
            let products = JSON.parse(data);
            for (let prod of products) {
                if(prod.category.id == 1 || prod.category.id == 4){
                    prods.push(prod);
                }
            }
            return res.status(200).json(prods);
        }
    });
})

app.get("/misc",(req,res) => {
    let prods = [];
    fs.readFile("allprods.txt","utf-8",(err,data) => {
        if(err){
            return res.status(500).send("Server error");
        }
        let constraint = [1,2,3];
        if(data != ''){
            let products = JSON.parse(data);
            for (let prod of products) {
                if(prod.category.id != 1 && prod.category.id != 2 && prod.category.id != 3 && prod.category.id != 4){
                    prods.push(prod);
                }
            }
            return res.status(200).json(prods);
        }
    });
})

app.get("/getprods",(req,res) => {
    let prods = [];
    fs.readFile("allprods.txt","utf-8",(err,data) => {
        if(err){
            return res.status(500).send("Server errrrror");
        }
        if(data != ''){
            let products = JSON.parse(data);
            return res.status(200).json(products);
        }
    });
})

app.post("/users",(req,res) => {
    let existingusers = [];
    fs.readFile("userlogininfo.txt","utf-8",(err,data) => {
        let givenData = req.body;
        console.log("given object:", givenData);
        if(err){
            return res.status(500).send("Server error");
        }
        if(data != ''){
            try{
                let datas = data.trim().split("\n");
                existingusers = datas.map(data => JSON.parse(data))
            }
            catch(err){
                console.error("Parsing error:", err);
                return res.status(500).send("Corrupted user file");
            }
        }
        for(let user of existingusers){
            if (user.usermail == givenData.usermail && user.userpass == givenData.userpass){
                return res.status(200).send(user);
            }
        }
        return res.status(400).send("LOL Sorry")
    })
})

app.post("/signup",(req,res) => {
    let userObj = req.body;
    console.log("sending object:", userObj);
    
    let existingusers = [];
    fs.readFile("userlogininfo.txt",'utf-8',(err,data) => {
        if(err){
            return res.status(500).send("Server Error");
        }
        if(data != ''){
            try{
                let datas = data.trim().split("\n");
                existingusers = datas.map(data => JSON.parse(data));
            }
            catch(err){
                console.error("Parsing error:", err);
                return res.status(500).send("Corrupted user file");
            }
        }
        
        let duplicate = existingusers.some(user => user.usermail == userObj.usermail);

        if (duplicate) {
            console.log("Duplicate user detected!");
            return res.status(400).send("User already signed up");
        }
        
        let maxId = 0;
        if(existingusers.length > 0){
            maxId = Math.max(...existingusers.map(user => user.id || 0));

        }
        userObj.id = maxId + 1;
        
        userObj = JSON.stringify(userObj)
        
        fs.appendFile("userlogininfo.txt",userObj + "\n",(err) => {
            if(err){
                return res.status(500).send("Server Error");
            }
            else{
                return res.status(200).send();
            }
        }) 
    });
});

app.patch("/placeorder/:id", (req, res) => {
    console.log("Ok");
    let id = Number(req.params.id);
    let newObj = req.body;
    fs.readFile("userlogininfo.txt", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).send("Server Error");
        }

        let existingusers = [];
        if (data.trim() !== '') {
            try{
                let datas = data.trim().split("\n");
                existingusers = datas.map(user => JSON.parse(user));
            }
            catch(parseErr){
                console.error("Parsing error:", parseErr);
                return res.status(500).send("Corrupted user file");
            }
        }

        let index = existingusers.findIndex(user => user.id === id);

        if (index === -1) {
            return res.status(404).send("User not found");
        }

        existingusers[index] = newObj;

        let finalData = existingusers.map(user => JSON.stringify(user)).join("\n");

        fs.writeFile("userlogininfo.txt", finalData + "\n", (err) => {
            if(err){
                return res.status(200).send("User updated successfully");
            }
            else{
                return res.status(200).send();
            }
            
        });
    });
});

    


app.listen(port, () => {
    console.log(`Server running at ${port}`);
});