var app = angular.module("myApp", ["ngRoute", "LocalStorageModule"]);

app.controller("mainController", ['$rootScope', 'cookiesService', 'WatchModel', 'restService', '$location', '$window', 'cartService',
    function($rootScope, cookiesService, WatchModel, restService, $location, $window, cartService){
        var vm = this;
        vm.topFiveWatches = [];
        vm.recomendedWatches = [];
        vm.cart= [];

        vm.removeFromCart = function (watch) {
            cartService.removeFromCart(watch);
            vm.calculateTotal();
        };

        vm.addToCart = function (watch) {
            cartService.addToCart(watch);
            vm.calculateTotal();
        };

        vm.calculateTotal = function () {
            var cart = cartService.getCart();
            vm.cart = cart[0];
            vm.totalItems = 0;
            vm.totalPrice = 0;
            for (var i=0; i< vm.cart.length; i++) {
                vm.totalItems += vm.cart[i].quantity;
                vm.totalPrice += vm.cart[i].quantity * vm.cart[i].theItem.Price;
            }
        };

        vm.calculateTotal();

        vm.setWatches = function () {
            var reqUrl = "/listOfWatches";
            restService.Get(reqUrl, function (answer) {
                vm.watches = answer.response;
                vm.setTopFiveWatches();
                vm.setRecomendedWatches();
            });
        };

        vm.setTopFiveWatches = function () {
            vm.topFiveWatches = [];
            for(var i= vm.watches.length-1 ; i > vm.watches.length - 6; i--) {
                var watch = new WatchModel(vm.watches[i]);
                vm.topFiveWatches.push(watch);
            }
        };

        vm.setRecomendedWatches = function () {
                vm.recomendedWatches = [];
                console.log(vm.watches);
                for(var i=0 ; i< vm.watches.length; i++){
                    console.log($rootScope.category);
                    console.log(vm.watches[i].CategoriesID);
                    if(vm.watches[i].CategoriesID === $rootScope.category){
                        var watch = new WatchModel(vm.watches[i]);
                        vm.recomendedWatches.push(watch);
                    }
                }
        };

        vm.setLoginStatus = function () {
            var ans = cookiesService.getCookie("username");
            var category = cookiesService.getCookie("category");
            if(!ans){
                $rootScope.username = "guest";
                $rootScope.login = false;
            }
            else{
                $rootScope.username = ans;
                $rootScope.login = true;
            }
            if(category){
                $rootScope.category = category;
            }
        };

        vm.onLoad = function () {
            vm.setLoginStatus();
            vm.setWatches();
        };

        vm.logout = function () {
            $rootScope.username = "guest";
            $rootScope.login = false;
            cookiesService.removeAll();
            $window.location.href = '#!/';
        };

        vm.onLoad();
    }]);


app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "views/home.html",
            //controller: "mainController"
        })
        .when("/home", {
            templateUrl : "views/home.html",
            //controller: "mainController"
        })
        .when("/login", {
            templateUrl : "views/login.html",
            controller: "loginController"
        })
        .when("/register", {
            templateUrl : "views/register.html",
            controller: "registerController"
        })
        .when("/products", {
            templateUrl : "views/products.html",
            //controller: "registerController"
        })
        .when("/about", {
            templateUrl : "views/about.html",
            //controller: "registerController"
        })
        .otherwise({redirect: '/',
            controller: "mainController"
        });
    }]);