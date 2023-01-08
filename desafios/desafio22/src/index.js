import app from "./app.js"
import connectDB from "./databases.js"

connectDB()

app.listen(8080, () => {
    console.log("Server on port 8080")
})
