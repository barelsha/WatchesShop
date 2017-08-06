
angular.module('myApp')
    .factory('WatchModel', [ function () {

        function Watch(object) {
            this.WatchID = object.WatchID;
            this.CompanyID = object.CompanyID;
            this.Description = object.Description;
            this.CategoriesID =  object.CategoriesID;
            this.PicturePath =  object.PicturePath;
            this.Price =  object.Price;
            this.StokAmount = object.StokAmount;
            this.Date = object.Date;
        }

        /*function Watch() {
            this.WatchID = "";
            this.CompanyID = "";
            this.Description = "";
            this.CategoriesID =  "";
            this.PicturePath =  "";
            this.Price =  "";
            this.StokAmount = "";
            this.Date = "";
        }*/

        return Watch;
    }]);
