'use strict';

/**
 * @ngdoc function
 * @name AdminApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the AdminApp
 */
angular.module('AdminApp')
  .controller('DealCurrentStatusController', ['$scope', 'DealCurrentStatusService', '$uibModal', '$log', function ($scope, DealCurrentStatusService, $uibModal, $log) {

      $scope.newdealcurrentstatus = {
          'Name': ''
      }

    
      $scope.init = function () {

          $scope.dealcurrentstatuss = null;

          DealCurrentStatusService.getDealCurrentStatuss()
              .then(function (response) {
                  $scope.dealcurrentstatuss = response.data;
              },
              function (err) {

              });
      };

      $scope.deleteDealCurrentStatus = function (dealcurrentstatus) {
          DealCurrentStatusService.deleteDealCurrentStatus(dealcurrentstatus.DealCurrentStatus_ID).then(function (response) {
              //_.remove($scope.dealcurrentstatuss, function (dealcurrentstatus) {
              //    return dealcurrentstatus.Id;
              //});
              $scope.init();
          },
            function (err) {
                $scope.error = err;
            });
      }
      $scope.createNewDealCurrentStatus = function () {
          $scope.error = undefined;
          //if (!$scope.newdealcurrentstatus.name) {
          //    $scope.error = 'Please enter valid dealcurrentstatus name.';
          //    return;
          //}
          //$scope.newdealcurrentstatus.Name = "DealCurrentStatus 1";
          $scope.addNew($scope.newdealcurrentstatus);
      };

      $scope.addNew = function (newdealcurrentstatus) {
          DealCurrentStatusService.addNewDealCurrentStatus(newdealcurrentstatus).then(function (response) {
              $scope.init();
          },
          function (err) {

          });
      }

      $scope.update = function (dealcurrentstatus) {
          DealCurrentStatusService.updateDealCurrentStatus(dealcurrentstatus).then(function (response) {
              $scope.init();
          },
          function (err) {

          });
      }
      
      $scope.editDealCurrentStatusModel = function (dealcurrentstatus) {
          $scope.selectedDealCurrentStatus = angular.copy(dealcurrentstatus);

          var modalInstance = $uibModal.open({
              animation: $scope.animationsEnabled,
              templateUrl: 'DealCurrentStatusModalContent.html',
              controller: 'DealCurrentStatusModalInstanceCtrl',
              size: 'sm',
              animation: true,
              resolve: {
                  parentScope: function () {
                      return $scope;
                  }
              }
          });

          modalInstance.result.then(function (dealcurrentstatus) {
              $scope.update(dealcurrentstatus);
          }, function () {
              $log.info('Modal dismissed at: ' + new Date());
          });
      }
          $scope.openNewDealCurrentStatusModel = function () {
              $scope.selectedDealCurrentStatus= $scope.newdealcurrentstatus;
          var modalInstance = $uibModal.open({
              animation: $scope.animationsEnabled,
              templateUrl: 'DealCurrentStatusModalContent.html',
              controller: 'DealCurrentStatusModalInstanceCtrl',
              size: 'sm',
              animation: true,
              resolve: {
                  parentScope: function () {
                      return $scope;
                  }
              }
          });

          modalInstance.result.then(function (newDealCurrentStatus) {
              $scope.addNew(newDealCurrentStatus);
          }, function () {
              $log.info('Modal dismissed at: ' + new Date());
          });
      };
      $scope.deleteDealCurrentStatusModel = function (dealcurrentstatus) {
          $scope.selectedDealCurrentStatus = dealcurrentstatus;
          var modalInstance = $uibModal.open({
              animation: $scope.animationsEnabled,
              templateUrl: 'DealCurrentStatusDeleteConfirmationModalContent.html',
              controller: 'DealCurrentStatusDeleteConfirmationModalInstanceControl',
              size: 'sm', 
              animation: true,
              resolve: {
                  parentScope: function () {
                      return $scope;
                  }
              }
          });

          modalInstance.result.then(function (selectedDealCurrentStatus) {
              $scope.deleteDealCurrentStatus(selectedDealCurrentStatus);
          }, function () {
              $log.info('Modal dismissed at: ' + new Date());
          });
      };
  }]);


angular.module('AdminApp').controller('DealCurrentStatusModalInstanceCtrl', function ($scope, $uibModalInstance, parentScope) {

    $scope.selectedDealCurrentStatus = parentScope.selectedDealCurrentStatus;
    
    $scope.ok = function () {
        $uibModalInstance.close($scope.selectedDealCurrentStatus);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

angular.module('AdminApp').controller('DealCurrentStatusDeleteConfirmationModalInstanceControl', function ($scope, $uibModalInstance, parentScope) {

    $scope.selectedDealCurrentStatus = parentScope.selectedDealCurrentStatus;


    $scope.ok = function () {
        $uibModalInstance.close($scope.selectedDealCurrentStatus);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});