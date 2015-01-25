import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var that = this;
    this.store.find('deviceInstance', params.device_instance_id).then(function(device){
      return that.store.find('deviceEvent', {device_instance_id: device.get('id')});
    });
  },

  actions: {
    showEvents: function(session) {
      this.transitionTo('devcie-events.show', session);
    }
  }
});
