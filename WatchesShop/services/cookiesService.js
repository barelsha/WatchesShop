angular.module('myApp')
    .service('cookiesService', cookiesService);

cookiesService.$inject = ['localStorageService'];
function cookiesService (localStorageService, DAYS_TO_COOKIE) {

    this.addNewCookies = function (user) {
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);
        localStorageService.cookie.set('username', user.UserName,  DAYS_TO_COOKIE);
        localStorageService.cookie.set('category', user.Categories,  DAYS_TO_COOKIE);
        //localStorageService.cookie.set('password', user.Password,  DAYS_TO_COOKIE);
        var today = new Date();
        var todayStr = today.toDateString();
        localStorageService.cookie.set('lastVisit', todayStr,  DAYS_TO_COOKIE);
        return today;
    };

    this.setNewLoginDate = function () {
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);
        var today = new Date();
        localStorageService.cookie.set('lastVisit', today.toDateString(), DAYS_TO_COOKIE);
        return today;
    };

    this.removeAll = function () {
        localStorageService.cookie.remove('username');
        localStorageService.cookie.remove('lastVisit');
    };

    this.getCookie = function(cookieName) {
        var ans = localStorageService.cookie.get(cookieName);
        return ans;
    };
}

