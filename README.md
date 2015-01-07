# Baasic Membership AngularJS SDK

Baasic AngularJS Membership library provides access to membership resource Baasic Service [REST API](https://api.baasic.com).

## Dependencies

Baasic AngularJS Membership library has the following dependencies:

* [Baasic Core AngularJS SDK](https://github.com/Baasic/baasic-sdk-sdk-angularjs-core)

## Usage

This section will describe how to add the Baasic AngularJS Membership library to your project. If you prefer learning by example please skip to [Demo Section](#demo).

### Adding the Library to your Project

Please add the _Baasic Membership_ include after the _Baasic Angular Core_ include:

```html
<script src='//cdn.net/js/baasic-angular-1.0.0.min.js'></script>
<script src='//cdn.net/js/baasic-angular-membership-1.0.0.min.js'></script>
```

The recommended way of serving the library is through a [CDN](http://en.wikipedia.org/wiki/Content_delivery_network) but note that this is not a requirement. If you prefer adding library files directly to your project instead, please modify the includes accordingly.


### Initialization

To be able to use the library you will need to add the Baasic (_baasic.membership_) dependency to your AngularJS module. This will allow you to use library services described in [Modules Section](#baasic-modules).

```javascript
angular.module('my-module', ["baasic.api", "baasic.membership"])
```

## Membership Module

Baasic AngularJS Membership services and their functions can be found bellow. For further details please check the [API documentation](#tba)

##### userService

Baasic User Service provides an easy way to consume Baasic User features.

* `exists` - Checks if user exists in the application
* `get` - Gets user
* `find` - Finds users by given criteria
* `create` - Creates a new user
* `update` - Updates a user
* `remove` - Removes a user
* `lock` - Locks a user account
* `unlock` - Unlocks a user account
* `approve` - Approves user registration request ???
* `disapprove` - Disapproves user registration request ???
* `changePassword` - Changes users password
* `routeService` - Provides direct access to `userRouteService`

Here are a few examples on how to use the `userService`:

```javascript
var userName = "some_username";
baasicUserService.exists(userName)
    .success(function(data) {
        // data variable contains a boolean value (user exists / does not exist)
    });
```

```javascript
var options = { searchQuery: "myQuery", page: 4, rpp: 3 };
baasicUserService.find(options)
    .success(function(data) {
        // data variable contains a collection of user objects that match the filtering parameters
    });
```

##### registerService

Baasic Register Service provides an easy way to consume Baasic application registration features.

* `create` - ???
* `activate` - ???
* `routeService` - Provides direct access to `registerRouteService`

`registerService` is used in the same way as the `userService`.

##### loginService

Baasic Register Service provides an easy way to consume Baasic application registration features.

* `login` - Logs user into the application
* `logout` - Logs user out of the application
* `loadUserData` - ???
* `routeService` - Provides direct access to `loginRouteService`

`loginService` is used in the same way as the `userService`.

##### roleService

Baasic Role Service provides an easy way to consume Baasic application user role features.

* `get` - Gets a role object
* `find` - Finds role objects by given criteria ???
* `create` - Creates a role
* `update` - Updates a role
* `remove` - Removes a role
* `routeService` - Provides direct access to `roleRouteService`

`roleService` is used in the same way as the `userService`.

##### passwordRecoveryService

Baasic PasswordRecovery Service provides an easy way to consume Baasic application password recovery features.

* `requestReset` - Creates a password reset request
* `reset` - Resets a password
* `routeService` - Provides direct access to `passwordRecoveryRouteService`

`passwordRecoveryService` is used in the same way as the `userService`.

##### Route Services

Baasic Membership Route Services (`userRouteService`, `registerRouteService`, `loginRouteService`, `roleRouteService`, `passwordRecoveryRouteService`) provide Baasic route templates which can then be expanded to Baasic REST URI's through the [URI Template](https://github.com/Baasic/uritemplate-js) by providing it with an object that contains URI parameters. For example `userService` uses `userRouteService` to obtain a part of needed routes while the other part is obtained through HAL. Route services by convention use the same function names as their corresponding services.

* __userRouteService__
 * `exists`, `get`, `find`, `create`, `changePassword`
 * `parse` - Provides direct access to the `uriTemplateService`

* __registerRouteService__
 * `create`, `activate`

* __loginRouteService__
 * `login`
 * `parse` - Provides direct access to the `uriTemplateService`

* __roleRouteService__
 * `get`, `find`, `create`
 * `parse` - Provides direct access to the `uriTemplateService`

* __passwordRecoveryRouteService__
 * `passwordRecovery`
 * `parse` - Provides direct access to the `uriTemplateService`

URI templates can be expanded manually like this:

```javascript
var params = { searchQuery: "myQuery", page: 4, rpp: 3 };
var uri = baasicUserRouteService.find.expand(params);
// uri will yield "/users/?searchQuery=myQuery&page=4&rpp=3"
```

## Build Process

1. Install [NodeJs](http://nodejs.org/download/)
2. Open Shell/Command Prompt in the Baasic AngularJS folder
3. Run `npm install`
4. Install gulp globally: `npm install -g gulp`
5. Run `gulp`

## Contributing

* [Pull requests are always welcome](https://github.com/Baasic/baasic-sdk-sdk-angularjs-core#pull-requests-are-always-welcome)
* Please [report](https://github.com/Baasic/baasic-sdk-sdk-angularjs-core#issue-reporting) any issues you might  have found
* Help us write the documentation
* Create interesting apps using SDK
* Looking for something else to do? Get in touch..
