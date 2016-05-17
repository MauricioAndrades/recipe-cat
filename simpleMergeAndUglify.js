var cachedModules = [];

cachedModules[7545] = {
		exports: {}
	},
	function(e, r) {
		var s = require("express"),
			a = s.Router();
		a.get("/", function(e, r, s) {
			r.send("index", {
				title: "Express"
			});
		}), e.exports = a;
	}.call(this, cachedModules[7545], cachedModules[7545].exports), cachedModules[7433] = {
		exports: {}
	},
	function(e, r) {
		var s = require("express"),
			a = require("qs"),
			t = require("axios");
		require("dotenv").load();
		var o = s.Router();
		o.get("", function(e, r) {
			a.stringify(e.query);
			t.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients", {
				url: "/ingredients",
				method: "get",
				headers: {
					"X-Mashape-Key": process.env.APIKEY
				},
				params: {
					ingredients: e.query.ingredients
				},
				timeout: 1e3,
				withCredentials: !1,
				responseType: "json",
				xsrfCookieName: "XSRF-TOKEN",
				xsrfHeaderName: "X-XSRF-TOKEN"
			}).then(function(e) {
				for (var s = e.data, a = 0; a < s.length; a++) r.title = s[a].title, r.id = s[a].id,
					r.image = s[a].image;
				r.render(e.data);
			})["catch"](function(e) {
				e instanceof Error ? console.log("Error", e.message) : e.json(data);
			});
		}), e.exports = o;
	}.call(this, cachedModules[7433], cachedModules[7433].exports);

var express = require("express"),
	exphbs = require("express-handlebars"),
	path = require("path");

require("dotenv").load();

var logger = require("morgan"),
	cookieParser = require("cookie-parser"),
	bodyParser = require("body-parser"),
	routes = cachedModules[7545].exports,
	ingredients = cachedModules[7433].exports,
	app = express(),
	hbs = exphbs.create({
		helpers: {
			foo: function() {
				return "FOO!";
			},
			bar: function() {
				return "BAR!";
			}
		}
	});

app.set("views", path.join(__dirname, "views")), app.engine("handlebars", exphbs({
		defaultLayout: "handlebars"
	})), app.set("view engine", "handlebars"), app.use(logger("dev")), app.use(bodyParser.json()),
	app.use(bodyParser.urlencoded({
		extended: !1
	})), app.use(cookieParser()), app.use(express["static"](path.join(__dirname, "public"))),
	app.use("/", routes), app.use("/ingredients", ingredients), app.use(function(e, r, s) {
		var a = new Error("Not Found");
		a.status = 404, r.send(a);
	}), "development" === app.get("env") && app.use(function(e, r, s, a) {
		s.status(e.status || 500), s.render("error", {
			message: e.message,
			error: e
		});
	}), app.use(function(e, r, s, a) {
		s.status(e.status || 500), s.render("error", {
			message: e.message,
			error: {}
		});
	}), module.exports = app;
