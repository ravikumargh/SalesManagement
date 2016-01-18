'use strict';
angular.module('AdminApp').factory('DealCurrentStatusService', ['$http', '$q', 'localStorageService', 'ngAuthSettings', function ($http, $q, localStorageService, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;

        var urlBase = serviceBase + 'api/dealcurrentstatus/';
        var dataFactory = {};
        dataFactory.addNewDealCurrentStatus = function (dealcurrentstatus) {
            return $http.post(urlBase, dealcurrentstatus );
        };

         
        dataFactory.getDealCurrentStatuss = function () {
            return $http.get(urlBase);
        };
         
        dataFactory.updateDealCurrentStatus = function (dealcurrentstatus) {
            return $http.put(urlBase,  dealcurrentstatus);
        };

        dataFactory.deleteDealCurrentStatus = function (dealcurrentstatus_id) {
            return $http.delete(urlBase + dealcurrentstatus_id + '/');
        };

        return dataFactory;
    }
]);
