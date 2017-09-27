/**
 * @module Model
 * @see module:js/model
 */
/**
 * Model class. Knows everything about API endpoint and data structure. Can format/map data to any structure.
 *
 * @constructor
 */
(function() {
    function Model() {
        var _this = this;

        var _apiPrefix = "http://localhost:3000/api/";

        /**
         * URL template for getting all orders from OData service.
         * @type {string}
         *
         * @private
         */
        var _allOrdersURLTemplate = _apiPrefix + "Orders";

        /**
         * URL template for getting the order from OData service.
         * @type {string}
         *
         * @example _orderByIdURLTemplate.replace("{ORDER}", orderId);
         *
         * @private
         */
        var _orderByIdURLTemplate = _apiPrefix + "Orders/{ORDER}";

        /**
         * URL template for getting the one order's products data from OData service.
         * @type {string}
         *
         * @example _orderProductsByIdURLTemplate.replace("{ORDER}", orderId);
         *
         * @private
         */
        var _orderProductsByIdURLTemplate = _apiPrefix + "Orders/{ORDER}" + "/products";

        /**
         * URL template for getting the one order's products data from OData service.
         * @type {string}
         *
         * @example _orderProductByIdURLTemplate.replace("{ORDER}", orderId)..replace("{PRODUCT}", productId);
         *
         * @private
         */
        var _orderProductByIdURLTemplate = _apiPrefix + "Orders/{ORDER}" + "/products/{PRODUCT}";

        /**
         * Fetch all orders.
         * @returns {Promise} the promise object will be resolved all the Orders object gets loaded.
         *
         * @public
         */
        this.fetchAllOrders = function() {
            return this
                .getData(_allOrdersURLTemplate)
                .then(function(ordersData) {
                    return ordersData;
                });
        };

        /**
         * Put the once Order data
         * 
         * @param {String} data the Data to send.
         * 
         * @param {String} orderId the order identifier.
         * 
         * @returns {Promise} the promise object will be resolved once the Data gets sended.
         *
         * @public
         */
        this.putDataForOrder = function(data, orderId) {
            return this
                .putData(_orderByIdURLTemplate.replace("{ORDER}", orderId), data);
        };

        /**
         * Put the once Order data
         * 
         * @param {String} data the Data to send.
         * 
         * @returns {Promise} the promise object will be resolved once the Data gets sended.
         *
         * @public
         */
        this.postDataForOrder = function(data) {
            return this
                .postData(_allOrdersURLTemplate, data);
        };

        /**
         * Post the once Product data
         * 
         * @param {String} data the Data to send.
         * 
         * @param {String} orderId the order identifier.
         * 
         * @returns {Promise} the promise object will be resolved once the Data gets sended.
         *
         * @public
         */
        this.postDataForProduct = function(data, orderId) {
            return this
                .postData(_orderProductsByIdURLTemplate.replace("{ORDER}", orderId), data);
        };


        /**
         * Delete the once Order data
         * 
         * @param {String} orderId the order's identifier to delete.
         * 
         * @returns {Promise} the promise object will be resolved the once Order object gets deleted.
         *
         * @public
         */
        this.deleteOrderData = function(orderId) {
            return this
                .deleteData(_orderByIdURLTemplate.replace("{ORDER}", orderId));
        };

        /**
         * Delete the once Product data
         * 
         * @param {String} orderId the order's identifier to delete.
         * 
         * @param {String} productId the product's identifier to delete.
         * 
         * @returns {Promise} the promise object will be resolved the once Order object gets deleted.
         *
         * @public
         */
        this.deleteProductData = function(orderId, productId) {
            return this
                .deleteData(_orderProductByIdURLTemplate.replace("{ORDER}", orderId).replace("{PRODUCT}", productId));
        };

        /**
         * Fetch the order object by id.
         *
         * @param {String} orderId the order's identifier.
         *
         * @returns {Promise} the promise object will be resolved once the Order object gets loaded.
         *
         * @public
         */
        this.fetchOrderById = function(orderId) {
            return this
                .getData(_orderByIdURLTemplate.replace("{ORDER}", orderId))
                .then(function(orderData) {
                    return orderData;
                });
        };


        /**
         * Fetch the one Order's products data.
         *
         * @param {String} orderId the order identifier to get products.
         * 
         * @returns {Promise} the promise object will be resolved order's products gets loaded.
         *
         * @public
         */
        this.fetchOrderProductsById = function(orderId) {
            return this
                .getData(_orderProductsByIdURLTemplate.replace("{ORDER}", orderId))
                .then(function(products) {
                    return products;
                });
        };

        /**
         * Common request handler.
         * 
         * @param  {Object} request XMLHttpRequest object
         * @param  {Function} resolve resolve request
         * @param  {Function} reject reject request
         * @param  {Function} reject method's string
         * 
         */
        this.executeAJAX = function(request, resolve, reject, method) {
            request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

            // listen to load event
            request.addEventListener("load", function() {
                if (request.status < 400) {
                    if (method === "GET") {
                        resolve(JSON.parse(request.responseText))
                    } else {
                        resolve(request.responseText);
                    }

                } else
                    reject(new Error("Request failed: " + request.statusText));
            });

            // listen to error event
            request.addEventListener("error", function() {
                reject(new Error("Network error"));
            });
        }

        /**
         * Common method which "promisifies" the XHR calls, for POST method.
         *
         * @param {string} url the URL address to sending data.
         * 
         * @param {string} requestuestBody JSON request body
         * 
         * @return {Promise} the promise object will be resolved once XHR gets loaded/failed.
         *
         * @public
         */
        this.postData = function(url, requestuestBody) {
            return new Promise(function(resolve, reject) {
                var request = new XMLHttpRequest();
                request.open("POST", url, true);
                _this.executeAJAX(request, resolve, reject);
                request.send(requestuestBody);
            });
        };


        /**
         * Common method which "promisifies" the XHR calls, for PUT method.
         *
         * @param {string} url the URL address to sending data.
         * 
         * @param {string} requestuestBody JSON request body
         * 
         * @return {Promise} the promise object will be resolved once XHR gets loaded/failed.
         *
         * @public
         */
        this.putData = function(url, requestuestBody) {
            return new Promise(function(resolve, reject) {
                var request = new XMLHttpRequest();
                request.open("PUT", url, true);
                _this.executeAJAX(request, resolve, reject);
                request.send(requestuestBody);
            });
        };


        /**
         * Common method which "promisifies" the XHR calls, for DELETE method.
         *
         * @param {string} url the URL address to delete.
         *
         * @return {Promise} the promise object will be resolved once XHR gets loaded/failed.
         *
         * @public
         */
        this.deleteData = function(url) {
            return new Promise(function(resolve, reject) {
                var request = new XMLHttpRequest();
                request.open("DELETE", url, true);
                _this.executeAJAX(request, resolve, reject);
                request.send(null);
            });
        };


        /**
         * Common method which "promisifies" the XHR calls, for GET method.
         *
         * @param {string} url the URL address to fetch.
         *
         * @return {Promise} the promise object will be resolved once XHR gets loaded/failed.
         *
         * @public
         */
        this.getData = function(url) {
            return new Promise(function(resolve, reject) {
                var request = new XMLHttpRequest();
                request.open("GET", url, true);
                _this.executeAJAX(request, resolve, reject, "GET");
                request.send();
            });
        };

    }

    window.Model = Model;
})();