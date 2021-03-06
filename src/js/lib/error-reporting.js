/* global VERSION COMMITHASH */

const Raven = require('raven-js');
const RavenAngular = require('raven-js/plugins/angular');

module.exports = function installErrorReporting(angular) {
  Raven
    .config(
      'https://32febef98a3140ceb21ad35138178163@sentry.io/118721',
      {
        release: VERSION,
        tags: {
          commitHash: COMMITHASH,
        },
        debug: true,
        inAppInclude: [
          '~/opentok-',
          '.',
          'webpack://OT',
        ],
      }
    )
    .addPlugin(RavenAngular, angular)
    .install();
};
