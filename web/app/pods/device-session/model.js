import DS from 'ember-data';

var DeviceSession = DS.Model.extend({
  start_at: DS.attr('date'),
  end_at: DS.attr('date'),
  events: DS.hasMany('deviceEvent')
});

DeviceSession.reopenClass({
  FIXTURES: [
  {
    id: 1,
    start_at: new Date(),
    end_at: new Date(),
    events: ["1", "2", "3", "4"]
  },
  {
    id: 2,
    start_at: new Date(),
    end_at: new Date(),
    events: ["5", "6"] 
  }
  ]
});

export default DeviceSession;
