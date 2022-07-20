/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: true,

  // Uncoment to add domain whitelist
  // images: {
  //   domains: [
  //     'res.cloudinary.com',
  //   ],
  // },

  // SVGR
  webpack: (config, { webpack }) => {
    /**
     * Enables use of arbitary value support with scss in next
     * https://stackoverflow.com/questions/68565169/using-tailwind-arbitrary-value-support-with-scss/68572037#68572037
     */
    // const rules = config.module.rules
    //   .find((rule) => typeof rule.oneOf === 'object')
    //   .oneOf.filter((rule) => Array.isArray(rule.use));

    // rules.forEach((rule) => {
    //   rule.use.forEach((moduleLoader) => {
    //     if (moduleLoader.loader.includes('resolve-url-loader'))
    //       moduleLoader.options.sourceMap = false;
    //   });
    // });

    // config.plugins.push(
    //   new webpack.IgnorePlugin({
    //     resourceRegExp: /(?:\/__stories__\/.+.ts[x]?)|(?:.*\.stories\.ts[x]?$)/,
    //   })
    // );
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });
    return config;
  }
};
