import DS from 'ember-data';


var Device = DS.Model.extend({
  sessions: DS.hasMany('deviceSession', {async: true})
});

Device.reopenClass({
  FIXTURES: [
  {
    id: 1,
    sessions: ["1", "2"]
  },
  {
    id: 2,
    sessions: ["3"]
  },
  {
    id: 3,
    sessions: ["4", "5"]
  }
  ]
});

export default Device;
