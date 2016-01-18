'use strict';

angular.module('AdminApp')
  .config(function ($stateProvider) {
      $stateProvider
        //.state('home', {
        //    url: '',
        //    templateUrl: 'views/sales/view/home/home.html',
        //    controller: 'AdminController'
        //})
        
        .state('home.clients', {
            url: '/clients',
            templateUrl: 'views/sales/view/client/clients.html',
            controller: 'ClientController',
            data: {
                requireLogin: true
            }
        })
        .state('home.roles', {
            url: '/roles',
            templateUrl: 'views/sales/view/role/roles.html',
            controller: 'RoleController',
            data: {
                requireLogin: true
            }
        })
        .state('home.teams', {
            url: '/teams',
            templateUrl: 'views/sales/view/team/teams.html',
            controller: 'TeamController',
            data: {
                requireLogin: true
            }
        })
          .state('home.statuses', {
              url: '/statuses',
              templateUrl: 'views/sales/view/status/statuses.html',
              controller: 'StatusController',
              data: {
                  requireLogin: true
              }
          })
          .state('home.surveytypes', {
              url: '/surveytypes',
              templateUrl: 'views/sales/view/surveytype/surveytypes.html',
              controller: 'SurveyTypeController',
              data: {
                  requireLogin: true
              }
          })
          .state('home.clienttypes', {
              url: '/clienttypes',
              templateUrl: 'views/sales/view/clienttype/clienttypes.html',
              controller: 'ClientTypeController',
              data: {
                  requireLogin: true
              }
          })
            .state('home.statusreasons', {
                url: '/statusreasons',
                templateUrl: 'views/sales/view/statusreason/statusreasons.html',
                controller: 'StatusreasonController',
                data: {
                    requireLogin: true
                }
            })
          .state('home.statusmessages', {
              url: '/statusmessages',
              templateUrl: 'views/sales/view/statusmessage/statusmessages.html',
              controller: 'StatusmessageController',
              data: {
                  requireLogin: true
              }
          })
      .state('home.departments', {
          url: '/departments',
          templateUrl: 'views/sales/view/department/departments.html',
          controller: 'DepartmentController',
          data: {
              requireLogin: true
          }
      });
  });
