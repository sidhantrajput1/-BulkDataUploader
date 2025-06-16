import express from 'express'
import cors from 'cors'


const app = express();
const PORT = process.env.PORT || 3000

// middlewares
app.use(express.json());
app.use(cors());



app.get("/", (req, res) => {
    res.send("Hello from Backend");
})

app.listen(PORT, (req, res) => {
    console.log(`Server started on PORT: http://localhost:${PORT}`)
})