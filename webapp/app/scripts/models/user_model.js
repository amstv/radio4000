/*global Ember*/
Webapp.User = DS.Model.extend({});

// probably should be mixed-in...
Webapp.User.reopen({
  attributes: function(){
    var model = this;
    return Ember.keys(this.get('data')).map(function(key){
      return Em.Object.create({ model: model, key: key, valueBinding: 'model.' + key });
    });
  }.property()
});

// delete below here if you do not want fixtures
Webapp.User.FIXTURES = [
  {
    id: 0,
  },
  {
    id: 1,
  }
];
