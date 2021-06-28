myApp.service('categoryService', ['$http', function ($http) {

    const URL = "https://executivetracking.cloudjiffy.net/WaterPlantWeb/";

    this.addcats = function (cats) {
        if (cats.categoryId == 0 || cats.categoryId == null) {
            return $http({
                method: "POST",
                url: URL + "category/v1/createCategory",
                data: JSON.stringify(cats)
            })
        }

        else {
            return $http({
                method: "PUT",
                url: URL + "category/v1/updateCategory",
                data: JSON.stringify(cats)
            })
        }
    }

    this.getallCat = function (pageIndex, pageSize) {
        return $http({
            method: 'GET',
            url: URL + "category/v1/getAllCategoryByPagination/{pageNumber}/{pageSize}?pageNumber=" + pageIndex + "&pageSize=" + pageSize
        });
    }

    this.deletecats = function (cats) {
        return $http({
            method: "DELETE",
            url: URL + "category/v1/deleteCategoryById/" + cats.categoryId
        })
    }

}]);