// Generated by CoffeeScript 1.3.1
(function() {

  describe('backbone.toJSON', function() {
    var user;
    user = null;
    beforeEach(function() {
      return user = new Backbone.Model({
        firstName: 'Andreas',
        lastName: 'Gursky'
      });
    });
    describe('methods option', function() {
      beforeEach(function() {
        user.fullName = function(abbreviated) {
          var lastName;
          lastName = abbreviated ? this.attributes.lastName.substring(0, 1) : this.attributes.lastName;
          return "" + this.attributes.firstName + " " + lastName;
        };
        return user.initials = function() {
          return "" + (this.attributes.firstName.substring(0, 1)) + " " + (this.attributes.lastName.substring(0, 1));
        };
      });
      it("should include specified methods along with attributes", function() {
        var expected, userData;
        userData = user.toJSON({
          methods: ['fullName', 'initials']
        });
        expected = {
          firstName: 'Andreas',
          lastName: 'Gursky',
          fullName: 'Andreas Gursky',
          initials: 'A G'
        };
        return expect(userData).toEqual(expected);
      });
      it("should support passing plain string instead of array for single method", function() {
        var expected, userData;
        userData = user.toJSON({
          methods: 'initials'
        });
        expected = {
          firstName: 'Andreas',
          lastName: 'Gursky',
          initials: 'A G'
        };
        return expect(userData).toEqual(expected);
      });
      return it("should support passing an object where key is the method name and value is an argumnts array", function() {
        var expected, userData;
        userData = user.toJSON({
          methods: {
            fullName: [true]
          }
        });
        expected = {
          firstName: 'Andreas',
          lastName: 'Gursky',
          fullName: 'Andreas G'
        };
        return expect(userData).toEqual(expected);
      });
    });
    describe('namespace option', function() {
      it("should namespace json data by default if model has a name space property", function() {
        var expected, userData;
        user.namespace = 'user';
        userData = user.toJSON();
        expected = {
          user: {
            firstName: 'Andreas',
            lastName: 'Gursky'
          }
        };
        return expect(userData).toEqual(expected);
      });
      it("should allow for namespace to be a function returning a string", function() {
        var expected, userData;
        user.namespace = function() {
          return "user";
        };
        userData = user.toJSON();
        expected = {
          user: {
            firstName: 'Andreas',
            lastName: 'Gursky'
          }
        };
        return expect(userData).toEqual(expected);
      });
      it("should allow for overriding the namespace", function() {
        var expected, userData;
        user.namespace = "user";
        userData = user.toJSON({
          namespace: 'photographer'
        });
        expected = {
          photographer: {
            firstName: 'Andreas',
            lastName: 'Gursky'
          }
        };
        return expect(userData).toEqual(expected);
      });
      return it("should be possible to omit the namespace", function() {
        var expected, userData;
        user.namespace = 'user';
        userData = user.toJSON({
          namespace: false
        });
        expected = {
          firstName: 'Andreas',
          lastName: 'Gursky'
        };
        return expect(userData).toEqual(expected);
      });
    });
    return describe('transform option', function() {
      it("should transform keys from camelCase to underscore", function() {
        var expected, userData;
        userData = user.toJSON({
          transform: 'underscore'
        });
        expected = {
          first_name: 'Andreas',
          last_name: 'Gursky'
        };
        return expect(userData).toEqual(expected);
      });
      it("should transform keys from underscore to camelCase", function() {
        var expected, userData;
        user.clear();
        user.set({
          first_name: 'Andreas',
          last_name: 'Gursky'
        });
        userData = user.toJSON({
          transform: 'camelCase'
        });
        expected = {
          firstName: 'Andreas',
          lastName: 'Gursky'
        };
        return expect(userData).toEqual(expected);
      });
      return it("should transform keys by default if model has a toJSONKeysTransform value", function() {
        var expected, userData;
        user.toJSONKeysTransform = 'underscore';
        userData = user.toJSON();
        expected = {
          first_name: 'Andreas',
          last_name: 'Gursky'
        };
        return expect(userData).toEqual(expected);
      });
    });
  });

}).call(this);
