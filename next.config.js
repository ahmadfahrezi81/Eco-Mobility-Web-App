/** @type {import('next').NextConfig} */
const nextConfig = {
    // ...existing code...
    webpack: (config) => {
        config.module.rules.push({
            test: /\.js$/,
            include: /node_modules\/undici/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"],
                },
            },
        });
        return config;
    },
};

module.exports = nextConfig;
