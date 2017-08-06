var express = require('express');
var bodyParser = require('body-parser');
var squel = require("squel");
var app = express();
var moment = require('moment');
var DBUtils = require('./DBUtils');
var cors = require('cors');
var path = require('path');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(__dirname));
//app.get('/', (req, res) => {
//    var show = req.param('show');
    //based on show , you decide which file u want to send, suppose its abc.html & it is in my dist folder.
//    res.sendFile(path.join(__dirname, 'app/index.html'));
//});
//---------------------------------------------------------------------------------

/* 
{
    "Username":"barelsha",
    "Password":"123456",
    "FirstName":"shahar",
    "LastName":"barel",
    "Adress":"klausner 4/6",
    "City":"Beer Sheva",
    "Country":"israel",
    "Phone":"0524587717",
    "Cellular":"0524587717",
    "Mail":"barelshahar2@gmail.com",
    "CreditCardNumber":"11111111",
    "isAdmin":"false",
    "Question":"ElementrySchool",
    "Answer":"Sinai"
}
*/
app.post('/signIn', function(req, res){
    //console.log(req.body)
    var userName= req.body.Username;
    var password = req.body.Password;
    var firstName = req.body.FirstName;
    var lastName = req.body.LastName;
    var adress = req.body.Adress;
    var city = req.body.City;
    var country = req.body.Country;
    var mail = req.body.Mail;
    var phone = req.body.Phone;
    var question = req.body.Question;
    var answer = req.body.Answer;
    var cellular = req.body.Cellular;
    var creditCardNumber = req.body.CreditCardNumber;
    var isAdmin = req.body.isAdmin;
    var categories = req.body.Categories;
    if (!userName || !password || !firstName || !lastName || !adress || !city|| !mail || !cellular || !country) {
       res.send({status:"failed", response:"failed to signIn- wrong data"});
        res.end();
    }
    else{
        var query = squel.select()
        .field("UserName")
        .from("Users")
        .where("UserName = '"+userName+"'")
        .toString(); 
        DBUtils.Select(query).then(function(resParam){

            if(resParam.length > 0){
                res.send({status:"failed", response:"failed to signIn- user name already exist"});
            }else{
                var query =(
                    squel.insert()
                        .into("Users")
                        .set("UserName", userName)
                        .set("Password", password)
                        .set("FirstName", firstName)
                        .set("LastName", lastName)
                        .set("Adress", adress)
                        .set("City", city)
                        .set("Phone", phone)
                        .set("Cellular", cellular)
                        .set("Mail",mail)
                        .set("Country",country)
                        .set("CreditCardNumber", creditCardNumber)
                        .set("isAdmin",isAdmin)
                        .set("Question", question)
                        .set("Answer", answer)
                        .set("Categories", categories)
                        .toString()
                        );
                console.log('builded query '+ query)
                DBUtils.Insert(query).then(function(resParam){
                    console.log('signIn successfully');
                    res.send({status:"ok", response:resParam});
                }).catch(function(resParam){
                    console.log('signIn failed');
                    res.send({status:"failed", response:resParam});
                });
            }
        }).catch(function(resParam){
            console.log('signIn failed');
            res.send({status:"failed", response:resParam});
        });
        console.log('signIn in process');
    }
});
/*
{
    "watchId":"qazaz",
    "companyId":"4",
    "description":"great watch",
    "picPath":"aaaaa",
    "categories": ["Luxury","sport"],
    "stockAmount":"100",
    "price":"50"
}
*/
app.post('/addWatch', function(req,res){
    var watchId = req.body.watchId;
    var companyId = req.body.companyId;
    var description = req.body.description;
    var picPath = req.body.picPath;
    var price = req.body.price;
    var stockAmount = req.body.stockAmount;
    var categories = req.body.categories;
    var date = moment();
    var categoriesStr = "";
    for (var i = categories.length - 1; i >= 0; i--) {
        if(i == 0){
            categoriesStr = categoriesStr + categories[i];
        }
        else{
            categoriesStr = categoriesStr + categories[i] + ',' ;
        }
    }
    if (!description || !picPath || !price) {
        console.log( description +',' + picPath +',' + price);
        res.send({status:"failed", response:"failed to addWatch- wrong data"});
        res.end();
    }
    else{
        var query =(
            squel.insert()
                .into("Watches")
                .set("WatchID", watchId)
                .set("CompanyID", companyId)
                .set("Description", description)
                .set("PicturePath", picPath)
                .set("CategoriesID", categoriesStr)
                .set("StokAmount", stockAmount)
                .set("Price", price)
                .set("Date", date.toJSON().toString())
                .toString()
                );
        DBUtils.Insert(query)
        .then(function(resParam){
            console.log('watch added successfully');
            res.send({status:"ok", response:resParam});
        }).catch(function(resParam){
            console.log('failed adding watch');
            res.send({status:"failed", response:resParam});
        });
            
    }
});


