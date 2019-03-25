const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const got = require("got");
const cheerio = require("cheerio");

const { normaliseString } = require("./normaliseString");
const { CONFIG } = require("./CONFIG");

const appMiddleware = async (_request, res) => {
  try {
    const response = await got(CONFIG.EURO_JACKPOT_URL);
    const $ = cheerio.load(response.body, { normalizeWhitespace: true });
    const rawText = $(".results").text();
    if (!rawText) {
      throw new Error("Data not found");
    }
    const cleanResponse = normaliseString(rawText);
    res.setHeader("content-type", "application/json");
    res.send(JSON.stringify(cleanResponse));
  } catch (error) {
    res.setHeader("content-type", "application/json");
    res.status(500).send(error);
  }
};

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", appMiddleware);

app.listen(CONFIG.PORT, () =>
  console.log(`Server running on port: ${CONFIG.PORT}`)
);
