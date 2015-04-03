﻿/* globals module */
/**
 * @module baasicPasswordRecoveryService
 * @description Baasic Password Recovery Service provides an easy way to consume Baasic application password recovery features. In order to obtain a needed routes `baasicPasswordRecoveryService` uses `baasicPasswordRecoveryRouteService`.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicPasswordRecoveryService', ['baasicApiHttp', 'baasicPasswordRecoveryRouteService',
        function (baasicApiHttp, passwordRecoveryRouteService) {
            return {
                /**
                * Provides direct access to `baasicPasswordRecoveryRouteService`.
                * @method        
                * @example baasicPasswordRecoveryService.routeService.get.expand(expandObject);
                **/             
                routeService: passwordRecoveryRouteService,
				/**
				* Returns a promise that is resolved once the password recovery requestReset action is completed. This action initiates the password recovery process for the user.
				* @method
				* @example
baasicPasswordRecoveryService.requestReset({
  challengeIdentifier : '<challenge-identifier>',
  challengeResponse : '<challenge-response>',
  recoverUrl : '<recover-url>',
  username : '<username>'
})
.success(function () {
  // perform success action here
})
.error(function (data) {
  // perform error handling here
})
.finally (function () {});				
				*/
                requestReset: function (data) {
                    return baasicApiHttp({
                        url: passwordRecoveryRouteService.passwordRecovery.expand({}),
                        method: 'POST',
                        data: data
                    });
                },
				/**
				* Returns a promise that is resolved once the password reset action is completed. This updates the user password selection.
				* @method
				* @example
baasicPasswordRecoveryService.reset({
  newPassword : '<new-password>',
  passwordRecoveryToken : '<password-recovery-token>'
})
.success(function () {
  // perform success action here
})
.error(function (data) {
  // perform error handling here
})
.finally (function () {});				
				*/				
                reset: function (data) {
                    return baasicApiHttp({
                        url: passwordRecoveryRouteService.passwordRecovery.expand({}),
                        method: 'PUT',
                        data: data
                    });
                }
            };
        }]);
}(angular, module));
/**
 * @copyright (c) 2015 Mono
 * @license MIT
 * @author Mono
 * @overview 
 ***Notes:**
 - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about Baasic REST API end-points.
 - All end-point objects are transformed by the associated route service.
*/