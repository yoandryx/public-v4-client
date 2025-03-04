const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        clean: true,
        assetModuleFilename: "assets/[hash][ext][query]",
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        plugins: [new TsconfigPathsPlugin()],
        fallback: {
            "assert": require.resolve("assert/"),
            "util": require.resolve("util/"),
            "events": require.resolve("events/"),
            "process": require.resolve("process/browser"),
            "buffer": require.resolve("buffer/"),
        },
        alias: {
            "react": path.resolve(__dirname, "node_modules/react"),
            "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/, // ✅ Add CSS handling
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset/resource",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "public/index.html",
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "public", to: "dist" }, // ✅ Copy public assets to dist/
            ],
        }),
        new webpack.ProvidePlugin({
            process: "process/browser", // ✅ Injects process globally for all modules
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("development"), // ✅ Ensures correct environment
        }),
    ],
    devServer: {
        static: [{
            directory: path.resolve(__dirname, "dist")
        }, {
            directory: path.resolve(__dirname, "public"), // ✅ Serve the public folder
        }],
        historyApiFallback: true, // ✅ Enables SPA routing
        hot: true,
        port: 3000,
    },
    mode: "production",
};
