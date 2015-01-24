import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('devices', function() {
    this.route('show', {path: ':device_id'});
  });

  this.resource('device-classes', function() {
    this.route('show', {path: ':device_class_id'});
    this.route("new");
  });

  this.resource('device-sessions', function(){
    this.route('show', {path: ':device_session_id'});
  });

  this.resource('device-events', function(){});

  this.route("users", function() {
    this.route("edit");
    this.route("signup", {path: "/signup"});
  });

  this.route("sessions", function() {
    this.route("login");
  });
  this.resource("devise-sessions", function() {});
});

export default Router;
