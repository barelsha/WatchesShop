angular.module("myApp")
    .controller('registerController', ['UserModel', 'restService', '$rootScope', '$location', '$window', 'cookiesService',
        function(UserModel, restService, $rootScope, $location, $window){
            var vm = this;
            vm.categories = [{id: 1, name:"Sport"},{id: 2, name:"Luxury"},{id: 1, name: "Smart"},{id: 1, name:"Mens"},{id: 1, name: "Digital"}];
            vm.user = new UserModel();
            vm.message = "";
            vm.category = "";
            vm.register = function () {
                var reqUrl = /*$rootScope.path + */"/signIn";
                // var cookies = $cookies.getAll();
                var data = {
                    Username: vm.user.Username,
                    Password: vm.user.Password,
                    FirstName: vm.user.FirstName,
                    LastName: vm.user.LastName,
                    Adress: vm.user.Adress,
                    City: vm.user.City,
                    Country: vm.user.Country,
                    Phone: vm.user.Phone,
                    Cellular: vm.user.Cellular,
                    Mail: vm.user.Mail,
                    CreditCardNumber: vm.user.CreditCardNumber,
                    isAdmin: "false",
                    Question: vm.user.Question,
                    Answer: vm.user.Answer,
                    Categories: vm.category.name
                };
                console.log(data);
                restService.Post(reqUrl, data, function (ans) {
                    if (ans.status === "ok") {
                        vm.message = "Register Succeeded";
                        $window.location.href = '#!/login';
                    }
                    else
                    {
                        vm.message = "Register Failed- username already exist";
                    }
                });
            }
        }]);
