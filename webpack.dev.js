const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
    mode: "development",
    devServer: {
        static: {
            directory: path.resolve(__dirname, "public"), // ✅ Serve the public folder
            publicPath: "/",
        },
        historyApiFallback: true,
        hot: true,
        port: 3000,
    },
});
