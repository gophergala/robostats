import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('deviceClass', params.device_class_id);
  },

  actions: {
    showSessions: function(device) {
      this.transitionTo('device-sessions.show', device);
    }
  }
});
