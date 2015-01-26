define("robostats/app",["exports","ember","ember/resolver","ember/load-initializers","./config/environment"],function(e,t,s,a,n){"use strict";t["default"].MODEL_FACTORY_INJECTIONS=!0;var i=t["default"].Application.extend({modulePrefix:n["default"].modulePrefix,podModulePrefix:n["default"].podModulePrefix,Resolver:s["default"]});a["default"](i,n["default"].modulePrefix),e["default"]=i}),define("robostats/helpers/format-date",["exports","ember"],function(e,t){"use strict";function s(e,t){var s=t.hash.format||"llll";return moment(e).format(s)}e.formatDate=s,e["default"]=t["default"].Handlebars.makeBoundHelper(s)}),define("robostats/initializers/authentication",["exports","ember","simple-auth/session","simple-auth-oauth2/authenticators/oauth2"],function(e,t,s,a){"use strict";function n(e){e.register("session:custom",i),e.register("authenticator:custom",o)}e.initialize=n;var i=s["default"].extend({user:function(){var e=this.get("userId");return t["default"].isEmpty(e)?void 0:this.container.lookup("store:main").find("user",e)}.property("userId")}),o=a["default"].extend({authenticate:function(e){return new t["default"].RSVP.Promise(function(s,a){t["default"].$.ajax({url:"/user/login",type:"POST",data:{grant_type:"password",email:e.identification,password:e.password}}).then(function(e){t["default"].run(function(){s({access_token:e.access_token,userId:e.user_id})})},function(e){t["default"].run(function(){a(e.responseText)})})})}});e["default"]={name:"authentication",before:"simple-auth",initialize:n}}),define("robostats/initializers/export-application-global",["exports","ember","../config/environment"],function(e,t,s){"use strict";function a(e,a){var n=t["default"].String.classify(s["default"].modulePrefix);s["default"].exportApplicationGlobal&&(window[n]=a)}e.initialize=a,e["default"]={name:"export-application-global",initialize:a}}),define("robostats/initializers/simple-auth-oauth2",["exports","simple-auth-oauth2/configuration","simple-auth-oauth2/authenticators/oauth2","simple-auth-oauth2/authorizers/oauth2","../config/environment"],function(e,t,s,a,n){"use strict";e["default"]={name:"simple-auth-oauth2",before:"simple-auth",initialize:function(e){t["default"].load(e,n["default"]["simple-auth-oauth2"]||{}),e.register("simple-auth-authorizer:oauth2-bearer",a["default"]),e.register("simple-auth-authenticator:oauth2-password-grant",s["default"])}}}),define("robostats/initializers/simple-auth",["exports","simple-auth/configuration","simple-auth/setup","../config/environment"],function(e,t,s,a){"use strict";e["default"]={name:"simple-auth",initialize:function(e,n){t["default"].load(e,a["default"]["simple-auth"]||{}),s["default"](e,n)}}}),define("robostats/pods/application/adapter",["exports","ember-data","ember"],function(e,t,s){"use strict";e["default"]=t["default"].ActiveModelAdapter.extend({ajaxError:function(e){var a=this._super(e);if(e&&422===e.status){var n=s["default"].$.parseJSON(e.responseText).errors;return new t["default"].InvalidError(n)}return a}})}),define("robostats/pods/application/route",["exports","ember","simple-auth/mixins/application-route-mixin"],function(e,t,s){"use strict";e["default"]=t["default"].Route.extend(s["default"],{actions:{error:function(e){var t=e.status;e&&t>=500&&599>t&&alert("Ha ocurrido un error. Por favor recarga la página e intenta de nuevo")}}})}),define("robostats/pods/application/serializer",["exports","ember-data"],function(e,t){"use strict";e["default"]=t["default"].RESTSerializer.extend({})}),define("robostats/pods/application/template",["exports"],function(e){"use strict";e["default"]=Ember.Handlebars.template({1:function(e,t,s,a){var n,i=t.helperMissing,o=this.escapeExpression,r="";return a.buffer.push(o((t.partial||e&&e.partial||i).call(e,"main_nav",{name:"partial",hash:{},hashTypes:{},hashContexts:{},types:["STRING"],contexts:[e],data:a}))),a.buffer.push('\n<div class="container">\n  <div class="row">\n    '),n=t._triageMustache.call(e,"outlet",{name:"_triageMustache",hash:{},hashTypes:{},hashContexts:{},types:["ID"],contexts:[e],data:a}),null!=n&&a.buffer.push(n),a.buffer.push("\n  </div>\n</div>\n"),r},3:function(e,t,s,a){var n,i="";return a.buffer.push('<div class="container">\n  '),n=t._triageMustache.call(e,"outlet",{name:"_triageMustache",hash:{},hashTypes:{},hashContexts:{},types:["ID"],contexts:[e],data:a}),null!=n&&a.buffer.push(n),a.buffer.push("\n</div>\n"),i},compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,s,a){var n,i="";return n=t["if"].call(e,"session.isAuthenticated",{name:"if",hash:{},hashTypes:{},hashContexts:{},fn:this.program(1,a),inverse:this.noop,types:["ID"],contexts:[e],data:a}),null!=n&&a.buffer.push(n),a.buffer.push("\n"),n=t.unless.call(e,"session.isAuthenticated",{name:"unless",hash:{},hashTypes:{},hashContexts:{},fn:this.program(3,a),inverse:this.noop,types:["ID"],contexts:[e],data:a}),null!=n&&a.buffer.push(n),a.buffer.push("\n\n"),i},useData:!0})}),define("robostats/pods/device-class/model",["exports","ember-data"],function(e,t){"use strict";var s=t["default"].Model.extend({name:t["default"].attr("string"),user:t["default"].belongsTo("user"),api_key:t["default"].attr("string"),devices:t["default"].hasMany("deviceInstance",{async:!0})});s.reopenClass({FIXTURES:[{id:1,name:"Drones",api_key:"abcd",devices:["1","2"]},{id:2,name:"Fridges",api_key:"abcde",devices:["3","4","5"]},{id:3,name:"Television",api_key:"abcdef",devices:["6","7"]}]}),e["default"]=s}),define("robostats/pods/device-classes/form/template",["exports"],function(e){"use strict";e["default"]=Ember.Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return""},useData:!0})}),define("robostats/pods/device-classes/index/route",["exports","ember","simple-auth/mixins/authenticated-route-mixin"],function(e,t,s){"use strict";e["default"]=t["default"].Route.extend(s["default"],{model:function(){return this.store.find("device-class")},actions:{showDevices:function(e){this.transitionTo("device-classes.show",e)},"delete":function(e){e.destroyRecord()}}})}),define("robostats/pods/device-classes/index/template",["exports"],function(e){"use strict";e["default"]=Ember.Handlebars.template({1:function(e,t,s,a){var n,i=this.escapeExpression,o="";return a.buffer.push("      <tr>\n        <td>"),n=t._triageMustache.call(e,"klass.id",{name:"_triageMustache",hash:{},hashTypes:{},hashContexts:{},types:["ID"],contexts:[e],data:a}),null!=n&&a.buffer.push(n),a.buffer.push("</td>\n        <td>"),n=t._triageMustache.call(e,"klass.name",{name:"_triageMustache",hash:{},hashTypes:{},hashContexts:{},types:["ID"],contexts:[e],data:a}),null!=n&&a.buffer.push(n),a.buffer.push("</td>\n        <td>"),n=t._triageMustache.call(e,"klass.api_key",{name:"_triageMustache",hash:{},hashTypes:{},hashContexts:{},types:["ID"],contexts:[e],data:a}),null!=n&&a.buffer.push(n),a.buffer.push('</td>\n        <td><a class="btn btn-danger pull-right" href="#" '),a.buffer.push(i(t.action.call(e,"delete","klass",{name:"action",hash:{},hashTypes:{},hashContexts:{},types:["STRING","ID"],contexts:[e,e],data:a}))),a.buffer.push(">Delete</a></td>\n      </tr>\n"),o},compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,s,a){var n,i="";return a.buffer.push('<div class="panel panel-default">\n<div class="panel-heading">\n  <h3 class="panel-title">Device classes</h3>\n</div>\n<div class="panel-body">\n  <table class="table  table-hover">\n    <thead>\n      <tr>\n        <th>Id</th>\n        <th>Name</th>\n        <th>Api Token</th>\n        <th></th>\n      </tr>\n      </thead>\n    <tbody>\n'),n=t.each.call(e,"klass","in","model",{name:"each",hash:{},hashTypes:{},hashContexts:{},fn:this.program(1,a),inverse:this.noop,types:["ID","ID","ID"],contexts:[e,e,e],data:a}),null!=n&&a.buffer.push(n),a.buffer.push("    </tbody>\n  </table>\n\n</div>\n\n</div>\n"),i},useData:!0})}),define("robostats/pods/device-classes/new/controller",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].ObjectController.extend({errorMessage:null})}),define("robostats/pods/device-classes/new/route",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Route.extend({model:function(){return this.store.createRecord("device-class")},deactivate:function(){var e=this.get("controller.model");e.get("isNew")&&(e.transitionTo("loaded.created.uncommitted"),e.destroyRecord())},setupController:function(e,t){e.set("errorMessage",null),e.set("model",t)},actions:{save:function(e){var s=this,a=t["default"].$("#device-class-form");a.valid()&&e.save().then(function(){s.transitionTo("device-classes")},function(e){s.set("controller.errorMessages",e.errors)})},cancel:function(){this.transitionTo("device-classes")}}})}),define("robostats/pods/device-classes/new/template",["exports"],function(e){"use strict";e["default"]=Ember.Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,s,a){var n=t.helperMissing,i=this.escapeExpression,o="";return a.buffer.push(i((t["link-to"]||e&&e["link-to"]||n).call(e,"Cancel","device-classes",{name:"link-to",hash:{"class":"btn btn-success"},hashTypes:{"class":"STRING"},hashContexts:{"class":e},types:["STRING","STRING"],contexts:[e,e],data:a}))),a.buffer.push('\n\n<form class="form-horizontal" id="device-class-form">\n<fieldset>\n  <div class="form-group">\n    <label class="col-lg-2 control-label">Name</label>\n\n    <div class="col-lg-10">\n      '),a.buffer.push(i((t.input||e&&e.input||n).call(e,{name:"input",hash:{placeholder:"Device class name",name:"name","class":"form-control",value:"name"},hashTypes:{placeholder:"STRING",name:"STRING","class":"STRING",value:"ID"},hashContexts:{placeholder:e,name:e,"class":e,value:e},types:[],contexts:[],data:a}))),a.buffer.push('\n      <span class="material-input"></span>\n    </div>\n  </div>\n\n  <div class="form-group">\n    <div class="col-lg-10 col-lg-offset-2">\n      <button type="reset" class="btn btn-default" '),a.buffer.push(i(t.action.call(e,"cancel","",{name:"action",hash:{},hashTypes:{},hashContexts:{},types:["STRING","ID"],contexts:[e,e],data:a}))),a.buffer.push('> Cancel</button>\n      <button type="submit" class="btn btn-primary" '),a.buffer.push(i(t.action.call(e,"save","",{name:"action",hash:{},hashTypes:{},hashContexts:{},types:["STRING","ID"],contexts:[e,e],data:a}))),a.buffer.push("> Save</button>\n    </div>\n  </div>\n</fieldset>\n</form>\n\n\n"),o},useData:!0})}),define("robostats/pods/device-classes/new/view",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].View.extend({didInsertElement:function(){}})}),define("robostats/pods/device-classes/route",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Route.extend({})}),define("robostats/pods/device-classes/show/route",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Route.extend({model:function(e){var t=this;return this.store.find("deviceClass",e.device_class_id).then(function(e){return t.store.find("deviceInstance",{device_class_id:e.get("id")})})},actions:{showSessions:function(e){this.transitionTo("device-sessions.show",e)}}})}),define("robostats/pods/device-classes/show/template",["exports"],function(e){"use strict";e["default"]=Ember.Handlebars.template({1:function(e,t,s,a){var n,i="";return a.buffer.push("        <tr>\n          <td>"),n=t._triageMustache.call(e,"device.id",{name:"_triageMustache",hash:{},hashTypes:{},hashContexts:{},types:["ID"],contexts:[e],data:a}),null!=n&&a.buffer.push(n),a.buffer.push("</td>\n        </tr>\n"),i},compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,s,a){var n,i=t.helperMissing,o=this.escapeExpression,r="";return a.buffer.push(o((t["link-to"]||e&&e["link-to"]||i).call(e,"Back","device-classes",{name:"link-to",hash:{"class":"btn btn-success"},hashTypes:{"class":"STRING"},hashContexts:{"class":e},types:["STRING","STRING"],contexts:[e,e],data:a}))),a.buffer.push('\n\n<div class="panel panel-default">\n  <div class="panel-heading">\n    <h3 class="panel-title">Devices for klass</h3>\n  </div>\n  <div class="panel-body">\n    <table class="table  table-hover">\n      <thead>\n        <tr></tr>\n        <th>ID</th>\n      </thead>\n      <tbody>\n'),n=t.each.call(e,"device","in","model",{name:"each",hash:{},hashTypes:{},hashContexts:{},fn:this.program(1,a),inverse:this.noop,types:["ID","ID","ID"],contexts:[e,e,e],data:a}),null!=n&&a.buffer.push(n),a.buffer.push("      </tbody>\n    </table>\n  </div>\n</div>\n"),r},useData:!0})}),define("robostats/pods/device-classes/template",["exports"],function(e){"use strict";e["default"]=Ember.Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,s,a){var n,i="";return n=t._triageMustache.call(e,"outlet",{name:"_triageMustache",hash:{},hashTypes:{},hashContexts:{},types:["ID"],contexts:[e],data:a}),null!=n&&a.buffer.push(n),a.buffer.push("\n"),i},useData:!0})}),define("robostats/pods/device-event/model",["exports","ember-data"],function(e,t){"use strict";var s=t["default"].Model.extend({local_time:t["default"].attr("number"),latlng:t["default"].attr(),created_at:t["default"].attr("date")});s.reopenClass({FIXTURES:[{id:1,altitude:33.3,direction:10},{id:2,altitude:33.3,direction:20},{id:3,altitude:12.5,direction:30},{id:4,altitude:45,direction:100},{id:5,altitude:122.4,direction:2},{id:6,altitude:0,direction:-3}]}),e["default"]=s}),define("robostats/pods/device-events/index/route",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Route.extend({model:function(){var e="http://api.dev.robostats.io/device_sessions/time_series?session_id=54c542d612fa74250100000f&key[]=cpu",s=this.get("session.content.access_token");return t["default"].$.ajax({type:"GET",dataType:"json",url:e,headers:{Authorization:"Bearer "+s}})}})}),define("robostats/pods/device-events/index/template",["exports"],function(e){"use strict";e["default"]=Ember.Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,s,a){a.buffer.push('<h2>Device events</h2>\n<div id="chart"></div>\n\n')},useData:!0})}),define("robostats/pods/device-events/index/view",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].View.extend({didInsertElement:function(){var e=this.get("controller.model.time_serie"),t=e.values.cpu;t.unshift("CPU");c3.generate({bindto:"#chart",data:{columns:[t]}})}})}),define("robostats/pods/device-events/route",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Route.extend({})}),define("robostats/pods/device-events/show/route",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Route.extend({model:function(){return this.soter.find("deviceEvent")}})}),define("robostats/pods/device-events/show/template",["exports"],function(e){"use strict";e["default"]=Ember.Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,s,a){var n,i="";return n=t._triageMustache.call(e,"outlet",{name:"_triageMustache",hash:{},hashTypes:{},hashContexts:{},types:["ID"],contexts:[e],data:a}),null!=n&&a.buffer.push(n),a.buffer.push("\n"),i},useData:!0})}),define("robostats/pods/device-events/template",["exports"],function(e){"use strict";e["default"]=Ember.Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,s,a){var n,i="";return n=t._triageMustache.call(e,"outlet",{name:"_triageMustache",hash:{},hashTypes:{},hashContexts:{},types:["ID"],contexts:[e],data:a}),null!=n&&a.buffer.push(n),a.buffer.push("\n"),i},useData:!0})}),define("robostats/pods/device-instance/model",["exports","ember-data"],function(e,t){"use strict";e["default"]=t["default"].Model.extend({user_id:t["default"].attr("string"),class_id:t["default"].attr("string"),created_at:t["default"].attr("date"),sessions:t["default"].hasMany("deviceSession",{async:!0})})}),define("robostats/pods/device-instances/index/route",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Route.extend({model:function(){return this.store.find("deviceInstance")},actions:{showSessions:function(e){this.transitionTo("device-instances.show",e)}}})}),define("robostats/pods/device-instances/index/template",["exports"],function(e){"use strict";e["default"]=Ember.Handlebars.template({1:function(e,t,s,a){var n,i="";return a.buffer.push('      <tr>\n        <td style="vertical-align:middle" >'),n=t._triageMustache.call(e,"device.id",{name:"_triageMustache",hash:{},hashTypes:{},hashContexts:{},types:["ID"],contexts:[e],data:a}),null!=n&&a.buffer.push(n),a.buffer.push("</td>\n      </tr>\n"),i},compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,s,a){var n,i="";return a.buffer.push('<div class="panel panel-default">\n<div class="panel-heading">\n  <h3 class="panel-title">Your devices</h3>\n</div>\n<div class="panel-body">\n  <table class="table  table-hover">\n    <thead>\n      <tr>\n        <th>ID</th>\n      </tr>\n      </thead>\n    <tbody>\n'),n=t.each.call(e,"device","in","model",{name:"each",hash:{},hashTypes:{},hashContexts:{},fn:this.program(1,a),inverse:this.noop,types:["ID","ID","ID"],contexts:[e,e,e],data:a}),null!=n&&a.buffer.push(n),a.buffer.push("    </tbody>\n  </table>\n\n</div>\n\n</div>\n\n\n"),i},useData:!0})}),define("robostats/pods/device-instances/route",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Route.extend({})}),define("robostats/pods/device-instances/show/route",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Route.extend({model:function(e){var t=this;this.store.find("deviceInstance",e.device_instance_id).then(function(e){return t.store.find("deviceEvent",{device_instance_id:e.get("id")})})},actions:{showSessions:function(e){this.transitionTo("devcie-sessions.show",e)}}})}),define("robostats/pods/device-instances/show/template",["exports"],function(e){"use strict";e["default"]=Ember.Handlebars.template({1:function(e,t,s,a){var n,i="";return a.buffer.push("      <tr>\n        <td>"),n=t._triageMustache.call(e,"session.id",{name:"_triageMustache",hash:{},hashTypes:{},hashContexts:{},types:["ID"],contexts:[e],data:a}),null!=n&&a.buffer.push(n),a.buffer.push("</td>\n        <td>"),n=t._triageMustache.call(e,"session.start_at",{name:"_triageMustache",hash:{},hashTypes:{},hashContexts:{},types:["ID"],contexts:[e],data:a}),null!=n&&a.buffer.push(n),a.buffer.push("</td>\n        <td>"),n=t._triageMustache.call(e,"session.end_at",{name:"_triageMustache",hash:{},hashTypes:{},hashContexts:{},types:["ID"],contexts:[e],data:a}),null!=n&&a.buffer.push(n),a.buffer.push("</td>\n      </tr>\n"),i},compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,s,a){var n,i=t.helperMissing,o=this.escapeExpression,r="";return a.buffer.push(o((t["link-to"]||e&&e["link-to"]||i).call(e,"Devices","device-instances",{name:"link-to",hash:{"class":"btn btn-success"},hashTypes:{"class":"STRING"},hashContexts:{"class":e},types:["STRING","STRING"],contexts:[e,e],data:a}))),a.buffer.push('\n\n<div class="panel panel-default">\n<div class="panel-heading">\n  <h3 class="panel-title">Sessions for device</h3>\n</div>\n<div class="panel-body">\n  <table class="table  table-hover">\n    <thead>\n      <tr>\n        <th>Id</th>\n        <th>Start at</th>\n        <th>End at</th>\n      </tr>\n      </thead>\n    <tbody>\n'),n=t.each.call(e,"session","in","model.sessions",{name:"each",hash:{},hashTypes:{},hashContexts:{},fn:this.program(1,a),inverse:this.noop,types:["ID","ID","ID"],contexts:[e,e,e],data:a}),null!=n&&a.buffer.push(n),a.buffer.push("    </tbody>\n  </table>\n\n</div>\n</div>\n"),r},useData:!0})}),define("robostats/pods/device-instances/template",["exports"],function(e){"use strict";e["default"]=Ember.Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,s,a){var n,i="";return n=t._triageMustache.call(e,"outlet",{name:"_triageMustache",hash:{},hashTypes:{},hashContexts:{},types:["ID"],contexts:[e],data:a}),null!=n&&a.buffer.push(n),a.buffer.push("\n"),i},useData:!0})}),define("robostats/pods/device-session/model",["exports","ember-data"],function(e,t){"use strict";var s=t["default"].Model.extend({class_id:t["default"].attr("string"),created_at:t["default"].attr("date"),start_time:t["default"].attr("date"),end_time:t["default"].attr("date"),user_id:t["default"].attr("string"),session_key:t["default"].attr("string"),instance_id:t["default"].attr("string"),events:t["default"].hasMany("deviceEvent",{async:!0})});s.reopenClass({FIXTURES:[{id:1,start_at:new Date,end_at:new Date,events:["1","2","3","4"]},{id:2,start_at:new Date,end_at:new Date,events:["5","6"]}]}),e["default"]=s}),define("robostats/pods/device-sessions/index/route",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Route.extend({model:function(){return this.store.find("deviceSession")},actions:{showEvents:function(e){this.transitionTo("device-sessions.show",e)}}})}),define("robostats/pods/device-sessions/index/template",["exports"],function(e){"use strict";e["default"]=Ember.Handlebars.template({1:function(e,t,s,a){var n,i=this.escapeExpression,o=t.helperMissing,r="";return a.buffer.push("      <tr "),a.buffer.push(i(t.action.call(e,"showEvents","session",{name:"action",hash:{},hashTypes:{},hashContexts:{},types:["STRING","ID"],contexts:[e,e],data:a}))),a.buffer.push(' style="cursor:pointer">\n        <td>'),n=t._triageMustache.call(e,"session.id",{name:"_triageMustache",hash:{},hashTypes:{},hashContexts:{},types:["ID"],contexts:[e],data:a}),null!=n&&a.buffer.push(n),a.buffer.push("</td>\n        <td>"),a.buffer.push(i((t["format-date"]||e&&e["format-date"]||o).call(e,"session.start_time",{name:"format-date",hash:{},hashTypes:{},hashContexts:{},types:["ID"],contexts:[e],data:a}))),a.buffer.push("</td>\n        <td>"),a.buffer.push(i((t["format-date"]||e&&e["format-date"]||o).call(e,"session.end_time",{name:"format-date",hash:{},hashTypes:{},hashContexts:{},types:["ID"],contexts:[e],data:a}))),a.buffer.push("</td>\n      </tr>\n"),r},compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,s,a){var n,i="";return a.buffer.push('<div class="panel panel-default">\n<div class="panel-heading">\n  <h3 class="panel-title">Device sessions</h3>\n</div>\n<div class="panel-body">\n  <table class="table  table-hover">\n    <thead>\n      <tr>\n        <th>Id</th>\n        <th>Start time</th>\n        <th>End time</th>\n      </tr>\n      </thead>\n    <tbody>\n'),n=t.each.call(e,"session","in","model",{name:"each",hash:{},hashTypes:{},hashContexts:{},fn:this.program(1,a),inverse:this.noop,types:["ID","ID","ID"],contexts:[e,e,e],data:a}),null!=n&&a.buffer.push(n),a.buffer.push("    </tbody>\n  </table>\n\n</div>\n\n</div>\n"),i},useData:!0})}),define("robostats/pods/device-sessions/route",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Route.extend({})}),define("robostats/pods/device-sessions/show/route",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Route.extend({model:function(e){return this.promise(e.device_session_id)},setupController:function(e,t){e.set("model",t),t.time_serie||window.location.reload()},promise:function(e){var s="http://api.dev.robostats.io/device_sessions/time_series?session_id="+e+"&key[]=cpu",a=this.get("session.content.access_token");return t["default"].$.ajax({type:"GET",dataType:"json",url:s,headers:{Authorization:"Bearer "+a}})}})}),define("robostats/pods/device-sessions/show/template",["exports"],function(e){"use strict";e["default"]=Ember.Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,s,a){a.buffer.push('<div id="chart"></div>\n')},useData:!0})}),define("robostats/pods/device-sessions/show/view",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].View.extend({didInsertElement:function(){var e=this.get("controller.model.time_serie"),t=e.values.cpu;t.unshift("CPU");c3.generate({bindto:"#chart",data:{columns:[t]}})}})}),define("robostats/pods/device-sessions/template",["exports"],function(e){"use strict";e["default"]=Ember.Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,s,a){var n,i="";return n=t._triageMustache.call(e,"outlet",{name:"_triageMustache",hash:{},hashTypes:{},hashContexts:{},types:["ID"],contexts:[e],data:a}),null!=n&&a.buffer.push(n),a.buffer.push("\n"),i},useData:!0})}),define("robostats/pods/index/route",["exports","ember","simple-auth/mixins/unauthenticated-route-mixin"],function(e,t,s){"use strict";e["default"]=t["default"].Route.extend(s["default"],{})}),define("robostats/pods/index/template",["exports"],function(e){"use strict";e["default"]=Ember.Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,s,a){var n=t.helperMissing,i=this.escapeExpression,o="";return a.buffer.push('<div class="jumbotron">\n    <h1>Robostats</h1>\n    <p>Mind your drones</p>\n    <p>\n    '),a.buffer.push(i((t["link-to"]||e&&e["link-to"]||n).call(e,"Login","sessions.login",{name:"link-to",hash:{"class":"btn btn-success btn-lg"},hashTypes:{"class":"STRING"},hashContexts:{"class":e},types:["STRING","STRING"],contexts:[e,e],data:a}))),a.buffer.push("\n    "),a.buffer.push(i((t["link-to"]||e&&e["link-to"]||n).call(e,"Signup","users.signup",{name:"link-to",hash:{"class":"btn btn-success btn-lg"},hashTypes:{"class":"STRING"},hashContexts:{"class":e},types:["STRING","STRING"],contexts:[e,e],data:a}))),a.buffer.push("\n    </p>\n\n</div>\n"),o},useData:!0})}),define("robostats/pods/loading/template",["exports"],function(e){"use strict";e["default"]=Ember.Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,s,a){a.buffer.push("<p>loading...</p>\n")},useData:!0})}),define("robostats/pods/main-nav/template",["exports"],function(e){"use strict";e["default"]=Ember.Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,s,a){var n,i=t.helperMissing,o=this.escapeExpression,r="";return a.buffer.push('<div class="navbar navbar-fixed-top navbar-inverse">\n<div class="container">\n  <div class="navbar-header">\n    <button type="button" class="navbar-toggle" data-toggle="collapse"\n                                                data-target=".navbar-responsive-collapse">\n      <span class="icon-bar"></span>\n      <span class="icon-bar"></span>\n      <span class="icon-bar"></span>\n    </button>\n    '),a.buffer.push(o((t["link-to"]||e&&e["link-to"]||i).call(e,"Robostats","index",{name:"link-to",hash:{"class":"navbar-brand"},hashTypes:{"class":"STRING"},hashContexts:{"class":e},types:["STRING","STRING"],contexts:[e,e],data:a}))),a.buffer.push('\n  </div>\n\n  <div class="navbar-collapse collapse navbar-responsive-collapse">\n    <ul class="nav navbar-nav">\n      <li>\n        '),a.buffer.push(o((t["link-to"]||e&&e["link-to"]||i).call(e,"Device classes","device-classes",{name:"link-to",hash:{},hashTypes:{},hashContexts:{},types:["STRING","STRING"],contexts:[e,e],data:a}))),a.buffer.push("\n      </li>\n      <li>\n        "),a.buffer.push(o((t["link-to"]||e&&e["link-to"]||i).call(e,"Devices","device-instances",{name:"link-to",hash:{},hashTypes:{},hashContexts:{},types:["STRING","STRING"],contexts:[e,e],data:a}))),a.buffer.push("\n      </li>\n      <li>\n        "),a.buffer.push(o((t["link-to"]||e&&e["link-to"]||i).call(e,"Sessions","device-sessions",{name:"link-to",hash:{},hashTypes:{},hashContexts:{},types:["STRING","STRING"],contexts:[e,e],data:a}))),a.buffer.push("\n      </li>\n      <li>\n        "),a.buffer.push(o((t["link-to"]||e&&e["link-to"]||i).call(e,"Events","device-events",{name:"link-to",hash:{},hashTypes:{},hashContexts:{},types:["STRING","STRING"],contexts:[e,e],data:a}))),a.buffer.push('\n      </li>\n\n    </ul>\n    <ul class="nav navbar-nav navbar-right">\n      <li class="dropdown">\n        <a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown">\n          '),n=t._triageMustache.call(e,"session.user.email",{name:"_triageMustache",hash:{},hashTypes:{},hashContexts:{},types:["ID"],contexts:[e],data:a}),null!=n&&a.buffer.push(n),a.buffer.push(' <b class="caret"></b>\n        </a>\n        <ul class="dropdown-menu">\n          <li><a '),a.buffer.push(o(t.action.call(e,"invalidateSession",{name:"action",hash:{},hashTypes:{},hashContexts:{},types:["STRING"],contexts:[e],data:a}))),a.buffer.push(' href="#" >Terminar sesión</a></li>\n        </ul>\n      </li>\n    </ul>\n  </div>\n</div>\n<div id="source-button" class="btn btn-primary btn-xs withripple" style="display: none;">&lt; &gt;\n  <div class="ripple-wrapper"></div>\n</div>\n</div>\n\n'),r},useData:!0})}),define("robostats/pods/sessions/login/controller",["exports","ember","simple-auth/mixins/login-controller-mixin"],function(e,t,s){"use strict";e["default"]=t["default"].Controller.extend(s["default"],{authenticator:"authenticator:custom",actions:{authenticate:function(){var e=this;e._super().then(null,function(){e.set("errorMessage","Incorrect username or password")})}}})}),define("robostats/pods/sessions/login/route",["exports","ember","simple-auth/mixins/unauthenticated-route-mixin"],function(e,t,s){"use strict";e["default"]=t["default"].Route.extend(s["default"],{setupController:function(e){e.set("errorMessage",null)}})}),define("robostats/pods/sessions/login/template",["exports"],function(e){"use strict";e["default"]=Ember.Handlebars.template({1:function(e,t,s,a){a.buffer.push('        <div class="alert alert-danger">\n          <p>Incorrect username or password</p>\n        </div>\n')},compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,s,a){var n,i=this.escapeExpression,o=t.helperMissing,r="";return a.buffer.push('<div class="row">\n<div class="col-lg-8 col-lg-offset-2 text-center">\n  <div class="page-header">\n    <p class="lead">Robostats. Mind your drones.</p>\n  </div>\n</div>\n</div>\n\n<div class="row">\n  <div class="col-lg-6 col-lg-offset-3">\n    <div class="panel panel-default">\n      <div class="panel-body">\n'),n=t["if"].call(e,"errorMessage",{name:"if",hash:{},hashTypes:{},hashContexts:{},fn:this.program(1,a),inverse:this.noop,types:["ID"],contexts:[e],data:a}),null!=n&&a.buffer.push(n),a.buffer.push("        <form "),a.buffer.push(i(t.action.call(e,"authenticate",{name:"action",hash:{on:"submit"},hashTypes:{on:"STRING"},hashContexts:{on:e},types:["STRING"],contexts:[e],data:a}))),a.buffer.push(' class="form-horizontal" id="vendor-signup-form">\n          <fieldset>\n            <legend>Email</legend>\n\n            <div class="form-group">\n              <label for="identification" class="col-lg-2 control-label">Email</label>\n\n              <div class="col-lg-10">\n                <div class="form-control-wrapper">\n                  '),a.buffer.push(i((t.input||e&&e.input||o).call(e,{name:"input",hash:{"class":"form-control empty",placeholder:"Email",value:"identification",type:"email"},hashTypes:{"class":"STRING",placeholder:"STRING",value:"ID",type:"STRING"},hashContexts:{"class":e,placeholder:e,value:e,type:e},types:[],contexts:[],data:a}))),a.buffer.push('\n                  <span class="material-input"></span>\n                </div>\n              </div>\n            </div>\n\n            <div class="form-group">\n              <label for="identification" class="col-lg-2 control-label">Password</label>\n\n              <div class="col-lg-10">\n                <div class="form-control-wrapper">\n                  '),a.buffer.push(i((t.input||e&&e.input||o).call(e,{name:"input",hash:{type:"password","class":"form-control empty",placeholder:"Password",value:"password"},hashTypes:{type:"STRING","class":"STRING",placeholder:"STRING",value:"ID"},hashContexts:{type:e,"class":e,placeholder:e,value:e},types:[],contexts:[],data:a}))),a.buffer.push('\n                  <span class="material-input"></span>\n                </div>\n              </div>\n            </div>\n\n            <div class="form-group">\n              <div class="col-lg-10 col-lg-offset-2">\n                <button type="submit" class="btn btn-success">Log in</button>\n              </div>\n            </div>\n\n          </fieldset>\n        </form>\n      </div>\n    </div>\n    <div class="signup-button text-center">\n      '),a.buffer.push(i((t["link-to"]||e&&e["link-to"]||o).call(e,"Create an account","users.signup",{name:"link-to",hash:{"class":"btn btn-success"},hashTypes:{"class":"STRING"},hashContexts:{"class":e},types:["STRING","STRING"],contexts:[e,e],data:a}))),a.buffer.push("\n    </div>\n  </div>\n</div>\n\n"),r
},useData:!0})}),define("robostats/pods/user/model",["exports","ember-data"],function(e,t){"use strict";e["default"]=t["default"].Model.extend({email:t["default"].attr("string")})}),define("robostats/pods/users/edit/route",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Route.extend({})}),define("robostats/pods/users/edit/template",["exports"],function(e){"use strict";e["default"]=Ember.Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,s,a){var n,i="";return n=t._triageMustache.call(e,"outlet",{name:"_triageMustache",hash:{},hashTypes:{},hashContexts:{},types:["ID"],contexts:[e],data:a}),null!=n&&a.buffer.push(n),a.buffer.push("\n"),i},useData:!0})}),define("robostats/pods/users/form/template",["exports"],function(e){"use strict";e["default"]=Ember.Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(){return""},useData:!0})}),define("robostats/pods/users/signup/route",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].Route.extend({model:function(){return this.store.createRecord("user")},deactivate:function(){var e=this.get("controller.model");e.get("isNew")&&(e.transitionTo("loaded.created.uncommited"),e.deleteRecord())},setupController:function(e,t){e.set("model",t),e.set("errorMessages",null)},actions:{save:function(){var e=this.get("controller.model"),s=t["default"].$("#user-signup-form");s.valid()&&e.save().then(function(){console.log("user was saved")},function(){console.log("errored out")})},goHome:function(){this.transitionTo("index")}}})}),define("robostats/pods/users/signup/template",["exports"],function(e){"use strict";e["default"]=Ember.Handlebars.template({compiler:[6,">= 2.0.0-beta.1"],main:function(e,t,s,a){var n,i=this.escapeExpression,o=t.helperMissing,r="";return a.buffer.push('<div class="row">\n  <div class="col-lg-8 col-lg-offset-2 text-center">\n    <div class="page-header">\n      <p class="lead">Robostats. Mind your drones.</p>\n    </div>\n  </div>\n</div>\n\n<div class="row">\n  <div class="col-lg-6 col-lg-offset-3">\n    <div class="panel panel-default">\n      <div class="panel-body">\n        <form '),a.buffer.push(i(t.action.call(e,"save",{name:"action",hash:{on:"submit"},hashTypes:{on:"STRING"},hashContexts:{on:e},types:["STRING"],contexts:[e],data:a}))),a.buffer.push(' id="user-signup-form" class="form-horizontal">\n          <fieldset>\n            <legend>Signup</legend>\n            <div class="form-group">\n              <label for="inputEmail" class="col-lg-3 control-label">Email</label>\n\n              <div class="col-lg-9">\n                <div class="form-control-wrapper">\n                    '),a.buffer.push(i((t.input||e&&e.input||o).call(e,{name:"input",hash:{"class":"form-control empty",name:"email",value:"email",type:"email"},hashTypes:{"class":"STRING",name:"STRING",value:"ID",type:"STRING"},hashContexts:{"class":e,name:e,value:e,type:e},types:[],contexts:[],data:a}))),a.buffer.push('\n                  <span class="material-input"></span></div>\n                <p class="help-block error-message">'),n=t._triageMustache.call(e,"errorMessages.Email",{name:"_triageMustache",hash:{},hashTypes:{},hashContexts:{},types:["ID"],contexts:[e],data:a}),null!=n&&a.buffer.push(n),a.buffer.push('</p>\n              </div>\n            </div>\n\n            <div class="form-group">\n              <label for="inputPassword" class="col-lg-3 control-label">Password</label>\n\n              <div class="col-lg-9">\n                <div class="form-control-wrapper">\n                    '),a.buffer.push(i((t.input||e&&e.input||o).call(e,{name:"input",hash:{id:"password","class":"form-control empty",placeholder:"Password",value:"password",name:"password",type:"password"},hashTypes:{id:"STRING","class":"STRING",placeholder:"STRING",value:"ID",name:"STRING",type:"STRING"},hashContexts:{id:e,"class":e,placeholder:e,value:e,name:e,type:e},types:[],contexts:[],data:a}))),a.buffer.push('\n                  <span class="material-input"></span></div>\n                <p class="help-block error-message">'),n=t._triageMustache.call(e,"errorMessages.Contrasena",{name:"_triageMustache",hash:{},hashTypes:{},hashContexts:{},types:["ID"],contexts:[e],data:a}),null!=n&&a.buffer.push(n),a.buffer.push('</p>\n              </div>\n            </div>\n\n            <div class="form-group">\n              <label class="col-lg-3 control-label">Confirm password</label>\n\n              <div class="col-lg-9">\n                <div class="form-control-wrapper">\n                    '),a.buffer.push(i((t.input||e&&e.input||o).call(e,{name:"input",hash:{"class":"form-control empty",placeholder:"Confirm your password",value:"passwordConfirmation",name:"passwordConfirmation",type:"password"},hashTypes:{"class":"STRING",placeholder:"STRING",value:"ID",name:"STRING",type:"STRING"},hashContexts:{"class":e,placeholder:e,value:e,name:e,type:e},types:[],contexts:[],data:a}))),a.buffer.push('\n                  <span class="material-input"></span></div>\n              </div>\n            </div>\n\n            <div class="form-group">\n              <div class="col-lg-10 col-lg-offset-1">\n                <button type="submit" class="btn btn-success">Create my account</button>\n              </div>\n            </div>\n          </fieldset>\n        </form>\n      </div>\n    </div>\n  </div>\n</div>\n\n'),r},useData:!0})}),define("robostats/pods/users/signup/view",["exports","ember"],function(e,t){"use strict";e["default"]=t["default"].View.extend({willDestroyElement:function(){t["default"].$("body").removeClass("login")},didInsertElement:function(){t["default"].$("body").addClass("login")}})}),define("robostats/router",["exports","ember","./config/environment"],function(e,t,s){"use strict";var a=t["default"].Router.extend({location:s["default"].locationType});a.map(function(){this.resource("device-classes",function(){this.route("show",{path:":device_class_id"}),this.route("new")}),this.resource("device-sessions",function(){this.route("show",{path:":device_session_id"})}),this.resource("device-events",function(){this.route("show",{path:":device_event_id"})}),this.resource("users",function(){this.route("edit"),this.route("signup")}),this.route("sessions",function(){this.route("login")}),this.resource("device-instances",function(){this.route("show",{path:":device_instance_id"})}),this.resource("devise-sessions",function(){})}),e["default"]=a}),define("robostats/config/environment",["ember"],function(e){var t="robostats";try{var s=t+"/config/environment",a=e["default"].$('meta[name="'+s+'"]').attr("content"),n=JSON.parse(unescape(a));return{"default":n}}catch(i){throw new Error('Could not read config from meta tag with name "'+s+'".')}}),runningTests?require("robostats/tests/test-helper"):require("robostats/app")["default"].create({});