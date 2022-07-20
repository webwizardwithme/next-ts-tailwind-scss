/* eslint-disable @typescript-eslint/no-var-requires */

const globalTokens = require('../custom/global');
const aliasTokens = require('../custom/aliases');
const lineClampTokens = require('../custom/line-clamp');
const colors = require('../custom/colors');

module.exports = {
  ...globalTokens,
  extend: {
    ...aliasTokens,
    ...lineClampTokens,
    colors: {
      ...colors,
      ...aliasTokens.colors
    },
    transitionTimingFunction: {
      ...aliasTokens.transitionTimingFunction,
      // ease-out curve
      DEFAULT: 'cubic-bezier(0, 0, 0.2, 1)',
    },
  },
};
