import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('device', params.device_id);
  },

  actions: {
    showEvents: function(session) {
      this.transitionTo('device-events.show', session);
    }
  }
});