/* 
{
    "category":"Sport"
}
*/
app.post('/addCategory', function(req,res){
    var category = req.body.category;
    if (!category) {
        res.send({status:"failed", response:"failed to addCategory- wrong data"});
        res.end();
    }
    else{
        var query =(
            squel.insert()
                .into("Categories")
                .set("CategoryName", category)
                .toString()
                );
        DBUtils.Insert(query)
        .then(function(resParam){
            console.log('category added successfully');
            res.send({status:"ok", response:resParam});
        }).catch(function(resParam){
            console.log('failed adding category');
            res.send({status:"failed", response:resParam});
        });   
    }
});

/* 
{
    "company": "Rolex"
}
*/
app.post('/addCompany', function(req,res){
    var company = req.body.company;
    if (!company) {
        res.send({status:"failed", response:"failed to add Company- wrong data"});
        res.end();
    }
    else{
        var query =(
            squel.insert()
                .into("Companies")
                .set("CompanyName", company)
                .toString()
                );
        DBUtils.Insert(query)
        .then(function(resParam){
            console.log('category added successfully');
            res.send({status:"ok", response:resParam});
        }).catch(function(resParam){
            console.log('failed adding category');
            res.send({status:"failed", response:resParam});
        });   
    }
});

/* 
{
    "Username":"barelsha",
    "Password":"123456"
}
*/
app.post('/Login', function(req, res){
    var userName= req.body.Username;
    var password = req.body.Password;
   
    if (!userName || !password ) {
        console.log(userName +',' + password)
       res.send({status:"failed", response:"failed to Login- you have to write your Username and Password"});
        res.end();
    }
    else{
        var query = squel.select()
        .from("Users")
        .where("UserName = '"+userName+"'")
        .where("Password = '"+password+"'")
        .toString();
        console.log(query);
        DBUtils.Select(query).then(function(resParam){
            if(resParam.length !== 1){
                res.send({status:"failed", response:"failed to signIn- your password or Username not valid"});
            }else{
                res.send({status:"ok", response:resParam});
            }
        }).catch(function(resParam){
            console.log('signIn failed');
            res.send({status:"failed", response:resParam});
        });
    }
});   

app.get('/listOfWatches', function(req,res){
    var query = squel.select()
    .from("Watches")
    .toString();

    DBUtils.Select(query).then(function(resParam){
        if(resParam.length == 0){
            res.send({status:"failed", response:"there are no watches"});
        }else{
            res.send({status:"ok", response:resParam});
        }
    }).catch(function(resParam){
        console.log('login failed');
        res.send({status:"failed", response:resParam});
    });
});

app.get('/getWatchById/:id', function(req,res){
    var id = req.params.id;
        console.log(id);
    if (!id) {
        res.send({status:"failed", response:"you have to enter id"});
        res.end();
    }
    else{
        var query = squel.select()
        .from("Watches")
        .where("WatchID = '"+id+"'")
        .toString();
        DBUtils.Select(query).then(function(resParam){
            if(resParam.length==0){
                res.send({status:"failed", response:"thre are no watches matching to this id"});
            }else{
                res.send({status:"ok", response:resParam});  
            }
        }).catch(function(resParam){
            console.log('getting watch by id failed');
            res.send({status:"failed", response:resParam});
        });
    }
});

