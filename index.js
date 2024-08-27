import express from "express"
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended : true}));

app.get("/", (req, res) => {
    // Make the get route work and render the index.ejs file.
    res.render("index.ejs");
})

app.get("/create", (req, res) => {
    // Make the get route work and render the index.ejs file.
    res.render("create.ejs");
})

app.post("/", (req, res) => {
    var nameOfAuthor = req.body["floatingName"];
    var titleOfPost = req.body["floatingTitle"];
    var descriptionOfPost = req.body["floatingDescription"];

    res.render("index.ejs", {
        name : nameOfAuthor,
        title : titleOfPost,
        description : descriptionOfPost
    })
})

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
})