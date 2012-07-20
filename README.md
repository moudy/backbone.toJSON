# Backbone.toJSON(options)

A drop in replacement for Backbone Models' `toJSON` method providing a set of useful
options. If no options are passed it works the same as Backbone's native
`toJSON` method.

* * *

Consider this model for the following examples:

```javascript
var user = Backbone.Model.extend({ firstName:'Andreas', lastName:'Gursky' });

user.fullName = function(abbreviated) {
  var lastName;
  lastName = abbreviated ? this.attributes.lastName.substring(0, 1) : this.attributes.lastName;
  return "" + this.attributes.firstName + " " + lastName;
};

user.initials = function() {
  return "" + (this.attributes.firstName.substring(0, 1)) + " " + (this.attributes.lastName.substring(0, 1));
};

```

### options.methods

Pass a `String`, `Array`, or `Object` specifying the method(s) you want
to inlcude as part of the returned JSON object. This can be usefull when
a view's template needs a value that's not an attribute on the model.

```javascript
// when passed an array each item will be called on the model
user.toJSON({ methods:['fullName', 'initials'] });
{ firstName:'Andreas', lastName:'Gursky', fullName: 'Andreas Gursky', initials: 'A G' } // result

// if only one method is needed you can also pass a string
user.toJSON({ methods:'fullName'] });
{ firstName:'Andreas', lastName:'Gursky', fullName: 'Andreas Gursky' } // result

// if you need to pass arguments to the method you can use an object
// the keys become the method name, and the value should be an array of arguments
user.toJSON({ methods:{ fullName:[true] });
{ firstName:'Andreas', lastName:'Gursky', fullName: 'Andreas G' } // result
```

### options.namespace

Passing `{ namespace: 'photographer' }` will namespace the JSON
response

```javascript
user.toJSON({ namespace: 'photographer' });
{ photographer: { firstName:'Andreas', lastName:'Gursky' } } // result
```

Most of the time that I need to namespace a model's attributes is when saving to the server. But Backbone.sync doesn't provide a hook to modify the attribues before making an ajax request. I just calls `toJSON()` on the model. To get around that you can set a namespace property on the model which causes `toJSON()` (* note no options are passed) to return a namespaced set of attributes.

```javascript
user.namespace = 'photographer'
user.toJSON();
{ photographer: { firstName:'Andreas', lastName:'Gursky' } } // result

// to omit namespace pass in false
user.toJSON({ namespace:false });
{ firstName:'Andreas', lastName:'Gursky' } // result

// the namespace property can also be a function returning a string
user.namespace = function() {
  return 'photographer';
};
```

### options.transform

In Javascript the convention is to use camelCase when naming things. The
server-side language you're using might use underscores instead. Hence
the `transform` option.

```javascript
user.toJSON(transform:'underscore');
{ first_name:'Andreas', last_name:'Gursky' } // result

user = new Backbone.Model({ first_name:'Andreas', last_name:'Gursky' });
user.toJSON(transform:'camelCase');
{ firstName:'Andreas', lastName:'Gursky' } // result

// set property on model so transform happens by default
user.toJSONKeysTransform = 'underscore';
userData = user.toJSON();
{ first_name:'Andreas', last_name:'Gursky' } // result

```
