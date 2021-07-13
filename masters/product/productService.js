myApp.service('productService', ['$http', function ($http) {

    const URL = "https://executivetracking.cloudjiffy.net/WaterPlantWeb/";

    this.addProds = function (prod) {
        if (prod.productId == 0 || prod.productId == null) {
            return $http({
                method: "POST",
                url: URL + "product/v1/createProduct",
                data: JSON.stringify(prod)
            })
        } else {
            return $http({
                method: "PUT",
                url: URL + "product/v1/updateProduct",
                data: JSON.stringify(prod)
            })
        }
    }

    this.getallProds = function (pageIndex, pageSize) {
        return $http({
            method: 'GET',
            url: URL + "product/v1/getAllProductsByPagination/{pageNumber}/{pageSize}?pageNumber=" + pageIndex + "&pageSize=" + pageSize
        });
    }

    this.deleteProds = function (prod) {
        return $http({
            method: "DELETE",
            url: URL + "product/v1/deleteProductById/" + prod.productId
        })
    }
}]);