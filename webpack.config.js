module.exports = {
  context: __dirname + "/app",
	entry: __dirname + "/app/initialize.jsx",
	output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      }
    ]
  }
};
