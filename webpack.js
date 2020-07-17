const {resolve} = require("path");
const {DefinePlugin} = require("webpack");
const autoprefixer = require("autoprefixer");

module.exports = () => ({
    mode: 'production',
    entry: "./src/js/index.js",
    plugins: [
        new DefinePlugin({
            "process.env": {
                SKIP_PREFLIGHT_CHECK: true
            }
        })
    ],
    output: {
        filename: "index.js",
        path: resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /.(js)$/,
                exclude: /node_modules/,
                include: [resolve(__dirname, "src")],
                loader: "babel-loader",
                options: {
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                "useBuiltIns": "usage",
                                "corejs": 3,
                                "targets": "> 0.25%, not dead",
                            }
                        ]
                    ]
                }
            },
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "resolve-url-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: [autoprefixer()]
                        }
                    }
                ]
            },
        ],
    }
});
