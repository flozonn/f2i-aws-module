// config-overrides.js (for react-app-rewired) or craco.config.js (for craco)

module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            webpackConfig.module.rules.push({
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto'
            });

            return webpackConfig;
        }
    }
};
