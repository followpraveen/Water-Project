myApp.service('appService', ['$http', function ($http) {

    const URL = "https://executivetracking.cloudjiffy.net/WaterPlantWeb/";

    // ------------------------- Category Service start ------------------------- //

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

    // ------------------------- Category Service end ------------------------- //

    
    // ------------------------- Product Service start ------------------------- //
    
        this.addProduct = function (pro) {
            if (pro.productId == 0 || pro.productId == null) {
                return $http({
                    method: "POST",
                    url: URL + "product/v1/createProduct",
                    data: JSON.stringify(pro)
                })
            }
            else {
                return $http({
                    method: "PUT",
                    url: URL + "product/v1/updateProduct",
                    data: JSON.stringify(pro)
                })
            }
        }
    
        this.getallProduct = function (pageIndexP, pageSizeP) {
            return $http({
                method: 'GET',
                url: URL + "product/v1/getAllProductsByPagination/{pageNumber}/{pageSize}?pageNumber=" + pageIndexP + "&pageSize=" + pageSizeP
            });
        }
    
        this.deleteProduct = function (pro) {
            return $http({
                method: "DELETE",
                url: URL + "product/v1/deleteProductByProductId/" + pro.productId
            })
        }


        // ------------------------- Product Service end ------------------------- //

}]);