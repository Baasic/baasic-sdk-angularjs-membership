/* globals module */
/**
 * @module baasicPasswordRecoveryRouteService 
 * @description Baasic Password Recovery Route Service provides Baasic route templates which can then be expanded to Baasic REST URI's through the [URI Template](https://github.com/Baasic/uritemplate-js) by providing it with an object that contains URI parameters. For example `baasicPasswordRecoveryService` uses `baasicPasswordRecoveryRouteService` to obtain a part of needed routes while the other part is obtained through HAL. Route services by convention use the same function names as their corresponding services.
 * @copyright (c) 2015 Mono-Software
 * @license MIT
 * @author Mono-Software
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicPasswordRecoveryRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
            return {
                 /**
                 * Parses recover-password route, recover-password route doesn't expose any additional properties.
                 * @method        
                 * @example baasicPasswordRecoveryRouteService.passwordRecovery.expand({});               
                 **/   			
                passwordRecovery: uriTemplateService.parse('recover-password'), 
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example baasicPasswordRecoveryRouteService.parse("route/{?embed,fields,options}").expand({embed: "<embedded-resource>"});
                 **/  				
                parse: uriTemplateService.parse
            };
        }]);
}(angular, module));