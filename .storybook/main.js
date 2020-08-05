module.exports = {
  addons: ['@storybook/addon-viewport/register'],
  stories: ['../src/**/*.stories.tsx'],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [{
        loader: "ts-loader"
      }, {
        loader: "react-docgen-typescript-loader"
      },
      ],
    }, {
      test: /\.scss$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "sass-loader"
      }]
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};