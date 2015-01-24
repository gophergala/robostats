import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('device-class', params.device_class_id);
  }
});
