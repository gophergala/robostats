import DS from 'ember-data';

var DeviceEvent = DS.Model.extend({
  localTime: DS.attr('date'),
  altitude: DS.attr('number'),
  direction: DS.attr('number')
});

DeviceEvent.reopenClass({
  FIXTURES: [
  {
    id: 1,
    altitude: 33.3,
    direction: 10
  },
  {
    id: 2,
    altitude: 33.3,
    direction: 20
  },
  {
    id: 3,
    altitude: 12.5,
    direction: 30
  },
  {
    id: 4,
    altitude: 45,
    direction: 100
  },
  {
    id: 5,
    altitude: 122.4,
    direction: 2
  },
  {
    id: 6,
    altitude: 0,
    direction: -3
  },
  ]
});


export default DeviceEvent;
