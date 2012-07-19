describe 'backbone.toJSON', ->
  user = null

  beforeEach ->
    user = new Backbone.Model(firstName:'Andreas', lastName:'Gursky')


  describe 'methods option', ->
    beforeEach ->
      user.fullName = (abbreviated) ->
        lastName = if abbreviated then @attributes.lastName.substring(0,1) else @attributes.lastName
        "#{@attributes.firstName} #{lastName}"

      user.initials = ->
        "#{@attributes.firstName.substring(0,1)} #{@attributes.lastName.substring(0,1)}"

    it "should include specified methods along with attributes", ->
      userData = user.toJSON(methods:['fullName', 'initials'])
      expected =
        firstName:'Andreas'
        lastName:'Gursky'
        fullName: 'Andreas Gursky'
        initials: 'A G'

      expect(userData).toEqual(expected)

    it "should support passing plain string instead of array for single method", ->
      userData = user.toJSON(methods:'initials')
      expected =
        firstName:'Andreas'
        lastName:'Gursky'
        initials: 'A G'

      expect(userData).toEqual(expected)

    it "should support passing an object where key is the method name and value is an argumnts array", ->
      userData = user.toJSON(methods: { fullName:[true] })
      expected =
        firstName:'Andreas'
        lastName:'Gursky'
        fullName: 'Andreas G'

      expect(userData).toEqual(expected)


  describe 'namespace option', ->
    it "should namespace json data by default if model has a name space property", ->
      user.namespace = 'user'
      userData = user.toJSON()
      expected = user: { firstName:'Andreas', lastName:'Gursky' }

      expect(userData).toEqual(expected)

    it "should allow for namespace to be a function returning a string", ->
      user.namespace = -> "user"
      userData = user.toJSON()
      expected = user: { firstName:'Andreas', lastName:'Gursky' }

      expect(userData).toEqual(expected)

    it "should be possible to omit the namespace", ->
      user.namespace = 'user'
      userData = user.toJSON(namespace:false)
      expected = firstName:'Andreas', lastName:'Gursky'

      expect(userData).toEqual(expected)


  describe 'transform option', ->
    it "should transform keys from camelCase to underscore", ->
      userData = user.toJSON(transform:'underscore')
      expected = first_name:'Andreas', last_name:'Gursky'

      expect(userData).toEqual(expected)

    it "should transform keys from underscore to camelCase", ->
      user.clear()
      user.set(first_name:'Andreas', last_name:'Gursky')
      userData = user.toJSON(transform:'camelCase')
      expected = firstName:'Andreas', lastName:'Gursky'

      expect(userData).toEqual(expected)

    it "should transform keys by default if model has a toJSONKeysTransform value", ->
      user.toJSONKeysTransform = 'underscore'
      userData = user.toJSON()
      expected = first_name:'Andreas', last_name:'Gursky'

      expect(userData).toEqual(expected)
