'use strict';

var myApp = angular.module('myApp.category', ['ngRoute', 'ui.bootstrap']);
var tkn = localStorage.getItem("token");
var usId = localStorage.getItem("userId");
console.log(tkn);
myApp.run(function ($http) {
    $http.defaults.headers.common.Authorization = tkn;
});

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/category', {
        templateUrl: "masters/category/category.html",
        controller: 'categoryCtrl'
    });
}]);

myApp.controller('categoryCtrl', ['$scope', 'categoryService', function ($scope, categoryService) {


    ////////////////pagination////////////////////


    $scope.pageSize = 2;
    $scope.pageIndex = 1;
    $scope.maxSize = "";
    $scope.totalItems = "";
    $scope.numPages = "";
    // $scope.pagesizeSelected="";
    getallCat();
    $scope.categ = [];
    function getallCat() {
        $scope.categ = [];
        categoryService.getallCat($scope.pageIndex, $scope.pageSize).then(function (response) {
            console.log(response.data.content);
            angular.forEach(response.data.content, function (value) {
                $scope.categ.push({
                    categoryId: value.categoryId, categoryName: value.categoryName, description: value.description,
                    createdDate: value.insertedDate, updatedDate: value.updatedDate, createdBy: value.createdBy.userName,
                    updatedBy: value.updatedBy.userName
                });
                $scope.totalItems = response.data.totalElements;
                $scope.numPages = response.data.totalPages;
            });
        });
    }


    $scope.cats = {
        categoryName: "",
        // categoryCode: "",
        description: "",
        createdBy:
        {
            userId: usId
        },
        updatedBy: {
            userId: usId
        }
    };

    $scope.changePageSize = function () {
        $scope.pageIndex = 0;
        getallCat();
    }

    $scope.pageChange = function () {
        $scope.pageIndex = $scope.pageIndex - 1;
        getallCat($scope.pageIndex, $scope.pageSize);
        $scope.pageIndex = $scope.pageIndex + 1;
    }


    /////////////end of pagination///////////////////
    // $scope.cats = {
    //     createdBy: {
    //         userId: usId
    //     },
    //     updatedBy: {
    //         userId: usId
    //     },
    //     description: "",
    //     // categoryCode: "",
    //     categoryName: "",
    //     categoryId: ""
    // };

    $scope.editcats = function (x) {
        $scope.cats.categoryName = x.categoryName;
        $scope.cats.description = x.description;
        $scope.cats.categoryId = x.categoryId;
        // $scope.cats.categoryCode = x.categoryCode;
        console.log($scope.cats);
    }
    $scope.deletecats = function () {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                categoryService.deletecats($scope.cats).then(function () {
                    $scope.pageChange();
                    Swal.fire("Category Deleted Successfully!");
                });
                $scope.loadCategory();
            }
        });


    }
    $scope.clearcats = function () {
        $scope.cats.categoryName = "";
        $scope.cats.description = "";
        $scope.cats.categoryId = "";
        // $scope.cats.categoryCode = "";
        console.log($scope.cats);
    }
    $scope.addcats = function () {
        categoryService.addcats($scope.cats).then(function (response) {
            $scope.pageChange();
            if (response.data.responseCode == 201) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Category Successfully Created!',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                swal.fire("Category Already Exist!")
            }
            $scope.loadCategory();
        });

    }

    $scope.tabShow = true;

    $scope.closeCat = function () {
        $scope.catpop = false;
    }

    $scope.addcat = function () {
        $scope.catpop = $scope.addcatbtn = true; $scope.catedit = $scope.tabShow = $scope.catdelete = false;
    }

    $scope.loadCategory = function () {
        $scope.tabShow = true; $scope.catpop = false;
    }

}]);