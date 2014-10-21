# Baasic AngularJS Core Client Library

The Baasic AngularJS core library provides integration access to the Baasic Service [REST API](https://api.baasic.com). Library will provide 

## Dependencies

Baasic AngularJS Core library has the following dependencies 

* [AngularJS](http://www.angularjs.org/)(>= 1.2.16)
* [HAL Parser](https://github.com/jasonaden/angular-hal)
* [URI Template](https://github.com/fxa/uritemplate-js)

## Usage

This section will describe how to add the Baasic AngularJS core library to your project. If you learn best by example please move forward to the [Demo Section](#demo)

### Add the Library to Your Project

It is recommended to server the library from the CDN (Content Delivery Network) but note that this isn't requred. Please add the following lines of code after loading the AngularJS. 

    <script src='//cdn.net/js/hal-parser.js'></script>
    <script src='//cdn.net/js/uritemplate-min.js'></script>
	<script src='//cdn.net/js/baasic-angular-1.0.0.min.js'></script>

### Initialize

To use the library you need to add the Baasic (_baasic.baasicApi_) dependency to your AngularJS module. This will allow you to use library services described in the [Modules Section](#baasic-modules).

	 angular.module('my-module', ["baasic.baasicApi"])		

### Application Configuration

Baasic AngularJS library allows you to use multiple Baasic applications in your AngularJS modules. To initialize Baasic application you need to add the following code to you module configuration.

		module.config(["baasicAppProvider",
			function (baasicAppProvider) {
				var app = baasicAppProvider.create("my-app-identifier", {
                    apiRootUrl: "api.baasic.com",
                    apiVersion: "v1"
                });
			}]);


**Note:** _To obtain Baasic Application Identifier please create your application on the [Baasic Registration](https://dashboard.baasic.com/register/) page._

## Baasic Modules

Baasic back-end has many built-in modules that can be used with Baasic AngularJS library. Below you can find detailed information about every core module supported by library. 

### Baasic Module Architecture

To get better understanding of Baasic AngularJS services here are the details about main architecture that all library services conform to. 

* Core Services
	* __baasicApp__ service is used to manage the Baasic application instances. There can be multiple AngularJS application instances communicating with difference Baasic applications. 

		*  create an application 

				module.controller("MyCtrl", ["baasicApp",
					function MyCtrl(baasicApp) {
						var app = baasicApp.create("my-app-identifier", {
		                    apiRootUrl: "api.baasic.com",
		                    apiVersion: "production"
	                	});
					}]);   

		* get default application 

				module.controller("MyCtrl", ["baasicApp",
					function MyCtrl(baasicApp) {
						var app = baasicApp.get();
					}]);   

    	* application object has the following methods

				var apiKey = app.get_apiKey();
				var apiURI = app.get_apiUrl();
				var accessToken = app.get_accessToken();
				app.update_accessToken(accessToken);
				var currentUser = app.get_user();
				app.set_user(userDetails, accessToken);
				var currentLanguage = app.get_currentLanguage();
				var defaultLanguage = app.get_defaultLanguage();
	    	
    
	* **baasicApiHttp**
	* **baasicApiService**
	* **baasicConstants**
* Route Services
	* every service has route service used to wrap REST service URL discovery 
	* route service will parse the REST service URL and prepare the URL for expansion 
	* route services contain following routes
		* _find_ - used to fetch collection of resources that can be filtered, sorted and paged
		* _get_ - used to fetch single resource
		* _create_ - used to create new resources
	* _find_ route has the following parameters
		* _searchQuery_ - used to build simple filters or complex queries
		* _page_ - used to define the current page
		* _rpp_ - used to define the number of resources per page
		* _sort_ - used to define sorting expression applied on the returned resources. Sorting expression has the following format _"fieldName|asc", "field1Name|asc,field2Name|desc"_
		* _embed_ - used to embed additional resources 
		* _fields_ - used to define the list of fields returned by the service  
	* _get_ route has the following parameters
		* _embed_ - used to embed additional resources 
		* _fields_ - used to define the list of fields returned by the service
	* _create_ route has the no parameters in most cases and it's used to create a new resource
	* _parse_ is an utility method used to parse custom URIs. _Note: parse will not return a route_	 

* Module Services
	* Baasic module services are built on top of the AngularJS services 
	* module services depend upon the route services as they are used for REST service URL discovery (Note: every service exposes route service with the _routeService_ property)
	* every service has the _find_, _get_, _create_, _update_ and _remove_ functions used to communicate with the Baasic back-end
	* all services accept the data object as function parameter 
* Options - Params
* HAL links
* Extending existing modules with dynamic props

### Application Settings 

### Membership

* Login Service
* Password Recovery Service
* Authorization Service
* User Service
* Role Service

### Key Value Module

### Value Set Module

### Dynamic Resources Module

### General Services, Directives etc.

* recaptchaService
* recaptchaDirective 

## Quick Start Guide

## Demo

## Build Process

1. Install [NodeJs](http://nodejs.org/download/)
2. Open Shell/Command Prompt in the Baasic AngularJS folder 
3. Run __npm install__
4. Install gulp globally: __npm install -g gulp__ 
5. Run __gulp__