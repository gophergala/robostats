import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('device-class');
  },

  actions: {
    showDevices: function(klass) {
      this.transitionTo('device-classes.show', klass);
    },

    delete: function(klass) {
      klass.deleteRecord();
    }
  }
});
