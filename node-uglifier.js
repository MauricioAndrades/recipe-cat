var NodeUglifier = require("node-uglifier");
var nodeUglifier = new NodeUglifier("./app.js");
nodeUglifier.merge().uglify();

nodeUglifier.exportToFile("./node-ug/simpleMergeAndUglify.js");
nodeUglifier.exportSourceMaps("./node-ug/simpleMergeAndUglify.js");

var uglifiedString=nodeUglifier.toString();
