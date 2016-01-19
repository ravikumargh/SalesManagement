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

      /* Datepicker start */
      $scope.today = function() {
          $scope.dt = new Date();
      };
      $scope.today();

      $scope.clear = function() {
          $scope.dt = null;
      };

      // Disable weekend selection
      $scope.disabled = function(date, mode) {
          return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
      };

      $scope.toggleMin = function() {
          $scope.minDate = $scope.minDate ? null : new Date();
      };

      $scope.toggleMin();
      $scope.maxDate = new Date(2020, 5, 22);

      $scope.open1 = function() {
          $scope.popup1.opened = true;
      };

      $scope.setDate = function(year, month, day) {
          $scope.dt = new Date(year, month, day);
      };

      $scope.dateOptions = {
          formatYear: 'yy',
          startingDay: 1
      };

      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[0];
      $scope.altInputFormats = ['M!/d!/yyyy'];

      $scope.popup1 = {
          opened: false
      };

      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      var afterTomorrow = new Date();
      afterTomorrow.setDate(tomorrow.getDate() + 1);
      $scope.events =
        [
          {
              date: tomorrow,
              status: 'full'
          },
          {
              date: afterTomorrow,
              status: 'partially'
          }
        ];

      $scope.getDayClass = function(date, mode) {
          if (mode === 'day') {
              var dayToCheck = new Date(date).setHours(0,0,0,0);

              for (var i = 0; i < $scope.events.length; i++) {
                  var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                  if (dayToCheck === currentDay) {
                      return $scope.events[i].status;
                  }
              }
          }

          return '';
      };
    
      /* Datepicker ends */


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


      $scope.uploadFile = function(){
          var file = $scope.file;
          console.log('file is ' );
          console.dir(file);
           
          DealService.uploadFile(file);
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

angular.module('AdminApp').directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);