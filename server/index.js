const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const courseRoutes = require("./routes/Course");
const contactRoute = require("./routes/Contact")
const chatbotRoute = require("./routes/chatbot");


const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 4000

//database connect
database.dbConnect();

//middleware
app.use(express.json());
app.use(cookieParser());

app.use(
    cors()
)

app.use(
    fileUpload({
        useTempFiles:true,
         tempFileDir : '/tmp/'
    })
)

//cloudinary connect
cloudinaryConnect();

//routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/reach",contactRoute);
app.use("api/v1/chat",chatbotRoute);

//default route
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:'Your server up and running.....'
    });
});

app.listen(PORT, ()=>{
    console.log(`app is running at ${PORT}`);
})






const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Make sure this is still the correct model name.

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const result = await model.generateContent(message);
    const response =  result.response;
    const text = response.text();
    res.json({ response: text });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});







app.get('/list-models', async (req, res) => {
  try {
    const models = await genAI.getAvailableModels();
    res.json(models);
  } catch (error) {
    console.error('Error listing models:', error);
    res.status(500).json({ error: 'Failed hto list models' });
  }
});

