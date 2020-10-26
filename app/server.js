const express = require("express");
const bodyParser = require("body-parser");
const yelp = require("yelp-fusion");
const Step = require("step");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/redwood/icecream", (req, resp) => {
  const apiKey = process.env.YELP_API_KEY;

  // Search Parameters to Loads Top 10 ice cream shop in redwood city
  const searchRequest = {
    location: "Redwood City",
    term: "Ice Cream",
    limit: 10,
    sort_by: "rating",
  };

  const client = yelp.client(apiKey);
  var data = [];
  Step(
    // Loads Top 10 ice cream shop in redwood city
    function loadIcecreamData() {
      client.search(searchRequest).then((res) => {
        data = res.jsonBody.businesses;
        this(null, res);
      });
    },
    // Loads Reviews in series as in parallel yelp end point giving 'end-point-per-second' hit limit reached error
    function loadReviewOne(err, response) {
      if (err) {
        console.log(err);
      }
      client.reviews(data[0].id).then((res) => {
        data[0]["review"] = JSON.parse(res.body).reviews[0].text;
        data[0]["username"] = JSON.parse(res.body).reviews[0].user.name;
        this(null, res);
      });
    },
    function loadReviewTwo(err, response) {
      client.reviews(data[1].id).then((res) => {
        data[1]["review"] = JSON.parse(res.body).reviews[0].text;
        data[1]["username"] = JSON.parse(res.body).reviews[0].user.name;
        this(null, res);
      });
    },
    function loadReviewThree(err, response) {
      client.reviews(data[2].id).then((res) => {
        data[2]["review"] = JSON.parse(res.body).reviews[0].text;
        data[2]["username"] = JSON.parse(res.body).reviews[0].user.name;
        this(null, res);
      });
    },
    function loadReviewFour(err, response) {
      client.reviews(data[3].id).then((res) => {
        data[3]["review"] = JSON.parse(res.body).reviews[0].text;
        data[3]["username"] = JSON.parse(res.body).reviews[0].user.name;
        this(null, res);
      });
    },
    function loadReviewFive(err, response) {
      client.reviews(data[4].id).then((res) => {
        data[4]["review"] = JSON.parse(res.body).reviews[0].text;
        data[4]["username"] = JSON.parse(res.body).reviews[0].user.name;
        this(null, res);
      });
    },
    function loadReviewSix(err, response) {
      client.reviews(data[5].id).then((res) => {
        data[5]["review"] = JSON.parse(res.body).reviews[0].text;
        data[5]["username"] = JSON.parse(res.body).reviews[0].user.name;
        this(null, res);
      });
    },
    function loadReviewSeven(err, response) {
      client.reviews(data[6].id).then((res) => {
        data[6]["review"] = JSON.parse(res.body).reviews[0].text;
        data[6]["username"] = JSON.parse(res.body).reviews[0].user.name;
        this(null, res);
      });
    },
    function loadReviewEight(err, response) {
      client.reviews(data[7].id).then((res) => {
        data[7]["review"] = JSON.parse(res.body).reviews[0].text;
        data[7]["username"] = JSON.parse(res.body).reviews[0].user.name;
        this(null, res);
      });
    },
    function loadReviewNine(err, response) {
      client.reviews(data[8].id).then((res) => {
        data[8]["review"] = JSON.parse(res.body).reviews[0].text;
        data[8]["username"] = JSON.parse(res.body).reviews[0].user.name;
        this(null, res);
      });
    },
    function loadReviewTen(err, response) {
      client.reviews(data[9].id).then((res) => {
        data[9]["review"] = JSON.parse(res.body).reviews[0].text;
        data[9]["username"] = JSON.parse(res.body).reviews[0].user.name;
        this(null, res);
      });
    },
    // Send the final response
    function showStuff(err, response) {
      if (err) {
        console.log(err);
      }
      resp.send(JSON.stringify(data));
    }
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
