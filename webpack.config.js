const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const pkg = require('./package.json');

const libraryName = pkg.name;

module.exports = {
    entry: path.join(__dirname, "./src/index.tsx"),  // Ensure this matches your main TS file
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'comments.js',
        library: 'Comments',
        libraryTarget: 'umd',
        // publicPath: '/dist/',
        umdNamedDefine: true,
        globalObject: 'this',
        publicPath: '/',
    },
    devServer: {
        static: path.join(__dirname, 'dist'),  // Serve files from "dist" folder
        port: 8080,  // Ensure the server runs on the correct port
        hot: true,
        open: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,  // Match .ts and .tsx files
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx)$/,
                use: ["babel-loader"],
                include: path.resolve(__dirname, "src"),
                exclude: /node_modules/,
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif|eot|ttf|woff|woff2|pdf|doc|zip)$/,
                use: ["file-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],  // Allow TS/JS imports without extensions
    },
    externals: {
        react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "React",
            root: "React",
        },
        "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "ReactDOM",
            root: "ReactDOM",
        },
    },
};
