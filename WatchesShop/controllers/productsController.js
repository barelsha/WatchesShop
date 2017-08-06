angular.module("myApp")
    .controller('productsController', ['UserModel', 'restService', '$rootScope', '$location', '$window', 'cookiesService', 'WatchModel',
        function(UserModel, restService, $rootScope, $location, $window, cookiesService, WatchModel){
            var vm = this;
            vm.watches = [];
            vm.fieldToOrderBy = "WatchID";
            vm.reverseSort = false;
            vm.filterBy = "";
            vm.companies = [{CompanyId: "4" ,CompanyName: "Rolex"},
                {CompanyId: "5", CompanyName: "Nixon"},
                {CompanyId: "6", CompanyName: "Breitling"},
                {CompanyId: "7", CompanyName: "Casio"},
                {CompanyId: "8", CompanyName: "Swiss"},
                {CompanyId: "9", CompanyName: "Diesel"},
                {CompanyId: "10", CompanyName: "Adi"},
                {CompanyId: "11", CompanyName: "Rado"},
                {CompanyId: "12", CompanyName: "Adidas"},
                {CompanyId: "13", CompanyName: "Gucci"},
                {CompanyId: "14", CompanyName: "Tissot"},
                {CompanyId: "15", CompanyName: "MK"},
                {CompanyId: "16", CompanyName: "Armany"}];

            vm.setWatches = function () {
                var reqUrl = "/listOfWatches";
                restService.Get(reqUrl, function (answer) {
                    vm.watches = [];
                    for(var i=0 ; i< answer.response.length; i++){
                        var watch = new WatchModel(answer.response[i]);
                        vm.watches.push(watch);
                    }
                });
            };

            /*vm.showOptionDetails = function(watch) {
                vm.watch = watch;
                $log.info(vm.watch);
                vm.optionModal = $modal.open({
                    template: '<div class="modal-header" ng-mouseleave="close()"><h3 class="modal-title">Option</h3></div><div class="modal-body">{{watch.Description}}</div><div class="modal-footer" ng-click="close()">Close</div>',
                    controller: 'modalCtrl',
                    resolve: {
                        watch: function() {
                            return vm.watch;
                        }
                    }
                });
            };*/

            /*vm.closeOptionDetails = function() {
                vm.optionModal.close();
            };*/


            vm.onLoad = function () {
                vm.setWatches();
            };

            vm.onLoad();

        }]);

/*angular.module("myApp")
    .controller('modalCtrl', ['$modalInstance', '$scope', '$log', 'option',
        function ($modalInstance, $scope, $log, watch) {
            $log.info(watch);
            vm.watch = watch;
            vm.close = function() {
            $modalInstance.close();
        }
    }]);*/