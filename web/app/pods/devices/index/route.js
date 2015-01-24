import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('device');
  },

  actions: {
    showSessions: function(device) {
      this.transitionTo('devices.show', device);
    }
  }
});
