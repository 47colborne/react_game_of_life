module.exports = {
  context: __dirname + "/app",
	entry: __dirname + "/app/initialize.jsx",
	output: {
        path: __dirname + "/dist",
        filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
