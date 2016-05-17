var NodeUglifier = require("node-uglifier");
var nodeUglifier = new NodeUglifier("./www");
nodeUglifier.merge().uglify();

nodeUglifier.exportToFile("./www.js");
nodeUglifier.exportSourceMaps("./app-sourceMap.js");

var uglifiedString=nodeUglifier.toString();
