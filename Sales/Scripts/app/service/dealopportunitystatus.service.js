'use strict';
angular.module('AdminApp').factory('DealOpportunityStatusService', ['$http', '$q', 'localStorageService', 'ngAuthSettings', function ($http, $q, localStorageService, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;

        var urlBase = serviceBase + 'api/dealopportunitystatus/';
        var dataFactory = {};
        dataFactory.addNewDealOpportunityStatus = function (dealopportunitystatus) {
            return $http.post(urlBase, dealopportunitystatus );
        };

         
        dataFactory.getDealOpportunityStatuss = function () {
            return $http.get(urlBase);
        };
         
        dataFactory.updateDealOpportunityStatus = function (dealopportunitystatus) {
            return $http.put(urlBase,  dealopportunitystatus);
        };

        dataFactory.deleteDealOpportunityStatus = function (dealopportunitystatus_id) {
            return $http.delete(urlBase + dealopportunitystatus_id + '/');
        };

        return dataFactory;
    }
]);