app.get('/isCategoryExist/:category', function(req,res){
    var category = req.params.category;
    if (!category) {
        res.send({status:"failed", response:"you have to enter category"});
        res.end();
    }
    else{
        var query = squel.select()
        .from("Categories")
        .where("CategoryName = '" + category + "'")
        .toString();
        DBUtils.Select(query).then(function(resParam){
            if(resParam.length==0){
                res.send({status:"failed", response:"there are no categories matching to this category"});
            }else{
                res.send({status:"ok", response:resParam});  
            }
        }).catch(function(resParam){
            console.log('failed to excute');
            res.send({status:"failed", response:resParam});
        });
    }
});

app.get('/isCompanyExist/:company', function(req,res){
    var company = req.params.company;
    if (!company) {
        res.send({status:"failed", response:"you have to enter company"});
        res.end();
    }
    else{
        var query = squel.select()
        .from("Companies")
        .where("CompanyName = '" + company + "'")
        .toString();
        DBUtils.Select(query).then(function(resParam){
            if(resParam.length==0){
                res.send({status:"failed", response:"there are no companies matching to this category"});
            }else{
                res.send({status:"ok", response:resParam});
            }
        }).catch(function(resParam){
            console.log('failed to excute');
            res.send({status:"failed", response:resParam});
        });
    }
});

app.get('/lastMonthWatches', function(req,res){
    var lastmonth = moment().subtract(1,'month');

    var today = moment();
    var query = 
        squel.select()
            .from("Watches")
            .where("Date >= ?", lastmonth.toJSON())
            .where("Date <= ?", today.toJSON())
            .toString();
    console.log(lastmonth);
    console.log(today);
    console.log(query);
    DBUtils.Select(query).then(function(resParam){
        if(resParam.length==0){
            res.send({status:"failed", response:"there are no watches added in the last month"});
        }else{
            res.send({status:"ok", response:resParam});
        }
    }).catch(function(resParam){
        console.log('failed');
        res.send({status:"failed", response:resParam});
    });
});

/* 
{
    "Answer":"Sinai",
    "Email":"barelshahar2@gmail.com",
    "Question":"Elementry School"
}
*/
app.post('/VerifyAnswer', function (req,res) {
    var answer = req.body.Answer;
    var email = req.body.Email;
    var question = req.body.Question;
    if (!answer || !question || !email) {
        res.send({status:"failed", response:"wrong details"});
        res.end();
    }
    else{
        var query =
        squel.select()
            .field("Password")
            .from("Users")
            .where("Answer = '" +answer+"'")
            .where("Question = '" +question+"'")
            .where("Mail = '" +email+"'")
            .toString();
        DBUtils.Select(query).then(function(resParam){
            if(resParam.length == 0){
                res.send({status:"failed", response:"incorrect answer"});
            }else{
                    res.send({status:"ok", response:resParam});      
            }
        }).catch(function(resParam){
            console.log("failed");
            res.send({status:"failed", response:resParam});
        });
    } 
});

/*
{
    "Username":"barelsha"
}
*/
app.delete('/removeUser', function (req, res) {

        var userName= req.body.Username;
        var query = squel.select()
        .field("UserName")
        .from("Users")
        .where("UserName = '"+userName+"'")
        .toString(); 
        DBUtils.Select(query).then(function(resParam){

            if(resParam.length==0){
                res.send({status:"failed", response:"failed to removeUser - not exist"});
            }else{
                var query =(
                    squel.delete()
                        .from("Users")
                        .where("UserName = '"+userName+"'")
                        .toString()
                        );
                console.log('builded query '+ query)
                DBUtils.Insert(query).then(function(resParam){
                    console.log('removeUser successfully');
                    res.send({status:"ok", response:resParam});
                }).catch(function(resParam){
                    console.log('removeUser failed');
                    res.send({status:"failed", response:resParam});
                    });
            }
        }).catch(function(resParam){
            console.log('signIn failed');
            res.send({status:"failed", response:resParam});
        });
        console.log('signIn in process'); 
});


