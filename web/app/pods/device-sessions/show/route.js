import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('deviceSession', params.device_session_id);
  }
});
