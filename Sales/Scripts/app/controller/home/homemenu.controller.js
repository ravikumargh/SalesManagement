'use strict';

angular.module('AdminApp')
  .controller('AdminMenuController', ['$scope', '$rootScope', function ($scope, $rootScope) {

      $scope.menus = [
		                      { active: false, text: 'Users', path: '.users' },
		                      { active: false, text: 'Clients', path: '.clients' },
                              { active: false, text: 'Client Types', path: '.clienttypes' },
		                      { active: false, text: 'Departments', path: '.departments' },
                              { active: false, text: 'Roles', path: '.roles' },
                              { active: false, text: 'Statuses', path: '.statuses' },
                              { active: false, text: 'Status reasons', path: '.statusreasons' },
                              { active: false, text: 'Survey Types', path: '.surveytypes' },
                              { active: false, text: 'Teams', path: '.teams' },
                              { active: false, text: 'Statusmessages', path: '.statusmessages' }
      ];

      $scope.$on('handleBroadcast_setActiveResourcesTab', function (handler, view) {
          for (var i = 0; i < $scope.resourcesTabs.length; i++) {
              if ($scope.resourcesTabs[i].path == view) {
                  $scope.resourcesTabs[i].active = true;
              } else {
                  $scope.resourcesTabs[i].active = false;
              }
          }
      });

  }]);
