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
user.toJSON({ methods:['fullName', 'initials'] })
{ firstName:'Andreas', lastName:'Gursky', fullName: 'Andreas Gursky', initials: 'A G' } // result

// if only one method is needed you can also pass a string
user.toJSON({ methods:'fullName'] })
{ firstName:'Andreas', lastName:'Gursky', fullName: 'Andreas Gursky' } // result

// if you need to pass arguments to the method you can use an object
// the keys become the method name, and the value should be an array of
arguments
user.toJSON({ methods:{ fullName:[true] })
{ firstName:'Andreas', lastName:'Gursky', fullName: 'Andreas G' } // result
```

### options.namespace

need to finish writing documentation, see tests for examples

### options.transform

need to finish writing documentation, see tests for examples
