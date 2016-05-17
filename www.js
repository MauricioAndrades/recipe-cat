function normalizePort(e) {
	var r = parseInt(e, 10);
	return isNaN(r) ? e : r >= 0 ? r : !1
}

function onError(e) {
	if ("listen" !== e.syscall) throw e;
	var r = "string" == typeof port ? "Pipe " + port : "Port " + port;
	switch (e.code) {
		case "EACCES":
			console.error(r + " requires elevated privileges"), process.exit(1);
			break;
		case "EADDRINUSE":
			console.error(r + " is already in use"), process.exit(1);
			break;
		default:
			throw e
	}
}

function onListening() {
	var e = server.address(),
		r = "string" == typeof e ? "pipe " + e : "port " + e.port;
	debug("Listening on " + r)
}
var cachedModules = [];
cachedModules[4673] = {
		exports: {}
	},
	function(e, r) {
		var s = require("express"),
			t = s.Router();
		t.get("/", function(e, r, s) {
			r.send("index", {
				title: "Express"
			})
		}), e.exports = t
	}.call(this, cachedModules[4673], cachedModules[4673].exports), cachedModules[6565] = {
		exports: {}
	},
	function(e, r) {
		var s = require("express"),
			t = require("qs"),
			o = require("axios");
		require("dotenv").load();
		var n = s.Router();
		n.get("", function(e, r) {
			t.stringify(e.query);
			o.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients", {
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
				for (var s = e.data, t = 0; t < s.length; t++) r.title = s[t].title, r.id = s[t].id, r.image = s[t].image;
				r.render(e.data)
			})["catch"](function(e) {
				e instanceof Error ? console.log("Error", e.message) : e.json(data)
			})
		}), e.exports = n
	}.call(this, cachedModules[6565], cachedModules[6565].exports), cachedModules[6491] = {
		exports: {}
	},
	function(e, r) {
		var s = require("express"),
			t = require("express-handlebars"),
			o = require("path");
		require("dotenv").load();
		var n = require("morgan"),
			a = require("cookie-parser"),
			i = require("body-parser"),
			u = cachedModules[4673].exports,
			d = cachedModules[6565].exports,
			c = s();
		t.create({
			helpers: {
				foo: function() {
					return "FOO!"
				},
				bar: function() {
					return "BAR!"
				}
			}
		});
		c.set("views", o.join(__dirname, "views")), c.engine("handlebars", t({
			defaultLayout: "handlebars"
		})), c.set("view engine", "handlebars"), c.use(n("dev")), c.use(i.json()), c.use(i.urlencoded({
			extended: !1
		})), c.use(a()), c.use(s["static"](o.join(__dirname, "public"))), c.use("/", u), c.use("/ingredients", d), c.use(function(e, r, s) {
			var t = new Error("Not Found");
			t.status = 404, r.send(t)
		}), "development" === c.get("env") && c.use(function(e, r, s, t) {
			s.status(e.status || 500), s.render("error", {
				message: e.message,
				error: e
			})
		}), c.use(function(e, r, s, t) {
			s.status(e.status || 500), s.render("error", {
				message: e.message,
				error: {}
			})
		}), e.exports = c
	}.call(this, cachedModules[6491], cachedModules[6491].exports);
var app = cachedModules[6491].exports,
	debug = require("debug")("f-recipecat:server"),
	http = require("http"),
	port = normalizePort(process.env.PORT || "3000");
app.set("port", port);
var server = http.createServer(app);
server.listen(port), server.on("error", onError), server.on("listening", onListening);
//# sourceMappingURL=UGLIFY_SOURCE_MAP_TOKEN
