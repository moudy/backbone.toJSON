(function(_, Model){

  _.extend(Model.prototype, {

    toJSON: function(options) {
      options || (options = {});

      var _this = this,
          methods = options.methods,
          json = _.clone(this.attributes),
          namespace = options.namespace || _.result(this, 'namespace'),
          transform = options.transform || _.result(this, 'toJSONKeysTransform');

      if (methods) {
        if (_.isString(methods)) methods = [methods];

        _.each(methods, function (args, method, list) {
          // handle array being passed instead of object
          if ( _.isArray(list) ) {
            method = args;
            args = [];
          }

          json[method] = _this[method].apply(_this, args);
        });
      }

      if (transform && !(options.transform === false)) {
        var data = {};

        _.each(json, function (prop, key, list) {
          data[ _this["_" + transform](key) ] = prop;
        });

        json = data;
      }

      if (namespace && !(options.namespace === false)) {
        var result = {}
        result[namespace] = json;
        json = result;
      }

      return json;
    },

    _camelCase: function(s){
      return s.replace(/(\-|_|\s)+(.)?/g, function(match, separator, char) {
        return char ? char.toUpperCase() : '';
      });
    },

    _underscore: function(s){
      return s.replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
    }

  });

}).call(this, _, Backbone.Model);
