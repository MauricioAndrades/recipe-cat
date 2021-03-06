var express = require('express');
// var url = require('url');
var qs = require('qs');
// var util = require('util');
// var fs = require('fs');
var axios = require('axios');
require('dotenv').load();
var router = express.Router();

router.get('', function(req, res) {
  var qString = qs.stringify(req.query);
  var ApiEndpoint = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?";
  var ApiIdEndPoint = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/";
  var number = "&number=6";
  var searchQ = ApiEndpoint + qString + number;

  axios.get('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients', {
      url: '/ingredients',
      method: 'get',
      headers: {
        "X-Mashape-Key": process.env.APIKEY
      },
      params: {
        ingredients: req.query.ingredients,
      },
      timeout: 1000,
      withCredentials: false,
      responseType: 'json',
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
    })
    .then(function(data) {
      var arr = data.data;
      for (var i = 0; i < arr.length; i++) {

        res.title = arr[i].title,
          res.id = arr[i].id,
          res.image = arr[i].image
      };
      res.render(data.data);
    })
    .catch(function(res) {
      if (res instanceof Error) {
        console.log('Error', res.message);
      } else {
        res.json(data);
      }
    });
});

module.exports = router;
