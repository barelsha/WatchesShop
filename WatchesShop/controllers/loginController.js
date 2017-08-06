angular.module("myApp")
    .controller('loginController', ['UserModel', 'restService', '$rootScope', '$location', '$window', 'cookiesService',
        function(UserModel, restService, $rootScope, $location, $window, cookiesService){
        var vm = this;
        vm.user = new UserModel();
        vm.loginState = false;
        vm.message = "";
        vm.forgot = false;
        vm.questions = [{name: "ElementrySchool" , desc: "what is your elementry school name?"},
                        {name: "Hospital" , desc: "what is the name of hospital you were born in?"},
                        {name: "Grandma" , desc: "what is your grandma's name"}];
        vm.question = "";
        vm.answers = ["sinai", "barzily", "shoshana"];

        vm.login = function () {
            var reqUrl = /*$rootScope.path + */"/Login";
            var data = {Username: vm.user.Username, Password: vm.user.Password};
            restService.Post(reqUrl, data, function (ans) {
                if (ans.status === "ok") {
                    vm.loginState = true;
                    vm.message = "Login Succeeded";
                    vm.user = ans.response[0];
                    $rootScope.username = vm.user.UserName;
                    $rootScope.login = true;
                    $rootScope.category = vm.user.Categories;
                    var cookieId = cookiesService.getCookie('username');
                    console.log($rootScope.category);
                    if (!cookieId) {
                        cookiesService.addNewCookies(vm.user);
                    }
                    $window.location.href = '#!/';
                }
                else
                {
                    vm.loginState = false;
                    vm.message = "Login Failed- Wrong Id or Password";
                }
            });
        };

            vm.changeForgot = function () {
                vm.forgot = true;
            };
            vm.getPassword = function(question, answer){
                vm.forgot = false;
                vm.password = true;
            };
    }]);

