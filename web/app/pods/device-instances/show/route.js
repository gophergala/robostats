import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('deviceInstance', params.device_instance_id);
  },

  actions: {
    showEvents: function(session) {
      this.transitionTo('devcie-events.show', session);
    }
  }
});
