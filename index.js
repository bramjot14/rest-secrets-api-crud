import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

//  Replace with your actual Bearer token
const yourBearerToken = "YOUR_TOKEN_HERE";

const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for API response..." });
});

app.post("/get-secret", async (req, res) => {
  try {
    const result = await axios.get(`${API_URL}/secrets/${req.body.id}`, config);
    res.render("index.ejs", { content: JSON.stringify(result.data, null, 2) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response?.data || error.message) });
  }
});

app.post("/post-secret", async (req, res) => {
  try {
    const result = await axios.post(
      `${API_URL}/secrets`,
      { secret: req.body.secret, score: req.body.score },
      config
    );
    res.render("index.ejs", { content: JSON.stringify(result.data, null, 2) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response?.data || error.message) });
  }
});

app.post("/put-secret", async (req, res) => {
  try {
    const result = await axios.put(
      `${API_URL}/secrets/${req.body.id}`,
      { secret: req.body.secret, score: req.body.score },
      config
    );
    res.render("index.ejs", { content: JSON.stringify(result.data, null, 2) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response?.data || error.message) });
  }
});

app.post("/patch-secret", async (req, res) => {
  try {
    const result = await axios.patch(
      `${API_URL}/secrets/${req.body.id}`,
      { secret: req.body.secret, score: req.body.score },
      config
    );
    res.render("index.ejs", { content: JSON.stringify(result.data, null, 2) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response?.data || error.message) });
  }
});

app.post("/delete-secret", async (req, res) => {
  try {
    const result = await axios.delete(
      `${API_URL}/secrets/${req.body.id}`,
      config
    );
    res.render("index.ejs", { content: JSON.stringify(result.data, null, 2) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response?.data || error.message) });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
