import express from "express"
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended : true}));

// tạo một mảng data các post
let submittedData = [];

// trang chủ
app.get("/", (req, res) => {
    res.render("index.ejs", {submittedData});
});

app.get("/create", (req, res) => {
    res.render("create.ejs");
})

// app.get("/view", (req, res) => {
//     res.render("view.ejs");
// });

app.post("/submit", (req, res) => {
    const pname = req.body['name'];
    const ptitle = req.body['title'];
    const ptext = req.body['text'];
    const today = new Date();
    const newPost = {
        fName: pname,
        fTitle: ptitle,
        fText: ptext,
        tDate: today.toDateString()
    };
    // đẩy data vào mảng đã tạo
    submittedData.push(newPost);
    res.redirect("/"); 
})

// route gửi ID từ view sang create để biết chính xác là item nào sửa
app.get("/edit/:id", (req, res) => {
    const postId = req.params.id;
    // Lấy post từ submittedData dựa trên postId
    const postToEdit = submittedData[postId];

    // Render an edit page/form passing the post data
    res.render("create.ejs", { postToEdit, postId });
});

// gửi data từ view sang create để sửa
app.post("/edit/:id", (req, res) => {
    const postId = req.params.id;
    // Update the post in submittedData based on the edited data in req.body
    submittedData[postId].fName = req.body.name;
    submittedData[postId].fTitle = req.body.title;
    submittedData[postId].fText = req.body.text;
    // Redirect back to the main page after editing
    res.redirect("/");
});

// xoá item
app.post("/delete/:id", (req, res) => {
    const postId = req.params.id;
    // Remove the post from submittedData based on the postId
    submittedData.splice(postId, 1); //xoá 1 phần tử tính từ postId

    // Redirect back to the main page after deleting
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
})