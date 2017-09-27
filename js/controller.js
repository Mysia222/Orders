/**
 * 
 * Controller class. Orchestrates the model and view objects. A "glue" between them.
 *
 * @param {View} view view instance.
 * @param {Model} model model instance.
 *
 * @constructor
 */
(function() {

    function Controller(view, model) {
        /**
         * Controller object.
         * 
         * @type {Object}
         *
         * @private
         */
        var _this = this;

        /**
         * Get key code for search.
         * 
         * @type {Number}
         *
         * @private
         */
        var SEARCH_ORDERS_KEY_CODE = 13;

        /**
         * Initialize controller.
         *
         * @public
         */
        this.init = function() {

            //get DOM elements to hang handlers

            // get elements to search for orders in the list
            var orderSearchButton = view.getOrderSearchButton(),
                orderSearchInput = view.getOrderSearchInput(),
                orderSearchResearch = view.getOrderSearchResearch();

            // get elements to change main order's content
            var containerForOrders = view.getContainerForOrders(),
                activeOrder = view.getActiveOrderContainer();

            // get elements to add and delete orders
            var orderAddButton = view.getOrderAddButton(),
                addButton = view.getAddButton(),
                orderDeleteButton = view.getOrderDeleteButton();

            // get elements to add and delete product
            var productContainer = view.getDeleteProductContainer(),
                addProductButton = view.getAddProductButton();

            // get elements to edit and save shipping address data 
            var editShippingAddressButton = view.getEditShipToButton(),
                saveShippingAddressButton = view.getSaveShipToButton();

            // get tabs container to change tabs data
            var tabsContainer = view.getTabsContainer();

            // get elements to search and sort product
            var productsColumn = view.getProductColumnElement(),
                productSearchInput = view.getProductSearchInput();


            //hang event handlers

            addButton.addEventListener("mouseup", function() {
                document.querySelector("#envelope").style.display = 'block';
            });

            //attaches an event handler to the input element
            productSearchInput.addEventListener("keyup", function() {

                view.setUpProductsSearch();
            });

            productsColumn.addEventListener("mouseup", function(e) {

                _this.getSortTable(e);
            });

            tabsContainer.addEventListener("mouseup", function(e) {
                _this.changeTabsData(e);
            });

            editShippingAddressButton.addEventListener("mouseup",
                function(e) {
                    _this.editShippingAddress(e);
                }
            );

            saveShippingAddressButton.addEventListener("mouseup",
                function(e) {
                    _this.saveShippingAddress(e);
                }
            );

            orderDeleteButton.addEventListener("mouseup",
                function() {
                    _this.deleteOrder();
                }
            );

            addProductButton.addEventListener("mouseup",
                function() {
                    _this.addProduct();
                }
            );

            productContainer.addEventListener("mouseup",
                function() {
                    _this.deleteProduct();
                }
            );

            orderAddButton.addEventListener("mouseup",
                function() {
                    _this.addOrderToServer();
                }
            );

            orderSearchButton.addEventListener("mouseup",
                function() {
                    _this._onSearchOrderClick();
                }
            );
            orderSearchInput.addEventListener("keyup", function(e) {
                if (e.keyCode === SEARCH_ORDERS_KEY_CODE) {
                    _this._onSearchOrderClick();
                }
            });
            orderSearchResearch.addEventListener("mouseup", function() {
                _this._onRefreshSearchOrdersClick();
            });

            containerForOrders.addEventListener("click", _this.changeContentToOrder);



            //default case
            model
                .fetchAllOrders()
                .then(function(ordersArray) {
                    view.switchActiveOrder(false);

                    //Adding orders to the left sidebar.
                    view.addContentToBar(ordersArray);
                    if (view.getActiveOrderContainer()) {

                        //get active order's id
                        var activeOrder = view.getActiveOrderContainer().getAttribute("data-id");
                        return model
                            .fetchOrderById(activeOrder)
                    } else {
                        view.getNoOrderDiv().style.display = "";
                    }
                })
                .then(function(oneOrder) {
                    _this.addContentToActiveOrder(oneOrder);
                    return model.fetchOrderProductsById(oneOrder.id)
                })
                .then(function(data) {
                    _this.addContentToTable(data);
                });
        };



        /**
         * Load sorting click event handler.
         *
         * @listens click
         *
         * @param {Event} e the DOM event object.
         *
         * @private
         */
        this.getSortTable = function(e) {
            view.sortTable(e, 0, "string");
        }


        /**
         * Load edit Shipping address button click event handler.
         *
         * @listens click
         *
         * @param {Event} e the DOM event object.
         *
         * @private
         */
        this.editShippingAddress = function(e) {
            view.editShippingAddress(e);
        }

        /**
         * Load tab's buttons click event handler.
         *
         * @listens click
         *
         * @param {Event} e the DOM event object.
         *
         * @private
         */
        this.changeTabsData = function(e) {

            var activeOrder = view.getActiveOrderContainer().getAttribute("data-id");
            model
                .fetchOrderById(activeOrder)
                .then(function(oneOrder) {
                    view.changeTabs(e, oneOrder);
                });
        }

        /**
         * Load save Shipping address button click event handler.
         *
         * @listens click
         *
         * @param {Event} e the DOM event object.
         *
         * @private
         */
        this.saveShippingAddress = function(e) {

            var arrOfShippingAddressKeys = ["name", "address", "ZIP", "region", "country"],
                getActiveOrder = view.getActiveOrderContainer().getAttribute("data-id"),
                dataObjectToPut = view.saveShippingAddress(e, arrOfShippingAddressKeys);

            model.
            putDataForOrder(JSON.stringify(dataObjectToPut), getActiveOrder)
                .then(function(data) {
                    return model
                        .fetchOrderById(getActiveOrder)
                })
                .then(function(oneOrder) {
                    _this.addContentToActiveOrder(oneOrder);
                })
        }



        /**
         * Load delete order button click event handler.
         *
         * @listens click
         *
         * @param {Event} e the DOM event object.
         *
         * @private
         */
        this.deleteOrder = function() {

            var orderToDelete = view.getActiveOrderContainer().getAttribute("data-id"),
                containerForOrders = view.getContainerForOrders();
            view.showLoading("order");
            model.
            deleteOrderData(orderToDelete)
                .then(function() {

                    return model.fetchAllOrders();
                })
                .then(function(ordersArray) {

                    containerForOrders.innerHTML = ""; //delete used order's data from page
                    view.addContentToBar(ordersArray);
                    view.switchActiveOrder(true);
                    view.hideLoading("order");
                });

        }

        /**
         * Load delete product button click event handler.
         *
         * @listens click
         *
         * @param {Event} e the DOM event object.
         *
         * @private
         */
        this.deleteProduct = function(e) {
            var orderIdToDelete = view.getActiveOrderContainer().getAttribute("data-id"),
                productIdToDelete = event.target.getAttribute("data-id");
            view.showLoading("product");
            model.
            deleteProductData(orderIdToDelete, productIdToDelete)
                .then(function() {

                    return model.fetchOrderProductsById(orderIdToDelete)
                })
                .then(function(data) {
                    _this.addContentToTable(data);
                    view.hideLoading("product");
                });
        }

        /**
         * Load add product button click event handler.
         *
         * @listens click
         *
         * @param {Event} e the DOM event object.
         *
         * @private
         */
        this.addProduct = function(e) {
            var activeOrder = view.getActiveOrderContainer().getAttribute("data-id");
            var productsDataToAdd = view.addProductByForm(activeOrder);
            view.showLoading("product");
            model.
            postDataForProduct(JSON.stringify(productsDataToAdd), activeOrder)
                .then(function(data) {

                    return model.fetchOrderProductsById(activeOrder)
                })
                .then(function(data) {
                    _this.addContentToTable(data);
                    view.hideLoading("product");
                });
        }

        /**
         * Insert order's data into page.
         *
         * @param {Object} order the one order's data
         *
         * @private
         */
        this.addContentToActiveOrder = function(order) {
            view.addContentToHeader(order);
            view.addContentToForm(order);
        };

        /**
         * Insert data into table.
         *
         * @param {Array} products array of products
         *
         * @private
         */
        this.addContentToTable = function(products) {
            view.addContentToTable(products, products.length);
            view.setTotalPrice(products);
        }

        /**
         * Load orders's container click event handler.
         *
         * @listens click
         *
         * @param {Event} e the DOM event object.
         *
         * @private
         */

        this.changeContentToOrder = function(event) {
            view.switchActiveOrder(false);
            view.changeContentForActiveOrder(event);

            //get active order's id
            var activeOrder = view.getActiveOrderContainer().getAttribute("data-id");

            model
                .fetchOrderById(activeOrder)
                .then(function(oneOrder) {
                    _this.addContentToActiveOrder(oneOrder);
                    view.changeTabsView("track");
                    return model.fetchOrderProductsById(oneOrder.id)
                })
                .then(function(data) {
                    _this.addContentToTable(data);

                });

        }


        /**
         * Search order button click event handler or press enter to search.
         *
         * @listens click
         *
         * @param {Event} e the DOM event object.
         *
         * @private
         */
        this._onSearchOrderClick = function(e) {
            model
                .fetchAllOrders()
                .then(function(ordersArray) {
                    view.searchForOrders();
                });
        };

        /**
         * Refresh order button click event handler
         * @listens click
         *
         * @param {Event} e the DOM event object.
         *
         * @private
         */
        this._onRefreshSearchOrdersClick = function(e) {
            model
                .fetchAllOrders()
                .then(function(ordersArray) {
                    view.refreshSearch();
                });
        };


        /**
         * Add new order data
         *
         * @private
         */
        this.addOrderToServer = function() {
            var orderToAdd = view.addOrderByForm();
            var containerForOrders = view.getContainerForOrders();
            view.showLoading("order");
            model.
            postDataForOrder(JSON.stringify(orderToAdd))
                .then(function() {

                    return model.fetchAllOrders();
                })
                .then(function(ordersArray) {
                    containerForOrders.innerHTML = "";
                    view.addContentToBar(ordersArray);
                    view.hideLoading("order");
                });

        }

    }



    window.Controller = Controller;
})();