/*
{
    "WatchID":"barelsha"
}
*/
app.delete('/removeWatch', function (req, res) {

        var watch= req.body.WatchID;
        var query = squel.select()
        .field("WatchID")
        .from("Watches")
        .where("WatchID = '"+watch+"'")
        .toString(); 
        DBUtils.Select(query).then(function(resParam){

            if(resParam.length==0){
                res.send({status:"failed", response:"failed to removeWatch - not exist"});
            }else{
                var query =(
                    squel.delete()
                        .from("Watches")
                        .where("WatchID = '"+watch+"'")
                        .toString()
                        );
                console.log('builded query '+ query)
                DBUtils.Insert(query).then(function(resParam){
                    console.log('removeUser successfully');
                    res.send({status:"ok", response:resParam});
                }).catch(function(resParam){
                    console.log('removeUser failed');
                    res.send({status:"failed", response:resParam});
                    });
            }
        }).catch(function(resParam){
            console.log('removeWatch failed');
            res.send({status:"failed", response:resParam});
        });
       // console.log('removeWatch in process');
});

app.get('/isAdmin/:id', function (req,res) {
    var userName = req.params.id;
    if (!userName) {
        res.send({status:"failed", response:"failed"});
        res.end();
    }
    else{
        var query =
        squel.select()
            .from("Users")
            .where("UserName = '"+userName+"'")
            .where("isAdmin =  'true'  ")
            .toString();
        DBUtils.Select(query).then(function(resParam){
            if(resParam.length == 0){
                res.send({status:"true", response:"false"});
            }else{
                    res.send({status:"ok", response:"true"});      
            }
        }).catch(function(resParam){
            console.log("failed");
            res.send({status:"failed", response:resParam});
        });
    }
});

app.get('/categoriesList', function (req,res) {
        var query =
        squel.select()
            .from("Categories")
            .toString();
        DBUtils.Select(query).then(function(resParam){
            if(resParam.length == 0){
                res.send({status:"true", response:"false"});
            }else{
                   // res.send({status:"true", response:"true"}); 
                    res.send({status:"ok", response:resParam});
            }
        }).catch(function(resParam){
            console.log("failed");
            res.send({status:"failed", response:resParam});
        });
});


/*
{
    "WatchID":"barelsha",
    "StokAmount":"-2"
}
*/
app.put('/updateInventory', function(req, res){
    var WatchID= req.body.WatchID;
    var numToUpORDowm = req.body.StokAmount;
    if (!WatchID || !numToUpORDowm) {
       res.send({status:"failed", response:"failed to update amount- missing data"});
        res.end();
    }
    else{
        var query = squel.select()
        .field("WatchID")
        .from("Watches")
        .where("WatchID = '"+WatchID+"'")
        .toString(); 
        DBUtils.Select(query).then(function(resParam){
            // do stockAmount++
            if(resParam.length==0){

               res.send({status:"failed", response:"failed to updateInventory- Watch doesnt exist"});
            }else{
                var query =(
                    squel.update()
                             .table("Watches")
                              .where("WatchID = '"+WatchID+"'")
                              .set("StokAmount = StokAmount + '"+numToUpORDowm+"' ") 
                             .toString()
                        );
                DBUtils.Insert(query).then(function(resParam){
                    console.log('updated successfully');
                    res.send({status:"ok", response:resParam});
                }).catch(function(resParam){
                    res.send({status:"failed", response:resParam});
                    });
            }
        }).catch(function(resParam){
            console.log('failed updating amount');
            res.send({status:"failed", response:resParam});
        });
       // console.log('signIn in process');
    }
});

app.get('/listOfOrders/:userName', function (req,res) {
    var userName = req.params.userName;
    if (!userName) {
        res.send({status:"failed", response:"failed"});
        res.end();
    }
    else{
        var query =
        squel.select()
            .from("Orders")
            .where("UserName = '"+userName+"'")
            .toString();
        DBUtils.Select(query).then(function(resParam){
            if(resParam.length == 0){
                res.send({status:"failed", response:"The username doesnt exist"});
            }else{
                    res.send({status:"ok", response:resParam});      
            }
        }).catch(function(resParam){
            console.log("failed");
            res.send({status:"failed", response:resParam});
        });
    }
});



var port = 4000;
app.listen(port, function(){
    console.log('listening to port: ' + port);
    console.log(__dirname);
});
//63342