const 	express 	= require("express"),
		fs			= require("fs"),
		hbs			= require("hbs");

var app = express();
hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

//=================================
//LOGGING TO server.log in root directory
//=================================
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile("server.log", log + "\n", (err) => {
		if(err){
			console.log("Unable to append to server.log");
		};
	});
	next();
});

//=================================
//MAINTENANCE REROUTE
//=================================
// app.use((req, res, next) => {
	// res.render("maintenance", {
		// pageTitle: "Maintenance"
	// });
// });

//=================================
//DEFINE EXPRESS PUBLIC DIRECTORY
//=================================
app.use(express.static(__dirname + "/public"));

//=================================
//DEFINE HELPERS
//=================================
hbs.registerHelper("getCurrentYear", () => {
	return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
	return text.toUpperCase();
});

//=================================
//DEFINE STATIC ROUTES
//=================================
app.get("/", (req, res) => {
	res.render("home", {
		pageTitle: "Home Page",
		welcomeMessage: "Welcome to the home page!"
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		pageTitle: "About Page",
	});
});

app.get("/bad", (req, res) => {
	res.send({
		Error: "Bad Request",
		Cause: "Page doesn't exist",
		Solution: "Go fuck yourself"
	});
});

//=================================
//START SERVER LISTENING
//=================================
app.listen(process.env.PORT || 3000, process.env.IP, () => {
	console.log("Server is listening on port 3000");
});