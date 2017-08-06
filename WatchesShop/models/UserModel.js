
angular.module('myApp')
    .factory('UserModel', [ function () {

        function User(object) {
            this.Username = object.Username;
            this.Password = object.Password;
            this.FirstName = object.FirstName;
            this.LastName =  object.LastName;
            this.Address =  object.Address;
            this.City =  object.City;
            this.Country = object.Country;
            this.Phone = object.Phone;
            this.Cellular = object.Cellular;
            this.Mail = object.Mail;
            this.CreditCardNumber = object.CreditCardNumber;
            this.isAdmin = object.isAdmin;
            this.Question = object.Question;
            this.Answer = object.Answer;
            this.Categories = object.Categories;
        }

        function User() {
            this.Username = "";
            this.Password = "";
            this.FirstName = "";
            this.LastName =  "";
            this.Address =  "";
            this.City =  "";
            this.Country = "";
            this.Phone = "";
            this.Cellular = "";
            this.Mail = "";
            this.CreditCardNumber = "";
            this.isAdmin = "";
            this.Question = "";
            this.Answer = "";
        }

        return User;
    }]);
