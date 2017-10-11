/**
 * @module View
 * @see module:js/view
 */
/**
 * View class. Knows everything about dom & manipulation and a little bit about data structure, which should be
 * filled into UI element.
 *
 * @constructor
 */
(function() {

    function View() {

        var _this = this;

        /**
         * Accepted status
         * @constant
         * @type {string}
         */
        var STATUS_ACCEPTED = " Accepted";

        /**
         * Urgent status
         * @constant
         * @type {string}
         */
        var STATUS_URGENT = "Urgent";

        /**
         * Class of the Table DOM element'
         * @constant
         * @type {string}
         */
        var TABLE_CLASS = "products-table";

        /**
         * Class of the product column DOM element'
         * @constant
         * @type {string}
         */
        var PRODUCT_COLUMN_CLASS = "products";


        /**
         * Class of the H1 DOM element'
         * @constant
         * @type {string}
         */
        var HEADER_CLASS = "caption";

        /**
         * Class of the active order LI DOM element'
         * @constant
         * @type {string}
         */
        var ORDER_ACTIVE_CONTAINER_CLASS = "active-order";

        /**
         * ID of the sidebar "search" button DOM element'
         * @constant
         * @type {string}
         */
        var ORDER_SEARCH_BUTTON_ID = "search-button";

        /**
         * ID of the edit shipping address button DOM element'
         * @constant
         * @type {string}
         */
        var EDIT_SHIP_TO_BUTTON_ID = "edit-ship";

        /**
         * ID of the save shipping address data button DOM element'
         * @constant
         * @type {string}
         */
        var SAVE_SHIP_TO_BUTTON_ID = "save-ship";

        /**
         * ID of the sidebar input DOM element'
         * @constant
         * @type {string}
         */
        var ORDER_SEARCH_INPUT_ID = "search-input";

        /**
         * ID of the sidebar "refresh" button DOM element'
         * @constant
         * @type {string}
         */
        var ORDER_SEARCH_REFRESH_BUTTON_ID = "search-refresh";

        /**
         * Class of container of the delete products buttons DOM elements'
         * @constant
         * @type {string}
         */
        var PRODUCT_DELETE_CONTAINER_CLASS = "delete-row-container";

        /**
         * ID of the search products input DOM elements'
         * @constant
         * @type {string}
         */
        var PRODUCT_SEARCH_INPUT_ID = "search-table-input";



        /**
         * ID of the wrapper ul DOM element'
         * @constant
         * @type {string}
         */
        var ORDERS_WRAPPER_ID = "items";

        /**
         * Class of the main form container div DOM element'
         * @constant
         * @type {string}
         */
        var ORDERS_MAIN_FORM_CLASS = "main-form";

        /**
         * Class of the main form inputs div DOM element'
         * @constant
         * @type {string}
         */
        var ORDERS_MAIN_FORM_INPUTS_CLASS = "main-form-input";

        /**
         * Class of the active tab div DOM element'
         * @constant
         * @type {string}
         */
        var TAB_CLASS = "list-tab";

        /**
         * Class of the tab's container div DOM element'
         * @constant
         * @type {string}
         */
        var TABS_CONTAINER_CLASS = "list-tab";

        /**
         * ID of the user tab div DOM element'
         * @constant
         * @type {string}
         */
        var USER_TAB_ID = "user";

        /**
         * ID of the track tab div DOM element'
         * @constant
         * @type {string}
         */
        var TRACK_TAB_ID = "track";
        /**
         * ID of the active tab div DOM element'
         * @constant
         * @type {string}
         */
        var ACTIVE_TAB_CLASS = "active-icon";
        /**
         * ID of the map tab div DOM element'
         * @constant
         * @type {string}
         */
        var MAP_TAB_ID = "google-map";

        /**
         * ID of the footer "add" button DOM element'
         * @constant
         * @type {string}
         */
        var ADD_ORDER_BUTTON_ID = "add-ico";

        /**
         * ID of the order form "add" button DOM element'
         * @constant
         * @type {string}
         */
        var ADD_SUBMIT_BUTTON_ID = "add-submit";


        /**
         * ID of the product form "add" submit DOM element'
         * @constant
         * @type {string}
         */
        var ADD_PRODUCT_INPUT_ID = "add-product-submit";

        /**
         * ID of the footer "delete" button DOM element'
         * @constant
         * @type {string}
         */
        var DELETE_ORDER_SUBMIT_BUTTON_ID = "delete-ico";

        /**
         * Class of the no order div DOM element'
         * @constant
         * @type {string}
         */
        var NO_ORDER_DIV = "no-orders";

        var count = 0;

        /**
         * Returns count for selecting ascending or descending sorting
         *
         * @returns {Number} count number for selecting.
         */
        this.getSortingTypeCount = function() {
            return count;
        };

        /**
         * Returns the order delete products containers .
         *
         * @returns {HTMLDivElement} the div element.
         */
        this.getDeleteProductContainer = function() {
            return document.querySelector("." + PRODUCT_DELETE_CONTAINER_CLASS);
        };

        /**
         * Returns the no order div .
         *
         * @returns {HTMLDivElement} the div element.
         */
        this.getNoOrderDiv = function() {
            return document.querySelector("." + NO_ORDER_DIV);
        };

        /**
         * Returns the search product's input.
         *
         * @returns {HTMLDivElement} the div element.
         */
        this.getProductSearchInput = function() {
            return document.querySelector("#" + PRODUCT_SEARCH_INPUT_ID);
        };



        /**
         * Returns the order add products input.
         *
         * @returns {HTMLInputElement} the div element.
         */
        this.getAddProductButton = function() {
            return document.querySelector("#" + ADD_PRODUCT_INPUT_ID);
        };


        /**
         * Returns the order delete sidebar button .
         *
         * @returns {HTMLButtonElement} the button element.
         */
        this.getOrderDeleteButton = function() {
            return document.querySelector("#" + DELETE_ORDER_SUBMIT_BUTTON_ID);
        };

        /**
         * Returns the order add sidebar button .
         *
         * @returns {HTMLButtonElement} the button element.
         */
        this.getAddButton = function() {
            return document.querySelector("#" + ADD_ORDER_BUTTON_ID);
        };

        /**
         * Returns the edit shipping address button .
         *
         * @returns {HTMLButtonElement} the button element.
         */
        this.getEditShipToButton = function() {
            return document.querySelector("#" + EDIT_SHIP_TO_BUTTON_ID);
        };

        /**
         * Returns the save shipping address button .
         *
         * @returns {HTMLButtonElement} the button element.
         */

        this.getSaveShipToButton = function() {
            return document.querySelector("#" + SAVE_SHIP_TO_BUTTON_ID);
        };


        /**
         * Returns the order add submit sidebar button .
         *
         * @returns {HTMLButtonElement} the button element.
         */
        this.getOrderAddButton = function() {
            return document.querySelector("#" + ADD_SUBMIT_BUTTON_ID);
        };

        /**
         * Returns active tab button.
         *
         * @returns {HTMLButtonElement} the button element.
         *
         * @public
         */
        this.getActiveTab = function() {
            return document.querySelector("." + ACTIVE_TAB_CLASS);
        };

        /**
         * Returns tab's container.
         *
         * @returns {HTMLDivElement} the div element.
         *
         * @public
         */
        this.getTabsContainer = function() {
            return document.querySelector("." + TABS_CONTAINER_CLASS);
        };

        /**
         * Returns track tab button.
         *
         * @returns {HTMLButtonElement} the button element.
         *
         * @public
         */
        this.getTrackTab = function() {
            return document.querySelector("#" + TRACK_TAB_ID);
        };

        /**
         * Returns user tab button.
         *
         * @returns {HTMLButtonElement} the button element.
         *
         * @public
         */
        this.getUserTab = function() {
            return document.querySelector("#" + USER_TAB_ID);
        };

        /**
         * Returns map tab button.
         *
         * @returns {HTMLButtonElement} the button element.
         *
         * @public
         */
        this.getMapTab = function() {
            return document.querySelector("#" + MAP_TAB_ID);
        };

        /**
         * Returns the active order LI.
         *
         * @returns {HTMLLIElement} the li element.
         *
         * @public
         */
        this.getActiveOrderContainer = function() {
            var container = document.querySelector("." + ORDER_ACTIVE_CONTAINER_CLASS);
            if (container) {
                this.getNoOrderDiv().style.display = "none";
                return container;
            } else {
                this.getNoOrderDiv().style.display = "";
            }
        };

        /**
         * Returns header.
         *
         * @returns {HTMLH1Element} the h1 element.
         *
         * @public
         */
        this.getHeaderElement = function() {
            return document.querySelector("." + HEADER_CLASS);
        };

        /**
         * Returns table element.
         *
         * @returns {HTMLTableElement} the table element.
         *
         * @public
         */
        this.getTableElement = function() {
            return document.querySelector("." + TABLE_CLASS);
        };

        /**
         * Returns th element.
         *
         * @returns {HTMLTableElement} the table element.
         *
         * @public
         */
        this.getProductColumnElement = function() {
            return document.querySelector("." + PRODUCT_COLUMN_CLASS);
        };

        /**
         * Returns the order search sidebar input (type button) .
         *
         * @returns {HTMLInputElement} the input element.
         */
        this.getOrderSearchButton = function() {
            return document.querySelector("#" + ORDER_SEARCH_BUTTON_ID);
        };

        /**
         * Returns the order search sidebar input .
         *
         * @returns {HTMLInputElement} the input element.
         */
        this.getOrderSearchInput = function() {
            return document.querySelector("#" + ORDER_SEARCH_INPUT_ID);
        };

        /**
         * Returns the order refresh sidebar button .
         *
         * @returns {HTMLButtonElement} the button element.
         */
        this.getOrderSearchResearch = function() {
            return document.querySelector("#" + ORDER_SEARCH_REFRESH_BUTTON_ID);
        };

        /**
         * Returns the wrapper orders ul DOM element' .
         *
         * @returns {HTMLUlElement} the ul element.
         */
        this.getContainerForOrders = function() {
            return document.querySelector("#" + ORDERS_WRAPPER_ID);
        };

        /**
         * Returns the main form container DOM element' .
         *
         * @returns {HTMLDIVElement} the div element.
         */
        this.getContainerForMainForm = function() {
            return document.querySelector("." + ORDERS_MAIN_FORM_CLASS);
        };

        /**
         * Returns the main form inputs DOM element' .
         *
         * @returns {HTMLInputElement} the input element.
         */
        this.getInputsForMainForm = function() {
            return document.querySelectorAll("." + ORDERS_MAIN_FORM_INPUTS_CLASS);
        };

        /**
         * Possible to edit the shipping address form
         *
         * @param {Event} e event object
         * 
         */
        //
        this.editShippingAddress = function(e) {
            var inputsArray = this.getInputsForMainForm();
            var count = inputsArray.length;

            while (count--) {
                inputsArray[count].readOnly = false;
                inputsArray[count].classList.add("edit-input");
            }

            this.getSaveShipToButton().style.display = "block";
            this.getEditShipToButton().style.display = "none";
        };

        /**
         * Get shipping address object data
         *
         * @param {Event} e event object
         *
         * @param {Array} arrayOfKeys array of keys
         * 
         * @return {Object} object to put data
         */
        this.saveShippingAddress = function(e, arrayOfKeys) {
            var inputsArray = this.getInputsForMainForm(),
                valuesArray = [];
            var count = inputsArray.length;

            while (count--) {
                inputsArray[count].readOnly = true;
                inputsArray[count].classList.remove("edit-input");
                valuesArray[count] = inputsArray[count].value;
            }

            this.getSaveShipToButton().style.display = "none";
            this.getEditShipToButton().style.display = "block";

            //create object with shipping address data
            var dataObjToPut = {};
            dataObjToPut.shipTo = {};

            //fill data from inputs
            for (var i = 0; i < inputsArray.length; i++) {
                dataObjToPut.shipTo[arrayOfKeys[i]] = valuesArray[i];
            }

            return dataObjToPut;
        };

        /**
         * Get product to add
         *
         * @param {string} activeOrder active order's id
         * 
         * @return {Object} object to add data
         */
        //
        this.addProductByForm = function(activeOrder) {

            var objValues = {};

            //close form
            var addForm = document.querySelector("#product-form-envelope");
            addForm.style.display = 'none';

            //get input's data
            var inputs = document.querySelectorAll(".product-data");

            //add data to objValues object
            for (var i = 0; i < inputs.length; i++) {
                var productDescription = inputs[i].getAttribute("data-product");
                objValues[productDescription] = inputs[i].value;
            }

            //add orderId property
            objValues["orderId"] = activeOrder;

            return objValues;
        };

        /**
         * Is the product selected.
         *
         * @param {Boolean} isDeleteCase determines the state
         * 
         */
        //
        this.switchActiveOrder = function(isDeleteCase) {
            if (isDeleteCase) {

                if (this.getActiveOrderContainer() !== null) {
                    this.getActiveOrderContainer().style.backgroundColor = "white";
                    document.querySelectorAll('.wrapper')[1].style.display = "none";
                    document.querySelector('#no-active-order').style.display = "";
                }

            } else {
                document.querySelectorAll('.wrapper')[1].style.display = "";
                document.querySelector('#no-active-order').style.display = "none";
            }
        };

        /**
         * Display the number of orders or items in the table
         *
         * @param {Number} count number of items.
         *
         * @param {String} container class of element for insert.
         * 
         * @param {String} items method's context.
         */
        //
        this.addItemsCount = function(count, container, items) {
            var containerElem = document.querySelector("." + container);
            containerElem.innerHTML = items + " (" + count + ")";
        };

        /**
         * Add orders to the left sidebar
         *
         * @param {Array} arrOfOrders array of all orders.
         */
        this.addContentToBar = function(arrOfOrders) {
            for (var i = 0; i < arrOfOrders.length; i++) {
                this.createOneOrder(i, arrOfOrders, this.getContainerForOrders());
            }
            this.addItemsCount(arrOfOrders.length, "counts-orders", "Orders");
        };


        /**
         * Create and insert to container once order data
         * 
         * @param  {Number} id once order's identifier
         * @param  {Array} arrayData array of order objects
         * @param  {HTMLULElement} container ul element for insert order's data
         */
        this.createOneOrder = function(id, arrayData, container) {
            var listItem = document.createElement('li');
            listItem.classList = 'one-order';
            listItem.dataset['id'] = arrayData[id].id;

            if (id === 0) {
                listItem.classList += " " + ORDER_ACTIVE_CONTAINER_CLASS;
            }

            var oneOrder = document.createElement('div');
            oneOrder.classList.add('cover');

            var orderId = document.createElement('div');
            orderId.classList = 'name-order';
            orderId.innerHTML = "Order " + arrayData[id].id;

            container
                .appendChild(listItem)
                .appendChild(oneOrder)
                .appendChild(orderId);

            var orderInfo = arrayData[id].summary;

            for (var key in orderInfo) {
                var oneInfo = this.fillOrderData(key, orderInfo[key]);
                oneOrder.appendChild(oneInfo);
            }
        };

        /**
         * Filling one order summary data in the left sidebar
         *
         * @param {String} key key of summary object .
         *
         * @param {String} prop property of summary object.
         * 
         */
        this.fillOrderData = function(key, prop) {
            var oneItem = document.createElement('div');
            switch (key) {
                case 'createdAt':
                    oneItem.classList = 'date';
                    oneItem.innerHTML += prop;
                    break;
                case 'customer':
                    oneItem.classList = 'destination';
                    oneItem.innerHTML += prop;
                    break;
                case 'status':
                    oneItem.classList = 'state';
                    oneItem.innerHTML += this.convertState(prop, oneItem);
                    break;
                case 'shippedAt':
                    oneItem.classList = 'shipped';
                    oneItem.innerHTML += "Shipped: " + this.convertDate(prop);
                    break;
            }
            return oneItem;
        };


        /**
         * Change view date.
         *
         * @param {String} date date data.
         * 
         */
        this.convertDate = function(date) {

            var finallyDate,
                arrDate = date.split('.'),
                arrMonth = ["янв", "февр", "апр", "май", "июнь", "июль", "авг", "сент", "окт", "нояб", "дек"];

            for (var i = 0; i < arrMonth.length; i++) {
                if (arrDate[1] == i) {
                    arrDate[1] = arrMonth[i];
                }
            }

            finallyDate = arrDate[0] + " " + arrDate[1] + ". " + arrDate[2] + " г.";

            return finallyDate;
        };

        /**
         * Change view state.
         *
         * @param {String} state state data.
         * @param {HTMLDIVElement} itemElem div for insert status data.
         * 
         */
        this.convertState = function(state, itemElem) {
            var newStateVersion = "";
            if (state === STATUS_ACCEPTED) {
                newStateVersion = "In time";
            } else {
                newStateVersion = STATUS_URGENT;
                itemElem.classList += ' active-state';
            }
            return newStateVersion;
        };

        /**
         * Event handler function search button and enter.
         */
        this.searchForOrders = function() {
            var count = 0,
                oneOrder = document.querySelectorAll(".cover");

            //get input's value
            var input = this.getOrderSearchInput(),
                inputValue = input.value.toLowerCase().replace(/\s/g, '');

            for (var i = 0; i < oneOrder.length; i++) {
                var arrOfProperties = oneOrder[i].children,
                    container = oneOrder[i].parentElement;

                container.style.display = "none";

                for (var j = 0; j < arrOfProperties.length; j++) {
                    var propertyValue = arrOfProperties[j],
                        formatPropertyValue = propertyValue.innerHTML.replace(/\s/g, '').toLowerCase();

                    if (formatPropertyValue.indexOf(inputValue) !== -1) {
                        container.style.display = "";
                    }

                }

                if (container.style.display === "") {
                    count++;
                }

            }

            addItemsCount(count, "counts-orders", "Orders");
        };


        /**
         * Refresh search orders
         */
        this.refreshSearch = function() {
            this.getOrderSearchInput().value = "";

            for (var i = 0; i < this.getContainerForOrders().children.length; i++) {
                this.getContainerForOrders().children[i].style.display = "";
            }

            this.addItemsCount(this.getContainerForOrders().children.length, "counts-orders", "Orders")
        };

        /**
         * Filling header in one order in the left sidebar
         * @param  {Object} order the once order data object.
         */
        this.addContentToHeader = function(order) {
            var orderInfoContainer = document.querySelector(".data-order"); //container for OrderInfo

            //delete the used data from container and header, if it exists
            orderInfoContainer.innerHTML = "";
            this.getHeaderElement().innerHTML = "Order ";

            //get order summary info from order
            var formatDateShipped = this.convertDate(order.summary["shippedAt"]),
                formatDateOrdered = this.convertDate(order.summary["createdAt"]),
                customerInfo = order.summary["customer"];

            //description's and value's arrays
            var arrDescription = [
                    "Customer: ",
                    "Ordered: ",
                    "Shipped: "
                ],
                arrValue = [
                    customerInfo,
                    formatDateOrdered,
                    formatDateShipped
                ];

            //filling data
            this.getHeaderElement().innerHTML += order.id;
            this.fillOrderForm(arrDescription, arrValue, "header-form", orderInfoContainer);
        };

        /**
         * Add values for form.
         *
         * @param {string[]} description descriptions strings
         * @param {(Object|string[])} value values for insert
         * @param {string} type forms context
         * @param {Object} container container for form
         * 
         */
        this.fillOrderForm = function(description, value, type, container) {
            var arrValues = [];

            //filling an auxiliary array with values from object or array values
            for (var key in value) {
                arrValues.push(value[key]);
            }

            for (var j = 0; j < description.length; j++) {

                // container elements
                var query = document.createElement("div"),
                    depiction = document.createElement("div");

                // elements to insert a value and a description
                var label = document.createElement("label"),
                    input = document.createElement('input');

                //add data class into header form
                if (type === "header-form") {
                    query.classList.add("data");
                    depiction.classList.add("data");
                }

                //add main-form-input class into main form
                if (type === "main-form") {
                    input.classList = "main-form-input";
                }

                //add classes to query and depiction elements
                query.classList.add("query");
                depiction.classList.add("depiction");

                //add depiction data into query element
                label.innerHTML = description[j];

                //set attributes to input
                input.setAttribute("value", arrValues[j]);
                input.setAttribute("readonly", true);

                //add input and label elements into container
                container
                    .appendChild(query)
                    .appendChild(label);
                container
                    .appendChild(depiction)
                    .appendChild(input);
            }

        };


        /**
         * @param  {Object} order  the once order data object.
         * @param  {String} activeTab string of active tab.
         */
        this.addContentToForm = function(order, activeTab = TRACK_TAB_ID) {

            // get ShipTo and CustomerInfo data from active order
            var shipToInfo = order.shipTo,
                customerInfo = order.customerInfo;

            //arrays of customer and shipto values descriptions
            var arrDescriptionCustomer = [
                    "First Name: ",
                    "Last Name: ",
                    "Address: ",
                    "Phone: ",
                    "Email: "
                ],
                arrDescriptionShipTo = [
                    "Name: ",
                    "Street: ",
                    "ZIP Code / City: ",
                    "Region: ",
                    "Country: "
                ];

            //get container and subtitle to fill data
            var mainContainer = document.querySelector(".main-form"),
                subtitle = document.querySelector(".subtitle");

            //map element
            var map = document.querySelector("#map");

            //delete the used data from header
            mainContainer.innerHTML = "";

            //change the view of tab's icons
            this.changeTabsView(activeTab);

            //fill information depending on the active tab
            if (activeTab === USER_TAB_ID) {
                subtitle.innerHTML = "Personal Information:";
                this.getEditShipToButton().style.display = "none";
                this.getSaveShipToButton().style.display = "none";
                this.fillOrderForm(arrDescriptionCustomer, customerInfo, "main-form", mainContainer);
                map.style.display = "none";
            }
            if (activeTab === TRACK_TAB_ID) {
                this.getEditShipToButton().style.display = "block";
                subtitle.innerHTML = "Shipping Address:";
                this.fillOrderForm(arrDescriptionShipTo, shipToInfo, "main-form", mainContainer);
                map.style.display = "none";

            }
            if (activeTab === MAP_TAB_ID) {
                this.getEditShipToButton().style.display = "none";
                subtitle.innerHTML = "Shipping Map:";
                map.style.display = "";
                this.addMap(shipToInfo);
            }
        };

        /**
         * Change tabs
         * 
         * @param {Event} e the DOM event object.
         * 
         * @param  {Object} activeOrder orderData the order data object.
         */
        this.changeTabs = function(e, activeOrder) {
            var tabs = document.querySelector(".list-tab"),
                activeTab = "",
                subtitle = document.querySelector(".subtitle");

            //get tab's buttons
            var userElm = this.getUserTab(),
                trackElm = this.getTrackTab(),
                mapElm = this.getMapTab();

            var target = e.target;

            //fill information depending on the pressed button
            if (target === userElm) {

                _this.addContentToForm(activeOrder, USER_TAB_ID);
                activeTab = USER_TAB_ID;
            }
            if (target === trackElm) {
                _this.addContentToForm(activeOrder, TRACK_TAB_ID);
                activeTab = TRACK_TAB_ID;
            }
            if (target === mapElm) {
                this.getEditShipToButton().style.display = "none";
                subtitle.innerHTML = "Shipping Map:";
                map.style.display = "";
                this.addMap(activeOrder);
                activeTab = MAP_TAB_ID;
            }

            _this.changeTabsView(activeTab);
        };


        this.addMap = function(activeOrder) {
            var map = document.querySelector("#map");
            map.innerHTML = "";
            this.getEditShipToButton().style.display = "none";
            var mainContainer = document.querySelector(".main-form");
            var img = document.createElement("img");

            mainContainer.innerHTML = "";
            map.style.display = "";
            img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + activeOrder['shipTo'].address + "&size=300x200&key=AIzaSyBWdc6DsiQLc-gGzZYl0KscvJd4v4tckGc";
            console.log(img.src);
            map.appendChild(img);
        };

        /**
         * Change class and background of tabs
         * @param  {String} activeTab active tab string
         */
        this.changeTabsView = function(activeTab) {
            var activeTabElement = document.querySelector("#" + activeTab);

            //get tab's buttons elements
            var allTabsElements = document.querySelector(".list-tab").children;

            for (var i = 0; i < allTabsElements.length; i++) {
                allTabsElements[i].style.backgroundImage = "url(img/" + allTabsElements[i].id + ".png)";
                allTabsElements[i].classList.remove(ACTIVE_TAB_CLASS);

                //add active class and background style to active button
                if (allTabsElements[i] === activeTabElement) {
                    allTabsElements[i].style.backgroundImage = "url(img/" + allTabsElements[i].id + "_active.png)";
                    allTabsElements[i].classList += " " + ACTIVE_TAB_CLASS;
                }

            }

        };

        /**
         * Add the once order products data to table
         * 
         * @param  {Array} productsArray array of products
         * @param  {Number} columns count of products
         */
        this.addContentToTable = function(productsArray, columns) {

            var containerForButtons = document.querySelector(".delete-row-container"),
                productsColumn = this.getProductColumnElement(),
                tbody = document.querySelector("tbody");

            //delete the used values from input, table and buttons
            containerForButtons.innerHTML = "";
            this.getProductSearchInput().value = "";
            productsColumn.innerHTML = "Product ";
            tbody.innerHTML = "";

            for (var i = 0; i < columns; i++) {
                //arrays of columns and suitable classes
                var arrayOfColumns = [
                        [productsArray[i]['name'], productsArray[i]['id']],
                        [productsArray[i]["price"], productsArray[i]["currency"]],
                        [productsArray[i]["quantity"]],
                        [productsArray[i]["totalPrice"], productsArray[i]["currency"]]
                    ],
                    arrayOfClasses = [
                        ["product", "id"],
                        ["price unit-price", "currency unit-price"],
                        ["quantity"],
                        ["price total", "currency total"],
                    ];

                //filling data to one row
                tbody.appendChild(this.getFilledRow(arrayOfColumns, arrayOfClasses, productsArray[i]['id']));
            }

            this.addItemsCount(productsArray.length, "name-table", "Line Items")
        };

        /**
         * Filling row order's products data
         * 
         * @param  {Array[]} arrayOfColumns array of row's values
         * @param  {Array[]} arrayOfClasses array of row's classes
         * @param {Number} id product's number
         * 
         */
        this.getFilledRow = function(arrayOfColumns, arrayOfClasses, id) {
            //set up  row element
            var row = document.createElement('tr');
            row.classList.add('products-columns');

            //create delete button
            var containerForDeleteButton = document.createElement('div');
            containerForDeleteButton.classList = "delete-button";
            //get delete button's container
            var containerForButtons = document.querySelector(".delete-row-container");

            for (var i = 0; i < arrayOfColumns.length; i++) {

                //create one row cell
                var cell = document.createElement('td');
                for (var j = 0; j < arrayOfColumns[i].length; j++) {

                    //Create and configure one product's element
                    var div = document.createElement('div');
                    div.classList += arrayOfClasses[i][j];
                    div.innerHTML = arrayOfColumns[i][j];

                    //add one product's element to cell
                    cell.appendChild(div);
                }

                //add one cell to row
                row.appendChild(cell);

                //add delete button
                containerForDeleteButton.innerHTML = "<button class = 'columns-delete' data-id=" + id + "></button>";
                containerForButtons.appendChild(containerForDeleteButton);
            }

            return row;
        };

        /**
         * Get rows array for sort
         * 
         * @return {Array[]} the array of table's rows
         * 
         */
        this.getRowsArrayForSort = function() {

            var table = this.getTableElement();
            //select ascending or descending
            count++;

            var tbody = table.querySelector('tbody');

            return [].slice.call(tbody.rows);

        };

        /**
         * Show sorted table
         * 
         * @param  {Array} sortedRowsArray sorted table's rows array
         * 
         */
        this.showSortedRows = function(sortedRowsArray) {
            var products = this.getProductColumnElement(),
                table = this.getTableElement(),
                tbody = table.querySelector('tbody');

            if (count % 2 === 0) {

                //add sort icon
                products.innerHTML = "Product <i class='fa fa-arrow-down' aria-hidden='true'></i>";

            } else {
                //add sort icon
                products.innerHTML = "Product <i class='fa fa-arrow-up' aria-hidden='true'></i>";
            }

            //Remove tbody
            table.removeChild(tbody);

            // add the result in the desired order to tbody
            for (var i = 0; i < sortedRowsArray.length; i++) {
                tbody.appendChild(sortedRowsArray[i]);
            }

            table.appendChild(tbody);

        };

        /**
         * Set Up Products Search
         */
        this.setUpProductsSearch = function() {

            var rowsArray = document.querySelectorAll(".products-columns"),
                deleteButtons = document.querySelectorAll(".delete-button");

            //input's value    
            var filter = this.getProductSearchInput().value.toLowerCase();

            //number of rows
            var count = rowsArray.length;

            //loop by rows
            for (var i = 0; i < rowsArray.length; i++) {

                //set to all row's display property "none"
                rowsArray[i].style.display = "none";
                deleteButtons[i].style.display = "none";
                var cellsArray = rowsArray[i].children;

                for (var j = 0; j < cellsArray.length; j++) {

                    //get array of products properties
                    var productsProperties = cellsArray[j].children;

                    for (var k = 0; k < productsProperties.length; k++) {
                        var productsValue = productsProperties[k].innerHTML;

                        //compare products property's value and input value
                        if (productsValue.toLowerCase().indexOf(filter) !== -1) {
                            rowsArray[i].style.display = "";
                            deleteButtons[i].style.display = "";
                        }

                    }
                }
                //change product count
                if (rowsArray[i].style.display === "none") {
                    count--;
                }
            }

            this.addItemsCount(count, "name-table", "Line Items")

        };

        /**
         * 
         * Set total price
         * 
         * @param  {Array[]} productsArray array of products data 
         */
        this.setTotalPrice = function(productsArray) {
            var count = 0;

            //consider the value of prices
            for (var i = 0; i < productsArray.length; i++) {
                count += Number(productsArray[i].totalPrice);
            }

            ///delete the used total price
            var cost = document.querySelector(".cost");
            for (var j = 0; j < cost.children.length; j++) {
                cost.children[j].innerHTML = "";
            }

            //add total price value to header
            cost.children[0].innerHTML += count;
            cost.children[1].innerHTML += "EUR";
        };

        /**
         * 
         * Click on orders click event handler.
         *
         * @param {Event} e the DOM event object.
         *
         * @private
         */
        this.changeContentForActiveOrder = function(e) {
            var activeOrder = document.querySelector("." + ORDER_ACTIVE_CONTAINER_CLASS); // selected order before click

            var target = e.target.parentElement, //what clicked
                targetClassList = target.classList, //target element's class list 
                parentClass = target.parentElement.classList; // target parent's  class list

            if (targetClassList.contains('one-order')) {
                activeOrder.classList.remove(ORDER_ACTIVE_CONTAINER_CLASS);
                target.classList.add(ORDER_ACTIVE_CONTAINER_CLASS);
            } else {
                if (parentClass.contains('one-order')) {
                    activeOrder.classList.remove(ORDER_ACTIVE_CONTAINER_CLASS);
                    target.parentElement.classList.add(ORDER_ACTIVE_CONTAINER_CLASS);
                }
            }
        };


        /**
         * Add new order by order
         * @return {Object} object of the once order's data 
         */
        this.addOrderByForm = function() {

            //object to insert data
            var objValues = {};

            //set properties for the object
            objValues.summary = {};
            objValues.shipTo = {};
            objValues.customerInfo = {};

            //get all form's inputs
            var inputs = document.querySelectorAll(".all-imput");


            for (var i = 0; i < inputs.length; i++) {

                for (var j = 0; j < inputs[i].children.length; j++) {

                    //get input's classes
                    var inputsClasses = inputs[i].children[j].classList;

                    // depending on the class, fill the object with data
                    if (inputsClasses.contains('summary')) {
                        var summaryDescr = inputs[i].children[j].getAttribute("data-summary");
                        objValues.summary[summaryDescr] = inputs[i].children[j].value;
                    }


                    if (inputsClasses.contains('shipTo')) {
                        var shipToDescr = inputs[i].children[j].getAttribute("data-shipto");
                        objValues.shipTo[shipToDescr] = inputs[i].children[j].value;
                    }

                    if (inputsClasses.contains('customerInfo')) {
                        var customerInfoDescr = inputs[i].children[j].getAttribute("data-customerinfo");
                        objValues.customerInfo[customerInfoDescr] = inputs[i].children[j].value;
                    }

                    inputs[i].children[j].value = " ";

                }

            }

            //close form
            var form = document.querySelector("#envelope");
            form.style.display = 'none';

            return objValues;

        };


        /**
         * Open add order form
         */
        this.openAddOrderForm = function() {
            document.querySelector("#envelope").style.display = 'block';
            var inputs = document.querySelectorAll(".all-imput");

            for (var i = 0; i < inputs.length; i++) {
                for (var j = 0; j < inputs[i].children.length; j++) {
                    inputs[i].children[j].value = " ";
                }
            }

        };


        /**
         * Add loading busy indicators
         * @param {String} loadElement download data
         */
        this.showLoading = function(loadElement) {
            var load = document.querySelectorAll(".loading");
            var tableContent = document.querySelector(".table-content");

            if (loadElement === "order") {
                load[0].style.display = "block";
                this.getContainerForOrders().style.opacity = "0.5";
            }
            if (loadElement === "product") {
                load[1].style.display = "block";
                tableContent.style.opacity = "0.5";
            }

        };


        /**
         * Delete loading busy indicators
         * @param {String} loadElement download data
         */
        this.hideLoading = function(loadElement) {
            var load = document.querySelectorAll(".loading");
            var tableContent = document.querySelector(".table-content");
            if (loadElement === "order") {
                load[0].style.display = "none";
                this.getContainerForOrders().style.opacity = "";
            }
            if (loadElement === "product") {
                load[1].style.display = "none";
                tableContent.style.opacity = "";
            }
        };
    }

    window.View = View;


})();