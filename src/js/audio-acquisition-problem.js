require('../css/audio-acquisition-problem.css');

angular.module('opentok-meet').directive(
  'audioAcquisitionProblem',
  ['OTSession', OTSession => ({
    restrict: 'E',
    template: `<i class="ion-alert-circled" title="Warning: audio acquisition problem
    you may need to quit and restart your browser" ng-show="showAlert"></i>`,
    link(scope, element, attrs) {
      scope.showAlert = false;

      const listenForIssue = () => {
        const publisher = OTSession.publishers.filter(el => el.id === attrs.publisherId)[0];
        if (publisher) {
          publisher.on('audioAcquisitionProblem', () => {
            scope.showAlert = true;
            scope.$apply();
          });
          OTSession.off('otPublisherAdded', listenForIssue);
        } else {
          OTSession.on('otPublisherAdded', listenForIssue);
          scope.$on('$destroy', () => {
            OTSession.off('otPublisherAdded', listenForIssue);
          });
        }
      };
      listenForIssue();
    },
  })]
);
