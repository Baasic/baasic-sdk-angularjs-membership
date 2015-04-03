/* globals module */
/**
 * @module baasicUserService
 * @description Baasic User Service provides an easy way to consume Baasic User features. In order to obtain a needed routes `baasicUserService` uses `baasicUserRouteService`.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicUserService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicUserRouteService',
        function (baasicApiHttp, baasicApiService, baasicConstants, userRouteService) {
            return {
                /**
                * Provides direct access to `baasicUserRouteService`.
                * @method        
                * @example baasicUserService.routeService.get.expand(expandObject);
                **/               
                routeService: userRouteService,
                 /**
                 * Returns a promise that is resolved once the exists action has been performed. This action checks if user exists in the application.
                 * @method        
                 * @example 
baasicUserService.exists('<username>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});  
                 **/ 					
                exists: function (username, options) {
                    return baasicApiHttp.get(userRouteService.exists.expand(baasicApiService.getParams(username, options, 'username')));
                },
                 /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of user resources matching the given criteria.
                 * @method        
                 * @example 
baasicUserService.find({
  pageNumber : 1,
  pageSize : 10,
  orderBy : '<username>',
  orderDirection : '<asc|desc>',
  search : '<search-phrase>'
})
.success(function (collection) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});    
                 **/  					
                find: function (data) {
                    return baasicApiHttp.get(userRouteService.find.expand(baasicApiService.findParams(data)));
                },
                 /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the sepecified user resource.
                 * @method        
                 * @example 
baasicUserService.get({
  username : '<username>',
  embed : '<embedded-resource>'
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                 **/ 					
                get: function (data) {
                    return baasicApiHttp.get(userRouteService.get.expand(baasicApiService.getParams(data, 'username')));
                },
                 /**
                 * Returns a promise that is resolved once the create user action has been performed, this action creates a new user.
                 * @method        
                 * @example 
baasicUserService.create({
  confirmPassword : '<password>',
  email : '<email>',
  password : '<password>',
  sendEmailNotification : true,
  username : '<username>',
  roles: ['<role-name>'],
  additionalProperty: '<additional-property>'  
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                 **/ 						
                create: function (data) {
                    return baasicApiHttp.post(userRouteService.create.expand({}), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                 /**
                 * Returns a promise that is resolved once the update user action has been performed, this action updates a user. This function doesn't use `baasicUserRouteService` for obtaining route templates, however `update` route can be obtained from user resource (HAL enabled) objects like this:
```
var params = baasicApiService.removeParams(user);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// Existing resource is a resource previously fetched using get action.
user.roles = ['<role-name>', '<new-role-name>'];
user.email = '<new-email>';
baasicUserService.update(user)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				**/				
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                 /**
                 * Returns a promise that is resolved once the remove user action has been performed. This action removes a user from the system if successfully completed. This function doesn't use `baasicUserRouteService` for obtaining route templates, however `remove` route can be obtained from user resource (HAL enabled) objects like this:
```
var params = baasicApiService.removeParams(user);
var uri = params['model'].links('delete').href;
```
                 * @method        
                 * @example 
// Existing resource is a resource previously fetched using get action.				 
baasicUserService.remove(user)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/					
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                },
                 /**
                 * Returns a promise that is resolved once the unlock user action has been performed. This action will unlock the user resource which was previously locked either manually or automatically by the system. This function doesn't use `baasicUserRouteService` for obtaining route templates, however `unlock` route can be obtained from user resource (HAL enabled) objects like this:
```
var params = baasicApiService.removeParams(user);
var uri = params['model'].links('unlock').href;
```
                 * @method        
                 * @example 
// Existing resource is a resource previously fetched using get action.				 
baasicUserService.unlock(user)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/						
                unlock: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('unlock').href);                    
                },
                 /**
                 * Returns a promise that is resolved once the lock user action has been performed. This action will lock the user resource out of the system. This function doesn't use `baasicUserRouteService` for obtaining route templates, however `lock` route can be obtained from user resource (HAL enabled) objects like this:
```
var params = baasicApiService.removeParams(user);
var uri = params['model'].links('lock').href;
```
                 * @method        
                 * @example 
// Existing resource is a resource previously fetched using get action.				 
baasicUserService.lock(user)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/					
                lock: function (data) {                
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('lock').href);                    
                },
                 /**
                 * Returns a promise that is resolved once the approve user action has been performed. This action will mark the user resource as 'approved' in the system. This function doesn't use `baasicUserRouteService` for obtaining route templates, however `approve` route can be obtained from user resource (HAL enabled) objects like this:
```
var params = baasicApiService.removeParams(user);
var uri = params['model'].links('approve').href;
```
                 * @method        
                 * @example 
// Existing resource is a resource previously fetched using get action.				 
baasicUserService.lock(user)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/					
                approve: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('approve').href);
                },
                 /**
                 * Returns a promise that is resolved once the disapprove user action has been performed. This action will mark the user resource as 'not approved' in the system. This function doesn't use `baasicUserRouteService` for obtaining route templates, however `disapprove` route can be obtained from user resource (HAL enabled) objects like this:
```
var params = baasicApiService.removeParams(user);
var uri = params['model'].links('disapprove').href;
```
                 * @method        
                 * @example 
// Existing resource is a resource previously fetched using get action.				 
baasicUserService.lock(user)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/					
                disapprove: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('disapprove').href);
                },
                 /**
                 * Returns a promise that is resolved once the changePassword action has been performed. This action will update the user's password selection.
                 * @method        
                 * @example 
baasicUserService.changePassword('<username>', {
  newPassword : '<new-password>',
  sendMailNotification : false
})
.success(function () {
  // perform success action here
})
.error(function (data, status, headers, config) {
  // perform error handling here
})
.finally (function () {});
				**/					
                changePassword: function (username, data) {
                    return baasicApiHttp({
                        url: userRouteService.changePassword.expand({ username: username }),
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