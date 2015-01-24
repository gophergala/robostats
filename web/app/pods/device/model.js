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
    id: 2
  },
  {
    id: 3
  },
  {
    id: 4
  },
  {
    id: 5
  },
  {
    id: 6
  },
  {
    id: 7
  }
  ]
});

export default Device;
