var express = require('express');
// var url = require('url');
var qs = require('qs');
// var util = require('util');
// var fs = require('fs');
require('dotenv').load();
var router = express.Router();



router.get('/', function(req, res) {
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
        // transformResponse: [function (data) {
        //     return JSON.stringify(data);
        //     // return data;
        //   }],
    })/*.then(function(data) {
        console.log('--------------------hit');
        var ids = [];
        ids = ids.map(function(index, elem) {
            data.data[i].id;
        })
        for (var i = 0; i < ids.length; i++) {
            console.log(ids[i]);
        }
        return data;
        // fs.writeFile('./data.json', JSON.stringify(data.data, null, 2), 'utf-8');
    })*/
    .then(function(data) {
        // console.log(data.data);
        // console.log(data.data);
        // console.log(data.status);
        // console.log(data.statusText);
        // console.log(data.headers);
        // console.log(data.config);
        res.json(data);
    })
    .catch(function (response) {
      if (response instanceof Error) {
        console.log('Error', response.message);
      } else {
          res.send('idk');
        // console.log(response.data);
        // console.log(response.status);
        // console.log(response.headers);
        // console.log(response.config);
      }
    });
});

module.exports = router;
