const fs = require("fs");
const path = require("path");
const interpret = require("interpret");

const extensions = Object.keys(interpret.extensions).sort(function(a, b) {
	return a === ".js" ? -1 : b === ".js" ? 1 : a.length - b.length;
});

const defaultConfigFiles = ["webpack.config", "webpackfile"]
	.map(function(filename) {
		return extensions.map(function(ext) {
			return {
				path: path.resolve(filename + ext),
				ext: ext
			};
		});
	})
	.reduce(function(a, i) {
		return a.concat(i);
	}, []);

function findDefaultConfigFiles() {
	let configFiles = [];
	for (let i = 0; i < defaultConfigFiles.length; i++) {
		var webpackConfig = defaultConfigFiles[i].path;
		if (fs.existsSync(webpackConfig)) {
			configFiles.push({
				path: webpackConfig,
				ext: defaultConfigFiles[i].ext
			});
			break;
		}
	}
	return configFiles;
}

module.exports = findDefaultConfigFiles;
