'use strict';

/**
 * @ngdoc function
 * @name AdminApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the AdminApp
 */
angular.module('AdminApp')
  .controller('DealController', ['$scope', 'DealService', '$uibModal', '$log', 'DealCurrentStatusService', 'DealOpportunityStatusService', function ($scope, DealService, $uibModal, $log, DealCurrentStatusService, DealOpportunityStatusService) {

      $scope.deals = [];
       
      $scope.newDeal = {
          'CustomerName': '',
          'OppurtunityName': '',
          'OppurtunityDescription': '',
          'CiarraID': '',
          'DealOpportunityStatusId': '',
          'DealOpportunityTypeId': '',
          'DealVerticalId': '',
          'DealRegionId': '',
          'PractiseId': '',
          'EstAdditionalTCV': '',
          'Duration': '',
          'DealExpClosureQtr': '',
          'DealEngStartDate': '',
          'DealCurrentStatusId': '',
          'SubAdditionalTCV': '',
          'FY16Revenue': '',
          'Q1Revenue': '',
          'Q2Revenue': '',
          'Q3Revenue': '',
          'Q4Revenue': '',
          'Competition': '',
          'CurrSupportReq': '',
          'WklyRunningUpdates': '',
          'Remarks': '',
          'DealFarmingLead': '',
          'DealVLDNLead': '',
          'DeliveryLeadId': '',
          'FarmingAnchorId': '',
          'VLDNAnchorId': '',
          'DeliveryAnchorId': '',
          'ContractSignDate': '',
          'PractiseSME': '',
          'ItemType': '',
          'Path': ''
      }

    
      $scope.init = function () {

          $scope.deals = null;
          $scope.dealsTemp = [];
          $scope.dealcurrentstatuss = null;

          DealService.getDeals()
              .then(function (response) {
                  $scope.deals = response.data;
              },
              function (err) {

              });

          DealCurrentStatusService.getDealCurrentStatuss()
              .then(function (response) {
                  $scope.dealcurrentstatuss = response.data;
              },
              function (err) {

              });

          $scope.dealopportunitystatuss = null;
          DealOpportunityStatusService.getDealOpportunityStatuss()
              .then(function (response) {
                  $scope.dealopportunitystatuss = response.data;
              },
              function (err) {

              });

      };

      $scope.addNewDealRecord=function () {
       
          var newdeal =angular.copy($scope.newDeal);
          if (!$scope.deals) {
              $scope.deals=[];
          }
          newdeal.Id="temp"+$scope.deals.length;
          $scope.deals.push(newdeal);

      }
      $scope.getDealCurrentStatusDetails = function (rowObj) {
          return _.find($scope.dealcurrentstatuss, function(dealcurrentstatus) {
              return dealcurrentstatus.DealCurrentStatus_ID ===rowObj.deal.DealCurrentStatusId;
          });
      };
      $scope.getDealOpportunityStatusDetails = function (rowObj) {
          return _.find($scope.dealopportunitystatuss, function(dealopportunitystatus) {
              return dealopportunitystatus.Id ===rowObj.deal.DealOpportunityStatusId;
          });
      };

      $scope.deleteDeal = function (deal) {
          if (!_.isInteger(deal.Id)) {
              _.remove($scope.deals, function(n) {
                  return n.Id  == deal.Id;
              });
              return;
          }
          DealService.deleteDeal(deal.Id).then(function (response) {
              //_.remove($scope.deals, function (deal) {
              //    return deal.Id;
              //});
              $scope.init();
          },
            function (err) {
                $scope.error = err;
            });
      }
      $scope.createNewDeal = function () {
          $scope.error = undefined;
          //if (!$scope.newDeal.name) {
          //    $scope.error = 'Please enter valid deal name.';
          //    return;
          //}
           
          $scope.addNew($scope.newDeal);
      };

      $scope.addNew = function (newDeal) {
          $scope.dealsTemp.push(newDeal);
          $scope.deals.push(newDeal);
          console.log($scope.dealsTemp);

          /*
          DealService.addNewDeal(newDeal).then(function (response) {
              $scope.init();
          },
          function (err) {

          });
          */
      }

      $scope.update = function (deal) {
          DealService.updateDeal(deal).then(function (response) {
              $scope.init();
          },
          function (err) {

          });
      }
      
      $scope.editDealModel = function (deal) {
          $scope.selectedDeal = angular.copy(deal);

          var modalInstance = $uibModal.open({
              animation: $scope.animationsEnabled,
              templateUrl: 'DealModalContent.html',
              controller: 'DealModalInstanceCtrl',
              size: 'lg',
              animation: true,
              resolve: {
                  parentScope: function () {
                      return $scope;
                  }
              }
          });

          modalInstance.result.then(function (deal) {
              $scope.update(deal);
          }, function () {
              $log.info('Modal dismissed at: ' + new Date());
          });
      }
      $scope.openNewDealModel = function () {
          $scope.selectedDeal=angular.copy($scope.newDeal);
          var modalInstance = $uibModal.open({
              animation: $scope.animationsEnabled,
              templateUrl: 'DealModalContent.html',
              controller: 'DealModalInstanceCtrl',
              size: 'lg',
              animation: true,
              resolve: {
                  parentScope: function () {
                      return $scope;
                  }
              }
          });

          modalInstance.result.then(function (newDeal) {
              $scope.addNew(newDeal);
          }, function () {
              $log.info('Modal dismissed at: ' + new Date());
          });
      };
      $scope.deleteDealModel = function (deal) {
          $scope.selectedDeal = deal;
          var modalInstance = $uibModal.open({
              animation: $scope.animationsEnabled,
              templateUrl: 'DealDeleteConfirmationModalContent.html',
              controller: 'DealDeleteConfirmationModalInstanceControl',
              size: 'sm', 
              animation: true,
              resolve: {
                  parentScope: function () {
                      return $scope;
                  }
              }
          });

          modalInstance.result.then(function (selectedDeal) {
              $scope.deleteDeal(selectedDeal);
          }, function () {
              $log.info('Modal dismissed at: ' + new Date());
          });
      };
  }]);


angular.module('AdminApp').controller('DealModalInstanceCtrl', function ($scope, $uibModalInstance, parentScope) {

    $scope.selectedDeal = parentScope.selectedDeal;
    $scope.dealcurrentstatuss = parentScope.dealcurrentstatuss;
    $scope.dealopportunitystatuss = parentScope.dealopportunitystatuss;
    $scope.selectedDealDealCurrentStatusId = 2;
    
    $scope.ok = function () {
        console.log($scope.selectedDeal);
        $uibModalInstance.close($scope.selectedDeal);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

angular.module('AdminApp').controller('DealDeleteConfirmationModalInstanceControl', function ($scope, $uibModalInstance, parentScope) {

    $scope.selectedDeal = parentScope.selectedDeal;


    $scope.ok = function () {
        $uibModalInstance.close($scope.selectedDeal);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});