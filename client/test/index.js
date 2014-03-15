(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var _        = require('underscore');
var Backbone = require('backbone');

var Participant = Backbone.Model.extend({
  urlRoot: '/api/participant',
  defaults: function() {
    return {
      'age': 0,
      'country': '',
      'userAgent': window.navigator.userAgent
    };
  }
});

module.exports = Participant;

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../app/models/Participant.js","/../../app/models")
},{"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"backbone":2,"buffer":36,"underscore":3}],2:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
//     Backbone.js 1.1.2

//     (c) 2010-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(root, factory) {

  // Set up Backbone appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', 'exports'], function(_, $, exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Backbone.
      root.Backbone = factory(root, exports, _, $);
    });

  // Next for Node.js or CommonJS. jQuery may not be needed as a module.
  } else if (typeof exports !== 'undefined') {
    var _ = require('underscore');
    factory(root, exports, _);

  // Finally, as a browser global.
  } else {
    root.Backbone = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$));
  }

}(this, function(root, Backbone, _, $) {

  // Initial Setup
  // -------------

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create local references to array methods we'll want to use later.
  var array = [];
  var push = array.push;
  var slice = array.slice;
  var splice = array.splice;

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '1.1.2';

  // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
  // the `$` variable.
  Backbone.$ = $;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // ---------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {

    // Bind an event to a `callback` function. Passing `"all"` will bind
    // the callback to all events fired.
    on: function(name, callback, context) {
      if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
      this._events || (this._events = {});
      var events = this._events[name] || (this._events[name] = []);
      events.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      return this.on(name, once, context);
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var retain, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = void 0;
        return this;
      }
      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (events = this._events[name]) {
          this._events[name] = retain = [];
          if (callback || context) {
            for (j = 0, k = events.length; j < k; j++) {
              ev = events[j];
              if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                  (context && context !== ev.context)) {
                retain.push(ev);
              }
            }
          }
          if (!retain.length) delete this._events[name];
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
      var listeningTo = this._listeningTo;
      if (!listeningTo) return this;
      var remove = !name && !callback;
      if (!callback && typeof name === 'object') callback = this;
      if (obj) (listeningTo = {})[obj._listenId] = obj;
      for (var id in listeningTo) {
        obj = listeningTo[id];
        obj.off(name, callback, this);
        if (remove || _.isEmpty(obj._events)) delete this._listeningTo[id];
      }
      return this;
    }

  };

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;

    // Handle event maps.
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
      return false;
    }

    // Handle space separated event names.
    if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
      return false;
    }

    return true;
  };

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
    }
  };

  var listenMethods = {listenTo: 'on', listenToOnce: 'once'};

  // Inversion-of-control versions of `on` and `once`. Tell *this* object to
  // listen to an event in another object ... keeping track of what it's
  // listening to.
  _.each(listenMethods, function(implementation, method) {
    Events[method] = function(obj, name, callback) {
      var listeningTo = this._listeningTo || (this._listeningTo = {});
      var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
      listeningTo[id] = obj;
      if (!callback && typeof name === 'object') callback = this;
      obj[implementation](name, callback, this);
      return this;
    };
  });

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);

  // Backbone.Model
  // --------------

  // Backbone **Models** are the basic data object in the framework --
  // frequently representing a row in a table in a database on your server.
  // A discrete chunk of data and a bunch of useful, related methods for
  // performing computations and transformations on that data.

  // Create a new model with the specified attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var attrs = attributes || {};
    options || (options = {});
    this.cid = _.uniqueId('c');
    this.attributes = {};
    if (options.collection) this.collection = options.collection;
    if (options.parse) attrs = this.parse(attrs, options) || {};
    attrs = _.defaults({}, attrs, _.result(this, 'defaults'));
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The value returned during the last failed validation.
    validationError: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default -- but override this if you need
    // custom syncing semantics for *this* particular model.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // Set a hash of model attributes on the object, firing `"change"`. This is
    // the core primitive operation of a model, updating the data and notifying
    // anyone who needs to know about the change in state. The heart of the beast.
    set: function(key, val, options) {
      var attr, attrs, unset, changes, silent, changing, prev, current;
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options || (options = {});

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Extract attributes and options.
      unset           = options.unset;
      silent          = options.silent;
      changes         = [];
      changing        = this._changing;
      this._changing  = true;

      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }
      current = this.attributes, prev = this._previousAttributes;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      // For each `set` attribute, update or delete the current value.
      for (attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(current[attr], val)) changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          this.changed[attr] = val;
        } else {
          delete this.changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }

      // Trigger all relevant attribute changes.
      if (!silent) {
        if (changes.length) this._pending = options;
        for (var i = 0, l = changes.length; i < l; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }

      // You might be wondering why there's a `while` loop here. Changes can
      // be recursively nested within `"change"` events.
      if (changing) return this;
      if (!silent) {
        while (this._pending) {
          options = this._pending;
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },

    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
    // if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"`.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var val, changed = false;
      var old = this._changing ? this._previousAttributes : this.attributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overridden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        if (!model.set(model.parse(resp, options), options)) return false;
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      var attrs, method, xhr, attributes = this.attributes;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options = _.extend({validate: true}, options);

      // If we're not waiting and attributes exist, save acts as
      // `set(attr).save(null, opts)` with validation. Otherwise, check if
      // the model will be valid when the attributes, if any, are set.
      if (attrs && !options.wait) {
        if (!this.set(attrs, options)) return false;
      } else {
        if (!this._validate(attrs, options)) return false;
      }

      // Set temporary attributes if `{wait: true}`.
      if (attrs && options.wait) {
        this.attributes = _.extend({}, attributes, attrs);
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = model.parse(resp, options);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
          return false;
        }
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);

      method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method === 'patch') options.attrs = attrs;
      xhr = this.sync(method, this, options);

      // Restore attributes.
      if (attrs && options.wait) this.attributes = attributes;

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var destroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(resp) {
        if (options.wait || model.isNew()) destroy();
        if (success) success(model, resp, options);
        if (!model.isNew()) model.trigger('sync', model, resp, options);
      };

      if (this.isNew()) {
        options.success();
        return false;
      }
      wrapError(this, options);

      var xhr = this.sync('delete', this, options);
      if (!options.wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base =
        _.result(this, 'urlRoot') ||
        _.result(this.collection, 'url') ||
        urlError();
      if (this.isNew()) return base;
      return base.replace(/([^\/])$/, '$1/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return !this.has(this.idAttribute);
    },

    // Check if the model is currently in a valid state.
    isValid: function(options) {
      return this._validate({}, _.extend(options || {}, { validate: true }));
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
    _validate: function(attrs, options) {
      if (!options.validate || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validationError = this.validate(attrs, options) || null;
      if (!error) return true;
      this.trigger('invalid', this, error, _.extend(options, {validationError: error}));
      return false;
    }

  });

  // Underscore methods that we want to implement on the Model.
  var modelMethods = ['keys', 'values', 'pairs', 'invert', 'pick', 'omit'];

  // Mix in each Underscore method as a proxy to `Model#attributes`.
  _.each(modelMethods, function(method) {
    Model.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.attributes);
      return _[method].apply(_, args);
    };
  });

  // Backbone.Collection
  // -------------------

  // If models tend to represent a single row of data, a Backbone Collection is
  // more analagous to a table full of data ... or a small slice or page of that
  // table, or a collection of rows that belong together for a particular reason
  // -- all of the messages in this particular folder, all of the documents
  // belonging to this particular author, and so on. Collections maintain
  // indexes of their models, both in order, and for lookup by `id`.

  // Create a new **Collection**, perhaps to contain a specific type of `model`.
  // If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Default options for `Collection#set`.
  var setOptions = {add: true, remove: true, merge: true};
  var addOptions = {add: true, remove: false};

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model){ return model.toJSON(options); });
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Add a model, or list of models to the set.
    add: function(models, options) {
      return this.set(models, _.extend({merge: false}, options, addOptions));
    },

    // Remove a model, or a list of models from the set.
    remove: function(models, options) {
      var singular = !_.isArray(models);
      models = singular ? [models] : _.clone(models);
      options || (options = {});
      var i, l, index, model;
      for (i = 0, l = models.length; i < l; i++) {
        model = models[i] = this.get(models[i]);
        if (!model) continue;
        delete this._byId[model.id];
        delete this._byId[model.cid];
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model, options);
      }
      return singular ? models[0] : models;
    },

    // Update a collection by `set`-ing a new list of models, adding new ones,
    // removing models that are no longer present, and merging models that
    // already exist in the collection, as necessary. Similar to **Model#set**,
    // the core operation for updating the data contained by the collection.
    set: function(models, options) {
      options = _.defaults({}, options, setOptions);
      if (options.parse) models = this.parse(models, options);
      var singular = !_.isArray(models);
      models = singular ? (models ? [models] : []) : _.clone(models);
      var i, l, id, model, attrs, existing, sort;
      var at = options.at;
      var targetModel = this.model;
      var sortable = this.comparator && (at == null) && options.sort !== false;
      var sortAttr = _.isString(this.comparator) ? this.comparator : null;
      var toAdd = [], toRemove = [], modelMap = {};
      var add = options.add, merge = options.merge, remove = options.remove;
      var order = !sortable && add && remove ? [] : false;

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      for (i = 0, l = models.length; i < l; i++) {
        attrs = models[i] || {};
        if (attrs instanceof Model) {
          id = model = attrs;
        } else {
          id = attrs[targetModel.prototype.idAttribute || 'id'];
        }

        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        if (existing = this.get(id)) {
          if (remove) modelMap[existing.cid] = true;
          if (merge) {
            attrs = attrs === model ? model.attributes : attrs;
            if (options.parse) attrs = existing.parse(attrs, options);
            existing.set(attrs, options);
            if (sortable && !sort && existing.hasChanged(sortAttr)) sort = true;
          }
          models[i] = existing;

        // If this is a new, valid model, push it to the `toAdd` list.
        } else if (add) {
          model = models[i] = this._prepareModel(attrs, options);
          if (!model) continue;
          toAdd.push(model);
          this._addReference(model, options);
        }

        // Do not add multiple models with the same `id`.
        model = existing || model;
        if (order && (model.isNew() || !modelMap[model.id])) order.push(model);
        modelMap[model.id] = true;
      }

      // Remove nonexistent models if appropriate.
      if (remove) {
        for (i = 0, l = this.length; i < l; ++i) {
          if (!modelMap[(model = this.models[i]).cid]) toRemove.push(model);
        }
        if (toRemove.length) this.remove(toRemove, options);
      }

      // See if sorting is needed, update `length` and splice in new models.
      if (toAdd.length || (order && order.length)) {
        if (sortable) sort = true;
        this.length += toAdd.length;
        if (at != null) {
          for (i = 0, l = toAdd.length; i < l; i++) {
            this.models.splice(at + i, 0, toAdd[i]);
          }
        } else {
          if (order) this.models.length = 0;
          var orderedModels = order || toAdd;
          for (i = 0, l = orderedModels.length; i < l; i++) {
            this.models.push(orderedModels[i]);
          }
        }
      }

      // Silently sort the collection if appropriate.
      if (sort) this.sort({silent: true});

      // Unless silenced, it's time to fire all appropriate add/sort events.
      if (!options.silent) {
        for (i = 0, l = toAdd.length; i < l; i++) {
          (model = toAdd[i]).trigger('add', model, this, options);
        }
        if (sort || (order && order.length)) this.trigger('sort', this, options);
      }

      // Return the added (or merged) model (or models).
      return singular ? models[0] : models;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any granular `add` or `remove` events. Fires `reset` when finished.
    // Useful for bulk operations and optimizations.
    reset: function(models, options) {
      options || (options = {});
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i], options);
      }
      options.previousModels = this.models;
      this._reset();
      models = this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return models;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      return this.add(model, _.extend({at: this.length}, options));
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      this.remove(model, options);
      return model;
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      return this.add(model, _.extend({at: 0}, options));
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      this.remove(model, options);
      return model;
    },

    // Slice out a sub-array of models from the collection.
    slice: function() {
      return slice.apply(this.models, arguments);
    },

    // Get a model from the set by id.
    get: function(obj) {
      if (obj == null) return void 0;
      return this._byId[obj] || this._byId[obj.id] || this._byId[obj.cid];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of
    // `filter`.
    where: function(attrs, first) {
      if (_.isEmpty(attrs)) return first ? void 0 : [];
      return this[first ? 'find' : 'filter'](function(model) {
        for (var key in attrs) {
          if (attrs[key] !== model.get(key)) return false;
        }
        return true;
      });
    },

    // Return the first model with matching attributes. Useful for simple cases
    // of `find`.
    findWhere: function(attrs) {
      return this.where(attrs, true);
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
      options || (options = {});

      // Run sort based on type of `comparator`.
      if (_.isString(this.comparator) || this.comparator.length === 1) {
        this.models = this.sortBy(this.comparator, this);
      } else {
        this.models.sort(_.bind(this.comparator, this));
      }

      if (!options.silent) this.trigger('sort', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.invoke(this.models, 'get', attr);
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      var collection = this;
      options.success = function(resp) {
        var method = options.reset ? 'reset' : 'set';
        collection[method](resp, options);
        if (success) success(collection, resp, options);
        collection.trigger('sync', collection, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      options = options ? _.clone(options) : {};
      if (!(model = this._prepareModel(model, options))) return false;
      if (!options.wait) this.add(model, options);
      var collection = this;
      var success = options.success;
      options.success = function(model, resp) {
        if (options.wait) collection.add(model, options);
        if (success) success(model, resp, options);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models);
    },

    // Private method to reset all internal state. Called when the collection
    // is first initialized or reset.
    _reset: function() {
      this.length = 0;
      this.models = [];
      this._byId  = {};
    },

    // Prepare a hash of attributes (or other model) to be added to this
    // collection.
    _prepareModel: function(attrs, options) {
      if (attrs instanceof Model) return attrs;
      options = options ? _.clone(options) : {};
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model.validationError) return model;
      this.trigger('invalid', this, model.validationError, options);
      return false;
    },

    // Internal method to create a model's ties to a collection.
    _addReference: function(model, options) {
      this._byId[model.cid] = model;
      if (model.id != null) this._byId[model.id] = model;
      if (!model.collection) model.collection = this;
      model.on('all', this._onModelEvent, this);
    },

    // Internal method to sever a model's ties to a collection.
    _removeReference: function(model, options) {
      if (this === model.collection) delete model.collection;
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if ((event === 'add' || event === 'remove') && collection !== this) return;
      if (event === 'destroy') this.remove(model, options);
      if (model && event === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        if (model.id != null) this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  // 90% of the core usefulness of Backbone Collections is actually implemented
  // right here:
  var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
    'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
    'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
    'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
    'tail', 'drop', 'last', 'without', 'difference', 'indexOf', 'shuffle',
    'lastIndexOf', 'isEmpty', 'chain', 'sample'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Collection.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.models);
      return _[method].apply(_, args);
    };
  });

  // Underscore methods that take a property name as an argument.
  var attributeMethods = ['groupBy', 'countBy', 'sortBy', 'indexBy'];

  // Use attributes instead of properties.
  _.each(attributeMethods, function(method) {
    Collection.prototype[method] = function(value, context) {
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _[method](this.models, iterator, context);
    };
  });

  // Backbone.View
  // -------------

  // Backbone Views are almost more convention than they are actual code. A View
  // is simply a JavaScript object that represents a logical chunk of UI in the
  // DOM. This might be a single item, an entire list, a sidebar or panel, or
  // even the surrounding frame which wraps your whole app. Defining a chunk of
  // UI as a **View** allows you to define your DOM events declaratively, without
  // having to worry about render order ... and makes it easy for the view to
  // react to specific changes in the state of your models.

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    options || (options = {});
    _.extend(this, _.pick(options, viewOptions));
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be preferred to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this.$el.remove();
      this.stopListening();
      return this;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    setElement: function(element, delegate) {
      if (this.$el) this.undelegateEvents();
      this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save',
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function(events) {
      if (!(events || (events = _.result(this, 'events')))) return this;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) continue;

        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.on(eventName, method);
        } else {
          this.$el.on(eventName, selector, method);
        }
      }
      return this;
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      this.$el.off('.delegateEvents' + this.cid);
      return this;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        var $el = Backbone.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
        this.setElement($el, false);
      } else {
        this.setElement(_.result(this, 'el'), false);
      }
    }

  });

  // Backbone.sync
  // -------------

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    // If we're sending a `PATCH` request, and we're in an old Internet Explorer
    // that still has ActiveX enabled by default, override jQuery to use that
    // for XHR instead. Remove this line when jQuery supports `PATCH` on IE8.
    if (params.type === 'PATCH' && noXhrPatch) {
      params.xhr = function() {
        return new ActiveXObject("Microsoft.XMLHTTP");
      };
    }

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  var noXhrPatch =
    typeof window !== 'undefined' && !!window.ActiveXObject &&
      !(window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent);

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch':  'PATCH',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  // Override this if you'd like to use a different library.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };

  // Backbone.Router
  // ---------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (_.isFunction(name)) {
        callback = name;
        name = '';
      }
      if (!callback) callback = this[name];
      var router = this;
      Backbone.history.route(route, function(fragment) {
        var args = router._extractParameters(route, fragment);
        router.execute(callback, args);
        router.trigger.apply(router, ['route:' + name].concat(args));
        router.trigger('route', name, args);
        Backbone.history.trigger('route', router, name, args);
      });
      return this;
    },

    // Execute a route handler with the provided parameters.  This is an
    // excellent place to do pre-route setup or post-route cleanup.
    execute: function(callback, args) {
      if (callback) callback.apply(this, args);
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      this.routes = _.result(this, 'routes');
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, function(match, optional) {
                     return optional ? match : '([^/?]+)';
                   })
                   .replace(splatParam, '([^?]*?)');
      return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted decoded parameters. Empty or unmatched parameters will be
    // treated as `null` to normalize cross-browser behavior.
    _extractParameters: function(route, fragment) {
      var params = route.exec(fragment).slice(1);
      return _.map(params, function(param, i) {
        // Don't decode the search params.
        if (i === params.length - 1) return param || null;
        return param ? decodeURIComponent(param) : null;
      });
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on either
  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
  // and URL fragments. If the browser supports neither (old IE, natch),
  // falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Cached regex for removing a trailing slash.
  var trailingSlash = /\/$/;

  // Cached regex for stripping urls of hash.
  var pathStripper = /#.*$/;

  // Has the history handling already been started?
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Are we at the app root?
    atRoot: function() {
      return this.location.pathname.replace(/[^\/]$/, '$&/') === this.root;
    },

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || !this._wantsHashChange || forcePushState) {
          fragment = decodeURI(this.location.pathname + this.location.search);
          var root = this.root.replace(trailingSlash, '');
          if (!fragment.indexOf(root)) fragment = fragment.slice(root.length);
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error("Backbone.history has already been started");
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = _.extend({root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      if (oldIE && this._wantsHashChange) {
        var frame = Backbone.$('<iframe src="javascript:0" tabindex="-1">');
        this.iframe = frame.hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        Backbone.$(window).on('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        Backbone.$(window).on('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      var loc = this.location;

      // Transition from hashChange to pushState or vice versa if both are
      // requested.
      if (this._wantsHashChange && this._wantsPushState) {

        // If we've started off with a route from a `pushState`-enabled
        // browser, but we're currently in a browser that doesn't support it...
        if (!this._hasPushState && !this.atRoot()) {
          this.fragment = this.getFragment(null, true);
          this.location.replace(this.root + '#' + this.fragment);
          // Return immediately as browser will do redirect to new url
          return true;

        // Or if we've started out with a hash-based route, but we're currently
        // in a browser where it could be `pushState`-based instead...
        } else if (this._hasPushState && this.atRoot() && loc.hash) {
          this.fragment = this.getHash().replace(routeStripper, '');
          this.history.replaceState({}, document.title, this.root + this.fragment);
        }

      }

      if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      Backbone.$(window).off('popstate', this.checkUrl).off('hashchange', this.checkUrl);
      if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current === this.fragment && this.iframe) {
        current = this.getFragment(this.getHash(this.iframe));
      }
      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl();
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragment) {
      fragment = this.fragment = this.getFragment(fragment);
      return _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: !!options};

      var url = this.root + (fragment = this.getFragment(fragment || ''));

      // Strip the hash for matching.
      fragment = fragment.replace(pathStripper, '');

      if (this.fragment === fragment) return;
      this.fragment = fragment;

      // Don't include a trailing slash on the root.
      if (fragment === '' && url !== '/') url = url.slice(0, -1);

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, fragment, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) return this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = '#' + fragment;
      }
    }

  });

  // Create the default Backbone.history.
  Backbone.history = new History;

  // Helpers
  // -------

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Set up inheritance for the model, collection, router, view and history.
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

  // Wrap an optional error callback with a fallback error event.
  var wrapError = function(model, options) {
    var error = options.error;
    options.error = function(resp) {
      if (error) error(model, resp, options);
      model.trigger('error', model, resp, options);
    };
  };

  return Backbone;

}));

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/backbone/backbone.js","/../../node_modules/backbone")
},{"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36,"underscore":3}],3:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.6.0';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return obj;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
    return obj;
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    any(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(predicate, context);
    each(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, function(value, index, list) {
      return !predicate.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(predicate, context);
    each(obj, function(value, index, list) {
      if (!(result = result && predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(predicate, context);
    each(obj, function(value, index, list) {
      if (result || (result = predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    var result = -Infinity, lastComputed = -Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed > lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    var result = Infinity, lastComputed = Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed < lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Shuffle an array, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return value;
    return _.property(value);
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, iterator, context) {
    iterator = lookupIterator(iterator);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iterator, context) {
      var result = {};
      iterator = lookupIterator(iterator);
      each(obj, function(value, index) {
        var key = iterator.call(context, value, index, obj);
        behavior(result, key, value);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, key, value) {
    _.has(result, key) ? result[key].push(value) : result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, key, value) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, key) {
    _.has(result, key) ? result[key]++ : result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    each(input, function(value) {
      if (_.isArray(value) || _.isArguments(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Split an array into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(array, predicate) {
    var pass = [], fail = [];
    each(array, function(elem) {
      (predicate(elem) ? pass : fail).push(elem);
    });
    return [pass, fail];
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.contains(other, item);
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var length = _.max(_.pluck(arguments, 'length').concat(0));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, '' + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(length);

    while(idx < length) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) throw new Error('bindAll must be passed function names');
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;
      if (last < wait) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = new Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = new Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                             _.isFunction(bCtor) && (bCtor instanceof bCtor))
                        && ('constructor' in a && 'constructor' in b)) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function () {
      return value;
    };
  };

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    return function(obj) {
      if (obj === attrs) return true; //avoid comparing an object to itself.
      for (var key in attrs) {
        if (attrs[key] !== obj[key])
          return false;
      }
      return true;
    }
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(Math.max(0, n));
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() { return new Date().getTime(); };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}).call(this);

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../node_modules/underscore/underscore.js","/../../node_modules/underscore")
},{"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36}],4:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var expect = require('chai').expect;

describe('Collections', function() {
  // Add Tests for Collections
});

var expect = require('chai').expect;
var Participant = require('../../app/models/Participant');

describe('Models', function() {
  describe('Participant', function() {
    before(function() {
      this.participant = new Participant();
    });
    after(function() {
      this.participant = null;
    });

    it('#should test model defaults', function() {
      var keys = ['age', 'country', 'userAgent'];
      expect(this.participant.attributes).to.have.keys(keys);
    });
  });
});

var expect = require('chai').expect;

describe('Routers', function() {
  // Add Tests for Routers
});

var expect = require('chai').expect;

describe('Views', function() {
  // Add Tests for Views
});

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/fake_9984453f.js","/")
},{"../../app/models/Participant":1,"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36,"chai":5}],5:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
module.exports = require('./lib/chai');

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/chai/index.js","/../../../node_modules/chai")
},{"./lib/chai":6,"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36}],6:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var used = []
  , exports = module.exports = {};

/*!
 * Chai version
 */

exports.version = '1.8.1';

/*!
 * Assertion Error
 */

exports.AssertionError = require('assertion-error');

/*!
 * Utils for plugins (not exported)
 */

var util = require('./chai/utils');

/**
 * # .use(function)
 *
 * Provides a way to extend the internals of Chai
 *
 * @param {Function}
 * @returns {this} for chaining
 * @api public
 */

exports.use = function (fn) {
  if (!~used.indexOf(fn)) {
    fn(this, util);
    used.push(fn);
  }

  return this;
};

/*!
 * Primary `Assertion` prototype
 */

var assertion = require('./chai/assertion');
exports.use(assertion);

/*!
 * Core Assertions
 */

var core = require('./chai/core/assertions');
exports.use(core);

/*!
 * Expect interface
 */

var expect = require('./chai/interface/expect');
exports.use(expect);

/*!
 * Should interface
 */

var should = require('./chai/interface/should');
exports.use(should);

/*!
 * Assert interface
 */

var assert = require('./chai/interface/assert');
exports.use(assert);

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/chai/lib/chai.js","/../../../node_modules/chai/lib")
},{"./chai/assertion":7,"./chai/core/assertions":8,"./chai/interface/assert":9,"./chai/interface/expect":10,"./chai/interface/should":11,"./chai/utils":22,"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"assertion-error":31,"buffer":36}],7:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

module.exports = function (_chai, util) {
  /*!
   * Module dependencies.
   */

  var AssertionError = _chai.AssertionError
    , flag = util.flag;

  /*!
   * Module export.
   */

  _chai.Assertion = Assertion;

  /*!
   * Assertion Constructor
   *
   * Creates object for chaining.
   *
   * @api private
   */

  function Assertion (obj, msg, stack) {
    flag(this, 'ssfi', stack || arguments.callee);
    flag(this, 'object', obj);
    flag(this, 'message', msg);
  }

  /*!
    * ### Assertion.includeStack
    *
    * User configurable property, influences whether stack trace
    * is included in Assertion error message. Default of false
    * suppresses stack trace in the error message
    *
    *     Assertion.includeStack = true;  // enable stack on error
    *
    * @api public
    */

  Assertion.includeStack = false;

  /*!
   * ### Assertion.showDiff
   *
   * User configurable property, influences whether or not
   * the `showDiff` flag should be included in the thrown
   * AssertionErrors. `false` will always be `false`; `true`
   * will be true when the assertion has requested a diff
   * be shown.
   *
   * @api public
   */

  Assertion.showDiff = true;

  Assertion.addProperty = function (name, fn) {
    util.addProperty(this.prototype, name, fn);
  };

  Assertion.addMethod = function (name, fn) {
    util.addMethod(this.prototype, name, fn);
  };

  Assertion.addChainableMethod = function (name, fn, chainingBehavior) {
    util.addChainableMethod(this.prototype, name, fn, chainingBehavior);
  };

  Assertion.overwriteProperty = function (name, fn) {
    util.overwriteProperty(this.prototype, name, fn);
  };

  Assertion.overwriteMethod = function (name, fn) {
    util.overwriteMethod(this.prototype, name, fn);
  };

  Assertion.overwriteChainableMethod = function (name, fn, chainingBehavior) {
    util.overwriteChainableMethod(this.prototype, name, fn, chainingBehavior);
  };

  /*!
   * ### .assert(expression, message, negateMessage, expected, actual)
   *
   * Executes an expression and check expectations. Throws AssertionError for reporting if test doesn't pass.
   *
   * @name assert
   * @param {Philosophical} expression to be tested
   * @param {String} message to display if fails
   * @param {String} negatedMessage to display if negated expression fails
   * @param {Mixed} expected value (remember to check for negation)
   * @param {Mixed} actual (optional) will default to `this.obj`
   * @api private
   */

  Assertion.prototype.assert = function (expr, msg, negateMsg, expected, _actual, showDiff) {
    var ok = util.test(this, arguments);
    if (true !== showDiff) showDiff = false;
    if (true !== Assertion.showDiff) showDiff = false;

    if (!ok) {
      var msg = util.getMessage(this, arguments)
        , actual = util.getActual(this, arguments);
      throw new AssertionError(msg, {
          actual: actual
        , expected: expected
        , showDiff: showDiff
      }, (Assertion.includeStack) ? this.assert : flag(this, 'ssfi'));
    }
  };

  /*!
   * ### ._obj
   *
   * Quick reference to stored `actual` value for plugin developers.
   *
   * @api private
   */

  Object.defineProperty(Assertion.prototype, '_obj',
    { get: function () {
        return flag(this, 'object');
      }
    , set: function (val) {
        flag(this, 'object', val);
      }
  });
};

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/chai/lib/chai/assertion.js","/../../../node_modules/chai/lib/chai")
},{"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36}],8:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

module.exports = function (chai, _) {
  var Assertion = chai.Assertion
    , toString = Object.prototype.toString
    , flag = _.flag;

  /**
   * ### Language Chains
   *
   * The following are provided as chainable getters to
   * improve the readability of your assertions. They
   * do not provide an testing capability unless they
   * have been overwritten by a plugin.
   *
   * **Chains**
   *
   * - to
   * - be
   * - been
   * - is
   * - that
   * - and
   * - has
   * - have
   * - with
   * - at
   * - of
   * - same
   *
   * @name language chains
   * @api public
   */

  [ 'to', 'be', 'been'
  , 'is', 'and', 'has', 'have'
  , 'with', 'that', 'at'
  , 'of', 'same' ].forEach(function (chain) {
    Assertion.addProperty(chain, function () {
      return this;
    });
  });

  /**
   * ### .not
   *
   * Negates any of assertions following in the chain.
   *
   *     expect(foo).to.not.equal('bar');
   *     expect(goodFn).to.not.throw(Error);
   *     expect({ foo: 'baz' }).to.have.property('foo')
   *       .and.not.equal('bar');
   *
   * @name not
   * @api public
   */

  Assertion.addProperty('not', function () {
    flag(this, 'negate', true);
  });

  /**
   * ### .deep
   *
   * Sets the `deep` flag, later used by the `equal` and
   * `property` assertions.
   *
   *     expect(foo).to.deep.equal({ bar: 'baz' });
   *     expect({ foo: { bar: { baz: 'quux' } } })
   *       .to.have.deep.property('foo.bar.baz', 'quux');
   *
   * @name deep
   * @api public
   */

  Assertion.addProperty('deep', function () {
    flag(this, 'deep', true);
  });

  /**
   * ### .a(type)
   *
   * The `a` and `an` assertions are aliases that can be
   * used either as language chains or to assert a value's
   * type.
   *
   *     // typeof
   *     expect('test').to.be.a('string');
   *     expect({ foo: 'bar' }).to.be.an('object');
   *     expect(null).to.be.a('null');
   *     expect(undefined).to.be.an('undefined');
   *
   *     // language chain
   *     expect(foo).to.be.an.instanceof(Foo);
   *
   * @name a
   * @alias an
   * @param {String} type
   * @param {String} message _optional_
   * @api public
   */

  function an (type, msg) {
    if (msg) flag(this, 'message', msg);
    type = type.toLowerCase();
    var obj = flag(this, 'object')
      , article = ~[ 'a', 'e', 'i', 'o', 'u' ].indexOf(type.charAt(0)) ? 'an ' : 'a ';

    this.assert(
        type === _.type(obj)
      , 'expected #{this} to be ' + article + type
      , 'expected #{this} not to be ' + article + type
    );
  }

  Assertion.addChainableMethod('an', an);
  Assertion.addChainableMethod('a', an);

  /**
   * ### .include(value)
   *
   * The `include` and `contain` assertions can be used as either property
   * based language chains or as methods to assert the inclusion of an object
   * in an array or a substring in a string. When used as language chains,
   * they toggle the `contain` flag for the `keys` assertion.
   *
   *     expect([1,2,3]).to.include(2);
   *     expect('foobar').to.contain('foo');
   *     expect({ foo: 'bar', hello: 'universe' }).to.include.keys('foo');
   *
   * @name include
   * @alias contain
   * @param {Object|String|Number} obj
   * @param {String} message _optional_
   * @api public
   */

  function includeChainingBehavior () {
    flag(this, 'contains', true);
  }

  function include (val, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');

    if (_.type(val) === 'object') {
      if (!flag(this, 'negate')) {
        for (var k in val) new Assertion(obj).property(k, val[k]);
        return;
      }
      var subset = {}
      for (var k in val) subset[k] = obj[k]
      var expected = _.eql(subset, val);
    } else {
      var expected = obj && ~obj.indexOf(val)
    }
    this.assert(
        expected
      , 'expected #{this} to include ' + _.inspect(val)
      , 'expected #{this} to not include ' + _.inspect(val));
  }

  Assertion.addChainableMethod('include', include, includeChainingBehavior);
  Assertion.addChainableMethod('contain', include, includeChainingBehavior);

  /**
   * ### .ok
   *
   * Asserts that the target is truthy.
   *
   *     expect('everthing').to.be.ok;
   *     expect(1).to.be.ok;
   *     expect(false).to.not.be.ok;
   *     expect(undefined).to.not.be.ok;
   *     expect(null).to.not.be.ok;
   *
   * @name ok
   * @api public
   */

  Assertion.addProperty('ok', function () {
    this.assert(
        flag(this, 'object')
      , 'expected #{this} to be truthy'
      , 'expected #{this} to be falsy');
  });

  /**
   * ### .true
   *
   * Asserts that the target is `true`.
   *
   *     expect(true).to.be.true;
   *     expect(1).to.not.be.true;
   *
   * @name true
   * @api public
   */

  Assertion.addProperty('true', function () {
    this.assert(
        true === flag(this, 'object')
      , 'expected #{this} to be true'
      , 'expected #{this} to be false'
      , this.negate ? false : true
    );
  });

  /**
   * ### .false
   *
   * Asserts that the target is `false`.
   *
   *     expect(false).to.be.false;
   *     expect(0).to.not.be.false;
   *
   * @name false
   * @api public
   */

  Assertion.addProperty('false', function () {
    this.assert(
        false === flag(this, 'object')
      , 'expected #{this} to be false'
      , 'expected #{this} to be true'
      , this.negate ? true : false
    );
  });

  /**
   * ### .null
   *
   * Asserts that the target is `null`.
   *
   *     expect(null).to.be.null;
   *     expect(undefined).not.to.be.null;
   *
   * @name null
   * @api public
   */

  Assertion.addProperty('null', function () {
    this.assert(
        null === flag(this, 'object')
      , 'expected #{this} to be null'
      , 'expected #{this} not to be null'
    );
  });

  /**
   * ### .undefined
   *
   * Asserts that the target is `undefined`.
   *
   *     expect(undefined).to.be.undefined;
   *     expect(null).to.not.be.undefined;
   *
   * @name undefined
   * @api public
   */

  Assertion.addProperty('undefined', function () {
    this.assert(
        undefined === flag(this, 'object')
      , 'expected #{this} to be undefined'
      , 'expected #{this} not to be undefined'
    );
  });

  /**
   * ### .exist
   *
   * Asserts that the target is neither `null` nor `undefined`.
   *
   *     var foo = 'hi'
   *       , bar = null
   *       , baz;
   *
   *     expect(foo).to.exist;
   *     expect(bar).to.not.exist;
   *     expect(baz).to.not.exist;
   *
   * @name exist
   * @api public
   */

  Assertion.addProperty('exist', function () {
    this.assert(
        null != flag(this, 'object')
      , 'expected #{this} to exist'
      , 'expected #{this} to not exist'
    );
  });


  /**
   * ### .empty
   *
   * Asserts that the target's length is `0`. For arrays, it checks
   * the `length` property. For objects, it gets the count of
   * enumerable keys.
   *
   *     expect([]).to.be.empty;
   *     expect('').to.be.empty;
   *     expect({}).to.be.empty;
   *
   * @name empty
   * @api public
   */

  Assertion.addProperty('empty', function () {
    var obj = flag(this, 'object')
      , expected = obj;

    if (Array.isArray(obj) || 'string' === typeof object) {
      expected = obj.length;
    } else if (typeof obj === 'object') {
      expected = Object.keys(obj).length;
    }

    this.assert(
        !expected
      , 'expected #{this} to be empty'
      , 'expected #{this} not to be empty'
    );
  });

  /**
   * ### .arguments
   *
   * Asserts that the target is an arguments object.
   *
   *     function test () {
   *       expect(arguments).to.be.arguments;
   *     }
   *
   * @name arguments
   * @alias Arguments
   * @api public
   */

  function checkArguments () {
    var obj = flag(this, 'object')
      , type = Object.prototype.toString.call(obj);
    this.assert(
        '[object Arguments]' === type
      , 'expected #{this} to be arguments but got ' + type
      , 'expected #{this} to not be arguments'
    );
  }

  Assertion.addProperty('arguments', checkArguments);
  Assertion.addProperty('Arguments', checkArguments);

  /**
   * ### .equal(value)
   *
   * Asserts that the target is strictly equal (`===`) to `value`.
   * Alternately, if the `deep` flag is set, asserts that
   * the target is deeply equal to `value`.
   *
   *     expect('hello').to.equal('hello');
   *     expect(42).to.equal(42);
   *     expect(1).to.not.equal(true);
   *     expect({ foo: 'bar' }).to.not.equal({ foo: 'bar' });
   *     expect({ foo: 'bar' }).to.deep.equal({ foo: 'bar' });
   *
   * @name equal
   * @alias equals
   * @alias eq
   * @alias deep.equal
   * @param {Mixed} value
   * @param {String} message _optional_
   * @api public
   */

  function assertEqual (val, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    if (flag(this, 'deep')) {
      return this.eql(val);
    } else {
      this.assert(
          val === obj
        , 'expected #{this} to equal #{exp}'
        , 'expected #{this} to not equal #{exp}'
        , val
        , this._obj
        , true
      );
    }
  }

  Assertion.addMethod('equal', assertEqual);
  Assertion.addMethod('equals', assertEqual);
  Assertion.addMethod('eq', assertEqual);

  /**
   * ### .eql(value)
   *
   * Asserts that the target is deeply equal to `value`.
   *
   *     expect({ foo: 'bar' }).to.eql({ foo: 'bar' });
   *     expect([ 1, 2, 3 ]).to.eql([ 1, 2, 3 ]);
   *
   * @name eql
   * @alias eqls
   * @param {Mixed} value
   * @param {String} message _optional_
   * @api public
   */

  function assertEql(obj, msg) {
    if (msg) flag(this, 'message', msg);
    this.assert(
        _.eql(obj, flag(this, 'object'))
      , 'expected #{this} to deeply equal #{exp}'
      , 'expected #{this} to not deeply equal #{exp}'
      , obj
      , this._obj
      , true
    );
  }

  Assertion.addMethod('eql', assertEql);
  Assertion.addMethod('eqls', assertEql);

  /**
   * ### .above(value)
   *
   * Asserts that the target is greater than `value`.
   *
   *     expect(10).to.be.above(5);
   *
   * Can also be used in conjunction with `length` to
   * assert a minimum length. The benefit being a
   * more informative error message than if the length
   * was supplied directly.
   *
   *     expect('foo').to.have.length.above(2);
   *     expect([ 1, 2, 3 ]).to.have.length.above(2);
   *
   * @name above
   * @alias gt
   * @alias greaterThan
   * @param {Number} value
   * @param {String} message _optional_
   * @api public
   */

  function assertAbove (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    if (flag(this, 'doLength')) {
      new Assertion(obj, msg).to.have.property('length');
      var len = obj.length;
      this.assert(
          len > n
        , 'expected #{this} to have a length above #{exp} but got #{act}'
        , 'expected #{this} to not have a length above #{exp}'
        , n
        , len
      );
    } else {
      this.assert(
          obj > n
        , 'expected #{this} to be above ' + n
        , 'expected #{this} to be at most ' + n
      );
    }
  }

  Assertion.addMethod('above', assertAbove);
  Assertion.addMethod('gt', assertAbove);
  Assertion.addMethod('greaterThan', assertAbove);

  /**
   * ### .least(value)
   *
   * Asserts that the target is greater than or equal to `value`.
   *
   *     expect(10).to.be.at.least(10);
   *
   * Can also be used in conjunction with `length` to
   * assert a minimum length. The benefit being a
   * more informative error message than if the length
   * was supplied directly.
   *
   *     expect('foo').to.have.length.of.at.least(2);
   *     expect([ 1, 2, 3 ]).to.have.length.of.at.least(3);
   *
   * @name least
   * @alias gte
   * @param {Number} value
   * @param {String} message _optional_
   * @api public
   */

  function assertLeast (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    if (flag(this, 'doLength')) {
      new Assertion(obj, msg).to.have.property('length');
      var len = obj.length;
      this.assert(
          len >= n
        , 'expected #{this} to have a length at least #{exp} but got #{act}'
        , 'expected #{this} to have a length below #{exp}'
        , n
        , len
      );
    } else {
      this.assert(
          obj >= n
        , 'expected #{this} to be at least ' + n
        , 'expected #{this} to be below ' + n
      );
    }
  }

  Assertion.addMethod('least', assertLeast);
  Assertion.addMethod('gte', assertLeast);

  /**
   * ### .below(value)
   *
   * Asserts that the target is less than `value`.
   *
   *     expect(5).to.be.below(10);
   *
   * Can also be used in conjunction with `length` to
   * assert a maximum length. The benefit being a
   * more informative error message than if the length
   * was supplied directly.
   *
   *     expect('foo').to.have.length.below(4);
   *     expect([ 1, 2, 3 ]).to.have.length.below(4);
   *
   * @name below
   * @alias lt
   * @alias lessThan
   * @param {Number} value
   * @param {String} message _optional_
   * @api public
   */

  function assertBelow (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    if (flag(this, 'doLength')) {
      new Assertion(obj, msg).to.have.property('length');
      var len = obj.length;
      this.assert(
          len < n
        , 'expected #{this} to have a length below #{exp} but got #{act}'
        , 'expected #{this} to not have a length below #{exp}'
        , n
        , len
      );
    } else {
      this.assert(
          obj < n
        , 'expected #{this} to be below ' + n
        , 'expected #{this} to be at least ' + n
      );
    }
  }

  Assertion.addMethod('below', assertBelow);
  Assertion.addMethod('lt', assertBelow);
  Assertion.addMethod('lessThan', assertBelow);

  /**
   * ### .most(value)
   *
   * Asserts that the target is less than or equal to `value`.
   *
   *     expect(5).to.be.at.most(5);
   *
   * Can also be used in conjunction with `length` to
   * assert a maximum length. The benefit being a
   * more informative error message than if the length
   * was supplied directly.
   *
   *     expect('foo').to.have.length.of.at.most(4);
   *     expect([ 1, 2, 3 ]).to.have.length.of.at.most(3);
   *
   * @name most
   * @alias lte
   * @param {Number} value
   * @param {String} message _optional_
   * @api public
   */

  function assertMost (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    if (flag(this, 'doLength')) {
      new Assertion(obj, msg).to.have.property('length');
      var len = obj.length;
      this.assert(
          len <= n
        , 'expected #{this} to have a length at most #{exp} but got #{act}'
        , 'expected #{this} to have a length above #{exp}'
        , n
        , len
      );
    } else {
      this.assert(
          obj <= n
        , 'expected #{this} to be at most ' + n
        , 'expected #{this} to be above ' + n
      );
    }
  }

  Assertion.addMethod('most', assertMost);
  Assertion.addMethod('lte', assertMost);

  /**
   * ### .within(start, finish)
   *
   * Asserts that the target is within a range.
   *
   *     expect(7).to.be.within(5,10);
   *
   * Can also be used in conjunction with `length` to
   * assert a length range. The benefit being a
   * more informative error message than if the length
   * was supplied directly.
   *
   *     expect('foo').to.have.length.within(2,4);
   *     expect([ 1, 2, 3 ]).to.have.length.within(2,4);
   *
   * @name within
   * @param {Number} start lowerbound inclusive
   * @param {Number} finish upperbound inclusive
   * @param {String} message _optional_
   * @api public
   */

  Assertion.addMethod('within', function (start, finish, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , range = start + '..' + finish;
    if (flag(this, 'doLength')) {
      new Assertion(obj, msg).to.have.property('length');
      var len = obj.length;
      this.assert(
          len >= start && len <= finish
        , 'expected #{this} to have a length within ' + range
        , 'expected #{this} to not have a length within ' + range
      );
    } else {
      this.assert(
          obj >= start && obj <= finish
        , 'expected #{this} to be within ' + range
        , 'expected #{this} to not be within ' + range
      );
    }
  });

  /**
   * ### .instanceof(constructor)
   *
   * Asserts that the target is an instance of `constructor`.
   *
   *     var Tea = function (name) { this.name = name; }
   *       , Chai = new Tea('chai');
   *
   *     expect(Chai).to.be.an.instanceof(Tea);
   *     expect([ 1, 2, 3 ]).to.be.instanceof(Array);
   *
   * @name instanceof
   * @param {Constructor} constructor
   * @param {String} message _optional_
   * @alias instanceOf
   * @api public
   */

  function assertInstanceOf (constructor, msg) {
    if (msg) flag(this, 'message', msg);
    var name = _.getName(constructor);
    this.assert(
        flag(this, 'object') instanceof constructor
      , 'expected #{this} to be an instance of ' + name
      , 'expected #{this} to not be an instance of ' + name
    );
  };

  Assertion.addMethod('instanceof', assertInstanceOf);
  Assertion.addMethod('instanceOf', assertInstanceOf);

  /**
   * ### .property(name, [value])
   *
   * Asserts that the target has a property `name`, optionally asserting that
   * the value of that property is strictly equal to  `value`.
   * If the `deep` flag is set, you can use dot- and bracket-notation for deep
   * references into objects and arrays.
   *
   *     // simple referencing
   *     var obj = { foo: 'bar' };
   *     expect(obj).to.have.property('foo');
   *     expect(obj).to.have.property('foo', 'bar');
   *
   *     // deep referencing
   *     var deepObj = {
   *         green: { tea: 'matcha' }
   *       , teas: [ 'chai', 'matcha', { tea: 'konacha' } ]
   *     };

   *     expect(deepObj).to.have.deep.property('green.tea', 'matcha');
   *     expect(deepObj).to.have.deep.property('teas[1]', 'matcha');
   *     expect(deepObj).to.have.deep.property('teas[2].tea', 'konacha');
   *
   * You can also use an array as the starting point of a `deep.property`
   * assertion, or traverse nested arrays.
   *
   *     var arr = [
   *         [ 'chai', 'matcha', 'konacha' ]
   *       , [ { tea: 'chai' }
   *         , { tea: 'matcha' }
   *         , { tea: 'konacha' } ]
   *     ];
   *
   *     expect(arr).to.have.deep.property('[0][1]', 'matcha');
   *     expect(arr).to.have.deep.property('[1][2].tea', 'konacha');
   *
   * Furthermore, `property` changes the subject of the assertion
   * to be the value of that property from the original object. This
   * permits for further chainable assertions on that property.
   *
   *     expect(obj).to.have.property('foo')
   *       .that.is.a('string');
   *     expect(deepObj).to.have.property('green')
   *       .that.is.an('object')
   *       .that.deep.equals({ tea: 'matcha' });
   *     expect(deepObj).to.have.property('teas')
   *       .that.is.an('array')
   *       .with.deep.property('[2]')
   *         .that.deep.equals({ tea: 'konacha' });
   *
   * @name property
   * @alias deep.property
   * @param {String} name
   * @param {Mixed} value (optional)
   * @param {String} message _optional_
   * @returns value of property for chaining
   * @api public
   */

  Assertion.addMethod('property', function (name, val, msg) {
    if (msg) flag(this, 'message', msg);

    var descriptor = flag(this, 'deep') ? 'deep property ' : 'property '
      , negate = flag(this, 'negate')
      , obj = flag(this, 'object')
      , value = flag(this, 'deep')
        ? _.getPathValue(name, obj)
        : obj[name];

    if (negate && undefined !== val) {
      if (undefined === value) {
        msg = (msg != null) ? msg + ': ' : '';
        throw new Error(msg + _.inspect(obj) + ' has no ' + descriptor + _.inspect(name));
      }
    } else {
      this.assert(
          undefined !== value
        , 'expected #{this} to have a ' + descriptor + _.inspect(name)
        , 'expected #{this} to not have ' + descriptor + _.inspect(name));
    }

    if (undefined !== val) {
      this.assert(
          val === value
        , 'expected #{this} to have a ' + descriptor + _.inspect(name) + ' of #{exp}, but got #{act}'
        , 'expected #{this} to not have a ' + descriptor + _.inspect(name) + ' of #{act}'
        , val
        , value
      );
    }

    flag(this, 'object', value);
  });


  /**
   * ### .ownProperty(name)
   *
   * Asserts that the target has an own property `name`.
   *
   *     expect('test').to.have.ownProperty('length');
   *
   * @name ownProperty
   * @alias haveOwnProperty
   * @param {String} name
   * @param {String} message _optional_
   * @api public
   */

  function assertOwnProperty (name, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    this.assert(
        obj.hasOwnProperty(name)
      , 'expected #{this} to have own property ' + _.inspect(name)
      , 'expected #{this} to not have own property ' + _.inspect(name)
    );
  }

  Assertion.addMethod('ownProperty', assertOwnProperty);
  Assertion.addMethod('haveOwnProperty', assertOwnProperty);

  /**
   * ### .length(value)
   *
   * Asserts that the target's `length` property has
   * the expected value.
   *
   *     expect([ 1, 2, 3]).to.have.length(3);
   *     expect('foobar').to.have.length(6);
   *
   * Can also be used as a chain precursor to a value
   * comparison for the length property.
   *
   *     expect('foo').to.have.length.above(2);
   *     expect([ 1, 2, 3 ]).to.have.length.above(2);
   *     expect('foo').to.have.length.below(4);
   *     expect([ 1, 2, 3 ]).to.have.length.below(4);
   *     expect('foo').to.have.length.within(2,4);
   *     expect([ 1, 2, 3 ]).to.have.length.within(2,4);
   *
   * @name length
   * @alias lengthOf
   * @param {Number} length
   * @param {String} message _optional_
   * @api public
   */

  function assertLengthChain () {
    flag(this, 'doLength', true);
  }

  function assertLength (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    new Assertion(obj, msg).to.have.property('length');
    var len = obj.length;

    this.assert(
        len == n
      , 'expected #{this} to have a length of #{exp} but got #{act}'
      , 'expected #{this} to not have a length of #{act}'
      , n
      , len
    );
  }

  Assertion.addChainableMethod('length', assertLength, assertLengthChain);
  Assertion.addMethod('lengthOf', assertLength, assertLengthChain);

  /**
   * ### .match(regexp)
   *
   * Asserts that the target matches a regular expression.
   *
   *     expect('foobar').to.match(/^foo/);
   *
   * @name match
   * @param {RegExp} RegularExpression
   * @param {String} message _optional_
   * @api public
   */

  Assertion.addMethod('match', function (re, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    this.assert(
        re.exec(obj)
      , 'expected #{this} to match ' + re
      , 'expected #{this} not to match ' + re
    );
  });

  /**
   * ### .string(string)
   *
   * Asserts that the string target contains another string.
   *
   *     expect('foobar').to.have.string('bar');
   *
   * @name string
   * @param {String} string
   * @param {String} message _optional_
   * @api public
   */

  Assertion.addMethod('string', function (str, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    new Assertion(obj, msg).is.a('string');

    this.assert(
        ~obj.indexOf(str)
      , 'expected #{this} to contain ' + _.inspect(str)
      , 'expected #{this} to not contain ' + _.inspect(str)
    );
  });


  /**
   * ### .keys(key1, [key2], [...])
   *
   * Asserts that the target has exactly the given keys, or
   * asserts the inclusion of some keys when using the
   * `include` or `contain` modifiers.
   *
   *     expect({ foo: 1, bar: 2 }).to.have.keys(['foo', 'bar']);
   *     expect({ foo: 1, bar: 2, baz: 3 }).to.contain.keys('foo', 'bar');
   *
   * @name keys
   * @alias key
   * @param {String...|Array} keys
   * @api public
   */

  function assertKeys (keys) {
    var obj = flag(this, 'object')
      , str
      , ok = true;

    keys = keys instanceof Array
      ? keys
      : Array.prototype.slice.call(arguments);

    if (!keys.length) throw new Error('keys required');

    var actual = Object.keys(obj)
      , len = keys.length;

    // Inclusion
    ok = keys.every(function(key){
      return ~actual.indexOf(key);
    });

    // Strict
    if (!flag(this, 'negate') && !flag(this, 'contains')) {
      ok = ok && keys.length == actual.length;
    }

    // Key string
    if (len > 1) {
      keys = keys.map(function(key){
        return _.inspect(key);
      });
      var last = keys.pop();
      str = keys.join(', ') + ', and ' + last;
    } else {
      str = _.inspect(keys[0]);
    }

    // Form
    str = (len > 1 ? 'keys ' : 'key ') + str;

    // Have / include
    str = (flag(this, 'contains') ? 'contain ' : 'have ') + str;

    // Assertion
    this.assert(
        ok
      , 'expected #{this} to ' + str
      , 'expected #{this} to not ' + str
    );
  }

  Assertion.addMethod('keys', assertKeys);
  Assertion.addMethod('key', assertKeys);

  /**
   * ### .throw(constructor)
   *
   * Asserts that the function target will throw a specific error, or specific type of error
   * (as determined using `instanceof`), optionally with a RegExp or string inclusion test
   * for the error's message.
   *
   *     var err = new ReferenceError('This is a bad function.');
   *     var fn = function () { throw err; }
   *     expect(fn).to.throw(ReferenceError);
   *     expect(fn).to.throw(Error);
   *     expect(fn).to.throw(/bad function/);
   *     expect(fn).to.not.throw('good function');
   *     expect(fn).to.throw(ReferenceError, /bad function/);
   *     expect(fn).to.throw(err);
   *     expect(fn).to.not.throw(new RangeError('Out of range.'));
   *
   * Please note that when a throw expectation is negated, it will check each
   * parameter independently, starting with error constructor type. The appropriate way
   * to check for the existence of a type of error but for a message that does not match
   * is to use `and`.
   *
   *     expect(fn).to.throw(ReferenceError)
   *        .and.not.throw(/good function/);
   *
   * @name throw
   * @alias throws
   * @alias Throw
   * @param {ErrorConstructor} constructor
   * @param {String|RegExp} expected error message
   * @param {String} message _optional_
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
   * @returns error for chaining (null if no error)
   * @api public
   */

  function assertThrows (constructor, errMsg, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    new Assertion(obj, msg).is.a('function');

    var thrown = false
      , desiredError = null
      , name = null
      , thrownError = null;

    if (arguments.length === 0) {
      errMsg = null;
      constructor = null;
    } else if (constructor && (constructor instanceof RegExp || 'string' === typeof constructor)) {
      errMsg = constructor;
      constructor = null;
    } else if (constructor && constructor instanceof Error) {
      desiredError = constructor;
      constructor = null;
      errMsg = null;
    } else if (typeof constructor === 'function') {
      name = constructor.prototype.name || constructor.name;
      if (name === 'Error' && constructor !== Error) {
        name = (new constructor()).name;
      }
    } else {
      constructor = null;
    }

    try {
      obj();
    } catch (err) {
      // first, check desired error
      if (desiredError) {
        this.assert(
            err === desiredError
          , 'expected #{this} to throw #{exp} but #{act} was thrown'
          , 'expected #{this} to not throw #{exp}'
          , (desiredError instanceof Error ? desiredError.toString() : desiredError)
          , (err instanceof Error ? err.toString() : err)
        );

        flag(this, 'object', err);
        return this;
      }

      // next, check constructor
      if (constructor) {
        this.assert(
            err instanceof constructor
          , 'expected #{this} to throw #{exp} but #{act} was thrown'
          , 'expected #{this} to not throw #{exp} but #{act} was thrown'
          , name
          , (err instanceof Error ? err.toString() : err)
        );

        if (!errMsg) {
          flag(this, 'object', err);
          return this;
        }
      }

      // next, check message
      var message = 'object' === _.type(err) && "message" in err
        ? err.message
        : '' + err;

      if ((message != null) && errMsg && errMsg instanceof RegExp) {
        this.assert(
            errMsg.exec(message)
          , 'expected #{this} to throw error matching #{exp} but got #{act}'
          , 'expected #{this} to throw error not matching #{exp}'
          , errMsg
          , message
        );

        flag(this, 'object', err);
        return this;
      } else if ((message != null) && errMsg && 'string' === typeof errMsg) {
        this.assert(
            ~message.indexOf(errMsg)
          , 'expected #{this} to throw error including #{exp} but got #{act}'
          , 'expected #{this} to throw error not including #{act}'
          , errMsg
          , message
        );

        flag(this, 'object', err);
        return this;
      } else {
        thrown = true;
        thrownError = err;
      }
    }

    var actuallyGot = ''
      , expectedThrown = name !== null
        ? name
        : desiredError
          ? '#{exp}' //_.inspect(desiredError)
          : 'an error';

    if (thrown) {
      actuallyGot = ' but #{act} was thrown'
    }

    this.assert(
        thrown === true
      , 'expected #{this} to throw ' + expectedThrown + actuallyGot
      , 'expected #{this} to not throw ' + expectedThrown + actuallyGot
      , (desiredError instanceof Error ? desiredError.toString() : desiredError)
      , (thrownError instanceof Error ? thrownError.toString() : thrownError)
    );

    flag(this, 'object', thrownError);
  };

  Assertion.addMethod('throw', assertThrows);
  Assertion.addMethod('throws', assertThrows);
  Assertion.addMethod('Throw', assertThrows);

  /**
   * ### .respondTo(method)
   *
   * Asserts that the object or class target will respond to a method.
   *
   *     Klass.prototype.bar = function(){};
   *     expect(Klass).to.respondTo('bar');
   *     expect(obj).to.respondTo('bar');
   *
   * To check if a constructor will respond to a static function,
   * set the `itself` flag.
   *
   *     Klass.baz = function(){};
   *     expect(Klass).itself.to.respondTo('baz');
   *
   * @name respondTo
   * @param {String} method
   * @param {String} message _optional_
   * @api public
   */

  Assertion.addMethod('respondTo', function (method, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , itself = flag(this, 'itself')
      , context = ('function' === _.type(obj) && !itself)
        ? obj.prototype[method]
        : obj[method];

    this.assert(
        'function' === typeof context
      , 'expected #{this} to respond to ' + _.inspect(method)
      , 'expected #{this} to not respond to ' + _.inspect(method)
    );
  });

  /**
   * ### .itself
   *
   * Sets the `itself` flag, later used by the `respondTo` assertion.
   *
   *     function Foo() {}
   *     Foo.bar = function() {}
   *     Foo.prototype.baz = function() {}
   *
   *     expect(Foo).itself.to.respondTo('bar');
   *     expect(Foo).itself.not.to.respondTo('baz');
   *
   * @name itself
   * @api public
   */

  Assertion.addProperty('itself', function () {
    flag(this, 'itself', true);
  });

  /**
   * ### .satisfy(method)
   *
   * Asserts that the target passes a given truth test.
   *
   *     expect(1).to.satisfy(function(num) { return num > 0; });
   *
   * @name satisfy
   * @param {Function} matcher
   * @param {String} message _optional_
   * @api public
   */

  Assertion.addMethod('satisfy', function (matcher, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    this.assert(
        matcher(obj)
      , 'expected #{this} to satisfy ' + _.objDisplay(matcher)
      , 'expected #{this} to not satisfy' + _.objDisplay(matcher)
      , this.negate ? false : true
      , matcher(obj)
    );
  });

  /**
   * ### .closeTo(expected, delta)
   *
   * Asserts that the target is equal `expected`, to within a +/- `delta` range.
   *
   *     expect(1.5).to.be.closeTo(1, 0.5);
   *
   * @name closeTo
   * @param {Number} expected
   * @param {Number} delta
   * @param {String} message _optional_
   * @api public
   */

  Assertion.addMethod('closeTo', function (expected, delta, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    this.assert(
        Math.abs(obj - expected) <= delta
      , 'expected #{this} to be close to ' + expected + ' +/- ' + delta
      , 'expected #{this} not to be close to ' + expected + ' +/- ' + delta
    );
  });

  function isSubsetOf(subset, superset) {
    return subset.every(function(elem) {
      return superset.indexOf(elem) !== -1;
    })
  }

  /**
   * ### .members(set)
   *
   * Asserts that the target is a superset of `set`,
   * or that the target and `set` have the same members.
   *
   *     expect([1, 2, 3]).to.include.members([3, 2]);
   *     expect([1, 2, 3]).to.not.include.members([3, 2, 8]);
   *
   *     expect([4, 2]).to.have.members([2, 4]);
   *     expect([5, 2]).to.not.have.members([5, 2, 1]);
   *
   * @name members
   * @param {Array} set
   * @param {String} message _optional_
   * @api public
   */

  Assertion.addMethod('members', function (subset, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');

    new Assertion(obj).to.be.an('array');
    new Assertion(subset).to.be.an('array');

    if (flag(this, 'contains')) {
      return this.assert(
          isSubsetOf(subset, obj)
        , 'expected #{this} to be a superset of #{act}'
        , 'expected #{this} to not be a superset of #{act}'
        , obj
        , subset
      );
    }

    this.assert(
        isSubsetOf(obj, subset) && isSubsetOf(subset, obj)
        , 'expected #{this} to have the same members as #{act}'
        , 'expected #{this} to not have the same members as #{act}'
        , obj
        , subset
    );
  });
};

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/chai/lib/chai/core/assertions.js","/../../../node_modules/chai/lib/chai/core")
},{"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36}],9:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */


module.exports = function (chai, util) {

  /*!
   * Chai dependencies.
   */

  var Assertion = chai.Assertion
    , flag = util.flag;

  /*!
   * Module export.
   */

  /**
   * ### assert(expression, message)
   *
   * Write your own test expressions.
   *
   *     assert('foo' !== 'bar', 'foo is not bar');
   *     assert(Array.isArray([]), 'empty arrays are arrays');
   *
   * @param {Mixed} expression to test for truthiness
   * @param {String} message to display on error
   * @name assert
   * @api public
   */

  var assert = chai.assert = function (express, errmsg) {
    var test = new Assertion(null);
    test.assert(
        express
      , errmsg
      , '[ negation message unavailable ]'
    );
  };

  /**
   * ### .fail(actual, expected, [message], [operator])
   *
   * Throw a failure. Node.js `assert` module-compatible.
   *
   * @name fail
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @param {String} operator
   * @api public
   */

  assert.fail = function (actual, expected, message, operator) {
    message = message || 'assert.fail()';
    throw new chai.AssertionError(message, {
        actual: actual
      , expected: expected
      , operator: operator
    }, assert.fail);
  };

  /**
   * ### .ok(object, [message])
   *
   * Asserts that `object` is truthy.
   *
   *     assert.ok('everything', 'everything is ok');
   *     assert.ok(false, 'this will fail');
   *
   * @name ok
   * @param {Mixed} object to test
   * @param {String} message
   * @api public
   */

  assert.ok = function (val, msg) {
    new Assertion(val, msg).is.ok;
  };

  /**
   * ### .notOk(object, [message])
   *
   * Asserts that `object` is falsy.
   *
   *     assert.notOk('everything', 'this will fail');
   *     assert.notOk(false, 'this will pass');
   *
   * @name notOk
   * @param {Mixed} object to test
   * @param {String} message
   * @api public
   */

  assert.notOk = function (val, msg) {
    new Assertion(val, msg).is.not.ok;
  };

  /**
   * ### .equal(actual, expected, [message])
   *
   * Asserts non-strict equality (`==`) of `actual` and `expected`.
   *
   *     assert.equal(3, '3', '== coerces values to strings');
   *
   * @name equal
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @api public
   */

  assert.equal = function (act, exp, msg) {
    var test = new Assertion(act, msg);

    test.assert(
        exp == flag(test, 'object')
      , 'expected #{this} to equal #{exp}'
      , 'expected #{this} to not equal #{act}'
      , exp
      , act
    );
  };

  /**
   * ### .notEqual(actual, expected, [message])
   *
   * Asserts non-strict inequality (`!=`) of `actual` and `expected`.
   *
   *     assert.notEqual(3, 4, 'these numbers are not equal');
   *
   * @name notEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @api public
   */

  assert.notEqual = function (act, exp, msg) {
    var test = new Assertion(act, msg);

    test.assert(
        exp != flag(test, 'object')
      , 'expected #{this} to not equal #{exp}'
      , 'expected #{this} to equal #{act}'
      , exp
      , act
    );
  };

  /**
   * ### .strictEqual(actual, expected, [message])
   *
   * Asserts strict equality (`===`) of `actual` and `expected`.
   *
   *     assert.strictEqual(true, true, 'these booleans are strictly equal');
   *
   * @name strictEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @api public
   */

  assert.strictEqual = function (act, exp, msg) {
    new Assertion(act, msg).to.equal(exp);
  };

  /**
   * ### .notStrictEqual(actual, expected, [message])
   *
   * Asserts strict inequality (`!==`) of `actual` and `expected`.
   *
   *     assert.notStrictEqual(3, '3', 'no coercion for strict equality');
   *
   * @name notStrictEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @api public
   */

  assert.notStrictEqual = function (act, exp, msg) {
    new Assertion(act, msg).to.not.equal(exp);
  };

  /**
   * ### .deepEqual(actual, expected, [message])
   *
   * Asserts that `actual` is deeply equal to `expected`.
   *
   *     assert.deepEqual({ tea: 'green' }, { tea: 'green' });
   *
   * @name deepEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @api public
   */

  assert.deepEqual = function (act, exp, msg) {
    new Assertion(act, msg).to.eql(exp);
  };

  /**
   * ### .notDeepEqual(actual, expected, [message])
   *
   * Assert that `actual` is not deeply equal to `expected`.
   *
   *     assert.notDeepEqual({ tea: 'green' }, { tea: 'jasmine' });
   *
   * @name notDeepEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @api public
   */

  assert.notDeepEqual = function (act, exp, msg) {
    new Assertion(act, msg).to.not.eql(exp);
  };

  /**
   * ### .isTrue(value, [message])
   *
   * Asserts that `value` is true.
   *
   *     var teaServed = true;
   *     assert.isTrue(teaServed, 'the tea has been served');
   *
   * @name isTrue
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isTrue = function (val, msg) {
    new Assertion(val, msg).is['true'];
  };

  /**
   * ### .isFalse(value, [message])
   *
   * Asserts that `value` is false.
   *
   *     var teaServed = false;
   *     assert.isFalse(teaServed, 'no tea yet? hmm...');
   *
   * @name isFalse
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isFalse = function (val, msg) {
    new Assertion(val, msg).is['false'];
  };

  /**
   * ### .isNull(value, [message])
   *
   * Asserts that `value` is null.
   *
   *     assert.isNull(err, 'there was no error');
   *
   * @name isNull
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isNull = function (val, msg) {
    new Assertion(val, msg).to.equal(null);
  };

  /**
   * ### .isNotNull(value, [message])
   *
   * Asserts that `value` is not null.
   *
   *     var tea = 'tasty chai';
   *     assert.isNotNull(tea, 'great, time for tea!');
   *
   * @name isNotNull
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isNotNull = function (val, msg) {
    new Assertion(val, msg).to.not.equal(null);
  };

  /**
   * ### .isUndefined(value, [message])
   *
   * Asserts that `value` is `undefined`.
   *
   *     var tea;
   *     assert.isUndefined(tea, 'no tea defined');
   *
   * @name isUndefined
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isUndefined = function (val, msg) {
    new Assertion(val, msg).to.equal(undefined);
  };

  /**
   * ### .isDefined(value, [message])
   *
   * Asserts that `value` is not `undefined`.
   *
   *     var tea = 'cup of chai';
   *     assert.isDefined(tea, 'tea has been defined');
   *
   * @name isDefined
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isDefined = function (val, msg) {
    new Assertion(val, msg).to.not.equal(undefined);
  };

  /**
   * ### .isFunction(value, [message])
   *
   * Asserts that `value` is a function.
   *
   *     function serveTea() { return 'cup of tea'; };
   *     assert.isFunction(serveTea, 'great, we can have tea now');
   *
   * @name isFunction
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isFunction = function (val, msg) {
    new Assertion(val, msg).to.be.a('function');
  };

  /**
   * ### .isNotFunction(value, [message])
   *
   * Asserts that `value` is _not_ a function.
   *
   *     var serveTea = [ 'heat', 'pour', 'sip' ];
   *     assert.isNotFunction(serveTea, 'great, we have listed the steps');
   *
   * @name isNotFunction
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isNotFunction = function (val, msg) {
    new Assertion(val, msg).to.not.be.a('function');
  };

  /**
   * ### .isObject(value, [message])
   *
   * Asserts that `value` is an object (as revealed by
   * `Object.prototype.toString`).
   *
   *     var selection = { name: 'Chai', serve: 'with spices' };
   *     assert.isObject(selection, 'tea selection is an object');
   *
   * @name isObject
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isObject = function (val, msg) {
    new Assertion(val, msg).to.be.a('object');
  };

  /**
   * ### .isNotObject(value, [message])
   *
   * Asserts that `value` is _not_ an object.
   *
   *     var selection = 'chai'
   *     assert.isObject(selection, 'tea selection is not an object');
   *     assert.isObject(null, 'null is not an object');
   *
   * @name isNotObject
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isNotObject = function (val, msg) {
    new Assertion(val, msg).to.not.be.a('object');
  };

  /**
   * ### .isArray(value, [message])
   *
   * Asserts that `value` is an array.
   *
   *     var menu = [ 'green', 'chai', 'oolong' ];
   *     assert.isArray(menu, 'what kind of tea do we want?');
   *
   * @name isArray
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isArray = function (val, msg) {
    new Assertion(val, msg).to.be.an('array');
  };

  /**
   * ### .isNotArray(value, [message])
   *
   * Asserts that `value` is _not_ an array.
   *
   *     var menu = 'green|chai|oolong';
   *     assert.isNotArray(menu, 'what kind of tea do we want?');
   *
   * @name isNotArray
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isNotArray = function (val, msg) {
    new Assertion(val, msg).to.not.be.an('array');
  };

  /**
   * ### .isString(value, [message])
   *
   * Asserts that `value` is a string.
   *
   *     var teaOrder = 'chai';
   *     assert.isString(teaOrder, 'order placed');
   *
   * @name isString
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isString = function (val, msg) {
    new Assertion(val, msg).to.be.a('string');
  };

  /**
   * ### .isNotString(value, [message])
   *
   * Asserts that `value` is _not_ a string.
   *
   *     var teaOrder = 4;
   *     assert.isNotString(teaOrder, 'order placed');
   *
   * @name isNotString
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isNotString = function (val, msg) {
    new Assertion(val, msg).to.not.be.a('string');
  };

  /**
   * ### .isNumber(value, [message])
   *
   * Asserts that `value` is a number.
   *
   *     var cups = 2;
   *     assert.isNumber(cups, 'how many cups');
   *
   * @name isNumber
   * @param {Number} value
   * @param {String} message
   * @api public
   */

  assert.isNumber = function (val, msg) {
    new Assertion(val, msg).to.be.a('number');
  };

  /**
   * ### .isNotNumber(value, [message])
   *
   * Asserts that `value` is _not_ a number.
   *
   *     var cups = '2 cups please';
   *     assert.isNotNumber(cups, 'how many cups');
   *
   * @name isNotNumber
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isNotNumber = function (val, msg) {
    new Assertion(val, msg).to.not.be.a('number');
  };

  /**
   * ### .isBoolean(value, [message])
   *
   * Asserts that `value` is a boolean.
   *
   *     var teaReady = true
   *       , teaServed = false;
   *
   *     assert.isBoolean(teaReady, 'is the tea ready');
   *     assert.isBoolean(teaServed, 'has tea been served');
   *
   * @name isBoolean
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isBoolean = function (val, msg) {
    new Assertion(val, msg).to.be.a('boolean');
  };

  /**
   * ### .isNotBoolean(value, [message])
   *
   * Asserts that `value` is _not_ a boolean.
   *
   *     var teaReady = 'yep'
   *       , teaServed = 'nope';
   *
   *     assert.isNotBoolean(teaReady, 'is the tea ready');
   *     assert.isNotBoolean(teaServed, 'has tea been served');
   *
   * @name isNotBoolean
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.isNotBoolean = function (val, msg) {
    new Assertion(val, msg).to.not.be.a('boolean');
  };

  /**
   * ### .typeOf(value, name, [message])
   *
   * Asserts that `value`'s type is `name`, as determined by
   * `Object.prototype.toString`.
   *
   *     assert.typeOf({ tea: 'chai' }, 'object', 'we have an object');
   *     assert.typeOf(['chai', 'jasmine'], 'array', 'we have an array');
   *     assert.typeOf('tea', 'string', 'we have a string');
   *     assert.typeOf(/tea/, 'regexp', 'we have a regular expression');
   *     assert.typeOf(null, 'null', 'we have a null');
   *     assert.typeOf(undefined, 'undefined', 'we have an undefined');
   *
   * @name typeOf
   * @param {Mixed} value
   * @param {String} name
   * @param {String} message
   * @api public
   */

  assert.typeOf = function (val, type, msg) {
    new Assertion(val, msg).to.be.a(type);
  };

  /**
   * ### .notTypeOf(value, name, [message])
   *
   * Asserts that `value`'s type is _not_ `name`, as determined by
   * `Object.prototype.toString`.
   *
   *     assert.notTypeOf('tea', 'number', 'strings are not numbers');
   *
   * @name notTypeOf
   * @param {Mixed} value
   * @param {String} typeof name
   * @param {String} message
   * @api public
   */

  assert.notTypeOf = function (val, type, msg) {
    new Assertion(val, msg).to.not.be.a(type);
  };

  /**
   * ### .instanceOf(object, constructor, [message])
   *
   * Asserts that `value` is an instance of `constructor`.
   *
   *     var Tea = function (name) { this.name = name; }
   *       , chai = new Tea('chai');
   *
   *     assert.instanceOf(chai, Tea, 'chai is an instance of tea');
   *
   * @name instanceOf
   * @param {Object} object
   * @param {Constructor} constructor
   * @param {String} message
   * @api public
   */

  assert.instanceOf = function (val, type, msg) {
    new Assertion(val, msg).to.be.instanceOf(type);
  };

  /**
   * ### .notInstanceOf(object, constructor, [message])
   *
   * Asserts `value` is not an instance of `constructor`.
   *
   *     var Tea = function (name) { this.name = name; }
   *       , chai = new String('chai');
   *
   *     assert.notInstanceOf(chai, Tea, 'chai is not an instance of tea');
   *
   * @name notInstanceOf
   * @param {Object} object
   * @param {Constructor} constructor
   * @param {String} message
   * @api public
   */

  assert.notInstanceOf = function (val, type, msg) {
    new Assertion(val, msg).to.not.be.instanceOf(type);
  };

  /**
   * ### .include(haystack, needle, [message])
   *
   * Asserts that `haystack` includes `needle`. Works
   * for strings and arrays.
   *
   *     assert.include('foobar', 'bar', 'foobar contains string "bar"');
   *     assert.include([ 1, 2, 3 ], 3, 'array contains value');
   *
   * @name include
   * @param {Array|String} haystack
   * @param {Mixed} needle
   * @param {String} message
   * @api public
   */

  assert.include = function (exp, inc, msg) {
    new Assertion(exp, msg).include(inc);
  };

  /**
   * ### .notInclude(haystack, needle, [message])
   *
   * Asserts that `haystack` does not include `needle`. Works
   * for strings and arrays.
   *i
   *     assert.notInclude('foobar', 'baz', 'string not include substring');
   *     assert.notInclude([ 1, 2, 3 ], 4, 'array not include contain value');
   *
   * @name notInclude
   * @param {Array|String} haystack
   * @param {Mixed} needle
   * @param {String} message
   * @api public
   */

  assert.notInclude = function (exp, inc, msg) {
    new Assertion(exp, msg).not.include(inc);
  };

  /**
   * ### .match(value, regexp, [message])
   *
   * Asserts that `value` matches the regular expression `regexp`.
   *
   *     assert.match('foobar', /^foo/, 'regexp matches');
   *
   * @name match
   * @param {Mixed} value
   * @param {RegExp} regexp
   * @param {String} message
   * @api public
   */

  assert.match = function (exp, re, msg) {
    new Assertion(exp, msg).to.match(re);
  };

  /**
   * ### .notMatch(value, regexp, [message])
   *
   * Asserts that `value` does not match the regular expression `regexp`.
   *
   *     assert.notMatch('foobar', /^foo/, 'regexp does not match');
   *
   * @name notMatch
   * @param {Mixed} value
   * @param {RegExp} regexp
   * @param {String} message
   * @api public
   */

  assert.notMatch = function (exp, re, msg) {
    new Assertion(exp, msg).to.not.match(re);
  };

  /**
   * ### .property(object, property, [message])
   *
   * Asserts that `object` has a property named by `property`.
   *
   *     assert.property({ tea: { green: 'matcha' }}, 'tea');
   *
   * @name property
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @api public
   */

  assert.property = function (obj, prop, msg) {
    new Assertion(obj, msg).to.have.property(prop);
  };

  /**
   * ### .notProperty(object, property, [message])
   *
   * Asserts that `object` does _not_ have a property named by `property`.
   *
   *     assert.notProperty({ tea: { green: 'matcha' }}, 'coffee');
   *
   * @name notProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @api public
   */

  assert.notProperty = function (obj, prop, msg) {
    new Assertion(obj, msg).to.not.have.property(prop);
  };

  /**
   * ### .deepProperty(object, property, [message])
   *
   * Asserts that `object` has a property named by `property`, which can be a
   * string using dot- and bracket-notation for deep reference.
   *
   *     assert.deepProperty({ tea: { green: 'matcha' }}, 'tea.green');
   *
   * @name deepProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @api public
   */

  assert.deepProperty = function (obj, prop, msg) {
    new Assertion(obj, msg).to.have.deep.property(prop);
  };

  /**
   * ### .notDeepProperty(object, property, [message])
   *
   * Asserts that `object` does _not_ have a property named by `property`, which
   * can be a string using dot- and bracket-notation for deep reference.
   *
   *     assert.notDeepProperty({ tea: { green: 'matcha' }}, 'tea.oolong');
   *
   * @name notDeepProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @api public
   */

  assert.notDeepProperty = function (obj, prop, msg) {
    new Assertion(obj, msg).to.not.have.deep.property(prop);
  };

  /**
   * ### .propertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a property named by `property` with value given
   * by `value`.
   *
   *     assert.propertyVal({ tea: 'is good' }, 'tea', 'is good');
   *
   * @name propertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.propertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg).to.have.property(prop, val);
  };

  /**
   * ### .propertyNotVal(object, property, value, [message])
   *
   * Asserts that `object` has a property named by `property`, but with a value
   * different from that given by `value`.
   *
   *     assert.propertyNotVal({ tea: 'is good' }, 'tea', 'is bad');
   *
   * @name propertyNotVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.propertyNotVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg).to.not.have.property(prop, val);
  };

  /**
   * ### .deepPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a property named by `property` with value given
   * by `value`. `property` can use dot- and bracket-notation for deep
   * reference.
   *
   *     assert.deepPropertyVal({ tea: { green: 'matcha' }}, 'tea.green', 'matcha');
   *
   * @name deepPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.deepPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg).to.have.deep.property(prop, val);
  };

  /**
   * ### .deepPropertyNotVal(object, property, value, [message])
   *
   * Asserts that `object` has a property named by `property`, but with a value
   * different from that given by `value`. `property` can use dot- and
   * bracket-notation for deep reference.
   *
   *     assert.deepPropertyNotVal({ tea: { green: 'matcha' }}, 'tea.green', 'konacha');
   *
   * @name deepPropertyNotVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.deepPropertyNotVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg).to.not.have.deep.property(prop, val);
  };

  /**
   * ### .lengthOf(object, length, [message])
   *
   * Asserts that `object` has a `length` property with the expected value.
   *
   *     assert.lengthOf([1,2,3], 3, 'array has length of 3');
   *     assert.lengthOf('foobar', 5, 'string has length of 6');
   *
   * @name lengthOf
   * @param {Mixed} object
   * @param {Number} length
   * @param {String} message
   * @api public
   */

  assert.lengthOf = function (exp, len, msg) {
    new Assertion(exp, msg).to.have.length(len);
  };

  /**
   * ### .throws(function, [constructor/string/regexp], [string/regexp], [message])
   *
   * Asserts that `function` will throw an error that is an instance of
   * `constructor`, or alternately that it will throw an error with message
   * matching `regexp`.
   *
   *     assert.throw(fn, 'function throws a reference error');
   *     assert.throw(fn, /function throws a reference error/);
   *     assert.throw(fn, ReferenceError);
   *     assert.throw(fn, ReferenceError, 'function throws a reference error');
   *     assert.throw(fn, ReferenceError, /function throws a reference error/);
   *
   * @name throws
   * @alias throw
   * @alias Throw
   * @param {Function} function
   * @param {ErrorConstructor} constructor
   * @param {RegExp} regexp
   * @param {String} message
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
   * @api public
   */

  assert.Throw = function (fn, errt, errs, msg) {
    if ('string' === typeof errt || errt instanceof RegExp) {
      errs = errt;
      errt = null;
    }

    var assertErr = new Assertion(fn, msg).to.Throw(errt, errs);
    return flag(assertErr, 'object');
  };

  /**
   * ### .doesNotThrow(function, [constructor/regexp], [message])
   *
   * Asserts that `function` will _not_ throw an error that is an instance of
   * `constructor`, or alternately that it will not throw an error with message
   * matching `regexp`.
   *
   *     assert.doesNotThrow(fn, Error, 'function does not throw');
   *
   * @name doesNotThrow
   * @param {Function} function
   * @param {ErrorConstructor} constructor
   * @param {RegExp} regexp
   * @param {String} message
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
   * @api public
   */

  assert.doesNotThrow = function (fn, type, msg) {
    if ('string' === typeof type) {
      msg = type;
      type = null;
    }

    new Assertion(fn, msg).to.not.Throw(type);
  };

  /**
   * ### .operator(val1, operator, val2, [message])
   *
   * Compares two values using `operator`.
   *
   *     assert.operator(1, '<', 2, 'everything is ok');
   *     assert.operator(1, '>', 2, 'this will fail');
   *
   * @name operator
   * @param {Mixed} val1
   * @param {String} operator
   * @param {Mixed} val2
   * @param {String} message
   * @api public
   */

  assert.operator = function (val, operator, val2, msg) {
    if (!~['==', '===', '>', '>=', '<', '<=', '!=', '!=='].indexOf(operator)) {
      throw new Error('Invalid operator "' + operator + '"');
    }
    var test = new Assertion(eval(val + operator + val2), msg);
    test.assert(
        true === flag(test, 'object')
      , 'expected ' + util.inspect(val) + ' to be ' + operator + ' ' + util.inspect(val2)
      , 'expected ' + util.inspect(val) + ' to not be ' + operator + ' ' + util.inspect(val2) );
  };

  /**
   * ### .closeTo(actual, expected, delta, [message])
   *
   * Asserts that the target is equal `expected`, to within a +/- `delta` range.
   *
   *     assert.closeTo(1.5, 1, 0.5, 'numbers are close');
   *
   * @name closeTo
   * @param {Number} actual
   * @param {Number} expected
   * @param {Number} delta
   * @param {String} message
   * @api public
   */

  assert.closeTo = function (act, exp, delta, msg) {
    new Assertion(act, msg).to.be.closeTo(exp, delta);
  };

  /**
   * ### .sameMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` have the same members.
   * Order is not taken into account.
   *
   *     assert.sameMembers([ 1, 2, 3 ], [ 2, 1, 3 ], 'same members');
   *
   * @name sameMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @api public
   */

  assert.sameMembers = function (set1, set2, msg) {
    new Assertion(set1, msg).to.have.same.members(set2);
  }

  /**
   * ### .includeMembers(superset, subset, [message])
   *
   * Asserts that `subset` is included in `superset`.
   * Order is not taken into account.
   *
   *     assert.includeMembers([ 1, 2, 3 ], [ 2, 1 ], 'include members');
   *
   * @name includeMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @api public
   */

  assert.includeMembers = function (superset, subset, msg) {
    new Assertion(superset, msg).to.include.members(subset);
  }

  /*!
   * Undocumented / untested
   */

  assert.ifError = function (val, msg) {
    new Assertion(val, msg).to.not.be.ok;
  };

  /*!
   * Aliases.
   */

  (function alias(name, as){
    assert[as] = assert[name];
    return alias;
  })
  ('Throw', 'throw')
  ('Throw', 'throws');
};

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/chai/lib/chai/interface/assert.js","/../../../node_modules/chai/lib/chai/interface")
},{"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36}],10:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

module.exports = function (chai, util) {
  chai.expect = function (val, message) {
    return new chai.Assertion(val, message);
  };
};


}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/chai/lib/chai/interface/expect.js","/../../../node_modules/chai/lib/chai/interface")
},{"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36}],11:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

module.exports = function (chai, util) {
  var Assertion = chai.Assertion;

  function loadShould () {
    // modify Object.prototype to have `should`
    Object.defineProperty(Object.prototype, 'should',
      {
        set: function (value) {
          // See https://github.com/chaijs/chai/issues/86: this makes
          // `whatever.should = someValue` actually set `someValue`, which is
          // especially useful for `global.should = require('chai').should()`.
          //
          // Note that we have to use [[DefineProperty]] instead of [[Put]]
          // since otherwise we would trigger this very setter!
          Object.defineProperty(this, 'should', {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        }
      , get: function(){
          if (this instanceof String || this instanceof Number) {
            return new Assertion(this.constructor(this));
          } else if (this instanceof Boolean) {
            return new Assertion(this == true);
          }
          return new Assertion(this);
        }
      , configurable: true
    });

    var should = {};

    should.equal = function (val1, val2, msg) {
      new Assertion(val1, msg).to.equal(val2);
    };

    should.Throw = function (fn, errt, errs, msg) {
      new Assertion(fn, msg).to.Throw(errt, errs);
    };

    should.exist = function (val, msg) {
      new Assertion(val, msg).to.exist;
    }

    // negation
    should.not = {}

    should.not.equal = function (val1, val2, msg) {
      new Assertion(val1, msg).to.not.equal(val2);
    };

    should.not.Throw = function (fn, errt, errs, msg) {
      new Assertion(fn, msg).to.not.Throw(errt, errs);
    };

    should.not.exist = function (val, msg) {
      new Assertion(val, msg).to.not.exist;
    }

    should['throw'] = should['Throw'];
    should.not['throw'] = should.not['Throw'];

    return should;
  };

  chai.should = loadShould;
  chai.Should = loadShould;
};

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/chai/lib/chai/interface/should.js","/../../../node_modules/chai/lib/chai/interface")
},{"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36}],12:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * Chai - addChainingMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

var transferFlags = require('./transferFlags');

/*!
 * Module variables
 */

// Check whether `__proto__` is supported
var hasProtoSupport = '__proto__' in Object;

// Without `__proto__` support, this module will need to add properties to a function.
// However, some Function.prototype methods cannot be overwritten,
// and there seems no easy cross-platform way to detect them (@see chaijs/chai/issues/69).
var excludeNames = /^(?:length|name|arguments|caller)$/;

// Cache `Function` properties
var call  = Function.prototype.call,
    apply = Function.prototype.apply;

/**
 * ### addChainableMethod (ctx, name, method, chainingBehavior)
 *
 * Adds a method to an object, such that the method can also be chained.
 *
 *     utils.addChainableMethod(chai.Assertion.prototype, 'foo', function (str) {
 *       var obj = utils.flag(this, 'object');
 *       new chai.Assertion(obj).to.be.equal(str);
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.addChainableMethod('foo', fn, chainingBehavior);
 *
 * The result can then be used as both a method assertion, executing both `method` and
 * `chainingBehavior`, or as a language chain, which only executes `chainingBehavior`.
 *
 *     expect(fooStr).to.be.foo('bar');
 *     expect(fooStr).to.be.foo.equal('foo');
 *
 * @param {Object} ctx object to which the method is added
 * @param {String} name of method to add
 * @param {Function} method function to be used for `name`, when called
 * @param {Function} chainingBehavior function to be called every time the property is accessed
 * @name addChainableMethod
 * @api public
 */

module.exports = function (ctx, name, method, chainingBehavior) {
  if (typeof chainingBehavior !== 'function') {
    chainingBehavior = function () { };
  }

  var chainableBehavior = {
      method: method
    , chainingBehavior: chainingBehavior
  };

  // save the methods so we can overwrite them later, if we need to.
  if (!ctx.__methods) {
    ctx.__methods = {};
  }
  ctx.__methods[name] = chainableBehavior;

  Object.defineProperty(ctx, name,
    { get: function () {
        chainableBehavior.chainingBehavior.call(this);

        var assert = function () {
          var result = chainableBehavior.method.apply(this, arguments);
          return result === undefined ? this : result;
        };

        // Use `__proto__` if available
        if (hasProtoSupport) {
          // Inherit all properties from the object by replacing the `Function` prototype
          var prototype = assert.__proto__ = Object.create(this);
          // Restore the `call` and `apply` methods from `Function`
          prototype.call = call;
          prototype.apply = apply;
        }
        // Otherwise, redefine all properties (slow!)
        else {
          var asserterNames = Object.getOwnPropertyNames(ctx);
          asserterNames.forEach(function (asserterName) {
            if (!excludeNames.test(asserterName)) {
              var pd = Object.getOwnPropertyDescriptor(ctx, asserterName);
              Object.defineProperty(assert, asserterName, pd);
            }
          });
        }

        transferFlags(this, assert);
        return assert;
      }
    , configurable: true
  });
};

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/chai/lib/chai/utils/addChainableMethod.js","/../../../node_modules/chai/lib/chai/utils")
},{"./transferFlags":29,"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36}],13:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * Chai - addMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .addMethod (ctx, name, method)
 *
 * Adds a method to the prototype of an object.
 *
 *     utils.addMethod(chai.Assertion.prototype, 'foo', function (str) {
 *       var obj = utils.flag(this, 'object');
 *       new chai.Assertion(obj).to.be.equal(str);
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.addMethod('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(fooStr).to.be.foo('bar');
 *
 * @param {Object} ctx object to which the method is added
 * @param {String} name of method to add
 * @param {Function} method function to be used for name
 * @name addMethod
 * @api public
 */

module.exports = function (ctx, name, method) {
  ctx[name] = function () {
    var result = method.apply(this, arguments);
    return result === undefined ? this : result;
  };
};

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/chai/lib/chai/utils/addMethod.js","/../../../node_modules/chai/lib/chai/utils")
},{"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36}],14:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * Chai - addProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### addProperty (ctx, name, getter)
 *
 * Adds a property to the prototype of an object.
 *
 *     utils.addProperty(chai.Assertion.prototype, 'foo', function () {
 *       var obj = utils.flag(this, 'object');
 *       new chai.Assertion(obj).to.be.instanceof(Foo);
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.addProperty('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.be.foo;
 *
 * @param {Object} ctx object to which the property is added
 * @param {String} name of property to add
 * @param {Function} getter function to be used for name
 * @name addProperty
 * @api public
 */

module.exports = function (ctx, name, getter) {
  Object.defineProperty(ctx, name,
    { get: function () {
        var result = getter.call(this);
        return result === undefined ? this : result;
      }
    , configurable: true
  });
};

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/chai/lib/chai/utils/addProperty.js","/../../../node_modules/chai/lib/chai/utils")
},{"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36}],15:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * Chai - flag utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### flag(object ,key, [value])
 *
 * Get or set a flag value on an object. If a
 * value is provided it will be set, else it will
 * return the currently set value or `undefined` if
 * the value is not set.
 *
 *     utils.flag(this, 'foo', 'bar'); // setter
 *     utils.flag(this, 'foo'); // getter, returns `bar`
 *
 * @param {Object} object (constructed Assertion
 * @param {String} key
 * @param {Mixed} value (optional)
 * @name flag
 * @api private
 */

module.exports = function (obj, key, value) {
  var flags = obj.__flags || (obj.__flags = Object.create(null));
  if (arguments.length === 3) {
    flags[key] = value;
  } else {
    return flags[key];
  }
};

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/chai/lib/chai/utils/flag.js","/../../../node_modules/chai/lib/chai/utils")
},{"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36}],16:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * Chai - getActual utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * # getActual(object, [actual])
 *
 * Returns the `actual` value for an Assertion
 *
 * @param {Object} object (constructed Assertion)
 * @param {Arguments} chai.Assertion.prototype.assert arguments
 */

module.exports = function (obj, args) {
  var actual = args[4];
  return 'undefined' !== typeof actual ? actual : obj._obj;
};

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/chai/lib/chai/utils/getActual.js","/../../../node_modules/chai/lib/chai/utils")
},{"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36}],17:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * Chai - getEnumerableProperties utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getEnumerableProperties(object)
 *
 * This allows the retrieval of enumerable property names of an object,
 * inherited or not.
 *
 * @param {Object} object
 * @returns {Array}
 * @name getEnumerableProperties
 * @api public
 */

module.exports = function getEnumerableProperties(object) {
  var result = [];
  for (var name in object) {
    result.push(name);
  }
  return result;
};

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/chai/lib/chai/utils/getEnumerableProperties.js","/../../../node_modules/chai/lib/chai/utils")
},{"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36}],18:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * Chai - message composition utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependancies
 */

var flag = require('./flag')
  , getActual = require('./getActual')
  , inspect = require('./inspect')
  , objDisplay = require('./objDisplay');

/**
 * ### .getMessage(object, message, negateMessage)
 *
 * Construct the error message based on flags
 * and template tags. Template tags will return
 * a stringified inspection of the object referenced.
 *
 * Message template tags:
 * - `#{this}` current asserted object
 * - `#{act}` actual value
 * - `#{exp}` expected value
 *
 * @param {Object} object (constructed Assertion)
 * @param {Arguments} chai.Assertion.prototype.assert arguments
 * @name getMessage
 * @api public
 */

module.exports = function (obj, args) {
  var negate = flag(obj, 'negate')
    , val = flag(obj, 'object')
    , expected = args[3]
    , actual = getActual(obj, args)
    , msg = negate ? args[2] : args[1]
    , flagMsg = flag(obj, 'message');

  msg = msg || '';
  msg = msg
    .replace(/#{this}/g, objDisplay(val))
    .replace(/#{act}/g, objDisplay(actual))
    .replace(/#{exp}/g, objDisplay(expected));

  return flagMsg ? flagMsg + ': ' + msg : msg;
};

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/chai/lib/chai/utils/getMessage.js","/../../../node_modules/chai/lib/chai/utils")
},{"./flag":15,"./getActual":16,"./inspect":23,"./objDisplay":24,"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36}],19:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * Chai - getName utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * # getName(func)
 *
 * Gets the name of a function, in a cross-browser way.
 *
 * @param {Function} a function (usually a constructor)
 */

module.exports = function (func) {
  if (func.name) return func.name;

  var match = /^\s?function ([^(]*)\(/.exec(func);
  return match && match[1] ? match[1] : "";
};

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/chai/lib/chai/utils/getName.js","/../../../node_modules/chai/lib/chai/utils")
},{"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36}],20:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * Chai - getPathValue utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * @see https://github.com/logicalparadox/filtr
 * MIT Licensed
 */

/**
 * ### .getPathValue(path, object)
 *
 * This allows the retrieval of values in an
 * object given a string path.
 *
 *     var obj = {
 *         prop1: {
 *             arr: ['a', 'b', 'c']
 *           , str: 'Hello'
 *         }
 *       , prop2: {
 *             arr: [ { nested: 'Universe' } ]
 *           , str: 'Hello again!'
 *         }
 *     }
 *
 * The following would be the results.
 *
 *     getPathValue('prop1.str', obj); // Hello
 *     getPathValue('prop1.att[2]', obj); // b
 *     getPathValue('prop2.arr[0].nested', obj); // Universe
 *
 * @param {String} path
 * @param {Object} object
 * @returns {Object} value or `undefined`
 * @name getPathValue
 * @api public
 */

var getPathValue = module.exports = function (path, obj) {
  var parsed = parsePath(path);
  return _getPathValue(parsed, obj);
};

/*!
 * ## parsePath(path)
 *
 * Helper function used to parse string object
 * paths. Use in conjunction with `_getPathValue`.
 *
 *      var parsed = parsePath('myobject.property.subprop');
 *
 * ### Paths:
 *
 * * Can be as near infinitely deep and nested
 * * Arrays are also valid using the formal `myobject.document[3].property`.
 *
 * @param {String} path
 * @returns {Object} parsed
 * @api private
 */

function parsePath (path) {
  var str = path.replace(/\[/g, '.[')
    , parts = str.match(/(\\\.|[^.]+?)+/g);
  return parts.map(function (value) {
    var re = /\[(\d+)\]$/
      , mArr = re.exec(value)
    if (mArr) return { i: parseFloat(mArr[1]) };
    else return { p: value };
  });
};

/*!
 * ## _getPathValue(parsed, obj)
 *
 * Helper companion function for `.parsePath` that returns
 * the value located at the parsed address.
 *
 *      var value = getPathValue(parsed, obj);
 *
 * @param {Object} parsed definition from `parsePath`.
 * @param {Object} object to search against
 * @returns {Object|Undefined} value
 * @api private
 */

function _getPathValue (parsed, obj) {
  var tmp = obj
    , res;
  for (var i = 0, l = parsed.length; i < l; i++) {
    var part = parsed[i];
    if (tmp) {
      if ('undefined' !== typeof part.p)
        tmp = tmp[part.p];
      else if ('undefined' !== typeof part.i)
        tmp = tmp[part.i];
      if (i == (l - 1)) res = tmp;
    } else {
      res = undefined;
    }
  }
  return res;
};

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/chai/lib/chai/utils/getPathValue.js","/../../../node_modules/chai/lib/chai/utils")
},{"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36}],21:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * Chai - getProperties utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getProperties(object)
 *
 * This allows the retrieval of property names of an object, enumerable or not,
 * inherited or not.
 *
 * @param {Object} object
 * @returns {Array}
 * @name getProperties
 * @api public
 */

module.exports = function getProperties(object) {
  var result = Object.getOwnPropertyNames(subject);

  function addProperty(property) {
    if (result.indexOf(property) === -1) {
      result.push(property);
    }
  }

  var proto = Object.getPrototypeOf(subject);
  while (proto !== null) {
    Object.getOwnPropertyNames(proto).forEach(addProperty);
    proto = Object.getPrototypeOf(proto);
  }

  return result;
};

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/chai/lib/chai/utils/getProperties.js","/../../../node_modules/chai/lib/chai/utils")
},{"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36}],22:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * chai
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Main exports
 */

var exports = module.exports = {};

/*!
 * test utility
 */

exports.test = require('./test');

/*!
 * type utility
 */

exports.type = require('./type');

/*!
 * message utility
 */

exports.getMessage = require('./getMessage');

/*!
 * actual utility
 */

exports.getActual = require('./getActual');

/*!
 * Inspect util
 */

exports.inspect = require('./inspect');

/*!
 * Object Display util
 */

exports.objDisplay = require('./objDisplay');

/*!
 * Flag utility
 */

exports.flag = require('./flag');

/*!
 * Flag transferring utility
 */

exports.transferFlags = require('./transferFlags');

/*!
 * Deep equal utility
 */

exports.eql = require('deep-eql');

/*!
 * Deep path value
 */

exports.getPathValue = require('./getPathValue');

/*!
 * Function name
 */

exports.getName = require('./getName');

/*!
 * add Property
 */

exports.addProperty = require('./addProperty');

/*!
 * add Method
 */

exports.addMethod = require('./addMethod');

/*!
 * overwrite Property
 */

exports.overwriteProperty = require('./overwriteProperty');

/*!
 * overwrite Method
 */

exports.overwriteMethod = require('./overwriteMethod');

/*!
 * Add a chainable method
 */

exports.addChainableMethod = require('./addChainableMethod');

/*!
 * Overwrite chainable method
 */

exports.overwriteChainableMethod = require('./overwriteChainableMethod');


}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/chai/lib/chai/utils/index.js","/../../../node_modules/chai/lib/chai/utils")
},{"./addChainableMethod":12,"./addMethod":13,"./addProperty":14,"./flag":15,"./getActual":16,"./getMessage":18,"./getName":19,"./getPathValue":20,"./inspect":23,"./objDisplay":24,"./overwriteChainableMethod":25,"./overwriteMethod":26,"./overwriteProperty":27,"./test":28,"./transferFlags":29,"./type":30,"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36,"deep-eql":32}],23:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// This is (almost) directly from Node.js utils
// https://github.com/joyent/node/blob/f8c335d0caf47f16d31413f89aa28eda3878e3aa/lib/util.js

var getName = require('./getName');
var getProperties = require('./getProperties');
var getEnumerableProperties = require('./getEnumerableProperties');

module.exports = inspect;

/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Boolean} showHidden Flag that shows hidden (not enumerable)
 *    properties of objects.
 * @param {Number} depth Depth in which to descend in object. Default is 2.
 * @param {Boolean} colors Flag to turn on ANSI escape codes to color the
 *    output. Default is false (no coloring).
 */
function inspect(obj, showHidden, depth, colors) {
  var ctx = {
    showHidden: showHidden,
    seen: [],
    stylize: function (str) { return str; }
  };
  return formatValue(ctx, obj, (typeof depth === 'undefined' ? 2 : depth));
}

// https://gist.github.com/1044128/
var getOuterHTML = function(element) {
  if ('outerHTML' in element) return element.outerHTML;
  var ns = "http://www.w3.org/1999/xhtml";
  var container = document.createElementNS(ns, '_');
  var elemProto = (window.HTMLElement || window.Element).prototype;
  var xmlSerializer = new XMLSerializer();
  var html;
  if (document.xmlVersion) {
    return xmlSerializer.serializeToString(element);
  } else {
    container.appendChild(element.cloneNode(false));
    html = container.innerHTML.replace('><', '>' + element.innerHTML + '<');
    container.innerHTML = '';
    return html;
  }
};

// Returns true if object is a DOM element.
var isDOMElement = function (object) {
  if (typeof HTMLElement === 'object') {
    return object instanceof HTMLElement;
  } else {
    return object &&
      typeof object === 'object' &&
      object.nodeType === 1 &&
      typeof object.nodeName === 'string';
  }
};

function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (value && typeof value.inspect === 'function' &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes);
    if (typeof ret !== 'string') {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // If it's DOM elem, get outer HTML.
  if (isDOMElement(value)) {
    return getOuterHTML(value);
  }

  // Look up the keys of the object.
  var visibleKeys = getEnumerableProperties(value);
  var keys = ctx.showHidden ? getProperties(value) : visibleKeys;

  // Some type of object without properties can be shortcutted.
  // In IE, errors have a single `stack` property, or if they are vanilla `Error`,
  // a `stack` plus `description` property; ignore those for consistency.
  if (keys.length === 0 || (isError(value) && (
      (keys.length === 1 && keys[0] === 'stack') ||
      (keys.length === 2 && keys[0] === 'description' && keys[1] === 'stack')
     ))) {
    if (typeof value === 'function') {
      var name = getName(value);
      var nameSuffix = name ? ': ' + name : '';
      return ctx.stylize('[Function' + nameSuffix + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toUTCString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (typeof value === 'function') {
    var name = getName(value);
    var nameSuffix = name ? ': ' + name : '';
    base = ' [Function' + nameSuffix + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    return formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  switch (typeof value) {
    case 'undefined':
      return ctx.stylize('undefined', 'undefined');

    case 'string':
      var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                               .replace(/'/g, "\\'")
                                               .replace(/\\"/g, '"') + '\'';
      return ctx.stylize(simple, 'string');

    case 'number':
      return ctx.stylize('' + value, 'number');

    case 'boolean':
      return ctx.stylize('' + value, 'boolean');
  }
  // For some reason typeof null is "object", so special case here.
  if (value === null) {
    return ctx.stylize('null', 'null');
  }
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (Object.prototype.hasOwnProperty.call(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str;
  if (value.__lookupGetter__) {
    if (value.__lookupGetter__(key)) {
      if (value.__lookupSetter__(key)) {
        str = ctx.stylize('[Getter/Setter]', 'special');
      } else {
        str = ctx.stylize('[Getter]', 'special');
      }
    } else {
      if (value.__lookupSetter__(key)) {
        str = ctx.stylize('[Setter]', 'special');
      }
    }
  }
  if (visibleKeys.indexOf(key) < 0) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(value[key]) < 0) {
      if (recurseTimes === null) {
        str = formatValue(ctx, value[key], null);
      } else {
        str = formatValue(ctx, value[key], recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (typeof name === 'undefined') {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}

function isArray(ar) {
  return Array.isArray(ar) ||
         (typeof ar === 'object' && objectToString(ar) === '[object Array]');
}

function isRegExp(re) {
  return typeof re === 'object' && objectToString(re) === '[object RegExp]';
}

function isDate(d) {
  return typeof d === 'object' && objectToString(d) === '[object Date]';
}

function isError(e) {
  return typeof e === 'object' && objectToString(e) === '[object Error]';
}

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/chai/lib/chai/utils/inspect.js","/../../../node_modules/chai/lib/chai/utils")
},{"./getEnumerableProperties":17,"./getName":19,"./getProperties":21,"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36}],24:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * Chai - flag utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependancies
 */

var inspect = require('./inspect');

/**
 * ### .objDisplay (object)
 *
 * Determines if an object or an array matches
 * criteria to be inspected in-line for error
 * messages or should be truncated.
 *
 * @param {Mixed} javascript object to inspect
 * @name objDisplay
 * @api public
 */

module.exports = function (obj) {
  var str = inspect(obj)
    , type = Object.prototype.toString.call(obj);

  if (str.length >= 40) {
    if (type === '[object Function]') {
      return !obj.name || obj.name === ''
        ? '[Function]'
        : '[Function: ' + obj.name + ']';
    } else if (type === '[object Array]') {
      return '[ Array(' + obj.length + ') ]';
    } else if (type === '[object Object]') {
      var keys = Object.keys(obj)
        , kstr = keys.length > 2
          ? keys.splice(0, 2).join(', ') + ', ...'
          : keys.join(', ');
      return '{ Object (' + kstr + ') }';
    } else {
      return str;
    }
  } else {
    return str;
  }
};

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/chai/lib/chai/utils/objDisplay.js","/../../../node_modules/chai/lib/chai/utils")
},{"./inspect":23,"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36}],25:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * Chai - overwriteChainableMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### overwriteChainableMethod (ctx, name, fn)
 *
 * Overwites an already existing chainable method
 * and provides access to the previous function or
 * property.  Must return functions to be used for
 * name.
 *
 *     utils.overwriteChainableMethod(chai.Assertion.prototype, 'length',
 *       function (_super) {
 *       }
 *     , function (_super) {
 *       }
 *     );
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.overwriteChainableMethod('foo', fn, fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.have.length(3);
 *     expect(myFoo).to.have.length.above(3);
 *
 * @param {Object} ctx object whose method / property is to be overwritten
 * @param {String} name of method / property to overwrite
 * @param {Function} method function that returns a function to be used for name
 * @param {Function} chainingBehavior function that returns a function to be used for property
 * @name overwriteChainableMethod
 * @api public
 */

module.exports = function (ctx, name, method, chainingBehavior) {
  var chainableBehavior = ctx.__methods[name];

  var _chainingBehavior = chainableBehavior.chainingBehavior;
  chainableBehavior.chainingBehavior = function () {
    var result = chainingBehavior(_chainingBehavior).call(this);
    return result === undefined ? this : result;
  };

  var _method = chainableBehavior.method;
  chainableBehavior.method = function () {
    var result = method(_method).apply(this, arguments);
    return result === undefined ? this : result;
  };
};

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/chai/lib/chai/utils/overwriteChainableMethod.js","/../../../node_modules/chai/lib/chai/utils")
},{"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36}],26:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * Chai - overwriteMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### overwriteMethod (ctx, name, fn)
 *
 * Overwites an already existing method and provides
 * access to previous function. Must return function
 * to be used for name.
 *
 *     utils.overwriteMethod(chai.Assertion.prototype, 'equal', function (_super) {
 *       return function (str) {
 *         var obj = utils.flag(this, 'object');
 *         if (obj instanceof Foo) {
 *           new chai.Assertion(obj.value).to.equal(str);
 *         } else {
 *           _super.apply(this, arguments);
 *         }
 *       }
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.overwriteMethod('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.equal('bar');
 *
 * @param {Object} ctx object whose method is to be overwritten
 * @param {String} name of method to overwrite
 * @param {Function} method function that returns a function to be used for name
 * @name overwriteMethod
 * @api public
 */

module.exports = function (ctx, name, method) {
  var _method = ctx[name]
    , _super = function () { return this; };

  if (_method && 'function' === typeof _method)
    _super = _method;

  ctx[name] = function () {
    var result = method(_super).apply(this, arguments);
    return result === undefined ? this : result;
  }
};

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/chai/lib/chai/utils/overwriteMethod.js","/../../../node_modules/chai/lib/chai/utils")
},{"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36}],27:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * Chai - overwriteProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### overwriteProperty (ctx, name, fn)
 *
 * Overwites an already existing property getter and provides
 * access to previous value. Must return function to use as getter.
 *
 *     utils.overwriteProperty(chai.Assertion.prototype, 'ok', function (_super) {
 *       return function () {
 *         var obj = utils.flag(this, 'object');
 *         if (obj instanceof Foo) {
 *           new chai.Assertion(obj.name).to.equal('bar');
 *         } else {
 *           _super.call(this);
 *         }
 *       }
 *     });
 *
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.overwriteProperty('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.be.ok;
 *
 * @param {Object} ctx object whose property is to be overwritten
 * @param {String} name of property to overwrite
 * @param {Function} getter function that returns a getter function to be used for name
 * @name overwriteProperty
 * @api public
 */

module.exports = function (ctx, name, getter) {
  var _get = Object.getOwnPropertyDescriptor(ctx, name)
    , _super = function () {};

  if (_get && 'function' === typeof _get.get)
    _super = _get.get

  Object.defineProperty(ctx, name,
    { get: function () {
        var result = getter(_super).call(this);
        return result === undefined ? this : result;
      }
    , configurable: true
  });
};

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/chai/lib/chai/utils/overwriteProperty.js","/../../../node_modules/chai/lib/chai/utils")
},{"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36}],28:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * Chai - test utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependancies
 */

var flag = require('./flag');

/**
 * # test(object, expression)
 *
 * Test and object for expression.
 *
 * @param {Object} object (constructed Assertion)
 * @param {Arguments} chai.Assertion.prototype.assert arguments
 */

module.exports = function (obj, args) {
  var negate = flag(obj, 'negate')
    , expr = args[0];
  return negate ? !expr : expr;
};

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/chai/lib/chai/utils/test.js","/../../../node_modules/chai/lib/chai/utils")
},{"./flag":15,"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36}],29:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * Chai - transferFlags utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### transferFlags(assertion, object, includeAll = true)
 *
 * Transfer all the flags for `assertion` to `object`. If
 * `includeAll` is set to `false`, then the base Chai
 * assertion flags (namely `object`, `ssfi`, and `message`)
 * will not be transferred.
 *
 *
 *     var newAssertion = new Assertion();
 *     utils.transferFlags(assertion, newAssertion);
 *
 *     var anotherAsseriton = new Assertion(myObj);
 *     utils.transferFlags(assertion, anotherAssertion, false);
 *
 * @param {Assertion} assertion the assertion to transfer the flags from
 * @param {Object} object the object to transfer the flags too; usually a new assertion
 * @param {Boolean} includeAll
 * @name getAllFlags
 * @api private
 */

module.exports = function (assertion, object, includeAll) {
  var flags = assertion.__flags || (assertion.__flags = Object.create(null));

  if (!object.__flags) {
    object.__flags = Object.create(null);
  }

  includeAll = arguments.length === 3 ? includeAll : true;

  for (var flag in flags) {
    if (includeAll ||
        (flag !== 'object' && flag !== 'ssfi' && flag != 'message')) {
      object.__flags[flag] = flags[flag];
    }
  }
};

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/chai/lib/chai/utils/transferFlags.js","/../../../node_modules/chai/lib/chai/utils")
},{"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36}],30:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * Chai - type utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Detectable javascript natives
 */

var natives = {
    '[object Arguments]': 'arguments'
  , '[object Array]': 'array'
  , '[object Date]': 'date'
  , '[object Function]': 'function'
  , '[object Number]': 'number'
  , '[object RegExp]': 'regexp'
  , '[object String]': 'string'
};

/**
 * ### type(object)
 *
 * Better implementation of `typeof` detection that can
 * be used cross-browser. Handles the inconsistencies of
 * Array, `null`, and `undefined` detection.
 *
 *     utils.type({}) // 'object'
 *     utils.type(null) // `null'
 *     utils.type(undefined) // `undefined`
 *     utils.type([]) // `array`
 *
 * @param {Mixed} object to detect type of
 * @name type
 * @api private
 */

module.exports = function (obj) {
  var str = Object.prototype.toString.call(obj);
  if (natives[str]) return natives[str];
  if (obj === null) return 'null';
  if (obj === undefined) return 'undefined';
  if (obj === Object(obj)) return 'object';
  return typeof obj;
};

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/chai/lib/chai/utils/type.js","/../../../node_modules/chai/lib/chai/utils")
},{"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36}],31:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * assertion-error
 * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

/*!
 * Return a function that will copy properties from
 * one object to another excluding any originally
 * listed. Returned function will create a new `{}`.
 *
 * @param {String} excluded properties ...
 * @return {Function}
 */

function exclude () {
  var excludes = [].slice.call(arguments);

  function excludeProps (res, obj) {
    Object.keys(obj).forEach(function (key) {
      if (!~excludes.indexOf(key)) res[key] = obj[key];
    });
  }

  return function extendExclude () {
    var args = [].slice.call(arguments)
      , i = 0
      , res = {};

    for (; i < args.length; i++) {
      excludeProps(res, args[i]);
    }

    return res;
  };
};

/*!
 * Primary Exports
 */

module.exports = AssertionError;

/**
 * ### AssertionError
 *
 * An extension of the JavaScript `Error` constructor for
 * assertion and validation scenarios.
 *
 * @param {String} message
 * @param {Object} properties to include (optional)
 * @param {callee} start stack function (optional)
 */

function AssertionError (message, _props, ssf) {
  var extend = exclude('name', 'message', 'stack', 'constructor', 'toJSON')
    , props = extend(_props || {});

  // default values
  this.message = message || 'Unspecified AssertionError';
  this.showDiff = false;

  // copy from properties
  for (var key in props) {
    this[key] = props[key];
  }

  // capture stack trace
  ssf = ssf || arguments.callee;
  if (ssf && Error.captureStackTrace) {
    Error.captureStackTrace(this, ssf);
  }
}

/*!
 * Inherit from Error.prototype
 */

AssertionError.prototype = Object.create(Error.prototype);

/*!
 * Statically set name
 */

AssertionError.prototype.name = 'AssertionError';

/*!
 * Ensure correct constructor
 */

AssertionError.prototype.constructor = AssertionError;

/**
 * Allow errors to be converted to JSON for static transfer.
 *
 * @param {Boolean} include stack (default: `true`)
 * @return {Object} object that can be `JSON.stringify`
 */

AssertionError.prototype.toJSON = function (stack) {
  var extend = exclude('constructor', 'toJSON', 'stack')
    , props = extend({ name: this.name }, this);

  // include stack if exists and not turned off
  if (false !== stack && this.stack) {
    props.stack = this.stack;
  }

  return props;
};

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/chai/node_modules/assertion-error/index.js","/../../../node_modules/chai/node_modules/assertion-error")
},{"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36}],32:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
module.exports = require('./lib/eql');

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/chai/node_modules/deep-eql/index.js","/../../../node_modules/chai/node_modules/deep-eql")
},{"./lib/eql":33,"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36}],33:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * deep-eql
 * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

var type = require('type-detect');

/*!
 * Buffer.isBuffer browser shim
 */

var Buffer;
try { Buffer = require('buffer').Buffer; }
catch(ex) {
  Buffer = {};
  Buffer.isBuffer = function() { return false; }
}

/*!
 * Primary Export
 */

module.exports = deepEqual;

/**
 * Assert super-strict (egal) equality between
 * two objects of any type.
 *
 * @param {Mixed} a
 * @param {Mixed} b
 * @param {Array} memoised (optional)
 * @return {Boolean} equal match
 */

function deepEqual(a, b, m) {
  if (sameValue(a, b)) {
    return true;
  } else if ('date' === type(a)) {
    return dateEqual(a, b);
  } else if ('regexp' === type(a)) {
    return regexpEqual(a, b);
  } else if (Buffer.isBuffer(a)) {
    return bufferEqual(a, b);
  } else if ('arguments' === type(a)) {
    return argumentsEqual(a, b, m);
  } else if (!typeEqual(a, b)) {
    return false;
  } else if (('object' !== type(a) && 'object' !== type(b))
  && ('array' !== type(a) && 'array' !== type(b))) {
    return sameValue(a, b);
  } else {
    return objectEqual(a, b, m);
  }
}

/*!
 * Strict (egal) equality test. Ensures that NaN always
 * equals NaN and `-0` does not equal `+0`.
 *
 * @param {Mixed} a
 * @param {Mixed} b
 * @return {Boolean} equal match
 */

function sameValue(a, b) {
  if (a === b) return a !== 0 || 1 / a === 1 / b;
  return a !== a && b !== b;
}

/*!
 * Compare the types of two given objects and
 * return if they are equal. Note that an Array
 * has a type of `array` (not `object`) and arguments
 * have a type of `arguments` (not `array`/`object`).
 *
 * @param {Mixed} a
 * @param {Mixed} b
 * @return {Boolean} result
 */

function typeEqual(a, b) {
  return type(a) === type(b);
}

/*!
 * Compare two Date objects by asserting that
 * the time values are equal using `saveValue`.
 *
 * @param {Date} a
 * @param {Date} b
 * @return {Boolean} result
 */

function dateEqual(a, b) {
  if ('date' !== type(b)) return false;
  return sameValue(a.getTime(), b.getTime());
}

/*!
 * Compare two regular expressions by converting them
 * to string and checking for `sameValue`.
 *
 * @param {RegExp} a
 * @param {RegExp} b
 * @return {Boolean} result
 */

function regexpEqual(a, b) {
  if ('regexp' !== type(b)) return false;
  return sameValue(a.toString(), b.toString());
}

/*!
 * Assert deep equality of two `arguments` objects.
 * Unfortunately, these must be sliced to arrays
 * prior to test to ensure no bad behavior.
 *
 * @param {Arguments} a
 * @param {Arguments} b
 * @param {Array} memoize (optional)
 * @return {Boolean} result
 */

function argumentsEqual(a, b, m) {
  if ('arguments' !== type(b)) return false;
  a = [].slice.call(a);
  b = [].slice.call(b);
  return deepEqual(a, b, m);
}

/*!
 * Get enumerable properties of a given object.
 *
 * @param {Object} a
 * @return {Array} property names
 */

function enumerable(a) {
  var res = [];
  for (var key in a) res.push(key);
  return res;
}

/*!
 * Simple equality for flat iterable objects
 * such as Arrays or Node.js buffers.
 *
 * @param {Iterable} a
 * @param {Iterable} b
 * @return {Boolean} result
 */

function iterableEqual(a, b) {
  if (a.length !==  b.length) return false;

  var i = 0;
  var match = true;

  for (; i < a.length; i++) {
    if (a[i] !== b[i]) {
      match = false;
      break;
    }
  }

  return match;
}

/*!
 * Extension to `iterableEqual` specifically
 * for Node.js Buffers.
 *
 * @param {Buffer} a
 * @param {Mixed} b
 * @return {Boolean} result
 */

function bufferEqual(a, b) {
  if (!Buffer.isBuffer(b)) return false;
  return iterableEqual(a, b);
}

/*!
 * Block for `objectEqual` ensuring non-existing
 * values don't get in.
 *
 * @param {Mixed} object
 * @return {Boolean} result
 */

function isValue(a) {
  return a !== null && a !== undefined;
}

/*!
 * Recursively check the equality of two objects.
 * Once basic sameness has been established it will
 * defer to `deepEqual` for each enumerable key
 * in the object.
 *
 * @param {Mixed} a
 * @param {Mixed} b
 * @return {Boolean} result
 */

function objectEqual(a, b, m) {
  if (!isValue(a) || !isValue(b)) {
    return false;
  }

  if (a.prototype !== b.prototype) {
    return false;
  }

  var i;
  if (m) {
    for (i = 0; i < m.length; i++) {
      if ((m[i][0] === a && m[i][1] === b)
      ||  (m[i][0] === b && m[i][1] === a)) {
        return true;
      }
    }
  } else {
    m = [];
  }

  try {
    var ka = enumerable(a);
    var kb = enumerable(b);
  } catch (ex) {
    return false;
  }

  ka.sort();
  kb.sort();

  if (!iterableEqual(ka, kb)) {
    return false;
  }

  m.push([ a, b ]);

  var key;
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], m)) {
      return false;
    }
  }

  return true;
}

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/chai/node_modules/deep-eql/lib/eql.js","/../../../node_modules/chai/node_modules/deep-eql/lib")
},{"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36,"type-detect":34}],34:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
module.exports = require('./lib/type');

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/chai/node_modules/deep-eql/node_modules/type-detect/index.js","/../../../node_modules/chai/node_modules/deep-eql/node_modules/type-detect")
},{"./lib/type":35,"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36}],35:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/*!
 * type-detect
 * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Primary Exports
 */

var exports = module.exports = getType;

/*!
 * Detectable javascript natives
 */

var natives = {
    '[object Array]': 'array'
  , '[object RegExp]': 'regexp'
  , '[object Function]': 'function'
  , '[object Arguments]': 'arguments'
  , '[object Date]': 'date'
};

/**
 * ### typeOf (obj)
 *
 * Use several different techniques to determine
 * the type of object being tested.
 *
 *
 * @param {Mixed} object
 * @return {String} object type
 * @api public
 */

function getType (obj) {
  var str = Object.prototype.toString.call(obj);
  if (natives[str]) return natives[str];
  if (obj === null) return 'null';
  if (obj === undefined) return 'undefined';
  if (obj === Object(obj)) return 'object';
  return typeof obj;
}

exports.Library = Library;

/**
 * ### Library
 *
 * Create a repository for custom type detection.
 *
 * ```js
 * var lib = new type.Library;
 * ```
 *
 */

function Library () {
  this.tests = {};
}

/**
 * #### .of (obj)
 *
 * Expose replacement `typeof` detection to the library.
 *
 * ```js
 * if ('string' === lib.of('hello world')) {
 *   // ...
 * }
 * ```
 *
 * @param {Mixed} object to test
 * @return {String} type
 */

Library.prototype.of = getType;

/**
 * #### .define (type, test)
 *
 * Add a test to for the `.test()` assertion.
 *
 * Can be defined as a regular expression:
 *
 * ```js
 * lib.define('int', /^[0-9]+$/);
 * ```
 *
 * ... or as a function:
 *
 * ```js
 * lib.define('bln', function (obj) {
 *   if ('boolean' === lib.of(obj)) return true;
 *   var blns = [ 'yes', 'no', 'true', 'false', 1, 0 ];
 *   if ('string' === lib.of(obj)) obj = obj.toLowerCase();
 *   return !! ~blns.indexOf(obj);
 * });
 * ```
 *
 * @param {String} type
 * @param {RegExp|Function} test
 * @api public
 */

Library.prototype.define = function (type, test) {
  if (arguments.length === 1) return this.tests[type];
  this.tests[type] = test;
  return this;
};

/**
 * #### .test (obj, test)
 *
 * Assert that an object is of type. Will first
 * check natives, and if that does not pass it will
 * use the user defined custom tests.
 *
 * ```js
 * assert(lib.test('1', 'int'));
 * assert(lib.test('yes', 'bln'));
 * ```
 *
 * @param {Mixed} object
 * @param {String} type
 * @return {Boolean} result
 * @api public
 */

Library.prototype.test = function (obj, type) {
  if (type === getType(obj)) return true;
  var test = this.tests[type];

  if (test && 'regexp' === getType(test)) {
    return test.test(obj);
  } else if (test && 'function' === getType(test)) {
    return test(obj);
  } else {
    throw new ReferenceError('Type test "' + type + '" not defined or invalid.');
  }
};

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/chai/node_modules/deep-eql/node_modules/type-detect/lib/type.js","/../../../node_modules/chai/node_modules/deep-eql/node_modules/type-detect/lib")
},{"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36}],36:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
/**
 * The buffer module from node.js, for the browser.
 *
 * Author:   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * License:  MIT
 *
 * `npm install buffer`
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = Buffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192

/**
 * If `Buffer._useTypedArrays`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (compatible down to IE6)
 */
Buffer._useTypedArrays = (function () {
   // Detect if browser supports Typed Arrays. Supported browsers are IE 10+,
   // Firefox 4+, Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+.
  if (typeof Uint8Array !== 'function' || typeof ArrayBuffer !== 'function')
    return false

  // Does the browser support adding properties to `Uint8Array` instances? If
  // not, then that's the same as no `Uint8Array` support. We need to be able to
  // add all the node Buffer API methods.
  // Bug in Firefox 4-29, now fixed: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
  try {
    var arr = new Uint8Array(0)
    arr.foo = function () { return 42 }
    return 42 === arr.foo() &&
        typeof arr.subarray === 'function' // Chrome 9-10 lack `subarray`
  } catch (e) {
    return false
  }
})()

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (subject, encoding, noZero) {
  if (!(this instanceof Buffer))
    return new Buffer(subject, encoding, noZero)

  var type = typeof subject

  // Workaround: node's base64 implementation allows for non-padded strings
  // while base64-js does not.
  if (encoding === 'base64' && type === 'string') {
    subject = stringtrim(subject)
    while (subject.length % 4 !== 0) {
      subject = subject + '='
    }
  }

  // Find the length
  var length
  if (type === 'number')
    length = coerce(subject)
  else if (type === 'string')
    length = Buffer.byteLength(subject, encoding)
  else if (type === 'object')
    length = coerce(subject.length) // Assume object is an array
  else
    throw new Error('First argument needs to be a number, array or string.')

  var buf
  if (Buffer._useTypedArrays) {
    // Preferred: Return an augmented `Uint8Array` instance for best performance
    buf = augment(new Uint8Array(length))
  } else {
    // Fallback: Return THIS instance of Buffer (created by `new`)
    buf = this
    buf.length = length
    buf._isBuffer = true
  }

  var i
  if (Buffer._useTypedArrays && typeof Uint8Array === 'function' &&
      subject instanceof Uint8Array) {
    // Speed optimization -- use set if we're copying from a Uint8Array
    buf._set(subject)
  } else if (isArrayish(subject)) {
    // Treat array-ish objects as a byte array
    for (i = 0; i < length; i++) {
      if (Buffer.isBuffer(subject))
        buf[i] = subject.readUInt8(i)
      else
        buf[i] = subject[i]
    }
  } else if (type === 'string') {
    buf.write(subject, 0, encoding)
  } else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
    for (i = 0; i < length; i++) {
      buf[i] = 0
    }
  }

  return buf
}

// STATIC METHODS
// ==============

Buffer.isEncoding = function (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.isBuffer = function (b) {
  return !!(b !== null && b !== undefined && b._isBuffer)
}

Buffer.byteLength = function (str, encoding) {
  var ret
  str = str + ''
  switch (encoding || 'utf8') {
    case 'hex':
      ret = str.length / 2
      break
    case 'utf8':
    case 'utf-8':
      ret = utf8ToBytes(str).length
      break
    case 'ascii':
    case 'binary':
    case 'raw':
      ret = str.length
      break
    case 'base64':
      ret = base64ToBytes(str).length
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = str.length * 2
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.concat = function (list, totalLength) {
  assert(isArray(list), 'Usage: Buffer.concat(list, [totalLength])\n' +
      'list should be an Array.')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (typeof totalLength !== 'number') {
    totalLength = 0
    for (i = 0; i < list.length; i++) {
      totalLength += list[i].length
    }
  }

  var buf = new Buffer(totalLength)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

// BUFFER INSTANCE METHODS
// =======================

function _hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  assert(strLen % 2 === 0, 'Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var byte = parseInt(string.substr(i * 2, 2), 16)
    assert(!isNaN(byte), 'Invalid hex string')
    buf[offset + i] = byte
  }
  Buffer._charsWritten = i * 2
  return i
}

function _utf8Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf8ToBytes(string), buf, offset, length)
  return charsWritten
}

function _asciiWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(asciiToBytes(string), buf, offset, length)
  return charsWritten
}

function _binaryWrite (buf, string, offset, length) {
  return _asciiWrite(buf, string, offset, length)
}

function _base64Write (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(base64ToBytes(string), buf, offset, length)
  return charsWritten
}

function _utf16leWrite (buf, string, offset, length) {
  var charsWritten = Buffer._charsWritten =
    blitBuffer(utf16leToBytes(string), buf, offset, length)
  return charsWritten
}

Buffer.prototype.write = function (string, offset, length, encoding) {
  // Support both (string, offset, length, encoding)
  // and the legacy (string, encoding, offset, length)
  if (isFinite(offset)) {
    if (!isFinite(length)) {
      encoding = length
      length = undefined
    }
  } else {  // legacy
    var swap = encoding
    encoding = offset
    offset = length
    length = swap
  }

  offset = Number(offset) || 0
  var remaining = this.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }
  encoding = String(encoding || 'utf8').toLowerCase()

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexWrite(this, string, offset, length)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Write(this, string, offset, length)
      break
    case 'ascii':
      ret = _asciiWrite(this, string, offset, length)
      break
    case 'binary':
      ret = _binaryWrite(this, string, offset, length)
      break
    case 'base64':
      ret = _base64Write(this, string, offset, length)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leWrite(this, string, offset, length)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toString = function (encoding, start, end) {
  var self = this

  encoding = String(encoding || 'utf8').toLowerCase()
  start = Number(start) || 0
  end = (end !== undefined)
    ? Number(end)
    : end = self.length

  // Fastpath empty strings
  if (end === start)
    return ''

  var ret
  switch (encoding) {
    case 'hex':
      ret = _hexSlice(self, start, end)
      break
    case 'utf8':
    case 'utf-8':
      ret = _utf8Slice(self, start, end)
      break
    case 'ascii':
      ret = _asciiSlice(self, start, end)
      break
    case 'binary':
      ret = _binarySlice(self, start, end)
      break
    case 'base64':
      ret = _base64Slice(self, start, end)
      break
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      ret = _utf16leSlice(self, start, end)
      break
    default:
      throw new Error('Unknown encoding')
  }
  return ret
}

Buffer.prototype.toJSON = function () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function (target, target_start, start, end) {
  var source = this

  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (!target_start) target_start = 0

  // Copy 0 bytes; we're done
  if (end === start) return
  if (target.length === 0 || source.length === 0) return

  // Fatal error conditions
  assert(end >= start, 'sourceEnd < sourceStart')
  assert(target_start >= 0 && target_start < target.length,
      'targetStart out of bounds')
  assert(start >= 0 && start < source.length, 'sourceStart out of bounds')
  assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length)
    end = this.length
  if (target.length - target_start < end - start)
    end = target.length - target_start + start

  // copy!
  for (var i = 0; i < end - start; i++)
    target[i + target_start] = this[i + start]
}

function _base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function _utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function _asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++)
    ret += String.fromCharCode(buf[i])
  return ret
}

function _binarySlice (buf, start, end) {
  return _asciiSlice(buf, start, end)
}

function _hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function _utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i+1] * 256)
  }
  return res
}

Buffer.prototype.slice = function (start, end) {
  var len = this.length
  start = clamp(start, len, 0)
  end = clamp(end, len, len)

  if (Buffer._useTypedArrays) {
    return augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    var newBuf = new Buffer(sliceLen, undefined, true)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
    return newBuf
  }
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  return this[offset]
}

function _readUInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    val = buf[offset]
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
  } else {
    val = buf[offset] << 8
    if (offset + 1 < len)
      val |= buf[offset + 1]
  }
  return val
}

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  return _readUInt16(this, offset, true, noAssert)
}

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  return _readUInt16(this, offset, false, noAssert)
}

function _readUInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val
  if (littleEndian) {
    if (offset + 2 < len)
      val = buf[offset + 2] << 16
    if (offset + 1 < len)
      val |= buf[offset + 1] << 8
    val |= buf[offset]
    if (offset + 3 < len)
      val = val + (buf[offset + 3] << 24 >>> 0)
  } else {
    if (offset + 1 < len)
      val = buf[offset + 1] << 16
    if (offset + 2 < len)
      val |= buf[offset + 2] << 8
    if (offset + 3 < len)
      val |= buf[offset + 3]
    val = val + (buf[offset] << 24 >>> 0)
  }
  return val
}

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  return _readUInt32(this, offset, true, noAssert)
}

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  return _readUInt32(this, offset, false, noAssert)
}

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (!noAssert) {
    assert(offset !== undefined && offset !== null,
        'missing offset')
    assert(offset < this.length, 'Trying to read beyond buffer length')
  }

  if (offset >= this.length)
    return

  var neg = this[offset] & 0x80
  if (neg)
    return (0xff - this[offset] + 1) * -1
  else
    return this[offset]
}

function _readInt16 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt16(buf, offset, littleEndian, true)
  var neg = val & 0x8000
  if (neg)
    return (0xffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  return _readInt16(this, offset, true, noAssert)
}

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  return _readInt16(this, offset, false, noAssert)
}

function _readInt32 (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  var len = buf.length
  if (offset >= len)
    return

  var val = _readUInt32(buf, offset, littleEndian, true)
  var neg = val & 0x80000000
  if (neg)
    return (0xffffffff - val + 1) * -1
  else
    return val
}

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  return _readInt32(this, offset, true, noAssert)
}

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  return _readInt32(this, offset, false, noAssert)
}

function _readFloat (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 3 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 23, 4)
}

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  return _readFloat(this, offset, true, noAssert)
}

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  return _readFloat(this, offset, false, noAssert)
}

function _readDouble (buf, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset + 7 < buf.length, 'Trying to read beyond buffer length')
  }

  return ieee754.read(buf, offset, littleEndian, 52, 8)
}

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  return _readDouble(this, offset, true, noAssert)
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  return _readDouble(this, offset, false, noAssert)
}

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'trying to write beyond buffer length')
    verifuint(value, 0xff)
  }

  if (offset >= this.length) return

  this[offset] = value
}

function _writeUInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
    buf[offset + i] =
        (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
            (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  _writeUInt16(this, value, offset, false, noAssert)
}

function _writeUInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'trying to write beyond buffer length')
    verifuint(value, 0xffffffff)
  }

  var len = buf.length
  if (offset >= len)
    return

  for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
    buf[offset + i] =
        (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  _writeUInt32(this, value, offset, false, noAssert)
}

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset < this.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7f, -0x80)
  }

  if (offset >= this.length)
    return

  if (value >= 0)
    this.writeUInt8(value, offset, noAssert)
  else
    this.writeUInt8(0xff + value + 1, offset, noAssert)
}

function _writeInt16 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 1 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fff, -0x8000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt16(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  _writeInt16(this, value, offset, false, noAssert)
}

function _writeInt32 (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifsint(value, 0x7fffffff, -0x80000000)
  }

  var len = buf.length
  if (offset >= len)
    return

  if (value >= 0)
    _writeUInt32(buf, value, offset, littleEndian, noAssert)
  else
    _writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert)
}

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, true, noAssert)
}

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  _writeInt32(this, value, offset, false, noAssert)
}

function _writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 3 < buf.length, 'Trying to write beyond buffer length')
    verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 23, 4)
}

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  _writeFloat(this, value, offset, false, noAssert)
}

function _writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    assert(value !== undefined && value !== null, 'missing value')
    assert(typeof littleEndian === 'boolean', 'missing or invalid endian')
    assert(offset !== undefined && offset !== null, 'missing offset')
    assert(offset + 7 < buf.length,
        'Trying to write beyond buffer length')
    verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }

  var len = buf.length
  if (offset >= len)
    return

  ieee754.write(buf, value, offset, littleEndian, 52, 8)
}

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  _writeDouble(this, value, offset, false, noAssert)
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (typeof value === 'string') {
    value = value.charCodeAt(0)
  }

  assert(typeof value === 'number' && !isNaN(value), 'value is not a number')
  assert(end >= start, 'end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  assert(start >= 0 && start < this.length, 'start out of bounds')
  assert(end >= 0 && end <= this.length, 'end out of bounds')

  for (var i = start; i < end; i++) {
    this[i] = value
  }
}

Buffer.prototype.inspect = function () {
  var out = []
  var len = this.length
  for (var i = 0; i < len; i++) {
    out[i] = toHex(this[i])
    if (i === exports.INSPECT_MAX_BYTES) {
      out[i + 1] = '...'
      break
    }
  }
  return '<Buffer ' + out.join(' ') + '>'
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function () {
  if (typeof Uint8Array === 'function') {
    if (Buffer._useTypedArrays) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1)
        buf[i] = this[i]
      return buf.buffer
    }
  } else {
    throw new Error('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

var BP = Buffer.prototype

/**
 * Augment the Uint8Array *instance* (not the class!) with Buffer methods
 */
function augment (arr) {
  arr._isBuffer = true

  // save reference to original Uint8Array get/set methods before overwriting
  arr._get = arr.get
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

// slice(start, end)
function clamp (index, len, defaultValue) {
  if (typeof index !== 'number') return defaultValue
  index = ~~index;  // Coerce to integer.
  if (index >= len) return len
  if (index >= 0) return index
  index += len
  if (index >= 0) return index
  return 0
}

function coerce (length) {
  // Coerce length to a number (possibly NaN), round up
  // in case it's fractional (e.g. 123.456) then do a
  // double negate to coerce a NaN to 0. Easy, right?
  length = ~~Math.ceil(+length)
  return length < 0 ? 0 : length
}

function isArray (subject) {
  return (Array.isArray || function (subject) {
    return Object.prototype.toString.call(subject) === '[object Array]'
  })(subject)
}

function isArrayish (subject) {
  return isArray(subject) || Buffer.isBuffer(subject) ||
      subject && typeof subject === 'object' &&
      typeof subject.length === 'number'
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    var b = str.charCodeAt(i)
    if (b <= 0x7F)
      byteArray.push(str.charCodeAt(i))
    else {
      var start = i
      if (b >= 0xD800 && b <= 0xDFFF) i++
      var h = encodeURIComponent(str.slice(start, i+1)).substr(1).split('%')
      for (var j = 0; j < h.length; j++)
        byteArray.push(parseInt(h[j], 16))
    }
  }
  return byteArray
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(str)
}

function blitBuffer (src, dst, offset, length) {
  var pos
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length))
      break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

/*
 * We have to make sure that the value is a valid integer. This means that it
 * is non-negative. It has no fractional component and that it does not
 * exceed the maximum allowed value.
 */
function verifuint (value, max) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value >= 0, 'specified a negative value for writing an unsigned value')
  assert(value <= max, 'value is larger than maximum value for type')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifsint (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
  assert(Math.floor(value) === value, 'value has a fractional component')
}

function verifIEEE754 (value, max, min) {
  assert(typeof value === 'number', 'cannot write a non-number as a number')
  assert(value <= max, 'value larger than maximum allowed value')
  assert(value >= min, 'value smaller than minimum allowed value')
}

function assert (test, message) {
  if (!test) throw new Error(message || 'Failed assertion')
}

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/index.js","/../../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer")
},{"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"base64-js":37,"buffer":36,"ieee754":38}],37:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var ZERO   = '0'.charCodeAt(0)
	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS)
			return 62 // '+'
		if (code === SLASH)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	module.exports.toByteArray = b64ToByteArray
	module.exports.fromByteArray = uint8ToBase64
}())

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/base64-js/lib/b64.js","/../../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/base64-js/lib")
},{"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36}],38:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
exports.read = function(buffer, offset, isLE, mLen, nBytes) {
  var e, m,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      nBits = -7,
      i = isLE ? (nBytes - 1) : 0,
      d = isLE ? -1 : 1,
      s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity);
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c,
      eLen = nBytes * 8 - mLen - 1,
      eMax = (1 << eLen) - 1,
      eBias = eMax >> 1,
      rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0),
      i = isLE ? 0 : (nBytes - 1),
      d = isLE ? 1 : -1,
      s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);

  buffer[offset + i - d] |= s * 128;
};

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/ieee754/index.js","/../../../node_modules/gulp-browserify/node_modules/browserify/node_modules/buffer/node_modules/ieee754")
},{"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36}],39:[function(require,module,exports){
(function (process,global,Buffer,__argument0,__argument1,__argument2,__argument3,__filename,__dirname){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

}).call(this,require("/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js"),typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer,arguments[3],arguments[4],arguments[5],arguments[6],"/../../../node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js","/../../../node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process")
},{"/home/dostodabsi/code/bakk/experiment-template/node_modules/gulp-browserify/node_modules/browserify/node_modules/insert-module-globals/node_modules/process/browser.js":39,"buffer":36}]},{},[4])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvaG9tZS9kb3N0b2RhYnNpL2NvZGUvYmFray9leHBlcmltZW50LXRlbXBsYXRlL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9ob21lL2Rvc3RvZGFic2kvY29kZS9iYWtrL2V4cGVyaW1lbnQtdGVtcGxhdGUvY2xpZW50L2FwcC9tb2RlbHMvUGFydGljaXBhbnQuanMiLCIvaG9tZS9kb3N0b2RhYnNpL2NvZGUvYmFray9leHBlcmltZW50LXRlbXBsYXRlL2NsaWVudC9ub2RlX21vZHVsZXMvYmFja2JvbmUvYmFja2JvbmUuanMiLCIvaG9tZS9kb3N0b2RhYnNpL2NvZGUvYmFray9leHBlcmltZW50LXRlbXBsYXRlL2NsaWVudC9ub2RlX21vZHVsZXMvdW5kZXJzY29yZS91bmRlcnNjb3JlLmpzIiwiL2hvbWUvZG9zdG9kYWJzaS9jb2RlL2Jha2svZXhwZXJpbWVudC10ZW1wbGF0ZS9jbGllbnQvdGVzdC9zcGVjL2Zha2VfOTk4NDQ1M2YuanMiLCIvaG9tZS9kb3N0b2RhYnNpL2NvZGUvYmFray9leHBlcmltZW50LXRlbXBsYXRlL25vZGVfbW9kdWxlcy9jaGFpL2luZGV4LmpzIiwiL2hvbWUvZG9zdG9kYWJzaS9jb2RlL2Jha2svZXhwZXJpbWVudC10ZW1wbGF0ZS9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS5qcyIsIi9ob21lL2Rvc3RvZGFic2kvY29kZS9iYWtrL2V4cGVyaW1lbnQtdGVtcGxhdGUvbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvYXNzZXJ0aW9uLmpzIiwiL2hvbWUvZG9zdG9kYWJzaS9jb2RlL2Jha2svZXhwZXJpbWVudC10ZW1wbGF0ZS9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS9jb3JlL2Fzc2VydGlvbnMuanMiLCIvaG9tZS9kb3N0b2RhYnNpL2NvZGUvYmFray9leHBlcmltZW50LXRlbXBsYXRlL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL2ludGVyZmFjZS9hc3NlcnQuanMiLCIvaG9tZS9kb3N0b2RhYnNpL2NvZGUvYmFray9leHBlcmltZW50LXRlbXBsYXRlL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL2ludGVyZmFjZS9leHBlY3QuanMiLCIvaG9tZS9kb3N0b2RhYnNpL2NvZGUvYmFray9leHBlcmltZW50LXRlbXBsYXRlL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL2ludGVyZmFjZS9zaG91bGQuanMiLCIvaG9tZS9kb3N0b2RhYnNpL2NvZGUvYmFray9leHBlcmltZW50LXRlbXBsYXRlL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL3V0aWxzL2FkZENoYWluYWJsZU1ldGhvZC5qcyIsIi9ob21lL2Rvc3RvZGFic2kvY29kZS9iYWtrL2V4cGVyaW1lbnQtdGVtcGxhdGUvbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvYWRkTWV0aG9kLmpzIiwiL2hvbWUvZG9zdG9kYWJzaS9jb2RlL2Jha2svZXhwZXJpbWVudC10ZW1wbGF0ZS9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy9hZGRQcm9wZXJ0eS5qcyIsIi9ob21lL2Rvc3RvZGFic2kvY29kZS9iYWtrL2V4cGVyaW1lbnQtdGVtcGxhdGUvbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvZmxhZy5qcyIsIi9ob21lL2Rvc3RvZGFic2kvY29kZS9iYWtrL2V4cGVyaW1lbnQtdGVtcGxhdGUvbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvZ2V0QWN0dWFsLmpzIiwiL2hvbWUvZG9zdG9kYWJzaS9jb2RlL2Jha2svZXhwZXJpbWVudC10ZW1wbGF0ZS9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy9nZXRFbnVtZXJhYmxlUHJvcGVydGllcy5qcyIsIi9ob21lL2Rvc3RvZGFic2kvY29kZS9iYWtrL2V4cGVyaW1lbnQtdGVtcGxhdGUvbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvZ2V0TWVzc2FnZS5qcyIsIi9ob21lL2Rvc3RvZGFic2kvY29kZS9iYWtrL2V4cGVyaW1lbnQtdGVtcGxhdGUvbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvZ2V0TmFtZS5qcyIsIi9ob21lL2Rvc3RvZGFic2kvY29kZS9iYWtrL2V4cGVyaW1lbnQtdGVtcGxhdGUvbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvZ2V0UGF0aFZhbHVlLmpzIiwiL2hvbWUvZG9zdG9kYWJzaS9jb2RlL2Jha2svZXhwZXJpbWVudC10ZW1wbGF0ZS9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy9nZXRQcm9wZXJ0aWVzLmpzIiwiL2hvbWUvZG9zdG9kYWJzaS9jb2RlL2Jha2svZXhwZXJpbWVudC10ZW1wbGF0ZS9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy9pbmRleC5qcyIsIi9ob21lL2Rvc3RvZGFic2kvY29kZS9iYWtrL2V4cGVyaW1lbnQtdGVtcGxhdGUvbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvaW5zcGVjdC5qcyIsIi9ob21lL2Rvc3RvZGFic2kvY29kZS9iYWtrL2V4cGVyaW1lbnQtdGVtcGxhdGUvbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvb2JqRGlzcGxheS5qcyIsIi9ob21lL2Rvc3RvZGFic2kvY29kZS9iYWtrL2V4cGVyaW1lbnQtdGVtcGxhdGUvbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvb3ZlcndyaXRlQ2hhaW5hYmxlTWV0aG9kLmpzIiwiL2hvbWUvZG9zdG9kYWJzaS9jb2RlL2Jha2svZXhwZXJpbWVudC10ZW1wbGF0ZS9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy9vdmVyd3JpdGVNZXRob2QuanMiLCIvaG9tZS9kb3N0b2RhYnNpL2NvZGUvYmFray9leHBlcmltZW50LXRlbXBsYXRlL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL3V0aWxzL292ZXJ3cml0ZVByb3BlcnR5LmpzIiwiL2hvbWUvZG9zdG9kYWJzaS9jb2RlL2Jha2svZXhwZXJpbWVudC10ZW1wbGF0ZS9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy90ZXN0LmpzIiwiL2hvbWUvZG9zdG9kYWJzaS9jb2RlL2Jha2svZXhwZXJpbWVudC10ZW1wbGF0ZS9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy90cmFuc2ZlckZsYWdzLmpzIiwiL2hvbWUvZG9zdG9kYWJzaS9jb2RlL2Jha2svZXhwZXJpbWVudC10ZW1wbGF0ZS9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy90eXBlLmpzIiwiL2hvbWUvZG9zdG9kYWJzaS9jb2RlL2Jha2svZXhwZXJpbWVudC10ZW1wbGF0ZS9ub2RlX21vZHVsZXMvY2hhaS9ub2RlX21vZHVsZXMvYXNzZXJ0aW9uLWVycm9yL2luZGV4LmpzIiwiL2hvbWUvZG9zdG9kYWJzaS9jb2RlL2Jha2svZXhwZXJpbWVudC10ZW1wbGF0ZS9ub2RlX21vZHVsZXMvY2hhaS9ub2RlX21vZHVsZXMvZGVlcC1lcWwvaW5kZXguanMiLCIvaG9tZS9kb3N0b2RhYnNpL2NvZGUvYmFray9leHBlcmltZW50LXRlbXBsYXRlL25vZGVfbW9kdWxlcy9jaGFpL25vZGVfbW9kdWxlcy9kZWVwLWVxbC9saWIvZXFsLmpzIiwiL2hvbWUvZG9zdG9kYWJzaS9jb2RlL2Jha2svZXhwZXJpbWVudC10ZW1wbGF0ZS9ub2RlX21vZHVsZXMvY2hhaS9ub2RlX21vZHVsZXMvZGVlcC1lcWwvbm9kZV9tb2R1bGVzL3R5cGUtZGV0ZWN0L2luZGV4LmpzIiwiL2hvbWUvZG9zdG9kYWJzaS9jb2RlL2Jha2svZXhwZXJpbWVudC10ZW1wbGF0ZS9ub2RlX21vZHVsZXMvY2hhaS9ub2RlX21vZHVsZXMvZGVlcC1lcWwvbm9kZV9tb2R1bGVzL3R5cGUtZGV0ZWN0L2xpYi90eXBlLmpzIiwiL2hvbWUvZG9zdG9kYWJzaS9jb2RlL2Jha2svZXhwZXJpbWVudC10ZW1wbGF0ZS9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXIvaW5kZXguanMiLCIvaG9tZS9kb3N0b2RhYnNpL2NvZGUvYmFray9leHBlcmltZW50LXRlbXBsYXRlL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2J1ZmZlci9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2xpYi9iNjQuanMiLCIvaG9tZS9kb3N0b2RhYnNpL2NvZGUvYmFray9leHBlcmltZW50LXRlbXBsYXRlL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2J1ZmZlci9ub2RlX21vZHVsZXMvaWVlZTc1NC9pbmRleC5qcyIsIi9ob21lL2Rvc3RvZGFic2kvY29kZS9iYWtrL2V4cGVyaW1lbnQtdGVtcGxhdGUvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvaW5zZXJ0LW1vZHVsZS1nbG9iYWxzL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxa0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDajBDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ254Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xpQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hIQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25RQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xudmFyIF8gICAgICAgID0gcmVxdWlyZSgndW5kZXJzY29yZScpO1xudmFyIEJhY2tib25lID0gcmVxdWlyZSgnYmFja2JvbmUnKTtcblxudmFyIFBhcnRpY2lwYW50ID0gQmFja2JvbmUuTW9kZWwuZXh0ZW5kKHtcbiAgdXJsUm9vdDogJy9hcGkvcGFydGljaXBhbnQnLFxuICBkZWZhdWx0czogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdhZ2UnOiAwLFxuICAgICAgJ2NvdW50cnknOiAnJyxcbiAgICAgICd1c2VyQWdlbnQnOiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudFxuICAgIH07XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBhcnRpY2lwYW50O1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZShcIi9ob21lL2Rvc3RvZGFic2kvY29kZS9iYWtrL2V4cGVyaW1lbnQtdGVtcGxhdGUvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvaW5zZXJ0LW1vZHVsZS1nbG9iYWxzL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLi8uLi9hcHAvbW9kZWxzL1BhcnRpY2lwYW50LmpzXCIsXCIvLi4vLi4vYXBwL21vZGVsc1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbi8vICAgICBCYWNrYm9uZS5qcyAxLjEuMlxuXG4vLyAgICAgKGMpIDIwMTAtMjAxNCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuLy8gICAgIEJhY2tib25lIG1heSBiZSBmcmVlbHkgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuLy8gICAgIEZvciBhbGwgZGV0YWlscyBhbmQgZG9jdW1lbnRhdGlvbjpcbi8vICAgICBodHRwOi8vYmFja2JvbmVqcy5vcmdcblxuKGZ1bmN0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblxuICAvLyBTZXQgdXAgQmFja2JvbmUgYXBwcm9wcmlhdGVseSBmb3IgdGhlIGVudmlyb25tZW50LiBTdGFydCB3aXRoIEFNRC5cbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShbJ3VuZGVyc2NvcmUnLCAnanF1ZXJ5JywgJ2V4cG9ydHMnXSwgZnVuY3Rpb24oXywgJCwgZXhwb3J0cykge1xuICAgICAgLy8gRXhwb3J0IGdsb2JhbCBldmVuIGluIEFNRCBjYXNlIGluIGNhc2UgdGhpcyBzY3JpcHQgaXMgbG9hZGVkIHdpdGhcbiAgICAgIC8vIG90aGVycyB0aGF0IG1heSBzdGlsbCBleHBlY3QgYSBnbG9iYWwgQmFja2JvbmUuXG4gICAgICByb290LkJhY2tib25lID0gZmFjdG9yeShyb290LCBleHBvcnRzLCBfLCAkKTtcbiAgICB9KTtcblxuICAvLyBOZXh0IGZvciBOb2RlLmpzIG9yIENvbW1vbkpTLiBqUXVlcnkgbWF5IG5vdCBiZSBuZWVkZWQgYXMgYSBtb2R1bGUuXG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgdmFyIF8gPSByZXF1aXJlKCd1bmRlcnNjb3JlJyk7XG4gICAgZmFjdG9yeShyb290LCBleHBvcnRzLCBfKTtcblxuICAvLyBGaW5hbGx5LCBhcyBhIGJyb3dzZXIgZ2xvYmFsLlxuICB9IGVsc2Uge1xuICAgIHJvb3QuQmFja2JvbmUgPSBmYWN0b3J5KHJvb3QsIHt9LCByb290Ll8sIChyb290LmpRdWVyeSB8fCByb290LlplcHRvIHx8IHJvb3QuZW5kZXIgfHwgcm9vdC4kKSk7XG4gIH1cblxufSh0aGlzLCBmdW5jdGlvbihyb290LCBCYWNrYm9uZSwgXywgJCkge1xuXG4gIC8vIEluaXRpYWwgU2V0dXBcbiAgLy8gLS0tLS0tLS0tLS0tLVxuXG4gIC8vIFNhdmUgdGhlIHByZXZpb3VzIHZhbHVlIG9mIHRoZSBgQmFja2JvbmVgIHZhcmlhYmxlLCBzbyB0aGF0IGl0IGNhbiBiZVxuICAvLyByZXN0b3JlZCBsYXRlciBvbiwgaWYgYG5vQ29uZmxpY3RgIGlzIHVzZWQuXG4gIHZhciBwcmV2aW91c0JhY2tib25lID0gcm9vdC5CYWNrYm9uZTtcblxuICAvLyBDcmVhdGUgbG9jYWwgcmVmZXJlbmNlcyB0byBhcnJheSBtZXRob2RzIHdlJ2xsIHdhbnQgdG8gdXNlIGxhdGVyLlxuICB2YXIgYXJyYXkgPSBbXTtcbiAgdmFyIHB1c2ggPSBhcnJheS5wdXNoO1xuICB2YXIgc2xpY2UgPSBhcnJheS5zbGljZTtcbiAgdmFyIHNwbGljZSA9IGFycmF5LnNwbGljZTtcblxuICAvLyBDdXJyZW50IHZlcnNpb24gb2YgdGhlIGxpYnJhcnkuIEtlZXAgaW4gc3luYyB3aXRoIGBwYWNrYWdlLmpzb25gLlxuICBCYWNrYm9uZS5WRVJTSU9OID0gJzEuMS4yJztcblxuICAvLyBGb3IgQmFja2JvbmUncyBwdXJwb3NlcywgalF1ZXJ5LCBaZXB0bywgRW5kZXIsIG9yIE15IExpYnJhcnkgKGtpZGRpbmcpIG93bnNcbiAgLy8gdGhlIGAkYCB2YXJpYWJsZS5cbiAgQmFja2JvbmUuJCA9ICQ7XG5cbiAgLy8gUnVucyBCYWNrYm9uZS5qcyBpbiAqbm9Db25mbGljdCogbW9kZSwgcmV0dXJuaW5nIHRoZSBgQmFja2JvbmVgIHZhcmlhYmxlXG4gIC8vIHRvIGl0cyBwcmV2aW91cyBvd25lci4gUmV0dXJucyBhIHJlZmVyZW5jZSB0byB0aGlzIEJhY2tib25lIG9iamVjdC5cbiAgQmFja2JvbmUubm9Db25mbGljdCA9IGZ1bmN0aW9uKCkge1xuICAgIHJvb3QuQmFja2JvbmUgPSBwcmV2aW91c0JhY2tib25lO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8vIFR1cm4gb24gYGVtdWxhdGVIVFRQYCB0byBzdXBwb3J0IGxlZ2FjeSBIVFRQIHNlcnZlcnMuIFNldHRpbmcgdGhpcyBvcHRpb25cbiAgLy8gd2lsbCBmYWtlIGBcIlBBVENIXCJgLCBgXCJQVVRcImAgYW5kIGBcIkRFTEVURVwiYCByZXF1ZXN0cyB2aWEgdGhlIGBfbWV0aG9kYCBwYXJhbWV0ZXIgYW5kXG4gIC8vIHNldCBhIGBYLUh0dHAtTWV0aG9kLU92ZXJyaWRlYCBoZWFkZXIuXG4gIEJhY2tib25lLmVtdWxhdGVIVFRQID0gZmFsc2U7XG5cbiAgLy8gVHVybiBvbiBgZW11bGF0ZUpTT05gIHRvIHN1cHBvcnQgbGVnYWN5IHNlcnZlcnMgdGhhdCBjYW4ndCBkZWFsIHdpdGggZGlyZWN0XG4gIC8vIGBhcHBsaWNhdGlvbi9qc29uYCByZXF1ZXN0cyAuLi4gd2lsbCBlbmNvZGUgdGhlIGJvZHkgYXNcbiAgLy8gYGFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZGAgaW5zdGVhZCBhbmQgd2lsbCBzZW5kIHRoZSBtb2RlbCBpbiBhXG4gIC8vIGZvcm0gcGFyYW0gbmFtZWQgYG1vZGVsYC5cbiAgQmFja2JvbmUuZW11bGF0ZUpTT04gPSBmYWxzZTtcblxuICAvLyBCYWNrYm9uZS5FdmVudHNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gQSBtb2R1bGUgdGhhdCBjYW4gYmUgbWl4ZWQgaW4gdG8gKmFueSBvYmplY3QqIGluIG9yZGVyIHRvIHByb3ZpZGUgaXQgd2l0aFxuICAvLyBjdXN0b20gZXZlbnRzLiBZb3UgbWF5IGJpbmQgd2l0aCBgb25gIG9yIHJlbW92ZSB3aXRoIGBvZmZgIGNhbGxiYWNrXG4gIC8vIGZ1bmN0aW9ucyB0byBhbiBldmVudDsgYHRyaWdnZXJgLWluZyBhbiBldmVudCBmaXJlcyBhbGwgY2FsbGJhY2tzIGluXG4gIC8vIHN1Y2Nlc3Npb24uXG4gIC8vXG4gIC8vICAgICB2YXIgb2JqZWN0ID0ge307XG4gIC8vICAgICBfLmV4dGVuZChvYmplY3QsIEJhY2tib25lLkV2ZW50cyk7XG4gIC8vICAgICBvYmplY3Qub24oJ2V4cGFuZCcsIGZ1bmN0aW9uKCl7IGFsZXJ0KCdleHBhbmRlZCcpOyB9KTtcbiAgLy8gICAgIG9iamVjdC50cmlnZ2VyKCdleHBhbmQnKTtcbiAgLy9cbiAgdmFyIEV2ZW50cyA9IEJhY2tib25lLkV2ZW50cyA9IHtcblxuICAgIC8vIEJpbmQgYW4gZXZlbnQgdG8gYSBgY2FsbGJhY2tgIGZ1bmN0aW9uLiBQYXNzaW5nIGBcImFsbFwiYCB3aWxsIGJpbmRcbiAgICAvLyB0aGUgY2FsbGJhY2sgdG8gYWxsIGV2ZW50cyBmaXJlZC5cbiAgICBvbjogZnVuY3Rpb24obmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICAgIGlmICghZXZlbnRzQXBpKHRoaXMsICdvbicsIG5hbWUsIFtjYWxsYmFjaywgY29udGV4dF0pIHx8ICFjYWxsYmFjaykgcmV0dXJuIHRoaXM7XG4gICAgICB0aGlzLl9ldmVudHMgfHwgKHRoaXMuX2V2ZW50cyA9IHt9KTtcbiAgICAgIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHNbbmFtZV0gfHwgKHRoaXMuX2V2ZW50c1tuYW1lXSA9IFtdKTtcbiAgICAgIGV2ZW50cy5wdXNoKHtjYWxsYmFjazogY2FsbGJhY2ssIGNvbnRleHQ6IGNvbnRleHQsIGN0eDogY29udGV4dCB8fCB0aGlzfSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLy8gQmluZCBhbiBldmVudCB0byBvbmx5IGJlIHRyaWdnZXJlZCBhIHNpbmdsZSB0aW1lLiBBZnRlciB0aGUgZmlyc3QgdGltZVxuICAgIC8vIHRoZSBjYWxsYmFjayBpcyBpbnZva2VkLCBpdCB3aWxsIGJlIHJlbW92ZWQuXG4gICAgb25jZTogZnVuY3Rpb24obmFtZSwgY2FsbGJhY2ssIGNvbnRleHQpIHtcbiAgICAgIGlmICghZXZlbnRzQXBpKHRoaXMsICdvbmNlJywgbmFtZSwgW2NhbGxiYWNrLCBjb250ZXh0XSkgfHwgIWNhbGxiYWNrKSByZXR1cm4gdGhpcztcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHZhciBvbmNlID0gXy5vbmNlKGZ1bmN0aW9uKCkge1xuICAgICAgICBzZWxmLm9mZihuYW1lLCBvbmNlKTtcbiAgICAgICAgY2FsbGJhY2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH0pO1xuICAgICAgb25jZS5fY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgIHJldHVybiB0aGlzLm9uKG5hbWUsIG9uY2UsIGNvbnRleHQpO1xuICAgIH0sXG5cbiAgICAvLyBSZW1vdmUgb25lIG9yIG1hbnkgY2FsbGJhY2tzLiBJZiBgY29udGV4dGAgaXMgbnVsbCwgcmVtb3ZlcyBhbGxcbiAgICAvLyBjYWxsYmFja3Mgd2l0aCB0aGF0IGZ1bmN0aW9uLiBJZiBgY2FsbGJhY2tgIGlzIG51bGwsIHJlbW92ZXMgYWxsXG4gICAgLy8gY2FsbGJhY2tzIGZvciB0aGUgZXZlbnQuIElmIGBuYW1lYCBpcyBudWxsLCByZW1vdmVzIGFsbCBib3VuZFxuICAgIC8vIGNhbGxiYWNrcyBmb3IgYWxsIGV2ZW50cy5cbiAgICBvZmY6IGZ1bmN0aW9uKG5hbWUsIGNhbGxiYWNrLCBjb250ZXh0KSB7XG4gICAgICB2YXIgcmV0YWluLCBldiwgZXZlbnRzLCBuYW1lcywgaSwgbCwgaiwgaztcbiAgICAgIGlmICghdGhpcy5fZXZlbnRzIHx8ICFldmVudHNBcGkodGhpcywgJ29mZicsIG5hbWUsIFtjYWxsYmFjaywgY29udGV4dF0pKSByZXR1cm4gdGhpcztcbiAgICAgIGlmICghbmFtZSAmJiAhY2FsbGJhY2sgJiYgIWNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gdm9pZCAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIG5hbWVzID0gbmFtZSA/IFtuYW1lXSA6IF8ua2V5cyh0aGlzLl9ldmVudHMpO1xuICAgICAgZm9yIChpID0gMCwgbCA9IG5hbWVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBuYW1lID0gbmFtZXNbaV07XG4gICAgICAgIGlmIChldmVudHMgPSB0aGlzLl9ldmVudHNbbmFtZV0pIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHNbbmFtZV0gPSByZXRhaW4gPSBbXTtcbiAgICAgICAgICBpZiAoY2FsbGJhY2sgfHwgY29udGV4dCkge1xuICAgICAgICAgICAgZm9yIChqID0gMCwgayA9IGV2ZW50cy5sZW5ndGg7IGogPCBrOyBqKyspIHtcbiAgICAgICAgICAgICAgZXYgPSBldmVudHNbal07XG4gICAgICAgICAgICAgIGlmICgoY2FsbGJhY2sgJiYgY2FsbGJhY2sgIT09IGV2LmNhbGxiYWNrICYmIGNhbGxiYWNrICE9PSBldi5jYWxsYmFjay5fY2FsbGJhY2spIHx8XG4gICAgICAgICAgICAgICAgICAoY29udGV4dCAmJiBjb250ZXh0ICE9PSBldi5jb250ZXh0KSkge1xuICAgICAgICAgICAgICAgIHJldGFpbi5wdXNoKGV2KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIXJldGFpbi5sZW5ndGgpIGRlbGV0ZSB0aGlzLl9ldmVudHNbbmFtZV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8vIFRyaWdnZXIgb25lIG9yIG1hbnkgZXZlbnRzLCBmaXJpbmcgYWxsIGJvdW5kIGNhbGxiYWNrcy4gQ2FsbGJhY2tzIGFyZVxuICAgIC8vIHBhc3NlZCB0aGUgc2FtZSBhcmd1bWVudHMgYXMgYHRyaWdnZXJgIGlzLCBhcGFydCBmcm9tIHRoZSBldmVudCBuYW1lXG4gICAgLy8gKHVubGVzcyB5b3UncmUgbGlzdGVuaW5nIG9uIGBcImFsbFwiYCwgd2hpY2ggd2lsbCBjYXVzZSB5b3VyIGNhbGxiYWNrIHRvXG4gICAgLy8gcmVjZWl2ZSB0aGUgdHJ1ZSBuYW1lIG9mIHRoZSBldmVudCBhcyB0aGUgZmlyc3QgYXJndW1lbnQpLlxuICAgIHRyaWdnZXI6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIGlmICghdGhpcy5fZXZlbnRzKSByZXR1cm4gdGhpcztcbiAgICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgaWYgKCFldmVudHNBcGkodGhpcywgJ3RyaWdnZXInLCBuYW1lLCBhcmdzKSkgcmV0dXJuIHRoaXM7XG4gICAgICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzW25hbWVdO1xuICAgICAgdmFyIGFsbEV2ZW50cyA9IHRoaXMuX2V2ZW50cy5hbGw7XG4gICAgICBpZiAoZXZlbnRzKSB0cmlnZ2VyRXZlbnRzKGV2ZW50cywgYXJncyk7XG4gICAgICBpZiAoYWxsRXZlbnRzKSB0cmlnZ2VyRXZlbnRzKGFsbEV2ZW50cywgYXJndW1lbnRzKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvLyBUZWxsIHRoaXMgb2JqZWN0IHRvIHN0b3AgbGlzdGVuaW5nIHRvIGVpdGhlciBzcGVjaWZpYyBldmVudHMgLi4uIG9yXG4gICAgLy8gdG8gZXZlcnkgb2JqZWN0IGl0J3MgY3VycmVudGx5IGxpc3RlbmluZyB0by5cbiAgICBzdG9wTGlzdGVuaW5nOiBmdW5jdGlvbihvYmosIG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICB2YXIgbGlzdGVuaW5nVG8gPSB0aGlzLl9saXN0ZW5pbmdUbztcbiAgICAgIGlmICghbGlzdGVuaW5nVG8pIHJldHVybiB0aGlzO1xuICAgICAgdmFyIHJlbW92ZSA9ICFuYW1lICYmICFjYWxsYmFjaztcbiAgICAgIGlmICghY2FsbGJhY2sgJiYgdHlwZW9mIG5hbWUgPT09ICdvYmplY3QnKSBjYWxsYmFjayA9IHRoaXM7XG4gICAgICBpZiAob2JqKSAobGlzdGVuaW5nVG8gPSB7fSlbb2JqLl9saXN0ZW5JZF0gPSBvYmo7XG4gICAgICBmb3IgKHZhciBpZCBpbiBsaXN0ZW5pbmdUbykge1xuICAgICAgICBvYmogPSBsaXN0ZW5pbmdUb1tpZF07XG4gICAgICAgIG9iai5vZmYobmFtZSwgY2FsbGJhY2ssIHRoaXMpO1xuICAgICAgICBpZiAocmVtb3ZlIHx8IF8uaXNFbXB0eShvYmouX2V2ZW50cykpIGRlbGV0ZSB0aGlzLl9saXN0ZW5pbmdUb1tpZF07XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgfTtcblxuICAvLyBSZWd1bGFyIGV4cHJlc3Npb24gdXNlZCB0byBzcGxpdCBldmVudCBzdHJpbmdzLlxuICB2YXIgZXZlbnRTcGxpdHRlciA9IC9cXHMrLztcblxuICAvLyBJbXBsZW1lbnQgZmFuY3kgZmVhdHVyZXMgb2YgdGhlIEV2ZW50cyBBUEkgc3VjaCBhcyBtdWx0aXBsZSBldmVudFxuICAvLyBuYW1lcyBgXCJjaGFuZ2UgYmx1clwiYCBhbmQgalF1ZXJ5LXN0eWxlIGV2ZW50IG1hcHMgYHtjaGFuZ2U6IGFjdGlvbn1gXG4gIC8vIGluIHRlcm1zIG9mIHRoZSBleGlzdGluZyBBUEkuXG4gIHZhciBldmVudHNBcGkgPSBmdW5jdGlvbihvYmosIGFjdGlvbiwgbmFtZSwgcmVzdCkge1xuICAgIGlmICghbmFtZSkgcmV0dXJuIHRydWU7XG5cbiAgICAvLyBIYW5kbGUgZXZlbnQgbWFwcy5cbiAgICBpZiAodHlwZW9mIG5hbWUgPT09ICdvYmplY3QnKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gbmFtZSkge1xuICAgICAgICBvYmpbYWN0aW9uXS5hcHBseShvYmosIFtrZXksIG5hbWVba2V5XV0uY29uY2F0KHJlc3QpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgc3BhY2Ugc2VwYXJhdGVkIGV2ZW50IG5hbWVzLlxuICAgIGlmIChldmVudFNwbGl0dGVyLnRlc3QobmFtZSkpIHtcbiAgICAgIHZhciBuYW1lcyA9IG5hbWUuc3BsaXQoZXZlbnRTcGxpdHRlcik7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IG5hbWVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBvYmpbYWN0aW9uXS5hcHBseShvYmosIFtuYW1lc1tpXV0uY29uY2F0KHJlc3QpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICAvLyBBIGRpZmZpY3VsdC10by1iZWxpZXZlLCBidXQgb3B0aW1pemVkIGludGVybmFsIGRpc3BhdGNoIGZ1bmN0aW9uIGZvclxuICAvLyB0cmlnZ2VyaW5nIGV2ZW50cy4gVHJpZXMgdG8ga2VlcCB0aGUgdXN1YWwgY2FzZXMgc3BlZWR5IChtb3N0IGludGVybmFsXG4gIC8vIEJhY2tib25lIGV2ZW50cyBoYXZlIDMgYXJndW1lbnRzKS5cbiAgdmFyIHRyaWdnZXJFdmVudHMgPSBmdW5jdGlvbihldmVudHMsIGFyZ3MpIHtcbiAgICB2YXIgZXYsIGkgPSAtMSwgbCA9IGV2ZW50cy5sZW5ndGgsIGExID0gYXJnc1swXSwgYTIgPSBhcmdzWzFdLCBhMyA9IGFyZ3NbMl07XG4gICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgY2FzZSAwOiB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5jYWxsKGV2LmN0eCk7IHJldHVybjtcbiAgICAgIGNhc2UgMTogd2hpbGUgKCsraSA8IGwpIChldiA9IGV2ZW50c1tpXSkuY2FsbGJhY2suY2FsbChldi5jdHgsIGExKTsgcmV0dXJuO1xuICAgICAgY2FzZSAyOiB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEsIGEyKTsgcmV0dXJuO1xuICAgICAgY2FzZSAzOiB3aGlsZSAoKytpIDwgbCkgKGV2ID0gZXZlbnRzW2ldKS5jYWxsYmFjay5jYWxsKGV2LmN0eCwgYTEsIGEyLCBhMyk7IHJldHVybjtcbiAgICAgIGRlZmF1bHQ6IHdoaWxlICgrK2kgPCBsKSAoZXYgPSBldmVudHNbaV0pLmNhbGxiYWNrLmFwcGx5KGV2LmN0eCwgYXJncyk7IHJldHVybjtcbiAgICB9XG4gIH07XG5cbiAgdmFyIGxpc3Rlbk1ldGhvZHMgPSB7bGlzdGVuVG86ICdvbicsIGxpc3RlblRvT25jZTogJ29uY2UnfTtcblxuICAvLyBJbnZlcnNpb24tb2YtY29udHJvbCB2ZXJzaW9ucyBvZiBgb25gIGFuZCBgb25jZWAuIFRlbGwgKnRoaXMqIG9iamVjdCB0b1xuICAvLyBsaXN0ZW4gdG8gYW4gZXZlbnQgaW4gYW5vdGhlciBvYmplY3QgLi4uIGtlZXBpbmcgdHJhY2sgb2Ygd2hhdCBpdCdzXG4gIC8vIGxpc3RlbmluZyB0by5cbiAgXy5lYWNoKGxpc3Rlbk1ldGhvZHMsIGZ1bmN0aW9uKGltcGxlbWVudGF0aW9uLCBtZXRob2QpIHtcbiAgICBFdmVudHNbbWV0aG9kXSA9IGZ1bmN0aW9uKG9iaiwgbmFtZSwgY2FsbGJhY2spIHtcbiAgICAgIHZhciBsaXN0ZW5pbmdUbyA9IHRoaXMuX2xpc3RlbmluZ1RvIHx8ICh0aGlzLl9saXN0ZW5pbmdUbyA9IHt9KTtcbiAgICAgIHZhciBpZCA9IG9iai5fbGlzdGVuSWQgfHwgKG9iai5fbGlzdGVuSWQgPSBfLnVuaXF1ZUlkKCdsJykpO1xuICAgICAgbGlzdGVuaW5nVG9baWRdID0gb2JqO1xuICAgICAgaWYgKCFjYWxsYmFjayAmJiB0eXBlb2YgbmFtZSA9PT0gJ29iamVjdCcpIGNhbGxiYWNrID0gdGhpcztcbiAgICAgIG9ialtpbXBsZW1lbnRhdGlvbl0obmFtZSwgY2FsbGJhY2ssIHRoaXMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gQWxpYXNlcyBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkuXG4gIEV2ZW50cy5iaW5kICAgPSBFdmVudHMub247XG4gIEV2ZW50cy51bmJpbmQgPSBFdmVudHMub2ZmO1xuXG4gIC8vIEFsbG93IHRoZSBgQmFja2JvbmVgIG9iamVjdCB0byBzZXJ2ZSBhcyBhIGdsb2JhbCBldmVudCBidXMsIGZvciBmb2xrcyB3aG9cbiAgLy8gd2FudCBnbG9iYWwgXCJwdWJzdWJcIiBpbiBhIGNvbnZlbmllbnQgcGxhY2UuXG4gIF8uZXh0ZW5kKEJhY2tib25lLCBFdmVudHMpO1xuXG4gIC8vIEJhY2tib25lLk1vZGVsXG4gIC8vIC0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gQmFja2JvbmUgKipNb2RlbHMqKiBhcmUgdGhlIGJhc2ljIGRhdGEgb2JqZWN0IGluIHRoZSBmcmFtZXdvcmsgLS1cbiAgLy8gZnJlcXVlbnRseSByZXByZXNlbnRpbmcgYSByb3cgaW4gYSB0YWJsZSBpbiBhIGRhdGFiYXNlIG9uIHlvdXIgc2VydmVyLlxuICAvLyBBIGRpc2NyZXRlIGNodW5rIG9mIGRhdGEgYW5kIGEgYnVuY2ggb2YgdXNlZnVsLCByZWxhdGVkIG1ldGhvZHMgZm9yXG4gIC8vIHBlcmZvcm1pbmcgY29tcHV0YXRpb25zIGFuZCB0cmFuc2Zvcm1hdGlvbnMgb24gdGhhdCBkYXRhLlxuXG4gIC8vIENyZWF0ZSBhIG5ldyBtb2RlbCB3aXRoIHRoZSBzcGVjaWZpZWQgYXR0cmlidXRlcy4gQSBjbGllbnQgaWQgKGBjaWRgKVxuICAvLyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBhbmQgYXNzaWduZWQgZm9yIHlvdS5cbiAgdmFyIE1vZGVsID0gQmFja2JvbmUuTW9kZWwgPSBmdW5jdGlvbihhdHRyaWJ1dGVzLCBvcHRpb25zKSB7XG4gICAgdmFyIGF0dHJzID0gYXR0cmlidXRlcyB8fCB7fTtcbiAgICBvcHRpb25zIHx8IChvcHRpb25zID0ge30pO1xuICAgIHRoaXMuY2lkID0gXy51bmlxdWVJZCgnYycpO1xuICAgIHRoaXMuYXR0cmlidXRlcyA9IHt9O1xuICAgIGlmIChvcHRpb25zLmNvbGxlY3Rpb24pIHRoaXMuY29sbGVjdGlvbiA9IG9wdGlvbnMuY29sbGVjdGlvbjtcbiAgICBpZiAob3B0aW9ucy5wYXJzZSkgYXR0cnMgPSB0aGlzLnBhcnNlKGF0dHJzLCBvcHRpb25zKSB8fCB7fTtcbiAgICBhdHRycyA9IF8uZGVmYXVsdHMoe30sIGF0dHJzLCBfLnJlc3VsdCh0aGlzLCAnZGVmYXVsdHMnKSk7XG4gICAgdGhpcy5zZXQoYXR0cnMsIG9wdGlvbnMpO1xuICAgIHRoaXMuY2hhbmdlZCA9IHt9O1xuICAgIHRoaXMuaW5pdGlhbGl6ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIC8vIEF0dGFjaCBhbGwgaW5oZXJpdGFibGUgbWV0aG9kcyB0byB0aGUgTW9kZWwgcHJvdG90eXBlLlxuICBfLmV4dGVuZChNb2RlbC5wcm90b3R5cGUsIEV2ZW50cywge1xuXG4gICAgLy8gQSBoYXNoIG9mIGF0dHJpYnV0ZXMgd2hvc2UgY3VycmVudCBhbmQgcHJldmlvdXMgdmFsdWUgZGlmZmVyLlxuICAgIGNoYW5nZWQ6IG51bGwsXG5cbiAgICAvLyBUaGUgdmFsdWUgcmV0dXJuZWQgZHVyaW5nIHRoZSBsYXN0IGZhaWxlZCB2YWxpZGF0aW9uLlxuICAgIHZhbGlkYXRpb25FcnJvcjogbnVsbCxcblxuICAgIC8vIFRoZSBkZWZhdWx0IG5hbWUgZm9yIHRoZSBKU09OIGBpZGAgYXR0cmlidXRlIGlzIGBcImlkXCJgLiBNb25nb0RCIGFuZFxuICAgIC8vIENvdWNoREIgdXNlcnMgbWF5IHdhbnQgdG8gc2V0IHRoaXMgdG8gYFwiX2lkXCJgLlxuICAgIGlkQXR0cmlidXRlOiAnaWQnLFxuXG4gICAgLy8gSW5pdGlhbGl6ZSBpcyBhbiBlbXB0eSBmdW5jdGlvbiBieSBkZWZhdWx0LiBPdmVycmlkZSBpdCB3aXRoIHlvdXIgb3duXG4gICAgLy8gaW5pdGlhbGl6YXRpb24gbG9naWMuXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oKXt9LFxuXG4gICAgLy8gUmV0dXJuIGEgY29weSBvZiB0aGUgbW9kZWwncyBgYXR0cmlidXRlc2Agb2JqZWN0LlxuICAgIHRvSlNPTjogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgcmV0dXJuIF8uY2xvbmUodGhpcy5hdHRyaWJ1dGVzKTtcbiAgICB9LFxuXG4gICAgLy8gUHJveHkgYEJhY2tib25lLnN5bmNgIGJ5IGRlZmF1bHQgLS0gYnV0IG92ZXJyaWRlIHRoaXMgaWYgeW91IG5lZWRcbiAgICAvLyBjdXN0b20gc3luY2luZyBzZW1hbnRpY3MgZm9yICp0aGlzKiBwYXJ0aWN1bGFyIG1vZGVsLlxuICAgIHN5bmM6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIEJhY2tib25lLnN5bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9LFxuXG4gICAgLy8gR2V0IHRoZSB2YWx1ZSBvZiBhbiBhdHRyaWJ1dGUuXG4gICAgZ2V0OiBmdW5jdGlvbihhdHRyKSB7XG4gICAgICByZXR1cm4gdGhpcy5hdHRyaWJ1dGVzW2F0dHJdO1xuICAgIH0sXG5cbiAgICAvLyBHZXQgdGhlIEhUTUwtZXNjYXBlZCB2YWx1ZSBvZiBhbiBhdHRyaWJ1dGUuXG4gICAgZXNjYXBlOiBmdW5jdGlvbihhdHRyKSB7XG4gICAgICByZXR1cm4gXy5lc2NhcGUodGhpcy5nZXQoYXR0cikpO1xuICAgIH0sXG5cbiAgICAvLyBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYXR0cmlidXRlIGNvbnRhaW5zIGEgdmFsdWUgdGhhdCBpcyBub3QgbnVsbFxuICAgIC8vIG9yIHVuZGVmaW5lZC5cbiAgICBoYXM6IGZ1bmN0aW9uKGF0dHIpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldChhdHRyKSAhPSBudWxsO1xuICAgIH0sXG5cbiAgICAvLyBTZXQgYSBoYXNoIG9mIG1vZGVsIGF0dHJpYnV0ZXMgb24gdGhlIG9iamVjdCwgZmlyaW5nIGBcImNoYW5nZVwiYC4gVGhpcyBpc1xuICAgIC8vIHRoZSBjb3JlIHByaW1pdGl2ZSBvcGVyYXRpb24gb2YgYSBtb2RlbCwgdXBkYXRpbmcgdGhlIGRhdGEgYW5kIG5vdGlmeWluZ1xuICAgIC8vIGFueW9uZSB3aG8gbmVlZHMgdG8ga25vdyBhYm91dCB0aGUgY2hhbmdlIGluIHN0YXRlLiBUaGUgaGVhcnQgb2YgdGhlIGJlYXN0LlxuICAgIHNldDogZnVuY3Rpb24oa2V5LCB2YWwsIG9wdGlvbnMpIHtcbiAgICAgIHZhciBhdHRyLCBhdHRycywgdW5zZXQsIGNoYW5nZXMsIHNpbGVudCwgY2hhbmdpbmcsIHByZXYsIGN1cnJlbnQ7XG4gICAgICBpZiAoa2V5ID09IG51bGwpIHJldHVybiB0aGlzO1xuXG4gICAgICAvLyBIYW5kbGUgYm90aCBgXCJrZXlcIiwgdmFsdWVgIGFuZCBge2tleTogdmFsdWV9YCAtc3R5bGUgYXJndW1lbnRzLlxuICAgICAgaWYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGF0dHJzID0ga2V5O1xuICAgICAgICBvcHRpb25zID0gdmFsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgKGF0dHJzID0ge30pW2tleV0gPSB2YWw7XG4gICAgICB9XG5cbiAgICAgIG9wdGlvbnMgfHwgKG9wdGlvbnMgPSB7fSk7XG5cbiAgICAgIC8vIFJ1biB2YWxpZGF0aW9uLlxuICAgICAgaWYgKCF0aGlzLl92YWxpZGF0ZShhdHRycywgb3B0aW9ucykpIHJldHVybiBmYWxzZTtcblxuICAgICAgLy8gRXh0cmFjdCBhdHRyaWJ1dGVzIGFuZCBvcHRpb25zLlxuICAgICAgdW5zZXQgICAgICAgICAgID0gb3B0aW9ucy51bnNldDtcbiAgICAgIHNpbGVudCAgICAgICAgICA9IG9wdGlvbnMuc2lsZW50O1xuICAgICAgY2hhbmdlcyAgICAgICAgID0gW107XG4gICAgICBjaGFuZ2luZyAgICAgICAgPSB0aGlzLl9jaGFuZ2luZztcbiAgICAgIHRoaXMuX2NoYW5naW5nICA9IHRydWU7XG5cbiAgICAgIGlmICghY2hhbmdpbmcpIHtcbiAgICAgICAgdGhpcy5fcHJldmlvdXNBdHRyaWJ1dGVzID0gXy5jbG9uZSh0aGlzLmF0dHJpYnV0ZXMpO1xuICAgICAgICB0aGlzLmNoYW5nZWQgPSB7fTtcbiAgICAgIH1cbiAgICAgIGN1cnJlbnQgPSB0aGlzLmF0dHJpYnV0ZXMsIHByZXYgPSB0aGlzLl9wcmV2aW91c0F0dHJpYnV0ZXM7XG5cbiAgICAgIC8vIENoZWNrIGZvciBjaGFuZ2VzIG9mIGBpZGAuXG4gICAgICBpZiAodGhpcy5pZEF0dHJpYnV0ZSBpbiBhdHRycykgdGhpcy5pZCA9IGF0dHJzW3RoaXMuaWRBdHRyaWJ1dGVdO1xuXG4gICAgICAvLyBGb3IgZWFjaCBgc2V0YCBhdHRyaWJ1dGUsIHVwZGF0ZSBvciBkZWxldGUgdGhlIGN1cnJlbnQgdmFsdWUuXG4gICAgICBmb3IgKGF0dHIgaW4gYXR0cnMpIHtcbiAgICAgICAgdmFsID0gYXR0cnNbYXR0cl07XG4gICAgICAgIGlmICghXy5pc0VxdWFsKGN1cnJlbnRbYXR0cl0sIHZhbCkpIGNoYW5nZXMucHVzaChhdHRyKTtcbiAgICAgICAgaWYgKCFfLmlzRXF1YWwocHJldlthdHRyXSwgdmFsKSkge1xuICAgICAgICAgIHRoaXMuY2hhbmdlZFthdHRyXSA9IHZhbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgdGhpcy5jaGFuZ2VkW2F0dHJdO1xuICAgICAgICB9XG4gICAgICAgIHVuc2V0ID8gZGVsZXRlIGN1cnJlbnRbYXR0cl0gOiBjdXJyZW50W2F0dHJdID0gdmFsO1xuICAgICAgfVxuXG4gICAgICAvLyBUcmlnZ2VyIGFsbCByZWxldmFudCBhdHRyaWJ1dGUgY2hhbmdlcy5cbiAgICAgIGlmICghc2lsZW50KSB7XG4gICAgICAgIGlmIChjaGFuZ2VzLmxlbmd0aCkgdGhpcy5fcGVuZGluZyA9IG9wdGlvbnM7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gY2hhbmdlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICB0aGlzLnRyaWdnZXIoJ2NoYW5nZTonICsgY2hhbmdlc1tpXSwgdGhpcywgY3VycmVudFtjaGFuZ2VzW2ldXSwgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gWW91IG1pZ2h0IGJlIHdvbmRlcmluZyB3aHkgdGhlcmUncyBhIGB3aGlsZWAgbG9vcCBoZXJlLiBDaGFuZ2VzIGNhblxuICAgICAgLy8gYmUgcmVjdXJzaXZlbHkgbmVzdGVkIHdpdGhpbiBgXCJjaGFuZ2VcImAgZXZlbnRzLlxuICAgICAgaWYgKGNoYW5naW5nKSByZXR1cm4gdGhpcztcbiAgICAgIGlmICghc2lsZW50KSB7XG4gICAgICAgIHdoaWxlICh0aGlzLl9wZW5kaW5nKSB7XG4gICAgICAgICAgb3B0aW9ucyA9IHRoaXMuX3BlbmRpbmc7XG4gICAgICAgICAgdGhpcy5fcGVuZGluZyA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMudHJpZ2dlcignY2hhbmdlJywgdGhpcywgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuX3BlbmRpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuX2NoYW5naW5nID0gZmFsc2U7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLy8gUmVtb3ZlIGFuIGF0dHJpYnV0ZSBmcm9tIHRoZSBtb2RlbCwgZmlyaW5nIGBcImNoYW5nZVwiYC4gYHVuc2V0YCBpcyBhIG5vb3BcbiAgICAvLyBpZiB0aGUgYXR0cmlidXRlIGRvZXNuJ3QgZXhpc3QuXG4gICAgdW5zZXQ6IGZ1bmN0aW9uKGF0dHIsIG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiB0aGlzLnNldChhdHRyLCB2b2lkIDAsIF8uZXh0ZW5kKHt9LCBvcHRpb25zLCB7dW5zZXQ6IHRydWV9KSk7XG4gICAgfSxcblxuICAgIC8vIENsZWFyIGFsbCBhdHRyaWJ1dGVzIG9uIHRoZSBtb2RlbCwgZmlyaW5nIGBcImNoYW5nZVwiYC5cbiAgICBjbGVhcjogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgdmFyIGF0dHJzID0ge307XG4gICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5hdHRyaWJ1dGVzKSBhdHRyc1trZXldID0gdm9pZCAwO1xuICAgICAgcmV0dXJuIHRoaXMuc2V0KGF0dHJzLCBfLmV4dGVuZCh7fSwgb3B0aW9ucywge3Vuc2V0OiB0cnVlfSkpO1xuICAgIH0sXG5cbiAgICAvLyBEZXRlcm1pbmUgaWYgdGhlIG1vZGVsIGhhcyBjaGFuZ2VkIHNpbmNlIHRoZSBsYXN0IGBcImNoYW5nZVwiYCBldmVudC5cbiAgICAvLyBJZiB5b3Ugc3BlY2lmeSBhbiBhdHRyaWJ1dGUgbmFtZSwgZGV0ZXJtaW5lIGlmIHRoYXQgYXR0cmlidXRlIGhhcyBjaGFuZ2VkLlxuICAgIGhhc0NoYW5nZWQ6IGZ1bmN0aW9uKGF0dHIpIHtcbiAgICAgIGlmIChhdHRyID09IG51bGwpIHJldHVybiAhXy5pc0VtcHR5KHRoaXMuY2hhbmdlZCk7XG4gICAgICByZXR1cm4gXy5oYXModGhpcy5jaGFuZ2VkLCBhdHRyKTtcbiAgICB9LFxuXG4gICAgLy8gUmV0dXJuIGFuIG9iamVjdCBjb250YWluaW5nIGFsbCB0aGUgYXR0cmlidXRlcyB0aGF0IGhhdmUgY2hhbmdlZCwgb3JcbiAgICAvLyBmYWxzZSBpZiB0aGVyZSBhcmUgbm8gY2hhbmdlZCBhdHRyaWJ1dGVzLiBVc2VmdWwgZm9yIGRldGVybWluaW5nIHdoYXRcbiAgICAvLyBwYXJ0cyBvZiBhIHZpZXcgbmVlZCB0byBiZSB1cGRhdGVkIGFuZC9vciB3aGF0IGF0dHJpYnV0ZXMgbmVlZCB0byBiZVxuICAgIC8vIHBlcnNpc3RlZCB0byB0aGUgc2VydmVyLiBVbnNldCBhdHRyaWJ1dGVzIHdpbGwgYmUgc2V0IHRvIHVuZGVmaW5lZC5cbiAgICAvLyBZb3UgY2FuIGFsc28gcGFzcyBhbiBhdHRyaWJ1dGVzIG9iamVjdCB0byBkaWZmIGFnYWluc3QgdGhlIG1vZGVsLFxuICAgIC8vIGRldGVybWluaW5nIGlmIHRoZXJlICp3b3VsZCBiZSogYSBjaGFuZ2UuXG4gICAgY2hhbmdlZEF0dHJpYnV0ZXM6IGZ1bmN0aW9uKGRpZmYpIHtcbiAgICAgIGlmICghZGlmZikgcmV0dXJuIHRoaXMuaGFzQ2hhbmdlZCgpID8gXy5jbG9uZSh0aGlzLmNoYW5nZWQpIDogZmFsc2U7XG4gICAgICB2YXIgdmFsLCBjaGFuZ2VkID0gZmFsc2U7XG4gICAgICB2YXIgb2xkID0gdGhpcy5fY2hhbmdpbmcgPyB0aGlzLl9wcmV2aW91c0F0dHJpYnV0ZXMgOiB0aGlzLmF0dHJpYnV0ZXM7XG4gICAgICBmb3IgKHZhciBhdHRyIGluIGRpZmYpIHtcbiAgICAgICAgaWYgKF8uaXNFcXVhbChvbGRbYXR0cl0sICh2YWwgPSBkaWZmW2F0dHJdKSkpIGNvbnRpbnVlO1xuICAgICAgICAoY2hhbmdlZCB8fCAoY2hhbmdlZCA9IHt9KSlbYXR0cl0gPSB2YWw7XG4gICAgICB9XG4gICAgICByZXR1cm4gY2hhbmdlZDtcbiAgICB9LFxuXG4gICAgLy8gR2V0IHRoZSBwcmV2aW91cyB2YWx1ZSBvZiBhbiBhdHRyaWJ1dGUsIHJlY29yZGVkIGF0IHRoZSB0aW1lIHRoZSBsYXN0XG4gICAgLy8gYFwiY2hhbmdlXCJgIGV2ZW50IHdhcyBmaXJlZC5cbiAgICBwcmV2aW91czogZnVuY3Rpb24oYXR0cikge1xuICAgICAgaWYgKGF0dHIgPT0gbnVsbCB8fCAhdGhpcy5fcHJldmlvdXNBdHRyaWJ1dGVzKSByZXR1cm4gbnVsbDtcbiAgICAgIHJldHVybiB0aGlzLl9wcmV2aW91c0F0dHJpYnV0ZXNbYXR0cl07XG4gICAgfSxcblxuICAgIC8vIEdldCBhbGwgb2YgdGhlIGF0dHJpYnV0ZXMgb2YgdGhlIG1vZGVsIGF0IHRoZSB0aW1lIG9mIHRoZSBwcmV2aW91c1xuICAgIC8vIGBcImNoYW5nZVwiYCBldmVudC5cbiAgICBwcmV2aW91c0F0dHJpYnV0ZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIF8uY2xvbmUodGhpcy5fcHJldmlvdXNBdHRyaWJ1dGVzKTtcbiAgICB9LFxuXG4gICAgLy8gRmV0Y2ggdGhlIG1vZGVsIGZyb20gdGhlIHNlcnZlci4gSWYgdGhlIHNlcnZlcidzIHJlcHJlc2VudGF0aW9uIG9mIHRoZVxuICAgIC8vIG1vZGVsIGRpZmZlcnMgZnJvbSBpdHMgY3VycmVudCBhdHRyaWJ1dGVzLCB0aGV5IHdpbGwgYmUgb3ZlcnJpZGRlbixcbiAgICAvLyB0cmlnZ2VyaW5nIGEgYFwiY2hhbmdlXCJgIGV2ZW50LlxuICAgIGZldGNoOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0gb3B0aW9ucyA/IF8uY2xvbmUob3B0aW9ucykgOiB7fTtcbiAgICAgIGlmIChvcHRpb25zLnBhcnNlID09PSB2b2lkIDApIG9wdGlvbnMucGFyc2UgPSB0cnVlO1xuICAgICAgdmFyIG1vZGVsID0gdGhpcztcbiAgICAgIHZhciBzdWNjZXNzID0gb3B0aW9ucy5zdWNjZXNzO1xuICAgICAgb3B0aW9ucy5zdWNjZXNzID0gZnVuY3Rpb24ocmVzcCkge1xuICAgICAgICBpZiAoIW1vZGVsLnNldChtb2RlbC5wYXJzZShyZXNwLCBvcHRpb25zKSwgb3B0aW9ucykpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKHN1Y2Nlc3MpIHN1Y2Nlc3MobW9kZWwsIHJlc3AsIG9wdGlvbnMpO1xuICAgICAgICBtb2RlbC50cmlnZ2VyKCdzeW5jJywgbW9kZWwsIHJlc3AsIG9wdGlvbnMpO1xuICAgICAgfTtcbiAgICAgIHdyYXBFcnJvcih0aGlzLCBvcHRpb25zKTtcbiAgICAgIHJldHVybiB0aGlzLnN5bmMoJ3JlYWQnLCB0aGlzLCBvcHRpb25zKTtcbiAgICB9LFxuXG4gICAgLy8gU2V0IGEgaGFzaCBvZiBtb2RlbCBhdHRyaWJ1dGVzLCBhbmQgc3luYyB0aGUgbW9kZWwgdG8gdGhlIHNlcnZlci5cbiAgICAvLyBJZiB0aGUgc2VydmVyIHJldHVybnMgYW4gYXR0cmlidXRlcyBoYXNoIHRoYXQgZGlmZmVycywgdGhlIG1vZGVsJ3NcbiAgICAvLyBzdGF0ZSB3aWxsIGJlIGBzZXRgIGFnYWluLlxuICAgIHNhdmU6IGZ1bmN0aW9uKGtleSwgdmFsLCBvcHRpb25zKSB7XG4gICAgICB2YXIgYXR0cnMsIG1ldGhvZCwgeGhyLCBhdHRyaWJ1dGVzID0gdGhpcy5hdHRyaWJ1dGVzO1xuXG4gICAgICAvLyBIYW5kbGUgYm90aCBgXCJrZXlcIiwgdmFsdWVgIGFuZCBge2tleTogdmFsdWV9YCAtc3R5bGUgYXJndW1lbnRzLlxuICAgICAgaWYgKGtleSA9PSBudWxsIHx8IHR5cGVvZiBrZXkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGF0dHJzID0ga2V5O1xuICAgICAgICBvcHRpb25zID0gdmFsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgKGF0dHJzID0ge30pW2tleV0gPSB2YWw7XG4gICAgICB9XG5cbiAgICAgIG9wdGlvbnMgPSBfLmV4dGVuZCh7dmFsaWRhdGU6IHRydWV9LCBvcHRpb25zKTtcblxuICAgICAgLy8gSWYgd2UncmUgbm90IHdhaXRpbmcgYW5kIGF0dHJpYnV0ZXMgZXhpc3QsIHNhdmUgYWN0cyBhc1xuICAgICAgLy8gYHNldChhdHRyKS5zYXZlKG51bGwsIG9wdHMpYCB3aXRoIHZhbGlkYXRpb24uIE90aGVyd2lzZSwgY2hlY2sgaWZcbiAgICAgIC8vIHRoZSBtb2RlbCB3aWxsIGJlIHZhbGlkIHdoZW4gdGhlIGF0dHJpYnV0ZXMsIGlmIGFueSwgYXJlIHNldC5cbiAgICAgIGlmIChhdHRycyAmJiAhb3B0aW9ucy53YWl0KSB7XG4gICAgICAgIGlmICghdGhpcy5zZXQoYXR0cnMsIG9wdGlvbnMpKSByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIXRoaXMuX3ZhbGlkYXRlKGF0dHJzLCBvcHRpb25zKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICAvLyBTZXQgdGVtcG9yYXJ5IGF0dHJpYnV0ZXMgaWYgYHt3YWl0OiB0cnVlfWAuXG4gICAgICBpZiAoYXR0cnMgJiYgb3B0aW9ucy53YWl0KSB7XG4gICAgICAgIHRoaXMuYXR0cmlidXRlcyA9IF8uZXh0ZW5kKHt9LCBhdHRyaWJ1dGVzLCBhdHRycyk7XG4gICAgICB9XG5cbiAgICAgIC8vIEFmdGVyIGEgc3VjY2Vzc2Z1bCBzZXJ2ZXItc2lkZSBzYXZlLCB0aGUgY2xpZW50IGlzIChvcHRpb25hbGx5KVxuICAgICAgLy8gdXBkYXRlZCB3aXRoIHRoZSBzZXJ2ZXItc2lkZSBzdGF0ZS5cbiAgICAgIGlmIChvcHRpb25zLnBhcnNlID09PSB2b2lkIDApIG9wdGlvbnMucGFyc2UgPSB0cnVlO1xuICAgICAgdmFyIG1vZGVsID0gdGhpcztcbiAgICAgIHZhciBzdWNjZXNzID0gb3B0aW9ucy5zdWNjZXNzO1xuICAgICAgb3B0aW9ucy5zdWNjZXNzID0gZnVuY3Rpb24ocmVzcCkge1xuICAgICAgICAvLyBFbnN1cmUgYXR0cmlidXRlcyBhcmUgcmVzdG9yZWQgZHVyaW5nIHN5bmNocm9ub3VzIHNhdmVzLlxuICAgICAgICBtb2RlbC5hdHRyaWJ1dGVzID0gYXR0cmlidXRlcztcbiAgICAgICAgdmFyIHNlcnZlckF0dHJzID0gbW9kZWwucGFyc2UocmVzcCwgb3B0aW9ucyk7XG4gICAgICAgIGlmIChvcHRpb25zLndhaXQpIHNlcnZlckF0dHJzID0gXy5leHRlbmQoYXR0cnMgfHwge30sIHNlcnZlckF0dHJzKTtcbiAgICAgICAgaWYgKF8uaXNPYmplY3Qoc2VydmVyQXR0cnMpICYmICFtb2RlbC5zZXQoc2VydmVyQXR0cnMsIG9wdGlvbnMpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdWNjZXNzKSBzdWNjZXNzKG1vZGVsLCByZXNwLCBvcHRpb25zKTtcbiAgICAgICAgbW9kZWwudHJpZ2dlcignc3luYycsIG1vZGVsLCByZXNwLCBvcHRpb25zKTtcbiAgICAgIH07XG4gICAgICB3cmFwRXJyb3IodGhpcywgb3B0aW9ucyk7XG5cbiAgICAgIG1ldGhvZCA9IHRoaXMuaXNOZXcoKSA/ICdjcmVhdGUnIDogKG9wdGlvbnMucGF0Y2ggPyAncGF0Y2gnIDogJ3VwZGF0ZScpO1xuICAgICAgaWYgKG1ldGhvZCA9PT0gJ3BhdGNoJykgb3B0aW9ucy5hdHRycyA9IGF0dHJzO1xuICAgICAgeGhyID0gdGhpcy5zeW5jKG1ldGhvZCwgdGhpcywgb3B0aW9ucyk7XG5cbiAgICAgIC8vIFJlc3RvcmUgYXR0cmlidXRlcy5cbiAgICAgIGlmIChhdHRycyAmJiBvcHRpb25zLndhaXQpIHRoaXMuYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXM7XG5cbiAgICAgIHJldHVybiB4aHI7XG4gICAgfSxcblxuICAgIC8vIERlc3Ryb3kgdGhpcyBtb2RlbCBvbiB0aGUgc2VydmVyIGlmIGl0IHdhcyBhbHJlYWR5IHBlcnNpc3RlZC5cbiAgICAvLyBPcHRpbWlzdGljYWxseSByZW1vdmVzIHRoZSBtb2RlbCBmcm9tIGl0cyBjb2xsZWN0aW9uLCBpZiBpdCBoYXMgb25lLlxuICAgIC8vIElmIGB3YWl0OiB0cnVlYCBpcyBwYXNzZWQsIHdhaXRzIGZvciB0aGUgc2VydmVyIHRvIHJlc3BvbmQgYmVmb3JlIHJlbW92YWwuXG4gICAgZGVzdHJveTogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgPyBfLmNsb25lKG9wdGlvbnMpIDoge307XG4gICAgICB2YXIgbW9kZWwgPSB0aGlzO1xuICAgICAgdmFyIHN1Y2Nlc3MgPSBvcHRpb25zLnN1Y2Nlc3M7XG5cbiAgICAgIHZhciBkZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIG1vZGVsLnRyaWdnZXIoJ2Rlc3Ryb3knLCBtb2RlbCwgbW9kZWwuY29sbGVjdGlvbiwgb3B0aW9ucyk7XG4gICAgICB9O1xuXG4gICAgICBvcHRpb25zLnN1Y2Nlc3MgPSBmdW5jdGlvbihyZXNwKSB7XG4gICAgICAgIGlmIChvcHRpb25zLndhaXQgfHwgbW9kZWwuaXNOZXcoKSkgZGVzdHJveSgpO1xuICAgICAgICBpZiAoc3VjY2Vzcykgc3VjY2Vzcyhtb2RlbCwgcmVzcCwgb3B0aW9ucyk7XG4gICAgICAgIGlmICghbW9kZWwuaXNOZXcoKSkgbW9kZWwudHJpZ2dlcignc3luYycsIG1vZGVsLCByZXNwLCBvcHRpb25zKTtcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLmlzTmV3KCkpIHtcbiAgICAgICAgb3B0aW9ucy5zdWNjZXNzKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHdyYXBFcnJvcih0aGlzLCBvcHRpb25zKTtcblxuICAgICAgdmFyIHhociA9IHRoaXMuc3luYygnZGVsZXRlJywgdGhpcywgb3B0aW9ucyk7XG4gICAgICBpZiAoIW9wdGlvbnMud2FpdCkgZGVzdHJveSgpO1xuICAgICAgcmV0dXJuIHhocjtcbiAgICB9LFxuXG4gICAgLy8gRGVmYXVsdCBVUkwgZm9yIHRoZSBtb2RlbCdzIHJlcHJlc2VudGF0aW9uIG9uIHRoZSBzZXJ2ZXIgLS0gaWYgeW91J3JlXG4gICAgLy8gdXNpbmcgQmFja2JvbmUncyByZXN0ZnVsIG1ldGhvZHMsIG92ZXJyaWRlIHRoaXMgdG8gY2hhbmdlIHRoZSBlbmRwb2ludFxuICAgIC8vIHRoYXQgd2lsbCBiZSBjYWxsZWQuXG4gICAgdXJsOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBiYXNlID1cbiAgICAgICAgXy5yZXN1bHQodGhpcywgJ3VybFJvb3QnKSB8fFxuICAgICAgICBfLnJlc3VsdCh0aGlzLmNvbGxlY3Rpb24sICd1cmwnKSB8fFxuICAgICAgICB1cmxFcnJvcigpO1xuICAgICAgaWYgKHRoaXMuaXNOZXcoKSkgcmV0dXJuIGJhc2U7XG4gICAgICByZXR1cm4gYmFzZS5yZXBsYWNlKC8oW15cXC9dKSQvLCAnJDEvJykgKyBlbmNvZGVVUklDb21wb25lbnQodGhpcy5pZCk7XG4gICAgfSxcblxuICAgIC8vICoqcGFyc2UqKiBjb252ZXJ0cyBhIHJlc3BvbnNlIGludG8gdGhlIGhhc2ggb2YgYXR0cmlidXRlcyB0byBiZSBgc2V0YCBvblxuICAgIC8vIHRoZSBtb2RlbC4gVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gaXMganVzdCB0byBwYXNzIHRoZSByZXNwb25zZSBhbG9uZy5cbiAgICBwYXJzZTogZnVuY3Rpb24ocmVzcCwgb3B0aW9ucykge1xuICAgICAgcmV0dXJuIHJlc3A7XG4gICAgfSxcblxuICAgIC8vIENyZWF0ZSBhIG5ldyBtb2RlbCB3aXRoIGlkZW50aWNhbCBhdHRyaWJ1dGVzIHRvIHRoaXMgb25lLlxuICAgIGNsb25lOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzLmF0dHJpYnV0ZXMpO1xuICAgIH0sXG5cbiAgICAvLyBBIG1vZGVsIGlzIG5ldyBpZiBpdCBoYXMgbmV2ZXIgYmVlbiBzYXZlZCB0byB0aGUgc2VydmVyLCBhbmQgbGFja3MgYW4gaWQuXG4gICAgaXNOZXc6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICF0aGlzLmhhcyh0aGlzLmlkQXR0cmlidXRlKTtcbiAgICB9LFxuXG4gICAgLy8gQ2hlY2sgaWYgdGhlIG1vZGVsIGlzIGN1cnJlbnRseSBpbiBhIHZhbGlkIHN0YXRlLlxuICAgIGlzVmFsaWQ6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiB0aGlzLl92YWxpZGF0ZSh7fSwgXy5leHRlbmQob3B0aW9ucyB8fCB7fSwgeyB2YWxpZGF0ZTogdHJ1ZSB9KSk7XG4gICAgfSxcblxuICAgIC8vIFJ1biB2YWxpZGF0aW9uIGFnYWluc3QgdGhlIG5leHQgY29tcGxldGUgc2V0IG9mIG1vZGVsIGF0dHJpYnV0ZXMsXG4gICAgLy8gcmV0dXJuaW5nIGB0cnVlYCBpZiBhbGwgaXMgd2VsbC4gT3RoZXJ3aXNlLCBmaXJlIGFuIGBcImludmFsaWRcImAgZXZlbnQuXG4gICAgX3ZhbGlkYXRlOiBmdW5jdGlvbihhdHRycywgb3B0aW9ucykge1xuICAgICAgaWYgKCFvcHRpb25zLnZhbGlkYXRlIHx8ICF0aGlzLnZhbGlkYXRlKSByZXR1cm4gdHJ1ZTtcbiAgICAgIGF0dHJzID0gXy5leHRlbmQoe30sIHRoaXMuYXR0cmlidXRlcywgYXR0cnMpO1xuICAgICAgdmFyIGVycm9yID0gdGhpcy52YWxpZGF0aW9uRXJyb3IgPSB0aGlzLnZhbGlkYXRlKGF0dHJzLCBvcHRpb25zKSB8fCBudWxsO1xuICAgICAgaWYgKCFlcnJvcikgcmV0dXJuIHRydWU7XG4gICAgICB0aGlzLnRyaWdnZXIoJ2ludmFsaWQnLCB0aGlzLCBlcnJvciwgXy5leHRlbmQob3B0aW9ucywge3ZhbGlkYXRpb25FcnJvcjogZXJyb3J9KSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gIH0pO1xuXG4gIC8vIFVuZGVyc2NvcmUgbWV0aG9kcyB0aGF0IHdlIHdhbnQgdG8gaW1wbGVtZW50IG9uIHRoZSBNb2RlbC5cbiAgdmFyIG1vZGVsTWV0aG9kcyA9IFsna2V5cycsICd2YWx1ZXMnLCAncGFpcnMnLCAnaW52ZXJ0JywgJ3BpY2snLCAnb21pdCddO1xuXG4gIC8vIE1peCBpbiBlYWNoIFVuZGVyc2NvcmUgbWV0aG9kIGFzIGEgcHJveHkgdG8gYE1vZGVsI2F0dHJpYnV0ZXNgLlxuICBfLmVhY2gobW9kZWxNZXRob2RzLCBmdW5jdGlvbihtZXRob2QpIHtcbiAgICBNb2RlbC5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICBhcmdzLnVuc2hpZnQodGhpcy5hdHRyaWJ1dGVzKTtcbiAgICAgIHJldHVybiBfW21ldGhvZF0uYXBwbHkoXywgYXJncyk7XG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gQmFja2JvbmUuQ29sbGVjdGlvblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gSWYgbW9kZWxzIHRlbmQgdG8gcmVwcmVzZW50IGEgc2luZ2xlIHJvdyBvZiBkYXRhLCBhIEJhY2tib25lIENvbGxlY3Rpb24gaXNcbiAgLy8gbW9yZSBhbmFsYWdvdXMgdG8gYSB0YWJsZSBmdWxsIG9mIGRhdGEgLi4uIG9yIGEgc21hbGwgc2xpY2Ugb3IgcGFnZSBvZiB0aGF0XG4gIC8vIHRhYmxlLCBvciBhIGNvbGxlY3Rpb24gb2Ygcm93cyB0aGF0IGJlbG9uZyB0b2dldGhlciBmb3IgYSBwYXJ0aWN1bGFyIHJlYXNvblxuICAvLyAtLSBhbGwgb2YgdGhlIG1lc3NhZ2VzIGluIHRoaXMgcGFydGljdWxhciBmb2xkZXIsIGFsbCBvZiB0aGUgZG9jdW1lbnRzXG4gIC8vIGJlbG9uZ2luZyB0byB0aGlzIHBhcnRpY3VsYXIgYXV0aG9yLCBhbmQgc28gb24uIENvbGxlY3Rpb25zIG1haW50YWluXG4gIC8vIGluZGV4ZXMgb2YgdGhlaXIgbW9kZWxzLCBib3RoIGluIG9yZGVyLCBhbmQgZm9yIGxvb2t1cCBieSBgaWRgLlxuXG4gIC8vIENyZWF0ZSBhIG5ldyAqKkNvbGxlY3Rpb24qKiwgcGVyaGFwcyB0byBjb250YWluIGEgc3BlY2lmaWMgdHlwZSBvZiBgbW9kZWxgLlxuICAvLyBJZiBhIGBjb21wYXJhdG9yYCBpcyBzcGVjaWZpZWQsIHRoZSBDb2xsZWN0aW9uIHdpbGwgbWFpbnRhaW5cbiAgLy8gaXRzIG1vZGVscyBpbiBzb3J0IG9yZGVyLCBhcyB0aGV5J3JlIGFkZGVkIGFuZCByZW1vdmVkLlxuICB2YXIgQ29sbGVjdGlvbiA9IEJhY2tib25lLkNvbGxlY3Rpb24gPSBmdW5jdGlvbihtb2RlbHMsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zIHx8IChvcHRpb25zID0ge30pO1xuICAgIGlmIChvcHRpb25zLm1vZGVsKSB0aGlzLm1vZGVsID0gb3B0aW9ucy5tb2RlbDtcbiAgICBpZiAob3B0aW9ucy5jb21wYXJhdG9yICE9PSB2b2lkIDApIHRoaXMuY29tcGFyYXRvciA9IG9wdGlvbnMuY29tcGFyYXRvcjtcbiAgICB0aGlzLl9yZXNldCgpO1xuICAgIHRoaXMuaW5pdGlhbGl6ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmIChtb2RlbHMpIHRoaXMucmVzZXQobW9kZWxzLCBfLmV4dGVuZCh7c2lsZW50OiB0cnVlfSwgb3B0aW9ucykpO1xuICB9O1xuXG4gIC8vIERlZmF1bHQgb3B0aW9ucyBmb3IgYENvbGxlY3Rpb24jc2V0YC5cbiAgdmFyIHNldE9wdGlvbnMgPSB7YWRkOiB0cnVlLCByZW1vdmU6IHRydWUsIG1lcmdlOiB0cnVlfTtcbiAgdmFyIGFkZE9wdGlvbnMgPSB7YWRkOiB0cnVlLCByZW1vdmU6IGZhbHNlfTtcblxuICAvLyBEZWZpbmUgdGhlIENvbGxlY3Rpb24ncyBpbmhlcml0YWJsZSBtZXRob2RzLlxuICBfLmV4dGVuZChDb2xsZWN0aW9uLnByb3RvdHlwZSwgRXZlbnRzLCB7XG5cbiAgICAvLyBUaGUgZGVmYXVsdCBtb2RlbCBmb3IgYSBjb2xsZWN0aW9uIGlzIGp1c3QgYSAqKkJhY2tib25lLk1vZGVsKiouXG4gICAgLy8gVGhpcyBzaG91bGQgYmUgb3ZlcnJpZGRlbiBpbiBtb3N0IGNhc2VzLlxuICAgIG1vZGVsOiBNb2RlbCxcblxuICAgIC8vIEluaXRpYWxpemUgaXMgYW4gZW1wdHkgZnVuY3Rpb24gYnkgZGVmYXVsdC4gT3ZlcnJpZGUgaXQgd2l0aCB5b3VyIG93blxuICAgIC8vIGluaXRpYWxpemF0aW9uIGxvZ2ljLlxuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKCl7fSxcblxuICAgIC8vIFRoZSBKU09OIHJlcHJlc2VudGF0aW9uIG9mIGEgQ29sbGVjdGlvbiBpcyBhbiBhcnJheSBvZiB0aGVcbiAgICAvLyBtb2RlbHMnIGF0dHJpYnV0ZXMuXG4gICAgdG9KU09OOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24obW9kZWwpeyByZXR1cm4gbW9kZWwudG9KU09OKG9wdGlvbnMpOyB9KTtcbiAgICB9LFxuXG4gICAgLy8gUHJveHkgYEJhY2tib25lLnN5bmNgIGJ5IGRlZmF1bHQuXG4gICAgc3luYzogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gQmFja2JvbmUuc3luYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH0sXG5cbiAgICAvLyBBZGQgYSBtb2RlbCwgb3IgbGlzdCBvZiBtb2RlbHMgdG8gdGhlIHNldC5cbiAgICBhZGQ6IGZ1bmN0aW9uKG1vZGVscywgb3B0aW9ucykge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0KG1vZGVscywgXy5leHRlbmQoe21lcmdlOiBmYWxzZX0sIG9wdGlvbnMsIGFkZE9wdGlvbnMpKTtcbiAgICB9LFxuXG4gICAgLy8gUmVtb3ZlIGEgbW9kZWwsIG9yIGEgbGlzdCBvZiBtb2RlbHMgZnJvbSB0aGUgc2V0LlxuICAgIHJlbW92ZTogZnVuY3Rpb24obW9kZWxzLCBvcHRpb25zKSB7XG4gICAgICB2YXIgc2luZ3VsYXIgPSAhXy5pc0FycmF5KG1vZGVscyk7XG4gICAgICBtb2RlbHMgPSBzaW5ndWxhciA/IFttb2RlbHNdIDogXy5jbG9uZShtb2RlbHMpO1xuICAgICAgb3B0aW9ucyB8fCAob3B0aW9ucyA9IHt9KTtcbiAgICAgIHZhciBpLCBsLCBpbmRleCwgbW9kZWw7XG4gICAgICBmb3IgKGkgPSAwLCBsID0gbW9kZWxzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBtb2RlbCA9IG1vZGVsc1tpXSA9IHRoaXMuZ2V0KG1vZGVsc1tpXSk7XG4gICAgICAgIGlmICghbW9kZWwpIGNvbnRpbnVlO1xuICAgICAgICBkZWxldGUgdGhpcy5fYnlJZFttb2RlbC5pZF07XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9ieUlkW21vZGVsLmNpZF07XG4gICAgICAgIGluZGV4ID0gdGhpcy5pbmRleE9mKG1vZGVsKTtcbiAgICAgICAgdGhpcy5tb2RlbHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgdGhpcy5sZW5ndGgtLTtcbiAgICAgICAgaWYgKCFvcHRpb25zLnNpbGVudCkge1xuICAgICAgICAgIG9wdGlvbnMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgICBtb2RlbC50cmlnZ2VyKCdyZW1vdmUnLCBtb2RlbCwgdGhpcywgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fcmVtb3ZlUmVmZXJlbmNlKG1vZGVsLCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzaW5ndWxhciA/IG1vZGVsc1swXSA6IG1vZGVscztcbiAgICB9LFxuXG4gICAgLy8gVXBkYXRlIGEgY29sbGVjdGlvbiBieSBgc2V0YC1pbmcgYSBuZXcgbGlzdCBvZiBtb2RlbHMsIGFkZGluZyBuZXcgb25lcyxcbiAgICAvLyByZW1vdmluZyBtb2RlbHMgdGhhdCBhcmUgbm8gbG9uZ2VyIHByZXNlbnQsIGFuZCBtZXJnaW5nIG1vZGVscyB0aGF0XG4gICAgLy8gYWxyZWFkeSBleGlzdCBpbiB0aGUgY29sbGVjdGlvbiwgYXMgbmVjZXNzYXJ5LiBTaW1pbGFyIHRvICoqTW9kZWwjc2V0KiosXG4gICAgLy8gdGhlIGNvcmUgb3BlcmF0aW9uIGZvciB1cGRhdGluZyB0aGUgZGF0YSBjb250YWluZWQgYnkgdGhlIGNvbGxlY3Rpb24uXG4gICAgc2V0OiBmdW5jdGlvbihtb2RlbHMsIG9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSBfLmRlZmF1bHRzKHt9LCBvcHRpb25zLCBzZXRPcHRpb25zKTtcbiAgICAgIGlmIChvcHRpb25zLnBhcnNlKSBtb2RlbHMgPSB0aGlzLnBhcnNlKG1vZGVscywgb3B0aW9ucyk7XG4gICAgICB2YXIgc2luZ3VsYXIgPSAhXy5pc0FycmF5KG1vZGVscyk7XG4gICAgICBtb2RlbHMgPSBzaW5ndWxhciA/IChtb2RlbHMgPyBbbW9kZWxzXSA6IFtdKSA6IF8uY2xvbmUobW9kZWxzKTtcbiAgICAgIHZhciBpLCBsLCBpZCwgbW9kZWwsIGF0dHJzLCBleGlzdGluZywgc29ydDtcbiAgICAgIHZhciBhdCA9IG9wdGlvbnMuYXQ7XG4gICAgICB2YXIgdGFyZ2V0TW9kZWwgPSB0aGlzLm1vZGVsO1xuICAgICAgdmFyIHNvcnRhYmxlID0gdGhpcy5jb21wYXJhdG9yICYmIChhdCA9PSBudWxsKSAmJiBvcHRpb25zLnNvcnQgIT09IGZhbHNlO1xuICAgICAgdmFyIHNvcnRBdHRyID0gXy5pc1N0cmluZyh0aGlzLmNvbXBhcmF0b3IpID8gdGhpcy5jb21wYXJhdG9yIDogbnVsbDtcbiAgICAgIHZhciB0b0FkZCA9IFtdLCB0b1JlbW92ZSA9IFtdLCBtb2RlbE1hcCA9IHt9O1xuICAgICAgdmFyIGFkZCA9IG9wdGlvbnMuYWRkLCBtZXJnZSA9IG9wdGlvbnMubWVyZ2UsIHJlbW92ZSA9IG9wdGlvbnMucmVtb3ZlO1xuICAgICAgdmFyIG9yZGVyID0gIXNvcnRhYmxlICYmIGFkZCAmJiByZW1vdmUgPyBbXSA6IGZhbHNlO1xuXG4gICAgICAvLyBUdXJuIGJhcmUgb2JqZWN0cyBpbnRvIG1vZGVsIHJlZmVyZW5jZXMsIGFuZCBwcmV2ZW50IGludmFsaWQgbW9kZWxzXG4gICAgICAvLyBmcm9tIGJlaW5nIGFkZGVkLlxuICAgICAgZm9yIChpID0gMCwgbCA9IG1vZGVscy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgYXR0cnMgPSBtb2RlbHNbaV0gfHwge307XG4gICAgICAgIGlmIChhdHRycyBpbnN0YW5jZW9mIE1vZGVsKSB7XG4gICAgICAgICAgaWQgPSBtb2RlbCA9IGF0dHJzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlkID0gYXR0cnNbdGFyZ2V0TW9kZWwucHJvdG90eXBlLmlkQXR0cmlidXRlIHx8ICdpZCddO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgYSBkdXBsaWNhdGUgaXMgZm91bmQsIHByZXZlbnQgaXQgZnJvbSBiZWluZyBhZGRlZCBhbmRcbiAgICAgICAgLy8gb3B0aW9uYWxseSBtZXJnZSBpdCBpbnRvIHRoZSBleGlzdGluZyBtb2RlbC5cbiAgICAgICAgaWYgKGV4aXN0aW5nID0gdGhpcy5nZXQoaWQpKSB7XG4gICAgICAgICAgaWYgKHJlbW92ZSkgbW9kZWxNYXBbZXhpc3RpbmcuY2lkXSA9IHRydWU7XG4gICAgICAgICAgaWYgKG1lcmdlKSB7XG4gICAgICAgICAgICBhdHRycyA9IGF0dHJzID09PSBtb2RlbCA/IG1vZGVsLmF0dHJpYnV0ZXMgOiBhdHRycztcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnBhcnNlKSBhdHRycyA9IGV4aXN0aW5nLnBhcnNlKGF0dHJzLCBvcHRpb25zKTtcbiAgICAgICAgICAgIGV4aXN0aW5nLnNldChhdHRycywgb3B0aW9ucyk7XG4gICAgICAgICAgICBpZiAoc29ydGFibGUgJiYgIXNvcnQgJiYgZXhpc3RpbmcuaGFzQ2hhbmdlZChzb3J0QXR0cikpIHNvcnQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBtb2RlbHNbaV0gPSBleGlzdGluZztcblxuICAgICAgICAvLyBJZiB0aGlzIGlzIGEgbmV3LCB2YWxpZCBtb2RlbCwgcHVzaCBpdCB0byB0aGUgYHRvQWRkYCBsaXN0LlxuICAgICAgICB9IGVsc2UgaWYgKGFkZCkge1xuICAgICAgICAgIG1vZGVsID0gbW9kZWxzW2ldID0gdGhpcy5fcHJlcGFyZU1vZGVsKGF0dHJzLCBvcHRpb25zKTtcbiAgICAgICAgICBpZiAoIW1vZGVsKSBjb250aW51ZTtcbiAgICAgICAgICB0b0FkZC5wdXNoKG1vZGVsKTtcbiAgICAgICAgICB0aGlzLl9hZGRSZWZlcmVuY2UobW9kZWwsIG9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRG8gbm90IGFkZCBtdWx0aXBsZSBtb2RlbHMgd2l0aCB0aGUgc2FtZSBgaWRgLlxuICAgICAgICBtb2RlbCA9IGV4aXN0aW5nIHx8IG1vZGVsO1xuICAgICAgICBpZiAob3JkZXIgJiYgKG1vZGVsLmlzTmV3KCkgfHwgIW1vZGVsTWFwW21vZGVsLmlkXSkpIG9yZGVyLnB1c2gobW9kZWwpO1xuICAgICAgICBtb2RlbE1hcFttb2RlbC5pZF0gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBSZW1vdmUgbm9uZXhpc3RlbnQgbW9kZWxzIGlmIGFwcHJvcHJpYXRlLlxuICAgICAgaWYgKHJlbW92ZSkge1xuICAgICAgICBmb3IgKGkgPSAwLCBsID0gdGhpcy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgICBpZiAoIW1vZGVsTWFwWyhtb2RlbCA9IHRoaXMubW9kZWxzW2ldKS5jaWRdKSB0b1JlbW92ZS5wdXNoKG1vZGVsKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodG9SZW1vdmUubGVuZ3RoKSB0aGlzLnJlbW92ZSh0b1JlbW92ZSwgb3B0aW9ucyk7XG4gICAgICB9XG5cbiAgICAgIC8vIFNlZSBpZiBzb3J0aW5nIGlzIG5lZWRlZCwgdXBkYXRlIGBsZW5ndGhgIGFuZCBzcGxpY2UgaW4gbmV3IG1vZGVscy5cbiAgICAgIGlmICh0b0FkZC5sZW5ndGggfHwgKG9yZGVyICYmIG9yZGVyLmxlbmd0aCkpIHtcbiAgICAgICAgaWYgKHNvcnRhYmxlKSBzb3J0ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sZW5ndGggKz0gdG9BZGQubGVuZ3RoO1xuICAgICAgICBpZiAoYXQgIT0gbnVsbCkge1xuICAgICAgICAgIGZvciAoaSA9IDAsIGwgPSB0b0FkZC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWxzLnNwbGljZShhdCArIGksIDAsIHRvQWRkW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKG9yZGVyKSB0aGlzLm1vZGVscy5sZW5ndGggPSAwO1xuICAgICAgICAgIHZhciBvcmRlcmVkTW9kZWxzID0gb3JkZXIgfHwgdG9BZGQ7XG4gICAgICAgICAgZm9yIChpID0gMCwgbCA9IG9yZGVyZWRNb2RlbHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVscy5wdXNoKG9yZGVyZWRNb2RlbHNbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBTaWxlbnRseSBzb3J0IHRoZSBjb2xsZWN0aW9uIGlmIGFwcHJvcHJpYXRlLlxuICAgICAgaWYgKHNvcnQpIHRoaXMuc29ydCh7c2lsZW50OiB0cnVlfSk7XG5cbiAgICAgIC8vIFVubGVzcyBzaWxlbmNlZCwgaXQncyB0aW1lIHRvIGZpcmUgYWxsIGFwcHJvcHJpYXRlIGFkZC9zb3J0IGV2ZW50cy5cbiAgICAgIGlmICghb3B0aW9ucy5zaWxlbnQpIHtcbiAgICAgICAgZm9yIChpID0gMCwgbCA9IHRvQWRkLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgIChtb2RlbCA9IHRvQWRkW2ldKS50cmlnZ2VyKCdhZGQnLCBtb2RlbCwgdGhpcywgb3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNvcnQgfHwgKG9yZGVyICYmIG9yZGVyLmxlbmd0aCkpIHRoaXMudHJpZ2dlcignc29ydCcsIHRoaXMsIG9wdGlvbnMpO1xuICAgICAgfVxuXG4gICAgICAvLyBSZXR1cm4gdGhlIGFkZGVkIChvciBtZXJnZWQpIG1vZGVsIChvciBtb2RlbHMpLlxuICAgICAgcmV0dXJuIHNpbmd1bGFyID8gbW9kZWxzWzBdIDogbW9kZWxzO1xuICAgIH0sXG5cbiAgICAvLyBXaGVuIHlvdSBoYXZlIG1vcmUgaXRlbXMgdGhhbiB5b3Ugd2FudCB0byBhZGQgb3IgcmVtb3ZlIGluZGl2aWR1YWxseSxcbiAgICAvLyB5b3UgY2FuIHJlc2V0IHRoZSBlbnRpcmUgc2V0IHdpdGggYSBuZXcgbGlzdCBvZiBtb2RlbHMsIHdpdGhvdXQgZmlyaW5nXG4gICAgLy8gYW55IGdyYW51bGFyIGBhZGRgIG9yIGByZW1vdmVgIGV2ZW50cy4gRmlyZXMgYHJlc2V0YCB3aGVuIGZpbmlzaGVkLlxuICAgIC8vIFVzZWZ1bCBmb3IgYnVsayBvcGVyYXRpb25zIGFuZCBvcHRpbWl6YXRpb25zLlxuICAgIHJlc2V0OiBmdW5jdGlvbihtb2RlbHMsIG9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgfHwgKG9wdGlvbnMgPSB7fSk7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMubW9kZWxzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB0aGlzLl9yZW1vdmVSZWZlcmVuY2UodGhpcy5tb2RlbHNbaV0sIG9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgb3B0aW9ucy5wcmV2aW91c01vZGVscyA9IHRoaXMubW9kZWxzO1xuICAgICAgdGhpcy5fcmVzZXQoKTtcbiAgICAgIG1vZGVscyA9IHRoaXMuYWRkKG1vZGVscywgXy5leHRlbmQoe3NpbGVudDogdHJ1ZX0sIG9wdGlvbnMpKTtcbiAgICAgIGlmICghb3B0aW9ucy5zaWxlbnQpIHRoaXMudHJpZ2dlcigncmVzZXQnLCB0aGlzLCBvcHRpb25zKTtcbiAgICAgIHJldHVybiBtb2RlbHM7XG4gICAgfSxcblxuICAgIC8vIEFkZCBhIG1vZGVsIHRvIHRoZSBlbmQgb2YgdGhlIGNvbGxlY3Rpb24uXG4gICAgcHVzaDogZnVuY3Rpb24obW9kZWwsIG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiB0aGlzLmFkZChtb2RlbCwgXy5leHRlbmQoe2F0OiB0aGlzLmxlbmd0aH0sIG9wdGlvbnMpKTtcbiAgICB9LFxuXG4gICAgLy8gUmVtb3ZlIGEgbW9kZWwgZnJvbSB0aGUgZW5kIG9mIHRoZSBjb2xsZWN0aW9uLlxuICAgIHBvcDogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgdmFyIG1vZGVsID0gdGhpcy5hdCh0aGlzLmxlbmd0aCAtIDEpO1xuICAgICAgdGhpcy5yZW1vdmUobW9kZWwsIG9wdGlvbnMpO1xuICAgICAgcmV0dXJuIG1vZGVsO1xuICAgIH0sXG5cbiAgICAvLyBBZGQgYSBtb2RlbCB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZSBjb2xsZWN0aW9uLlxuICAgIHVuc2hpZnQ6IGZ1bmN0aW9uKG1vZGVsLCBvcHRpb25zKSB7XG4gICAgICByZXR1cm4gdGhpcy5hZGQobW9kZWwsIF8uZXh0ZW5kKHthdDogMH0sIG9wdGlvbnMpKTtcbiAgICB9LFxuXG4gICAgLy8gUmVtb3ZlIGEgbW9kZWwgZnJvbSB0aGUgYmVnaW5uaW5nIG9mIHRoZSBjb2xsZWN0aW9uLlxuICAgIHNoaWZ0OiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICB2YXIgbW9kZWwgPSB0aGlzLmF0KDApO1xuICAgICAgdGhpcy5yZW1vdmUobW9kZWwsIG9wdGlvbnMpO1xuICAgICAgcmV0dXJuIG1vZGVsO1xuICAgIH0sXG5cbiAgICAvLyBTbGljZSBvdXQgYSBzdWItYXJyYXkgb2YgbW9kZWxzIGZyb20gdGhlIGNvbGxlY3Rpb24uXG4gICAgc2xpY2U6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHNsaWNlLmFwcGx5KHRoaXMubW9kZWxzLCBhcmd1bWVudHMpO1xuICAgIH0sXG5cbiAgICAvLyBHZXQgYSBtb2RlbCBmcm9tIHRoZSBzZXQgYnkgaWQuXG4gICAgZ2V0OiBmdW5jdGlvbihvYmopIHtcbiAgICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIHZvaWQgMDtcbiAgICAgIHJldHVybiB0aGlzLl9ieUlkW29ial0gfHwgdGhpcy5fYnlJZFtvYmouaWRdIHx8IHRoaXMuX2J5SWRbb2JqLmNpZF07XG4gICAgfSxcblxuICAgIC8vIEdldCB0aGUgbW9kZWwgYXQgdGhlIGdpdmVuIGluZGV4LlxuICAgIGF0OiBmdW5jdGlvbihpbmRleCkge1xuICAgICAgcmV0dXJuIHRoaXMubW9kZWxzW2luZGV4XTtcbiAgICB9LFxuXG4gICAgLy8gUmV0dXJuIG1vZGVscyB3aXRoIG1hdGNoaW5nIGF0dHJpYnV0ZXMuIFVzZWZ1bCBmb3Igc2ltcGxlIGNhc2VzIG9mXG4gICAgLy8gYGZpbHRlcmAuXG4gICAgd2hlcmU6IGZ1bmN0aW9uKGF0dHJzLCBmaXJzdCkge1xuICAgICAgaWYgKF8uaXNFbXB0eShhdHRycykpIHJldHVybiBmaXJzdCA/IHZvaWQgMCA6IFtdO1xuICAgICAgcmV0dXJuIHRoaXNbZmlyc3QgPyAnZmluZCcgOiAnZmlsdGVyJ10oZnVuY3Rpb24obW9kZWwpIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGF0dHJzKSB7XG4gICAgICAgICAgaWYgKGF0dHJzW2tleV0gIT09IG1vZGVsLmdldChrZXkpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgLy8gUmV0dXJuIHRoZSBmaXJzdCBtb2RlbCB3aXRoIG1hdGNoaW5nIGF0dHJpYnV0ZXMuIFVzZWZ1bCBmb3Igc2ltcGxlIGNhc2VzXG4gICAgLy8gb2YgYGZpbmRgLlxuICAgIGZpbmRXaGVyZTogZnVuY3Rpb24oYXR0cnMpIHtcbiAgICAgIHJldHVybiB0aGlzLndoZXJlKGF0dHJzLCB0cnVlKTtcbiAgICB9LFxuXG4gICAgLy8gRm9yY2UgdGhlIGNvbGxlY3Rpb24gdG8gcmUtc29ydCBpdHNlbGYuIFlvdSBkb24ndCBuZWVkIHRvIGNhbGwgdGhpcyB1bmRlclxuICAgIC8vIG5vcm1hbCBjaXJjdW1zdGFuY2VzLCBhcyB0aGUgc2V0IHdpbGwgbWFpbnRhaW4gc29ydCBvcmRlciBhcyBlYWNoIGl0ZW1cbiAgICAvLyBpcyBhZGRlZC5cbiAgICBzb3J0OiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICBpZiAoIXRoaXMuY29tcGFyYXRvcikgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3Qgc29ydCBhIHNldCB3aXRob3V0IGEgY29tcGFyYXRvcicpO1xuICAgICAgb3B0aW9ucyB8fCAob3B0aW9ucyA9IHt9KTtcblxuICAgICAgLy8gUnVuIHNvcnQgYmFzZWQgb24gdHlwZSBvZiBgY29tcGFyYXRvcmAuXG4gICAgICBpZiAoXy5pc1N0cmluZyh0aGlzLmNvbXBhcmF0b3IpIHx8IHRoaXMuY29tcGFyYXRvci5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgdGhpcy5tb2RlbHMgPSB0aGlzLnNvcnRCeSh0aGlzLmNvbXBhcmF0b3IsIHRoaXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tb2RlbHMuc29ydChfLmJpbmQodGhpcy5jb21wYXJhdG9yLCB0aGlzKSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghb3B0aW9ucy5zaWxlbnQpIHRoaXMudHJpZ2dlcignc29ydCcsIHRoaXMsIG9wdGlvbnMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8vIFBsdWNrIGFuIGF0dHJpYnV0ZSBmcm9tIGVhY2ggbW9kZWwgaW4gdGhlIGNvbGxlY3Rpb24uXG4gICAgcGx1Y2s6IGZ1bmN0aW9uKGF0dHIpIHtcbiAgICAgIHJldHVybiBfLmludm9rZSh0aGlzLm1vZGVscywgJ2dldCcsIGF0dHIpO1xuICAgIH0sXG5cbiAgICAvLyBGZXRjaCB0aGUgZGVmYXVsdCBzZXQgb2YgbW9kZWxzIGZvciB0aGlzIGNvbGxlY3Rpb24sIHJlc2V0dGluZyB0aGVcbiAgICAvLyBjb2xsZWN0aW9uIHdoZW4gdGhleSBhcnJpdmUuIElmIGByZXNldDogdHJ1ZWAgaXMgcGFzc2VkLCB0aGUgcmVzcG9uc2VcbiAgICAvLyBkYXRhIHdpbGwgYmUgcGFzc2VkIHRocm91Z2ggdGhlIGByZXNldGAgbWV0aG9kIGluc3RlYWQgb2YgYHNldGAuXG4gICAgZmV0Y2g6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnMgPSBvcHRpb25zID8gXy5jbG9uZShvcHRpb25zKSA6IHt9O1xuICAgICAgaWYgKG9wdGlvbnMucGFyc2UgPT09IHZvaWQgMCkgb3B0aW9ucy5wYXJzZSA9IHRydWU7XG4gICAgICB2YXIgc3VjY2VzcyA9IG9wdGlvbnMuc3VjY2VzcztcbiAgICAgIHZhciBjb2xsZWN0aW9uID0gdGhpcztcbiAgICAgIG9wdGlvbnMuc3VjY2VzcyA9IGZ1bmN0aW9uKHJlc3ApIHtcbiAgICAgICAgdmFyIG1ldGhvZCA9IG9wdGlvbnMucmVzZXQgPyAncmVzZXQnIDogJ3NldCc7XG4gICAgICAgIGNvbGxlY3Rpb25bbWV0aG9kXShyZXNwLCBvcHRpb25zKTtcbiAgICAgICAgaWYgKHN1Y2Nlc3MpIHN1Y2Nlc3MoY29sbGVjdGlvbiwgcmVzcCwgb3B0aW9ucyk7XG4gICAgICAgIGNvbGxlY3Rpb24udHJpZ2dlcignc3luYycsIGNvbGxlY3Rpb24sIHJlc3AsIG9wdGlvbnMpO1xuICAgICAgfTtcbiAgICAgIHdyYXBFcnJvcih0aGlzLCBvcHRpb25zKTtcbiAgICAgIHJldHVybiB0aGlzLnN5bmMoJ3JlYWQnLCB0aGlzLCBvcHRpb25zKTtcbiAgICB9LFxuXG4gICAgLy8gQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIGEgbW9kZWwgaW4gdGhpcyBjb2xsZWN0aW9uLiBBZGQgdGhlIG1vZGVsIHRvIHRoZVxuICAgIC8vIGNvbGxlY3Rpb24gaW1tZWRpYXRlbHksIHVubGVzcyBgd2FpdDogdHJ1ZWAgaXMgcGFzc2VkLCBpbiB3aGljaCBjYXNlIHdlXG4gICAgLy8gd2FpdCBmb3IgdGhlIHNlcnZlciB0byBhZ3JlZS5cbiAgICBjcmVhdGU6IGZ1bmN0aW9uKG1vZGVsLCBvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0gb3B0aW9ucyA/IF8uY2xvbmUob3B0aW9ucykgOiB7fTtcbiAgICAgIGlmICghKG1vZGVsID0gdGhpcy5fcHJlcGFyZU1vZGVsKG1vZGVsLCBvcHRpb25zKSkpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmICghb3B0aW9ucy53YWl0KSB0aGlzLmFkZChtb2RlbCwgb3B0aW9ucyk7XG4gICAgICB2YXIgY29sbGVjdGlvbiA9IHRoaXM7XG4gICAgICB2YXIgc3VjY2VzcyA9IG9wdGlvbnMuc3VjY2VzcztcbiAgICAgIG9wdGlvbnMuc3VjY2VzcyA9IGZ1bmN0aW9uKG1vZGVsLCByZXNwKSB7XG4gICAgICAgIGlmIChvcHRpb25zLndhaXQpIGNvbGxlY3Rpb24uYWRkKG1vZGVsLCBvcHRpb25zKTtcbiAgICAgICAgaWYgKHN1Y2Nlc3MpIHN1Y2Nlc3MobW9kZWwsIHJlc3AsIG9wdGlvbnMpO1xuICAgICAgfTtcbiAgICAgIG1vZGVsLnNhdmUobnVsbCwgb3B0aW9ucyk7XG4gICAgICByZXR1cm4gbW9kZWw7XG4gICAgfSxcblxuICAgIC8vICoqcGFyc2UqKiBjb252ZXJ0cyBhIHJlc3BvbnNlIGludG8gYSBsaXN0IG9mIG1vZGVscyB0byBiZSBhZGRlZCB0byB0aGVcbiAgICAvLyBjb2xsZWN0aW9uLiBUaGUgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBpcyBqdXN0IHRvIHBhc3MgaXQgdGhyb3VnaC5cbiAgICBwYXJzZTogZnVuY3Rpb24ocmVzcCwgb3B0aW9ucykge1xuICAgICAgcmV0dXJuIHJlc3A7XG4gICAgfSxcblxuICAgIC8vIENyZWF0ZSBhIG5ldyBjb2xsZWN0aW9uIHdpdGggYW4gaWRlbnRpY2FsIGxpc3Qgb2YgbW9kZWxzIGFzIHRoaXMgb25lLlxuICAgIGNsb25lOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzLm1vZGVscyk7XG4gICAgfSxcblxuICAgIC8vIFByaXZhdGUgbWV0aG9kIHRvIHJlc2V0IGFsbCBpbnRlcm5hbCBzdGF0ZS4gQ2FsbGVkIHdoZW4gdGhlIGNvbGxlY3Rpb25cbiAgICAvLyBpcyBmaXJzdCBpbml0aWFsaXplZCBvciByZXNldC5cbiAgICBfcmVzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5sZW5ndGggPSAwO1xuICAgICAgdGhpcy5tb2RlbHMgPSBbXTtcbiAgICAgIHRoaXMuX2J5SWQgID0ge307XG4gICAgfSxcblxuICAgIC8vIFByZXBhcmUgYSBoYXNoIG9mIGF0dHJpYnV0ZXMgKG9yIG90aGVyIG1vZGVsKSB0byBiZSBhZGRlZCB0byB0aGlzXG4gICAgLy8gY29sbGVjdGlvbi5cbiAgICBfcHJlcGFyZU1vZGVsOiBmdW5jdGlvbihhdHRycywgb3B0aW9ucykge1xuICAgICAgaWYgKGF0dHJzIGluc3RhbmNlb2YgTW9kZWwpIHJldHVybiBhdHRycztcbiAgICAgIG9wdGlvbnMgPSBvcHRpb25zID8gXy5jbG9uZShvcHRpb25zKSA6IHt9O1xuICAgICAgb3B0aW9ucy5jb2xsZWN0aW9uID0gdGhpcztcbiAgICAgIHZhciBtb2RlbCA9IG5ldyB0aGlzLm1vZGVsKGF0dHJzLCBvcHRpb25zKTtcbiAgICAgIGlmICghbW9kZWwudmFsaWRhdGlvbkVycm9yKSByZXR1cm4gbW9kZWw7XG4gICAgICB0aGlzLnRyaWdnZXIoJ2ludmFsaWQnLCB0aGlzLCBtb2RlbC52YWxpZGF0aW9uRXJyb3IsIG9wdGlvbnMpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICAvLyBJbnRlcm5hbCBtZXRob2QgdG8gY3JlYXRlIGEgbW9kZWwncyB0aWVzIHRvIGEgY29sbGVjdGlvbi5cbiAgICBfYWRkUmVmZXJlbmNlOiBmdW5jdGlvbihtb2RlbCwgb3B0aW9ucykge1xuICAgICAgdGhpcy5fYnlJZFttb2RlbC5jaWRdID0gbW9kZWw7XG4gICAgICBpZiAobW9kZWwuaWQgIT0gbnVsbCkgdGhpcy5fYnlJZFttb2RlbC5pZF0gPSBtb2RlbDtcbiAgICAgIGlmICghbW9kZWwuY29sbGVjdGlvbikgbW9kZWwuY29sbGVjdGlvbiA9IHRoaXM7XG4gICAgICBtb2RlbC5vbignYWxsJywgdGhpcy5fb25Nb2RlbEV2ZW50LCB0aGlzKTtcbiAgICB9LFxuXG4gICAgLy8gSW50ZXJuYWwgbWV0aG9kIHRvIHNldmVyIGEgbW9kZWwncyB0aWVzIHRvIGEgY29sbGVjdGlvbi5cbiAgICBfcmVtb3ZlUmVmZXJlbmNlOiBmdW5jdGlvbihtb2RlbCwgb3B0aW9ucykge1xuICAgICAgaWYgKHRoaXMgPT09IG1vZGVsLmNvbGxlY3Rpb24pIGRlbGV0ZSBtb2RlbC5jb2xsZWN0aW9uO1xuICAgICAgbW9kZWwub2ZmKCdhbGwnLCB0aGlzLl9vbk1vZGVsRXZlbnQsIHRoaXMpO1xuICAgIH0sXG5cbiAgICAvLyBJbnRlcm5hbCBtZXRob2QgY2FsbGVkIGV2ZXJ5IHRpbWUgYSBtb2RlbCBpbiB0aGUgc2V0IGZpcmVzIGFuIGV2ZW50LlxuICAgIC8vIFNldHMgbmVlZCB0byB1cGRhdGUgdGhlaXIgaW5kZXhlcyB3aGVuIG1vZGVscyBjaGFuZ2UgaWRzLiBBbGwgb3RoZXJcbiAgICAvLyBldmVudHMgc2ltcGx5IHByb3h5IHRocm91Z2guIFwiYWRkXCIgYW5kIFwicmVtb3ZlXCIgZXZlbnRzIHRoYXQgb3JpZ2luYXRlXG4gICAgLy8gaW4gb3RoZXIgY29sbGVjdGlvbnMgYXJlIGlnbm9yZWQuXG4gICAgX29uTW9kZWxFdmVudDogZnVuY3Rpb24oZXZlbnQsIG1vZGVsLCBjb2xsZWN0aW9uLCBvcHRpb25zKSB7XG4gICAgICBpZiAoKGV2ZW50ID09PSAnYWRkJyB8fCBldmVudCA9PT0gJ3JlbW92ZScpICYmIGNvbGxlY3Rpb24gIT09IHRoaXMpIHJldHVybjtcbiAgICAgIGlmIChldmVudCA9PT0gJ2Rlc3Ryb3knKSB0aGlzLnJlbW92ZShtb2RlbCwgb3B0aW9ucyk7XG4gICAgICBpZiAobW9kZWwgJiYgZXZlbnQgPT09ICdjaGFuZ2U6JyArIG1vZGVsLmlkQXR0cmlidXRlKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9ieUlkW21vZGVsLnByZXZpb3VzKG1vZGVsLmlkQXR0cmlidXRlKV07XG4gICAgICAgIGlmIChtb2RlbC5pZCAhPSBudWxsKSB0aGlzLl9ieUlkW21vZGVsLmlkXSA9IG1vZGVsO1xuICAgICAgfVxuICAgICAgdGhpcy50cmlnZ2VyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gIH0pO1xuXG4gIC8vIFVuZGVyc2NvcmUgbWV0aG9kcyB0aGF0IHdlIHdhbnQgdG8gaW1wbGVtZW50IG9uIHRoZSBDb2xsZWN0aW9uLlxuICAvLyA5MCUgb2YgdGhlIGNvcmUgdXNlZnVsbmVzcyBvZiBCYWNrYm9uZSBDb2xsZWN0aW9ucyBpcyBhY3R1YWxseSBpbXBsZW1lbnRlZFxuICAvLyByaWdodCBoZXJlOlxuICB2YXIgbWV0aG9kcyA9IFsnZm9yRWFjaCcsICdlYWNoJywgJ21hcCcsICdjb2xsZWN0JywgJ3JlZHVjZScsICdmb2xkbCcsXG4gICAgJ2luamVjdCcsICdyZWR1Y2VSaWdodCcsICdmb2xkcicsICdmaW5kJywgJ2RldGVjdCcsICdmaWx0ZXInLCAnc2VsZWN0JyxcbiAgICAncmVqZWN0JywgJ2V2ZXJ5JywgJ2FsbCcsICdzb21lJywgJ2FueScsICdpbmNsdWRlJywgJ2NvbnRhaW5zJywgJ2ludm9rZScsXG4gICAgJ21heCcsICdtaW4nLCAndG9BcnJheScsICdzaXplJywgJ2ZpcnN0JywgJ2hlYWQnLCAndGFrZScsICdpbml0aWFsJywgJ3Jlc3QnLFxuICAgICd0YWlsJywgJ2Ryb3AnLCAnbGFzdCcsICd3aXRob3V0JywgJ2RpZmZlcmVuY2UnLCAnaW5kZXhPZicsICdzaHVmZmxlJyxcbiAgICAnbGFzdEluZGV4T2YnLCAnaXNFbXB0eScsICdjaGFpbicsICdzYW1wbGUnXTtcblxuICAvLyBNaXggaW4gZWFjaCBVbmRlcnNjb3JlIG1ldGhvZCBhcyBhIHByb3h5IHRvIGBDb2xsZWN0aW9uI21vZGVsc2AuXG4gIF8uZWFjaChtZXRob2RzLCBmdW5jdGlvbihtZXRob2QpIHtcbiAgICBDb2xsZWN0aW9uLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgIGFyZ3MudW5zaGlmdCh0aGlzLm1vZGVscyk7XG4gICAgICByZXR1cm4gX1ttZXRob2RdLmFwcGx5KF8sIGFyZ3MpO1xuICAgIH07XG4gIH0pO1xuXG4gIC8vIFVuZGVyc2NvcmUgbWV0aG9kcyB0aGF0IHRha2UgYSBwcm9wZXJ0eSBuYW1lIGFzIGFuIGFyZ3VtZW50LlxuICB2YXIgYXR0cmlidXRlTWV0aG9kcyA9IFsnZ3JvdXBCeScsICdjb3VudEJ5JywgJ3NvcnRCeScsICdpbmRleEJ5J107XG5cbiAgLy8gVXNlIGF0dHJpYnV0ZXMgaW5zdGVhZCBvZiBwcm9wZXJ0aWVzLlxuICBfLmVhY2goYXR0cmlidXRlTWV0aG9kcywgZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgQ29sbGVjdGlvbi5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHZhbHVlLCBjb250ZXh0KSB7XG4gICAgICB2YXIgaXRlcmF0b3IgPSBfLmlzRnVuY3Rpb24odmFsdWUpID8gdmFsdWUgOiBmdW5jdGlvbihtb2RlbCkge1xuICAgICAgICByZXR1cm4gbW9kZWwuZ2V0KHZhbHVlKTtcbiAgICAgIH07XG4gICAgICByZXR1cm4gX1ttZXRob2RdKHRoaXMubW9kZWxzLCBpdGVyYXRvciwgY29udGV4dCk7XG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gQmFja2JvbmUuVmlld1xuICAvLyAtLS0tLS0tLS0tLS0tXG5cbiAgLy8gQmFja2JvbmUgVmlld3MgYXJlIGFsbW9zdCBtb3JlIGNvbnZlbnRpb24gdGhhbiB0aGV5IGFyZSBhY3R1YWwgY29kZS4gQSBWaWV3XG4gIC8vIGlzIHNpbXBseSBhIEphdmFTY3JpcHQgb2JqZWN0IHRoYXQgcmVwcmVzZW50cyBhIGxvZ2ljYWwgY2h1bmsgb2YgVUkgaW4gdGhlXG4gIC8vIERPTS4gVGhpcyBtaWdodCBiZSBhIHNpbmdsZSBpdGVtLCBhbiBlbnRpcmUgbGlzdCwgYSBzaWRlYmFyIG9yIHBhbmVsLCBvclxuICAvLyBldmVuIHRoZSBzdXJyb3VuZGluZyBmcmFtZSB3aGljaCB3cmFwcyB5b3VyIHdob2xlIGFwcC4gRGVmaW5pbmcgYSBjaHVuayBvZlxuICAvLyBVSSBhcyBhICoqVmlldyoqIGFsbG93cyB5b3UgdG8gZGVmaW5lIHlvdXIgRE9NIGV2ZW50cyBkZWNsYXJhdGl2ZWx5LCB3aXRob3V0XG4gIC8vIGhhdmluZyB0byB3b3JyeSBhYm91dCByZW5kZXIgb3JkZXIgLi4uIGFuZCBtYWtlcyBpdCBlYXN5IGZvciB0aGUgdmlldyB0b1xuICAvLyByZWFjdCB0byBzcGVjaWZpYyBjaGFuZ2VzIGluIHRoZSBzdGF0ZSBvZiB5b3VyIG1vZGVscy5cblxuICAvLyBDcmVhdGluZyBhIEJhY2tib25lLlZpZXcgY3JlYXRlcyBpdHMgaW5pdGlhbCBlbGVtZW50IG91dHNpZGUgb2YgdGhlIERPTSxcbiAgLy8gaWYgYW4gZXhpc3RpbmcgZWxlbWVudCBpcyBub3QgcHJvdmlkZWQuLi5cbiAgdmFyIFZpZXcgPSBCYWNrYm9uZS5WaWV3ID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHRoaXMuY2lkID0gXy51bmlxdWVJZCgndmlldycpO1xuICAgIG9wdGlvbnMgfHwgKG9wdGlvbnMgPSB7fSk7XG4gICAgXy5leHRlbmQodGhpcywgXy5waWNrKG9wdGlvbnMsIHZpZXdPcHRpb25zKSk7XG4gICAgdGhpcy5fZW5zdXJlRWxlbWVudCgpO1xuICAgIHRoaXMuaW5pdGlhbGl6ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMuZGVsZWdhdGVFdmVudHMoKTtcbiAgfTtcblxuICAvLyBDYWNoZWQgcmVnZXggdG8gc3BsaXQga2V5cyBmb3IgYGRlbGVnYXRlYC5cbiAgdmFyIGRlbGVnYXRlRXZlbnRTcGxpdHRlciA9IC9eKFxcUyspXFxzKiguKikkLztcblxuICAvLyBMaXN0IG9mIHZpZXcgb3B0aW9ucyB0byBiZSBtZXJnZWQgYXMgcHJvcGVydGllcy5cbiAgdmFyIHZpZXdPcHRpb25zID0gWydtb2RlbCcsICdjb2xsZWN0aW9uJywgJ2VsJywgJ2lkJywgJ2F0dHJpYnV0ZXMnLCAnY2xhc3NOYW1lJywgJ3RhZ05hbWUnLCAnZXZlbnRzJ107XG5cbiAgLy8gU2V0IHVwIGFsbCBpbmhlcml0YWJsZSAqKkJhY2tib25lLlZpZXcqKiBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzLlxuICBfLmV4dGVuZChWaWV3LnByb3RvdHlwZSwgRXZlbnRzLCB7XG5cbiAgICAvLyBUaGUgZGVmYXVsdCBgdGFnTmFtZWAgb2YgYSBWaWV3J3MgZWxlbWVudCBpcyBgXCJkaXZcImAuXG4gICAgdGFnTmFtZTogJ2RpdicsXG5cbiAgICAvLyBqUXVlcnkgZGVsZWdhdGUgZm9yIGVsZW1lbnQgbG9va3VwLCBzY29wZWQgdG8gRE9NIGVsZW1lbnRzIHdpdGhpbiB0aGVcbiAgICAvLyBjdXJyZW50IHZpZXcuIFRoaXMgc2hvdWxkIGJlIHByZWZlcnJlZCB0byBnbG9iYWwgbG9va3VwcyB3aGVyZSBwb3NzaWJsZS5cbiAgICAkOiBmdW5jdGlvbihzZWxlY3Rvcikge1xuICAgICAgcmV0dXJuIHRoaXMuJGVsLmZpbmQoc2VsZWN0b3IpO1xuICAgIH0sXG5cbiAgICAvLyBJbml0aWFsaXplIGlzIGFuIGVtcHR5IGZ1bmN0aW9uIGJ5IGRlZmF1bHQuIE92ZXJyaWRlIGl0IHdpdGggeW91ciBvd25cbiAgICAvLyBpbml0aWFsaXphdGlvbiBsb2dpYy5cbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbigpe30sXG5cbiAgICAvLyAqKnJlbmRlcioqIGlzIHRoZSBjb3JlIGZ1bmN0aW9uIHRoYXQgeW91ciB2aWV3IHNob3VsZCBvdmVycmlkZSwgaW4gb3JkZXJcbiAgICAvLyB0byBwb3B1bGF0ZSBpdHMgZWxlbWVudCAoYHRoaXMuZWxgKSwgd2l0aCB0aGUgYXBwcm9wcmlhdGUgSFRNTC4gVGhlXG4gICAgLy8gY29udmVudGlvbiBpcyBmb3IgKipyZW5kZXIqKiB0byBhbHdheXMgcmV0dXJuIGB0aGlzYC5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8vIFJlbW92ZSB0aGlzIHZpZXcgYnkgdGFraW5nIHRoZSBlbGVtZW50IG91dCBvZiB0aGUgRE9NLCBhbmQgcmVtb3ZpbmcgYW55XG4gICAgLy8gYXBwbGljYWJsZSBCYWNrYm9uZS5FdmVudHMgbGlzdGVuZXJzLlxuICAgIHJlbW92ZTogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLiRlbC5yZW1vdmUoKTtcbiAgICAgIHRoaXMuc3RvcExpc3RlbmluZygpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8vIENoYW5nZSB0aGUgdmlldydzIGVsZW1lbnQgKGB0aGlzLmVsYCBwcm9wZXJ0eSksIGluY2x1ZGluZyBldmVudFxuICAgIC8vIHJlLWRlbGVnYXRpb24uXG4gICAgc2V0RWxlbWVudDogZnVuY3Rpb24oZWxlbWVudCwgZGVsZWdhdGUpIHtcbiAgICAgIGlmICh0aGlzLiRlbCkgdGhpcy51bmRlbGVnYXRlRXZlbnRzKCk7XG4gICAgICB0aGlzLiRlbCA9IGVsZW1lbnQgaW5zdGFuY2VvZiBCYWNrYm9uZS4kID8gZWxlbWVudCA6IEJhY2tib25lLiQoZWxlbWVudCk7XG4gICAgICB0aGlzLmVsID0gdGhpcy4kZWxbMF07XG4gICAgICBpZiAoZGVsZWdhdGUgIT09IGZhbHNlKSB0aGlzLmRlbGVnYXRlRXZlbnRzKCk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLy8gU2V0IGNhbGxiYWNrcywgd2hlcmUgYHRoaXMuZXZlbnRzYCBpcyBhIGhhc2ggb2ZcbiAgICAvL1xuICAgIC8vICp7XCJldmVudCBzZWxlY3RvclwiOiBcImNhbGxiYWNrXCJ9KlxuICAgIC8vXG4gICAgLy8gICAgIHtcbiAgICAvLyAgICAgICAnbW91c2Vkb3duIC50aXRsZSc6ICAnZWRpdCcsXG4gICAgLy8gICAgICAgJ2NsaWNrIC5idXR0b24nOiAgICAgJ3NhdmUnLFxuICAgIC8vICAgICAgICdjbGljayAub3Blbic6ICAgICAgIGZ1bmN0aW9uKGUpIHsgLi4uIH1cbiAgICAvLyAgICAgfVxuICAgIC8vXG4gICAgLy8gcGFpcnMuIENhbGxiYWNrcyB3aWxsIGJlIGJvdW5kIHRvIHRoZSB2aWV3LCB3aXRoIGB0aGlzYCBzZXQgcHJvcGVybHkuXG4gICAgLy8gVXNlcyBldmVudCBkZWxlZ2F0aW9uIGZvciBlZmZpY2llbmN5LlxuICAgIC8vIE9taXR0aW5nIHRoZSBzZWxlY3RvciBiaW5kcyB0aGUgZXZlbnQgdG8gYHRoaXMuZWxgLlxuICAgIC8vIFRoaXMgb25seSB3b3JrcyBmb3IgZGVsZWdhdGUtYWJsZSBldmVudHM6IG5vdCBgZm9jdXNgLCBgYmx1cmAsIGFuZFxuICAgIC8vIG5vdCBgY2hhbmdlYCwgYHN1Ym1pdGAsIGFuZCBgcmVzZXRgIGluIEludGVybmV0IEV4cGxvcmVyLlxuICAgIGRlbGVnYXRlRXZlbnRzOiBmdW5jdGlvbihldmVudHMpIHtcbiAgICAgIGlmICghKGV2ZW50cyB8fCAoZXZlbnRzID0gXy5yZXN1bHQodGhpcywgJ2V2ZW50cycpKSkpIHJldHVybiB0aGlzO1xuICAgICAgdGhpcy51bmRlbGVnYXRlRXZlbnRzKCk7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gZXZlbnRzKSB7XG4gICAgICAgIHZhciBtZXRob2QgPSBldmVudHNba2V5XTtcbiAgICAgICAgaWYgKCFfLmlzRnVuY3Rpb24obWV0aG9kKSkgbWV0aG9kID0gdGhpc1tldmVudHNba2V5XV07XG4gICAgICAgIGlmICghbWV0aG9kKSBjb250aW51ZTtcblxuICAgICAgICB2YXIgbWF0Y2ggPSBrZXkubWF0Y2goZGVsZWdhdGVFdmVudFNwbGl0dGVyKTtcbiAgICAgICAgdmFyIGV2ZW50TmFtZSA9IG1hdGNoWzFdLCBzZWxlY3RvciA9IG1hdGNoWzJdO1xuICAgICAgICBtZXRob2QgPSBfLmJpbmQobWV0aG9kLCB0aGlzKTtcbiAgICAgICAgZXZlbnROYW1lICs9ICcuZGVsZWdhdGVFdmVudHMnICsgdGhpcy5jaWQ7XG4gICAgICAgIGlmIChzZWxlY3RvciA9PT0gJycpIHtcbiAgICAgICAgICB0aGlzLiRlbC5vbihldmVudE5hbWUsIG1ldGhvZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy4kZWwub24oZXZlbnROYW1lLCBzZWxlY3RvciwgbWV0aG9kKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8vIENsZWFycyBhbGwgY2FsbGJhY2tzIHByZXZpb3VzbHkgYm91bmQgdG8gdGhlIHZpZXcgd2l0aCBgZGVsZWdhdGVFdmVudHNgLlxuICAgIC8vIFlvdSB1c3VhbGx5IGRvbid0IG5lZWQgdG8gdXNlIHRoaXMsIGJ1dCBtYXkgd2lzaCB0byBpZiB5b3UgaGF2ZSBtdWx0aXBsZVxuICAgIC8vIEJhY2tib25lIHZpZXdzIGF0dGFjaGVkIHRvIHRoZSBzYW1lIERPTSBlbGVtZW50LlxuICAgIHVuZGVsZWdhdGVFdmVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy4kZWwub2ZmKCcuZGVsZWdhdGVFdmVudHMnICsgdGhpcy5jaWQpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8vIEVuc3VyZSB0aGF0IHRoZSBWaWV3IGhhcyBhIERPTSBlbGVtZW50IHRvIHJlbmRlciBpbnRvLlxuICAgIC8vIElmIGB0aGlzLmVsYCBpcyBhIHN0cmluZywgcGFzcyBpdCB0aHJvdWdoIGAkKClgLCB0YWtlIHRoZSBmaXJzdFxuICAgIC8vIG1hdGNoaW5nIGVsZW1lbnQsIGFuZCByZS1hc3NpZ24gaXQgdG8gYGVsYC4gT3RoZXJ3aXNlLCBjcmVhdGVcbiAgICAvLyBhbiBlbGVtZW50IGZyb20gdGhlIGBpZGAsIGBjbGFzc05hbWVgIGFuZCBgdGFnTmFtZWAgcHJvcGVydGllcy5cbiAgICBfZW5zdXJlRWxlbWVudDogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIXRoaXMuZWwpIHtcbiAgICAgICAgdmFyIGF0dHJzID0gXy5leHRlbmQoe30sIF8ucmVzdWx0KHRoaXMsICdhdHRyaWJ1dGVzJykpO1xuICAgICAgICBpZiAodGhpcy5pZCkgYXR0cnMuaWQgPSBfLnJlc3VsdCh0aGlzLCAnaWQnKTtcbiAgICAgICAgaWYgKHRoaXMuY2xhc3NOYW1lKSBhdHRyc1snY2xhc3MnXSA9IF8ucmVzdWx0KHRoaXMsICdjbGFzc05hbWUnKTtcbiAgICAgICAgdmFyICRlbCA9IEJhY2tib25lLiQoJzwnICsgXy5yZXN1bHQodGhpcywgJ3RhZ05hbWUnKSArICc+JykuYXR0cihhdHRycyk7XG4gICAgICAgIHRoaXMuc2V0RWxlbWVudCgkZWwsIGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2V0RWxlbWVudChfLnJlc3VsdCh0aGlzLCAnZWwnKSwgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cblxuICB9KTtcblxuICAvLyBCYWNrYm9uZS5zeW5jXG4gIC8vIC0tLS0tLS0tLS0tLS1cblxuICAvLyBPdmVycmlkZSB0aGlzIGZ1bmN0aW9uIHRvIGNoYW5nZSB0aGUgbWFubmVyIGluIHdoaWNoIEJhY2tib25lIHBlcnNpc3RzXG4gIC8vIG1vZGVscyB0byB0aGUgc2VydmVyLiBZb3Ugd2lsbCBiZSBwYXNzZWQgdGhlIHR5cGUgb2YgcmVxdWVzdCwgYW5kIHRoZVxuICAvLyBtb2RlbCBpbiBxdWVzdGlvbi4gQnkgZGVmYXVsdCwgbWFrZXMgYSBSRVNUZnVsIEFqYXggcmVxdWVzdFxuICAvLyB0byB0aGUgbW9kZWwncyBgdXJsKClgLiBTb21lIHBvc3NpYmxlIGN1c3RvbWl6YXRpb25zIGNvdWxkIGJlOlxuICAvL1xuICAvLyAqIFVzZSBgc2V0VGltZW91dGAgdG8gYmF0Y2ggcmFwaWQtZmlyZSB1cGRhdGVzIGludG8gYSBzaW5nbGUgcmVxdWVzdC5cbiAgLy8gKiBTZW5kIHVwIHRoZSBtb2RlbHMgYXMgWE1MIGluc3RlYWQgb2YgSlNPTi5cbiAgLy8gKiBQZXJzaXN0IG1vZGVscyB2aWEgV2ViU29ja2V0cyBpbnN0ZWFkIG9mIEFqYXguXG4gIC8vXG4gIC8vIFR1cm4gb24gYEJhY2tib25lLmVtdWxhdGVIVFRQYCBpbiBvcmRlciB0byBzZW5kIGBQVVRgIGFuZCBgREVMRVRFYCByZXF1ZXN0c1xuICAvLyBhcyBgUE9TVGAsIHdpdGggYSBgX21ldGhvZGAgcGFyYW1ldGVyIGNvbnRhaW5pbmcgdGhlIHRydWUgSFRUUCBtZXRob2QsXG4gIC8vIGFzIHdlbGwgYXMgYWxsIHJlcXVlc3RzIHdpdGggdGhlIGJvZHkgYXMgYGFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZGBcbiAgLy8gaW5zdGVhZCBvZiBgYXBwbGljYXRpb24vanNvbmAgd2l0aCB0aGUgbW9kZWwgaW4gYSBwYXJhbSBuYW1lZCBgbW9kZWxgLlxuICAvLyBVc2VmdWwgd2hlbiBpbnRlcmZhY2luZyB3aXRoIHNlcnZlci1zaWRlIGxhbmd1YWdlcyBsaWtlICoqUEhQKiogdGhhdCBtYWtlXG4gIC8vIGl0IGRpZmZpY3VsdCB0byByZWFkIHRoZSBib2R5IG9mIGBQVVRgIHJlcXVlc3RzLlxuICBCYWNrYm9uZS5zeW5jID0gZnVuY3Rpb24obWV0aG9kLCBtb2RlbCwgb3B0aW9ucykge1xuICAgIHZhciB0eXBlID0gbWV0aG9kTWFwW21ldGhvZF07XG5cbiAgICAvLyBEZWZhdWx0IG9wdGlvbnMsIHVubGVzcyBzcGVjaWZpZWQuXG4gICAgXy5kZWZhdWx0cyhvcHRpb25zIHx8IChvcHRpb25zID0ge30pLCB7XG4gICAgICBlbXVsYXRlSFRUUDogQmFja2JvbmUuZW11bGF0ZUhUVFAsXG4gICAgICBlbXVsYXRlSlNPTjogQmFja2JvbmUuZW11bGF0ZUpTT05cbiAgICB9KTtcblxuICAgIC8vIERlZmF1bHQgSlNPTi1yZXF1ZXN0IG9wdGlvbnMuXG4gICAgdmFyIHBhcmFtcyA9IHt0eXBlOiB0eXBlLCBkYXRhVHlwZTogJ2pzb24nfTtcblxuICAgIC8vIEVuc3VyZSB0aGF0IHdlIGhhdmUgYSBVUkwuXG4gICAgaWYgKCFvcHRpb25zLnVybCkge1xuICAgICAgcGFyYW1zLnVybCA9IF8ucmVzdWx0KG1vZGVsLCAndXJsJykgfHwgdXJsRXJyb3IoKTtcbiAgICB9XG5cbiAgICAvLyBFbnN1cmUgdGhhdCB3ZSBoYXZlIHRoZSBhcHByb3ByaWF0ZSByZXF1ZXN0IGRhdGEuXG4gICAgaWYgKG9wdGlvbnMuZGF0YSA9PSBudWxsICYmIG1vZGVsICYmIChtZXRob2QgPT09ICdjcmVhdGUnIHx8IG1ldGhvZCA9PT0gJ3VwZGF0ZScgfHwgbWV0aG9kID09PSAncGF0Y2gnKSkge1xuICAgICAgcGFyYW1zLmNvbnRlbnRUeXBlID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xuICAgICAgcGFyYW1zLmRhdGEgPSBKU09OLnN0cmluZ2lmeShvcHRpb25zLmF0dHJzIHx8IG1vZGVsLnRvSlNPTihvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgLy8gRm9yIG9sZGVyIHNlcnZlcnMsIGVtdWxhdGUgSlNPTiBieSBlbmNvZGluZyB0aGUgcmVxdWVzdCBpbnRvIGFuIEhUTUwtZm9ybS5cbiAgICBpZiAob3B0aW9ucy5lbXVsYXRlSlNPTikge1xuICAgICAgcGFyYW1zLmNvbnRlbnRUeXBlID0gJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCc7XG4gICAgICBwYXJhbXMuZGF0YSA9IHBhcmFtcy5kYXRhID8ge21vZGVsOiBwYXJhbXMuZGF0YX0gOiB7fTtcbiAgICB9XG5cbiAgICAvLyBGb3Igb2xkZXIgc2VydmVycywgZW11bGF0ZSBIVFRQIGJ5IG1pbWlja2luZyB0aGUgSFRUUCBtZXRob2Qgd2l0aCBgX21ldGhvZGBcbiAgICAvLyBBbmQgYW4gYFgtSFRUUC1NZXRob2QtT3ZlcnJpZGVgIGhlYWRlci5cbiAgICBpZiAob3B0aW9ucy5lbXVsYXRlSFRUUCAmJiAodHlwZSA9PT0gJ1BVVCcgfHwgdHlwZSA9PT0gJ0RFTEVURScgfHwgdHlwZSA9PT0gJ1BBVENIJykpIHtcbiAgICAgIHBhcmFtcy50eXBlID0gJ1BPU1QnO1xuICAgICAgaWYgKG9wdGlvbnMuZW11bGF0ZUpTT04pIHBhcmFtcy5kYXRhLl9tZXRob2QgPSB0eXBlO1xuICAgICAgdmFyIGJlZm9yZVNlbmQgPSBvcHRpb25zLmJlZm9yZVNlbmQ7XG4gICAgICBvcHRpb25zLmJlZm9yZVNlbmQgPSBmdW5jdGlvbih4aHIpIHtcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ1gtSFRUUC1NZXRob2QtT3ZlcnJpZGUnLCB0eXBlKTtcbiAgICAgICAgaWYgKGJlZm9yZVNlbmQpIHJldHVybiBiZWZvcmVTZW5kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIERvbid0IHByb2Nlc3MgZGF0YSBvbiBhIG5vbi1HRVQgcmVxdWVzdC5cbiAgICBpZiAocGFyYW1zLnR5cGUgIT09ICdHRVQnICYmICFvcHRpb25zLmVtdWxhdGVKU09OKSB7XG4gICAgICBwYXJhbXMucHJvY2Vzc0RhdGEgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBJZiB3ZSdyZSBzZW5kaW5nIGEgYFBBVENIYCByZXF1ZXN0LCBhbmQgd2UncmUgaW4gYW4gb2xkIEludGVybmV0IEV4cGxvcmVyXG4gICAgLy8gdGhhdCBzdGlsbCBoYXMgQWN0aXZlWCBlbmFibGVkIGJ5IGRlZmF1bHQsIG92ZXJyaWRlIGpRdWVyeSB0byB1c2UgdGhhdFxuICAgIC8vIGZvciBYSFIgaW5zdGVhZC4gUmVtb3ZlIHRoaXMgbGluZSB3aGVuIGpRdWVyeSBzdXBwb3J0cyBgUEFUQ0hgIG9uIElFOC5cbiAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdQQVRDSCcgJiYgbm9YaHJQYXRjaCkge1xuICAgICAgcGFyYW1zLnhociA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gTWFrZSB0aGUgcmVxdWVzdCwgYWxsb3dpbmcgdGhlIHVzZXIgdG8gb3ZlcnJpZGUgYW55IEFqYXggb3B0aW9ucy5cbiAgICB2YXIgeGhyID0gb3B0aW9ucy54aHIgPSBCYWNrYm9uZS5hamF4KF8uZXh0ZW5kKHBhcmFtcywgb3B0aW9ucykpO1xuICAgIG1vZGVsLnRyaWdnZXIoJ3JlcXVlc3QnLCBtb2RlbCwgeGhyLCBvcHRpb25zKTtcbiAgICByZXR1cm4geGhyO1xuICB9O1xuXG4gIHZhciBub1hoclBhdGNoID1cbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiAhIXdpbmRvdy5BY3RpdmVYT2JqZWN0ICYmXG4gICAgICAhKHdpbmRvdy5YTUxIdHRwUmVxdWVzdCAmJiAobmV3IFhNTEh0dHBSZXF1ZXN0KS5kaXNwYXRjaEV2ZW50KTtcblxuICAvLyBNYXAgZnJvbSBDUlVEIHRvIEhUVFAgZm9yIG91ciBkZWZhdWx0IGBCYWNrYm9uZS5zeW5jYCBpbXBsZW1lbnRhdGlvbi5cbiAgdmFyIG1ldGhvZE1hcCA9IHtcbiAgICAnY3JlYXRlJzogJ1BPU1QnLFxuICAgICd1cGRhdGUnOiAnUFVUJyxcbiAgICAncGF0Y2gnOiAgJ1BBVENIJyxcbiAgICAnZGVsZXRlJzogJ0RFTEVURScsXG4gICAgJ3JlYWQnOiAgICdHRVQnXG4gIH07XG5cbiAgLy8gU2V0IHRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIGBCYWNrYm9uZS5hamF4YCB0byBwcm94eSB0aHJvdWdoIHRvIGAkYC5cbiAgLy8gT3ZlcnJpZGUgdGhpcyBpZiB5b3UnZCBsaWtlIHRvIHVzZSBhIGRpZmZlcmVudCBsaWJyYXJ5LlxuICBCYWNrYm9uZS5hamF4ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIEJhY2tib25lLiQuYWpheC5hcHBseShCYWNrYm9uZS4kLCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIC8vIEJhY2tib25lLlJvdXRlclxuICAvLyAtLS0tLS0tLS0tLS0tLS1cblxuICAvLyBSb3V0ZXJzIG1hcCBmYXV4LVVSTHMgdG8gYWN0aW9ucywgYW5kIGZpcmUgZXZlbnRzIHdoZW4gcm91dGVzIGFyZVxuICAvLyBtYXRjaGVkLiBDcmVhdGluZyBhIG5ldyBvbmUgc2V0cyBpdHMgYHJvdXRlc2AgaGFzaCwgaWYgbm90IHNldCBzdGF0aWNhbGx5LlxuICB2YXIgUm91dGVyID0gQmFja2JvbmUuUm91dGVyID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIG9wdGlvbnMgfHwgKG9wdGlvbnMgPSB7fSk7XG4gICAgaWYgKG9wdGlvbnMucm91dGVzKSB0aGlzLnJvdXRlcyA9IG9wdGlvbnMucm91dGVzO1xuICAgIHRoaXMuX2JpbmRSb3V0ZXMoKTtcbiAgICB0aGlzLmluaXRpYWxpemUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcblxuICAvLyBDYWNoZWQgcmVndWxhciBleHByZXNzaW9ucyBmb3IgbWF0Y2hpbmcgbmFtZWQgcGFyYW0gcGFydHMgYW5kIHNwbGF0dGVkXG4gIC8vIHBhcnRzIG9mIHJvdXRlIHN0cmluZ3MuXG4gIHZhciBvcHRpb25hbFBhcmFtID0gL1xcKCguKj8pXFwpL2c7XG4gIHZhciBuYW1lZFBhcmFtICAgID0gLyhcXChcXD8pPzpcXHcrL2c7XG4gIHZhciBzcGxhdFBhcmFtICAgID0gL1xcKlxcdysvZztcbiAgdmFyIGVzY2FwZVJlZ0V4cCAgPSAvW1xcLXt9XFxbXFxdKz8uLFxcXFxcXF4kfCNcXHNdL2c7XG5cbiAgLy8gU2V0IHVwIGFsbCBpbmhlcml0YWJsZSAqKkJhY2tib25lLlJvdXRlcioqIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMuXG4gIF8uZXh0ZW5kKFJvdXRlci5wcm90b3R5cGUsIEV2ZW50cywge1xuXG4gICAgLy8gSW5pdGlhbGl6ZSBpcyBhbiBlbXB0eSBmdW5jdGlvbiBieSBkZWZhdWx0LiBPdmVycmlkZSBpdCB3aXRoIHlvdXIgb3duXG4gICAgLy8gaW5pdGlhbGl6YXRpb24gbG9naWMuXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oKXt9LFxuXG4gICAgLy8gTWFudWFsbHkgYmluZCBhIHNpbmdsZSBuYW1lZCByb3V0ZSB0byBhIGNhbGxiYWNrLiBGb3IgZXhhbXBsZTpcbiAgICAvL1xuICAgIC8vICAgICB0aGlzLnJvdXRlKCdzZWFyY2gvOnF1ZXJ5L3A6bnVtJywgJ3NlYXJjaCcsIGZ1bmN0aW9uKHF1ZXJ5LCBudW0pIHtcbiAgICAvLyAgICAgICAuLi5cbiAgICAvLyAgICAgfSk7XG4gICAgLy9cbiAgICByb3V0ZTogZnVuY3Rpb24ocm91dGUsIG5hbWUsIGNhbGxiYWNrKSB7XG4gICAgICBpZiAoIV8uaXNSZWdFeHAocm91dGUpKSByb3V0ZSA9IHRoaXMuX3JvdXRlVG9SZWdFeHAocm91dGUpO1xuICAgICAgaWYgKF8uaXNGdW5jdGlvbihuYW1lKSkge1xuICAgICAgICBjYWxsYmFjayA9IG5hbWU7XG4gICAgICAgIG5hbWUgPSAnJztcbiAgICAgIH1cbiAgICAgIGlmICghY2FsbGJhY2spIGNhbGxiYWNrID0gdGhpc1tuYW1lXTtcbiAgICAgIHZhciByb3V0ZXIgPSB0aGlzO1xuICAgICAgQmFja2JvbmUuaGlzdG9yeS5yb3V0ZShyb3V0ZSwgZnVuY3Rpb24oZnJhZ21lbnQpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSByb3V0ZXIuX2V4dHJhY3RQYXJhbWV0ZXJzKHJvdXRlLCBmcmFnbWVudCk7XG4gICAgICAgIHJvdXRlci5leGVjdXRlKGNhbGxiYWNrLCBhcmdzKTtcbiAgICAgICAgcm91dGVyLnRyaWdnZXIuYXBwbHkocm91dGVyLCBbJ3JvdXRlOicgKyBuYW1lXS5jb25jYXQoYXJncykpO1xuICAgICAgICByb3V0ZXIudHJpZ2dlcigncm91dGUnLCBuYW1lLCBhcmdzKTtcbiAgICAgICAgQmFja2JvbmUuaGlzdG9yeS50cmlnZ2VyKCdyb3V0ZScsIHJvdXRlciwgbmFtZSwgYXJncyk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG5cbiAgICAvLyBFeGVjdXRlIGEgcm91dGUgaGFuZGxlciB3aXRoIHRoZSBwcm92aWRlZCBwYXJhbWV0ZXJzLiAgVGhpcyBpcyBhblxuICAgIC8vIGV4Y2VsbGVudCBwbGFjZSB0byBkbyBwcmUtcm91dGUgc2V0dXAgb3IgcG9zdC1yb3V0ZSBjbGVhbnVwLlxuICAgIGV4ZWN1dGU6IGZ1bmN0aW9uKGNhbGxiYWNrLCBhcmdzKSB7XG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH0sXG5cbiAgICAvLyBTaW1wbGUgcHJveHkgdG8gYEJhY2tib25lLmhpc3RvcnlgIHRvIHNhdmUgYSBmcmFnbWVudCBpbnRvIHRoZSBoaXN0b3J5LlxuICAgIG5hdmlnYXRlOiBmdW5jdGlvbihmcmFnbWVudCwgb3B0aW9ucykge1xuICAgICAgQmFja2JvbmUuaGlzdG9yeS5uYXZpZ2F0ZShmcmFnbWVudCwgb3B0aW9ucyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuXG4gICAgLy8gQmluZCBhbGwgZGVmaW5lZCByb3V0ZXMgdG8gYEJhY2tib25lLmhpc3RvcnlgLiBXZSBoYXZlIHRvIHJldmVyc2UgdGhlXG4gICAgLy8gb3JkZXIgb2YgdGhlIHJvdXRlcyBoZXJlIHRvIHN1cHBvcnQgYmVoYXZpb3Igd2hlcmUgdGhlIG1vc3QgZ2VuZXJhbFxuICAgIC8vIHJvdXRlcyBjYW4gYmUgZGVmaW5lZCBhdCB0aGUgYm90dG9tIG9mIHRoZSByb3V0ZSBtYXAuXG4gICAgX2JpbmRSb3V0ZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCF0aGlzLnJvdXRlcykgcmV0dXJuO1xuICAgICAgdGhpcy5yb3V0ZXMgPSBfLnJlc3VsdCh0aGlzLCAncm91dGVzJyk7XG4gICAgICB2YXIgcm91dGUsIHJvdXRlcyA9IF8ua2V5cyh0aGlzLnJvdXRlcyk7XG4gICAgICB3aGlsZSAoKHJvdXRlID0gcm91dGVzLnBvcCgpKSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMucm91dGUocm91dGUsIHRoaXMucm91dGVzW3JvdXRlXSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8vIENvbnZlcnQgYSByb3V0ZSBzdHJpbmcgaW50byBhIHJlZ3VsYXIgZXhwcmVzc2lvbiwgc3VpdGFibGUgZm9yIG1hdGNoaW5nXG4gICAgLy8gYWdhaW5zdCB0aGUgY3VycmVudCBsb2NhdGlvbiBoYXNoLlxuICAgIF9yb3V0ZVRvUmVnRXhwOiBmdW5jdGlvbihyb3V0ZSkge1xuICAgICAgcm91dGUgPSByb3V0ZS5yZXBsYWNlKGVzY2FwZVJlZ0V4cCwgJ1xcXFwkJicpXG4gICAgICAgICAgICAgICAgICAgLnJlcGxhY2Uob3B0aW9uYWxQYXJhbSwgJyg/OiQxKT8nKVxuICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKG5hbWVkUGFyYW0sIGZ1bmN0aW9uKG1hdGNoLCBvcHRpb25hbCkge1xuICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbmFsID8gbWF0Y2ggOiAnKFteLz9dKyknO1xuICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgLnJlcGxhY2Uoc3BsYXRQYXJhbSwgJyhbXj9dKj8pJyk7XG4gICAgICByZXR1cm4gbmV3IFJlZ0V4cCgnXicgKyByb3V0ZSArICcoPzpcXFxcPyhbXFxcXHNcXFxcU10qKSk/JCcpO1xuICAgIH0sXG5cbiAgICAvLyBHaXZlbiBhIHJvdXRlLCBhbmQgYSBVUkwgZnJhZ21lbnQgdGhhdCBpdCBtYXRjaGVzLCByZXR1cm4gdGhlIGFycmF5IG9mXG4gICAgLy8gZXh0cmFjdGVkIGRlY29kZWQgcGFyYW1ldGVycy4gRW1wdHkgb3IgdW5tYXRjaGVkIHBhcmFtZXRlcnMgd2lsbCBiZVxuICAgIC8vIHRyZWF0ZWQgYXMgYG51bGxgIHRvIG5vcm1hbGl6ZSBjcm9zcy1icm93c2VyIGJlaGF2aW9yLlxuICAgIF9leHRyYWN0UGFyYW1ldGVyczogZnVuY3Rpb24ocm91dGUsIGZyYWdtZW50KSB7XG4gICAgICB2YXIgcGFyYW1zID0gcm91dGUuZXhlYyhmcmFnbWVudCkuc2xpY2UoMSk7XG4gICAgICByZXR1cm4gXy5tYXAocGFyYW1zLCBmdW5jdGlvbihwYXJhbSwgaSkge1xuICAgICAgICAvLyBEb24ndCBkZWNvZGUgdGhlIHNlYXJjaCBwYXJhbXMuXG4gICAgICAgIGlmIChpID09PSBwYXJhbXMubGVuZ3RoIC0gMSkgcmV0dXJuIHBhcmFtIHx8IG51bGw7XG4gICAgICAgIHJldHVybiBwYXJhbSA/IGRlY29kZVVSSUNvbXBvbmVudChwYXJhbSkgOiBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuXG4gIH0pO1xuXG4gIC8vIEJhY2tib25lLkhpc3RvcnlcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIEhhbmRsZXMgY3Jvc3MtYnJvd3NlciBoaXN0b3J5IG1hbmFnZW1lbnQsIGJhc2VkIG9uIGVpdGhlclxuICAvLyBbcHVzaFN0YXRlXShodHRwOi8vZGl2ZWludG9odG1sNS5pbmZvL2hpc3RvcnkuaHRtbCkgYW5kIHJlYWwgVVJMcywgb3JcbiAgLy8gW29uaGFzaGNoYW5nZV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9ET00vd2luZG93Lm9uaGFzaGNoYW5nZSlcbiAgLy8gYW5kIFVSTCBmcmFnbWVudHMuIElmIHRoZSBicm93c2VyIHN1cHBvcnRzIG5laXRoZXIgKG9sZCBJRSwgbmF0Y2gpLFxuICAvLyBmYWxscyBiYWNrIHRvIHBvbGxpbmcuXG4gIHZhciBIaXN0b3J5ID0gQmFja2JvbmUuSGlzdG9yeSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuaGFuZGxlcnMgPSBbXTtcbiAgICBfLmJpbmRBbGwodGhpcywgJ2NoZWNrVXJsJyk7XG5cbiAgICAvLyBFbnN1cmUgdGhhdCBgSGlzdG9yeWAgY2FuIGJlIHVzZWQgb3V0c2lkZSBvZiB0aGUgYnJvd3Nlci5cbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMubG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb247XG4gICAgICB0aGlzLmhpc3RvcnkgPSB3aW5kb3cuaGlzdG9yeTtcbiAgICB9XG4gIH07XG5cbiAgLy8gQ2FjaGVkIHJlZ2V4IGZvciBzdHJpcHBpbmcgYSBsZWFkaW5nIGhhc2gvc2xhc2ggYW5kIHRyYWlsaW5nIHNwYWNlLlxuICB2YXIgcm91dGVTdHJpcHBlciA9IC9eWyNcXC9dfFxccyskL2c7XG5cbiAgLy8gQ2FjaGVkIHJlZ2V4IGZvciBzdHJpcHBpbmcgbGVhZGluZyBhbmQgdHJhaWxpbmcgc2xhc2hlcy5cbiAgdmFyIHJvb3RTdHJpcHBlciA9IC9eXFwvK3xcXC8rJC9nO1xuXG4gIC8vIENhY2hlZCByZWdleCBmb3IgZGV0ZWN0aW5nIE1TSUUuXG4gIHZhciBpc0V4cGxvcmVyID0gL21zaWUgW1xcdy5dKy87XG5cbiAgLy8gQ2FjaGVkIHJlZ2V4IGZvciByZW1vdmluZyBhIHRyYWlsaW5nIHNsYXNoLlxuICB2YXIgdHJhaWxpbmdTbGFzaCA9IC9cXC8kLztcblxuICAvLyBDYWNoZWQgcmVnZXggZm9yIHN0cmlwcGluZyB1cmxzIG9mIGhhc2guXG4gIHZhciBwYXRoU3RyaXBwZXIgPSAvIy4qJC87XG5cbiAgLy8gSGFzIHRoZSBoaXN0b3J5IGhhbmRsaW5nIGFscmVhZHkgYmVlbiBzdGFydGVkP1xuICBIaXN0b3J5LnN0YXJ0ZWQgPSBmYWxzZTtcblxuICAvLyBTZXQgdXAgYWxsIGluaGVyaXRhYmxlICoqQmFja2JvbmUuSGlzdG9yeSoqIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMuXG4gIF8uZXh0ZW5kKEhpc3RvcnkucHJvdG90eXBlLCBFdmVudHMsIHtcblxuICAgIC8vIFRoZSBkZWZhdWx0IGludGVydmFsIHRvIHBvbGwgZm9yIGhhc2ggY2hhbmdlcywgaWYgbmVjZXNzYXJ5LCBpc1xuICAgIC8vIHR3ZW50eSB0aW1lcyBhIHNlY29uZC5cbiAgICBpbnRlcnZhbDogNTAsXG5cbiAgICAvLyBBcmUgd2UgYXQgdGhlIGFwcCByb290P1xuICAgIGF0Um9vdDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5sb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9bXlxcL10kLywgJyQmLycpID09PSB0aGlzLnJvb3Q7XG4gICAgfSxcblxuICAgIC8vIEdldHMgdGhlIHRydWUgaGFzaCB2YWx1ZS4gQ2Fubm90IHVzZSBsb2NhdGlvbi5oYXNoIGRpcmVjdGx5IGR1ZSB0byBidWdcbiAgICAvLyBpbiBGaXJlZm94IHdoZXJlIGxvY2F0aW9uLmhhc2ggd2lsbCBhbHdheXMgYmUgZGVjb2RlZC5cbiAgICBnZXRIYXNoOiBmdW5jdGlvbih3aW5kb3cpIHtcbiAgICAgIHZhciBtYXRjaCA9ICh3aW5kb3cgfHwgdGhpcykubG9jYXRpb24uaHJlZi5tYXRjaCgvIyguKikkLyk7XG4gICAgICByZXR1cm4gbWF0Y2ggPyBtYXRjaFsxXSA6ICcnO1xuICAgIH0sXG5cbiAgICAvLyBHZXQgdGhlIGNyb3NzLWJyb3dzZXIgbm9ybWFsaXplZCBVUkwgZnJhZ21lbnQsIGVpdGhlciBmcm9tIHRoZSBVUkwsXG4gICAgLy8gdGhlIGhhc2gsIG9yIHRoZSBvdmVycmlkZS5cbiAgICBnZXRGcmFnbWVudDogZnVuY3Rpb24oZnJhZ21lbnQsIGZvcmNlUHVzaFN0YXRlKSB7XG4gICAgICBpZiAoZnJhZ21lbnQgPT0gbnVsbCkge1xuICAgICAgICBpZiAodGhpcy5faGFzUHVzaFN0YXRlIHx8ICF0aGlzLl93YW50c0hhc2hDaGFuZ2UgfHwgZm9yY2VQdXNoU3RhdGUpIHtcbiAgICAgICAgICBmcmFnbWVudCA9IGRlY29kZVVSSSh0aGlzLmxvY2F0aW9uLnBhdGhuYW1lICsgdGhpcy5sb2NhdGlvbi5zZWFyY2gpO1xuICAgICAgICAgIHZhciByb290ID0gdGhpcy5yb290LnJlcGxhY2UodHJhaWxpbmdTbGFzaCwgJycpO1xuICAgICAgICAgIGlmICghZnJhZ21lbnQuaW5kZXhPZihyb290KSkgZnJhZ21lbnQgPSBmcmFnbWVudC5zbGljZShyb290Lmxlbmd0aCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZnJhZ21lbnQgPSB0aGlzLmdldEhhc2goKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZyYWdtZW50LnJlcGxhY2Uocm91dGVTdHJpcHBlciwgJycpO1xuICAgIH0sXG5cbiAgICAvLyBTdGFydCB0aGUgaGFzaCBjaGFuZ2UgaGFuZGxpbmcsIHJldHVybmluZyBgdHJ1ZWAgaWYgdGhlIGN1cnJlbnQgVVJMIG1hdGNoZXNcbiAgICAvLyBhbiBleGlzdGluZyByb3V0ZSwgYW5kIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICAgIHN0YXJ0OiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICBpZiAoSGlzdG9yeS5zdGFydGVkKSB0aHJvdyBuZXcgRXJyb3IoXCJCYWNrYm9uZS5oaXN0b3J5IGhhcyBhbHJlYWR5IGJlZW4gc3RhcnRlZFwiKTtcbiAgICAgIEhpc3Rvcnkuc3RhcnRlZCA9IHRydWU7XG5cbiAgICAgIC8vIEZpZ3VyZSBvdXQgdGhlIGluaXRpYWwgY29uZmlndXJhdGlvbi4gRG8gd2UgbmVlZCBhbiBpZnJhbWU/XG4gICAgICAvLyBJcyBwdXNoU3RhdGUgZGVzaXJlZCAuLi4gaXMgaXQgYXZhaWxhYmxlP1xuICAgICAgdGhpcy5vcHRpb25zICAgICAgICAgID0gXy5leHRlbmQoe3Jvb3Q6ICcvJ30sIHRoaXMub3B0aW9ucywgb3B0aW9ucyk7XG4gICAgICB0aGlzLnJvb3QgICAgICAgICAgICAgPSB0aGlzLm9wdGlvbnMucm9vdDtcbiAgICAgIHRoaXMuX3dhbnRzSGFzaENoYW5nZSA9IHRoaXMub3B0aW9ucy5oYXNoQ2hhbmdlICE9PSBmYWxzZTtcbiAgICAgIHRoaXMuX3dhbnRzUHVzaFN0YXRlICA9ICEhdGhpcy5vcHRpb25zLnB1c2hTdGF0ZTtcbiAgICAgIHRoaXMuX2hhc1B1c2hTdGF0ZSAgICA9ICEhKHRoaXMub3B0aW9ucy5wdXNoU3RhdGUgJiYgdGhpcy5oaXN0b3J5ICYmIHRoaXMuaGlzdG9yeS5wdXNoU3RhdGUpO1xuICAgICAgdmFyIGZyYWdtZW50ICAgICAgICAgID0gdGhpcy5nZXRGcmFnbWVudCgpO1xuICAgICAgdmFyIGRvY01vZGUgICAgICAgICAgID0gZG9jdW1lbnQuZG9jdW1lbnRNb2RlO1xuICAgICAgdmFyIG9sZElFICAgICAgICAgICAgID0gKGlzRXhwbG9yZXIuZXhlYyhuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpICYmICghZG9jTW9kZSB8fCBkb2NNb2RlIDw9IDcpKTtcblxuICAgICAgLy8gTm9ybWFsaXplIHJvb3QgdG8gYWx3YXlzIGluY2x1ZGUgYSBsZWFkaW5nIGFuZCB0cmFpbGluZyBzbGFzaC5cbiAgICAgIHRoaXMucm9vdCA9ICgnLycgKyB0aGlzLnJvb3QgKyAnLycpLnJlcGxhY2Uocm9vdFN0cmlwcGVyLCAnLycpO1xuXG4gICAgICBpZiAob2xkSUUgJiYgdGhpcy5fd2FudHNIYXNoQ2hhbmdlKSB7XG4gICAgICAgIHZhciBmcmFtZSA9IEJhY2tib25lLiQoJzxpZnJhbWUgc3JjPVwiamF2YXNjcmlwdDowXCIgdGFiaW5kZXg9XCItMVwiPicpO1xuICAgICAgICB0aGlzLmlmcmFtZSA9IGZyYW1lLmhpZGUoKS5hcHBlbmRUbygnYm9keScpWzBdLmNvbnRlbnRXaW5kb3c7XG4gICAgICAgIHRoaXMubmF2aWdhdGUoZnJhZ21lbnQpO1xuICAgICAgfVxuXG4gICAgICAvLyBEZXBlbmRpbmcgb24gd2hldGhlciB3ZSdyZSB1c2luZyBwdXNoU3RhdGUgb3IgaGFzaGVzLCBhbmQgd2hldGhlclxuICAgICAgLy8gJ29uaGFzaGNoYW5nZScgaXMgc3VwcG9ydGVkLCBkZXRlcm1pbmUgaG93IHdlIGNoZWNrIHRoZSBVUkwgc3RhdGUuXG4gICAgICBpZiAodGhpcy5faGFzUHVzaFN0YXRlKSB7XG4gICAgICAgIEJhY2tib25lLiQod2luZG93KS5vbigncG9wc3RhdGUnLCB0aGlzLmNoZWNrVXJsKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fd2FudHNIYXNoQ2hhbmdlICYmICgnb25oYXNoY2hhbmdlJyBpbiB3aW5kb3cpICYmICFvbGRJRSkge1xuICAgICAgICBCYWNrYm9uZS4kKHdpbmRvdykub24oJ2hhc2hjaGFuZ2UnLCB0aGlzLmNoZWNrVXJsKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fd2FudHNIYXNoQ2hhbmdlKSB7XG4gICAgICAgIHRoaXMuX2NoZWNrVXJsSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh0aGlzLmNoZWNrVXJsLCB0aGlzLmludGVydmFsKTtcbiAgICAgIH1cblxuICAgICAgLy8gRGV0ZXJtaW5lIGlmIHdlIG5lZWQgdG8gY2hhbmdlIHRoZSBiYXNlIHVybCwgZm9yIGEgcHVzaFN0YXRlIGxpbmtcbiAgICAgIC8vIG9wZW5lZCBieSBhIG5vbi1wdXNoU3RhdGUgYnJvd3Nlci5cbiAgICAgIHRoaXMuZnJhZ21lbnQgPSBmcmFnbWVudDtcbiAgICAgIHZhciBsb2MgPSB0aGlzLmxvY2F0aW9uO1xuXG4gICAgICAvLyBUcmFuc2l0aW9uIGZyb20gaGFzaENoYW5nZSB0byBwdXNoU3RhdGUgb3IgdmljZSB2ZXJzYSBpZiBib3RoIGFyZVxuICAgICAgLy8gcmVxdWVzdGVkLlxuICAgICAgaWYgKHRoaXMuX3dhbnRzSGFzaENoYW5nZSAmJiB0aGlzLl93YW50c1B1c2hTdGF0ZSkge1xuXG4gICAgICAgIC8vIElmIHdlJ3ZlIHN0YXJ0ZWQgb2ZmIHdpdGggYSByb3V0ZSBmcm9tIGEgYHB1c2hTdGF0ZWAtZW5hYmxlZFxuICAgICAgICAvLyBicm93c2VyLCBidXQgd2UncmUgY3VycmVudGx5IGluIGEgYnJvd3NlciB0aGF0IGRvZXNuJ3Qgc3VwcG9ydCBpdC4uLlxuICAgICAgICBpZiAoIXRoaXMuX2hhc1B1c2hTdGF0ZSAmJiAhdGhpcy5hdFJvb3QoKSkge1xuICAgICAgICAgIHRoaXMuZnJhZ21lbnQgPSB0aGlzLmdldEZyYWdtZW50KG51bGwsIHRydWUpO1xuICAgICAgICAgIHRoaXMubG9jYXRpb24ucmVwbGFjZSh0aGlzLnJvb3QgKyAnIycgKyB0aGlzLmZyYWdtZW50KTtcbiAgICAgICAgICAvLyBSZXR1cm4gaW1tZWRpYXRlbHkgYXMgYnJvd3NlciB3aWxsIGRvIHJlZGlyZWN0IHRvIG5ldyB1cmxcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICAvLyBPciBpZiB3ZSd2ZSBzdGFydGVkIG91dCB3aXRoIGEgaGFzaC1iYXNlZCByb3V0ZSwgYnV0IHdlJ3JlIGN1cnJlbnRseVxuICAgICAgICAvLyBpbiBhIGJyb3dzZXIgd2hlcmUgaXQgY291bGQgYmUgYHB1c2hTdGF0ZWAtYmFzZWQgaW5zdGVhZC4uLlxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2hhc1B1c2hTdGF0ZSAmJiB0aGlzLmF0Um9vdCgpICYmIGxvYy5oYXNoKSB7XG4gICAgICAgICAgdGhpcy5mcmFnbWVudCA9IHRoaXMuZ2V0SGFzaCgpLnJlcGxhY2Uocm91dGVTdHJpcHBlciwgJycpO1xuICAgICAgICAgIHRoaXMuaGlzdG9yeS5yZXBsYWNlU3RhdGUoe30sIGRvY3VtZW50LnRpdGxlLCB0aGlzLnJvb3QgKyB0aGlzLmZyYWdtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5vcHRpb25zLnNpbGVudCkgcmV0dXJuIHRoaXMubG9hZFVybCgpO1xuICAgIH0sXG5cbiAgICAvLyBEaXNhYmxlIEJhY2tib25lLmhpc3RvcnksIHBlcmhhcHMgdGVtcG9yYXJpbHkuIE5vdCB1c2VmdWwgaW4gYSByZWFsIGFwcCxcbiAgICAvLyBidXQgcG9zc2libHkgdXNlZnVsIGZvciB1bml0IHRlc3RpbmcgUm91dGVycy5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIEJhY2tib25lLiQod2luZG93KS5vZmYoJ3BvcHN0YXRlJywgdGhpcy5jaGVja1VybCkub2ZmKCdoYXNoY2hhbmdlJywgdGhpcy5jaGVja1VybCk7XG4gICAgICBpZiAodGhpcy5fY2hlY2tVcmxJbnRlcnZhbCkgY2xlYXJJbnRlcnZhbCh0aGlzLl9jaGVja1VybEludGVydmFsKTtcbiAgICAgIEhpc3Rvcnkuc3RhcnRlZCA9IGZhbHNlO1xuICAgIH0sXG5cbiAgICAvLyBBZGQgYSByb3V0ZSB0byBiZSB0ZXN0ZWQgd2hlbiB0aGUgZnJhZ21lbnQgY2hhbmdlcy4gUm91dGVzIGFkZGVkIGxhdGVyXG4gICAgLy8gbWF5IG92ZXJyaWRlIHByZXZpb3VzIHJvdXRlcy5cbiAgICByb3V0ZTogZnVuY3Rpb24ocm91dGUsIGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLmhhbmRsZXJzLnVuc2hpZnQoe3JvdXRlOiByb3V0ZSwgY2FsbGJhY2s6IGNhbGxiYWNrfSk7XG4gICAgfSxcblxuICAgIC8vIENoZWNrcyB0aGUgY3VycmVudCBVUkwgdG8gc2VlIGlmIGl0IGhhcyBjaGFuZ2VkLCBhbmQgaWYgaXQgaGFzLFxuICAgIC8vIGNhbGxzIGBsb2FkVXJsYCwgbm9ybWFsaXppbmcgYWNyb3NzIHRoZSBoaWRkZW4gaWZyYW1lLlxuICAgIGNoZWNrVXJsOiBmdW5jdGlvbihlKSB7XG4gICAgICB2YXIgY3VycmVudCA9IHRoaXMuZ2V0RnJhZ21lbnQoKTtcbiAgICAgIGlmIChjdXJyZW50ID09PSB0aGlzLmZyYWdtZW50ICYmIHRoaXMuaWZyYW1lKSB7XG4gICAgICAgIGN1cnJlbnQgPSB0aGlzLmdldEZyYWdtZW50KHRoaXMuZ2V0SGFzaCh0aGlzLmlmcmFtZSkpO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnQgPT09IHRoaXMuZnJhZ21lbnQpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmICh0aGlzLmlmcmFtZSkgdGhpcy5uYXZpZ2F0ZShjdXJyZW50KTtcbiAgICAgIHRoaXMubG9hZFVybCgpO1xuICAgIH0sXG5cbiAgICAvLyBBdHRlbXB0IHRvIGxvYWQgdGhlIGN1cnJlbnQgVVJMIGZyYWdtZW50LiBJZiBhIHJvdXRlIHN1Y2NlZWRzIHdpdGggYVxuICAgIC8vIG1hdGNoLCByZXR1cm5zIGB0cnVlYC4gSWYgbm8gZGVmaW5lZCByb3V0ZXMgbWF0Y2hlcyB0aGUgZnJhZ21lbnQsXG4gICAgLy8gcmV0dXJucyBgZmFsc2VgLlxuICAgIGxvYWRVcmw6IGZ1bmN0aW9uKGZyYWdtZW50KSB7XG4gICAgICBmcmFnbWVudCA9IHRoaXMuZnJhZ21lbnQgPSB0aGlzLmdldEZyYWdtZW50KGZyYWdtZW50KTtcbiAgICAgIHJldHVybiBfLmFueSh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbihoYW5kbGVyKSB7XG4gICAgICAgIGlmIChoYW5kbGVyLnJvdXRlLnRlc3QoZnJhZ21lbnQpKSB7XG4gICAgICAgICAgaGFuZGxlci5jYWxsYmFjayhmcmFnbWVudCk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvLyBTYXZlIGEgZnJhZ21lbnQgaW50byB0aGUgaGFzaCBoaXN0b3J5LCBvciByZXBsYWNlIHRoZSBVUkwgc3RhdGUgaWYgdGhlXG4gICAgLy8gJ3JlcGxhY2UnIG9wdGlvbiBpcyBwYXNzZWQuIFlvdSBhcmUgcmVzcG9uc2libGUgZm9yIHByb3Blcmx5IFVSTC1lbmNvZGluZ1xuICAgIC8vIHRoZSBmcmFnbWVudCBpbiBhZHZhbmNlLlxuICAgIC8vXG4gICAgLy8gVGhlIG9wdGlvbnMgb2JqZWN0IGNhbiBjb250YWluIGB0cmlnZ2VyOiB0cnVlYCBpZiB5b3Ugd2lzaCB0byBoYXZlIHRoZVxuICAgIC8vIHJvdXRlIGNhbGxiYWNrIGJlIGZpcmVkIChub3QgdXN1YWxseSBkZXNpcmFibGUpLCBvciBgcmVwbGFjZTogdHJ1ZWAsIGlmXG4gICAgLy8geW91IHdpc2ggdG8gbW9kaWZ5IHRoZSBjdXJyZW50IFVSTCB3aXRob3V0IGFkZGluZyBhbiBlbnRyeSB0byB0aGUgaGlzdG9yeS5cbiAgICBuYXZpZ2F0ZTogZnVuY3Rpb24oZnJhZ21lbnQsIG9wdGlvbnMpIHtcbiAgICAgIGlmICghSGlzdG9yeS5zdGFydGVkKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAoIW9wdGlvbnMgfHwgb3B0aW9ucyA9PT0gdHJ1ZSkgb3B0aW9ucyA9IHt0cmlnZ2VyOiAhIW9wdGlvbnN9O1xuXG4gICAgICB2YXIgdXJsID0gdGhpcy5yb290ICsgKGZyYWdtZW50ID0gdGhpcy5nZXRGcmFnbWVudChmcmFnbWVudCB8fCAnJykpO1xuXG4gICAgICAvLyBTdHJpcCB0aGUgaGFzaCBmb3IgbWF0Y2hpbmcuXG4gICAgICBmcmFnbWVudCA9IGZyYWdtZW50LnJlcGxhY2UocGF0aFN0cmlwcGVyLCAnJyk7XG5cbiAgICAgIGlmICh0aGlzLmZyYWdtZW50ID09PSBmcmFnbWVudCkgcmV0dXJuO1xuICAgICAgdGhpcy5mcmFnbWVudCA9IGZyYWdtZW50O1xuXG4gICAgICAvLyBEb24ndCBpbmNsdWRlIGEgdHJhaWxpbmcgc2xhc2ggb24gdGhlIHJvb3QuXG4gICAgICBpZiAoZnJhZ21lbnQgPT09ICcnICYmIHVybCAhPT0gJy8nKSB1cmwgPSB1cmwuc2xpY2UoMCwgLTEpO1xuXG4gICAgICAvLyBJZiBwdXNoU3RhdGUgaXMgYXZhaWxhYmxlLCB3ZSB1c2UgaXQgdG8gc2V0IHRoZSBmcmFnbWVudCBhcyBhIHJlYWwgVVJMLlxuICAgICAgaWYgKHRoaXMuX2hhc1B1c2hTdGF0ZSkge1xuICAgICAgICB0aGlzLmhpc3Rvcnlbb3B0aW9ucy5yZXBsYWNlID8gJ3JlcGxhY2VTdGF0ZScgOiAncHVzaFN0YXRlJ10oe30sIGRvY3VtZW50LnRpdGxlLCB1cmwpO1xuXG4gICAgICAvLyBJZiBoYXNoIGNoYW5nZXMgaGF2ZW4ndCBiZWVuIGV4cGxpY2l0bHkgZGlzYWJsZWQsIHVwZGF0ZSB0aGUgaGFzaFxuICAgICAgLy8gZnJhZ21lbnQgdG8gc3RvcmUgaGlzdG9yeS5cbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fd2FudHNIYXNoQ2hhbmdlKSB7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUhhc2godGhpcy5sb2NhdGlvbiwgZnJhZ21lbnQsIG9wdGlvbnMucmVwbGFjZSk7XG4gICAgICAgIGlmICh0aGlzLmlmcmFtZSAmJiAoZnJhZ21lbnQgIT09IHRoaXMuZ2V0RnJhZ21lbnQodGhpcy5nZXRIYXNoKHRoaXMuaWZyYW1lKSkpKSB7XG4gICAgICAgICAgLy8gT3BlbmluZyBhbmQgY2xvc2luZyB0aGUgaWZyYW1lIHRyaWNrcyBJRTcgYW5kIGVhcmxpZXIgdG8gcHVzaCBhXG4gICAgICAgICAgLy8gaGlzdG9yeSBlbnRyeSBvbiBoYXNoLXRhZyBjaGFuZ2UuICBXaGVuIHJlcGxhY2UgaXMgdHJ1ZSwgd2UgZG9uJ3RcbiAgICAgICAgICAvLyB3YW50IHRoaXMuXG4gICAgICAgICAgaWYoIW9wdGlvbnMucmVwbGFjZSkgdGhpcy5pZnJhbWUuZG9jdW1lbnQub3BlbigpLmNsb3NlKCk7XG4gICAgICAgICAgdGhpcy5fdXBkYXRlSGFzaCh0aGlzLmlmcmFtZS5sb2NhdGlvbiwgZnJhZ21lbnQsIG9wdGlvbnMucmVwbGFjZSk7XG4gICAgICAgIH1cblxuICAgICAgLy8gSWYgeW91J3ZlIHRvbGQgdXMgdGhhdCB5b3UgZXhwbGljaXRseSBkb24ndCB3YW50IGZhbGxiYWNrIGhhc2hjaGFuZ2UtXG4gICAgICAvLyBiYXNlZCBoaXN0b3J5LCB0aGVuIGBuYXZpZ2F0ZWAgYmVjb21lcyBhIHBhZ2UgcmVmcmVzaC5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxvY2F0aW9uLmFzc2lnbih1cmwpO1xuICAgICAgfVxuICAgICAgaWYgKG9wdGlvbnMudHJpZ2dlcikgcmV0dXJuIHRoaXMubG9hZFVybChmcmFnbWVudCk7XG4gICAgfSxcblxuICAgIC8vIFVwZGF0ZSB0aGUgaGFzaCBsb2NhdGlvbiwgZWl0aGVyIHJlcGxhY2luZyB0aGUgY3VycmVudCBlbnRyeSwgb3IgYWRkaW5nXG4gICAgLy8gYSBuZXcgb25lIHRvIHRoZSBicm93c2VyIGhpc3RvcnkuXG4gICAgX3VwZGF0ZUhhc2g6IGZ1bmN0aW9uKGxvY2F0aW9uLCBmcmFnbWVudCwgcmVwbGFjZSkge1xuICAgICAgaWYgKHJlcGxhY2UpIHtcbiAgICAgICAgdmFyIGhyZWYgPSBsb2NhdGlvbi5ocmVmLnJlcGxhY2UoLyhqYXZhc2NyaXB0OnwjKS4qJC8sICcnKTtcbiAgICAgICAgbG9jYXRpb24ucmVwbGFjZShocmVmICsgJyMnICsgZnJhZ21lbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gU29tZSBicm93c2VycyByZXF1aXJlIHRoYXQgYGhhc2hgIGNvbnRhaW5zIGEgbGVhZGluZyAjLlxuICAgICAgICBsb2NhdGlvbi5oYXNoID0gJyMnICsgZnJhZ21lbnQ7XG4gICAgICB9XG4gICAgfVxuXG4gIH0pO1xuXG4gIC8vIENyZWF0ZSB0aGUgZGVmYXVsdCBCYWNrYm9uZS5oaXN0b3J5LlxuICBCYWNrYm9uZS5oaXN0b3J5ID0gbmV3IEhpc3Rvcnk7XG5cbiAgLy8gSGVscGVyc1xuICAvLyAtLS0tLS0tXG5cbiAgLy8gSGVscGVyIGZ1bmN0aW9uIHRvIGNvcnJlY3RseSBzZXQgdXAgdGhlIHByb3RvdHlwZSBjaGFpbiwgZm9yIHN1YmNsYXNzZXMuXG4gIC8vIFNpbWlsYXIgdG8gYGdvb2cuaW5oZXJpdHNgLCBidXQgdXNlcyBhIGhhc2ggb2YgcHJvdG90eXBlIHByb3BlcnRpZXMgYW5kXG4gIC8vIGNsYXNzIHByb3BlcnRpZXMgdG8gYmUgZXh0ZW5kZWQuXG4gIHZhciBleHRlbmQgPSBmdW5jdGlvbihwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIHZhciBwYXJlbnQgPSB0aGlzO1xuICAgIHZhciBjaGlsZDtcblxuICAgIC8vIFRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbiBmb3IgdGhlIG5ldyBzdWJjbGFzcyBpcyBlaXRoZXIgZGVmaW5lZCBieSB5b3VcbiAgICAvLyAodGhlIFwiY29uc3RydWN0b3JcIiBwcm9wZXJ0eSBpbiB5b3VyIGBleHRlbmRgIGRlZmluaXRpb24pLCBvciBkZWZhdWx0ZWRcbiAgICAvLyBieSB1cyB0byBzaW1wbHkgY2FsbCB0aGUgcGFyZW50J3MgY29uc3RydWN0b3IuXG4gICAgaWYgKHByb3RvUHJvcHMgJiYgXy5oYXMocHJvdG9Qcm9wcywgJ2NvbnN0cnVjdG9yJykpIHtcbiAgICAgIGNoaWxkID0gcHJvdG9Qcm9wcy5jb25zdHJ1Y3RvcjtcbiAgICB9IGVsc2Uge1xuICAgICAgY2hpbGQgPSBmdW5jdGlvbigpeyByZXR1cm4gcGFyZW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IH07XG4gICAgfVxuXG4gICAgLy8gQWRkIHN0YXRpYyBwcm9wZXJ0aWVzIHRvIHRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbiwgaWYgc3VwcGxpZWQuXG4gICAgXy5leHRlbmQoY2hpbGQsIHBhcmVudCwgc3RhdGljUHJvcHMpO1xuXG4gICAgLy8gU2V0IHRoZSBwcm90b3R5cGUgY2hhaW4gdG8gaW5oZXJpdCBmcm9tIGBwYXJlbnRgLCB3aXRob3V0IGNhbGxpbmdcbiAgICAvLyBgcGFyZW50YCdzIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICAgIHZhciBTdXJyb2dhdGUgPSBmdW5jdGlvbigpeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH07XG4gICAgU3Vycm9nYXRlLnByb3RvdHlwZSA9IHBhcmVudC5wcm90b3R5cGU7XG4gICAgY2hpbGQucHJvdG90eXBlID0gbmV3IFN1cnJvZ2F0ZTtcblxuICAgIC8vIEFkZCBwcm90b3R5cGUgcHJvcGVydGllcyAoaW5zdGFuY2UgcHJvcGVydGllcykgdG8gdGhlIHN1YmNsYXNzLFxuICAgIC8vIGlmIHN1cHBsaWVkLlxuICAgIGlmIChwcm90b1Byb3BzKSBfLmV4dGVuZChjaGlsZC5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuXG4gICAgLy8gU2V0IGEgY29udmVuaWVuY2UgcHJvcGVydHkgaW4gY2FzZSB0aGUgcGFyZW50J3MgcHJvdG90eXBlIGlzIG5lZWRlZFxuICAgIC8vIGxhdGVyLlxuICAgIGNoaWxkLl9fc3VwZXJfXyA9IHBhcmVudC5wcm90b3R5cGU7XG5cbiAgICByZXR1cm4gY2hpbGQ7XG4gIH07XG5cbiAgLy8gU2V0IHVwIGluaGVyaXRhbmNlIGZvciB0aGUgbW9kZWwsIGNvbGxlY3Rpb24sIHJvdXRlciwgdmlldyBhbmQgaGlzdG9yeS5cbiAgTW9kZWwuZXh0ZW5kID0gQ29sbGVjdGlvbi5leHRlbmQgPSBSb3V0ZXIuZXh0ZW5kID0gVmlldy5leHRlbmQgPSBIaXN0b3J5LmV4dGVuZCA9IGV4dGVuZDtcblxuICAvLyBUaHJvdyBhbiBlcnJvciB3aGVuIGEgVVJMIGlzIG5lZWRlZCwgYW5kIG5vbmUgaXMgc3VwcGxpZWQuXG4gIHZhciB1cmxFcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignQSBcInVybFwiIHByb3BlcnR5IG9yIGZ1bmN0aW9uIG11c3QgYmUgc3BlY2lmaWVkJyk7XG4gIH07XG5cbiAgLy8gV3JhcCBhbiBvcHRpb25hbCBlcnJvciBjYWxsYmFjayB3aXRoIGEgZmFsbGJhY2sgZXJyb3IgZXZlbnQuXG4gIHZhciB3cmFwRXJyb3IgPSBmdW5jdGlvbihtb2RlbCwgb3B0aW9ucykge1xuICAgIHZhciBlcnJvciA9IG9wdGlvbnMuZXJyb3I7XG4gICAgb3B0aW9ucy5lcnJvciA9IGZ1bmN0aW9uKHJlc3ApIHtcbiAgICAgIGlmIChlcnJvcikgZXJyb3IobW9kZWwsIHJlc3AsIG9wdGlvbnMpO1xuICAgICAgbW9kZWwudHJpZ2dlcignZXJyb3InLCBtb2RlbCwgcmVzcCwgb3B0aW9ucyk7XG4gICAgfTtcbiAgfTtcblxuICByZXR1cm4gQmFja2JvbmU7XG5cbn0pKTtcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCIvaG9tZS9kb3N0b2RhYnNpL2NvZGUvYmFray9leHBlcmltZW50LXRlbXBsYXRlL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi4vLi4vbm9kZV9tb2R1bGVzL2JhY2tib25lL2JhY2tib25lLmpzXCIsXCIvLi4vLi4vbm9kZV9tb2R1bGVzL2JhY2tib25lXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuLy8gICAgIFVuZGVyc2NvcmUuanMgMS42LjBcbi8vICAgICBodHRwOi8vdW5kZXJzY29yZWpzLm9yZ1xuLy8gICAgIChjKSAyMDA5LTIwMTQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbi8vICAgICBVbmRlcnNjb3JlIG1heSBiZSBmcmVlbHkgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuXG4oZnVuY3Rpb24oKSB7XG5cbiAgLy8gQmFzZWxpbmUgc2V0dXBcbiAgLy8gLS0tLS0tLS0tLS0tLS1cblxuICAvLyBFc3RhYmxpc2ggdGhlIHJvb3Qgb2JqZWN0LCBgd2luZG93YCBpbiB0aGUgYnJvd3Nlciwgb3IgYGV4cG9ydHNgIG9uIHRoZSBzZXJ2ZXIuXG4gIHZhciByb290ID0gdGhpcztcblxuICAvLyBTYXZlIHRoZSBwcmV2aW91cyB2YWx1ZSBvZiB0aGUgYF9gIHZhcmlhYmxlLlxuICB2YXIgcHJldmlvdXNVbmRlcnNjb3JlID0gcm9vdC5fO1xuXG4gIC8vIEVzdGFibGlzaCB0aGUgb2JqZWN0IHRoYXQgZ2V0cyByZXR1cm5lZCB0byBicmVhayBvdXQgb2YgYSBsb29wIGl0ZXJhdGlvbi5cbiAgdmFyIGJyZWFrZXIgPSB7fTtcblxuICAvLyBTYXZlIGJ5dGVzIGluIHRoZSBtaW5pZmllZCAoYnV0IG5vdCBnemlwcGVkKSB2ZXJzaW9uOlxuICB2YXIgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZSwgT2JqUHJvdG8gPSBPYmplY3QucHJvdG90eXBlLCBGdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGU7XG5cbiAgLy8gQ3JlYXRlIHF1aWNrIHJlZmVyZW5jZSB2YXJpYWJsZXMgZm9yIHNwZWVkIGFjY2VzcyB0byBjb3JlIHByb3RvdHlwZXMuXG4gIHZhclxuICAgIHB1c2ggICAgICAgICAgICAgPSBBcnJheVByb3RvLnB1c2gsXG4gICAgc2xpY2UgICAgICAgICAgICA9IEFycmF5UHJvdG8uc2xpY2UsXG4gICAgY29uY2F0ICAgICAgICAgICA9IEFycmF5UHJvdG8uY29uY2F0LFxuICAgIHRvU3RyaW5nICAgICAgICAgPSBPYmpQcm90by50b1N0cmluZyxcbiAgICBoYXNPd25Qcm9wZXJ0eSAgID0gT2JqUHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbiAgLy8gQWxsICoqRUNNQVNjcmlwdCA1KiogbmF0aXZlIGZ1bmN0aW9uIGltcGxlbWVudGF0aW9ucyB0aGF0IHdlIGhvcGUgdG8gdXNlXG4gIC8vIGFyZSBkZWNsYXJlZCBoZXJlLlxuICB2YXJcbiAgICBuYXRpdmVGb3JFYWNoICAgICAgPSBBcnJheVByb3RvLmZvckVhY2gsXG4gICAgbmF0aXZlTWFwICAgICAgICAgID0gQXJyYXlQcm90by5tYXAsXG4gICAgbmF0aXZlUmVkdWNlICAgICAgID0gQXJyYXlQcm90by5yZWR1Y2UsXG4gICAgbmF0aXZlUmVkdWNlUmlnaHQgID0gQXJyYXlQcm90by5yZWR1Y2VSaWdodCxcbiAgICBuYXRpdmVGaWx0ZXIgICAgICAgPSBBcnJheVByb3RvLmZpbHRlcixcbiAgICBuYXRpdmVFdmVyeSAgICAgICAgPSBBcnJheVByb3RvLmV2ZXJ5LFxuICAgIG5hdGl2ZVNvbWUgICAgICAgICA9IEFycmF5UHJvdG8uc29tZSxcbiAgICBuYXRpdmVJbmRleE9mICAgICAgPSBBcnJheVByb3RvLmluZGV4T2YsXG4gICAgbmF0aXZlTGFzdEluZGV4T2YgID0gQXJyYXlQcm90by5sYXN0SW5kZXhPZixcbiAgICBuYXRpdmVJc0FycmF5ICAgICAgPSBBcnJheS5pc0FycmF5LFxuICAgIG5hdGl2ZUtleXMgICAgICAgICA9IE9iamVjdC5rZXlzLFxuICAgIG5hdGl2ZUJpbmQgICAgICAgICA9IEZ1bmNQcm90by5iaW5kO1xuXG4gIC8vIENyZWF0ZSBhIHNhZmUgcmVmZXJlbmNlIHRvIHRoZSBVbmRlcnNjb3JlIG9iamVjdCBmb3IgdXNlIGJlbG93LlxuICB2YXIgXyA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmIChvYmogaW5zdGFuY2VvZiBfKSByZXR1cm4gb2JqO1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBfKSkgcmV0dXJuIG5ldyBfKG9iaik7XG4gICAgdGhpcy5fd3JhcHBlZCA9IG9iajtcbiAgfTtcblxuICAvLyBFeHBvcnQgdGhlIFVuZGVyc2NvcmUgb2JqZWN0IGZvciAqKk5vZGUuanMqKiwgd2l0aFxuICAvLyBiYWNrd2FyZHMtY29tcGF0aWJpbGl0eSBmb3IgdGhlIG9sZCBgcmVxdWlyZSgpYCBBUEkuIElmIHdlJ3JlIGluXG4gIC8vIHRoZSBicm93c2VyLCBhZGQgYF9gIGFzIGEgZ2xvYmFsIG9iamVjdCB2aWEgYSBzdHJpbmcgaWRlbnRpZmllcixcbiAgLy8gZm9yIENsb3N1cmUgQ29tcGlsZXIgXCJhZHZhbmNlZFwiIG1vZGUuXG4gIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICAgIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IF87XG4gICAgfVxuICAgIGV4cG9ydHMuXyA9IF87XG4gIH0gZWxzZSB7XG4gICAgcm9vdC5fID0gXztcbiAgfVxuXG4gIC8vIEN1cnJlbnQgdmVyc2lvbi5cbiAgXy5WRVJTSU9OID0gJzEuNi4wJztcblxuICAvLyBDb2xsZWN0aW9uIEZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIFRoZSBjb3JuZXJzdG9uZSwgYW4gYGVhY2hgIGltcGxlbWVudGF0aW9uLCBha2EgYGZvckVhY2hgLlxuICAvLyBIYW5kbGVzIG9iamVjdHMgd2l0aCB0aGUgYnVpbHQtaW4gYGZvckVhY2hgLCBhcnJheXMsIGFuZCByYXcgb2JqZWN0cy5cbiAgLy8gRGVsZWdhdGVzIHRvICoqRUNNQVNjcmlwdCA1KioncyBuYXRpdmUgYGZvckVhY2hgIGlmIGF2YWlsYWJsZS5cbiAgdmFyIGVhY2ggPSBfLmVhY2ggPSBfLmZvckVhY2ggPSBmdW5jdGlvbihvYmosIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gb2JqO1xuICAgIGlmIChuYXRpdmVGb3JFYWNoICYmIG9iai5mb3JFYWNoID09PSBuYXRpdmVGb3JFYWNoKSB7XG4gICAgICBvYmouZm9yRWFjaChpdGVyYXRvciwgY29udGV4dCk7XG4gICAgfSBlbHNlIGlmIChvYmoubGVuZ3RoID09PSArb2JqLmxlbmd0aCkge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IG9iai5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpbaV0sIGksIG9iaikgPT09IGJyZWFrZXIpIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGtleXMgPSBfLmtleXMob2JqKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtrZXlzW2ldXSwga2V5c1tpXSwgb2JqKSA9PT0gYnJlYWtlcikgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9O1xuXG4gIC8vIFJldHVybiB0aGUgcmVzdWx0cyBvZiBhcHBseWluZyB0aGUgaXRlcmF0b3IgdG8gZWFjaCBlbGVtZW50LlxuICAvLyBEZWxlZ2F0ZXMgdG8gKipFQ01BU2NyaXB0IDUqKidzIG5hdGl2ZSBgbWFwYCBpZiBhdmFpbGFibGUuXG4gIF8ubWFwID0gXy5jb2xsZWN0ID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgIHZhciByZXN1bHRzID0gW107XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gcmVzdWx0cztcbiAgICBpZiAobmF0aXZlTWFwICYmIG9iai5tYXAgPT09IG5hdGl2ZU1hcCkgcmV0dXJuIG9iai5tYXAoaXRlcmF0b3IsIGNvbnRleHQpO1xuICAgIGVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGxpc3QpIHtcbiAgICAgIHJlc3VsdHMucHVzaChpdGVyYXRvci5jYWxsKGNvbnRleHQsIHZhbHVlLCBpbmRleCwgbGlzdCkpO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHRzO1xuICB9O1xuXG4gIHZhciByZWR1Y2VFcnJvciA9ICdSZWR1Y2Ugb2YgZW1wdHkgYXJyYXkgd2l0aCBubyBpbml0aWFsIHZhbHVlJztcblxuICAvLyAqKlJlZHVjZSoqIGJ1aWxkcyB1cCBhIHNpbmdsZSByZXN1bHQgZnJvbSBhIGxpc3Qgb2YgdmFsdWVzLCBha2EgYGluamVjdGAsXG4gIC8vIG9yIGBmb2xkbGAuIERlbGVnYXRlcyB0byAqKkVDTUFTY3JpcHQgNSoqJ3MgbmF0aXZlIGByZWR1Y2VgIGlmIGF2YWlsYWJsZS5cbiAgXy5yZWR1Y2UgPSBfLmZvbGRsID0gXy5pbmplY3QgPSBmdW5jdGlvbihvYmosIGl0ZXJhdG9yLCBtZW1vLCBjb250ZXh0KSB7XG4gICAgdmFyIGluaXRpYWwgPSBhcmd1bWVudHMubGVuZ3RoID4gMjtcbiAgICBpZiAob2JqID09IG51bGwpIG9iaiA9IFtdO1xuICAgIGlmIChuYXRpdmVSZWR1Y2UgJiYgb2JqLnJlZHVjZSA9PT0gbmF0aXZlUmVkdWNlKSB7XG4gICAgICBpZiAoY29udGV4dCkgaXRlcmF0b3IgPSBfLmJpbmQoaXRlcmF0b3IsIGNvbnRleHQpO1xuICAgICAgcmV0dXJuIGluaXRpYWwgPyBvYmoucmVkdWNlKGl0ZXJhdG9yLCBtZW1vKSA6IG9iai5yZWR1Y2UoaXRlcmF0b3IpO1xuICAgIH1cbiAgICBlYWNoKG9iaiwgZnVuY3Rpb24odmFsdWUsIGluZGV4LCBsaXN0KSB7XG4gICAgICBpZiAoIWluaXRpYWwpIHtcbiAgICAgICAgbWVtbyA9IHZhbHVlO1xuICAgICAgICBpbml0aWFsID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1lbW8gPSBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG1lbW8sIHZhbHVlLCBpbmRleCwgbGlzdCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKCFpbml0aWFsKSB0aHJvdyBuZXcgVHlwZUVycm9yKHJlZHVjZUVycm9yKTtcbiAgICByZXR1cm4gbWVtbztcbiAgfTtcblxuICAvLyBUaGUgcmlnaHQtYXNzb2NpYXRpdmUgdmVyc2lvbiBvZiByZWR1Y2UsIGFsc28ga25vd24gYXMgYGZvbGRyYC5cbiAgLy8gRGVsZWdhdGVzIHRvICoqRUNNQVNjcmlwdCA1KioncyBuYXRpdmUgYHJlZHVjZVJpZ2h0YCBpZiBhdmFpbGFibGUuXG4gIF8ucmVkdWNlUmlnaHQgPSBfLmZvbGRyID0gZnVuY3Rpb24ob2JqLCBpdGVyYXRvciwgbWVtbywgY29udGV4dCkge1xuICAgIHZhciBpbml0aWFsID0gYXJndW1lbnRzLmxlbmd0aCA+IDI7XG4gICAgaWYgKG9iaiA9PSBudWxsKSBvYmogPSBbXTtcbiAgICBpZiAobmF0aXZlUmVkdWNlUmlnaHQgJiYgb2JqLnJlZHVjZVJpZ2h0ID09PSBuYXRpdmVSZWR1Y2VSaWdodCkge1xuICAgICAgaWYgKGNvbnRleHQpIGl0ZXJhdG9yID0gXy5iaW5kKGl0ZXJhdG9yLCBjb250ZXh0KTtcbiAgICAgIHJldHVybiBpbml0aWFsID8gb2JqLnJlZHVjZVJpZ2h0KGl0ZXJhdG9yLCBtZW1vKSA6IG9iai5yZWR1Y2VSaWdodChpdGVyYXRvcik7XG4gICAgfVxuICAgIHZhciBsZW5ndGggPSBvYmoubGVuZ3RoO1xuICAgIGlmIChsZW5ndGggIT09ICtsZW5ndGgpIHtcbiAgICAgIHZhciBrZXlzID0gXy5rZXlzKG9iaik7XG4gICAgICBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB9XG4gICAgZWFjaChvYmosIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgbGlzdCkge1xuICAgICAgaW5kZXggPSBrZXlzID8ga2V5c1stLWxlbmd0aF0gOiAtLWxlbmd0aDtcbiAgICAgIGlmICghaW5pdGlhbCkge1xuICAgICAgICBtZW1vID0gb2JqW2luZGV4XTtcbiAgICAgICAgaW5pdGlhbCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtZW1vID0gaXRlcmF0b3IuY2FsbChjb250ZXh0LCBtZW1vLCBvYmpbaW5kZXhdLCBpbmRleCwgbGlzdCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKCFpbml0aWFsKSB0aHJvdyBuZXcgVHlwZUVycm9yKHJlZHVjZUVycm9yKTtcbiAgICByZXR1cm4gbWVtbztcbiAgfTtcblxuICAvLyBSZXR1cm4gdGhlIGZpcnN0IHZhbHVlIHdoaWNoIHBhc3NlcyBhIHRydXRoIHRlc3QuIEFsaWFzZWQgYXMgYGRldGVjdGAuXG4gIF8uZmluZCA9IF8uZGV0ZWN0ID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgcmVzdWx0O1xuICAgIGFueShvYmosIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgbGlzdCkge1xuICAgICAgaWYgKHByZWRpY2F0ZS5jYWxsKGNvbnRleHQsIHZhbHVlLCBpbmRleCwgbGlzdCkpIHtcbiAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gUmV0dXJuIGFsbCB0aGUgZWxlbWVudHMgdGhhdCBwYXNzIGEgdHJ1dGggdGVzdC5cbiAgLy8gRGVsZWdhdGVzIHRvICoqRUNNQVNjcmlwdCA1KioncyBuYXRpdmUgYGZpbHRlcmAgaWYgYXZhaWxhYmxlLlxuICAvLyBBbGlhc2VkIGFzIGBzZWxlY3RgLlxuICBfLmZpbHRlciA9IF8uc2VsZWN0ID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgcmVzdWx0cyA9IFtdO1xuICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIHJlc3VsdHM7XG4gICAgaWYgKG5hdGl2ZUZpbHRlciAmJiBvYmouZmlsdGVyID09PSBuYXRpdmVGaWx0ZXIpIHJldHVybiBvYmouZmlsdGVyKHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgZWFjaChvYmosIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgbGlzdCkge1xuICAgICAgaWYgKHByZWRpY2F0ZS5jYWxsKGNvbnRleHQsIHZhbHVlLCBpbmRleCwgbGlzdCkpIHJlc3VsdHMucHVzaCh2YWx1ZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH07XG5cbiAgLy8gUmV0dXJuIGFsbCB0aGUgZWxlbWVudHMgZm9yIHdoaWNoIGEgdHJ1dGggdGVzdCBmYWlscy5cbiAgXy5yZWplY3QgPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHJldHVybiBfLmZpbHRlcihvYmosIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgbGlzdCkge1xuICAgICAgcmV0dXJuICFwcmVkaWNhdGUuY2FsbChjb250ZXh0LCB2YWx1ZSwgaW5kZXgsIGxpc3QpO1xuICAgIH0sIGNvbnRleHQpO1xuICB9O1xuXG4gIC8vIERldGVybWluZSB3aGV0aGVyIGFsbCBvZiB0aGUgZWxlbWVudHMgbWF0Y2ggYSB0cnV0aCB0ZXN0LlxuICAvLyBEZWxlZ2F0ZXMgdG8gKipFQ01BU2NyaXB0IDUqKidzIG5hdGl2ZSBgZXZlcnlgIGlmIGF2YWlsYWJsZS5cbiAgLy8gQWxpYXNlZCBhcyBgYWxsYC5cbiAgXy5ldmVyeSA9IF8uYWxsID0gZnVuY3Rpb24ob2JqLCBwcmVkaWNhdGUsIGNvbnRleHQpIHtcbiAgICBwcmVkaWNhdGUgfHwgKHByZWRpY2F0ZSA9IF8uaWRlbnRpdHkpO1xuICAgIHZhciByZXN1bHQgPSB0cnVlO1xuICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIHJlc3VsdDtcbiAgICBpZiAobmF0aXZlRXZlcnkgJiYgb2JqLmV2ZXJ5ID09PSBuYXRpdmVFdmVyeSkgcmV0dXJuIG9iai5ldmVyeShwcmVkaWNhdGUsIGNvbnRleHQpO1xuICAgIGVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGxpc3QpIHtcbiAgICAgIGlmICghKHJlc3VsdCA9IHJlc3VsdCAmJiBwcmVkaWNhdGUuY2FsbChjb250ZXh0LCB2YWx1ZSwgaW5kZXgsIGxpc3QpKSkgcmV0dXJuIGJyZWFrZXI7XG4gICAgfSk7XG4gICAgcmV0dXJuICEhcmVzdWx0O1xuICB9O1xuXG4gIC8vIERldGVybWluZSBpZiBhdCBsZWFzdCBvbmUgZWxlbWVudCBpbiB0aGUgb2JqZWN0IG1hdGNoZXMgYSB0cnV0aCB0ZXN0LlxuICAvLyBEZWxlZ2F0ZXMgdG8gKipFQ01BU2NyaXB0IDUqKidzIG5hdGl2ZSBgc29tZWAgaWYgYXZhaWxhYmxlLlxuICAvLyBBbGlhc2VkIGFzIGBhbnlgLlxuICB2YXIgYW55ID0gXy5zb21lID0gXy5hbnkgPSBmdW5jdGlvbihvYmosIHByZWRpY2F0ZSwgY29udGV4dCkge1xuICAgIHByZWRpY2F0ZSB8fCAocHJlZGljYXRlID0gXy5pZGVudGl0eSk7XG4gICAgdmFyIHJlc3VsdCA9IGZhbHNlO1xuICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIHJlc3VsdDtcbiAgICBpZiAobmF0aXZlU29tZSAmJiBvYmouc29tZSA9PT0gbmF0aXZlU29tZSkgcmV0dXJuIG9iai5zb21lKHByZWRpY2F0ZSwgY29udGV4dCk7XG4gICAgZWFjaChvYmosIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgbGlzdCkge1xuICAgICAgaWYgKHJlc3VsdCB8fCAocmVzdWx0ID0gcHJlZGljYXRlLmNhbGwoY29udGV4dCwgdmFsdWUsIGluZGV4LCBsaXN0KSkpIHJldHVybiBicmVha2VyO1xuICAgIH0pO1xuICAgIHJldHVybiAhIXJlc3VsdDtcbiAgfTtcblxuICAvLyBEZXRlcm1pbmUgaWYgdGhlIGFycmF5IG9yIG9iamVjdCBjb250YWlucyBhIGdpdmVuIHZhbHVlICh1c2luZyBgPT09YCkuXG4gIC8vIEFsaWFzZWQgYXMgYGluY2x1ZGVgLlxuICBfLmNvbnRhaW5zID0gXy5pbmNsdWRlID0gZnVuY3Rpb24ob2JqLCB0YXJnZXQpIHtcbiAgICBpZiAob2JqID09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgICBpZiAobmF0aXZlSW5kZXhPZiAmJiBvYmouaW5kZXhPZiA9PT0gbmF0aXZlSW5kZXhPZikgcmV0dXJuIG9iai5pbmRleE9mKHRhcmdldCkgIT0gLTE7XG4gICAgcmV0dXJuIGFueShvYmosIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUgPT09IHRhcmdldDtcbiAgICB9KTtcbiAgfTtcblxuICAvLyBJbnZva2UgYSBtZXRob2QgKHdpdGggYXJndW1lbnRzKSBvbiBldmVyeSBpdGVtIGluIGEgY29sbGVjdGlvbi5cbiAgXy5pbnZva2UgPSBmdW5jdGlvbihvYmosIG1ldGhvZCkge1xuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuICAgIHZhciBpc0Z1bmMgPSBfLmlzRnVuY3Rpb24obWV0aG9kKTtcbiAgICByZXR1cm4gXy5tYXAob2JqLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIChpc0Z1bmMgPyBtZXRob2QgOiB2YWx1ZVttZXRob2RdKS5hcHBseSh2YWx1ZSwgYXJncyk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gQ29udmVuaWVuY2UgdmVyc2lvbiBvZiBhIGNvbW1vbiB1c2UgY2FzZSBvZiBgbWFwYDogZmV0Y2hpbmcgYSBwcm9wZXJ0eS5cbiAgXy5wbHVjayA9IGZ1bmN0aW9uKG9iaiwga2V5KSB7XG4gICAgcmV0dXJuIF8ubWFwKG9iaiwgXy5wcm9wZXJ0eShrZXkpKTtcbiAgfTtcblxuICAvLyBDb252ZW5pZW5jZSB2ZXJzaW9uIG9mIGEgY29tbW9uIHVzZSBjYXNlIG9mIGBmaWx0ZXJgOiBzZWxlY3Rpbmcgb25seSBvYmplY3RzXG4gIC8vIGNvbnRhaW5pbmcgc3BlY2lmaWMgYGtleTp2YWx1ZWAgcGFpcnMuXG4gIF8ud2hlcmUgPSBmdW5jdGlvbihvYmosIGF0dHJzKSB7XG4gICAgcmV0dXJuIF8uZmlsdGVyKG9iaiwgXy5tYXRjaGVzKGF0dHJzKSk7XG4gIH07XG5cbiAgLy8gQ29udmVuaWVuY2UgdmVyc2lvbiBvZiBhIGNvbW1vbiB1c2UgY2FzZSBvZiBgZmluZGA6IGdldHRpbmcgdGhlIGZpcnN0IG9iamVjdFxuICAvLyBjb250YWluaW5nIHNwZWNpZmljIGBrZXk6dmFsdWVgIHBhaXJzLlxuICBfLmZpbmRXaGVyZSA9IGZ1bmN0aW9uKG9iaiwgYXR0cnMpIHtcbiAgICByZXR1cm4gXy5maW5kKG9iaiwgXy5tYXRjaGVzKGF0dHJzKSk7XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSBtYXhpbXVtIGVsZW1lbnQgb3IgKGVsZW1lbnQtYmFzZWQgY29tcHV0YXRpb24pLlxuICAvLyBDYW4ndCBvcHRpbWl6ZSBhcnJheXMgb2YgaW50ZWdlcnMgbG9uZ2VyIHRoYW4gNjUsNTM1IGVsZW1lbnRzLlxuICAvLyBTZWUgW1dlYktpdCBCdWcgODA3OTddKGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD04MDc5NylcbiAgXy5tYXggPSBmdW5jdGlvbihvYmosIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgaWYgKCFpdGVyYXRvciAmJiBfLmlzQXJyYXkob2JqKSAmJiBvYmpbMF0gPT09ICtvYmpbMF0gJiYgb2JqLmxlbmd0aCA8IDY1NTM1KSB7XG4gICAgICByZXR1cm4gTWF0aC5tYXguYXBwbHkoTWF0aCwgb2JqKTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdCA9IC1JbmZpbml0eSwgbGFzdENvbXB1dGVkID0gLUluZmluaXR5O1xuICAgIGVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGxpc3QpIHtcbiAgICAgIHZhciBjb21wdXRlZCA9IGl0ZXJhdG9yID8gaXRlcmF0b3IuY2FsbChjb250ZXh0LCB2YWx1ZSwgaW5kZXgsIGxpc3QpIDogdmFsdWU7XG4gICAgICBpZiAoY29tcHV0ZWQgPiBsYXN0Q29tcHV0ZWQpIHtcbiAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgIGxhc3RDb21wdXRlZCA9IGNvbXB1dGVkO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gUmV0dXJuIHRoZSBtaW5pbXVtIGVsZW1lbnQgKG9yIGVsZW1lbnQtYmFzZWQgY29tcHV0YXRpb24pLlxuICBfLm1pbiA9IGZ1bmN0aW9uKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgICBpZiAoIWl0ZXJhdG9yICYmIF8uaXNBcnJheShvYmopICYmIG9ialswXSA9PT0gK29ialswXSAmJiBvYmoubGVuZ3RoIDwgNjU1MzUpIHtcbiAgICAgIHJldHVybiBNYXRoLm1pbi5hcHBseShNYXRoLCBvYmopO1xuICAgIH1cbiAgICB2YXIgcmVzdWx0ID0gSW5maW5pdHksIGxhc3RDb21wdXRlZCA9IEluZmluaXR5O1xuICAgIGVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGxpc3QpIHtcbiAgICAgIHZhciBjb21wdXRlZCA9IGl0ZXJhdG9yID8gaXRlcmF0b3IuY2FsbChjb250ZXh0LCB2YWx1ZSwgaW5kZXgsIGxpc3QpIDogdmFsdWU7XG4gICAgICBpZiAoY29tcHV0ZWQgPCBsYXN0Q29tcHV0ZWQpIHtcbiAgICAgICAgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgIGxhc3RDb21wdXRlZCA9IGNvbXB1dGVkO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gU2h1ZmZsZSBhbiBhcnJheSwgdXNpbmcgdGhlIG1vZGVybiB2ZXJzaW9uIG9mIHRoZVxuICAvLyBbRmlzaGVyLVlhdGVzIHNodWZmbGVdKGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvRmlzaGVy4oCTWWF0ZXNfc2h1ZmZsZSkuXG4gIF8uc2h1ZmZsZSA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciByYW5kO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIHNodWZmbGVkID0gW107XG4gICAgZWFjaChvYmosIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByYW5kID0gXy5yYW5kb20oaW5kZXgrKyk7XG4gICAgICBzaHVmZmxlZFtpbmRleCAtIDFdID0gc2h1ZmZsZWRbcmFuZF07XG4gICAgICBzaHVmZmxlZFtyYW5kXSA9IHZhbHVlO1xuICAgIH0pO1xuICAgIHJldHVybiBzaHVmZmxlZDtcbiAgfTtcblxuICAvLyBTYW1wbGUgKipuKiogcmFuZG9tIHZhbHVlcyBmcm9tIGEgY29sbGVjdGlvbi5cbiAgLy8gSWYgKipuKiogaXMgbm90IHNwZWNpZmllZCwgcmV0dXJucyBhIHNpbmdsZSByYW5kb20gZWxlbWVudC5cbiAgLy8gVGhlIGludGVybmFsIGBndWFyZGAgYXJndW1lbnQgYWxsb3dzIGl0IHRvIHdvcmsgd2l0aCBgbWFwYC5cbiAgXy5zYW1wbGUgPSBmdW5jdGlvbihvYmosIG4sIGd1YXJkKSB7XG4gICAgaWYgKG4gPT0gbnVsbCB8fCBndWFyZCkge1xuICAgICAgaWYgKG9iai5sZW5ndGggIT09ICtvYmoubGVuZ3RoKSBvYmogPSBfLnZhbHVlcyhvYmopO1xuICAgICAgcmV0dXJuIG9ialtfLnJhbmRvbShvYmoubGVuZ3RoIC0gMSldO1xuICAgIH1cbiAgICByZXR1cm4gXy5zaHVmZmxlKG9iaikuc2xpY2UoMCwgTWF0aC5tYXgoMCwgbikpO1xuICB9O1xuXG4gIC8vIEFuIGludGVybmFsIGZ1bmN0aW9uIHRvIGdlbmVyYXRlIGxvb2t1cCBpdGVyYXRvcnMuXG4gIHZhciBsb29rdXBJdGVyYXRvciA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiBfLmlkZW50aXR5O1xuICAgIGlmIChfLmlzRnVuY3Rpb24odmFsdWUpKSByZXR1cm4gdmFsdWU7XG4gICAgcmV0dXJuIF8ucHJvcGVydHkodmFsdWUpO1xuICB9O1xuXG4gIC8vIFNvcnQgdGhlIG9iamVjdCdzIHZhbHVlcyBieSBhIGNyaXRlcmlvbiBwcm9kdWNlZCBieSBhbiBpdGVyYXRvci5cbiAgXy5zb3J0QnkgPSBmdW5jdGlvbihvYmosIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgaXRlcmF0b3IgPSBsb29rdXBJdGVyYXRvcihpdGVyYXRvcik7XG4gICAgcmV0dXJuIF8ucGx1Y2soXy5tYXAob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgsIGxpc3QpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICBjcml0ZXJpYTogaXRlcmF0b3IuY2FsbChjb250ZXh0LCB2YWx1ZSwgaW5kZXgsIGxpc3QpXG4gICAgICB9O1xuICAgIH0pLnNvcnQoZnVuY3Rpb24obGVmdCwgcmlnaHQpIHtcbiAgICAgIHZhciBhID0gbGVmdC5jcml0ZXJpYTtcbiAgICAgIHZhciBiID0gcmlnaHQuY3JpdGVyaWE7XG4gICAgICBpZiAoYSAhPT0gYikge1xuICAgICAgICBpZiAoYSA+IGIgfHwgYSA9PT0gdm9pZCAwKSByZXR1cm4gMTtcbiAgICAgICAgaWYgKGEgPCBiIHx8IGIgPT09IHZvaWQgMCkgcmV0dXJuIC0xO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGxlZnQuaW5kZXggLSByaWdodC5pbmRleDtcbiAgICB9KSwgJ3ZhbHVlJyk7XG4gIH07XG5cbiAgLy8gQW4gaW50ZXJuYWwgZnVuY3Rpb24gdXNlZCBmb3IgYWdncmVnYXRlIFwiZ3JvdXAgYnlcIiBvcGVyYXRpb25zLlxuICB2YXIgZ3JvdXAgPSBmdW5jdGlvbihiZWhhdmlvcikge1xuICAgIHJldHVybiBmdW5jdGlvbihvYmosIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICBpdGVyYXRvciA9IGxvb2t1cEl0ZXJhdG9yKGl0ZXJhdG9yKTtcbiAgICAgIGVhY2gob2JqLCBmdW5jdGlvbih2YWx1ZSwgaW5kZXgpIHtcbiAgICAgICAgdmFyIGtleSA9IGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgdmFsdWUsIGluZGV4LCBvYmopO1xuICAgICAgICBiZWhhdmlvcihyZXN1bHQsIGtleSwgdmFsdWUpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gIH07XG5cbiAgLy8gR3JvdXBzIHRoZSBvYmplY3QncyB2YWx1ZXMgYnkgYSBjcml0ZXJpb24uIFBhc3MgZWl0aGVyIGEgc3RyaW5nIGF0dHJpYnV0ZVxuICAvLyB0byBncm91cCBieSwgb3IgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGNyaXRlcmlvbi5cbiAgXy5ncm91cEJ5ID0gZ3JvdXAoZnVuY3Rpb24ocmVzdWx0LCBrZXksIHZhbHVlKSB7XG4gICAgXy5oYXMocmVzdWx0LCBrZXkpID8gcmVzdWx0W2tleV0ucHVzaCh2YWx1ZSkgOiByZXN1bHRba2V5XSA9IFt2YWx1ZV07XG4gIH0pO1xuXG4gIC8vIEluZGV4ZXMgdGhlIG9iamVjdCdzIHZhbHVlcyBieSBhIGNyaXRlcmlvbiwgc2ltaWxhciB0byBgZ3JvdXBCeWAsIGJ1dCBmb3JcbiAgLy8gd2hlbiB5b3Uga25vdyB0aGF0IHlvdXIgaW5kZXggdmFsdWVzIHdpbGwgYmUgdW5pcXVlLlxuICBfLmluZGV4QnkgPSBncm91cChmdW5jdGlvbihyZXN1bHQsIGtleSwgdmFsdWUpIHtcbiAgICByZXN1bHRba2V5XSA9IHZhbHVlO1xuICB9KTtcblxuICAvLyBDb3VudHMgaW5zdGFuY2VzIG9mIGFuIG9iamVjdCB0aGF0IGdyb3VwIGJ5IGEgY2VydGFpbiBjcml0ZXJpb24uIFBhc3NcbiAgLy8gZWl0aGVyIGEgc3RyaW5nIGF0dHJpYnV0ZSB0byBjb3VudCBieSwgb3IgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlXG4gIC8vIGNyaXRlcmlvbi5cbiAgXy5jb3VudEJ5ID0gZ3JvdXAoZnVuY3Rpb24ocmVzdWx0LCBrZXkpIHtcbiAgICBfLmhhcyhyZXN1bHQsIGtleSkgPyByZXN1bHRba2V5XSsrIDogcmVzdWx0W2tleV0gPSAxO1xuICB9KTtcblxuICAvLyBVc2UgYSBjb21wYXJhdG9yIGZ1bmN0aW9uIHRvIGZpZ3VyZSBvdXQgdGhlIHNtYWxsZXN0IGluZGV4IGF0IHdoaWNoXG4gIC8vIGFuIG9iamVjdCBzaG91bGQgYmUgaW5zZXJ0ZWQgc28gYXMgdG8gbWFpbnRhaW4gb3JkZXIuIFVzZXMgYmluYXJ5IHNlYXJjaC5cbiAgXy5zb3J0ZWRJbmRleCA9IGZ1bmN0aW9uKGFycmF5LCBvYmosIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgaXRlcmF0b3IgPSBsb29rdXBJdGVyYXRvcihpdGVyYXRvcik7XG4gICAgdmFyIHZhbHVlID0gaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmopO1xuICAgIHZhciBsb3cgPSAwLCBoaWdoID0gYXJyYXkubGVuZ3RoO1xuICAgIHdoaWxlIChsb3cgPCBoaWdoKSB7XG4gICAgICB2YXIgbWlkID0gKGxvdyArIGhpZ2gpID4+PiAxO1xuICAgICAgaXRlcmF0b3IuY2FsbChjb250ZXh0LCBhcnJheVttaWRdKSA8IHZhbHVlID8gbG93ID0gbWlkICsgMSA6IGhpZ2ggPSBtaWQ7XG4gICAgfVxuICAgIHJldHVybiBsb3c7XG4gIH07XG5cbiAgLy8gU2FmZWx5IGNyZWF0ZSBhIHJlYWwsIGxpdmUgYXJyYXkgZnJvbSBhbnl0aGluZyBpdGVyYWJsZS5cbiAgXy50b0FycmF5ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKCFvYmopIHJldHVybiBbXTtcbiAgICBpZiAoXy5pc0FycmF5KG9iaikpIHJldHVybiBzbGljZS5jYWxsKG9iaik7XG4gICAgaWYgKG9iai5sZW5ndGggPT09ICtvYmoubGVuZ3RoKSByZXR1cm4gXy5tYXAob2JqLCBfLmlkZW50aXR5KTtcbiAgICByZXR1cm4gXy52YWx1ZXMob2JqKTtcbiAgfTtcblxuICAvLyBSZXR1cm4gdGhlIG51bWJlciBvZiBlbGVtZW50cyBpbiBhbiBvYmplY3QuXG4gIF8uc2l6ZSA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmIChvYmogPT0gbnVsbCkgcmV0dXJuIDA7XG4gICAgcmV0dXJuIChvYmoubGVuZ3RoID09PSArb2JqLmxlbmd0aCkgPyBvYmoubGVuZ3RoIDogXy5rZXlzKG9iaikubGVuZ3RoO1xuICB9O1xuXG4gIC8vIEFycmF5IEZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS1cblxuICAvLyBHZXQgdGhlIGZpcnN0IGVsZW1lbnQgb2YgYW4gYXJyYXkuIFBhc3NpbmcgKipuKiogd2lsbCByZXR1cm4gdGhlIGZpcnN0IE5cbiAgLy8gdmFsdWVzIGluIHRoZSBhcnJheS4gQWxpYXNlZCBhcyBgaGVhZGAgYW5kIGB0YWtlYC4gVGhlICoqZ3VhcmQqKiBjaGVja1xuICAvLyBhbGxvd3MgaXQgdG8gd29yayB3aXRoIGBfLm1hcGAuXG4gIF8uZmlyc3QgPSBfLmhlYWQgPSBfLnRha2UgPSBmdW5jdGlvbihhcnJheSwgbiwgZ3VhcmQpIHtcbiAgICBpZiAoYXJyYXkgPT0gbnVsbCkgcmV0dXJuIHZvaWQgMDtcbiAgICBpZiAoKG4gPT0gbnVsbCkgfHwgZ3VhcmQpIHJldHVybiBhcnJheVswXTtcbiAgICBpZiAobiA8IDApIHJldHVybiBbXTtcbiAgICByZXR1cm4gc2xpY2UuY2FsbChhcnJheSwgMCwgbik7XG4gIH07XG5cbiAgLy8gUmV0dXJucyBldmVyeXRoaW5nIGJ1dCB0aGUgbGFzdCBlbnRyeSBvZiB0aGUgYXJyYXkuIEVzcGVjaWFsbHkgdXNlZnVsIG9uXG4gIC8vIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBQYXNzaW5nICoqbioqIHdpbGwgcmV0dXJuIGFsbCB0aGUgdmFsdWVzIGluXG4gIC8vIHRoZSBhcnJheSwgZXhjbHVkaW5nIHRoZSBsYXN0IE4uIFRoZSAqKmd1YXJkKiogY2hlY2sgYWxsb3dzIGl0IHRvIHdvcmsgd2l0aFxuICAvLyBgXy5tYXBgLlxuICBfLmluaXRpYWwgPSBmdW5jdGlvbihhcnJheSwgbiwgZ3VhcmQpIHtcbiAgICByZXR1cm4gc2xpY2UuY2FsbChhcnJheSwgMCwgYXJyYXkubGVuZ3RoIC0gKChuID09IG51bGwpIHx8IGd1YXJkID8gMSA6IG4pKTtcbiAgfTtcblxuICAvLyBHZXQgdGhlIGxhc3QgZWxlbWVudCBvZiBhbiBhcnJheS4gUGFzc2luZyAqKm4qKiB3aWxsIHJldHVybiB0aGUgbGFzdCBOXG4gIC8vIHZhbHVlcyBpbiB0aGUgYXJyYXkuIFRoZSAqKmd1YXJkKiogY2hlY2sgYWxsb3dzIGl0IHRvIHdvcmsgd2l0aCBgXy5tYXBgLlxuICBfLmxhc3QgPSBmdW5jdGlvbihhcnJheSwgbiwgZ3VhcmQpIHtcbiAgICBpZiAoYXJyYXkgPT0gbnVsbCkgcmV0dXJuIHZvaWQgMDtcbiAgICBpZiAoKG4gPT0gbnVsbCkgfHwgZ3VhcmQpIHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAxXTtcbiAgICByZXR1cm4gc2xpY2UuY2FsbChhcnJheSwgTWF0aC5tYXgoYXJyYXkubGVuZ3RoIC0gbiwgMCkpO1xuICB9O1xuXG4gIC8vIFJldHVybnMgZXZlcnl0aGluZyBidXQgdGhlIGZpcnN0IGVudHJ5IG9mIHRoZSBhcnJheS4gQWxpYXNlZCBhcyBgdGFpbGAgYW5kIGBkcm9wYC5cbiAgLy8gRXNwZWNpYWxseSB1c2VmdWwgb24gdGhlIGFyZ3VtZW50cyBvYmplY3QuIFBhc3NpbmcgYW4gKipuKiogd2lsbCByZXR1cm5cbiAgLy8gdGhlIHJlc3QgTiB2YWx1ZXMgaW4gdGhlIGFycmF5LiBUaGUgKipndWFyZCoqXG4gIC8vIGNoZWNrIGFsbG93cyBpdCB0byB3b3JrIHdpdGggYF8ubWFwYC5cbiAgXy5yZXN0ID0gXy50YWlsID0gXy5kcm9wID0gZnVuY3Rpb24oYXJyYXksIG4sIGd1YXJkKSB7XG4gICAgcmV0dXJuIHNsaWNlLmNhbGwoYXJyYXksIChuID09IG51bGwpIHx8IGd1YXJkID8gMSA6IG4pO1xuICB9O1xuXG4gIC8vIFRyaW0gb3V0IGFsbCBmYWxzeSB2YWx1ZXMgZnJvbSBhbiBhcnJheS5cbiAgXy5jb21wYWN0ID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgICByZXR1cm4gXy5maWx0ZXIoYXJyYXksIF8uaWRlbnRpdHkpO1xuICB9O1xuXG4gIC8vIEludGVybmFsIGltcGxlbWVudGF0aW9uIG9mIGEgcmVjdXJzaXZlIGBmbGF0dGVuYCBmdW5jdGlvbi5cbiAgdmFyIGZsYXR0ZW4gPSBmdW5jdGlvbihpbnB1dCwgc2hhbGxvdywgb3V0cHV0KSB7XG4gICAgaWYgKHNoYWxsb3cgJiYgXy5ldmVyeShpbnB1dCwgXy5pc0FycmF5KSkge1xuICAgICAgcmV0dXJuIGNvbmNhdC5hcHBseShvdXRwdXQsIGlucHV0KTtcbiAgICB9XG4gICAgZWFjaChpbnB1dCwgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIGlmIChfLmlzQXJyYXkodmFsdWUpIHx8IF8uaXNBcmd1bWVudHModmFsdWUpKSB7XG4gICAgICAgIHNoYWxsb3cgPyBwdXNoLmFwcGx5KG91dHB1dCwgdmFsdWUpIDogZmxhdHRlbih2YWx1ZSwgc2hhbGxvdywgb3V0cHV0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG91dHB1dC5wdXNoKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gb3V0cHV0O1xuICB9O1xuXG4gIC8vIEZsYXR0ZW4gb3V0IGFuIGFycmF5LCBlaXRoZXIgcmVjdXJzaXZlbHkgKGJ5IGRlZmF1bHQpLCBvciBqdXN0IG9uZSBsZXZlbC5cbiAgXy5mbGF0dGVuID0gZnVuY3Rpb24oYXJyYXksIHNoYWxsb3cpIHtcbiAgICByZXR1cm4gZmxhdHRlbihhcnJheSwgc2hhbGxvdywgW10pO1xuICB9O1xuXG4gIC8vIFJldHVybiBhIHZlcnNpb24gb2YgdGhlIGFycmF5IHRoYXQgZG9lcyBub3QgY29udGFpbiB0aGUgc3BlY2lmaWVkIHZhbHVlKHMpLlxuICBfLndpdGhvdXQgPSBmdW5jdGlvbihhcnJheSkge1xuICAgIHJldHVybiBfLmRpZmZlcmVuY2UoYXJyYXksIHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gIH07XG5cbiAgLy8gU3BsaXQgYW4gYXJyYXkgaW50byB0d28gYXJyYXlzOiBvbmUgd2hvc2UgZWxlbWVudHMgYWxsIHNhdGlzZnkgdGhlIGdpdmVuXG4gIC8vIHByZWRpY2F0ZSwgYW5kIG9uZSB3aG9zZSBlbGVtZW50cyBhbGwgZG8gbm90IHNhdGlzZnkgdGhlIHByZWRpY2F0ZS5cbiAgXy5wYXJ0aXRpb24gPSBmdW5jdGlvbihhcnJheSwgcHJlZGljYXRlKSB7XG4gICAgdmFyIHBhc3MgPSBbXSwgZmFpbCA9IFtdO1xuICAgIGVhY2goYXJyYXksIGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAgIChwcmVkaWNhdGUoZWxlbSkgPyBwYXNzIDogZmFpbCkucHVzaChlbGVtKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW3Bhc3MsIGZhaWxdO1xuICB9O1xuXG4gIC8vIFByb2R1Y2UgYSBkdXBsaWNhdGUtZnJlZSB2ZXJzaW9uIG9mIHRoZSBhcnJheS4gSWYgdGhlIGFycmF5IGhhcyBhbHJlYWR5XG4gIC8vIGJlZW4gc29ydGVkLCB5b3UgaGF2ZSB0aGUgb3B0aW9uIG9mIHVzaW5nIGEgZmFzdGVyIGFsZ29yaXRobS5cbiAgLy8gQWxpYXNlZCBhcyBgdW5pcXVlYC5cbiAgXy51bmlxID0gXy51bmlxdWUgPSBmdW5jdGlvbihhcnJheSwgaXNTb3J0ZWQsIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgaWYgKF8uaXNGdW5jdGlvbihpc1NvcnRlZCkpIHtcbiAgICAgIGNvbnRleHQgPSBpdGVyYXRvcjtcbiAgICAgIGl0ZXJhdG9yID0gaXNTb3J0ZWQ7XG4gICAgICBpc1NvcnRlZCA9IGZhbHNlO1xuICAgIH1cbiAgICB2YXIgaW5pdGlhbCA9IGl0ZXJhdG9yID8gXy5tYXAoYXJyYXksIGl0ZXJhdG9yLCBjb250ZXh0KSA6IGFycmF5O1xuICAgIHZhciByZXN1bHRzID0gW107XG4gICAgdmFyIHNlZW4gPSBbXTtcbiAgICBlYWNoKGluaXRpYWwsIGZ1bmN0aW9uKHZhbHVlLCBpbmRleCkge1xuICAgICAgaWYgKGlzU29ydGVkID8gKCFpbmRleCB8fCBzZWVuW3NlZW4ubGVuZ3RoIC0gMV0gIT09IHZhbHVlKSA6ICFfLmNvbnRhaW5zKHNlZW4sIHZhbHVlKSkge1xuICAgICAgICBzZWVuLnB1c2godmFsdWUpO1xuICAgICAgICByZXN1bHRzLnB1c2goYXJyYXlbaW5kZXhdKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfTtcblxuICAvLyBQcm9kdWNlIGFuIGFycmF5IHRoYXQgY29udGFpbnMgdGhlIHVuaW9uOiBlYWNoIGRpc3RpbmN0IGVsZW1lbnQgZnJvbSBhbGwgb2ZcbiAgLy8gdGhlIHBhc3NlZC1pbiBhcnJheXMuXG4gIF8udW5pb24gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXy51bmlxKF8uZmxhdHRlbihhcmd1bWVudHMsIHRydWUpKTtcbiAgfTtcblxuICAvLyBQcm9kdWNlIGFuIGFycmF5IHRoYXQgY29udGFpbnMgZXZlcnkgaXRlbSBzaGFyZWQgYmV0d2VlbiBhbGwgdGhlXG4gIC8vIHBhc3NlZC1pbiBhcnJheXMuXG4gIF8uaW50ZXJzZWN0aW9uID0gZnVuY3Rpb24oYXJyYXkpIHtcbiAgICB2YXIgcmVzdCA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICByZXR1cm4gXy5maWx0ZXIoXy51bmlxKGFycmF5KSwgZnVuY3Rpb24oaXRlbSkge1xuICAgICAgcmV0dXJuIF8uZXZlcnkocmVzdCwgZnVuY3Rpb24ob3RoZXIpIHtcbiAgICAgICAgcmV0dXJuIF8uY29udGFpbnMob3RoZXIsIGl0ZW0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gVGFrZSB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIG9uZSBhcnJheSBhbmQgYSBudW1iZXIgb2Ygb3RoZXIgYXJyYXlzLlxuICAvLyBPbmx5IHRoZSBlbGVtZW50cyBwcmVzZW50IGluIGp1c3QgdGhlIGZpcnN0IGFycmF5IHdpbGwgcmVtYWluLlxuICBfLmRpZmZlcmVuY2UgPSBmdW5jdGlvbihhcnJheSkge1xuICAgIHZhciByZXN0ID0gY29uY2F0LmFwcGx5KEFycmF5UHJvdG8sIHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgcmV0dXJuIF8uZmlsdGVyKGFycmF5LCBmdW5jdGlvbih2YWx1ZSl7IHJldHVybiAhXy5jb250YWlucyhyZXN0LCB2YWx1ZSk7IH0pO1xuICB9O1xuXG4gIC8vIFppcCB0b2dldGhlciBtdWx0aXBsZSBsaXN0cyBpbnRvIGEgc2luZ2xlIGFycmF5IC0tIGVsZW1lbnRzIHRoYXQgc2hhcmVcbiAgLy8gYW4gaW5kZXggZ28gdG9nZXRoZXIuXG4gIF8uemlwID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxlbmd0aCA9IF8ubWF4KF8ucGx1Y2soYXJndW1lbnRzLCAnbGVuZ3RoJykuY29uY2F0KDApKTtcbiAgICB2YXIgcmVzdWx0cyA9IG5ldyBBcnJheShsZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlc3VsdHNbaV0gPSBfLnBsdWNrKGFyZ3VtZW50cywgJycgKyBpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH07XG5cbiAgLy8gQ29udmVydHMgbGlzdHMgaW50byBvYmplY3RzLiBQYXNzIGVpdGhlciBhIHNpbmdsZSBhcnJheSBvZiBgW2tleSwgdmFsdWVdYFxuICAvLyBwYWlycywgb3IgdHdvIHBhcmFsbGVsIGFycmF5cyBvZiB0aGUgc2FtZSBsZW5ndGggLS0gb25lIG9mIGtleXMsIGFuZCBvbmUgb2ZcbiAgLy8gdGhlIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICBfLm9iamVjdCA9IGZ1bmN0aW9uKGxpc3QsIHZhbHVlcykge1xuICAgIGlmIChsaXN0ID09IG51bGwpIHJldHVybiB7fTtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGxpc3QubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh2YWx1ZXMpIHtcbiAgICAgICAgcmVzdWx0W2xpc3RbaV1dID0gdmFsdWVzW2ldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0W2xpc3RbaV1bMF1dID0gbGlzdFtpXVsxXTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvLyBJZiB0aGUgYnJvd3NlciBkb2Vzbid0IHN1cHBseSB1cyB3aXRoIGluZGV4T2YgKEknbSBsb29raW5nIGF0IHlvdSwgKipNU0lFKiopLFxuICAvLyB3ZSBuZWVkIHRoaXMgZnVuY3Rpb24uIFJldHVybiB0aGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgYW5cbiAgLy8gaXRlbSBpbiBhbiBhcnJheSwgb3IgLTEgaWYgdGhlIGl0ZW0gaXMgbm90IGluY2x1ZGVkIGluIHRoZSBhcnJheS5cbiAgLy8gRGVsZWdhdGVzIHRvICoqRUNNQVNjcmlwdCA1KioncyBuYXRpdmUgYGluZGV4T2ZgIGlmIGF2YWlsYWJsZS5cbiAgLy8gSWYgdGhlIGFycmF5IGlzIGxhcmdlIGFuZCBhbHJlYWR5IGluIHNvcnQgb3JkZXIsIHBhc3MgYHRydWVgXG4gIC8vIGZvciAqKmlzU29ydGVkKiogdG8gdXNlIGJpbmFyeSBzZWFyY2guXG4gIF8uaW5kZXhPZiA9IGZ1bmN0aW9uKGFycmF5LCBpdGVtLCBpc1NvcnRlZCkge1xuICAgIGlmIChhcnJheSA9PSBudWxsKSByZXR1cm4gLTE7XG4gICAgdmFyIGkgPSAwLCBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gICAgaWYgKGlzU29ydGVkKSB7XG4gICAgICBpZiAodHlwZW9mIGlzU29ydGVkID09ICdudW1iZXInKSB7XG4gICAgICAgIGkgPSAoaXNTb3J0ZWQgPCAwID8gTWF0aC5tYXgoMCwgbGVuZ3RoICsgaXNTb3J0ZWQpIDogaXNTb3J0ZWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaSA9IF8uc29ydGVkSW5kZXgoYXJyYXksIGl0ZW0pO1xuICAgICAgICByZXR1cm4gYXJyYXlbaV0gPT09IGl0ZW0gPyBpIDogLTE7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChuYXRpdmVJbmRleE9mICYmIGFycmF5LmluZGV4T2YgPT09IG5hdGl2ZUluZGV4T2YpIHJldHVybiBhcnJheS5pbmRleE9mKGl0ZW0sIGlzU29ydGVkKTtcbiAgICBmb3IgKDsgaSA8IGxlbmd0aDsgaSsrKSBpZiAoYXJyYXlbaV0gPT09IGl0ZW0pIHJldHVybiBpO1xuICAgIHJldHVybiAtMTtcbiAgfTtcblxuICAvLyBEZWxlZ2F0ZXMgdG8gKipFQ01BU2NyaXB0IDUqKidzIG5hdGl2ZSBgbGFzdEluZGV4T2ZgIGlmIGF2YWlsYWJsZS5cbiAgXy5sYXN0SW5kZXhPZiA9IGZ1bmN0aW9uKGFycmF5LCBpdGVtLCBmcm9tKSB7XG4gICAgaWYgKGFycmF5ID09IG51bGwpIHJldHVybiAtMTtcbiAgICB2YXIgaGFzSW5kZXggPSBmcm9tICE9IG51bGw7XG4gICAgaWYgKG5hdGl2ZUxhc3RJbmRleE9mICYmIGFycmF5Lmxhc3RJbmRleE9mID09PSBuYXRpdmVMYXN0SW5kZXhPZikge1xuICAgICAgcmV0dXJuIGhhc0luZGV4ID8gYXJyYXkubGFzdEluZGV4T2YoaXRlbSwgZnJvbSkgOiBhcnJheS5sYXN0SW5kZXhPZihpdGVtKTtcbiAgICB9XG4gICAgdmFyIGkgPSAoaGFzSW5kZXggPyBmcm9tIDogYXJyYXkubGVuZ3RoKTtcbiAgICB3aGlsZSAoaS0tKSBpZiAoYXJyYXlbaV0gPT09IGl0ZW0pIHJldHVybiBpO1xuICAgIHJldHVybiAtMTtcbiAgfTtcblxuICAvLyBHZW5lcmF0ZSBhbiBpbnRlZ2VyIEFycmF5IGNvbnRhaW5pbmcgYW4gYXJpdGhtZXRpYyBwcm9ncmVzc2lvbi4gQSBwb3J0IG9mXG4gIC8vIHRoZSBuYXRpdmUgUHl0aG9uIGByYW5nZSgpYCBmdW5jdGlvbi4gU2VlXG4gIC8vIFt0aGUgUHl0aG9uIGRvY3VtZW50YXRpb25dKGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS9mdW5jdGlvbnMuaHRtbCNyYW5nZSkuXG4gIF8ucmFuZ2UgPSBmdW5jdGlvbihzdGFydCwgc3RvcCwgc3RlcCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDw9IDEpIHtcbiAgICAgIHN0b3AgPSBzdGFydCB8fCAwO1xuICAgICAgc3RhcnQgPSAwO1xuICAgIH1cbiAgICBzdGVwID0gYXJndW1lbnRzWzJdIHx8IDE7XG5cbiAgICB2YXIgbGVuZ3RoID0gTWF0aC5tYXgoTWF0aC5jZWlsKChzdG9wIC0gc3RhcnQpIC8gc3RlcCksIDApO1xuICAgIHZhciBpZHggPSAwO1xuICAgIHZhciByYW5nZSA9IG5ldyBBcnJheShsZW5ndGgpO1xuXG4gICAgd2hpbGUoaWR4IDwgbGVuZ3RoKSB7XG4gICAgICByYW5nZVtpZHgrK10gPSBzdGFydDtcbiAgICAgIHN0YXJ0ICs9IHN0ZXA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJhbmdlO1xuICB9O1xuXG4gIC8vIEZ1bmN0aW9uIChhaGVtKSBGdW5jdGlvbnNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gUmV1c2FibGUgY29uc3RydWN0b3IgZnVuY3Rpb24gZm9yIHByb3RvdHlwZSBzZXR0aW5nLlxuICB2YXIgY3RvciA9IGZ1bmN0aW9uKCl7fTtcblxuICAvLyBDcmVhdGUgYSBmdW5jdGlvbiBib3VuZCB0byBhIGdpdmVuIG9iamVjdCAoYXNzaWduaW5nIGB0aGlzYCwgYW5kIGFyZ3VtZW50cyxcbiAgLy8gb3B0aW9uYWxseSkuIERlbGVnYXRlcyB0byAqKkVDTUFTY3JpcHQgNSoqJ3MgbmF0aXZlIGBGdW5jdGlvbi5iaW5kYCBpZlxuICAvLyBhdmFpbGFibGUuXG4gIF8uYmluZCA9IGZ1bmN0aW9uKGZ1bmMsIGNvbnRleHQpIHtcbiAgICB2YXIgYXJncywgYm91bmQ7XG4gICAgaWYgKG5hdGl2ZUJpbmQgJiYgZnVuYy5iaW5kID09PSBuYXRpdmVCaW5kKSByZXR1cm4gbmF0aXZlQmluZC5hcHBseShmdW5jLCBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgIGlmICghXy5pc0Z1bmN0aW9uKGZ1bmMpKSB0aHJvdyBuZXcgVHlwZUVycm9yO1xuICAgIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gICAgcmV0dXJuIGJvdW5kID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgYm91bmQpKSByZXR1cm4gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICAgIGN0b3IucHJvdG90eXBlID0gZnVuYy5wcm90b3R5cGU7XG4gICAgICB2YXIgc2VsZiA9IG5ldyBjdG9yO1xuICAgICAgY3Rvci5wcm90b3R5cGUgPSBudWxsO1xuICAgICAgdmFyIHJlc3VsdCA9IGZ1bmMuYXBwbHkoc2VsZiwgYXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgICBpZiAoT2JqZWN0KHJlc3VsdCkgPT09IHJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG4gIH07XG5cbiAgLy8gUGFydGlhbGx5IGFwcGx5IGEgZnVuY3Rpb24gYnkgY3JlYXRpbmcgYSB2ZXJzaW9uIHRoYXQgaGFzIGhhZCBzb21lIG9mIGl0c1xuICAvLyBhcmd1bWVudHMgcHJlLWZpbGxlZCwgd2l0aG91dCBjaGFuZ2luZyBpdHMgZHluYW1pYyBgdGhpc2AgY29udGV4dC4gXyBhY3RzXG4gIC8vIGFzIGEgcGxhY2Vob2xkZXIsIGFsbG93aW5nIGFueSBjb21iaW5hdGlvbiBvZiBhcmd1bWVudHMgdG8gYmUgcHJlLWZpbGxlZC5cbiAgXy5wYXJ0aWFsID0gZnVuY3Rpb24oZnVuYykge1xuICAgIHZhciBib3VuZEFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHBvc2l0aW9uID0gMDtcbiAgICAgIHZhciBhcmdzID0gYm91bmRBcmdzLnNsaWNlKCk7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gYXJncy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYXJnc1tpXSA9PT0gXykgYXJnc1tpXSA9IGFyZ3VtZW50c1twb3NpdGlvbisrXTtcbiAgICAgIH1cbiAgICAgIHdoaWxlIChwb3NpdGlvbiA8IGFyZ3VtZW50cy5sZW5ndGgpIGFyZ3MucHVzaChhcmd1bWVudHNbcG9zaXRpb24rK10pO1xuICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfTtcbiAgfTtcblxuICAvLyBCaW5kIGEgbnVtYmVyIG9mIGFuIG9iamVjdCdzIG1ldGhvZHMgdG8gdGhhdCBvYmplY3QuIFJlbWFpbmluZyBhcmd1bWVudHNcbiAgLy8gYXJlIHRoZSBtZXRob2QgbmFtZXMgdG8gYmUgYm91bmQuIFVzZWZ1bCBmb3IgZW5zdXJpbmcgdGhhdCBhbGwgY2FsbGJhY2tzXG4gIC8vIGRlZmluZWQgb24gYW4gb2JqZWN0IGJlbG9uZyB0byBpdC5cbiAgXy5iaW5kQWxsID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIGZ1bmNzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIGlmIChmdW5jcy5sZW5ndGggPT09IDApIHRocm93IG5ldyBFcnJvcignYmluZEFsbCBtdXN0IGJlIHBhc3NlZCBmdW5jdGlvbiBuYW1lcycpO1xuICAgIGVhY2goZnVuY3MsIGZ1bmN0aW9uKGYpIHsgb2JqW2ZdID0gXy5iaW5kKG9ialtmXSwgb2JqKTsgfSk7XG4gICAgcmV0dXJuIG9iajtcbiAgfTtcblxuICAvLyBNZW1vaXplIGFuIGV4cGVuc2l2ZSBmdW5jdGlvbiBieSBzdG9yaW5nIGl0cyByZXN1bHRzLlxuICBfLm1lbW9pemUgPSBmdW5jdGlvbihmdW5jLCBoYXNoZXIpIHtcbiAgICB2YXIgbWVtbyA9IHt9O1xuICAgIGhhc2hlciB8fCAoaGFzaGVyID0gXy5pZGVudGl0eSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGtleSA9IGhhc2hlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIF8uaGFzKG1lbW8sIGtleSkgPyBtZW1vW2tleV0gOiAobWVtb1trZXldID0gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICB9O1xuICB9O1xuXG4gIC8vIERlbGF5cyBhIGZ1bmN0aW9uIGZvciB0aGUgZ2l2ZW4gbnVtYmVyIG9mIG1pbGxpc2Vjb25kcywgYW5kIHRoZW4gY2FsbHNcbiAgLy8gaXQgd2l0aCB0aGUgYXJndW1lbnRzIHN1cHBsaWVkLlxuICBfLmRlbGF5ID0gZnVuY3Rpb24oZnVuYywgd2FpdCkge1xuICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7IHJldHVybiBmdW5jLmFwcGx5KG51bGwsIGFyZ3MpOyB9LCB3YWl0KTtcbiAgfTtcblxuICAvLyBEZWZlcnMgYSBmdW5jdGlvbiwgc2NoZWR1bGluZyBpdCB0byBydW4gYWZ0ZXIgdGhlIGN1cnJlbnQgY2FsbCBzdGFjayBoYXNcbiAgLy8gY2xlYXJlZC5cbiAgXy5kZWZlciA9IGZ1bmN0aW9uKGZ1bmMpIHtcbiAgICByZXR1cm4gXy5kZWxheS5hcHBseShfLCBbZnVuYywgMV0uY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSkpO1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgd2hlbiBpbnZva2VkLCB3aWxsIG9ubHkgYmUgdHJpZ2dlcmVkIGF0IG1vc3Qgb25jZVxuICAvLyBkdXJpbmcgYSBnaXZlbiB3aW5kb3cgb2YgdGltZS4gTm9ybWFsbHksIHRoZSB0aHJvdHRsZWQgZnVuY3Rpb24gd2lsbCBydW5cbiAgLy8gYXMgbXVjaCBhcyBpdCBjYW4sIHdpdGhvdXQgZXZlciBnb2luZyBtb3JlIHRoYW4gb25jZSBwZXIgYHdhaXRgIGR1cmF0aW9uO1xuICAvLyBidXQgaWYgeW91J2QgbGlrZSB0byBkaXNhYmxlIHRoZSBleGVjdXRpb24gb24gdGhlIGxlYWRpbmcgZWRnZSwgcGFzc1xuICAvLyBge2xlYWRpbmc6IGZhbHNlfWAuIFRvIGRpc2FibGUgZXhlY3V0aW9uIG9uIHRoZSB0cmFpbGluZyBlZGdlLCBkaXR0by5cbiAgXy50aHJvdHRsZSA9IGZ1bmN0aW9uKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcbiAgICB2YXIgY29udGV4dCwgYXJncywgcmVzdWx0O1xuICAgIHZhciB0aW1lb3V0ID0gbnVsbDtcbiAgICB2YXIgcHJldmlvdXMgPSAwO1xuICAgIG9wdGlvbnMgfHwgKG9wdGlvbnMgPSB7fSk7XG4gICAgdmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICBwcmV2aW91cyA9IG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UgPyAwIDogXy5ub3coKTtcbiAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBub3cgPSBfLm5vdygpO1xuICAgICAgaWYgKCFwcmV2aW91cyAmJiBvcHRpb25zLmxlYWRpbmcgPT09IGZhbHNlKSBwcmV2aW91cyA9IG5vdztcbiAgICAgIHZhciByZW1haW5pbmcgPSB3YWl0IC0gKG5vdyAtIHByZXZpb3VzKTtcbiAgICAgIGNvbnRleHQgPSB0aGlzO1xuICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIGlmIChyZW1haW5pbmcgPD0gMCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICBwcmV2aW91cyA9IG5vdztcbiAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgY29udGV4dCA9IGFyZ3MgPSBudWxsO1xuICAgICAgfSBlbHNlIGlmICghdGltZW91dCAmJiBvcHRpb25zLnRyYWlsaW5nICE9PSBmYWxzZSkge1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgcmVtYWluaW5nKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG4gIC8vIGJlIHRyaWdnZXJlZC4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIGl0IHN0b3BzIGJlaW5nIGNhbGxlZCBmb3JcbiAgLy8gTiBtaWxsaXNlY29uZHMuIElmIGBpbW1lZGlhdGVgIGlzIHBhc3NlZCwgdHJpZ2dlciB0aGUgZnVuY3Rpb24gb24gdGhlXG4gIC8vIGxlYWRpbmcgZWRnZSwgaW5zdGVhZCBvZiB0aGUgdHJhaWxpbmcuXG4gIF8uZGVib3VuY2UgPSBmdW5jdGlvbihmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbiAgICB2YXIgdGltZW91dCwgYXJncywgY29udGV4dCwgdGltZXN0YW1wLCByZXN1bHQ7XG5cbiAgICB2YXIgbGF0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBsYXN0ID0gXy5ub3coKSAtIHRpbWVzdGFtcDtcbiAgICAgIGlmIChsYXN0IDwgd2FpdCkge1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCAtIGxhc3QpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgIGlmICghaW1tZWRpYXRlKSB7XG4gICAgICAgICAgcmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICBjb250ZXh0ID0gYXJncyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgY29udGV4dCA9IHRoaXM7XG4gICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgdGltZXN0YW1wID0gXy5ub3coKTtcbiAgICAgIHZhciBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xuICAgICAgaWYgKCF0aW1lb3V0KSB7XG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgICAgIH1cbiAgICAgIGlmIChjYWxsTm93KSB7XG4gICAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICAgIGNvbnRleHQgPSBhcmdzID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9O1xuXG4gIC8vIFJldHVybnMgYSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgYXQgbW9zdCBvbmUgdGltZSwgbm8gbWF0dGVyIGhvd1xuICAvLyBvZnRlbiB5b3UgY2FsbCBpdC4gVXNlZnVsIGZvciBsYXp5IGluaXRpYWxpemF0aW9uLlxuICBfLm9uY2UgPSBmdW5jdGlvbihmdW5jKSB7XG4gICAgdmFyIHJhbiA9IGZhbHNlLCBtZW1vO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChyYW4pIHJldHVybiBtZW1vO1xuICAgICAgcmFuID0gdHJ1ZTtcbiAgICAgIG1lbW8gPSBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICBmdW5jID0gbnVsbDtcbiAgICAgIHJldHVybiBtZW1vO1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyB0aGUgZmlyc3QgZnVuY3Rpb24gcGFzc2VkIGFzIGFuIGFyZ3VtZW50IHRvIHRoZSBzZWNvbmQsXG4gIC8vIGFsbG93aW5nIHlvdSB0byBhZGp1c3QgYXJndW1lbnRzLCBydW4gY29kZSBiZWZvcmUgYW5kIGFmdGVyLCBhbmRcbiAgLy8gY29uZGl0aW9uYWxseSBleGVjdXRlIHRoZSBvcmlnaW5hbCBmdW5jdGlvbi5cbiAgXy53cmFwID0gZnVuY3Rpb24oZnVuYywgd3JhcHBlcikge1xuICAgIHJldHVybiBfLnBhcnRpYWwod3JhcHBlciwgZnVuYyk7XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgaXMgdGhlIGNvbXBvc2l0aW9uIG9mIGEgbGlzdCBvZiBmdW5jdGlvbnMsIGVhY2hcbiAgLy8gY29uc3VtaW5nIHRoZSByZXR1cm4gdmFsdWUgb2YgdGhlIGZ1bmN0aW9uIHRoYXQgZm9sbG93cy5cbiAgXy5jb21wb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGZ1bmNzID0gYXJndW1lbnRzO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgZm9yICh2YXIgaSA9IGZ1bmNzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGFyZ3MgPSBbZnVuY3NbaV0uYXBwbHkodGhpcywgYXJncyldO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFyZ3NbMF07XG4gICAgfTtcbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCB3aWxsIG9ubHkgYmUgZXhlY3V0ZWQgYWZ0ZXIgYmVpbmcgY2FsbGVkIE4gdGltZXMuXG4gIF8uYWZ0ZXIgPSBmdW5jdGlvbih0aW1lcywgZnVuYykge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICgtLXRpbWVzIDwgMSkge1xuICAgICAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgLy8gT2JqZWN0IEZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tXG5cbiAgLy8gUmV0cmlldmUgdGhlIG5hbWVzIG9mIGFuIG9iamVjdCdzIHByb3BlcnRpZXMuXG4gIC8vIERlbGVnYXRlcyB0byAqKkVDTUFTY3JpcHQgNSoqJ3MgbmF0aXZlIGBPYmplY3Qua2V5c2BcbiAgXy5rZXlzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKCFfLmlzT2JqZWN0KG9iaikpIHJldHVybiBbXTtcbiAgICBpZiAobmF0aXZlS2V5cykgcmV0dXJuIG5hdGl2ZUtleXMob2JqKTtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIGlmIChfLmhhcyhvYmosIGtleSkpIGtleXMucHVzaChrZXkpO1xuICAgIHJldHVybiBrZXlzO1xuICB9O1xuXG4gIC8vIFJldHJpZXZlIHRoZSB2YWx1ZXMgb2YgYW4gb2JqZWN0J3MgcHJvcGVydGllcy5cbiAgXy52YWx1ZXMgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIga2V5cyA9IF8ua2V5cyhvYmopO1xuICAgIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgICB2YXIgdmFsdWVzID0gbmV3IEFycmF5KGxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgdmFsdWVzW2ldID0gb2JqW2tleXNbaV1dO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWVzO1xuICB9O1xuXG4gIC8vIENvbnZlcnQgYW4gb2JqZWN0IGludG8gYSBsaXN0IG9mIGBba2V5LCB2YWx1ZV1gIHBhaXJzLlxuICBfLnBhaXJzID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIGtleXMgPSBfLmtleXMob2JqKTtcbiAgICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gICAgdmFyIHBhaXJzID0gbmV3IEFycmF5KGxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgcGFpcnNbaV0gPSBba2V5c1tpXSwgb2JqW2tleXNbaV1dXTtcbiAgICB9XG4gICAgcmV0dXJuIHBhaXJzO1xuICB9O1xuXG4gIC8vIEludmVydCB0aGUga2V5cyBhbmQgdmFsdWVzIG9mIGFuIG9iamVjdC4gVGhlIHZhbHVlcyBtdXN0IGJlIHNlcmlhbGl6YWJsZS5cbiAgXy5pbnZlcnQgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgdmFyIGtleXMgPSBfLmtleXMob2JqKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgcmVzdWx0W29ialtrZXlzW2ldXV0gPSBrZXlzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8vIFJldHVybiBhIHNvcnRlZCBsaXN0IG9mIHRoZSBmdW5jdGlvbiBuYW1lcyBhdmFpbGFibGUgb24gdGhlIG9iamVjdC5cbiAgLy8gQWxpYXNlZCBhcyBgbWV0aG9kc2BcbiAgXy5mdW5jdGlvbnMgPSBfLm1ldGhvZHMgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgbmFtZXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoXy5pc0Z1bmN0aW9uKG9ialtrZXldKSkgbmFtZXMucHVzaChrZXkpO1xuICAgIH1cbiAgICByZXR1cm4gbmFtZXMuc29ydCgpO1xuICB9O1xuXG4gIC8vIEV4dGVuZCBhIGdpdmVuIG9iamVjdCB3aXRoIGFsbCB0aGUgcHJvcGVydGllcyBpbiBwYXNzZWQtaW4gb2JqZWN0KHMpLlxuICBfLmV4dGVuZCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGVhY2goc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLCBmdW5jdGlvbihzb3VyY2UpIHtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBzb3VyY2UpIHtcbiAgICAgICAgICBvYmpbcHJvcF0gPSBzb3VyY2VbcHJvcF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gb2JqO1xuICB9O1xuXG4gIC8vIFJldHVybiBhIGNvcHkgb2YgdGhlIG9iamVjdCBvbmx5IGNvbnRhaW5pbmcgdGhlIHdoaXRlbGlzdGVkIHByb3BlcnRpZXMuXG4gIF8ucGljayA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciBjb3B5ID0ge307XG4gICAgdmFyIGtleXMgPSBjb25jYXQuYXBwbHkoQXJyYXlQcm90bywgc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICBlYWNoKGtleXMsIGZ1bmN0aW9uKGtleSkge1xuICAgICAgaWYgKGtleSBpbiBvYmopIGNvcHlba2V5XSA9IG9ialtrZXldO1xuICAgIH0pO1xuICAgIHJldHVybiBjb3B5O1xuICB9O1xuXG4gICAvLyBSZXR1cm4gYSBjb3B5IG9mIHRoZSBvYmplY3Qgd2l0aG91dCB0aGUgYmxhY2tsaXN0ZWQgcHJvcGVydGllcy5cbiAgXy5vbWl0ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIGNvcHkgPSB7fTtcbiAgICB2YXIga2V5cyA9IGNvbmNhdC5hcHBseShBcnJheVByb3RvLCBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmICghXy5jb250YWlucyhrZXlzLCBrZXkpKSBjb3B5W2tleV0gPSBvYmpba2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIGNvcHk7XG4gIH07XG5cbiAgLy8gRmlsbCBpbiBhIGdpdmVuIG9iamVjdCB3aXRoIGRlZmF1bHQgcHJvcGVydGllcy5cbiAgXy5kZWZhdWx0cyA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGVhY2goc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLCBmdW5jdGlvbihzb3VyY2UpIHtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBzb3VyY2UpIHtcbiAgICAgICAgICBpZiAob2JqW3Byb3BdID09PSB2b2lkIDApIG9ialtwcm9wXSA9IHNvdXJjZVtwcm9wXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBvYmo7XG4gIH07XG5cbiAgLy8gQ3JlYXRlIGEgKHNoYWxsb3ctY2xvbmVkKSBkdXBsaWNhdGUgb2YgYW4gb2JqZWN0LlxuICBfLmNsb25lID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKCFfLmlzT2JqZWN0KG9iaikpIHJldHVybiBvYmo7XG4gICAgcmV0dXJuIF8uaXNBcnJheShvYmopID8gb2JqLnNsaWNlKCkgOiBfLmV4dGVuZCh7fSwgb2JqKTtcbiAgfTtcblxuICAvLyBJbnZva2VzIGludGVyY2VwdG9yIHdpdGggdGhlIG9iaiwgYW5kIHRoZW4gcmV0dXJucyBvYmouXG4gIC8vIFRoZSBwcmltYXJ5IHB1cnBvc2Ugb2YgdGhpcyBtZXRob2QgaXMgdG8gXCJ0YXAgaW50b1wiIGEgbWV0aG9kIGNoYWluLCBpblxuICAvLyBvcmRlciB0byBwZXJmb3JtIG9wZXJhdGlvbnMgb24gaW50ZXJtZWRpYXRlIHJlc3VsdHMgd2l0aGluIHRoZSBjaGFpbi5cbiAgXy50YXAgPSBmdW5jdGlvbihvYmosIGludGVyY2VwdG9yKSB7XG4gICAgaW50ZXJjZXB0b3Iob2JqKTtcbiAgICByZXR1cm4gb2JqO1xuICB9O1xuXG4gIC8vIEludGVybmFsIHJlY3Vyc2l2ZSBjb21wYXJpc29uIGZ1bmN0aW9uIGZvciBgaXNFcXVhbGAuXG4gIHZhciBlcSA9IGZ1bmN0aW9uKGEsIGIsIGFTdGFjaywgYlN0YWNrKSB7XG4gICAgLy8gSWRlbnRpY2FsIG9iamVjdHMgYXJlIGVxdWFsLiBgMCA9PT0gLTBgLCBidXQgdGhleSBhcmVuJ3QgaWRlbnRpY2FsLlxuICAgIC8vIFNlZSB0aGUgW0hhcm1vbnkgYGVnYWxgIHByb3Bvc2FsXShodHRwOi8vd2lraS5lY21hc2NyaXB0Lm9yZy9kb2t1LnBocD9pZD1oYXJtb255OmVnYWwpLlxuICAgIGlmIChhID09PSBiKSByZXR1cm4gYSAhPT0gMCB8fCAxIC8gYSA9PSAxIC8gYjtcbiAgICAvLyBBIHN0cmljdCBjb21wYXJpc29uIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIGBudWxsID09IHVuZGVmaW5lZGAuXG4gICAgaWYgKGEgPT0gbnVsbCB8fCBiID09IG51bGwpIHJldHVybiBhID09PSBiO1xuICAgIC8vIFVud3JhcCBhbnkgd3JhcHBlZCBvYmplY3RzLlxuICAgIGlmIChhIGluc3RhbmNlb2YgXykgYSA9IGEuX3dyYXBwZWQ7XG4gICAgaWYgKGIgaW5zdGFuY2VvZiBfKSBiID0gYi5fd3JhcHBlZDtcbiAgICAvLyBDb21wYXJlIGBbW0NsYXNzXV1gIG5hbWVzLlxuICAgIHZhciBjbGFzc05hbWUgPSB0b1N0cmluZy5jYWxsKGEpO1xuICAgIGlmIChjbGFzc05hbWUgIT0gdG9TdHJpbmcuY2FsbChiKSkgcmV0dXJuIGZhbHNlO1xuICAgIHN3aXRjaCAoY2xhc3NOYW1lKSB7XG4gICAgICAvLyBTdHJpbmdzLCBudW1iZXJzLCBkYXRlcywgYW5kIGJvb2xlYW5zIGFyZSBjb21wYXJlZCBieSB2YWx1ZS5cbiAgICAgIGNhc2UgJ1tvYmplY3QgU3RyaW5nXSc6XG4gICAgICAgIC8vIFByaW1pdGl2ZXMgYW5kIHRoZWlyIGNvcnJlc3BvbmRpbmcgb2JqZWN0IHdyYXBwZXJzIGFyZSBlcXVpdmFsZW50OyB0aHVzLCBgXCI1XCJgIGlzXG4gICAgICAgIC8vIGVxdWl2YWxlbnQgdG8gYG5ldyBTdHJpbmcoXCI1XCIpYC5cbiAgICAgICAgcmV0dXJuIGEgPT0gU3RyaW5nKGIpO1xuICAgICAgY2FzZSAnW29iamVjdCBOdW1iZXJdJzpcbiAgICAgICAgLy8gYE5hTmBzIGFyZSBlcXVpdmFsZW50LCBidXQgbm9uLXJlZmxleGl2ZS4gQW4gYGVnYWxgIGNvbXBhcmlzb24gaXMgcGVyZm9ybWVkIGZvclxuICAgICAgICAvLyBvdGhlciBudW1lcmljIHZhbHVlcy5cbiAgICAgICAgcmV0dXJuIGEgIT0gK2EgPyBiICE9ICtiIDogKGEgPT0gMCA/IDEgLyBhID09IDEgLyBiIDogYSA9PSArYik7XG4gICAgICBjYXNlICdbb2JqZWN0IERhdGVdJzpcbiAgICAgIGNhc2UgJ1tvYmplY3QgQm9vbGVhbl0nOlxuICAgICAgICAvLyBDb2VyY2UgZGF0ZXMgYW5kIGJvb2xlYW5zIHRvIG51bWVyaWMgcHJpbWl0aXZlIHZhbHVlcy4gRGF0ZXMgYXJlIGNvbXBhcmVkIGJ5IHRoZWlyXG4gICAgICAgIC8vIG1pbGxpc2Vjb25kIHJlcHJlc2VudGF0aW9ucy4gTm90ZSB0aGF0IGludmFsaWQgZGF0ZXMgd2l0aCBtaWxsaXNlY29uZCByZXByZXNlbnRhdGlvbnNcbiAgICAgICAgLy8gb2YgYE5hTmAgYXJlIG5vdCBlcXVpdmFsZW50LlxuICAgICAgICByZXR1cm4gK2EgPT0gK2I7XG4gICAgICAvLyBSZWdFeHBzIGFyZSBjb21wYXJlZCBieSB0aGVpciBzb3VyY2UgcGF0dGVybnMgYW5kIGZsYWdzLlxuICAgICAgY2FzZSAnW29iamVjdCBSZWdFeHBdJzpcbiAgICAgICAgcmV0dXJuIGEuc291cmNlID09IGIuc291cmNlICYmXG4gICAgICAgICAgICAgICBhLmdsb2JhbCA9PSBiLmdsb2JhbCAmJlxuICAgICAgICAgICAgICAgYS5tdWx0aWxpbmUgPT0gYi5tdWx0aWxpbmUgJiZcbiAgICAgICAgICAgICAgIGEuaWdub3JlQ2FzZSA9PSBiLmlnbm9yZUNhc2U7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgYSAhPSAnb2JqZWN0JyB8fCB0eXBlb2YgYiAhPSAnb2JqZWN0JykgcmV0dXJuIGZhbHNlO1xuICAgIC8vIEFzc3VtZSBlcXVhbGl0eSBmb3IgY3ljbGljIHN0cnVjdHVyZXMuIFRoZSBhbGdvcml0aG0gZm9yIGRldGVjdGluZyBjeWNsaWNcbiAgICAvLyBzdHJ1Y3R1cmVzIGlzIGFkYXB0ZWQgZnJvbSBFUyA1LjEgc2VjdGlvbiAxNS4xMi4zLCBhYnN0cmFjdCBvcGVyYXRpb24gYEpPYC5cbiAgICB2YXIgbGVuZ3RoID0gYVN0YWNrLmxlbmd0aDtcbiAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgIC8vIExpbmVhciBzZWFyY2guIFBlcmZvcm1hbmNlIGlzIGludmVyc2VseSBwcm9wb3J0aW9uYWwgdG8gdGhlIG51bWJlciBvZlxuICAgICAgLy8gdW5pcXVlIG5lc3RlZCBzdHJ1Y3R1cmVzLlxuICAgICAgaWYgKGFTdGFja1tsZW5ndGhdID09IGEpIHJldHVybiBiU3RhY2tbbGVuZ3RoXSA9PSBiO1xuICAgIH1cbiAgICAvLyBPYmplY3RzIHdpdGggZGlmZmVyZW50IGNvbnN0cnVjdG9ycyBhcmUgbm90IGVxdWl2YWxlbnQsIGJ1dCBgT2JqZWN0YHNcbiAgICAvLyBmcm9tIGRpZmZlcmVudCBmcmFtZXMgYXJlLlxuICAgIHZhciBhQ3RvciA9IGEuY29uc3RydWN0b3IsIGJDdG9yID0gYi5jb25zdHJ1Y3RvcjtcbiAgICBpZiAoYUN0b3IgIT09IGJDdG9yICYmICEoXy5pc0Z1bmN0aW9uKGFDdG9yKSAmJiAoYUN0b3IgaW5zdGFuY2VvZiBhQ3RvcikgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5pc0Z1bmN0aW9uKGJDdG9yKSAmJiAoYkN0b3IgaW5zdGFuY2VvZiBiQ3RvcikpXG4gICAgICAgICAgICAgICAgICAgICAgICAmJiAoJ2NvbnN0cnVjdG9yJyBpbiBhICYmICdjb25zdHJ1Y3RvcicgaW4gYikpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gQWRkIHRoZSBmaXJzdCBvYmplY3QgdG8gdGhlIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzLlxuICAgIGFTdGFjay5wdXNoKGEpO1xuICAgIGJTdGFjay5wdXNoKGIpO1xuICAgIHZhciBzaXplID0gMCwgcmVzdWx0ID0gdHJ1ZTtcbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgYW5kIGFycmF5cy5cbiAgICBpZiAoY2xhc3NOYW1lID09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgIC8vIENvbXBhcmUgYXJyYXkgbGVuZ3RocyB0byBkZXRlcm1pbmUgaWYgYSBkZWVwIGNvbXBhcmlzb24gaXMgbmVjZXNzYXJ5LlxuICAgICAgc2l6ZSA9IGEubGVuZ3RoO1xuICAgICAgcmVzdWx0ID0gc2l6ZSA9PSBiLmxlbmd0aDtcbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgLy8gRGVlcCBjb21wYXJlIHRoZSBjb250ZW50cywgaWdub3Jpbmcgbm9uLW51bWVyaWMgcHJvcGVydGllcy5cbiAgICAgICAgd2hpbGUgKHNpemUtLSkge1xuICAgICAgICAgIGlmICghKHJlc3VsdCA9IGVxKGFbc2l6ZV0sIGJbc2l6ZV0sIGFTdGFjaywgYlN0YWNrKSkpIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIERlZXAgY29tcGFyZSBvYmplY3RzLlxuICAgICAgZm9yICh2YXIga2V5IGluIGEpIHtcbiAgICAgICAgaWYgKF8uaGFzKGEsIGtleSkpIHtcbiAgICAgICAgICAvLyBDb3VudCB0aGUgZXhwZWN0ZWQgbnVtYmVyIG9mIHByb3BlcnRpZXMuXG4gICAgICAgICAgc2l6ZSsrO1xuICAgICAgICAgIC8vIERlZXAgY29tcGFyZSBlYWNoIG1lbWJlci5cbiAgICAgICAgICBpZiAoIShyZXN1bHQgPSBfLmhhcyhiLCBrZXkpICYmIGVxKGFba2V5XSwgYltrZXldLCBhU3RhY2ssIGJTdGFjaykpKSBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gRW5zdXJlIHRoYXQgYm90aCBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUgbnVtYmVyIG9mIHByb3BlcnRpZXMuXG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIGZvciAoa2V5IGluIGIpIHtcbiAgICAgICAgICBpZiAoXy5oYXMoYiwga2V5KSAmJiAhKHNpemUtLSkpIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCA9ICFzaXplO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBSZW1vdmUgdGhlIGZpcnN0IG9iamVjdCBmcm9tIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAgICBhU3RhY2sucG9wKCk7XG4gICAgYlN0YWNrLnBvcCgpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLy8gUGVyZm9ybSBhIGRlZXAgY29tcGFyaXNvbiB0byBjaGVjayBpZiB0d28gb2JqZWN0cyBhcmUgZXF1YWwuXG4gIF8uaXNFcXVhbCA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gZXEoYSwgYiwgW10sIFtdKTtcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIGFycmF5LCBzdHJpbmcsIG9yIG9iamVjdCBlbXB0eT9cbiAgLy8gQW4gXCJlbXB0eVwiIG9iamVjdCBoYXMgbm8gZW51bWVyYWJsZSBvd24tcHJvcGVydGllcy5cbiAgXy5pc0VtcHR5ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKG9iaiA9PSBudWxsKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoXy5pc0FycmF5KG9iaikgfHwgXy5pc1N0cmluZyhvYmopKSByZXR1cm4gb2JqLmxlbmd0aCA9PT0gMDtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSBpZiAoXy5oYXMob2JqLCBrZXkpKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLy8gSXMgYSBnaXZlbiB2YWx1ZSBhIERPTSBlbGVtZW50P1xuICBfLmlzRWxlbWVudCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiAhIShvYmogJiYgb2JqLm5vZGVUeXBlID09PSAxKTtcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIHZhbHVlIGFuIGFycmF5P1xuICAvLyBEZWxlZ2F0ZXMgdG8gRUNNQTUncyBuYXRpdmUgQXJyYXkuaXNBcnJheVxuICBfLmlzQXJyYXkgPSBuYXRpdmVJc0FycmF5IHx8IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT0gJ1tvYmplY3QgQXJyYXldJztcbiAgfTtcblxuICAvLyBJcyBhIGdpdmVuIHZhcmlhYmxlIGFuIG9iamVjdD9cbiAgXy5pc09iamVjdCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiBvYmogPT09IE9iamVjdChvYmopO1xuICB9O1xuXG4gIC8vIEFkZCBzb21lIGlzVHlwZSBtZXRob2RzOiBpc0FyZ3VtZW50cywgaXNGdW5jdGlvbiwgaXNTdHJpbmcsIGlzTnVtYmVyLCBpc0RhdGUsIGlzUmVnRXhwLlxuICBlYWNoKFsnQXJndW1lbnRzJywgJ0Z1bmN0aW9uJywgJ1N0cmluZycsICdOdW1iZXInLCAnRGF0ZScsICdSZWdFeHAnXSwgZnVuY3Rpb24obmFtZSkge1xuICAgIF9bJ2lzJyArIG5hbWVdID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09ICdbb2JqZWN0ICcgKyBuYW1lICsgJ10nO1xuICAgIH07XG4gIH0pO1xuXG4gIC8vIERlZmluZSBhIGZhbGxiYWNrIHZlcnNpb24gb2YgdGhlIG1ldGhvZCBpbiBicm93c2VycyAoYWhlbSwgSUUpLCB3aGVyZVxuICAvLyB0aGVyZSBpc24ndCBhbnkgaW5zcGVjdGFibGUgXCJBcmd1bWVudHNcIiB0eXBlLlxuICBpZiAoIV8uaXNBcmd1bWVudHMoYXJndW1lbnRzKSkge1xuICAgIF8uaXNBcmd1bWVudHMgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiAhIShvYmogJiYgXy5oYXMob2JqLCAnY2FsbGVlJykpO1xuICAgIH07XG4gIH1cblxuICAvLyBPcHRpbWl6ZSBgaXNGdW5jdGlvbmAgaWYgYXBwcm9wcmlhdGUuXG4gIGlmICh0eXBlb2YgKC8uLykgIT09ICdmdW5jdGlvbicpIHtcbiAgICBfLmlzRnVuY3Rpb24gPSBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nO1xuICAgIH07XG4gIH1cblxuICAvLyBJcyBhIGdpdmVuIG9iamVjdCBhIGZpbml0ZSBudW1iZXI/XG4gIF8uaXNGaW5pdGUgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gaXNGaW5pdGUob2JqKSAmJiAhaXNOYU4ocGFyc2VGbG9hdChvYmopKTtcbiAgfTtcblxuICAvLyBJcyB0aGUgZ2l2ZW4gdmFsdWUgYE5hTmA/IChOYU4gaXMgdGhlIG9ubHkgbnVtYmVyIHdoaWNoIGRvZXMgbm90IGVxdWFsIGl0c2VsZikuXG4gIF8uaXNOYU4gPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gXy5pc051bWJlcihvYmopICYmIG9iaiAhPSArb2JqO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gdmFsdWUgYSBib29sZWFuP1xuICBfLmlzQm9vbGVhbiA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiBvYmogPT09IHRydWUgfHwgb2JqID09PSBmYWxzZSB8fCB0b1N0cmluZy5jYWxsKG9iaikgPT0gJ1tvYmplY3QgQm9vbGVhbl0nO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gdmFsdWUgZXF1YWwgdG8gbnVsbD9cbiAgXy5pc051bGwgPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gb2JqID09PSBudWxsO1xuICB9O1xuXG4gIC8vIElzIGEgZ2l2ZW4gdmFyaWFibGUgdW5kZWZpbmVkP1xuICBfLmlzVW5kZWZpbmVkID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIG9iaiA9PT0gdm9pZCAwO1xuICB9O1xuXG4gIC8vIFNob3J0Y3V0IGZ1bmN0aW9uIGZvciBjaGVja2luZyBpZiBhbiBvYmplY3QgaGFzIGEgZ2l2ZW4gcHJvcGVydHkgZGlyZWN0bHlcbiAgLy8gb24gaXRzZWxmIChpbiBvdGhlciB3b3Jkcywgbm90IG9uIGEgcHJvdG90eXBlKS5cbiAgXy5oYXMgPSBmdW5jdGlvbihvYmosIGtleSkge1xuICAgIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KTtcbiAgfTtcblxuICAvLyBVdGlsaXR5IEZ1bmN0aW9uc1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLVxuXG4gIC8vIFJ1biBVbmRlcnNjb3JlLmpzIGluICpub0NvbmZsaWN0KiBtb2RlLCByZXR1cm5pbmcgdGhlIGBfYCB2YXJpYWJsZSB0byBpdHNcbiAgLy8gcHJldmlvdXMgb3duZXIuIFJldHVybnMgYSByZWZlcmVuY2UgdG8gdGhlIFVuZGVyc2NvcmUgb2JqZWN0LlxuICBfLm5vQ29uZmxpY3QgPSBmdW5jdGlvbigpIHtcbiAgICByb290Ll8gPSBwcmV2aW91c1VuZGVyc2NvcmU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLy8gS2VlcCB0aGUgaWRlbnRpdHkgZnVuY3Rpb24gYXJvdW5kIGZvciBkZWZhdWx0IGl0ZXJhdG9ycy5cbiAgXy5pZGVudGl0eSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xuXG4gIF8uY29uc3RhbnQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgfTtcblxuICBfLnByb3BlcnR5ID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9ialtrZXldO1xuICAgIH07XG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIHByZWRpY2F0ZSBmb3IgY2hlY2tpbmcgd2hldGhlciBhbiBvYmplY3QgaGFzIGEgZ2l2ZW4gc2V0IG9mIGBrZXk6dmFsdWVgIHBhaXJzLlxuICBfLm1hdGNoZXMgPSBmdW5jdGlvbihhdHRycykge1xuICAgIHJldHVybiBmdW5jdGlvbihvYmopIHtcbiAgICAgIGlmIChvYmogPT09IGF0dHJzKSByZXR1cm4gdHJ1ZTsgLy9hdm9pZCBjb21wYXJpbmcgYW4gb2JqZWN0IHRvIGl0c2VsZi5cbiAgICAgIGZvciAodmFyIGtleSBpbiBhdHRycykge1xuICAgICAgICBpZiAoYXR0cnNba2V5XSAhPT0gb2JqW2tleV0pXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJ1biBhIGZ1bmN0aW9uICoqbioqIHRpbWVzLlxuICBfLnRpbWVzID0gZnVuY3Rpb24obiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgICB2YXIgYWNjdW0gPSBBcnJheShNYXRoLm1heCgwLCBuKSk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyBpKyspIGFjY3VtW2ldID0gaXRlcmF0b3IuY2FsbChjb250ZXh0LCBpKTtcbiAgICByZXR1cm4gYWNjdW07XG4gIH07XG5cbiAgLy8gUmV0dXJuIGEgcmFuZG9tIGludGVnZXIgYmV0d2VlbiBtaW4gYW5kIG1heCAoaW5jbHVzaXZlKS5cbiAgXy5yYW5kb20gPSBmdW5jdGlvbihtaW4sIG1heCkge1xuICAgIGlmIChtYXggPT0gbnVsbCkge1xuICAgICAgbWF4ID0gbWluO1xuICAgICAgbWluID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIG1pbiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSk7XG4gIH07XG5cbiAgLy8gQSAocG9zc2libHkgZmFzdGVyKSB3YXkgdG8gZ2V0IHRoZSBjdXJyZW50IHRpbWVzdGFtcCBhcyBhbiBpbnRlZ2VyLlxuICBfLm5vdyA9IERhdGUubm93IHx8IGZ1bmN0aW9uKCkgeyByZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7IH07XG5cbiAgLy8gTGlzdCBvZiBIVE1MIGVudGl0aWVzIGZvciBlc2NhcGluZy5cbiAgdmFyIGVudGl0eU1hcCA9IHtcbiAgICBlc2NhcGU6IHtcbiAgICAgICcmJzogJyZhbXA7JyxcbiAgICAgICc8JzogJyZsdDsnLFxuICAgICAgJz4nOiAnJmd0OycsXG4gICAgICAnXCInOiAnJnF1b3Q7JyxcbiAgICAgIFwiJ1wiOiAnJiN4Mjc7J1xuICAgIH1cbiAgfTtcbiAgZW50aXR5TWFwLnVuZXNjYXBlID0gXy5pbnZlcnQoZW50aXR5TWFwLmVzY2FwZSk7XG5cbiAgLy8gUmVnZXhlcyBjb250YWluaW5nIHRoZSBrZXlzIGFuZCB2YWx1ZXMgbGlzdGVkIGltbWVkaWF0ZWx5IGFib3ZlLlxuICB2YXIgZW50aXR5UmVnZXhlcyA9IHtcbiAgICBlc2NhcGU6ICAgbmV3IFJlZ0V4cCgnWycgKyBfLmtleXMoZW50aXR5TWFwLmVzY2FwZSkuam9pbignJykgKyAnXScsICdnJyksXG4gICAgdW5lc2NhcGU6IG5ldyBSZWdFeHAoJygnICsgXy5rZXlzKGVudGl0eU1hcC51bmVzY2FwZSkuam9pbignfCcpICsgJyknLCAnZycpXG4gIH07XG5cbiAgLy8gRnVuY3Rpb25zIGZvciBlc2NhcGluZyBhbmQgdW5lc2NhcGluZyBzdHJpbmdzIHRvL2Zyb20gSFRNTCBpbnRlcnBvbGF0aW9uLlxuICBfLmVhY2goWydlc2NhcGUnLCAndW5lc2NhcGUnXSwgZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgX1ttZXRob2RdID0gZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgICBpZiAoc3RyaW5nID09IG51bGwpIHJldHVybiAnJztcbiAgICAgIHJldHVybiAoJycgKyBzdHJpbmcpLnJlcGxhY2UoZW50aXR5UmVnZXhlc1ttZXRob2RdLCBmdW5jdGlvbihtYXRjaCkge1xuICAgICAgICByZXR1cm4gZW50aXR5TWFwW21ldGhvZF1bbWF0Y2hdO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gSWYgdGhlIHZhbHVlIG9mIHRoZSBuYW1lZCBgcHJvcGVydHlgIGlzIGEgZnVuY3Rpb24gdGhlbiBpbnZva2UgaXQgd2l0aCB0aGVcbiAgLy8gYG9iamVjdGAgYXMgY29udGV4dDsgb3RoZXJ3aXNlLCByZXR1cm4gaXQuXG4gIF8ucmVzdWx0ID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkge1xuICAgIGlmIChvYmplY3QgPT0gbnVsbCkgcmV0dXJuIHZvaWQgMDtcbiAgICB2YXIgdmFsdWUgPSBvYmplY3RbcHJvcGVydHldO1xuICAgIHJldHVybiBfLmlzRnVuY3Rpb24odmFsdWUpID8gdmFsdWUuY2FsbChvYmplY3QpIDogdmFsdWU7XG4gIH07XG5cbiAgLy8gQWRkIHlvdXIgb3duIGN1c3RvbSBmdW5jdGlvbnMgdG8gdGhlIFVuZGVyc2NvcmUgb2JqZWN0LlxuICBfLm1peGluID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgZWFjaChfLmZ1bmN0aW9ucyhvYmopLCBmdW5jdGlvbihuYW1lKSB7XG4gICAgICB2YXIgZnVuYyA9IF9bbmFtZV0gPSBvYmpbbmFtZV07XG4gICAgICBfLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYXJncyA9IFt0aGlzLl93cmFwcGVkXTtcbiAgICAgICAgcHVzaC5hcHBseShhcmdzLCBhcmd1bWVudHMpO1xuICAgICAgICByZXR1cm4gcmVzdWx0LmNhbGwodGhpcywgZnVuYy5hcHBseShfLCBhcmdzKSk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIEdlbmVyYXRlIGEgdW5pcXVlIGludGVnZXIgaWQgKHVuaXF1ZSB3aXRoaW4gdGhlIGVudGlyZSBjbGllbnQgc2Vzc2lvbikuXG4gIC8vIFVzZWZ1bCBmb3IgdGVtcG9yYXJ5IERPTSBpZHMuXG4gIHZhciBpZENvdW50ZXIgPSAwO1xuICBfLnVuaXF1ZUlkID0gZnVuY3Rpb24ocHJlZml4KSB7XG4gICAgdmFyIGlkID0gKytpZENvdW50ZXIgKyAnJztcbiAgICByZXR1cm4gcHJlZml4ID8gcHJlZml4ICsgaWQgOiBpZDtcbiAgfTtcblxuICAvLyBCeSBkZWZhdWx0LCBVbmRlcnNjb3JlIHVzZXMgRVJCLXN0eWxlIHRlbXBsYXRlIGRlbGltaXRlcnMsIGNoYW5nZSB0aGVcbiAgLy8gZm9sbG93aW5nIHRlbXBsYXRlIHNldHRpbmdzIHRvIHVzZSBhbHRlcm5hdGl2ZSBkZWxpbWl0ZXJzLlxuICBfLnRlbXBsYXRlU2V0dGluZ3MgPSB7XG4gICAgZXZhbHVhdGUgICAgOiAvPCUoW1xcc1xcU10rPyklPi9nLFxuICAgIGludGVycG9sYXRlIDogLzwlPShbXFxzXFxTXSs/KSU+L2csXG4gICAgZXNjYXBlICAgICAgOiAvPCUtKFtcXHNcXFNdKz8pJT4vZ1xuICB9O1xuXG4gIC8vIFdoZW4gY3VzdG9taXppbmcgYHRlbXBsYXRlU2V0dGluZ3NgLCBpZiB5b3UgZG9uJ3Qgd2FudCB0byBkZWZpbmUgYW5cbiAgLy8gaW50ZXJwb2xhdGlvbiwgZXZhbHVhdGlvbiBvciBlc2NhcGluZyByZWdleCwgd2UgbmVlZCBvbmUgdGhhdCBpc1xuICAvLyBndWFyYW50ZWVkIG5vdCB0byBtYXRjaC5cbiAgdmFyIG5vTWF0Y2ggPSAvKC4pXi87XG5cbiAgLy8gQ2VydGFpbiBjaGFyYWN0ZXJzIG5lZWQgdG8gYmUgZXNjYXBlZCBzbyB0aGF0IHRoZXkgY2FuIGJlIHB1dCBpbnRvIGFcbiAgLy8gc3RyaW5nIGxpdGVyYWwuXG4gIHZhciBlc2NhcGVzID0ge1xuICAgIFwiJ1wiOiAgICAgIFwiJ1wiLFxuICAgICdcXFxcJzogICAgICdcXFxcJyxcbiAgICAnXFxyJzogICAgICdyJyxcbiAgICAnXFxuJzogICAgICduJyxcbiAgICAnXFx0JzogICAgICd0JyxcbiAgICAnXFx1MjAyOCc6ICd1MjAyOCcsXG4gICAgJ1xcdTIwMjknOiAndTIwMjknXG4gIH07XG5cbiAgdmFyIGVzY2FwZXIgPSAvXFxcXHwnfFxccnxcXG58XFx0fFxcdTIwMjh8XFx1MjAyOS9nO1xuXG4gIC8vIEphdmFTY3JpcHQgbWljcm8tdGVtcGxhdGluZywgc2ltaWxhciB0byBKb2huIFJlc2lnJ3MgaW1wbGVtZW50YXRpb24uXG4gIC8vIFVuZGVyc2NvcmUgdGVtcGxhdGluZyBoYW5kbGVzIGFyYml0cmFyeSBkZWxpbWl0ZXJzLCBwcmVzZXJ2ZXMgd2hpdGVzcGFjZSxcbiAgLy8gYW5kIGNvcnJlY3RseSBlc2NhcGVzIHF1b3RlcyB3aXRoaW4gaW50ZXJwb2xhdGVkIGNvZGUuXG4gIF8udGVtcGxhdGUgPSBmdW5jdGlvbih0ZXh0LCBkYXRhLCBzZXR0aW5ncykge1xuICAgIHZhciByZW5kZXI7XG4gICAgc2V0dGluZ3MgPSBfLmRlZmF1bHRzKHt9LCBzZXR0aW5ncywgXy50ZW1wbGF0ZVNldHRpbmdzKTtcblxuICAgIC8vIENvbWJpbmUgZGVsaW1pdGVycyBpbnRvIG9uZSByZWd1bGFyIGV4cHJlc3Npb24gdmlhIGFsdGVybmF0aW9uLlxuICAgIHZhciBtYXRjaGVyID0gbmV3IFJlZ0V4cChbXG4gICAgICAoc2V0dGluZ3MuZXNjYXBlIHx8IG5vTWF0Y2gpLnNvdXJjZSxcbiAgICAgIChzZXR0aW5ncy5pbnRlcnBvbGF0ZSB8fCBub01hdGNoKS5zb3VyY2UsXG4gICAgICAoc2V0dGluZ3MuZXZhbHVhdGUgfHwgbm9NYXRjaCkuc291cmNlXG4gICAgXS5qb2luKCd8JykgKyAnfCQnLCAnZycpO1xuXG4gICAgLy8gQ29tcGlsZSB0aGUgdGVtcGxhdGUgc291cmNlLCBlc2NhcGluZyBzdHJpbmcgbGl0ZXJhbHMgYXBwcm9wcmlhdGVseS5cbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBzb3VyY2UgPSBcIl9fcCs9J1wiO1xuICAgIHRleHQucmVwbGFjZShtYXRjaGVyLCBmdW5jdGlvbihtYXRjaCwgZXNjYXBlLCBpbnRlcnBvbGF0ZSwgZXZhbHVhdGUsIG9mZnNldCkge1xuICAgICAgc291cmNlICs9IHRleHQuc2xpY2UoaW5kZXgsIG9mZnNldClcbiAgICAgICAgLnJlcGxhY2UoZXNjYXBlciwgZnVuY3Rpb24obWF0Y2gpIHsgcmV0dXJuICdcXFxcJyArIGVzY2FwZXNbbWF0Y2hdOyB9KTtcblxuICAgICAgaWYgKGVzY2FwZSkge1xuICAgICAgICBzb3VyY2UgKz0gXCInK1xcbigoX190PShcIiArIGVzY2FwZSArIFwiKSk9PW51bGw/Jyc6Xy5lc2NhcGUoX190KSkrXFxuJ1wiO1xuICAgICAgfVxuICAgICAgaWYgKGludGVycG9sYXRlKSB7XG4gICAgICAgIHNvdXJjZSArPSBcIicrXFxuKChfX3Q9KFwiICsgaW50ZXJwb2xhdGUgKyBcIikpPT1udWxsPycnOl9fdCkrXFxuJ1wiO1xuICAgICAgfVxuICAgICAgaWYgKGV2YWx1YXRlKSB7XG4gICAgICAgIHNvdXJjZSArPSBcIic7XFxuXCIgKyBldmFsdWF0ZSArIFwiXFxuX19wKz0nXCI7XG4gICAgICB9XG4gICAgICBpbmRleCA9IG9mZnNldCArIG1hdGNoLmxlbmd0aDtcbiAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9KTtcbiAgICBzb3VyY2UgKz0gXCInO1xcblwiO1xuXG4gICAgLy8gSWYgYSB2YXJpYWJsZSBpcyBub3Qgc3BlY2lmaWVkLCBwbGFjZSBkYXRhIHZhbHVlcyBpbiBsb2NhbCBzY29wZS5cbiAgICBpZiAoIXNldHRpbmdzLnZhcmlhYmxlKSBzb3VyY2UgPSAnd2l0aChvYmp8fHt9KXtcXG4nICsgc291cmNlICsgJ31cXG4nO1xuXG4gICAgc291cmNlID0gXCJ2YXIgX190LF9fcD0nJyxfX2o9QXJyYXkucHJvdG90eXBlLmpvaW4sXCIgK1xuICAgICAgXCJwcmludD1mdW5jdGlvbigpe19fcCs9X19qLmNhbGwoYXJndW1lbnRzLCcnKTt9O1xcblwiICtcbiAgICAgIHNvdXJjZSArIFwicmV0dXJuIF9fcDtcXG5cIjtcblxuICAgIHRyeSB7XG4gICAgICByZW5kZXIgPSBuZXcgRnVuY3Rpb24oc2V0dGluZ3MudmFyaWFibGUgfHwgJ29iaicsICdfJywgc291cmNlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBlLnNvdXJjZSA9IHNvdXJjZTtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuXG4gICAgaWYgKGRhdGEpIHJldHVybiByZW5kZXIoZGF0YSwgXyk7XG4gICAgdmFyIHRlbXBsYXRlID0gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgcmV0dXJuIHJlbmRlci5jYWxsKHRoaXMsIGRhdGEsIF8pO1xuICAgIH07XG5cbiAgICAvLyBQcm92aWRlIHRoZSBjb21waWxlZCBmdW5jdGlvbiBzb3VyY2UgYXMgYSBjb252ZW5pZW5jZSBmb3IgcHJlY29tcGlsYXRpb24uXG4gICAgdGVtcGxhdGUuc291cmNlID0gJ2Z1bmN0aW9uKCcgKyAoc2V0dGluZ3MudmFyaWFibGUgfHwgJ29iaicpICsgJyl7XFxuJyArIHNvdXJjZSArICd9JztcblxuICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgfTtcblxuICAvLyBBZGQgYSBcImNoYWluXCIgZnVuY3Rpb24sIHdoaWNoIHdpbGwgZGVsZWdhdGUgdG8gdGhlIHdyYXBwZXIuXG4gIF8uY2hhaW4gPSBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gXyhvYmopLmNoYWluKCk7XG4gIH07XG5cbiAgLy8gT09QXG4gIC8vIC0tLS0tLS0tLS0tLS0tLVxuICAvLyBJZiBVbmRlcnNjb3JlIGlzIGNhbGxlZCBhcyBhIGZ1bmN0aW9uLCBpdCByZXR1cm5zIGEgd3JhcHBlZCBvYmplY3QgdGhhdFxuICAvLyBjYW4gYmUgdXNlZCBPTy1zdHlsZS4gVGhpcyB3cmFwcGVyIGhvbGRzIGFsdGVyZWQgdmVyc2lvbnMgb2YgYWxsIHRoZVxuICAvLyB1bmRlcnNjb3JlIGZ1bmN0aW9ucy4gV3JhcHBlZCBvYmplY3RzIG1heSBiZSBjaGFpbmVkLlxuXG4gIC8vIEhlbHBlciBmdW5jdGlvbiB0byBjb250aW51ZSBjaGFpbmluZyBpbnRlcm1lZGlhdGUgcmVzdWx0cy5cbiAgdmFyIHJlc3VsdCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiB0aGlzLl9jaGFpbiA/IF8ob2JqKS5jaGFpbigpIDogb2JqO1xuICB9O1xuXG4gIC8vIEFkZCBhbGwgb2YgdGhlIFVuZGVyc2NvcmUgZnVuY3Rpb25zIHRvIHRoZSB3cmFwcGVyIG9iamVjdC5cbiAgXy5taXhpbihfKTtcblxuICAvLyBBZGQgYWxsIG11dGF0b3IgQXJyYXkgZnVuY3Rpb25zIHRvIHRoZSB3cmFwcGVyLlxuICBlYWNoKFsncG9wJywgJ3B1c2gnLCAncmV2ZXJzZScsICdzaGlmdCcsICdzb3J0JywgJ3NwbGljZScsICd1bnNoaWZ0J10sIGZ1bmN0aW9uKG5hbWUpIHtcbiAgICB2YXIgbWV0aG9kID0gQXJyYXlQcm90b1tuYW1lXTtcbiAgICBfLnByb3RvdHlwZVtuYW1lXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG9iaiA9IHRoaXMuX3dyYXBwZWQ7XG4gICAgICBtZXRob2QuYXBwbHkob2JqLCBhcmd1bWVudHMpO1xuICAgICAgaWYgKChuYW1lID09ICdzaGlmdCcgfHwgbmFtZSA9PSAnc3BsaWNlJykgJiYgb2JqLmxlbmd0aCA9PT0gMCkgZGVsZXRlIG9ialswXTtcbiAgICAgIHJldHVybiByZXN1bHQuY2FsbCh0aGlzLCBvYmopO1xuICAgIH07XG4gIH0pO1xuXG4gIC8vIEFkZCBhbGwgYWNjZXNzb3IgQXJyYXkgZnVuY3Rpb25zIHRvIHRoZSB3cmFwcGVyLlxuICBlYWNoKFsnY29uY2F0JywgJ2pvaW4nLCAnc2xpY2UnXSwgZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciBtZXRob2QgPSBBcnJheVByb3RvW25hbWVdO1xuICAgIF8ucHJvdG90eXBlW25hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gcmVzdWx0LmNhbGwodGhpcywgbWV0aG9kLmFwcGx5KHRoaXMuX3dyYXBwZWQsIGFyZ3VtZW50cykpO1xuICAgIH07XG4gIH0pO1xuXG4gIF8uZXh0ZW5kKF8ucHJvdG90eXBlLCB7XG5cbiAgICAvLyBTdGFydCBjaGFpbmluZyBhIHdyYXBwZWQgVW5kZXJzY29yZSBvYmplY3QuXG4gICAgY2hhaW46IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5fY2hhaW4gPSB0cnVlO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcblxuICAgIC8vIEV4dHJhY3RzIHRoZSByZXN1bHQgZnJvbSBhIHdyYXBwZWQgYW5kIGNoYWluZWQgb2JqZWN0LlxuICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLl93cmFwcGVkO1xuICAgIH1cblxuICB9KTtcblxuICAvLyBBTUQgcmVnaXN0cmF0aW9uIGhhcHBlbnMgYXQgdGhlIGVuZCBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIEFNRCBsb2FkZXJzXG4gIC8vIHRoYXQgbWF5IG5vdCBlbmZvcmNlIG5leHQtdHVybiBzZW1hbnRpY3Mgb24gbW9kdWxlcy4gRXZlbiB0aG91Z2ggZ2VuZXJhbFxuICAvLyBwcmFjdGljZSBmb3IgQU1EIHJlZ2lzdHJhdGlvbiBpcyB0byBiZSBhbm9ueW1vdXMsIHVuZGVyc2NvcmUgcmVnaXN0ZXJzXG4gIC8vIGFzIGEgbmFtZWQgbW9kdWxlIGJlY2F1c2UsIGxpa2UgalF1ZXJ5LCBpdCBpcyBhIGJhc2UgbGlicmFyeSB0aGF0IGlzXG4gIC8vIHBvcHVsYXIgZW5vdWdoIHRvIGJlIGJ1bmRsZWQgaW4gYSB0aGlyZCBwYXJ0eSBsaWIsIGJ1dCBub3QgYmUgcGFydCBvZlxuICAvLyBhbiBBTUQgbG9hZCByZXF1ZXN0LiBUaG9zZSBjYXNlcyBjb3VsZCBnZW5lcmF0ZSBhbiBlcnJvciB3aGVuIGFuXG4gIC8vIGFub255bW91cyBkZWZpbmUoKSBpcyBjYWxsZWQgb3V0c2lkZSBvZiBhIGxvYWRlciByZXF1ZXN0LlxuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKCd1bmRlcnNjb3JlJywgW10sIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIF87XG4gICAgfSk7XG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiL2hvbWUvZG9zdG9kYWJzaS9jb2RlL2Jha2svZXhwZXJpbWVudC10ZW1wbGF0ZS9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9pbnNlcnQtbW9kdWxlLWdsb2JhbHMvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uLy4uL25vZGVfbW9kdWxlcy91bmRlcnNjb3JlL3VuZGVyc2NvcmUuanNcIixcIi8uLi8uLi9ub2RlX21vZHVsZXMvdW5kZXJzY29yZVwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbnZhciBleHBlY3QgPSByZXF1aXJlKCdjaGFpJykuZXhwZWN0O1xuXG5kZXNjcmliZSgnQ29sbGVjdGlvbnMnLCBmdW5jdGlvbigpIHtcbiAgLy8gQWRkIFRlc3RzIGZvciBDb2xsZWN0aW9uc1xufSk7XG5cbnZhciBleHBlY3QgPSByZXF1aXJlKCdjaGFpJykuZXhwZWN0O1xudmFyIFBhcnRpY2lwYW50ID0gcmVxdWlyZSgnLi4vLi4vYXBwL21vZGVscy9QYXJ0aWNpcGFudCcpO1xuXG5kZXNjcmliZSgnTW9kZWxzJywgZnVuY3Rpb24oKSB7XG4gIGRlc2NyaWJlKCdQYXJ0aWNpcGFudCcsIGZ1bmN0aW9uKCkge1xuICAgIGJlZm9yZShmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMucGFydGljaXBhbnQgPSBuZXcgUGFydGljaXBhbnQoKTtcbiAgICB9KTtcbiAgICBhZnRlcihmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMucGFydGljaXBhbnQgPSBudWxsO1xuICAgIH0pO1xuXG4gICAgaXQoJyNzaG91bGQgdGVzdCBtb2RlbCBkZWZhdWx0cycsIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGtleXMgPSBbJ2FnZScsICdjb3VudHJ5JywgJ3VzZXJBZ2VudCddO1xuICAgICAgZXhwZWN0KHRoaXMucGFydGljaXBhbnQuYXR0cmlidXRlcykudG8uaGF2ZS5rZXlzKGtleXMpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuXG52YXIgZXhwZWN0ID0gcmVxdWlyZSgnY2hhaScpLmV4cGVjdDtcblxuZGVzY3JpYmUoJ1JvdXRlcnMnLCBmdW5jdGlvbigpIHtcbiAgLy8gQWRkIFRlc3RzIGZvciBSb3V0ZXJzXG59KTtcblxudmFyIGV4cGVjdCA9IHJlcXVpcmUoJ2NoYWknKS5leHBlY3Q7XG5cbmRlc2NyaWJlKCdWaWV3cycsIGZ1bmN0aW9uKCkge1xuICAvLyBBZGQgVGVzdHMgZm9yIFZpZXdzXG59KTtcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCIvaG9tZS9kb3N0b2RhYnNpL2NvZGUvYmFray9leHBlcmltZW50LXRlbXBsYXRlL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvZmFrZV85OTg0NDUzZi5qc1wiLFwiL1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvY2hhaScpO1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZShcIi9ob21lL2Rvc3RvZGFic2kvY29kZS9iYWtrL2V4cGVyaW1lbnQtdGVtcGxhdGUvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvaW5zZXJ0LW1vZHVsZS1nbG9iYWxzL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY2hhaS9pbmRleC5qc1wiLFwiLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jaGFpXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuLyohXG4gKiBjaGFpXG4gKiBDb3B5cmlnaHQoYykgMjAxMS0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxudmFyIHVzZWQgPSBbXVxuICAsIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vKiFcbiAqIENoYWkgdmVyc2lvblxuICovXG5cbmV4cG9ydHMudmVyc2lvbiA9ICcxLjguMSc7XG5cbi8qIVxuICogQXNzZXJ0aW9uIEVycm9yXG4gKi9cblxuZXhwb3J0cy5Bc3NlcnRpb25FcnJvciA9IHJlcXVpcmUoJ2Fzc2VydGlvbi1lcnJvcicpO1xuXG4vKiFcbiAqIFV0aWxzIGZvciBwbHVnaW5zIChub3QgZXhwb3J0ZWQpXG4gKi9cblxudmFyIHV0aWwgPSByZXF1aXJlKCcuL2NoYWkvdXRpbHMnKTtcblxuLyoqXG4gKiAjIC51c2UoZnVuY3Rpb24pXG4gKlxuICogUHJvdmlkZXMgYSB3YXkgdG8gZXh0ZW5kIHRoZSBpbnRlcm5hbHMgb2YgQ2hhaVxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259XG4gKiBAcmV0dXJucyB7dGhpc30gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMudXNlID0gZnVuY3Rpb24gKGZuKSB7XG4gIGlmICghfnVzZWQuaW5kZXhPZihmbikpIHtcbiAgICBmbih0aGlzLCB1dGlsKTtcbiAgICB1c2VkLnB1c2goZm4pO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKiFcbiAqIFByaW1hcnkgYEFzc2VydGlvbmAgcHJvdG90eXBlXG4gKi9cblxudmFyIGFzc2VydGlvbiA9IHJlcXVpcmUoJy4vY2hhaS9hc3NlcnRpb24nKTtcbmV4cG9ydHMudXNlKGFzc2VydGlvbik7XG5cbi8qIVxuICogQ29yZSBBc3NlcnRpb25zXG4gKi9cblxudmFyIGNvcmUgPSByZXF1aXJlKCcuL2NoYWkvY29yZS9hc3NlcnRpb25zJyk7XG5leHBvcnRzLnVzZShjb3JlKTtcblxuLyohXG4gKiBFeHBlY3QgaW50ZXJmYWNlXG4gKi9cblxudmFyIGV4cGVjdCA9IHJlcXVpcmUoJy4vY2hhaS9pbnRlcmZhY2UvZXhwZWN0Jyk7XG5leHBvcnRzLnVzZShleHBlY3QpO1xuXG4vKiFcbiAqIFNob3VsZCBpbnRlcmZhY2VcbiAqL1xuXG52YXIgc2hvdWxkID0gcmVxdWlyZSgnLi9jaGFpL2ludGVyZmFjZS9zaG91bGQnKTtcbmV4cG9ydHMudXNlKHNob3VsZCk7XG5cbi8qIVxuICogQXNzZXJ0IGludGVyZmFjZVxuICovXG5cbnZhciBhc3NlcnQgPSByZXF1aXJlKCcuL2NoYWkvaW50ZXJmYWNlL2Fzc2VydCcpO1xuZXhwb3J0cy51c2UoYXNzZXJ0KTtcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCIvaG9tZS9kb3N0b2RhYnNpL2NvZGUvYmFray9leHBlcmltZW50LXRlbXBsYXRlL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkuanNcIixcIi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY2hhaS9saWJcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4vKiFcbiAqIGNoYWlcbiAqIGh0dHA6Ly9jaGFpanMuY29tXG4gKiBDb3B5cmlnaHQoYykgMjAxMS0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoX2NoYWksIHV0aWwpIHtcbiAgLyohXG4gICAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gICAqL1xuXG4gIHZhciBBc3NlcnRpb25FcnJvciA9IF9jaGFpLkFzc2VydGlvbkVycm9yXG4gICAgLCBmbGFnID0gdXRpbC5mbGFnO1xuXG4gIC8qIVxuICAgKiBNb2R1bGUgZXhwb3J0LlxuICAgKi9cblxuICBfY2hhaS5Bc3NlcnRpb24gPSBBc3NlcnRpb247XG5cbiAgLyohXG4gICAqIEFzc2VydGlvbiBDb25zdHJ1Y3RvclxuICAgKlxuICAgKiBDcmVhdGVzIG9iamVjdCBmb3IgY2hhaW5pbmcuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBmdW5jdGlvbiBBc3NlcnRpb24gKG9iaiwgbXNnLCBzdGFjaykge1xuICAgIGZsYWcodGhpcywgJ3NzZmknLCBzdGFjayB8fCBhcmd1bWVudHMuY2FsbGVlKTtcbiAgICBmbGFnKHRoaXMsICdvYmplY3QnLCBvYmopO1xuICAgIGZsYWcodGhpcywgJ21lc3NhZ2UnLCBtc2cpO1xuICB9XG5cbiAgLyohXG4gICAgKiAjIyMgQXNzZXJ0aW9uLmluY2x1ZGVTdGFja1xuICAgICpcbiAgICAqIFVzZXIgY29uZmlndXJhYmxlIHByb3BlcnR5LCBpbmZsdWVuY2VzIHdoZXRoZXIgc3RhY2sgdHJhY2VcbiAgICAqIGlzIGluY2x1ZGVkIGluIEFzc2VydGlvbiBlcnJvciBtZXNzYWdlLiBEZWZhdWx0IG9mIGZhbHNlXG4gICAgKiBzdXBwcmVzc2VzIHN0YWNrIHRyYWNlIGluIHRoZSBlcnJvciBtZXNzYWdlXG4gICAgKlxuICAgICogICAgIEFzc2VydGlvbi5pbmNsdWRlU3RhY2sgPSB0cnVlOyAgLy8gZW5hYmxlIHN0YWNrIG9uIGVycm9yXG4gICAgKlxuICAgICogQGFwaSBwdWJsaWNcbiAgICAqL1xuXG4gIEFzc2VydGlvbi5pbmNsdWRlU3RhY2sgPSBmYWxzZTtcblxuICAvKiFcbiAgICogIyMjIEFzc2VydGlvbi5zaG93RGlmZlxuICAgKlxuICAgKiBVc2VyIGNvbmZpZ3VyYWJsZSBwcm9wZXJ0eSwgaW5mbHVlbmNlcyB3aGV0aGVyIG9yIG5vdFxuICAgKiB0aGUgYHNob3dEaWZmYCBmbGFnIHNob3VsZCBiZSBpbmNsdWRlZCBpbiB0aGUgdGhyb3duXG4gICAqIEFzc2VydGlvbkVycm9ycy4gYGZhbHNlYCB3aWxsIGFsd2F5cyBiZSBgZmFsc2VgOyBgdHJ1ZWBcbiAgICogd2lsbCBiZSB0cnVlIHdoZW4gdGhlIGFzc2VydGlvbiBoYXMgcmVxdWVzdGVkIGEgZGlmZlxuICAgKiBiZSBzaG93bi5cbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLnNob3dEaWZmID0gdHJ1ZTtcblxuICBBc3NlcnRpb24uYWRkUHJvcGVydHkgPSBmdW5jdGlvbiAobmFtZSwgZm4pIHtcbiAgICB1dGlsLmFkZFByb3BlcnR5KHRoaXMucHJvdG90eXBlLCBuYW1lLCBmbik7XG4gIH07XG5cbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCA9IGZ1bmN0aW9uIChuYW1lLCBmbikge1xuICAgIHV0aWwuYWRkTWV0aG9kKHRoaXMucHJvdG90eXBlLCBuYW1lLCBmbik7XG4gIH07XG5cbiAgQXNzZXJ0aW9uLmFkZENoYWluYWJsZU1ldGhvZCA9IGZ1bmN0aW9uIChuYW1lLCBmbiwgY2hhaW5pbmdCZWhhdmlvcikge1xuICAgIHV0aWwuYWRkQ2hhaW5hYmxlTWV0aG9kKHRoaXMucHJvdG90eXBlLCBuYW1lLCBmbiwgY2hhaW5pbmdCZWhhdmlvcik7XG4gIH07XG5cbiAgQXNzZXJ0aW9uLm92ZXJ3cml0ZVByb3BlcnR5ID0gZnVuY3Rpb24gKG5hbWUsIGZuKSB7XG4gICAgdXRpbC5vdmVyd3JpdGVQcm9wZXJ0eSh0aGlzLnByb3RvdHlwZSwgbmFtZSwgZm4pO1xuICB9O1xuXG4gIEFzc2VydGlvbi5vdmVyd3JpdGVNZXRob2QgPSBmdW5jdGlvbiAobmFtZSwgZm4pIHtcbiAgICB1dGlsLm92ZXJ3cml0ZU1ldGhvZCh0aGlzLnByb3RvdHlwZSwgbmFtZSwgZm4pO1xuICB9O1xuXG4gIEFzc2VydGlvbi5vdmVyd3JpdGVDaGFpbmFibGVNZXRob2QgPSBmdW5jdGlvbiAobmFtZSwgZm4sIGNoYWluaW5nQmVoYXZpb3IpIHtcbiAgICB1dGlsLm92ZXJ3cml0ZUNoYWluYWJsZU1ldGhvZCh0aGlzLnByb3RvdHlwZSwgbmFtZSwgZm4sIGNoYWluaW5nQmVoYXZpb3IpO1xuICB9O1xuXG4gIC8qIVxuICAgKiAjIyMgLmFzc2VydChleHByZXNzaW9uLCBtZXNzYWdlLCBuZWdhdGVNZXNzYWdlLCBleHBlY3RlZCwgYWN0dWFsKVxuICAgKlxuICAgKiBFeGVjdXRlcyBhbiBleHByZXNzaW9uIGFuZCBjaGVjayBleHBlY3RhdGlvbnMuIFRocm93cyBBc3NlcnRpb25FcnJvciBmb3IgcmVwb3J0aW5nIGlmIHRlc3QgZG9lc24ndCBwYXNzLlxuICAgKlxuICAgKiBAbmFtZSBhc3NlcnRcbiAgICogQHBhcmFtIHtQaGlsb3NvcGhpY2FsfSBleHByZXNzaW9uIHRvIGJlIHRlc3RlZFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSB0byBkaXNwbGF5IGlmIGZhaWxzXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuZWdhdGVkTWVzc2FnZSB0byBkaXNwbGF5IGlmIG5lZ2F0ZWQgZXhwcmVzc2lvbiBmYWlsc1xuICAgKiBAcGFyYW0ge01peGVkfSBleHBlY3RlZCB2YWx1ZSAocmVtZW1iZXIgdG8gY2hlY2sgZm9yIG5lZ2F0aW9uKVxuICAgKiBAcGFyYW0ge01peGVkfSBhY3R1YWwgKG9wdGlvbmFsKSB3aWxsIGRlZmF1bHQgdG8gYHRoaXMub2JqYFxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgQXNzZXJ0aW9uLnByb3RvdHlwZS5hc3NlcnQgPSBmdW5jdGlvbiAoZXhwciwgbXNnLCBuZWdhdGVNc2csIGV4cGVjdGVkLCBfYWN0dWFsLCBzaG93RGlmZikge1xuICAgIHZhciBvayA9IHV0aWwudGVzdCh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICh0cnVlICE9PSBzaG93RGlmZikgc2hvd0RpZmYgPSBmYWxzZTtcbiAgICBpZiAodHJ1ZSAhPT0gQXNzZXJ0aW9uLnNob3dEaWZmKSBzaG93RGlmZiA9IGZhbHNlO1xuXG4gICAgaWYgKCFvaykge1xuICAgICAgdmFyIG1zZyA9IHV0aWwuZ2V0TWVzc2FnZSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICAgICwgYWN0dWFsID0gdXRpbC5nZXRBY3R1YWwodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihtc2csIHtcbiAgICAgICAgICBhY3R1YWw6IGFjdHVhbFxuICAgICAgICAsIGV4cGVjdGVkOiBleHBlY3RlZFxuICAgICAgICAsIHNob3dEaWZmOiBzaG93RGlmZlxuICAgICAgfSwgKEFzc2VydGlvbi5pbmNsdWRlU3RhY2spID8gdGhpcy5hc3NlcnQgOiBmbGFnKHRoaXMsICdzc2ZpJykpO1xuICAgIH1cbiAgfTtcblxuICAvKiFcbiAgICogIyMjIC5fb2JqXG4gICAqXG4gICAqIFF1aWNrIHJlZmVyZW5jZSB0byBzdG9yZWQgYGFjdHVhbGAgdmFsdWUgZm9yIHBsdWdpbiBkZXZlbG9wZXJzLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFzc2VydGlvbi5wcm90b3R5cGUsICdfb2JqJyxcbiAgICB7IGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZmxhZyh0aGlzLCAnb2JqZWN0Jyk7XG4gICAgICB9XG4gICAgLCBzZXQ6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgZmxhZyh0aGlzLCAnb2JqZWN0JywgdmFsKTtcbiAgICAgIH1cbiAgfSk7XG59O1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZShcIi9ob21lL2Rvc3RvZGFic2kvY29kZS9iYWtrL2V4cGVyaW1lbnQtdGVtcGxhdGUvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvaW5zZXJ0LW1vZHVsZS1nbG9iYWxzL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS9hc3NlcnRpb24uanNcIixcIi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaVwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbi8qIVxuICogY2hhaVxuICogaHR0cDovL2NoYWlqcy5jb21cbiAqIENvcHlyaWdodChjKSAyMDExLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjaGFpLCBfKSB7XG4gIHZhciBBc3NlcnRpb24gPSBjaGFpLkFzc2VydGlvblxuICAgICwgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXG4gICAgLCBmbGFnID0gXy5mbGFnO1xuXG4gIC8qKlxuICAgKiAjIyMgTGFuZ3VhZ2UgQ2hhaW5zXG4gICAqXG4gICAqIFRoZSBmb2xsb3dpbmcgYXJlIHByb3ZpZGVkIGFzIGNoYWluYWJsZSBnZXR0ZXJzIHRvXG4gICAqIGltcHJvdmUgdGhlIHJlYWRhYmlsaXR5IG9mIHlvdXIgYXNzZXJ0aW9ucy4gVGhleVxuICAgKiBkbyBub3QgcHJvdmlkZSBhbiB0ZXN0aW5nIGNhcGFiaWxpdHkgdW5sZXNzIHRoZXlcbiAgICogaGF2ZSBiZWVuIG92ZXJ3cml0dGVuIGJ5IGEgcGx1Z2luLlxuICAgKlxuICAgKiAqKkNoYWlucyoqXG4gICAqXG4gICAqIC0gdG9cbiAgICogLSBiZVxuICAgKiAtIGJlZW5cbiAgICogLSBpc1xuICAgKiAtIHRoYXRcbiAgICogLSBhbmRcbiAgICogLSBoYXNcbiAgICogLSBoYXZlXG4gICAqIC0gd2l0aFxuICAgKiAtIGF0XG4gICAqIC0gb2ZcbiAgICogLSBzYW1lXG4gICAqXG4gICAqIEBuYW1lIGxhbmd1YWdlIGNoYWluc1xuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBbICd0bycsICdiZScsICdiZWVuJ1xuICAsICdpcycsICdhbmQnLCAnaGFzJywgJ2hhdmUnXG4gICwgJ3dpdGgnLCAndGhhdCcsICdhdCdcbiAgLCAnb2YnLCAnc2FtZScgXS5mb3JFYWNoKGZ1bmN0aW9uIChjaGFpbikge1xuICAgIEFzc2VydGlvbi5hZGRQcm9wZXJ0eShjaGFpbiwgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAjIyMgLm5vdFxuICAgKlxuICAgKiBOZWdhdGVzIGFueSBvZiBhc3NlcnRpb25zIGZvbGxvd2luZyBpbiB0aGUgY2hhaW4uXG4gICAqXG4gICAqICAgICBleHBlY3QoZm9vKS50by5ub3QuZXF1YWwoJ2JhcicpO1xuICAgKiAgICAgZXhwZWN0KGdvb2RGbikudG8ubm90LnRocm93KEVycm9yKTtcbiAgICogICAgIGV4cGVjdCh7IGZvbzogJ2JheicgfSkudG8uaGF2ZS5wcm9wZXJ0eSgnZm9vJylcbiAgICogICAgICAgLmFuZC5ub3QuZXF1YWwoJ2JhcicpO1xuICAgKlxuICAgKiBAbmFtZSBub3RcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZFByb3BlcnR5KCdub3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgZmxhZyh0aGlzLCAnbmVnYXRlJywgdHJ1ZSk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAjIyMgLmRlZXBcbiAgICpcbiAgICogU2V0cyB0aGUgYGRlZXBgIGZsYWcsIGxhdGVyIHVzZWQgYnkgdGhlIGBlcXVhbGAgYW5kXG4gICAqIGBwcm9wZXJ0eWAgYXNzZXJ0aW9ucy5cbiAgICpcbiAgICogICAgIGV4cGVjdChmb28pLnRvLmRlZXAuZXF1YWwoeyBiYXI6ICdiYXonIH0pO1xuICAgKiAgICAgZXhwZWN0KHsgZm9vOiB7IGJhcjogeyBiYXo6ICdxdXV4JyB9IH0gfSlcbiAgICogICAgICAgLnRvLmhhdmUuZGVlcC5wcm9wZXJ0eSgnZm9vLmJhci5iYXonLCAncXV1eCcpO1xuICAgKlxuICAgKiBAbmFtZSBkZWVwXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEFzc2VydGlvbi5hZGRQcm9wZXJ0eSgnZGVlcCcsIGZ1bmN0aW9uICgpIHtcbiAgICBmbGFnKHRoaXMsICdkZWVwJywgdHJ1ZSk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAjIyMgLmEodHlwZSlcbiAgICpcbiAgICogVGhlIGBhYCBhbmQgYGFuYCBhc3NlcnRpb25zIGFyZSBhbGlhc2VzIHRoYXQgY2FuIGJlXG4gICAqIHVzZWQgZWl0aGVyIGFzIGxhbmd1YWdlIGNoYWlucyBvciB0byBhc3NlcnQgYSB2YWx1ZSdzXG4gICAqIHR5cGUuXG4gICAqXG4gICAqICAgICAvLyB0eXBlb2ZcbiAgICogICAgIGV4cGVjdCgndGVzdCcpLnRvLmJlLmEoJ3N0cmluZycpO1xuICAgKiAgICAgZXhwZWN0KHsgZm9vOiAnYmFyJyB9KS50by5iZS5hbignb2JqZWN0Jyk7XG4gICAqICAgICBleHBlY3QobnVsbCkudG8uYmUuYSgnbnVsbCcpO1xuICAgKiAgICAgZXhwZWN0KHVuZGVmaW5lZCkudG8uYmUuYW4oJ3VuZGVmaW5lZCcpO1xuICAgKlxuICAgKiAgICAgLy8gbGFuZ3VhZ2UgY2hhaW5cbiAgICogICAgIGV4cGVjdChmb28pLnRvLmJlLmFuLmluc3RhbmNlb2YoRm9vKTtcbiAgICpcbiAgICogQG5hbWUgYVxuICAgKiBAYWxpYXMgYW5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgX29wdGlvbmFsX1xuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBhbiAodHlwZSwgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG4gICAgdHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0JylcbiAgICAgICwgYXJ0aWNsZSA9IH5bICdhJywgJ2UnLCAnaScsICdvJywgJ3UnIF0uaW5kZXhPZih0eXBlLmNoYXJBdCgwKSkgPyAnYW4gJyA6ICdhICc7XG5cbiAgICB0aGlzLmFzc2VydChcbiAgICAgICAgdHlwZSA9PT0gXy50eXBlKG9iailcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgJyArIGFydGljbGUgKyB0eXBlXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IG5vdCB0byBiZSAnICsgYXJ0aWNsZSArIHR5cGVcbiAgICApO1xuICB9XG5cbiAgQXNzZXJ0aW9uLmFkZENoYWluYWJsZU1ldGhvZCgnYW4nLCBhbik7XG4gIEFzc2VydGlvbi5hZGRDaGFpbmFibGVNZXRob2QoJ2EnLCBhbik7XG5cbiAgLyoqXG4gICAqICMjIyAuaW5jbHVkZSh2YWx1ZSlcbiAgICpcbiAgICogVGhlIGBpbmNsdWRlYCBhbmQgYGNvbnRhaW5gIGFzc2VydGlvbnMgY2FuIGJlIHVzZWQgYXMgZWl0aGVyIHByb3BlcnR5XG4gICAqIGJhc2VkIGxhbmd1YWdlIGNoYWlucyBvciBhcyBtZXRob2RzIHRvIGFzc2VydCB0aGUgaW5jbHVzaW9uIG9mIGFuIG9iamVjdFxuICAgKiBpbiBhbiBhcnJheSBvciBhIHN1YnN0cmluZyBpbiBhIHN0cmluZy4gV2hlbiB1c2VkIGFzIGxhbmd1YWdlIGNoYWlucyxcbiAgICogdGhleSB0b2dnbGUgdGhlIGBjb250YWluYCBmbGFnIGZvciB0aGUgYGtleXNgIGFzc2VydGlvbi5cbiAgICpcbiAgICogICAgIGV4cGVjdChbMSwyLDNdKS50by5pbmNsdWRlKDIpO1xuICAgKiAgICAgZXhwZWN0KCdmb29iYXInKS50by5jb250YWluKCdmb28nKTtcbiAgICogICAgIGV4cGVjdCh7IGZvbzogJ2JhcicsIGhlbGxvOiAndW5pdmVyc2UnIH0pLnRvLmluY2x1ZGUua2V5cygnZm9vJyk7XG4gICAqXG4gICAqIEBuYW1lIGluY2x1ZGVcbiAgICogQGFsaWFzIGNvbnRhaW5cbiAgICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfE51bWJlcn0gb2JqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIF9vcHRpb25hbF9cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gaW5jbHVkZUNoYWluaW5nQmVoYXZpb3IgKCkge1xuICAgIGZsYWcodGhpcywgJ2NvbnRhaW5zJywgdHJ1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpbmNsdWRlICh2YWwsIG1zZykge1xuICAgIGlmIChtc2cpIGZsYWcodGhpcywgJ21lc3NhZ2UnLCBtc2cpO1xuICAgIHZhciBvYmogPSBmbGFnKHRoaXMsICdvYmplY3QnKTtcblxuICAgIGlmIChfLnR5cGUodmFsKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmICghZmxhZyh0aGlzLCAnbmVnYXRlJykpIHtcbiAgICAgICAgZm9yICh2YXIgayBpbiB2YWwpIG5ldyBBc3NlcnRpb24ob2JqKS5wcm9wZXJ0eShrLCB2YWxba10pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgc3Vic2V0ID0ge31cbiAgICAgIGZvciAodmFyIGsgaW4gdmFsKSBzdWJzZXRba10gPSBvYmpba11cbiAgICAgIHZhciBleHBlY3RlZCA9IF8uZXFsKHN1YnNldCwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGV4cGVjdGVkID0gb2JqICYmIH5vYmouaW5kZXhPZih2YWwpXG4gICAgfVxuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICBleHBlY3RlZFxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBpbmNsdWRlICcgKyBfLmluc3BlY3QodmFsKVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgaW5jbHVkZSAnICsgXy5pbnNwZWN0KHZhbCkpO1xuICB9XG5cbiAgQXNzZXJ0aW9uLmFkZENoYWluYWJsZU1ldGhvZCgnaW5jbHVkZScsIGluY2x1ZGUsIGluY2x1ZGVDaGFpbmluZ0JlaGF2aW9yKTtcbiAgQXNzZXJ0aW9uLmFkZENoYWluYWJsZU1ldGhvZCgnY29udGFpbicsIGluY2x1ZGUsIGluY2x1ZGVDaGFpbmluZ0JlaGF2aW9yKTtcblxuICAvKipcbiAgICogIyMjIC5va1xuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyB0cnV0aHkuXG4gICAqXG4gICAqICAgICBleHBlY3QoJ2V2ZXJ0aGluZycpLnRvLmJlLm9rO1xuICAgKiAgICAgZXhwZWN0KDEpLnRvLmJlLm9rO1xuICAgKiAgICAgZXhwZWN0KGZhbHNlKS50by5ub3QuYmUub2s7XG4gICAqICAgICBleHBlY3QodW5kZWZpbmVkKS50by5ub3QuYmUub2s7XG4gICAqICAgICBleHBlY3QobnVsbCkudG8ubm90LmJlLm9rO1xuICAgKlxuICAgKiBAbmFtZSBva1xuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBBc3NlcnRpb24uYWRkUHJvcGVydHkoJ29rJywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICBmbGFnKHRoaXMsICdvYmplY3QnKVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSB0cnV0aHknXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGJlIGZhbHN5Jyk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAjIyMgLnRydWVcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgaXMgYHRydWVgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KHRydWUpLnRvLmJlLnRydWU7XG4gICAqICAgICBleHBlY3QoMSkudG8ubm90LmJlLnRydWU7XG4gICAqXG4gICAqIEBuYW1lIHRydWVcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZFByb3BlcnR5KCd0cnVlJywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICB0cnVlID09PSBmbGFnKHRoaXMsICdvYmplY3QnKVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSB0cnVlJ1xuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBmYWxzZSdcbiAgICAgICwgdGhpcy5uZWdhdGUgPyBmYWxzZSA6IHRydWVcbiAgICApO1xuICB9KTtcblxuICAvKipcbiAgICogIyMjIC5mYWxzZVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBgZmFsc2VgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KGZhbHNlKS50by5iZS5mYWxzZTtcbiAgICogICAgIGV4cGVjdCgwKS50by5ub3QuYmUuZmFsc2U7XG4gICAqXG4gICAqIEBuYW1lIGZhbHNlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEFzc2VydGlvbi5hZGRQcm9wZXJ0eSgnZmFsc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICAgIGZhbHNlID09PSBmbGFnKHRoaXMsICdvYmplY3QnKVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBmYWxzZSdcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgdHJ1ZSdcbiAgICAgICwgdGhpcy5uZWdhdGUgPyB0cnVlIDogZmFsc2VcbiAgICApO1xuICB9KTtcblxuICAvKipcbiAgICogIyMjIC5udWxsXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IGlzIGBudWxsYC5cbiAgICpcbiAgICogICAgIGV4cGVjdChudWxsKS50by5iZS5udWxsO1xuICAgKiAgICAgZXhwZWN0KHVuZGVmaW5lZCkubm90LnRvLmJlLm51bGw7XG4gICAqXG4gICAqIEBuYW1lIG51bGxcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZFByb3BlcnR5KCdudWxsJywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICBudWxsID09PSBmbGFnKHRoaXMsICdvYmplY3QnKVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBudWxsJ1xuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSBub3QgdG8gYmUgbnVsbCdcbiAgICApO1xuICB9KTtcblxuICAvKipcbiAgICogIyMjIC51bmRlZmluZWRcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgaXMgYHVuZGVmaW5lZGAuXG4gICAqXG4gICAqICAgICBleHBlY3QodW5kZWZpbmVkKS50by5iZS51bmRlZmluZWQ7XG4gICAqICAgICBleHBlY3QobnVsbCkudG8ubm90LmJlLnVuZGVmaW5lZDtcbiAgICpcbiAgICogQG5hbWUgdW5kZWZpbmVkXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEFzc2VydGlvbi5hZGRQcm9wZXJ0eSgndW5kZWZpbmVkJywgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICB1bmRlZmluZWQgPT09IGZsYWcodGhpcywgJ29iamVjdCcpXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGJlIHVuZGVmaW5lZCdcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gbm90IHRvIGJlIHVuZGVmaW5lZCdcbiAgICApO1xuICB9KTtcblxuICAvKipcbiAgICogIyMjIC5leGlzdFxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBuZWl0aGVyIGBudWxsYCBub3IgYHVuZGVmaW5lZGAuXG4gICAqXG4gICAqICAgICB2YXIgZm9vID0gJ2hpJ1xuICAgKiAgICAgICAsIGJhciA9IG51bGxcbiAgICogICAgICAgLCBiYXo7XG4gICAqXG4gICAqICAgICBleHBlY3QoZm9vKS50by5leGlzdDtcbiAgICogICAgIGV4cGVjdChiYXIpLnRvLm5vdC5leGlzdDtcbiAgICogICAgIGV4cGVjdChiYXopLnRvLm5vdC5leGlzdDtcbiAgICpcbiAgICogQG5hbWUgZXhpc3RcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZFByb3BlcnR5KCdleGlzdCcsIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmFzc2VydChcbiAgICAgICAgbnVsbCAhPSBmbGFnKHRoaXMsICdvYmplY3QnKVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBleGlzdCdcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IGV4aXN0J1xuICAgICk7XG4gIH0pO1xuXG5cbiAgLyoqXG4gICAqICMjIyAuZW1wdHlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQncyBsZW5ndGggaXMgYDBgLiBGb3IgYXJyYXlzLCBpdCBjaGVja3NcbiAgICogdGhlIGBsZW5ndGhgIHByb3BlcnR5LiBGb3Igb2JqZWN0cywgaXQgZ2V0cyB0aGUgY291bnQgb2ZcbiAgICogZW51bWVyYWJsZSBrZXlzLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KFtdKS50by5iZS5lbXB0eTtcbiAgICogICAgIGV4cGVjdCgnJykudG8uYmUuZW1wdHk7XG4gICAqICAgICBleHBlY3Qoe30pLnRvLmJlLmVtcHR5O1xuICAgKlxuICAgKiBAbmFtZSBlbXB0eVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBBc3NlcnRpb24uYWRkUHJvcGVydHkoJ2VtcHR5JywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBvYmogPSBmbGFnKHRoaXMsICdvYmplY3QnKVxuICAgICAgLCBleHBlY3RlZCA9IG9iajtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikgfHwgJ3N0cmluZycgPT09IHR5cGVvZiBvYmplY3QpIHtcbiAgICAgIGV4cGVjdGVkID0gb2JqLmxlbmd0aDtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG4gICAgICBleHBlY3RlZCA9IE9iamVjdC5rZXlzKG9iaikubGVuZ3RoO1xuICAgIH1cblxuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAhZXhwZWN0ZWRcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgZW1wdHknXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IG5vdCB0byBiZSBlbXB0eSdcbiAgICApO1xuICB9KTtcblxuICAvKipcbiAgICogIyMjIC5hcmd1bWVudHNcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgaXMgYW4gYXJndW1lbnRzIG9iamVjdC5cbiAgICpcbiAgICogICAgIGZ1bmN0aW9uIHRlc3QgKCkge1xuICAgKiAgICAgICBleHBlY3QoYXJndW1lbnRzKS50by5iZS5hcmd1bWVudHM7XG4gICAqICAgICB9XG4gICAqXG4gICAqIEBuYW1lIGFyZ3VtZW50c1xuICAgKiBAYWxpYXMgQXJndW1lbnRzXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNoZWNrQXJndW1lbnRzICgpIHtcbiAgICB2YXIgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0JylcbiAgICAgICwgdHlwZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopO1xuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAnW29iamVjdCBBcmd1bWVudHNdJyA9PT0gdHlwZVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBhcmd1bWVudHMgYnV0IGdvdCAnICsgdHlwZVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgYmUgYXJndW1lbnRzJ1xuICAgICk7XG4gIH1cblxuICBBc3NlcnRpb24uYWRkUHJvcGVydHkoJ2FyZ3VtZW50cycsIGNoZWNrQXJndW1lbnRzKTtcbiAgQXNzZXJ0aW9uLmFkZFByb3BlcnR5KCdBcmd1bWVudHMnLCBjaGVja0FyZ3VtZW50cyk7XG5cbiAgLyoqXG4gICAqICMjIyAuZXF1YWwodmFsdWUpXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IGlzIHN0cmljdGx5IGVxdWFsIChgPT09YCkgdG8gYHZhbHVlYC5cbiAgICogQWx0ZXJuYXRlbHksIGlmIHRoZSBgZGVlcGAgZmxhZyBpcyBzZXQsIGFzc2VydHMgdGhhdFxuICAgKiB0aGUgdGFyZ2V0IGlzIGRlZXBseSBlcXVhbCB0byBgdmFsdWVgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KCdoZWxsbycpLnRvLmVxdWFsKCdoZWxsbycpO1xuICAgKiAgICAgZXhwZWN0KDQyKS50by5lcXVhbCg0Mik7XG4gICAqICAgICBleHBlY3QoMSkudG8ubm90LmVxdWFsKHRydWUpO1xuICAgKiAgICAgZXhwZWN0KHsgZm9vOiAnYmFyJyB9KS50by5ub3QuZXF1YWwoeyBmb286ICdiYXInIH0pO1xuICAgKiAgICAgZXhwZWN0KHsgZm9vOiAnYmFyJyB9KS50by5kZWVwLmVxdWFsKHsgZm9vOiAnYmFyJyB9KTtcbiAgICpcbiAgICogQG5hbWUgZXF1YWxcbiAgICogQGFsaWFzIGVxdWFsc1xuICAgKiBAYWxpYXMgZXFcbiAgICogQGFsaWFzIGRlZXAuZXF1YWxcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgX29wdGlvbmFsX1xuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBhc3NlcnRFcXVhbCAodmFsLCBtc2cpIHtcbiAgICBpZiAobXNnKSBmbGFnKHRoaXMsICdtZXNzYWdlJywgbXNnKTtcbiAgICB2YXIgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0Jyk7XG4gICAgaWYgKGZsYWcodGhpcywgJ2RlZXAnKSkge1xuICAgICAgcmV0dXJuIHRoaXMuZXFsKHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAgIHZhbCA9PT0gb2JqXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gZXF1YWwgI3tleHB9J1xuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBlcXVhbCAje2V4cH0nXG4gICAgICAgICwgdmFsXG4gICAgICAgICwgdGhpcy5fb2JqXG4gICAgICAgICwgdHJ1ZVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdlcXVhbCcsIGFzc2VydEVxdWFsKTtcbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnZXF1YWxzJywgYXNzZXJ0RXF1YWwpO1xuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdlcScsIGFzc2VydEVxdWFsKTtcblxuICAvKipcbiAgICogIyMjIC5lcWwodmFsdWUpXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IGlzIGRlZXBseSBlcXVhbCB0byBgdmFsdWVgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KHsgZm9vOiAnYmFyJyB9KS50by5lcWwoeyBmb286ICdiYXInIH0pO1xuICAgKiAgICAgZXhwZWN0KFsgMSwgMiwgMyBdKS50by5lcWwoWyAxLCAyLCAzIF0pO1xuICAgKlxuICAgKiBAbmFtZSBlcWxcbiAgICogQGFsaWFzIGVxbHNcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgX29wdGlvbmFsX1xuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBhc3NlcnRFcWwob2JqLCBtc2cpIHtcbiAgICBpZiAobXNnKSBmbGFnKHRoaXMsICdtZXNzYWdlJywgbXNnKTtcbiAgICB0aGlzLmFzc2VydChcbiAgICAgICAgXy5lcWwob2JqLCBmbGFnKHRoaXMsICdvYmplY3QnKSlcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gZGVlcGx5IGVxdWFsICN7ZXhwfSdcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IGRlZXBseSBlcXVhbCAje2V4cH0nXG4gICAgICAsIG9ialxuICAgICAgLCB0aGlzLl9vYmpcbiAgICAgICwgdHJ1ZVxuICAgICk7XG4gIH1cblxuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdlcWwnLCBhc3NlcnRFcWwpO1xuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdlcWxzJywgYXNzZXJ0RXFsKTtcblxuICAvKipcbiAgICogIyMjIC5hYm92ZSh2YWx1ZSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgaXMgZ3JlYXRlciB0aGFuIGB2YWx1ZWAuXG4gICAqXG4gICAqICAgICBleHBlY3QoMTApLnRvLmJlLmFib3ZlKDUpO1xuICAgKlxuICAgKiBDYW4gYWxzbyBiZSB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggYGxlbmd0aGAgdG9cbiAgICogYXNzZXJ0IGEgbWluaW11bSBsZW5ndGguIFRoZSBiZW5lZml0IGJlaW5nIGFcbiAgICogbW9yZSBpbmZvcm1hdGl2ZSBlcnJvciBtZXNzYWdlIHRoYW4gaWYgdGhlIGxlbmd0aFxuICAgKiB3YXMgc3VwcGxpZWQgZGlyZWN0bHkuXG4gICAqXG4gICAqICAgICBleHBlY3QoJ2ZvbycpLnRvLmhhdmUubGVuZ3RoLmFib3ZlKDIpO1xuICAgKiAgICAgZXhwZWN0KFsgMSwgMiwgMyBdKS50by5oYXZlLmxlbmd0aC5hYm92ZSgyKTtcbiAgICpcbiAgICogQG5hbWUgYWJvdmVcbiAgICogQGFsaWFzIGd0XG4gICAqIEBhbGlhcyBncmVhdGVyVGhhblxuICAgKiBAcGFyYW0ge051bWJlcn0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgX29wdGlvbmFsX1xuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBhc3NlcnRBYm92ZSAobiwgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG4gICAgdmFyIG9iaiA9IGZsYWcodGhpcywgJ29iamVjdCcpO1xuICAgIGlmIChmbGFnKHRoaXMsICdkb0xlbmd0aCcpKSB7XG4gICAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnKS50by5oYXZlLnByb3BlcnR5KCdsZW5ndGgnKTtcbiAgICAgIHZhciBsZW4gPSBvYmoubGVuZ3RoO1xuICAgICAgdGhpcy5hc3NlcnQoXG4gICAgICAgICAgbGVuID4gblxuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGhhdmUgYSBsZW5ndGggYWJvdmUgI3tleHB9IGJ1dCBnb3QgI3thY3R9J1xuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBoYXZlIGEgbGVuZ3RoIGFib3ZlICN7ZXhwfSdcbiAgICAgICAgLCBuXG4gICAgICAgICwgbGVuXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFzc2VydChcbiAgICAgICAgICBvYmogPiBuXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgYWJvdmUgJyArIG5cbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBhdCBtb3N0ICcgKyBuXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ2Fib3ZlJywgYXNzZXJ0QWJvdmUpO1xuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdndCcsIGFzc2VydEFib3ZlKTtcbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnZ3JlYXRlclRoYW4nLCBhc3NlcnRBYm92ZSk7XG5cbiAgLyoqXG4gICAqICMjIyAubGVhc3QodmFsdWUpXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IGlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byBgdmFsdWVgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDEwKS50by5iZS5hdC5sZWFzdCgxMCk7XG4gICAqXG4gICAqIENhbiBhbHNvIGJlIHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCBgbGVuZ3RoYCB0b1xuICAgKiBhc3NlcnQgYSBtaW5pbXVtIGxlbmd0aC4gVGhlIGJlbmVmaXQgYmVpbmcgYVxuICAgKiBtb3JlIGluZm9ybWF0aXZlIGVycm9yIG1lc3NhZ2UgdGhhbiBpZiB0aGUgbGVuZ3RoXG4gICAqIHdhcyBzdXBwbGllZCBkaXJlY3RseS5cbiAgICpcbiAgICogICAgIGV4cGVjdCgnZm9vJykudG8uaGF2ZS5sZW5ndGgub2YuYXQubGVhc3QoMik7XG4gICAqICAgICBleHBlY3QoWyAxLCAyLCAzIF0pLnRvLmhhdmUubGVuZ3RoLm9mLmF0LmxlYXN0KDMpO1xuICAgKlxuICAgKiBAbmFtZSBsZWFzdFxuICAgKiBAYWxpYXMgZ3RlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBfb3B0aW9uYWxfXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFzc2VydExlYXN0IChuLCBtc2cpIHtcbiAgICBpZiAobXNnKSBmbGFnKHRoaXMsICdtZXNzYWdlJywgbXNnKTtcbiAgICB2YXIgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0Jyk7XG4gICAgaWYgKGZsYWcodGhpcywgJ2RvTGVuZ3RoJykpIHtcbiAgICAgIG5ldyBBc3NlcnRpb24ob2JqLCBtc2cpLnRvLmhhdmUucHJvcGVydHkoJ2xlbmd0aCcpO1xuICAgICAgdmFyIGxlbiA9IG9iai5sZW5ndGg7XG4gICAgICB0aGlzLmFzc2VydChcbiAgICAgICAgICBsZW4gPj0gblxuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGhhdmUgYSBsZW5ndGggYXQgbGVhc3QgI3tleHB9IGJ1dCBnb3QgI3thY3R9J1xuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGhhdmUgYSBsZW5ndGggYmVsb3cgI3tleHB9J1xuICAgICAgICAsIG5cbiAgICAgICAgLCBsZW5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAgIG9iaiA+PSBuXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgYXQgbGVhc3QgJyArIG5cbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBiZWxvdyAnICsgblxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdsZWFzdCcsIGFzc2VydExlYXN0KTtcbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnZ3RlJywgYXNzZXJ0TGVhc3QpO1xuXG4gIC8qKlxuICAgKiAjIyMgLmJlbG93KHZhbHVlKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBsZXNzIHRoYW4gYHZhbHVlYC5cbiAgICpcbiAgICogICAgIGV4cGVjdCg1KS50by5iZS5iZWxvdygxMCk7XG4gICAqXG4gICAqIENhbiBhbHNvIGJlIHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCBgbGVuZ3RoYCB0b1xuICAgKiBhc3NlcnQgYSBtYXhpbXVtIGxlbmd0aC4gVGhlIGJlbmVmaXQgYmVpbmcgYVxuICAgKiBtb3JlIGluZm9ybWF0aXZlIGVycm9yIG1lc3NhZ2UgdGhhbiBpZiB0aGUgbGVuZ3RoXG4gICAqIHdhcyBzdXBwbGllZCBkaXJlY3RseS5cbiAgICpcbiAgICogICAgIGV4cGVjdCgnZm9vJykudG8uaGF2ZS5sZW5ndGguYmVsb3coNCk7XG4gICAqICAgICBleHBlY3QoWyAxLCAyLCAzIF0pLnRvLmhhdmUubGVuZ3RoLmJlbG93KDQpO1xuICAgKlxuICAgKiBAbmFtZSBiZWxvd1xuICAgKiBAYWxpYXMgbHRcbiAgICogQGFsaWFzIGxlc3NUaGFuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBfb3B0aW9uYWxfXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFzc2VydEJlbG93IChuLCBtc2cpIHtcbiAgICBpZiAobXNnKSBmbGFnKHRoaXMsICdtZXNzYWdlJywgbXNnKTtcbiAgICB2YXIgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0Jyk7XG4gICAgaWYgKGZsYWcodGhpcywgJ2RvTGVuZ3RoJykpIHtcbiAgICAgIG5ldyBBc3NlcnRpb24ob2JqLCBtc2cpLnRvLmhhdmUucHJvcGVydHkoJ2xlbmd0aCcpO1xuICAgICAgdmFyIGxlbiA9IG9iai5sZW5ndGg7XG4gICAgICB0aGlzLmFzc2VydChcbiAgICAgICAgICBsZW4gPCBuXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gaGF2ZSBhIGxlbmd0aCBiZWxvdyAje2V4cH0gYnV0IGdvdCAje2FjdH0nXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IGhhdmUgYSBsZW5ndGggYmVsb3cgI3tleHB9J1xuICAgICAgICAsIG5cbiAgICAgICAgLCBsZW5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAgIG9iaiA8IG5cbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBiZWxvdyAnICsgblxuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGJlIGF0IGxlYXN0ICcgKyBuXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ2JlbG93JywgYXNzZXJ0QmVsb3cpO1xuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdsdCcsIGFzc2VydEJlbG93KTtcbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnbGVzc1RoYW4nLCBhc3NlcnRCZWxvdyk7XG5cbiAgLyoqXG4gICAqICMjIyAubW9zdCh2YWx1ZSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGB2YWx1ZWAuXG4gICAqXG4gICAqICAgICBleHBlY3QoNSkudG8uYmUuYXQubW9zdCg1KTtcbiAgICpcbiAgICogQ2FuIGFsc28gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIGBsZW5ndGhgIHRvXG4gICAqIGFzc2VydCBhIG1heGltdW0gbGVuZ3RoLiBUaGUgYmVuZWZpdCBiZWluZyBhXG4gICAqIG1vcmUgaW5mb3JtYXRpdmUgZXJyb3IgbWVzc2FnZSB0aGFuIGlmIHRoZSBsZW5ndGhcbiAgICogd2FzIHN1cHBsaWVkIGRpcmVjdGx5LlxuICAgKlxuICAgKiAgICAgZXhwZWN0KCdmb28nKS50by5oYXZlLmxlbmd0aC5vZi5hdC5tb3N0KDQpO1xuICAgKiAgICAgZXhwZWN0KFsgMSwgMiwgMyBdKS50by5oYXZlLmxlbmd0aC5vZi5hdC5tb3N0KDMpO1xuICAgKlxuICAgKiBAbmFtZSBtb3N0XG4gICAqIEBhbGlhcyBsdGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIF9vcHRpb25hbF9cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gYXNzZXJ0TW9zdCAobiwgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG4gICAgdmFyIG9iaiA9IGZsYWcodGhpcywgJ29iamVjdCcpO1xuICAgIGlmIChmbGFnKHRoaXMsICdkb0xlbmd0aCcpKSB7XG4gICAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnKS50by5oYXZlLnByb3BlcnR5KCdsZW5ndGgnKTtcbiAgICAgIHZhciBsZW4gPSBvYmoubGVuZ3RoO1xuICAgICAgdGhpcy5hc3NlcnQoXG4gICAgICAgICAgbGVuIDw9IG5cbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBoYXZlIGEgbGVuZ3RoIGF0IG1vc3QgI3tleHB9IGJ1dCBnb3QgI3thY3R9J1xuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGhhdmUgYSBsZW5ndGggYWJvdmUgI3tleHB9J1xuICAgICAgICAsIG5cbiAgICAgICAgLCBsZW5cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAgIG9iaiA8PSBuXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgYXQgbW9zdCAnICsgblxuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGJlIGFib3ZlICcgKyBuXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ21vc3QnLCBhc3NlcnRNb3N0KTtcbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnbHRlJywgYXNzZXJ0TW9zdCk7XG5cbiAgLyoqXG4gICAqICMjIyAud2l0aGluKHN0YXJ0LCBmaW5pc2gpXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IGlzIHdpdGhpbiBhIHJhbmdlLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDcpLnRvLmJlLndpdGhpbig1LDEwKTtcbiAgICpcbiAgICogQ2FuIGFsc28gYmUgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIGBsZW5ndGhgIHRvXG4gICAqIGFzc2VydCBhIGxlbmd0aCByYW5nZS4gVGhlIGJlbmVmaXQgYmVpbmcgYVxuICAgKiBtb3JlIGluZm9ybWF0aXZlIGVycm9yIG1lc3NhZ2UgdGhhbiBpZiB0aGUgbGVuZ3RoXG4gICAqIHdhcyBzdXBwbGllZCBkaXJlY3RseS5cbiAgICpcbiAgICogICAgIGV4cGVjdCgnZm9vJykudG8uaGF2ZS5sZW5ndGgud2l0aGluKDIsNCk7XG4gICAqICAgICBleHBlY3QoWyAxLCAyLCAzIF0pLnRvLmhhdmUubGVuZ3RoLndpdGhpbigyLDQpO1xuICAgKlxuICAgKiBAbmFtZSB3aXRoaW5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IHN0YXJ0IGxvd2VyYm91bmQgaW5jbHVzaXZlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBmaW5pc2ggdXBwZXJib3VuZCBpbmNsdXNpdmVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgX29wdGlvbmFsX1xuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBBc3NlcnRpb24uYWRkTWV0aG9kKCd3aXRoaW4nLCBmdW5jdGlvbiAoc3RhcnQsIGZpbmlzaCwgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG4gICAgdmFyIG9iaiA9IGZsYWcodGhpcywgJ29iamVjdCcpXG4gICAgICAsIHJhbmdlID0gc3RhcnQgKyAnLi4nICsgZmluaXNoO1xuICAgIGlmIChmbGFnKHRoaXMsICdkb0xlbmd0aCcpKSB7XG4gICAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnKS50by5oYXZlLnByb3BlcnR5KCdsZW5ndGgnKTtcbiAgICAgIHZhciBsZW4gPSBvYmoubGVuZ3RoO1xuICAgICAgdGhpcy5hc3NlcnQoXG4gICAgICAgICAgbGVuID49IHN0YXJ0ICYmIGxlbiA8PSBmaW5pc2hcbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBoYXZlIGEgbGVuZ3RoIHdpdGhpbiAnICsgcmFuZ2VcbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgaGF2ZSBhIGxlbmd0aCB3aXRoaW4gJyArIHJhbmdlXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFzc2VydChcbiAgICAgICAgICBvYmogPj0gc3RhcnQgJiYgb2JqIDw9IGZpbmlzaFxuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGJlIHdpdGhpbiAnICsgcmFuZ2VcbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgYmUgd2l0aGluICcgKyByYW5nZVxuICAgICAgKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAjIyMgLmluc3RhbmNlb2YoY29uc3RydWN0b3IpXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IGlzIGFuIGluc3RhbmNlIG9mIGBjb25zdHJ1Y3RvcmAuXG4gICAqXG4gICAqICAgICB2YXIgVGVhID0gZnVuY3Rpb24gKG5hbWUpIHsgdGhpcy5uYW1lID0gbmFtZTsgfVxuICAgKiAgICAgICAsIENoYWkgPSBuZXcgVGVhKCdjaGFpJyk7XG4gICAqXG4gICAqICAgICBleHBlY3QoQ2hhaSkudG8uYmUuYW4uaW5zdGFuY2VvZihUZWEpO1xuICAgKiAgICAgZXhwZWN0KFsgMSwgMiwgMyBdKS50by5iZS5pbnN0YW5jZW9mKEFycmF5KTtcbiAgICpcbiAgICogQG5hbWUgaW5zdGFuY2VvZlxuICAgKiBAcGFyYW0ge0NvbnN0cnVjdG9yfSBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBfb3B0aW9uYWxfXG4gICAqIEBhbGlhcyBpbnN0YW5jZU9mXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFzc2VydEluc3RhbmNlT2YgKGNvbnN0cnVjdG9yLCBtc2cpIHtcbiAgICBpZiAobXNnKSBmbGFnKHRoaXMsICdtZXNzYWdlJywgbXNnKTtcbiAgICB2YXIgbmFtZSA9IF8uZ2V0TmFtZShjb25zdHJ1Y3Rvcik7XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICAgIGZsYWcodGhpcywgJ29iamVjdCcpIGluc3RhbmNlb2YgY29uc3RydWN0b3JcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgYW4gaW5zdGFuY2Ugb2YgJyArIG5hbWVcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IGJlIGFuIGluc3RhbmNlIG9mICcgKyBuYW1lXG4gICAgKTtcbiAgfTtcblxuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdpbnN0YW5jZW9mJywgYXNzZXJ0SW5zdGFuY2VPZik7XG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ2luc3RhbmNlT2YnLCBhc3NlcnRJbnN0YW5jZU9mKTtcblxuICAvKipcbiAgICogIyMjIC5wcm9wZXJ0eShuYW1lLCBbdmFsdWVdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBoYXMgYSBwcm9wZXJ0eSBgbmFtZWAsIG9wdGlvbmFsbHkgYXNzZXJ0aW5nIHRoYXRcbiAgICogdGhlIHZhbHVlIG9mIHRoYXQgcHJvcGVydHkgaXMgc3RyaWN0bHkgZXF1YWwgdG8gIGB2YWx1ZWAuXG4gICAqIElmIHRoZSBgZGVlcGAgZmxhZyBpcyBzZXQsIHlvdSBjYW4gdXNlIGRvdC0gYW5kIGJyYWNrZXQtbm90YXRpb24gZm9yIGRlZXBcbiAgICogcmVmZXJlbmNlcyBpbnRvIG9iamVjdHMgYW5kIGFycmF5cy5cbiAgICpcbiAgICogICAgIC8vIHNpbXBsZSByZWZlcmVuY2luZ1xuICAgKiAgICAgdmFyIG9iaiA9IHsgZm9vOiAnYmFyJyB9O1xuICAgKiAgICAgZXhwZWN0KG9iaikudG8uaGF2ZS5wcm9wZXJ0eSgnZm9vJyk7XG4gICAqICAgICBleHBlY3Qob2JqKS50by5oYXZlLnByb3BlcnR5KCdmb28nLCAnYmFyJyk7XG4gICAqXG4gICAqICAgICAvLyBkZWVwIHJlZmVyZW5jaW5nXG4gICAqICAgICB2YXIgZGVlcE9iaiA9IHtcbiAgICogICAgICAgICBncmVlbjogeyB0ZWE6ICdtYXRjaGEnIH1cbiAgICogICAgICAgLCB0ZWFzOiBbICdjaGFpJywgJ21hdGNoYScsIHsgdGVhOiAna29uYWNoYScgfSBdXG4gICAqICAgICB9O1xuXG4gICAqICAgICBleHBlY3QoZGVlcE9iaikudG8uaGF2ZS5kZWVwLnByb3BlcnR5KCdncmVlbi50ZWEnLCAnbWF0Y2hhJyk7XG4gICAqICAgICBleHBlY3QoZGVlcE9iaikudG8uaGF2ZS5kZWVwLnByb3BlcnR5KCd0ZWFzWzFdJywgJ21hdGNoYScpO1xuICAgKiAgICAgZXhwZWN0KGRlZXBPYmopLnRvLmhhdmUuZGVlcC5wcm9wZXJ0eSgndGVhc1syXS50ZWEnLCAna29uYWNoYScpO1xuICAgKlxuICAgKiBZb3UgY2FuIGFsc28gdXNlIGFuIGFycmF5IGFzIHRoZSBzdGFydGluZyBwb2ludCBvZiBhIGBkZWVwLnByb3BlcnR5YFxuICAgKiBhc3NlcnRpb24sIG9yIHRyYXZlcnNlIG5lc3RlZCBhcnJheXMuXG4gICAqXG4gICAqICAgICB2YXIgYXJyID0gW1xuICAgKiAgICAgICAgIFsgJ2NoYWknLCAnbWF0Y2hhJywgJ2tvbmFjaGEnIF1cbiAgICogICAgICAgLCBbIHsgdGVhOiAnY2hhaScgfVxuICAgKiAgICAgICAgICwgeyB0ZWE6ICdtYXRjaGEnIH1cbiAgICogICAgICAgICAsIHsgdGVhOiAna29uYWNoYScgfSBdXG4gICAqICAgICBdO1xuICAgKlxuICAgKiAgICAgZXhwZWN0KGFycikudG8uaGF2ZS5kZWVwLnByb3BlcnR5KCdbMF1bMV0nLCAnbWF0Y2hhJyk7XG4gICAqICAgICBleHBlY3QoYXJyKS50by5oYXZlLmRlZXAucHJvcGVydHkoJ1sxXVsyXS50ZWEnLCAna29uYWNoYScpO1xuICAgKlxuICAgKiBGdXJ0aGVybW9yZSwgYHByb3BlcnR5YCBjaGFuZ2VzIHRoZSBzdWJqZWN0IG9mIHRoZSBhc3NlcnRpb25cbiAgICogdG8gYmUgdGhlIHZhbHVlIG9mIHRoYXQgcHJvcGVydHkgZnJvbSB0aGUgb3JpZ2luYWwgb2JqZWN0LiBUaGlzXG4gICAqIHBlcm1pdHMgZm9yIGZ1cnRoZXIgY2hhaW5hYmxlIGFzc2VydGlvbnMgb24gdGhhdCBwcm9wZXJ0eS5cbiAgICpcbiAgICogICAgIGV4cGVjdChvYmopLnRvLmhhdmUucHJvcGVydHkoJ2ZvbycpXG4gICAqICAgICAgIC50aGF0LmlzLmEoJ3N0cmluZycpO1xuICAgKiAgICAgZXhwZWN0KGRlZXBPYmopLnRvLmhhdmUucHJvcGVydHkoJ2dyZWVuJylcbiAgICogICAgICAgLnRoYXQuaXMuYW4oJ29iamVjdCcpXG4gICAqICAgICAgIC50aGF0LmRlZXAuZXF1YWxzKHsgdGVhOiAnbWF0Y2hhJyB9KTtcbiAgICogICAgIGV4cGVjdChkZWVwT2JqKS50by5oYXZlLnByb3BlcnR5KCd0ZWFzJylcbiAgICogICAgICAgLnRoYXQuaXMuYW4oJ2FycmF5JylcbiAgICogICAgICAgLndpdGguZGVlcC5wcm9wZXJ0eSgnWzJdJylcbiAgICogICAgICAgICAudGhhdC5kZWVwLmVxdWFscyh7IHRlYTogJ2tvbmFjaGEnIH0pO1xuICAgKlxuICAgKiBAbmFtZSBwcm9wZXJ0eVxuICAgKiBAYWxpYXMgZGVlcC5wcm9wZXJ0eVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZSAob3B0aW9uYWwpXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIF9vcHRpb25hbF9cbiAgICogQHJldHVybnMgdmFsdWUgb2YgcHJvcGVydHkgZm9yIGNoYWluaW5nXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ3Byb3BlcnR5JywgZnVuY3Rpb24gKG5hbWUsIHZhbCwgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG5cbiAgICB2YXIgZGVzY3JpcHRvciA9IGZsYWcodGhpcywgJ2RlZXAnKSA/ICdkZWVwIHByb3BlcnR5ICcgOiAncHJvcGVydHkgJ1xuICAgICAgLCBuZWdhdGUgPSBmbGFnKHRoaXMsICduZWdhdGUnKVxuICAgICAgLCBvYmogPSBmbGFnKHRoaXMsICdvYmplY3QnKVxuICAgICAgLCB2YWx1ZSA9IGZsYWcodGhpcywgJ2RlZXAnKVxuICAgICAgICA/IF8uZ2V0UGF0aFZhbHVlKG5hbWUsIG9iailcbiAgICAgICAgOiBvYmpbbmFtZV07XG5cbiAgICBpZiAobmVnYXRlICYmIHVuZGVmaW5lZCAhPT0gdmFsKSB7XG4gICAgICBpZiAodW5kZWZpbmVkID09PSB2YWx1ZSkge1xuICAgICAgICBtc2cgPSAobXNnICE9IG51bGwpID8gbXNnICsgJzogJyA6ICcnO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobXNnICsgXy5pbnNwZWN0KG9iaikgKyAnIGhhcyBubyAnICsgZGVzY3JpcHRvciArIF8uaW5zcGVjdChuYW1lKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAgIHVuZGVmaW5lZCAhPT0gdmFsdWVcbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBoYXZlIGEgJyArIGRlc2NyaXB0b3IgKyBfLmluc3BlY3QobmFtZSlcbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgaGF2ZSAnICsgZGVzY3JpcHRvciArIF8uaW5zcGVjdChuYW1lKSk7XG4gICAgfVxuXG4gICAgaWYgKHVuZGVmaW5lZCAhPT0gdmFsKSB7XG4gICAgICB0aGlzLmFzc2VydChcbiAgICAgICAgICB2YWwgPT09IHZhbHVlXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gaGF2ZSBhICcgKyBkZXNjcmlwdG9yICsgXy5pbnNwZWN0KG5hbWUpICsgJyBvZiAje2V4cH0sIGJ1dCBnb3QgI3thY3R9J1xuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBoYXZlIGEgJyArIGRlc2NyaXB0b3IgKyBfLmluc3BlY3QobmFtZSkgKyAnIG9mICN7YWN0fSdcbiAgICAgICAgLCB2YWxcbiAgICAgICAgLCB2YWx1ZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBmbGFnKHRoaXMsICdvYmplY3QnLCB2YWx1ZSk7XG4gIH0pO1xuXG5cbiAgLyoqXG4gICAqICMjIyAub3duUHJvcGVydHkobmFtZSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgaGFzIGFuIG93biBwcm9wZXJ0eSBgbmFtZWAuXG4gICAqXG4gICAqICAgICBleHBlY3QoJ3Rlc3QnKS50by5oYXZlLm93blByb3BlcnR5KCdsZW5ndGgnKTtcbiAgICpcbiAgICogQG5hbWUgb3duUHJvcGVydHlcbiAgICogQGFsaWFzIGhhdmVPd25Qcm9wZXJ0eVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBfb3B0aW9uYWxfXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFzc2VydE93blByb3BlcnR5IChuYW1lLCBtc2cpIHtcbiAgICBpZiAobXNnKSBmbGFnKHRoaXMsICdtZXNzYWdlJywgbXNnKTtcbiAgICB2YXIgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0Jyk7XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICAgIG9iai5oYXNPd25Qcm9wZXJ0eShuYW1lKVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBoYXZlIG93biBwcm9wZXJ0eSAnICsgXy5pbnNwZWN0KG5hbWUpXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBoYXZlIG93biBwcm9wZXJ0eSAnICsgXy5pbnNwZWN0KG5hbWUpXG4gICAgKTtcbiAgfVxuXG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ293blByb3BlcnR5JywgYXNzZXJ0T3duUHJvcGVydHkpO1xuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdoYXZlT3duUHJvcGVydHknLCBhc3NlcnRPd25Qcm9wZXJ0eSk7XG5cbiAgLyoqXG4gICAqICMjIyAubGVuZ3RoKHZhbHVlKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCdzIGBsZW5ndGhgIHByb3BlcnR5IGhhc1xuICAgKiB0aGUgZXhwZWN0ZWQgdmFsdWUuXG4gICAqXG4gICAqICAgICBleHBlY3QoWyAxLCAyLCAzXSkudG8uaGF2ZS5sZW5ndGgoMyk7XG4gICAqICAgICBleHBlY3QoJ2Zvb2JhcicpLnRvLmhhdmUubGVuZ3RoKDYpO1xuICAgKlxuICAgKiBDYW4gYWxzbyBiZSB1c2VkIGFzIGEgY2hhaW4gcHJlY3Vyc29yIHRvIGEgdmFsdWVcbiAgICogY29tcGFyaXNvbiBmb3IgdGhlIGxlbmd0aCBwcm9wZXJ0eS5cbiAgICpcbiAgICogICAgIGV4cGVjdCgnZm9vJykudG8uaGF2ZS5sZW5ndGguYWJvdmUoMik7XG4gICAqICAgICBleHBlY3QoWyAxLCAyLCAzIF0pLnRvLmhhdmUubGVuZ3RoLmFib3ZlKDIpO1xuICAgKiAgICAgZXhwZWN0KCdmb28nKS50by5oYXZlLmxlbmd0aC5iZWxvdyg0KTtcbiAgICogICAgIGV4cGVjdChbIDEsIDIsIDMgXSkudG8uaGF2ZS5sZW5ndGguYmVsb3coNCk7XG4gICAqICAgICBleHBlY3QoJ2ZvbycpLnRvLmhhdmUubGVuZ3RoLndpdGhpbigyLDQpO1xuICAgKiAgICAgZXhwZWN0KFsgMSwgMiwgMyBdKS50by5oYXZlLmxlbmd0aC53aXRoaW4oMiw0KTtcbiAgICpcbiAgICogQG5hbWUgbGVuZ3RoXG4gICAqIEBhbGlhcyBsZW5ndGhPZlxuICAgKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIF9vcHRpb25hbF9cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gYXNzZXJ0TGVuZ3RoQ2hhaW4gKCkge1xuICAgIGZsYWcodGhpcywgJ2RvTGVuZ3RoJywgdHJ1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBhc3NlcnRMZW5ndGggKG4sIG1zZykge1xuICAgIGlmIChtc2cpIGZsYWcodGhpcywgJ21lc3NhZ2UnLCBtc2cpO1xuICAgIHZhciBvYmogPSBmbGFnKHRoaXMsICdvYmplY3QnKTtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnKS50by5oYXZlLnByb3BlcnR5KCdsZW5ndGgnKTtcbiAgICB2YXIgbGVuID0gb2JqLmxlbmd0aDtcblxuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICBsZW4gPT0gblxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBoYXZlIGEgbGVuZ3RoIG9mICN7ZXhwfSBidXQgZ290ICN7YWN0fSdcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IGhhdmUgYSBsZW5ndGggb2YgI3thY3R9J1xuICAgICAgLCBuXG4gICAgICAsIGxlblxuICAgICk7XG4gIH1cblxuICBBc3NlcnRpb24uYWRkQ2hhaW5hYmxlTWV0aG9kKCdsZW5ndGgnLCBhc3NlcnRMZW5ndGgsIGFzc2VydExlbmd0aENoYWluKTtcbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnbGVuZ3RoT2YnLCBhc3NlcnRMZW5ndGgsIGFzc2VydExlbmd0aENoYWluKTtcblxuICAvKipcbiAgICogIyMjIC5tYXRjaChyZWdleHApXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgdGFyZ2V0IG1hdGNoZXMgYSByZWd1bGFyIGV4cHJlc3Npb24uXG4gICAqXG4gICAqICAgICBleHBlY3QoJ2Zvb2JhcicpLnRvLm1hdGNoKC9eZm9vLyk7XG4gICAqXG4gICAqIEBuYW1lIG1hdGNoXG4gICAqIEBwYXJhbSB7UmVnRXhwfSBSZWd1bGFyRXhwcmVzc2lvblxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBfb3B0aW9uYWxfXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ21hdGNoJywgZnVuY3Rpb24gKHJlLCBtc2cpIHtcbiAgICBpZiAobXNnKSBmbGFnKHRoaXMsICdtZXNzYWdlJywgbXNnKTtcbiAgICB2YXIgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0Jyk7XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICAgIHJlLmV4ZWMob2JqKVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBtYXRjaCAnICsgcmVcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gbm90IHRvIG1hdGNoICcgKyByZVxuICAgICk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAjIyMgLnN0cmluZyhzdHJpbmcpXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgc3RyaW5nIHRhcmdldCBjb250YWlucyBhbm90aGVyIHN0cmluZy5cbiAgICpcbiAgICogICAgIGV4cGVjdCgnZm9vYmFyJykudG8uaGF2ZS5zdHJpbmcoJ2JhcicpO1xuICAgKlxuICAgKiBAbmFtZSBzdHJpbmdcbiAgICogQHBhcmFtIHtTdHJpbmd9IHN0cmluZ1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBfb3B0aW9uYWxfXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ3N0cmluZycsIGZ1bmN0aW9uIChzdHIsIG1zZykge1xuICAgIGlmIChtc2cpIGZsYWcodGhpcywgJ21lc3NhZ2UnLCBtc2cpO1xuICAgIHZhciBvYmogPSBmbGFnKHRoaXMsICdvYmplY3QnKTtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnKS5pcy5hKCdzdHJpbmcnKTtcblxuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICB+b2JqLmluZGV4T2Yoc3RyKVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBjb250YWluICcgKyBfLmluc3BlY3Qoc3RyKVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgY29udGFpbiAnICsgXy5pbnNwZWN0KHN0cilcbiAgICApO1xuICB9KTtcblxuXG4gIC8qKlxuICAgKiAjIyMgLmtleXMoa2V5MSwgW2tleTJdLCBbLi4uXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSB0YXJnZXQgaGFzIGV4YWN0bHkgdGhlIGdpdmVuIGtleXMsIG9yXG4gICAqIGFzc2VydHMgdGhlIGluY2x1c2lvbiBvZiBzb21lIGtleXMgd2hlbiB1c2luZyB0aGVcbiAgICogYGluY2x1ZGVgIG9yIGBjb250YWluYCBtb2RpZmllcnMuXG4gICAqXG4gICAqICAgICBleHBlY3QoeyBmb286IDEsIGJhcjogMiB9KS50by5oYXZlLmtleXMoWydmb28nLCAnYmFyJ10pO1xuICAgKiAgICAgZXhwZWN0KHsgZm9vOiAxLCBiYXI6IDIsIGJhejogMyB9KS50by5jb250YWluLmtleXMoJ2ZvbycsICdiYXInKTtcbiAgICpcbiAgICogQG5hbWUga2V5c1xuICAgKiBAYWxpYXMga2V5XG4gICAqIEBwYXJhbSB7U3RyaW5nLi4ufEFycmF5fSBrZXlzXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFzc2VydEtleXMgKGtleXMpIHtcbiAgICB2YXIgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0JylcbiAgICAgICwgc3RyXG4gICAgICAsIG9rID0gdHJ1ZTtcblxuICAgIGtleXMgPSBrZXlzIGluc3RhbmNlb2YgQXJyYXlcbiAgICAgID8ga2V5c1xuICAgICAgOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXG4gICAgaWYgKCFrZXlzLmxlbmd0aCkgdGhyb3cgbmV3IEVycm9yKCdrZXlzIHJlcXVpcmVkJyk7XG5cbiAgICB2YXIgYWN0dWFsID0gT2JqZWN0LmtleXMob2JqKVxuICAgICAgLCBsZW4gPSBrZXlzLmxlbmd0aDtcblxuICAgIC8vIEluY2x1c2lvblxuICAgIG9rID0ga2V5cy5ldmVyeShmdW5jdGlvbihrZXkpe1xuICAgICAgcmV0dXJuIH5hY3R1YWwuaW5kZXhPZihrZXkpO1xuICAgIH0pO1xuXG4gICAgLy8gU3RyaWN0XG4gICAgaWYgKCFmbGFnKHRoaXMsICduZWdhdGUnKSAmJiAhZmxhZyh0aGlzLCAnY29udGFpbnMnKSkge1xuICAgICAgb2sgPSBvayAmJiBrZXlzLmxlbmd0aCA9PSBhY3R1YWwubGVuZ3RoO1xuICAgIH1cblxuICAgIC8vIEtleSBzdHJpbmdcbiAgICBpZiAobGVuID4gMSkge1xuICAgICAga2V5cyA9IGtleXMubWFwKGZ1bmN0aW9uKGtleSl7XG4gICAgICAgIHJldHVybiBfLmluc3BlY3Qoa2V5KTtcbiAgICAgIH0pO1xuICAgICAgdmFyIGxhc3QgPSBrZXlzLnBvcCgpO1xuICAgICAgc3RyID0ga2V5cy5qb2luKCcsICcpICsgJywgYW5kICcgKyBsYXN0O1xuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSBfLmluc3BlY3Qoa2V5c1swXSk7XG4gICAgfVxuXG4gICAgLy8gRm9ybVxuICAgIHN0ciA9IChsZW4gPiAxID8gJ2tleXMgJyA6ICdrZXkgJykgKyBzdHI7XG5cbiAgICAvLyBIYXZlIC8gaW5jbHVkZVxuICAgIHN0ciA9IChmbGFnKHRoaXMsICdjb250YWlucycpID8gJ2NvbnRhaW4gJyA6ICdoYXZlICcpICsgc3RyO1xuXG4gICAgLy8gQXNzZXJ0aW9uXG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICAgIG9rXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvICcgKyBzdHJcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90ICcgKyBzdHJcbiAgICApO1xuICB9XG5cbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgna2V5cycsIGFzc2VydEtleXMpO1xuICBBc3NlcnRpb24uYWRkTWV0aG9kKCdrZXknLCBhc3NlcnRLZXlzKTtcblxuICAvKipcbiAgICogIyMjIC50aHJvdyhjb25zdHJ1Y3RvcilcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IHRoZSBmdW5jdGlvbiB0YXJnZXQgd2lsbCB0aHJvdyBhIHNwZWNpZmljIGVycm9yLCBvciBzcGVjaWZpYyB0eXBlIG9mIGVycm9yXG4gICAqIChhcyBkZXRlcm1pbmVkIHVzaW5nIGBpbnN0YW5jZW9mYCksIG9wdGlvbmFsbHkgd2l0aCBhIFJlZ0V4cCBvciBzdHJpbmcgaW5jbHVzaW9uIHRlc3RcbiAgICogZm9yIHRoZSBlcnJvcidzIG1lc3NhZ2UuXG4gICAqXG4gICAqICAgICB2YXIgZXJyID0gbmV3IFJlZmVyZW5jZUVycm9yKCdUaGlzIGlzIGEgYmFkIGZ1bmN0aW9uLicpO1xuICAgKiAgICAgdmFyIGZuID0gZnVuY3Rpb24gKCkgeyB0aHJvdyBlcnI7IH1cbiAgICogICAgIGV4cGVjdChmbikudG8udGhyb3coUmVmZXJlbmNlRXJyb3IpO1xuICAgKiAgICAgZXhwZWN0KGZuKS50by50aHJvdyhFcnJvcik7XG4gICAqICAgICBleHBlY3QoZm4pLnRvLnRocm93KC9iYWQgZnVuY3Rpb24vKTtcbiAgICogICAgIGV4cGVjdChmbikudG8ubm90LnRocm93KCdnb29kIGZ1bmN0aW9uJyk7XG4gICAqICAgICBleHBlY3QoZm4pLnRvLnRocm93KFJlZmVyZW5jZUVycm9yLCAvYmFkIGZ1bmN0aW9uLyk7XG4gICAqICAgICBleHBlY3QoZm4pLnRvLnRocm93KGVycik7XG4gICAqICAgICBleHBlY3QoZm4pLnRvLm5vdC50aHJvdyhuZXcgUmFuZ2VFcnJvcignT3V0IG9mIHJhbmdlLicpKTtcbiAgICpcbiAgICogUGxlYXNlIG5vdGUgdGhhdCB3aGVuIGEgdGhyb3cgZXhwZWN0YXRpb24gaXMgbmVnYXRlZCwgaXQgd2lsbCBjaGVjayBlYWNoXG4gICAqIHBhcmFtZXRlciBpbmRlcGVuZGVudGx5LCBzdGFydGluZyB3aXRoIGVycm9yIGNvbnN0cnVjdG9yIHR5cGUuIFRoZSBhcHByb3ByaWF0ZSB3YXlcbiAgICogdG8gY2hlY2sgZm9yIHRoZSBleGlzdGVuY2Ugb2YgYSB0eXBlIG9mIGVycm9yIGJ1dCBmb3IgYSBtZXNzYWdlIHRoYXQgZG9lcyBub3QgbWF0Y2hcbiAgICogaXMgdG8gdXNlIGBhbmRgLlxuICAgKlxuICAgKiAgICAgZXhwZWN0KGZuKS50by50aHJvdyhSZWZlcmVuY2VFcnJvcilcbiAgICogICAgICAgIC5hbmQubm90LnRocm93KC9nb29kIGZ1bmN0aW9uLyk7XG4gICAqXG4gICAqIEBuYW1lIHRocm93XG4gICAqIEBhbGlhcyB0aHJvd3NcbiAgICogQGFsaWFzIFRocm93XG4gICAqIEBwYXJhbSB7RXJyb3JDb25zdHJ1Y3Rvcn0gY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBleHBlY3RlZCBlcnJvciBtZXNzYWdlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIF9vcHRpb25hbF9cbiAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9FcnJvciNFcnJvcl90eXBlc1xuICAgKiBAcmV0dXJucyBlcnJvciBmb3IgY2hhaW5pbmcgKG51bGwgaWYgbm8gZXJyb3IpXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFzc2VydFRocm93cyAoY29uc3RydWN0b3IsIGVyck1zZywgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG4gICAgdmFyIG9iaiA9IGZsYWcodGhpcywgJ29iamVjdCcpO1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBtc2cpLmlzLmEoJ2Z1bmN0aW9uJyk7XG5cbiAgICB2YXIgdGhyb3duID0gZmFsc2VcbiAgICAgICwgZGVzaXJlZEVycm9yID0gbnVsbFxuICAgICAgLCBuYW1lID0gbnVsbFxuICAgICAgLCB0aHJvd25FcnJvciA9IG51bGw7XG5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgZXJyTXNnID0gbnVsbDtcbiAgICAgIGNvbnN0cnVjdG9yID0gbnVsbDtcbiAgICB9IGVsc2UgaWYgKGNvbnN0cnVjdG9yICYmIChjb25zdHJ1Y3RvciBpbnN0YW5jZW9mIFJlZ0V4cCB8fCAnc3RyaW5nJyA9PT0gdHlwZW9mIGNvbnN0cnVjdG9yKSkge1xuICAgICAgZXJyTXNnID0gY29uc3RydWN0b3I7XG4gICAgICBjb25zdHJ1Y3RvciA9IG51bGw7XG4gICAgfSBlbHNlIGlmIChjb25zdHJ1Y3RvciAmJiBjb25zdHJ1Y3RvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICBkZXNpcmVkRXJyb3IgPSBjb25zdHJ1Y3RvcjtcbiAgICAgIGNvbnN0cnVjdG9yID0gbnVsbDtcbiAgICAgIGVyck1zZyA9IG51bGw7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29uc3RydWN0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG5hbWUgPSBjb25zdHJ1Y3Rvci5wcm90b3R5cGUubmFtZSB8fCBjb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgaWYgKG5hbWUgPT09ICdFcnJvcicgJiYgY29uc3RydWN0b3IgIT09IEVycm9yKSB7XG4gICAgICAgIG5hbWUgPSAobmV3IGNvbnN0cnVjdG9yKCkpLm5hbWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0cnVjdG9yID0gbnVsbDtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgb2JqKCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAvLyBmaXJzdCwgY2hlY2sgZGVzaXJlZCBlcnJvclxuICAgICAgaWYgKGRlc2lyZWRFcnJvcikge1xuICAgICAgICB0aGlzLmFzc2VydChcbiAgICAgICAgICAgIGVyciA9PT0gZGVzaXJlZEVycm9yXG4gICAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byB0aHJvdyAje2V4cH0gYnV0ICN7YWN0fSB3YXMgdGhyb3duJ1xuICAgICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IHRocm93ICN7ZXhwfSdcbiAgICAgICAgICAsIChkZXNpcmVkRXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGRlc2lyZWRFcnJvci50b1N0cmluZygpIDogZGVzaXJlZEVycm9yKVxuICAgICAgICAgICwgKGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLnRvU3RyaW5nKCkgOiBlcnIpXG4gICAgICAgICk7XG5cbiAgICAgICAgZmxhZyh0aGlzLCAnb2JqZWN0JywgZXJyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIG5leHQsIGNoZWNrIGNvbnN0cnVjdG9yXG4gICAgICBpZiAoY29uc3RydWN0b3IpIHtcbiAgICAgICAgdGhpcy5hc3NlcnQoXG4gICAgICAgICAgICBlcnIgaW5zdGFuY2VvZiBjb25zdHJ1Y3RvclxuICAgICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gdGhyb3cgI3tleHB9IGJ1dCAje2FjdH0gd2FzIHRocm93bidcbiAgICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCB0aHJvdyAje2V4cH0gYnV0ICN7YWN0fSB3YXMgdGhyb3duJ1xuICAgICAgICAgICwgbmFtZVxuICAgICAgICAgICwgKGVyciBpbnN0YW5jZW9mIEVycm9yID8gZXJyLnRvU3RyaW5nKCkgOiBlcnIpXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKCFlcnJNc2cpIHtcbiAgICAgICAgICBmbGFnKHRoaXMsICdvYmplY3QnLCBlcnIpO1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIG5leHQsIGNoZWNrIG1lc3NhZ2VcbiAgICAgIHZhciBtZXNzYWdlID0gJ29iamVjdCcgPT09IF8udHlwZShlcnIpICYmIFwibWVzc2FnZVwiIGluIGVyclxuICAgICAgICA/IGVyci5tZXNzYWdlXG4gICAgICAgIDogJycgKyBlcnI7XG5cbiAgICAgIGlmICgobWVzc2FnZSAhPSBudWxsKSAmJiBlcnJNc2cgJiYgZXJyTXNnIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAgICAgZXJyTXNnLmV4ZWMobWVzc2FnZSlcbiAgICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIHRocm93IGVycm9yIG1hdGNoaW5nICN7ZXhwfSBidXQgZ290ICN7YWN0fSdcbiAgICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIHRocm93IGVycm9yIG5vdCBtYXRjaGluZyAje2V4cH0nXG4gICAgICAgICAgLCBlcnJNc2dcbiAgICAgICAgICAsIG1lc3NhZ2VcbiAgICAgICAgKTtcblxuICAgICAgICBmbGFnKHRoaXMsICdvYmplY3QnLCBlcnIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0gZWxzZSBpZiAoKG1lc3NhZ2UgIT0gbnVsbCkgJiYgZXJyTXNnICYmICdzdHJpbmcnID09PSB0eXBlb2YgZXJyTXNnKSB7XG4gICAgICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAgICAgfm1lc3NhZ2UuaW5kZXhPZihlcnJNc2cpXG4gICAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byB0aHJvdyBlcnJvciBpbmNsdWRpbmcgI3tleHB9IGJ1dCBnb3QgI3thY3R9J1xuICAgICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gdGhyb3cgZXJyb3Igbm90IGluY2x1ZGluZyAje2FjdH0nXG4gICAgICAgICAgLCBlcnJNc2dcbiAgICAgICAgICAsIG1lc3NhZ2VcbiAgICAgICAgKTtcblxuICAgICAgICBmbGFnKHRoaXMsICdvYmplY3QnLCBlcnIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93biA9IHRydWU7XG4gICAgICAgIHRocm93bkVycm9yID0gZXJyO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBhY3R1YWxseUdvdCA9ICcnXG4gICAgICAsIGV4cGVjdGVkVGhyb3duID0gbmFtZSAhPT0gbnVsbFxuICAgICAgICA/IG5hbWVcbiAgICAgICAgOiBkZXNpcmVkRXJyb3JcbiAgICAgICAgICA/ICcje2V4cH0nIC8vXy5pbnNwZWN0KGRlc2lyZWRFcnJvcilcbiAgICAgICAgICA6ICdhbiBlcnJvcic7XG5cbiAgICBpZiAodGhyb3duKSB7XG4gICAgICBhY3R1YWxseUdvdCA9ICcgYnV0ICN7YWN0fSB3YXMgdGhyb3duJ1xuICAgIH1cblxuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICB0aHJvd24gPT09IHRydWVcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gdGhyb3cgJyArIGV4cGVjdGVkVGhyb3duICsgYWN0dWFsbHlHb3RcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IHRocm93ICcgKyBleHBlY3RlZFRocm93biArIGFjdHVhbGx5R290XG4gICAgICAsIChkZXNpcmVkRXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGRlc2lyZWRFcnJvci50b1N0cmluZygpIDogZGVzaXJlZEVycm9yKVxuICAgICAgLCAodGhyb3duRXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IHRocm93bkVycm9yLnRvU3RyaW5nKCkgOiB0aHJvd25FcnJvcilcbiAgICApO1xuXG4gICAgZmxhZyh0aGlzLCAnb2JqZWN0JywgdGhyb3duRXJyb3IpO1xuICB9O1xuXG4gIEFzc2VydGlvbi5hZGRNZXRob2QoJ3Rocm93JywgYXNzZXJ0VGhyb3dzKTtcbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgndGhyb3dzJywgYXNzZXJ0VGhyb3dzKTtcbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnVGhyb3cnLCBhc3NlcnRUaHJvd3MpO1xuXG4gIC8qKlxuICAgKiAjIyMgLnJlc3BvbmRUbyhtZXRob2QpXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCB0aGUgb2JqZWN0IG9yIGNsYXNzIHRhcmdldCB3aWxsIHJlc3BvbmQgdG8gYSBtZXRob2QuXG4gICAqXG4gICAqICAgICBLbGFzcy5wcm90b3R5cGUuYmFyID0gZnVuY3Rpb24oKXt9O1xuICAgKiAgICAgZXhwZWN0KEtsYXNzKS50by5yZXNwb25kVG8oJ2JhcicpO1xuICAgKiAgICAgZXhwZWN0KG9iaikudG8ucmVzcG9uZFRvKCdiYXInKTtcbiAgICpcbiAgICogVG8gY2hlY2sgaWYgYSBjb25zdHJ1Y3RvciB3aWxsIHJlc3BvbmQgdG8gYSBzdGF0aWMgZnVuY3Rpb24sXG4gICAqIHNldCB0aGUgYGl0c2VsZmAgZmxhZy5cbiAgICpcbiAgICogICAgIEtsYXNzLmJheiA9IGZ1bmN0aW9uKCl7fTtcbiAgICogICAgIGV4cGVjdChLbGFzcykuaXRzZWxmLnRvLnJlc3BvbmRUbygnYmF6Jyk7XG4gICAqXG4gICAqIEBuYW1lIHJlc3BvbmRUb1xuICAgKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIF9vcHRpb25hbF9cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgncmVzcG9uZFRvJywgZnVuY3Rpb24gKG1ldGhvZCwgbXNnKSB7XG4gICAgaWYgKG1zZykgZmxhZyh0aGlzLCAnbWVzc2FnZScsIG1zZyk7XG4gICAgdmFyIG9iaiA9IGZsYWcodGhpcywgJ29iamVjdCcpXG4gICAgICAsIGl0c2VsZiA9IGZsYWcodGhpcywgJ2l0c2VsZicpXG4gICAgICAsIGNvbnRleHQgPSAoJ2Z1bmN0aW9uJyA9PT0gXy50eXBlKG9iaikgJiYgIWl0c2VsZilcbiAgICAgICAgPyBvYmoucHJvdG90eXBlW21ldGhvZF1cbiAgICAgICAgOiBvYmpbbWV0aG9kXTtcblxuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAnZnVuY3Rpb24nID09PSB0eXBlb2YgY29udGV4dFxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byByZXNwb25kIHRvICcgKyBfLmluc3BlY3QobWV0aG9kKVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgcmVzcG9uZCB0byAnICsgXy5pbnNwZWN0KG1ldGhvZClcbiAgICApO1xuICB9KTtcblxuICAvKipcbiAgICogIyMjIC5pdHNlbGZcbiAgICpcbiAgICogU2V0cyB0aGUgYGl0c2VsZmAgZmxhZywgbGF0ZXIgdXNlZCBieSB0aGUgYHJlc3BvbmRUb2AgYXNzZXJ0aW9uLlxuICAgKlxuICAgKiAgICAgZnVuY3Rpb24gRm9vKCkge31cbiAgICogICAgIEZvby5iYXIgPSBmdW5jdGlvbigpIHt9XG4gICAqICAgICBGb28ucHJvdG90eXBlLmJheiA9IGZ1bmN0aW9uKCkge31cbiAgICpcbiAgICogICAgIGV4cGVjdChGb28pLml0c2VsZi50by5yZXNwb25kVG8oJ2JhcicpO1xuICAgKiAgICAgZXhwZWN0KEZvbykuaXRzZWxmLm5vdC50by5yZXNwb25kVG8oJ2JheicpO1xuICAgKlxuICAgKiBAbmFtZSBpdHNlbGZcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZFByb3BlcnR5KCdpdHNlbGYnLCBmdW5jdGlvbiAoKSB7XG4gICAgZmxhZyh0aGlzLCAnaXRzZWxmJywgdHJ1ZSk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAjIyMgLnNhdGlzZnkobWV0aG9kKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBwYXNzZXMgYSBnaXZlbiB0cnV0aCB0ZXN0LlxuICAgKlxuICAgKiAgICAgZXhwZWN0KDEpLnRvLnNhdGlzZnkoZnVuY3Rpb24obnVtKSB7IHJldHVybiBudW0gPiAwOyB9KTtcbiAgICpcbiAgICogQG5hbWUgc2F0aXNmeVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBtYXRjaGVyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIF9vcHRpb25hbF9cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnc2F0aXNmeScsIGZ1bmN0aW9uIChtYXRjaGVyLCBtc2cpIHtcbiAgICBpZiAobXNnKSBmbGFnKHRoaXMsICdtZXNzYWdlJywgbXNnKTtcbiAgICB2YXIgb2JqID0gZmxhZyh0aGlzLCAnb2JqZWN0Jyk7XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICAgIG1hdGNoZXIob2JqKVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBzYXRpc2Z5ICcgKyBfLm9iakRpc3BsYXkobWF0Y2hlcilcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IHNhdGlzZnknICsgXy5vYmpEaXNwbGF5KG1hdGNoZXIpXG4gICAgICAsIHRoaXMubmVnYXRlID8gZmFsc2UgOiB0cnVlXG4gICAgICAsIG1hdGNoZXIob2JqKVxuICAgICk7XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAjIyMgLmNsb3NlVG8oZXhwZWN0ZWQsIGRlbHRhKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBlcXVhbCBgZXhwZWN0ZWRgLCB0byB3aXRoaW4gYSArLy0gYGRlbHRhYCByYW5nZS5cbiAgICpcbiAgICogICAgIGV4cGVjdCgxLjUpLnRvLmJlLmNsb3NlVG8oMSwgMC41KTtcbiAgICpcbiAgICogQG5hbWUgY2xvc2VUb1xuICAgKiBAcGFyYW0ge051bWJlcn0gZXhwZWN0ZWRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGRlbHRhXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIF9vcHRpb25hbF9cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnY2xvc2VUbycsIGZ1bmN0aW9uIChleHBlY3RlZCwgZGVsdGEsIG1zZykge1xuICAgIGlmIChtc2cpIGZsYWcodGhpcywgJ21lc3NhZ2UnLCBtc2cpO1xuICAgIHZhciBvYmogPSBmbGFnKHRoaXMsICdvYmplY3QnKTtcbiAgICB0aGlzLmFzc2VydChcbiAgICAgICAgTWF0aC5hYnMob2JqIC0gZXhwZWN0ZWQpIDw9IGRlbHRhXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGJlIGNsb3NlIHRvICcgKyBleHBlY3RlZCArICcgKy8tICcgKyBkZWx0YVxuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSBub3QgdG8gYmUgY2xvc2UgdG8gJyArIGV4cGVjdGVkICsgJyArLy0gJyArIGRlbHRhXG4gICAgKTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gaXNTdWJzZXRPZihzdWJzZXQsIHN1cGVyc2V0KSB7XG4gICAgcmV0dXJuIHN1YnNldC5ldmVyeShmdW5jdGlvbihlbGVtKSB7XG4gICAgICByZXR1cm4gc3VwZXJzZXQuaW5kZXhPZihlbGVtKSAhPT0gLTE7XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiAjIyMgLm1lbWJlcnMoc2V0KVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBhIHN1cGVyc2V0IG9mIGBzZXRgLFxuICAgKiBvciB0aGF0IHRoZSB0YXJnZXQgYW5kIGBzZXRgIGhhdmUgdGhlIHNhbWUgbWVtYmVycy5cbiAgICpcbiAgICogICAgIGV4cGVjdChbMSwgMiwgM10pLnRvLmluY2x1ZGUubWVtYmVycyhbMywgMl0pO1xuICAgKiAgICAgZXhwZWN0KFsxLCAyLCAzXSkudG8ubm90LmluY2x1ZGUubWVtYmVycyhbMywgMiwgOF0pO1xuICAgKlxuICAgKiAgICAgZXhwZWN0KFs0LCAyXSkudG8uaGF2ZS5tZW1iZXJzKFsyLCA0XSk7XG4gICAqICAgICBleHBlY3QoWzUsIDJdKS50by5ub3QuaGF2ZS5tZW1iZXJzKFs1LCAyLCAxXSk7XG4gICAqXG4gICAqIEBuYW1lIG1lbWJlcnNcbiAgICogQHBhcmFtIHtBcnJheX0gc2V0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIF9vcHRpb25hbF9cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgQXNzZXJ0aW9uLmFkZE1ldGhvZCgnbWVtYmVycycsIGZ1bmN0aW9uIChzdWJzZXQsIG1zZykge1xuICAgIGlmIChtc2cpIGZsYWcodGhpcywgJ21lc3NhZ2UnLCBtc2cpO1xuICAgIHZhciBvYmogPSBmbGFnKHRoaXMsICdvYmplY3QnKTtcblxuICAgIG5ldyBBc3NlcnRpb24ob2JqKS50by5iZS5hbignYXJyYXknKTtcbiAgICBuZXcgQXNzZXJ0aW9uKHN1YnNldCkudG8uYmUuYW4oJ2FycmF5Jyk7XG5cbiAgICBpZiAoZmxhZyh0aGlzLCAnY29udGFpbnMnKSkge1xuICAgICAgcmV0dXJuIHRoaXMuYXNzZXJ0KFxuICAgICAgICAgIGlzU3Vic2V0T2Yoc3Vic2V0LCBvYmopXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gYmUgYSBzdXBlcnNldCBvZiAje2FjdH0nXG4gICAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gbm90IGJlIGEgc3VwZXJzZXQgb2YgI3thY3R9J1xuICAgICAgICAsIG9ialxuICAgICAgICAsIHN1YnNldFxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLmFzc2VydChcbiAgICAgICAgaXNTdWJzZXRPZihvYmosIHN1YnNldCkgJiYgaXNTdWJzZXRPZihzdWJzZXQsIG9iailcbiAgICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBoYXZlIHRoZSBzYW1lIG1lbWJlcnMgYXMgI3thY3R9J1xuICAgICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBoYXZlIHRoZSBzYW1lIG1lbWJlcnMgYXMgI3thY3R9J1xuICAgICAgICAsIG9ialxuICAgICAgICAsIHN1YnNldFxuICAgICk7XG4gIH0pO1xufTtcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCIvaG9tZS9kb3N0b2RhYnNpL2NvZGUvYmFray9leHBlcmltZW50LXRlbXBsYXRlL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvY29yZS9hc3NlcnRpb25zLmpzXCIsXCIvLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvY29yZVwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbi8qIVxuICogY2hhaVxuICogQ29weXJpZ2h0KGMpIDIwMTEtMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY2hhaSwgdXRpbCkge1xuXG4gIC8qIVxuICAgKiBDaGFpIGRlcGVuZGVuY2llcy5cbiAgICovXG5cbiAgdmFyIEFzc2VydGlvbiA9IGNoYWkuQXNzZXJ0aW9uXG4gICAgLCBmbGFnID0gdXRpbC5mbGFnO1xuXG4gIC8qIVxuICAgKiBNb2R1bGUgZXhwb3J0LlxuICAgKi9cblxuICAvKipcbiAgICogIyMjIGFzc2VydChleHByZXNzaW9uLCBtZXNzYWdlKVxuICAgKlxuICAgKiBXcml0ZSB5b3VyIG93biB0ZXN0IGV4cHJlc3Npb25zLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0KCdmb28nICE9PSAnYmFyJywgJ2ZvbyBpcyBub3QgYmFyJyk7XG4gICAqICAgICBhc3NlcnQoQXJyYXkuaXNBcnJheShbXSksICdlbXB0eSBhcnJheXMgYXJlIGFycmF5cycpO1xuICAgKlxuICAgKiBAcGFyYW0ge01peGVkfSBleHByZXNzaW9uIHRvIHRlc3QgZm9yIHRydXRoaW5lc3NcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgdG8gZGlzcGxheSBvbiBlcnJvclxuICAgKiBAbmFtZSBhc3NlcnRcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgdmFyIGFzc2VydCA9IGNoYWkuYXNzZXJ0ID0gZnVuY3Rpb24gKGV4cHJlc3MsIGVycm1zZykge1xuICAgIHZhciB0ZXN0ID0gbmV3IEFzc2VydGlvbihudWxsKTtcbiAgICB0ZXN0LmFzc2VydChcbiAgICAgICAgZXhwcmVzc1xuICAgICAgLCBlcnJtc2dcbiAgICAgICwgJ1sgbmVnYXRpb24gbWVzc2FnZSB1bmF2YWlsYWJsZSBdJ1xuICAgICk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuZmFpbChhY3R1YWwsIGV4cGVjdGVkLCBbbWVzc2FnZV0sIFtvcGVyYXRvcl0pXG4gICAqXG4gICAqIFRocm93IGEgZmFpbHVyZS4gTm9kZS5qcyBgYXNzZXJ0YCBtb2R1bGUtY29tcGF0aWJsZS5cbiAgICpcbiAgICogQG5hbWUgZmFpbFxuICAgKiBAcGFyYW0ge01peGVkfSBhY3R1YWxcbiAgICogQHBhcmFtIHtNaXhlZH0gZXhwZWN0ZWRcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQHBhcmFtIHtTdHJpbmd9IG9wZXJhdG9yXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5mYWlsID0gZnVuY3Rpb24gKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsIG9wZXJhdG9yKSB7XG4gICAgbWVzc2FnZSA9IG1lc3NhZ2UgfHwgJ2Fzc2VydC5mYWlsKCknO1xuICAgIHRocm93IG5ldyBjaGFpLkFzc2VydGlvbkVycm9yKG1lc3NhZ2UsIHtcbiAgICAgICAgYWN0dWFsOiBhY3R1YWxcbiAgICAgICwgZXhwZWN0ZWQ6IGV4cGVjdGVkXG4gICAgICAsIG9wZXJhdG9yOiBvcGVyYXRvclxuICAgIH0sIGFzc2VydC5mYWlsKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5vayhvYmplY3QsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBvYmplY3RgIGlzIHRydXRoeS5cbiAgICpcbiAgICogICAgIGFzc2VydC5vaygnZXZlcnl0aGluZycsICdldmVyeXRoaW5nIGlzIG9rJyk7XG4gICAqICAgICBhc3NlcnQub2soZmFsc2UsICd0aGlzIHdpbGwgZmFpbCcpO1xuICAgKlxuICAgKiBAbmFtZSBva1xuICAgKiBAcGFyYW0ge01peGVkfSBvYmplY3QgdG8gdGVzdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQub2sgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnKS5pcy5vaztcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5ub3RPayhvYmplY3QsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBvYmplY3RgIGlzIGZhbHN5LlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm5vdE9rKCdldmVyeXRoaW5nJywgJ3RoaXMgd2lsbCBmYWlsJyk7XG4gICAqICAgICBhc3NlcnQubm90T2soZmFsc2UsICd0aGlzIHdpbGwgcGFzcycpO1xuICAgKlxuICAgKiBAbmFtZSBub3RPa1xuICAgKiBAcGFyYW0ge01peGVkfSBvYmplY3QgdG8gdGVzdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQubm90T2sgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnKS5pcy5ub3Qub2s7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuZXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIG5vbi1zdHJpY3QgZXF1YWxpdHkgKGA9PWApIG9mIGBhY3R1YWxgIGFuZCBgZXhwZWN0ZWRgLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LmVxdWFsKDMsICczJywgJz09IGNvZXJjZXMgdmFsdWVzIHRvIHN0cmluZ3MnKTtcbiAgICpcbiAgICogQG5hbWUgZXF1YWxcbiAgICogQHBhcmFtIHtNaXhlZH0gYWN0dWFsXG4gICAqIEBwYXJhbSB7TWl4ZWR9IGV4cGVjdGVkXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5lcXVhbCA9IGZ1bmN0aW9uIChhY3QsIGV4cCwgbXNnKSB7XG4gICAgdmFyIHRlc3QgPSBuZXcgQXNzZXJ0aW9uKGFjdCwgbXNnKTtcblxuICAgIHRlc3QuYXNzZXJ0KFxuICAgICAgICBleHAgPT0gZmxhZyh0ZXN0LCAnb2JqZWN0JylcbiAgICAgICwgJ2V4cGVjdGVkICN7dGhpc30gdG8gZXF1YWwgI3tleHB9J1xuICAgICAgLCAnZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgZXF1YWwgI3thY3R9J1xuICAgICAgLCBleHBcbiAgICAgICwgYWN0XG4gICAgKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5ub3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgbm9uLXN0cmljdCBpbmVxdWFsaXR5IChgIT1gKSBvZiBgYWN0dWFsYCBhbmQgYGV4cGVjdGVkYC5cbiAgICpcbiAgICogICAgIGFzc2VydC5ub3RFcXVhbCgzLCA0LCAndGhlc2UgbnVtYmVycyBhcmUgbm90IGVxdWFsJyk7XG4gICAqXG4gICAqIEBuYW1lIG5vdEVxdWFsXG4gICAqIEBwYXJhbSB7TWl4ZWR9IGFjdHVhbFxuICAgKiBAcGFyYW0ge01peGVkfSBleHBlY3RlZFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQubm90RXF1YWwgPSBmdW5jdGlvbiAoYWN0LCBleHAsIG1zZykge1xuICAgIHZhciB0ZXN0ID0gbmV3IEFzc2VydGlvbihhY3QsIG1zZyk7XG5cbiAgICB0ZXN0LmFzc2VydChcbiAgICAgICAgZXhwICE9IGZsYWcodGVzdCwgJ29iamVjdCcpXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBlcXVhbCAje2V4cH0nXG4gICAgICAsICdleHBlY3RlZCAje3RoaXN9IHRvIGVxdWFsICN7YWN0fSdcbiAgICAgICwgZXhwXG4gICAgICAsIGFjdFxuICAgICk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuc3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHN0cmljdCBlcXVhbGl0eSAoYD09PWApIG9mIGBhY3R1YWxgIGFuZCBgZXhwZWN0ZWRgLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHRydWUsIHRydWUsICd0aGVzZSBib29sZWFucyBhcmUgc3RyaWN0bHkgZXF1YWwnKTtcbiAgICpcbiAgICogQG5hbWUgc3RyaWN0RXF1YWxcbiAgICogQHBhcmFtIHtNaXhlZH0gYWN0dWFsXG4gICAqIEBwYXJhbSB7TWl4ZWR9IGV4cGVjdGVkXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5zdHJpY3RFcXVhbCA9IGZ1bmN0aW9uIChhY3QsIGV4cCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihhY3QsIG1zZykudG8uZXF1YWwoZXhwKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5ub3RTdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgc3RyaWN0IGluZXF1YWxpdHkgKGAhPT1gKSBvZiBgYWN0dWFsYCBhbmQgYGV4cGVjdGVkYC5cbiAgICpcbiAgICogICAgIGFzc2VydC5ub3RTdHJpY3RFcXVhbCgzLCAnMycsICdubyBjb2VyY2lvbiBmb3Igc3RyaWN0IGVxdWFsaXR5Jyk7XG4gICAqXG4gICAqIEBuYW1lIG5vdFN0cmljdEVxdWFsXG4gICAqIEBwYXJhbSB7TWl4ZWR9IGFjdHVhbFxuICAgKiBAcGFyYW0ge01peGVkfSBleHBlY3RlZFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQubm90U3RyaWN0RXF1YWwgPSBmdW5jdGlvbiAoYWN0LCBleHAsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oYWN0LCBtc2cpLnRvLm5vdC5lcXVhbChleHApO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmRlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgYWN0dWFsYCBpcyBkZWVwbHkgZXF1YWwgdG8gYGV4cGVjdGVkYC5cbiAgICpcbiAgICogICAgIGFzc2VydC5kZWVwRXF1YWwoeyB0ZWE6ICdncmVlbicgfSwgeyB0ZWE6ICdncmVlbicgfSk7XG4gICAqXG4gICAqIEBuYW1lIGRlZXBFcXVhbFxuICAgKiBAcGFyYW0ge01peGVkfSBhY3R1YWxcbiAgICogQHBhcmFtIHtNaXhlZH0gZXhwZWN0ZWRcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmRlZXBFcXVhbCA9IGZ1bmN0aW9uIChhY3QsIGV4cCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihhY3QsIG1zZykudG8uZXFsKGV4cCk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAubm90RGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0IHRoYXQgYGFjdHVhbGAgaXMgbm90IGRlZXBseSBlcXVhbCB0byBgZXhwZWN0ZWRgLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm5vdERlZXBFcXVhbCh7IHRlYTogJ2dyZWVuJyB9LCB7IHRlYTogJ2phc21pbmUnIH0pO1xuICAgKlxuICAgKiBAbmFtZSBub3REZWVwRXF1YWxcbiAgICogQHBhcmFtIHtNaXhlZH0gYWN0dWFsXG4gICAqIEBwYXJhbSB7TWl4ZWR9IGV4cGVjdGVkXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5ub3REZWVwRXF1YWwgPSBmdW5jdGlvbiAoYWN0LCBleHAsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oYWN0LCBtc2cpLnRvLm5vdC5lcWwoZXhwKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pc1RydWUodmFsdWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGB2YWx1ZWAgaXMgdHJ1ZS5cbiAgICpcbiAgICogICAgIHZhciB0ZWFTZXJ2ZWQgPSB0cnVlO1xuICAgKiAgICAgYXNzZXJ0LmlzVHJ1ZSh0ZWFTZXJ2ZWQsICd0aGUgdGVhIGhhcyBiZWVuIHNlcnZlZCcpO1xuICAgKlxuICAgKiBAbmFtZSBpc1RydWVcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmlzVHJ1ZSA9IGZ1bmN0aW9uICh2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2cpLmlzWyd0cnVlJ107XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuaXNGYWxzZSh2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCBpcyBmYWxzZS5cbiAgICpcbiAgICogICAgIHZhciB0ZWFTZXJ2ZWQgPSBmYWxzZTtcbiAgICogICAgIGFzc2VydC5pc0ZhbHNlKHRlYVNlcnZlZCwgJ25vIHRlYSB5ZXQ/IGhtbS4uLicpO1xuICAgKlxuICAgKiBAbmFtZSBpc0ZhbHNlXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc0ZhbHNlID0gZnVuY3Rpb24gKHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZykuaXNbJ2ZhbHNlJ107XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuaXNOdWxsKHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgdmFsdWVgIGlzIG51bGwuXG4gICAqXG4gICAqICAgICBhc3NlcnQuaXNOdWxsKGVyciwgJ3RoZXJlIHdhcyBubyBlcnJvcicpO1xuICAgKlxuICAgKiBAbmFtZSBpc051bGxcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmlzTnVsbCA9IGZ1bmN0aW9uICh2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2cpLnRvLmVxdWFsKG51bGwpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzTm90TnVsbCh2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCBpcyBub3QgbnVsbC5cbiAgICpcbiAgICogICAgIHZhciB0ZWEgPSAndGFzdHkgY2hhaSc7XG4gICAqICAgICBhc3NlcnQuaXNOb3ROdWxsKHRlYSwgJ2dyZWF0LCB0aW1lIGZvciB0ZWEhJyk7XG4gICAqXG4gICAqIEBuYW1lIGlzTm90TnVsbFxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNOb3ROdWxsID0gZnVuY3Rpb24gKHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZykudG8ubm90LmVxdWFsKG51bGwpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzVW5kZWZpbmVkKHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgdmFsdWVgIGlzIGB1bmRlZmluZWRgLlxuICAgKlxuICAgKiAgICAgdmFyIHRlYTtcbiAgICogICAgIGFzc2VydC5pc1VuZGVmaW5lZCh0ZWEsICdubyB0ZWEgZGVmaW5lZCcpO1xuICAgKlxuICAgKiBAbmFtZSBpc1VuZGVmaW5lZFxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNVbmRlZmluZWQgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnKS50by5lcXVhbCh1bmRlZmluZWQpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzRGVmaW5lZCh2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCBpcyBub3QgYHVuZGVmaW5lZGAuXG4gICAqXG4gICAqICAgICB2YXIgdGVhID0gJ2N1cCBvZiBjaGFpJztcbiAgICogICAgIGFzc2VydC5pc0RlZmluZWQodGVhLCAndGVhIGhhcyBiZWVuIGRlZmluZWQnKTtcbiAgICpcbiAgICogQG5hbWUgaXNEZWZpbmVkXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc0RlZmluZWQgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnKS50by5ub3QuZXF1YWwodW5kZWZpbmVkKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pc0Z1bmN0aW9uKHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgdmFsdWVgIGlzIGEgZnVuY3Rpb24uXG4gICAqXG4gICAqICAgICBmdW5jdGlvbiBzZXJ2ZVRlYSgpIHsgcmV0dXJuICdjdXAgb2YgdGVhJzsgfTtcbiAgICogICAgIGFzc2VydC5pc0Z1bmN0aW9uKHNlcnZlVGVhLCAnZ3JlYXQsIHdlIGNhbiBoYXZlIHRlYSBub3cnKTtcbiAgICpcbiAgICogQG5hbWUgaXNGdW5jdGlvblxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNGdW5jdGlvbiA9IGZ1bmN0aW9uICh2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2cpLnRvLmJlLmEoJ2Z1bmN0aW9uJyk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuaXNOb3RGdW5jdGlvbih2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCBpcyBfbm90XyBhIGZ1bmN0aW9uLlxuICAgKlxuICAgKiAgICAgdmFyIHNlcnZlVGVhID0gWyAnaGVhdCcsICdwb3VyJywgJ3NpcCcgXTtcbiAgICogICAgIGFzc2VydC5pc05vdEZ1bmN0aW9uKHNlcnZlVGVhLCAnZ3JlYXQsIHdlIGhhdmUgbGlzdGVkIHRoZSBzdGVwcycpO1xuICAgKlxuICAgKiBAbmFtZSBpc05vdEZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc05vdEZ1bmN0aW9uID0gZnVuY3Rpb24gKHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZykudG8ubm90LmJlLmEoJ2Z1bmN0aW9uJyk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuaXNPYmplY3QodmFsdWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGB2YWx1ZWAgaXMgYW4gb2JqZWN0IChhcyByZXZlYWxlZCBieVxuICAgKiBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2ApLlxuICAgKlxuICAgKiAgICAgdmFyIHNlbGVjdGlvbiA9IHsgbmFtZTogJ0NoYWknLCBzZXJ2ZTogJ3dpdGggc3BpY2VzJyB9O1xuICAgKiAgICAgYXNzZXJ0LmlzT2JqZWN0KHNlbGVjdGlvbiwgJ3RlYSBzZWxlY3Rpb24gaXMgYW4gb2JqZWN0Jyk7XG4gICAqXG4gICAqIEBuYW1lIGlzT2JqZWN0XG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc09iamVjdCA9IGZ1bmN0aW9uICh2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2cpLnRvLmJlLmEoJ29iamVjdCcpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzTm90T2JqZWN0KHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgdmFsdWVgIGlzIF9ub3RfIGFuIG9iamVjdC5cbiAgICpcbiAgICogICAgIHZhciBzZWxlY3Rpb24gPSAnY2hhaSdcbiAgICogICAgIGFzc2VydC5pc09iamVjdChzZWxlY3Rpb24sICd0ZWEgc2VsZWN0aW9uIGlzIG5vdCBhbiBvYmplY3QnKTtcbiAgICogICAgIGFzc2VydC5pc09iamVjdChudWxsLCAnbnVsbCBpcyBub3QgYW4gb2JqZWN0Jyk7XG4gICAqXG4gICAqIEBuYW1lIGlzTm90T2JqZWN0XG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc05vdE9iamVjdCA9IGZ1bmN0aW9uICh2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2cpLnRvLm5vdC5iZS5hKCdvYmplY3QnKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pc0FycmF5KHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgdmFsdWVgIGlzIGFuIGFycmF5LlxuICAgKlxuICAgKiAgICAgdmFyIG1lbnUgPSBbICdncmVlbicsICdjaGFpJywgJ29vbG9uZycgXTtcbiAgICogICAgIGFzc2VydC5pc0FycmF5KG1lbnUsICd3aGF0IGtpbmQgb2YgdGVhIGRvIHdlIHdhbnQ/Jyk7XG4gICAqXG4gICAqIEBuYW1lIGlzQXJyYXlcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmlzQXJyYXkgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnKS50by5iZS5hbignYXJyYXknKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pc05vdEFycmF5KHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgdmFsdWVgIGlzIF9ub3RfIGFuIGFycmF5LlxuICAgKlxuICAgKiAgICAgdmFyIG1lbnUgPSAnZ3JlZW58Y2hhaXxvb2xvbmcnO1xuICAgKiAgICAgYXNzZXJ0LmlzTm90QXJyYXkobWVudSwgJ3doYXQga2luZCBvZiB0ZWEgZG8gd2Ugd2FudD8nKTtcbiAgICpcbiAgICogQG5hbWUgaXNOb3RBcnJheVxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNOb3RBcnJheSA9IGZ1bmN0aW9uICh2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2cpLnRvLm5vdC5iZS5hbignYXJyYXknKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pc1N0cmluZyh2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCBpcyBhIHN0cmluZy5cbiAgICpcbiAgICogICAgIHZhciB0ZWFPcmRlciA9ICdjaGFpJztcbiAgICogICAgIGFzc2VydC5pc1N0cmluZyh0ZWFPcmRlciwgJ29yZGVyIHBsYWNlZCcpO1xuICAgKlxuICAgKiBAbmFtZSBpc1N0cmluZ1xuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNTdHJpbmcgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnKS50by5iZS5hKCdzdHJpbmcnKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pc05vdFN0cmluZyh2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCBpcyBfbm90XyBhIHN0cmluZy5cbiAgICpcbiAgICogICAgIHZhciB0ZWFPcmRlciA9IDQ7XG4gICAqICAgICBhc3NlcnQuaXNOb3RTdHJpbmcodGVhT3JkZXIsICdvcmRlciBwbGFjZWQnKTtcbiAgICpcbiAgICogQG5hbWUgaXNOb3RTdHJpbmdcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmlzTm90U3RyaW5nID0gZnVuY3Rpb24gKHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZykudG8ubm90LmJlLmEoJ3N0cmluZycpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmlzTnVtYmVyKHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgdmFsdWVgIGlzIGEgbnVtYmVyLlxuICAgKlxuICAgKiAgICAgdmFyIGN1cHMgPSAyO1xuICAgKiAgICAgYXNzZXJ0LmlzTnVtYmVyKGN1cHMsICdob3cgbWFueSBjdXBzJyk7XG4gICAqXG4gICAqIEBuYW1lIGlzTnVtYmVyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNOdW1iZXIgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnKS50by5iZS5hKCdudW1iZXInKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pc05vdE51bWJlcih2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCBpcyBfbm90XyBhIG51bWJlci5cbiAgICpcbiAgICogICAgIHZhciBjdXBzID0gJzIgY3VwcyBwbGVhc2UnO1xuICAgKiAgICAgYXNzZXJ0LmlzTm90TnVtYmVyKGN1cHMsICdob3cgbWFueSBjdXBzJyk7XG4gICAqXG4gICAqIEBuYW1lIGlzTm90TnVtYmVyXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pc05vdE51bWJlciA9IGZ1bmN0aW9uICh2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2cpLnRvLm5vdC5iZS5hKCdudW1iZXInKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pc0Jvb2xlYW4odmFsdWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGB2YWx1ZWAgaXMgYSBib29sZWFuLlxuICAgKlxuICAgKiAgICAgdmFyIHRlYVJlYWR5ID0gdHJ1ZVxuICAgKiAgICAgICAsIHRlYVNlcnZlZCA9IGZhbHNlO1xuICAgKlxuICAgKiAgICAgYXNzZXJ0LmlzQm9vbGVhbih0ZWFSZWFkeSwgJ2lzIHRoZSB0ZWEgcmVhZHknKTtcbiAgICogICAgIGFzc2VydC5pc0Jvb2xlYW4odGVhU2VydmVkLCAnaGFzIHRlYSBiZWVuIHNlcnZlZCcpO1xuICAgKlxuICAgKiBAbmFtZSBpc0Jvb2xlYW5cbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmlzQm9vbGVhbiA9IGZ1bmN0aW9uICh2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2cpLnRvLmJlLmEoJ2Jvb2xlYW4nKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5pc05vdEJvb2xlYW4odmFsdWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGB2YWx1ZWAgaXMgX25vdF8gYSBib29sZWFuLlxuICAgKlxuICAgKiAgICAgdmFyIHRlYVJlYWR5ID0gJ3llcCdcbiAgICogICAgICAgLCB0ZWFTZXJ2ZWQgPSAnbm9wZSc7XG4gICAqXG4gICAqICAgICBhc3NlcnQuaXNOb3RCb29sZWFuKHRlYVJlYWR5LCAnaXMgdGhlIHRlYSByZWFkeScpO1xuICAgKiAgICAgYXNzZXJ0LmlzTm90Qm9vbGVhbih0ZWFTZXJ2ZWQsICdoYXMgdGVhIGJlZW4gc2VydmVkJyk7XG4gICAqXG4gICAqIEBuYW1lIGlzTm90Qm9vbGVhblxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuaXNOb3RCb29sZWFuID0gZnVuY3Rpb24gKHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZykudG8ubm90LmJlLmEoJ2Jvb2xlYW4nKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC50eXBlT2YodmFsdWUsIG5hbWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGB2YWx1ZWAncyB0eXBlIGlzIGBuYW1lYCwgYXMgZGV0ZXJtaW5lZCBieVxuICAgKiBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AuXG4gICAqXG4gICAqICAgICBhc3NlcnQudHlwZU9mKHsgdGVhOiAnY2hhaScgfSwgJ29iamVjdCcsICd3ZSBoYXZlIGFuIG9iamVjdCcpO1xuICAgKiAgICAgYXNzZXJ0LnR5cGVPZihbJ2NoYWknLCAnamFzbWluZSddLCAnYXJyYXknLCAnd2UgaGF2ZSBhbiBhcnJheScpO1xuICAgKiAgICAgYXNzZXJ0LnR5cGVPZigndGVhJywgJ3N0cmluZycsICd3ZSBoYXZlIGEgc3RyaW5nJyk7XG4gICAqICAgICBhc3NlcnQudHlwZU9mKC90ZWEvLCAncmVnZXhwJywgJ3dlIGhhdmUgYSByZWd1bGFyIGV4cHJlc3Npb24nKTtcbiAgICogICAgIGFzc2VydC50eXBlT2YobnVsbCwgJ251bGwnLCAnd2UgaGF2ZSBhIG51bGwnKTtcbiAgICogICAgIGFzc2VydC50eXBlT2YodW5kZWZpbmVkLCAndW5kZWZpbmVkJywgJ3dlIGhhdmUgYW4gdW5kZWZpbmVkJyk7XG4gICAqXG4gICAqIEBuYW1lIHR5cGVPZlxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQudHlwZU9mID0gZnVuY3Rpb24gKHZhbCwgdHlwZSwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZykudG8uYmUuYSh0eXBlKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5ub3RUeXBlT2YodmFsdWUsIG5hbWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGB2YWx1ZWAncyB0eXBlIGlzIF9ub3RfIGBuYW1lYCwgYXMgZGV0ZXJtaW5lZCBieVxuICAgKiBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AuXG4gICAqXG4gICAqICAgICBhc3NlcnQubm90VHlwZU9mKCd0ZWEnLCAnbnVtYmVyJywgJ3N0cmluZ3MgYXJlIG5vdCBudW1iZXJzJyk7XG4gICAqXG4gICAqIEBuYW1lIG5vdFR5cGVPZlxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZW9mIG5hbWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm5vdFR5cGVPZiA9IGZ1bmN0aW9uICh2YWwsIHR5cGUsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2cpLnRvLm5vdC5iZS5hKHR5cGUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmluc3RhbmNlT2Yob2JqZWN0LCBjb25zdHJ1Y3RvciwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCBpcyBhbiBpbnN0YW5jZSBvZiBgY29uc3RydWN0b3JgLlxuICAgKlxuICAgKiAgICAgdmFyIFRlYSA9IGZ1bmN0aW9uIChuYW1lKSB7IHRoaXMubmFtZSA9IG5hbWU7IH1cbiAgICogICAgICAgLCBjaGFpID0gbmV3IFRlYSgnY2hhaScpO1xuICAgKlxuICAgKiAgICAgYXNzZXJ0Lmluc3RhbmNlT2YoY2hhaSwgVGVhLCAnY2hhaSBpcyBhbiBpbnN0YW5jZSBvZiB0ZWEnKTtcbiAgICpcbiAgICogQG5hbWUgaW5zdGFuY2VPZlxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0XG4gICAqIEBwYXJhbSB7Q29uc3RydWN0b3J9IGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5pbnN0YW5jZU9mID0gZnVuY3Rpb24gKHZhbCwgdHlwZSwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZykudG8uYmUuaW5zdGFuY2VPZih0eXBlKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5ub3RJbnN0YW5jZU9mKG9iamVjdCwgY29uc3RydWN0b3IsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyBgdmFsdWVgIGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBgY29uc3RydWN0b3JgLlxuICAgKlxuICAgKiAgICAgdmFyIFRlYSA9IGZ1bmN0aW9uIChuYW1lKSB7IHRoaXMubmFtZSA9IG5hbWU7IH1cbiAgICogICAgICAgLCBjaGFpID0gbmV3IFN0cmluZygnY2hhaScpO1xuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm5vdEluc3RhbmNlT2YoY2hhaSwgVGVhLCAnY2hhaSBpcyBub3QgYW4gaW5zdGFuY2Ugb2YgdGVhJyk7XG4gICAqXG4gICAqIEBuYW1lIG5vdEluc3RhbmNlT2ZcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge0NvbnN0cnVjdG9yfSBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQubm90SW5zdGFuY2VPZiA9IGZ1bmN0aW9uICh2YWwsIHR5cGUsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2cpLnRvLm5vdC5iZS5pbnN0YW5jZU9mKHR5cGUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmluY2x1ZGUoaGF5c3RhY2ssIG5lZWRsZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYGhheXN0YWNrYCBpbmNsdWRlcyBgbmVlZGxlYC4gV29ya3NcbiAgICogZm9yIHN0cmluZ3MgYW5kIGFycmF5cy5cbiAgICpcbiAgICogICAgIGFzc2VydC5pbmNsdWRlKCdmb29iYXInLCAnYmFyJywgJ2Zvb2JhciBjb250YWlucyBzdHJpbmcgXCJiYXJcIicpO1xuICAgKiAgICAgYXNzZXJ0LmluY2x1ZGUoWyAxLCAyLCAzIF0sIDMsICdhcnJheSBjb250YWlucyB2YWx1ZScpO1xuICAgKlxuICAgKiBAbmFtZSBpbmNsdWRlXG4gICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBoYXlzdGFja1xuICAgKiBAcGFyYW0ge01peGVkfSBuZWVkbGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmluY2x1ZGUgPSBmdW5jdGlvbiAoZXhwLCBpbmMsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oZXhwLCBtc2cpLmluY2x1ZGUoaW5jKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5ub3RJbmNsdWRlKGhheXN0YWNrLCBuZWVkbGUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBoYXlzdGFja2AgZG9lcyBub3QgaW5jbHVkZSBgbmVlZGxlYC4gV29ya3NcbiAgICogZm9yIHN0cmluZ3MgYW5kIGFycmF5cy5cbiAgICppXG4gICAqICAgICBhc3NlcnQubm90SW5jbHVkZSgnZm9vYmFyJywgJ2JheicsICdzdHJpbmcgbm90IGluY2x1ZGUgc3Vic3RyaW5nJyk7XG4gICAqICAgICBhc3NlcnQubm90SW5jbHVkZShbIDEsIDIsIDMgXSwgNCwgJ2FycmF5IG5vdCBpbmNsdWRlIGNvbnRhaW4gdmFsdWUnKTtcbiAgICpcbiAgICogQG5hbWUgbm90SW5jbHVkZVxuICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gaGF5c3RhY2tcbiAgICogQHBhcmFtIHtNaXhlZH0gbmVlZGxlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5ub3RJbmNsdWRlID0gZnVuY3Rpb24gKGV4cCwgaW5jLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKGV4cCwgbXNnKS5ub3QuaW5jbHVkZShpbmMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLm1hdGNoKHZhbHVlLCByZWdleHAsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGB2YWx1ZWAgbWF0Y2hlcyB0aGUgcmVndWxhciBleHByZXNzaW9uIGByZWdleHBgLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm1hdGNoKCdmb29iYXInLCAvXmZvby8sICdyZWdleHAgbWF0Y2hlcycpO1xuICAgKlxuICAgKiBAbmFtZSBtYXRjaFxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcGFyYW0ge1JlZ0V4cH0gcmVnZXhwXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5tYXRjaCA9IGZ1bmN0aW9uIChleHAsIHJlLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKGV4cCwgbXNnKS50by5tYXRjaChyZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAubm90TWF0Y2godmFsdWUsIHJlZ2V4cCwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYHZhbHVlYCBkb2VzIG5vdCBtYXRjaCB0aGUgcmVndWxhciBleHByZXNzaW9uIGByZWdleHBgLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm5vdE1hdGNoKCdmb29iYXInLCAvXmZvby8sICdyZWdleHAgZG9lcyBub3QgbWF0Y2gnKTtcbiAgICpcbiAgICogQG5hbWUgbm90TWF0Y2hcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtSZWdFeHB9IHJlZ2V4cFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQubm90TWF0Y2ggPSBmdW5jdGlvbiAoZXhwLCByZSwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihleHAsIG1zZykudG8ubm90Lm1hdGNoKHJlKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5wcm9wZXJ0eShvYmplY3QsIHByb3BlcnR5LCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgb2JqZWN0YCBoYXMgYSBwcm9wZXJ0eSBuYW1lZCBieSBgcHJvcGVydHlgLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LnByb3BlcnR5KHsgdGVhOiB7IGdyZWVuOiAnbWF0Y2hhJyB9fSwgJ3RlYScpO1xuICAgKlxuICAgKiBAbmFtZSBwcm9wZXJ0eVxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQucHJvcGVydHkgPSBmdW5jdGlvbiAob2JqLCBwcm9wLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnKS50by5oYXZlLnByb3BlcnR5KHByb3ApO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLm5vdFByb3BlcnR5KG9iamVjdCwgcHJvcGVydHksIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBvYmplY3RgIGRvZXMgX25vdF8gaGF2ZSBhIHByb3BlcnR5IG5hbWVkIGJ5IGBwcm9wZXJ0eWAuXG4gICAqXG4gICAqICAgICBhc3NlcnQubm90UHJvcGVydHkoeyB0ZWE6IHsgZ3JlZW46ICdtYXRjaGEnIH19LCAnY29mZmVlJyk7XG4gICAqXG4gICAqIEBuYW1lIG5vdFByb3BlcnR5XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BlcnR5XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5ub3RQcm9wZXJ0eSA9IGZ1bmN0aW9uIChvYmosIHByb3AsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBtc2cpLnRvLm5vdC5oYXZlLnByb3BlcnR5KHByb3ApO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmRlZXBQcm9wZXJ0eShvYmplY3QsIHByb3BlcnR5LCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgb2JqZWN0YCBoYXMgYSBwcm9wZXJ0eSBuYW1lZCBieSBgcHJvcGVydHlgLCB3aGljaCBjYW4gYmUgYVxuICAgKiBzdHJpbmcgdXNpbmcgZG90LSBhbmQgYnJhY2tldC1ub3RhdGlvbiBmb3IgZGVlcCByZWZlcmVuY2UuXG4gICAqXG4gICAqICAgICBhc3NlcnQuZGVlcFByb3BlcnR5KHsgdGVhOiB7IGdyZWVuOiAnbWF0Y2hhJyB9fSwgJ3RlYS5ncmVlbicpO1xuICAgKlxuICAgKiBAbmFtZSBkZWVwUHJvcGVydHlcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmRlZXBQcm9wZXJ0eSA9IGZ1bmN0aW9uIChvYmosIHByb3AsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBtc2cpLnRvLmhhdmUuZGVlcC5wcm9wZXJ0eShwcm9wKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5ub3REZWVwUHJvcGVydHkob2JqZWN0LCBwcm9wZXJ0eSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYG9iamVjdGAgZG9lcyBfbm90XyBoYXZlIGEgcHJvcGVydHkgbmFtZWQgYnkgYHByb3BlcnR5YCwgd2hpY2hcbiAgICogY2FuIGJlIGEgc3RyaW5nIHVzaW5nIGRvdC0gYW5kIGJyYWNrZXQtbm90YXRpb24gZm9yIGRlZXAgcmVmZXJlbmNlLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0Lm5vdERlZXBQcm9wZXJ0eSh7IHRlYTogeyBncmVlbjogJ21hdGNoYScgfX0sICd0ZWEub29sb25nJyk7XG4gICAqXG4gICAqIEBuYW1lIG5vdERlZXBQcm9wZXJ0eVxuICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wZXJ0eVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQubm90RGVlcFByb3BlcnR5ID0gZnVuY3Rpb24gKG9iaiwgcHJvcCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIG1zZykudG8ubm90LmhhdmUuZGVlcC5wcm9wZXJ0eShwcm9wKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5wcm9wZXJ0eVZhbChvYmplY3QsIHByb3BlcnR5LCB2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYG9iamVjdGAgaGFzIGEgcHJvcGVydHkgbmFtZWQgYnkgYHByb3BlcnR5YCB3aXRoIHZhbHVlIGdpdmVuXG4gICAqIGJ5IGB2YWx1ZWAuXG4gICAqXG4gICAqICAgICBhc3NlcnQucHJvcGVydHlWYWwoeyB0ZWE6ICdpcyBnb29kJyB9LCAndGVhJywgJ2lzIGdvb2QnKTtcbiAgICpcbiAgICogQG5hbWUgcHJvcGVydHlWYWxcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LnByb3BlcnR5VmFsID0gZnVuY3Rpb24gKG9iaiwgcHJvcCwgdmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnKS50by5oYXZlLnByb3BlcnR5KHByb3AsIHZhbCk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAucHJvcGVydHlOb3RWYWwob2JqZWN0LCBwcm9wZXJ0eSwgdmFsdWUsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBvYmplY3RgIGhhcyBhIHByb3BlcnR5IG5hbWVkIGJ5IGBwcm9wZXJ0eWAsIGJ1dCB3aXRoIGEgdmFsdWVcbiAgICogZGlmZmVyZW50IGZyb20gdGhhdCBnaXZlbiBieSBgdmFsdWVgLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LnByb3BlcnR5Tm90VmFsKHsgdGVhOiAnaXMgZ29vZCcgfSwgJ3RlYScsICdpcyBiYWQnKTtcbiAgICpcbiAgICogQG5hbWUgcHJvcGVydHlOb3RWYWxcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LnByb3BlcnR5Tm90VmFsID0gZnVuY3Rpb24gKG9iaiwgcHJvcCwgdmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnKS50by5ub3QuaGF2ZS5wcm9wZXJ0eShwcm9wLCB2YWwpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmRlZXBQcm9wZXJ0eVZhbChvYmplY3QsIHByb3BlcnR5LCB2YWx1ZSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgYG9iamVjdGAgaGFzIGEgcHJvcGVydHkgbmFtZWQgYnkgYHByb3BlcnR5YCB3aXRoIHZhbHVlIGdpdmVuXG4gICAqIGJ5IGB2YWx1ZWAuIGBwcm9wZXJ0eWAgY2FuIHVzZSBkb3QtIGFuZCBicmFja2V0LW5vdGF0aW9uIGZvciBkZWVwXG4gICAqIHJlZmVyZW5jZS5cbiAgICpcbiAgICogICAgIGFzc2VydC5kZWVwUHJvcGVydHlWYWwoeyB0ZWE6IHsgZ3JlZW46ICdtYXRjaGEnIH19LCAndGVhLmdyZWVuJywgJ21hdGNoYScpO1xuICAgKlxuICAgKiBAbmFtZSBkZWVwUHJvcGVydHlWYWxcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmRlZXBQcm9wZXJ0eVZhbCA9IGZ1bmN0aW9uIChvYmosIHByb3AsIHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIG1zZykudG8uaGF2ZS5kZWVwLnByb3BlcnR5KHByb3AsIHZhbCk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuZGVlcFByb3BlcnR5Tm90VmFsKG9iamVjdCwgcHJvcGVydHksIHZhbHVlLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgb2JqZWN0YCBoYXMgYSBwcm9wZXJ0eSBuYW1lZCBieSBgcHJvcGVydHlgLCBidXQgd2l0aCBhIHZhbHVlXG4gICAqIGRpZmZlcmVudCBmcm9tIHRoYXQgZ2l2ZW4gYnkgYHZhbHVlYC4gYHByb3BlcnR5YCBjYW4gdXNlIGRvdC0gYW5kXG4gICAqIGJyYWNrZXQtbm90YXRpb24gZm9yIGRlZXAgcmVmZXJlbmNlLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LmRlZXBQcm9wZXJ0eU5vdFZhbCh7IHRlYTogeyBncmVlbjogJ21hdGNoYScgfX0sICd0ZWEuZ3JlZW4nLCAna29uYWNoYScpO1xuICAgKlxuICAgKiBAbmFtZSBkZWVwUHJvcGVydHlOb3RWYWxcbiAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcGVydHlcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmRlZXBQcm9wZXJ0eU5vdFZhbCA9IGZ1bmN0aW9uIChvYmosIHByb3AsIHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIG1zZykudG8ubm90LmhhdmUuZGVlcC5wcm9wZXJ0eShwcm9wLCB2YWwpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLmxlbmd0aE9mKG9iamVjdCwgbGVuZ3RoLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgb2JqZWN0YCBoYXMgYSBgbGVuZ3RoYCBwcm9wZXJ0eSB3aXRoIHRoZSBleHBlY3RlZCB2YWx1ZS5cbiAgICpcbiAgICogICAgIGFzc2VydC5sZW5ndGhPZihbMSwyLDNdLCAzLCAnYXJyYXkgaGFzIGxlbmd0aCBvZiAzJyk7XG4gICAqICAgICBhc3NlcnQubGVuZ3RoT2YoJ2Zvb2JhcicsIDUsICdzdHJpbmcgaGFzIGxlbmd0aCBvZiA2Jyk7XG4gICAqXG4gICAqIEBuYW1lIGxlbmd0aE9mXG4gICAqIEBwYXJhbSB7TWl4ZWR9IG9iamVjdFxuICAgKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5sZW5ndGhPZiA9IGZ1bmN0aW9uIChleHAsIGxlbiwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihleHAsIG1zZykudG8uaGF2ZS5sZW5ndGgobGVuKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC50aHJvd3MoZnVuY3Rpb24sIFtjb25zdHJ1Y3Rvci9zdHJpbmcvcmVnZXhwXSwgW3N0cmluZy9yZWdleHBdLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgZnVuY3Rpb25gIHdpbGwgdGhyb3cgYW4gZXJyb3IgdGhhdCBpcyBhbiBpbnN0YW5jZSBvZlxuICAgKiBgY29uc3RydWN0b3JgLCBvciBhbHRlcm5hdGVseSB0aGF0IGl0IHdpbGwgdGhyb3cgYW4gZXJyb3Igd2l0aCBtZXNzYWdlXG4gICAqIG1hdGNoaW5nIGByZWdleHBgLlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LnRocm93KGZuLCAnZnVuY3Rpb24gdGhyb3dzIGEgcmVmZXJlbmNlIGVycm9yJyk7XG4gICAqICAgICBhc3NlcnQudGhyb3coZm4sIC9mdW5jdGlvbiB0aHJvd3MgYSByZWZlcmVuY2UgZXJyb3IvKTtcbiAgICogICAgIGFzc2VydC50aHJvdyhmbiwgUmVmZXJlbmNlRXJyb3IpO1xuICAgKiAgICAgYXNzZXJ0LnRocm93KGZuLCBSZWZlcmVuY2VFcnJvciwgJ2Z1bmN0aW9uIHRocm93cyBhIHJlZmVyZW5jZSBlcnJvcicpO1xuICAgKiAgICAgYXNzZXJ0LnRocm93KGZuLCBSZWZlcmVuY2VFcnJvciwgL2Z1bmN0aW9uIHRocm93cyBhIHJlZmVyZW5jZSBlcnJvci8pO1xuICAgKlxuICAgKiBAbmFtZSB0aHJvd3NcbiAgICogQGFsaWFzIHRocm93XG4gICAqIEBhbGlhcyBUaHJvd1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jdGlvblxuICAgKiBAcGFyYW0ge0Vycm9yQ29uc3RydWN0b3J9IGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7UmVnRXhwfSByZWdleHBcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9FcnJvciNFcnJvcl90eXBlc1xuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBhc3NlcnQuVGhyb3cgPSBmdW5jdGlvbiAoZm4sIGVycnQsIGVycnMsIG1zZykge1xuICAgIGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIGVycnQgfHwgZXJydCBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgZXJycyA9IGVycnQ7XG4gICAgICBlcnJ0ID0gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgYXNzZXJ0RXJyID0gbmV3IEFzc2VydGlvbihmbiwgbXNnKS50by5UaHJvdyhlcnJ0LCBlcnJzKTtcbiAgICByZXR1cm4gZmxhZyhhc3NlcnRFcnIsICdvYmplY3QnKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5kb2VzTm90VGhyb3coZnVuY3Rpb24sIFtjb25zdHJ1Y3Rvci9yZWdleHBdLCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgZnVuY3Rpb25gIHdpbGwgX25vdF8gdGhyb3cgYW4gZXJyb3IgdGhhdCBpcyBhbiBpbnN0YW5jZSBvZlxuICAgKiBgY29uc3RydWN0b3JgLCBvciBhbHRlcm5hdGVseSB0aGF0IGl0IHdpbGwgbm90IHRocm93IGFuIGVycm9yIHdpdGggbWVzc2FnZVxuICAgKiBtYXRjaGluZyBgcmVnZXhwYC5cbiAgICpcbiAgICogICAgIGFzc2VydC5kb2VzTm90VGhyb3coZm4sIEVycm9yLCAnZnVuY3Rpb24gZG9lcyBub3QgdGhyb3cnKTtcbiAgICpcbiAgICogQG5hbWUgZG9lc05vdFRocm93XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7RXJyb3JDb25zdHJ1Y3Rvcn0gY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtSZWdFeHB9IHJlZ2V4cFxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0Vycm9yI0Vycm9yX3R5cGVzXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5kb2VzTm90VGhyb3cgPSBmdW5jdGlvbiAoZm4sIHR5cGUsIG1zZykge1xuICAgIGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIHR5cGUpIHtcbiAgICAgIG1zZyA9IHR5cGU7XG4gICAgICB0eXBlID0gbnVsbDtcbiAgICB9XG5cbiAgICBuZXcgQXNzZXJ0aW9uKGZuLCBtc2cpLnRvLm5vdC5UaHJvdyh0eXBlKTtcbiAgfTtcblxuICAvKipcbiAgICogIyMjIC5vcGVyYXRvcih2YWwxLCBvcGVyYXRvciwgdmFsMiwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBDb21wYXJlcyB0d28gdmFsdWVzIHVzaW5nIGBvcGVyYXRvcmAuXG4gICAqXG4gICAqICAgICBhc3NlcnQub3BlcmF0b3IoMSwgJzwnLCAyLCAnZXZlcnl0aGluZyBpcyBvaycpO1xuICAgKiAgICAgYXNzZXJ0Lm9wZXJhdG9yKDEsICc+JywgMiwgJ3RoaXMgd2lsbCBmYWlsJyk7XG4gICAqXG4gICAqIEBuYW1lIG9wZXJhdG9yXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbDFcbiAgICogQHBhcmFtIHtTdHJpbmd9IG9wZXJhdG9yXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbDJcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0Lm9wZXJhdG9yID0gZnVuY3Rpb24gKHZhbCwgb3BlcmF0b3IsIHZhbDIsIG1zZykge1xuICAgIGlmICghflsnPT0nLCAnPT09JywgJz4nLCAnPj0nLCAnPCcsICc8PScsICchPScsICchPT0nXS5pbmRleE9mKG9wZXJhdG9yKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIG9wZXJhdG9yIFwiJyArIG9wZXJhdG9yICsgJ1wiJyk7XG4gICAgfVxuICAgIHZhciB0ZXN0ID0gbmV3IEFzc2VydGlvbihldmFsKHZhbCArIG9wZXJhdG9yICsgdmFsMiksIG1zZyk7XG4gICAgdGVzdC5hc3NlcnQoXG4gICAgICAgIHRydWUgPT09IGZsYWcodGVzdCwgJ29iamVjdCcpXG4gICAgICAsICdleHBlY3RlZCAnICsgdXRpbC5pbnNwZWN0KHZhbCkgKyAnIHRvIGJlICcgKyBvcGVyYXRvciArICcgJyArIHV0aWwuaW5zcGVjdCh2YWwyKVxuICAgICAgLCAnZXhwZWN0ZWQgJyArIHV0aWwuaW5zcGVjdCh2YWwpICsgJyB0byBub3QgYmUgJyArIG9wZXJhdG9yICsgJyAnICsgdXRpbC5pbnNwZWN0KHZhbDIpICk7XG4gIH07XG5cbiAgLyoqXG4gICAqICMjIyAuY2xvc2VUbyhhY3R1YWwsIGV4cGVjdGVkLCBkZWx0YSwgW21lc3NhZ2VdKVxuICAgKlxuICAgKiBBc3NlcnRzIHRoYXQgdGhlIHRhcmdldCBpcyBlcXVhbCBgZXhwZWN0ZWRgLCB0byB3aXRoaW4gYSArLy0gYGRlbHRhYCByYW5nZS5cbiAgICpcbiAgICogICAgIGFzc2VydC5jbG9zZVRvKDEuNSwgMSwgMC41LCAnbnVtYmVycyBhcmUgY2xvc2UnKTtcbiAgICpcbiAgICogQG5hbWUgY2xvc2VUb1xuICAgKiBAcGFyYW0ge051bWJlcn0gYWN0dWFsXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBleHBlY3RlZFxuICAgKiBAcGFyYW0ge051bWJlcn0gZGVsdGFcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmNsb3NlVG8gPSBmdW5jdGlvbiAoYWN0LCBleHAsIGRlbHRhLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKGFjdCwgbXNnKS50by5iZS5jbG9zZVRvKGV4cCwgZGVsdGEpO1xuICB9O1xuXG4gIC8qKlxuICAgKiAjIyMgLnNhbWVNZW1iZXJzKHNldDEsIHNldDIsIFttZXNzYWdlXSlcbiAgICpcbiAgICogQXNzZXJ0cyB0aGF0IGBzZXQxYCBhbmQgYHNldDJgIGhhdmUgdGhlIHNhbWUgbWVtYmVycy5cbiAgICogT3JkZXIgaXMgbm90IHRha2VuIGludG8gYWNjb3VudC5cbiAgICpcbiAgICogICAgIGFzc2VydC5zYW1lTWVtYmVycyhbIDEsIDIsIDMgXSwgWyAyLCAxLCAzIF0sICdzYW1lIG1lbWJlcnMnKTtcbiAgICpcbiAgICogQG5hbWUgc2FtZU1lbWJlcnNcbiAgICogQHBhcmFtIHtBcnJheX0gc3VwZXJzZXRcbiAgICogQHBhcmFtIHtBcnJheX0gc3Vic2V0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGFzc2VydC5zYW1lTWVtYmVycyA9IGZ1bmN0aW9uIChzZXQxLCBzZXQyLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHNldDEsIG1zZykudG8uaGF2ZS5zYW1lLm1lbWJlcnMoc2V0Mik7XG4gIH1cblxuICAvKipcbiAgICogIyMjIC5pbmNsdWRlTWVtYmVycyhzdXBlcnNldCwgc3Vic2V0LCBbbWVzc2FnZV0pXG4gICAqXG4gICAqIEFzc2VydHMgdGhhdCBgc3Vic2V0YCBpcyBpbmNsdWRlZCBpbiBgc3VwZXJzZXRgLlxuICAgKiBPcmRlciBpcyBub3QgdGFrZW4gaW50byBhY2NvdW50LlxuICAgKlxuICAgKiAgICAgYXNzZXJ0LmluY2x1ZGVNZW1iZXJzKFsgMSwgMiwgMyBdLCBbIDIsIDEgXSwgJ2luY2x1ZGUgbWVtYmVycycpO1xuICAgKlxuICAgKiBAbmFtZSBpbmNsdWRlTWVtYmVyc1xuICAgKiBAcGFyYW0ge0FycmF5fSBzdXBlcnNldFxuICAgKiBAcGFyYW0ge0FycmF5fSBzdWJzZXRcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2VcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgYXNzZXJ0LmluY2x1ZGVNZW1iZXJzID0gZnVuY3Rpb24gKHN1cGVyc2V0LCBzdWJzZXQsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oc3VwZXJzZXQsIG1zZykudG8uaW5jbHVkZS5tZW1iZXJzKHN1YnNldCk7XG4gIH1cblxuICAvKiFcbiAgICogVW5kb2N1bWVudGVkIC8gdW50ZXN0ZWRcbiAgICovXG5cbiAgYXNzZXJ0LmlmRXJyb3IgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnKS50by5ub3QuYmUub2s7XG4gIH07XG5cbiAgLyohXG4gICAqIEFsaWFzZXMuXG4gICAqL1xuXG4gIChmdW5jdGlvbiBhbGlhcyhuYW1lLCBhcyl7XG4gICAgYXNzZXJ0W2FzXSA9IGFzc2VydFtuYW1lXTtcbiAgICByZXR1cm4gYWxpYXM7XG4gIH0pXG4gICgnVGhyb3cnLCAndGhyb3cnKVxuICAoJ1Rocm93JywgJ3Rocm93cycpO1xufTtcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCIvaG9tZS9kb3N0b2RhYnNpL2NvZGUvYmFray9leHBlcmltZW50LXRlbXBsYXRlL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvaW50ZXJmYWNlL2Fzc2VydC5qc1wiLFwiLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL2ludGVyZmFjZVwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbi8qIVxuICogY2hhaVxuICogQ29weXJpZ2h0KGMpIDIwMTEtMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNoYWksIHV0aWwpIHtcbiAgY2hhaS5leHBlY3QgPSBmdW5jdGlvbiAodmFsLCBtZXNzYWdlKSB7XG4gICAgcmV0dXJuIG5ldyBjaGFpLkFzc2VydGlvbih2YWwsIG1lc3NhZ2UpO1xuICB9O1xufTtcblxuXG59KS5jYWxsKHRoaXMscmVxdWlyZShcIi9ob21lL2Rvc3RvZGFic2kvY29kZS9iYWtrL2V4cGVyaW1lbnQtdGVtcGxhdGUvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvaW5zZXJ0LW1vZHVsZS1nbG9iYWxzL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS9pbnRlcmZhY2UvZXhwZWN0LmpzXCIsXCIvLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvaW50ZXJmYWNlXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuLyohXG4gKiBjaGFpXG4gKiBDb3B5cmlnaHQoYykgMjAxMS0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY2hhaSwgdXRpbCkge1xuICB2YXIgQXNzZXJ0aW9uID0gY2hhaS5Bc3NlcnRpb247XG5cbiAgZnVuY3Rpb24gbG9hZFNob3VsZCAoKSB7XG4gICAgLy8gbW9kaWZ5IE9iamVjdC5wcm90b3R5cGUgdG8gaGF2ZSBgc2hvdWxkYFxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPYmplY3QucHJvdG90eXBlLCAnc2hvdWxkJyxcbiAgICAgIHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2NoYWlqcy9jaGFpL2lzc3Vlcy84NjogdGhpcyBtYWtlc1xuICAgICAgICAgIC8vIGB3aGF0ZXZlci5zaG91bGQgPSBzb21lVmFsdWVgIGFjdHVhbGx5IHNldCBgc29tZVZhbHVlYCwgd2hpY2ggaXNcbiAgICAgICAgICAvLyBlc3BlY2lhbGx5IHVzZWZ1bCBmb3IgYGdsb2JhbC5zaG91bGQgPSByZXF1aXJlKCdjaGFpJykuc2hvdWxkKClgLlxuICAgICAgICAgIC8vXG4gICAgICAgICAgLy8gTm90ZSB0aGF0IHdlIGhhdmUgdG8gdXNlIFtbRGVmaW5lUHJvcGVydHldXSBpbnN0ZWFkIG9mIFtbUHV0XV1cbiAgICAgICAgICAvLyBzaW5jZSBvdGhlcndpc2Ugd2Ugd291bGQgdHJpZ2dlciB0aGlzIHZlcnkgc2V0dGVyIVxuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnc2hvdWxkJywge1xuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICwgZ2V0OiBmdW5jdGlvbigpe1xuICAgICAgICAgIGlmICh0aGlzIGluc3RhbmNlb2YgU3RyaW5nIHx8IHRoaXMgaW5zdGFuY2VvZiBOdW1iZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXNzZXJ0aW9uKHRoaXMuY29uc3RydWN0b3IodGhpcykpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcyBpbnN0YW5jZW9mIEJvb2xlYW4pIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXNzZXJ0aW9uKHRoaXMgPT0gdHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuZXcgQXNzZXJ0aW9uKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAsIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuXG4gICAgdmFyIHNob3VsZCA9IHt9O1xuXG4gICAgc2hvdWxkLmVxdWFsID0gZnVuY3Rpb24gKHZhbDEsIHZhbDIsIG1zZykge1xuICAgICAgbmV3IEFzc2VydGlvbih2YWwxLCBtc2cpLnRvLmVxdWFsKHZhbDIpO1xuICAgIH07XG5cbiAgICBzaG91bGQuVGhyb3cgPSBmdW5jdGlvbiAoZm4sIGVycnQsIGVycnMsIG1zZykge1xuICAgICAgbmV3IEFzc2VydGlvbihmbiwgbXNnKS50by5UaHJvdyhlcnJ0LCBlcnJzKTtcbiAgICB9O1xuXG4gICAgc2hvdWxkLmV4aXN0ID0gZnVuY3Rpb24gKHZhbCwgbXNnKSB7XG4gICAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnKS50by5leGlzdDtcbiAgICB9XG5cbiAgICAvLyBuZWdhdGlvblxuICAgIHNob3VsZC5ub3QgPSB7fVxuXG4gICAgc2hvdWxkLm5vdC5lcXVhbCA9IGZ1bmN0aW9uICh2YWwxLCB2YWwyLCBtc2cpIHtcbiAgICAgIG5ldyBBc3NlcnRpb24odmFsMSwgbXNnKS50by5ub3QuZXF1YWwodmFsMik7XG4gICAgfTtcblxuICAgIHNob3VsZC5ub3QuVGhyb3cgPSBmdW5jdGlvbiAoZm4sIGVycnQsIGVycnMsIG1zZykge1xuICAgICAgbmV3IEFzc2VydGlvbihmbiwgbXNnKS50by5ub3QuVGhyb3coZXJydCwgZXJycyk7XG4gICAgfTtcblxuICAgIHNob3VsZC5ub3QuZXhpc3QgPSBmdW5jdGlvbiAodmFsLCBtc2cpIHtcbiAgICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2cpLnRvLm5vdC5leGlzdDtcbiAgICB9XG5cbiAgICBzaG91bGRbJ3Rocm93J10gPSBzaG91bGRbJ1Rocm93J107XG4gICAgc2hvdWxkLm5vdFsndGhyb3cnXSA9IHNob3VsZC5ub3RbJ1Rocm93J107XG5cbiAgICByZXR1cm4gc2hvdWxkO1xuICB9O1xuXG4gIGNoYWkuc2hvdWxkID0gbG9hZFNob3VsZDtcbiAgY2hhaS5TaG91bGQgPSBsb2FkU2hvdWxkO1xufTtcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCIvaG9tZS9kb3N0b2RhYnNpL2NvZGUvYmFray9leHBlcmltZW50LXRlbXBsYXRlL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvaW50ZXJmYWNlL3Nob3VsZC5qc1wiLFwiLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL2ludGVyZmFjZVwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbi8qIVxuICogQ2hhaSAtIGFkZENoYWluaW5nTWV0aG9kIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKiFcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXNcbiAqL1xuXG52YXIgdHJhbnNmZXJGbGFncyA9IHJlcXVpcmUoJy4vdHJhbnNmZXJGbGFncycpO1xuXG4vKiFcbiAqIE1vZHVsZSB2YXJpYWJsZXNcbiAqL1xuXG4vLyBDaGVjayB3aGV0aGVyIGBfX3Byb3RvX19gIGlzIHN1cHBvcnRlZFxudmFyIGhhc1Byb3RvU3VwcG9ydCA9ICdfX3Byb3RvX18nIGluIE9iamVjdDtcblxuLy8gV2l0aG91dCBgX19wcm90b19fYCBzdXBwb3J0LCB0aGlzIG1vZHVsZSB3aWxsIG5lZWQgdG8gYWRkIHByb3BlcnRpZXMgdG8gYSBmdW5jdGlvbi5cbi8vIEhvd2V2ZXIsIHNvbWUgRnVuY3Rpb24ucHJvdG90eXBlIG1ldGhvZHMgY2Fubm90IGJlIG92ZXJ3cml0dGVuLFxuLy8gYW5kIHRoZXJlIHNlZW1zIG5vIGVhc3kgY3Jvc3MtcGxhdGZvcm0gd2F5IHRvIGRldGVjdCB0aGVtIChAc2VlIGNoYWlqcy9jaGFpL2lzc3Vlcy82OSkuXG52YXIgZXhjbHVkZU5hbWVzID0gL14oPzpsZW5ndGh8bmFtZXxhcmd1bWVudHN8Y2FsbGVyKSQvO1xuXG4vLyBDYWNoZSBgRnVuY3Rpb25gIHByb3BlcnRpZXNcbnZhciBjYWxsICA9IEZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsLFxuICAgIGFwcGx5ID0gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5O1xuXG4vKipcbiAqICMjIyBhZGRDaGFpbmFibGVNZXRob2QgKGN0eCwgbmFtZSwgbWV0aG9kLCBjaGFpbmluZ0JlaGF2aW9yKVxuICpcbiAqIEFkZHMgYSBtZXRob2QgdG8gYW4gb2JqZWN0LCBzdWNoIHRoYXQgdGhlIG1ldGhvZCBjYW4gYWxzbyBiZSBjaGFpbmVkLlxuICpcbiAqICAgICB1dGlscy5hZGRDaGFpbmFibGVNZXRob2QoY2hhaS5Bc3NlcnRpb24ucHJvdG90eXBlLCAnZm9vJywgZnVuY3Rpb24gKHN0cikge1xuICogICAgICAgdmFyIG9iaiA9IHV0aWxzLmZsYWcodGhpcywgJ29iamVjdCcpO1xuICogICAgICAgbmV3IGNoYWkuQXNzZXJ0aW9uKG9iaikudG8uYmUuZXF1YWwoc3RyKTtcbiAqICAgICB9KTtcbiAqXG4gKiBDYW4gYWxzbyBiZSBhY2Nlc3NlZCBkaXJlY3RseSBmcm9tIGBjaGFpLkFzc2VydGlvbmAuXG4gKlxuICogICAgIGNoYWkuQXNzZXJ0aW9uLmFkZENoYWluYWJsZU1ldGhvZCgnZm9vJywgZm4sIGNoYWluaW5nQmVoYXZpb3IpO1xuICpcbiAqIFRoZSByZXN1bHQgY2FuIHRoZW4gYmUgdXNlZCBhcyBib3RoIGEgbWV0aG9kIGFzc2VydGlvbiwgZXhlY3V0aW5nIGJvdGggYG1ldGhvZGAgYW5kXG4gKiBgY2hhaW5pbmdCZWhhdmlvcmAsIG9yIGFzIGEgbGFuZ3VhZ2UgY2hhaW4sIHdoaWNoIG9ubHkgZXhlY3V0ZXMgYGNoYWluaW5nQmVoYXZpb3JgLlxuICpcbiAqICAgICBleHBlY3QoZm9vU3RyKS50by5iZS5mb28oJ2JhcicpO1xuICogICAgIGV4cGVjdChmb29TdHIpLnRvLmJlLmZvby5lcXVhbCgnZm9vJyk7XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGN0eCBvYmplY3QgdG8gd2hpY2ggdGhlIG1ldGhvZCBpcyBhZGRlZFxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgb2YgbWV0aG9kIHRvIGFkZFxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWV0aG9kIGZ1bmN0aW9uIHRvIGJlIHVzZWQgZm9yIGBuYW1lYCwgd2hlbiBjYWxsZWRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNoYWluaW5nQmVoYXZpb3IgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIGV2ZXJ5IHRpbWUgdGhlIHByb3BlcnR5IGlzIGFjY2Vzc2VkXG4gKiBAbmFtZSBhZGRDaGFpbmFibGVNZXRob2RcbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3R4LCBuYW1lLCBtZXRob2QsIGNoYWluaW5nQmVoYXZpb3IpIHtcbiAgaWYgKHR5cGVvZiBjaGFpbmluZ0JlaGF2aW9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgY2hhaW5pbmdCZWhhdmlvciA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgfVxuXG4gIHZhciBjaGFpbmFibGVCZWhhdmlvciA9IHtcbiAgICAgIG1ldGhvZDogbWV0aG9kXG4gICAgLCBjaGFpbmluZ0JlaGF2aW9yOiBjaGFpbmluZ0JlaGF2aW9yXG4gIH07XG5cbiAgLy8gc2F2ZSB0aGUgbWV0aG9kcyBzbyB3ZSBjYW4gb3ZlcndyaXRlIHRoZW0gbGF0ZXIsIGlmIHdlIG5lZWQgdG8uXG4gIGlmICghY3R4Ll9fbWV0aG9kcykge1xuICAgIGN0eC5fX21ldGhvZHMgPSB7fTtcbiAgfVxuICBjdHguX19tZXRob2RzW25hbWVdID0gY2hhaW5hYmxlQmVoYXZpb3I7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN0eCwgbmFtZSxcbiAgICB7IGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjaGFpbmFibGVCZWhhdmlvci5jaGFpbmluZ0JlaGF2aW9yLmNhbGwodGhpcyk7XG5cbiAgICAgICAgdmFyIGFzc2VydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gY2hhaW5hYmxlQmVoYXZpb3IubWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdCA9PT0gdW5kZWZpbmVkID8gdGhpcyA6IHJlc3VsdDtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBVc2UgYF9fcHJvdG9fX2AgaWYgYXZhaWxhYmxlXG4gICAgICAgIGlmIChoYXNQcm90b1N1cHBvcnQpIHtcbiAgICAgICAgICAvLyBJbmhlcml0IGFsbCBwcm9wZXJ0aWVzIGZyb20gdGhlIG9iamVjdCBieSByZXBsYWNpbmcgdGhlIGBGdW5jdGlvbmAgcHJvdG90eXBlXG4gICAgICAgICAgdmFyIHByb3RvdHlwZSA9IGFzc2VydC5fX3Byb3RvX18gPSBPYmplY3QuY3JlYXRlKHRoaXMpO1xuICAgICAgICAgIC8vIFJlc3RvcmUgdGhlIGBjYWxsYCBhbmQgYGFwcGx5YCBtZXRob2RzIGZyb20gYEZ1bmN0aW9uYFxuICAgICAgICAgIHByb3RvdHlwZS5jYWxsID0gY2FsbDtcbiAgICAgICAgICBwcm90b3R5cGUuYXBwbHkgPSBhcHBseTtcbiAgICAgICAgfVxuICAgICAgICAvLyBPdGhlcndpc2UsIHJlZGVmaW5lIGFsbCBwcm9wZXJ0aWVzIChzbG93ISlcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdmFyIGFzc2VydGVyTmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhjdHgpO1xuICAgICAgICAgIGFzc2VydGVyTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAoYXNzZXJ0ZXJOYW1lKSB7XG4gICAgICAgICAgICBpZiAoIWV4Y2x1ZGVOYW1lcy50ZXN0KGFzc2VydGVyTmFtZSkpIHtcbiAgICAgICAgICAgICAgdmFyIHBkID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihjdHgsIGFzc2VydGVyTmFtZSk7XG4gICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShhc3NlcnQsIGFzc2VydGVyTmFtZSwgcGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJhbnNmZXJGbGFncyh0aGlzLCBhc3NlcnQpO1xuICAgICAgICByZXR1cm4gYXNzZXJ0O1xuICAgICAgfVxuICAgICwgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufTtcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCIvaG9tZS9kb3N0b2RhYnNpL2NvZGUvYmFray9leHBlcmltZW50LXRlbXBsYXRlL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvYWRkQ2hhaW5hYmxlTWV0aG9kLmpzXCIsXCIvLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4vKiFcbiAqIENoYWkgLSBhZGRNZXRob2QgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qKlxuICogIyMjIC5hZGRNZXRob2QgKGN0eCwgbmFtZSwgbWV0aG9kKVxuICpcbiAqIEFkZHMgYSBtZXRob2QgdG8gdGhlIHByb3RvdHlwZSBvZiBhbiBvYmplY3QuXG4gKlxuICogICAgIHV0aWxzLmFkZE1ldGhvZChjaGFpLkFzc2VydGlvbi5wcm90b3R5cGUsICdmb28nLCBmdW5jdGlvbiAoc3RyKSB7XG4gKiAgICAgICB2YXIgb2JqID0gdXRpbHMuZmxhZyh0aGlzLCAnb2JqZWN0Jyk7XG4gKiAgICAgICBuZXcgY2hhaS5Bc3NlcnRpb24ob2JqKS50by5iZS5lcXVhbChzdHIpO1xuICogICAgIH0pO1xuICpcbiAqIENhbiBhbHNvIGJlIGFjY2Vzc2VkIGRpcmVjdGx5IGZyb20gYGNoYWkuQXNzZXJ0aW9uYC5cbiAqXG4gKiAgICAgY2hhaS5Bc3NlcnRpb24uYWRkTWV0aG9kKCdmb28nLCBmbik7XG4gKlxuICogVGhlbiBjYW4gYmUgdXNlZCBhcyBhbnkgb3RoZXIgYXNzZXJ0aW9uLlxuICpcbiAqICAgICBleHBlY3QoZm9vU3RyKS50by5iZS5mb28oJ2JhcicpO1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjdHggb2JqZWN0IHRvIHdoaWNoIHRoZSBtZXRob2QgaXMgYWRkZWRcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIG9mIG1ldGhvZCB0byBhZGRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1ldGhvZCBmdW5jdGlvbiB0byBiZSB1c2VkIGZvciBuYW1lXG4gKiBAbmFtZSBhZGRNZXRob2RcbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3R4LCBuYW1lLCBtZXRob2QpIHtcbiAgY3R4W25hbWVdID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciByZXN1bHQgPSBtZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICByZXR1cm4gcmVzdWx0ID09PSB1bmRlZmluZWQgPyB0aGlzIDogcmVzdWx0O1xuICB9O1xufTtcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCIvaG9tZS9kb3N0b2RhYnNpL2NvZGUvYmFray9leHBlcmltZW50LXRlbXBsYXRlL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvYWRkTWV0aG9kLmpzXCIsXCIvLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4vKiFcbiAqIENoYWkgLSBhZGRQcm9wZXJ0eSB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuLyoqXG4gKiAjIyMgYWRkUHJvcGVydHkgKGN0eCwgbmFtZSwgZ2V0dGVyKVxuICpcbiAqIEFkZHMgYSBwcm9wZXJ0eSB0byB0aGUgcHJvdG90eXBlIG9mIGFuIG9iamVjdC5cbiAqXG4gKiAgICAgdXRpbHMuYWRkUHJvcGVydHkoY2hhaS5Bc3NlcnRpb24ucHJvdG90eXBlLCAnZm9vJywgZnVuY3Rpb24gKCkge1xuICogICAgICAgdmFyIG9iaiA9IHV0aWxzLmZsYWcodGhpcywgJ29iamVjdCcpO1xuICogICAgICAgbmV3IGNoYWkuQXNzZXJ0aW9uKG9iaikudG8uYmUuaW5zdGFuY2VvZihGb28pO1xuICogICAgIH0pO1xuICpcbiAqIENhbiBhbHNvIGJlIGFjY2Vzc2VkIGRpcmVjdGx5IGZyb20gYGNoYWkuQXNzZXJ0aW9uYC5cbiAqXG4gKiAgICAgY2hhaS5Bc3NlcnRpb24uYWRkUHJvcGVydHkoJ2ZvbycsIGZuKTtcbiAqXG4gKiBUaGVuIGNhbiBiZSB1c2VkIGFzIGFueSBvdGhlciBhc3NlcnRpb24uXG4gKlxuICogICAgIGV4cGVjdChteUZvbykudG8uYmUuZm9vO1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjdHggb2JqZWN0IHRvIHdoaWNoIHRoZSBwcm9wZXJ0eSBpcyBhZGRlZFxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgb2YgcHJvcGVydHkgdG8gYWRkXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBnZXR0ZXIgZnVuY3Rpb24gdG8gYmUgdXNlZCBmb3IgbmFtZVxuICogQG5hbWUgYWRkUHJvcGVydHlcbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3R4LCBuYW1lLCBnZXR0ZXIpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN0eCwgbmFtZSxcbiAgICB7IGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gZ2V0dGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHJldHVybiByZXN1bHQgPT09IHVuZGVmaW5lZCA/IHRoaXMgOiByZXN1bHQ7XG4gICAgICB9XG4gICAgLCBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG59O1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZShcIi9ob21lL2Rvc3RvZGFic2kvY29kZS9iYWtrL2V4cGVyaW1lbnQtdGVtcGxhdGUvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvaW5zZXJ0LW1vZHVsZS1nbG9iYWxzL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy9hZGRQcm9wZXJ0eS5qc1wiLFwiLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL3V0aWxzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuLyohXG4gKiBDaGFpIC0gZmxhZyB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuLyoqXG4gKiAjIyMgZmxhZyhvYmplY3QgLGtleSwgW3ZhbHVlXSlcbiAqXG4gKiBHZXQgb3Igc2V0IGEgZmxhZyB2YWx1ZSBvbiBhbiBvYmplY3QuIElmIGFcbiAqIHZhbHVlIGlzIHByb3ZpZGVkIGl0IHdpbGwgYmUgc2V0LCBlbHNlIGl0IHdpbGxcbiAqIHJldHVybiB0aGUgY3VycmVudGx5IHNldCB2YWx1ZSBvciBgdW5kZWZpbmVkYCBpZlxuICogdGhlIHZhbHVlIGlzIG5vdCBzZXQuXG4gKlxuICogICAgIHV0aWxzLmZsYWcodGhpcywgJ2ZvbycsICdiYXInKTsgLy8gc2V0dGVyXG4gKiAgICAgdXRpbHMuZmxhZyh0aGlzLCAnZm9vJyk7IC8vIGdldHRlciwgcmV0dXJucyBgYmFyYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgKGNvbnN0cnVjdGVkIEFzc2VydGlvblxuICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgKG9wdGlvbmFsKVxuICogQG5hbWUgZmxhZ1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqLCBrZXksIHZhbHVlKSB7XG4gIHZhciBmbGFncyA9IG9iai5fX2ZsYWdzIHx8IChvYmouX19mbGFncyA9IE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMykge1xuICAgIGZsYWdzW2tleV0gPSB2YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmxhZ3Nba2V5XTtcbiAgfVxufTtcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCIvaG9tZS9kb3N0b2RhYnNpL2NvZGUvYmFray9leHBlcmltZW50LXRlbXBsYXRlL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvZmxhZy5qc1wiLFwiLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL3V0aWxzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuLyohXG4gKiBDaGFpIC0gZ2V0QWN0dWFsIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKipcbiAqICMgZ2V0QWN0dWFsKG9iamVjdCwgW2FjdHVhbF0pXG4gKlxuICogUmV0dXJucyB0aGUgYGFjdHVhbGAgdmFsdWUgZm9yIGFuIEFzc2VydGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgKGNvbnN0cnVjdGVkIEFzc2VydGlvbilcbiAqIEBwYXJhbSB7QXJndW1lbnRzfSBjaGFpLkFzc2VydGlvbi5wcm90b3R5cGUuYXNzZXJ0IGFyZ3VtZW50c1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaiwgYXJncykge1xuICB2YXIgYWN0dWFsID0gYXJnc1s0XTtcbiAgcmV0dXJuICd1bmRlZmluZWQnICE9PSB0eXBlb2YgYWN0dWFsID8gYWN0dWFsIDogb2JqLl9vYmo7XG59O1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZShcIi9ob21lL2Rvc3RvZGFic2kvY29kZS9iYWtrL2V4cGVyaW1lbnQtdGVtcGxhdGUvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvaW5zZXJ0LW1vZHVsZS1nbG9iYWxzL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy9nZXRBY3R1YWwuanNcIixcIi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlsc1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbi8qIVxuICogQ2hhaSAtIGdldEVudW1lcmFibGVQcm9wZXJ0aWVzIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKipcbiAqICMjIyAuZ2V0RW51bWVyYWJsZVByb3BlcnRpZXMob2JqZWN0KVxuICpcbiAqIFRoaXMgYWxsb3dzIHRoZSByZXRyaWV2YWwgb2YgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBhbiBvYmplY3QsXG4gKiBpbmhlcml0ZWQgb3Igbm90LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBuYW1lIGdldEVudW1lcmFibGVQcm9wZXJ0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZ2V0RW51bWVyYWJsZVByb3BlcnRpZXMob2JqZWN0KSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgZm9yICh2YXIgbmFtZSBpbiBvYmplY3QpIHtcbiAgICByZXN1bHQucHVzaChuYW1lKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCIvaG9tZS9kb3N0b2RhYnNpL2NvZGUvYmFray9leHBlcmltZW50LXRlbXBsYXRlL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvZ2V0RW51bWVyYWJsZVByb3BlcnRpZXMuanNcIixcIi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlsc1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbi8qIVxuICogQ2hhaSAtIG1lc3NhZ2UgY29tcG9zaXRpb24gdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qIVxuICogTW9kdWxlIGRlcGVuZGFuY2llc1xuICovXG5cbnZhciBmbGFnID0gcmVxdWlyZSgnLi9mbGFnJylcbiAgLCBnZXRBY3R1YWwgPSByZXF1aXJlKCcuL2dldEFjdHVhbCcpXG4gICwgaW5zcGVjdCA9IHJlcXVpcmUoJy4vaW5zcGVjdCcpXG4gICwgb2JqRGlzcGxheSA9IHJlcXVpcmUoJy4vb2JqRGlzcGxheScpO1xuXG4vKipcbiAqICMjIyAuZ2V0TWVzc2FnZShvYmplY3QsIG1lc3NhZ2UsIG5lZ2F0ZU1lc3NhZ2UpXG4gKlxuICogQ29uc3RydWN0IHRoZSBlcnJvciBtZXNzYWdlIGJhc2VkIG9uIGZsYWdzXG4gKiBhbmQgdGVtcGxhdGUgdGFncy4gVGVtcGxhdGUgdGFncyB3aWxsIHJldHVyblxuICogYSBzdHJpbmdpZmllZCBpbnNwZWN0aW9uIG9mIHRoZSBvYmplY3QgcmVmZXJlbmNlZC5cbiAqXG4gKiBNZXNzYWdlIHRlbXBsYXRlIHRhZ3M6XG4gKiAtIGAje3RoaXN9YCBjdXJyZW50IGFzc2VydGVkIG9iamVjdFxuICogLSBgI3thY3R9YCBhY3R1YWwgdmFsdWVcbiAqIC0gYCN7ZXhwfWAgZXhwZWN0ZWQgdmFsdWVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IChjb25zdHJ1Y3RlZCBBc3NlcnRpb24pXG4gKiBAcGFyYW0ge0FyZ3VtZW50c30gY2hhaS5Bc3NlcnRpb24ucHJvdG90eXBlLmFzc2VydCBhcmd1bWVudHNcbiAqIEBuYW1lIGdldE1lc3NhZ2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqLCBhcmdzKSB7XG4gIHZhciBuZWdhdGUgPSBmbGFnKG9iaiwgJ25lZ2F0ZScpXG4gICAgLCB2YWwgPSBmbGFnKG9iaiwgJ29iamVjdCcpXG4gICAgLCBleHBlY3RlZCA9IGFyZ3NbM11cbiAgICAsIGFjdHVhbCA9IGdldEFjdHVhbChvYmosIGFyZ3MpXG4gICAgLCBtc2cgPSBuZWdhdGUgPyBhcmdzWzJdIDogYXJnc1sxXVxuICAgICwgZmxhZ01zZyA9IGZsYWcob2JqLCAnbWVzc2FnZScpO1xuXG4gIG1zZyA9IG1zZyB8fCAnJztcbiAgbXNnID0gbXNnXG4gICAgLnJlcGxhY2UoLyN7dGhpc30vZywgb2JqRGlzcGxheSh2YWwpKVxuICAgIC5yZXBsYWNlKC8je2FjdH0vZywgb2JqRGlzcGxheShhY3R1YWwpKVxuICAgIC5yZXBsYWNlKC8je2V4cH0vZywgb2JqRGlzcGxheShleHBlY3RlZCkpO1xuXG4gIHJldHVybiBmbGFnTXNnID8gZmxhZ01zZyArICc6ICcgKyBtc2cgOiBtc2c7XG59O1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZShcIi9ob21lL2Rvc3RvZGFic2kvY29kZS9iYWtrL2V4cGVyaW1lbnQtdGVtcGxhdGUvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvaW5zZXJ0LW1vZHVsZS1nbG9iYWxzL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy9nZXRNZXNzYWdlLmpzXCIsXCIvLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4vKiFcbiAqIENoYWkgLSBnZXROYW1lIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKipcbiAqICMgZ2V0TmFtZShmdW5jKVxuICpcbiAqIEdldHMgdGhlIG5hbWUgb2YgYSBmdW5jdGlvbiwgaW4gYSBjcm9zcy1icm93c2VyIHdheS5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBhIGZ1bmN0aW9uICh1c3VhbGx5IGEgY29uc3RydWN0b3IpXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZnVuYykge1xuICBpZiAoZnVuYy5uYW1lKSByZXR1cm4gZnVuYy5uYW1lO1xuXG4gIHZhciBtYXRjaCA9IC9eXFxzP2Z1bmN0aW9uIChbXihdKilcXCgvLmV4ZWMoZnVuYyk7XG4gIHJldHVybiBtYXRjaCAmJiBtYXRjaFsxXSA/IG1hdGNoWzFdIDogXCJcIjtcbn07XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiL2hvbWUvZG9zdG9kYWJzaS9jb2RlL2Jha2svZXhwZXJpbWVudC10ZW1wbGF0ZS9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9pbnNlcnQtbW9kdWxlLWdsb2JhbHMvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL3V0aWxzL2dldE5hbWUuanNcIixcIi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlsc1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbi8qIVxuICogQ2hhaSAtIGdldFBhdGhWYWx1ZSB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vbG9naWNhbHBhcmFkb3gvZmlsdHJcbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qKlxuICogIyMjIC5nZXRQYXRoVmFsdWUocGF0aCwgb2JqZWN0KVxuICpcbiAqIFRoaXMgYWxsb3dzIHRoZSByZXRyaWV2YWwgb2YgdmFsdWVzIGluIGFuXG4gKiBvYmplY3QgZ2l2ZW4gYSBzdHJpbmcgcGF0aC5cbiAqXG4gKiAgICAgdmFyIG9iaiA9IHtcbiAqICAgICAgICAgcHJvcDE6IHtcbiAqICAgICAgICAgICAgIGFycjogWydhJywgJ2InLCAnYyddXG4gKiAgICAgICAgICAgLCBzdHI6ICdIZWxsbydcbiAqICAgICAgICAgfVxuICogICAgICAgLCBwcm9wMjoge1xuICogICAgICAgICAgICAgYXJyOiBbIHsgbmVzdGVkOiAnVW5pdmVyc2UnIH0gXVxuICogICAgICAgICAgICwgc3RyOiAnSGVsbG8gYWdhaW4hJ1xuICogICAgICAgICB9XG4gKiAgICAgfVxuICpcbiAqIFRoZSBmb2xsb3dpbmcgd291bGQgYmUgdGhlIHJlc3VsdHMuXG4gKlxuICogICAgIGdldFBhdGhWYWx1ZSgncHJvcDEuc3RyJywgb2JqKTsgLy8gSGVsbG9cbiAqICAgICBnZXRQYXRoVmFsdWUoJ3Byb3AxLmF0dFsyXScsIG9iaik7IC8vIGJcbiAqICAgICBnZXRQYXRoVmFsdWUoJ3Byb3AyLmFyclswXS5uZXN0ZWQnLCBvYmopOyAvLyBVbml2ZXJzZVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0XG4gKiBAcmV0dXJucyB7T2JqZWN0fSB2YWx1ZSBvciBgdW5kZWZpbmVkYFxuICogQG5hbWUgZ2V0UGF0aFZhbHVlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnZhciBnZXRQYXRoVmFsdWUgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwYXRoLCBvYmopIHtcbiAgdmFyIHBhcnNlZCA9IHBhcnNlUGF0aChwYXRoKTtcbiAgcmV0dXJuIF9nZXRQYXRoVmFsdWUocGFyc2VkLCBvYmopO1xufTtcblxuLyohXG4gKiAjIyBwYXJzZVBhdGgocGF0aClcbiAqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdXNlZCB0byBwYXJzZSBzdHJpbmcgb2JqZWN0XG4gKiBwYXRocy4gVXNlIGluIGNvbmp1bmN0aW9uIHdpdGggYF9nZXRQYXRoVmFsdWVgLlxuICpcbiAqICAgICAgdmFyIHBhcnNlZCA9IHBhcnNlUGF0aCgnbXlvYmplY3QucHJvcGVydHkuc3VicHJvcCcpO1xuICpcbiAqICMjIyBQYXRoczpcbiAqXG4gKiAqIENhbiBiZSBhcyBuZWFyIGluZmluaXRlbHkgZGVlcCBhbmQgbmVzdGVkXG4gKiAqIEFycmF5cyBhcmUgYWxzbyB2YWxpZCB1c2luZyB0aGUgZm9ybWFsIGBteW9iamVjdC5kb2N1bWVudFszXS5wcm9wZXJ0eWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcbiAqIEByZXR1cm5zIHtPYmplY3R9IHBhcnNlZFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcGFyc2VQYXRoIChwYXRoKSB7XG4gIHZhciBzdHIgPSBwYXRoLnJlcGxhY2UoL1xcWy9nLCAnLlsnKVxuICAgICwgcGFydHMgPSBzdHIubWF0Y2goLyhcXFxcXFwufFteLl0rPykrL2cpO1xuICByZXR1cm4gcGFydHMubWFwKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHZhciByZSA9IC9cXFsoXFxkKylcXF0kL1xuICAgICAgLCBtQXJyID0gcmUuZXhlYyh2YWx1ZSlcbiAgICBpZiAobUFycikgcmV0dXJuIHsgaTogcGFyc2VGbG9hdChtQXJyWzFdKSB9O1xuICAgIGVsc2UgcmV0dXJuIHsgcDogdmFsdWUgfTtcbiAgfSk7XG59O1xuXG4vKiFcbiAqICMjIF9nZXRQYXRoVmFsdWUocGFyc2VkLCBvYmopXG4gKlxuICogSGVscGVyIGNvbXBhbmlvbiBmdW5jdGlvbiBmb3IgYC5wYXJzZVBhdGhgIHRoYXQgcmV0dXJuc1xuICogdGhlIHZhbHVlIGxvY2F0ZWQgYXQgdGhlIHBhcnNlZCBhZGRyZXNzLlxuICpcbiAqICAgICAgdmFyIHZhbHVlID0gZ2V0UGF0aFZhbHVlKHBhcnNlZCwgb2JqKTtcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFyc2VkIGRlZmluaXRpb24gZnJvbSBgcGFyc2VQYXRoYC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgdG8gc2VhcmNoIGFnYWluc3RcbiAqIEByZXR1cm5zIHtPYmplY3R8VW5kZWZpbmVkfSB2YWx1ZVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gX2dldFBhdGhWYWx1ZSAocGFyc2VkLCBvYmopIHtcbiAgdmFyIHRtcCA9IG9ialxuICAgICwgcmVzO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IHBhcnNlZC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICB2YXIgcGFydCA9IHBhcnNlZFtpXTtcbiAgICBpZiAodG1wKSB7XG4gICAgICBpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBwYXJ0LnApXG4gICAgICAgIHRtcCA9IHRtcFtwYXJ0LnBdO1xuICAgICAgZWxzZSBpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBwYXJ0LmkpXG4gICAgICAgIHRtcCA9IHRtcFtwYXJ0LmldO1xuICAgICAgaWYgKGkgPT0gKGwgLSAxKSkgcmVzID0gdG1wO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXMgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59O1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZShcIi9ob21lL2Rvc3RvZGFic2kvY29kZS9iYWtrL2V4cGVyaW1lbnQtdGVtcGxhdGUvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvaW5zZXJ0LW1vZHVsZS1nbG9iYWxzL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy9nZXRQYXRoVmFsdWUuanNcIixcIi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlsc1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbi8qIVxuICogQ2hhaSAtIGdldFByb3BlcnRpZXMgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qKlxuICogIyMjIC5nZXRQcm9wZXJ0aWVzKG9iamVjdClcbiAqXG4gKiBUaGlzIGFsbG93cyB0aGUgcmV0cmlldmFsIG9mIHByb3BlcnR5IG5hbWVzIG9mIGFuIG9iamVjdCwgZW51bWVyYWJsZSBvciBub3QsXG4gKiBpbmhlcml0ZWQgb3Igbm90LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBuYW1lIGdldFByb3BlcnRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRQcm9wZXJ0aWVzKG9iamVjdCkge1xuICB2YXIgcmVzdWx0ID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc3ViamVjdCk7XG5cbiAgZnVuY3Rpb24gYWRkUHJvcGVydHkocHJvcGVydHkpIHtcbiAgICBpZiAocmVzdWx0LmluZGV4T2YocHJvcGVydHkpID09PSAtMSkge1xuICAgICAgcmVzdWx0LnB1c2gocHJvcGVydHkpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihzdWJqZWN0KTtcbiAgd2hpbGUgKHByb3RvICE9PSBudWxsKSB7XG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocHJvdG8pLmZvckVhY2goYWRkUHJvcGVydHkpO1xuICAgIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZShcIi9ob21lL2Rvc3RvZGFic2kvY29kZS9iYWtrL2V4cGVyaW1lbnQtdGVtcGxhdGUvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvaW5zZXJ0LW1vZHVsZS1nbG9iYWxzL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy9nZXRQcm9wZXJ0aWVzLmpzXCIsXCIvLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4vKiFcbiAqIGNoYWlcbiAqIENvcHlyaWdodChjKSAyMDExIEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuLyohXG4gKiBNYWluIGV4cG9ydHNcbiAqL1xuXG52YXIgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8qIVxuICogdGVzdCB1dGlsaXR5XG4gKi9cblxuZXhwb3J0cy50ZXN0ID0gcmVxdWlyZSgnLi90ZXN0Jyk7XG5cbi8qIVxuICogdHlwZSB1dGlsaXR5XG4gKi9cblxuZXhwb3J0cy50eXBlID0gcmVxdWlyZSgnLi90eXBlJyk7XG5cbi8qIVxuICogbWVzc2FnZSB1dGlsaXR5XG4gKi9cblxuZXhwb3J0cy5nZXRNZXNzYWdlID0gcmVxdWlyZSgnLi9nZXRNZXNzYWdlJyk7XG5cbi8qIVxuICogYWN0dWFsIHV0aWxpdHlcbiAqL1xuXG5leHBvcnRzLmdldEFjdHVhbCA9IHJlcXVpcmUoJy4vZ2V0QWN0dWFsJyk7XG5cbi8qIVxuICogSW5zcGVjdCB1dGlsXG4gKi9cblxuZXhwb3J0cy5pbnNwZWN0ID0gcmVxdWlyZSgnLi9pbnNwZWN0Jyk7XG5cbi8qIVxuICogT2JqZWN0IERpc3BsYXkgdXRpbFxuICovXG5cbmV4cG9ydHMub2JqRGlzcGxheSA9IHJlcXVpcmUoJy4vb2JqRGlzcGxheScpO1xuXG4vKiFcbiAqIEZsYWcgdXRpbGl0eVxuICovXG5cbmV4cG9ydHMuZmxhZyA9IHJlcXVpcmUoJy4vZmxhZycpO1xuXG4vKiFcbiAqIEZsYWcgdHJhbnNmZXJyaW5nIHV0aWxpdHlcbiAqL1xuXG5leHBvcnRzLnRyYW5zZmVyRmxhZ3MgPSByZXF1aXJlKCcuL3RyYW5zZmVyRmxhZ3MnKTtcblxuLyohXG4gKiBEZWVwIGVxdWFsIHV0aWxpdHlcbiAqL1xuXG5leHBvcnRzLmVxbCA9IHJlcXVpcmUoJ2RlZXAtZXFsJyk7XG5cbi8qIVxuICogRGVlcCBwYXRoIHZhbHVlXG4gKi9cblxuZXhwb3J0cy5nZXRQYXRoVmFsdWUgPSByZXF1aXJlKCcuL2dldFBhdGhWYWx1ZScpO1xuXG4vKiFcbiAqIEZ1bmN0aW9uIG5hbWVcbiAqL1xuXG5leHBvcnRzLmdldE5hbWUgPSByZXF1aXJlKCcuL2dldE5hbWUnKTtcblxuLyohXG4gKiBhZGQgUHJvcGVydHlcbiAqL1xuXG5leHBvcnRzLmFkZFByb3BlcnR5ID0gcmVxdWlyZSgnLi9hZGRQcm9wZXJ0eScpO1xuXG4vKiFcbiAqIGFkZCBNZXRob2RcbiAqL1xuXG5leHBvcnRzLmFkZE1ldGhvZCA9IHJlcXVpcmUoJy4vYWRkTWV0aG9kJyk7XG5cbi8qIVxuICogb3ZlcndyaXRlIFByb3BlcnR5XG4gKi9cblxuZXhwb3J0cy5vdmVyd3JpdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vb3ZlcndyaXRlUHJvcGVydHknKTtcblxuLyohXG4gKiBvdmVyd3JpdGUgTWV0aG9kXG4gKi9cblxuZXhwb3J0cy5vdmVyd3JpdGVNZXRob2QgPSByZXF1aXJlKCcuL292ZXJ3cml0ZU1ldGhvZCcpO1xuXG4vKiFcbiAqIEFkZCBhIGNoYWluYWJsZSBtZXRob2RcbiAqL1xuXG5leHBvcnRzLmFkZENoYWluYWJsZU1ldGhvZCA9IHJlcXVpcmUoJy4vYWRkQ2hhaW5hYmxlTWV0aG9kJyk7XG5cbi8qIVxuICogT3ZlcndyaXRlIGNoYWluYWJsZSBtZXRob2RcbiAqL1xuXG5leHBvcnRzLm92ZXJ3cml0ZUNoYWluYWJsZU1ldGhvZCA9IHJlcXVpcmUoJy4vb3ZlcndyaXRlQ2hhaW5hYmxlTWV0aG9kJyk7XG5cblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCIvaG9tZS9kb3N0b2RhYnNpL2NvZGUvYmFray9leHBlcmltZW50LXRlbXBsYXRlL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvaW5kZXguanNcIixcIi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlsc1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbi8vIFRoaXMgaXMgKGFsbW9zdCkgZGlyZWN0bHkgZnJvbSBOb2RlLmpzIHV0aWxzXG4vLyBodHRwczovL2dpdGh1Yi5jb20vam95ZW50L25vZGUvYmxvYi9mOGMzMzVkMGNhZjQ3ZjE2ZDMxNDEzZjg5YWEyOGVkYTM4NzhlM2FhL2xpYi91dGlsLmpzXG5cbnZhciBnZXROYW1lID0gcmVxdWlyZSgnLi9nZXROYW1lJyk7XG52YXIgZ2V0UHJvcGVydGllcyA9IHJlcXVpcmUoJy4vZ2V0UHJvcGVydGllcycpO1xudmFyIGdldEVudW1lcmFibGVQcm9wZXJ0aWVzID0gcmVxdWlyZSgnLi9nZXRFbnVtZXJhYmxlUHJvcGVydGllcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGluc3BlY3Q7XG5cbi8qKlxuICogRWNob3MgdGhlIHZhbHVlIG9mIGEgdmFsdWUuIFRyeXMgdG8gcHJpbnQgdGhlIHZhbHVlIG91dFxuICogaW4gdGhlIGJlc3Qgd2F5IHBvc3NpYmxlIGdpdmVuIHRoZSBkaWZmZXJlbnQgdHlwZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIHByaW50IG91dC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gc2hvd0hpZGRlbiBGbGFnIHRoYXQgc2hvd3MgaGlkZGVuIChub3QgZW51bWVyYWJsZSlcbiAqICAgIHByb3BlcnRpZXMgb2Ygb2JqZWN0cy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBkZXB0aCBEZXB0aCBpbiB3aGljaCB0byBkZXNjZW5kIGluIG9iamVjdC4gRGVmYXVsdCBpcyAyLlxuICogQHBhcmFtIHtCb29sZWFufSBjb2xvcnMgRmxhZyB0byB0dXJuIG9uIEFOU0kgZXNjYXBlIGNvZGVzIHRvIGNvbG9yIHRoZVxuICogICAgb3V0cHV0LiBEZWZhdWx0IGlzIGZhbHNlIChubyBjb2xvcmluZykuXG4gKi9cbmZ1bmN0aW9uIGluc3BlY3Qob2JqLCBzaG93SGlkZGVuLCBkZXB0aCwgY29sb3JzKSB7XG4gIHZhciBjdHggPSB7XG4gICAgc2hvd0hpZGRlbjogc2hvd0hpZGRlbixcbiAgICBzZWVuOiBbXSxcbiAgICBzdHlsaXplOiBmdW5jdGlvbiAoc3RyKSB7IHJldHVybiBzdHI7IH1cbiAgfTtcbiAgcmV0dXJuIGZvcm1hdFZhbHVlKGN0eCwgb2JqLCAodHlwZW9mIGRlcHRoID09PSAndW5kZWZpbmVkJyA/IDIgOiBkZXB0aCkpO1xufVxuXG4vLyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS8xMDQ0MTI4L1xudmFyIGdldE91dGVySFRNTCA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgaWYgKCdvdXRlckhUTUwnIGluIGVsZW1lbnQpIHJldHVybiBlbGVtZW50Lm91dGVySFRNTDtcbiAgdmFyIG5zID0gXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCI7XG4gIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobnMsICdfJyk7XG4gIHZhciBlbGVtUHJvdG8gPSAod2luZG93LkhUTUxFbGVtZW50IHx8IHdpbmRvdy5FbGVtZW50KS5wcm90b3R5cGU7XG4gIHZhciB4bWxTZXJpYWxpemVyID0gbmV3IFhNTFNlcmlhbGl6ZXIoKTtcbiAgdmFyIGh0bWw7XG4gIGlmIChkb2N1bWVudC54bWxWZXJzaW9uKSB7XG4gICAgcmV0dXJuIHhtbFNlcmlhbGl6ZXIuc2VyaWFsaXplVG9TdHJpbmcoZWxlbWVudCk7XG4gIH0gZWxzZSB7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGVsZW1lbnQuY2xvbmVOb2RlKGZhbHNlKSk7XG4gICAgaHRtbCA9IGNvbnRhaW5lci5pbm5lckhUTUwucmVwbGFjZSgnPjwnLCAnPicgKyBlbGVtZW50LmlubmVySFRNTCArICc8Jyk7XG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgIHJldHVybiBodG1sO1xuICB9XG59O1xuXG4vLyBSZXR1cm5zIHRydWUgaWYgb2JqZWN0IGlzIGEgRE9NIGVsZW1lbnQuXG52YXIgaXNET01FbGVtZW50ID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICBpZiAodHlwZW9mIEhUTUxFbGVtZW50ID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBvYmplY3QgaW5zdGFuY2VvZiBIVE1MRWxlbWVudDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb2JqZWN0ICYmXG4gICAgICB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJlxuICAgICAgb2JqZWN0Lm5vZGVUeXBlID09PSAxICYmXG4gICAgICB0eXBlb2Ygb2JqZWN0Lm5vZGVOYW1lID09PSAnc3RyaW5nJztcbiAgfVxufTtcblxuZnVuY3Rpb24gZm9ybWF0VmFsdWUoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzKSB7XG4gIC8vIFByb3ZpZGUgYSBob29rIGZvciB1c2VyLXNwZWNpZmllZCBpbnNwZWN0IGZ1bmN0aW9ucy5cbiAgLy8gQ2hlY2sgdGhhdCB2YWx1ZSBpcyBhbiBvYmplY3Qgd2l0aCBhbiBpbnNwZWN0IGZ1bmN0aW9uIG9uIGl0XG4gIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUuaW5zcGVjdCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgLy8gRmlsdGVyIG91dCB0aGUgdXRpbCBtb2R1bGUsIGl0J3MgaW5zcGVjdCBmdW5jdGlvbiBpcyBzcGVjaWFsXG4gICAgICB2YWx1ZS5pbnNwZWN0ICE9PSBleHBvcnRzLmluc3BlY3QgJiZcbiAgICAgIC8vIEFsc28gZmlsdGVyIG91dCBhbnkgcHJvdG90eXBlIG9iamVjdHMgdXNpbmcgdGhlIGNpcmN1bGFyIGNoZWNrLlxuICAgICAgISh2YWx1ZS5jb25zdHJ1Y3RvciAmJiB2YWx1ZS5jb25zdHJ1Y3Rvci5wcm90b3R5cGUgPT09IHZhbHVlKSkge1xuICAgIHZhciByZXQgPSB2YWx1ZS5pbnNwZWN0KHJlY3Vyc2VUaW1lcyk7XG4gICAgaWYgKHR5cGVvZiByZXQgIT09ICdzdHJpbmcnKSB7XG4gICAgICByZXQgPSBmb3JtYXRWYWx1ZShjdHgsIHJldCwgcmVjdXJzZVRpbWVzKTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIC8vIFByaW1pdGl2ZSB0eXBlcyBjYW5ub3QgaGF2ZSBwcm9wZXJ0aWVzXG4gIHZhciBwcmltaXRpdmUgPSBmb3JtYXRQcmltaXRpdmUoY3R4LCB2YWx1ZSk7XG4gIGlmIChwcmltaXRpdmUpIHtcbiAgICByZXR1cm4gcHJpbWl0aXZlO1xuICB9XG5cbiAgLy8gSWYgaXQncyBET00gZWxlbSwgZ2V0IG91dGVyIEhUTUwuXG4gIGlmIChpc0RPTUVsZW1lbnQodmFsdWUpKSB7XG4gICAgcmV0dXJuIGdldE91dGVySFRNTCh2YWx1ZSk7XG4gIH1cblxuICAvLyBMb29rIHVwIHRoZSBrZXlzIG9mIHRoZSBvYmplY3QuXG4gIHZhciB2aXNpYmxlS2V5cyA9IGdldEVudW1lcmFibGVQcm9wZXJ0aWVzKHZhbHVlKTtcbiAgdmFyIGtleXMgPSBjdHguc2hvd0hpZGRlbiA/IGdldFByb3BlcnRpZXModmFsdWUpIDogdmlzaWJsZUtleXM7XG5cbiAgLy8gU29tZSB0eXBlIG9mIG9iamVjdCB3aXRob3V0IHByb3BlcnRpZXMgY2FuIGJlIHNob3J0Y3V0dGVkLlxuICAvLyBJbiBJRSwgZXJyb3JzIGhhdmUgYSBzaW5nbGUgYHN0YWNrYCBwcm9wZXJ0eSwgb3IgaWYgdGhleSBhcmUgdmFuaWxsYSBgRXJyb3JgLFxuICAvLyBhIGBzdGFja2AgcGx1cyBgZGVzY3JpcHRpb25gIHByb3BlcnR5OyBpZ25vcmUgdGhvc2UgZm9yIGNvbnNpc3RlbmN5LlxuICBpZiAoa2V5cy5sZW5ndGggPT09IDAgfHwgKGlzRXJyb3IodmFsdWUpICYmIChcbiAgICAgIChrZXlzLmxlbmd0aCA9PT0gMSAmJiBrZXlzWzBdID09PSAnc3RhY2snKSB8fFxuICAgICAgKGtleXMubGVuZ3RoID09PSAyICYmIGtleXNbMF0gPT09ICdkZXNjcmlwdGlvbicgJiYga2V5c1sxXSA9PT0gJ3N0YWNrJylcbiAgICAgKSkpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB2YXIgbmFtZSA9IGdldE5hbWUodmFsdWUpO1xuICAgICAgdmFyIG5hbWVTdWZmaXggPSBuYW1lID8gJzogJyArIG5hbWUgOiAnJztcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnW0Z1bmN0aW9uJyArIG5hbWVTdWZmaXggKyAnXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICAgIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAncmVnZXhwJyk7XG4gICAgfVxuICAgIGlmIChpc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoRGF0ZS5wcm90b3R5cGUudG9VVENTdHJpbmcuY2FsbCh2YWx1ZSksICdkYXRlJyk7XG4gICAgfVxuICAgIGlmIChpc0Vycm9yKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICB2YXIgYmFzZSA9ICcnLCBhcnJheSA9IGZhbHNlLCBicmFjZXMgPSBbJ3snLCAnfSddO1xuXG4gIC8vIE1ha2UgQXJyYXkgc2F5IHRoYXQgdGhleSBhcmUgQXJyYXlcbiAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgYXJyYXkgPSB0cnVlO1xuICAgIGJyYWNlcyA9IFsnWycsICddJ107XG4gIH1cblxuICAvLyBNYWtlIGZ1bmN0aW9ucyBzYXkgdGhhdCB0aGV5IGFyZSBmdW5jdGlvbnNcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciBuYW1lID0gZ2V0TmFtZSh2YWx1ZSk7XG4gICAgdmFyIG5hbWVTdWZmaXggPSBuYW1lID8gJzogJyArIG5hbWUgOiAnJztcbiAgICBiYXNlID0gJyBbRnVuY3Rpb24nICsgbmFtZVN1ZmZpeCArICddJztcbiAgfVxuXG4gIC8vIE1ha2UgUmVnRXhwcyBzYXkgdGhhdCB0aGV5IGFyZSBSZWdFeHBzXG4gIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgfVxuXG4gIC8vIE1ha2UgZGF0ZXMgd2l0aCBwcm9wZXJ0aWVzIGZpcnN0IHNheSB0aGUgZGF0ZVxuICBpZiAoaXNEYXRlKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBEYXRlLnByb3RvdHlwZS50b1VUQ1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgfVxuXG4gIC8vIE1ha2UgZXJyb3Igd2l0aCBtZXNzYWdlIGZpcnN0IHNheSB0aGUgZXJyb3JcbiAgaWYgKGlzRXJyb3IodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgfVxuXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMCAmJiAoIWFycmF5IHx8IHZhbHVlLmxlbmd0aCA9PSAwKSkge1xuICAgIHJldHVybiBicmFjZXNbMF0gKyBiYXNlICsgYnJhY2VzWzFdO1xuICB9XG5cbiAgaWYgKHJlY3Vyc2VUaW1lcyA8IDApIHtcbiAgICBpZiAoaXNSZWdFeHAodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoUmVnRXhwLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKSwgJ3JlZ2V4cCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoJ1tPYmplY3RdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH1cblxuICBjdHguc2Vlbi5wdXNoKHZhbHVlKTtcblxuICB2YXIgb3V0cHV0O1xuICBpZiAoYXJyYXkpIHtcbiAgICBvdXRwdXQgPSBmb3JtYXRBcnJheShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXlzKTtcbiAgfSBlbHNlIHtcbiAgICBvdXRwdXQgPSBrZXlzLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiBmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXksIGFycmF5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGN0eC5zZWVuLnBvcCgpO1xuXG4gIHJldHVybiByZWR1Y2VUb1NpbmdsZVN0cmluZyhvdXRwdXQsIGJhc2UsIGJyYWNlcyk7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0UHJpbWl0aXZlKGN0eCwgdmFsdWUpIHtcbiAgc3dpdGNoICh0eXBlb2YgdmFsdWUpIHtcbiAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKCd1bmRlZmluZWQnLCAndW5kZWZpbmVkJyk7XG5cbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgdmFyIHNpbXBsZSA9ICdcXCcnICsgSlNPTi5zdHJpbmdpZnkodmFsdWUpLnJlcGxhY2UoL15cInxcIiQvZywgJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8nL2csIFwiXFxcXCdcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKSArICdcXCcnO1xuICAgICAgcmV0dXJuIGN0eC5zdHlsaXplKHNpbXBsZSwgJ3N0cmluZycpO1xuXG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnJyArIHZhbHVlLCAnbnVtYmVyJyk7XG5cbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnJyArIHZhbHVlLCAnYm9vbGVhbicpO1xuICB9XG4gIC8vIEZvciBzb21lIHJlYXNvbiB0eXBlb2YgbnVsbCBpcyBcIm9iamVjdFwiLCBzbyBzcGVjaWFsIGNhc2UgaGVyZS5cbiAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGN0eC5zdHlsaXplKCdudWxsJywgJ251bGwnKTtcbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGZvcm1hdEVycm9yKHZhbHVlKSB7XG4gIHJldHVybiAnWycgKyBFcnJvci5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgKyAnXSc7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0QXJyYXkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5cykge1xuICB2YXIgb3V0cHV0ID0gW107XG4gIGZvciAodmFyIGkgPSAwLCBsID0gdmFsdWUubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgU3RyaW5nKGkpKSkge1xuICAgICAgb3V0cHV0LnB1c2goZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cyxcbiAgICAgICAgICBTdHJpbmcoaSksIHRydWUpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3V0cHV0LnB1c2goJycpO1xuICAgIH1cbiAgfVxuICBrZXlzLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgaWYgKCFrZXkubWF0Y2goL15cXGQrJC8pKSB7XG4gICAgICBvdXRwdXQucHVzaChmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLFxuICAgICAgICAgIGtleSwgdHJ1ZSkpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBvdXRwdXQ7XG59XG5cblxuZnVuY3Rpb24gZm9ybWF0UHJvcGVydHkoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzLCB2aXNpYmxlS2V5cywga2V5LCBhcnJheSkge1xuICB2YXIgbmFtZSwgc3RyO1xuICBpZiAodmFsdWUuX19sb29rdXBHZXR0ZXJfXykge1xuICAgIGlmICh2YWx1ZS5fX2xvb2t1cEdldHRlcl9fKGtleSkpIHtcbiAgICAgIGlmICh2YWx1ZS5fX2xvb2t1cFNldHRlcl9fKGtleSkpIHtcbiAgICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tHZXR0ZXIvU2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0dldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodmFsdWUuX19sb29rdXBTZXR0ZXJfXyhrZXkpKSB7XG4gICAgICAgIHN0ciA9IGN0eC5zdHlsaXplKCdbU2V0dGVyXScsICdzcGVjaWFsJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmICh2aXNpYmxlS2V5cy5pbmRleE9mKGtleSkgPCAwKSB7XG4gICAgbmFtZSA9ICdbJyArIGtleSArICddJztcbiAgfVxuICBpZiAoIXN0cikge1xuICAgIGlmIChjdHguc2Vlbi5pbmRleE9mKHZhbHVlW2tleV0pIDwgMCkge1xuICAgICAgaWYgKHJlY3Vyc2VUaW1lcyA9PT0gbnVsbCkge1xuICAgICAgICBzdHIgPSBmb3JtYXRWYWx1ZShjdHgsIHZhbHVlW2tleV0sIG51bGwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RyID0gZm9ybWF0VmFsdWUoY3R4LCB2YWx1ZVtrZXldLCByZWN1cnNlVGltZXMgLSAxKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdHIuaW5kZXhPZignXFxuJykgPiAtMSkge1xuICAgICAgICBpZiAoYXJyYXkpIHtcbiAgICAgICAgICBzdHIgPSBzdHIuc3BsaXQoJ1xcbicpLm1hcChmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gJyAgJyArIGxpbmU7XG4gICAgICAgICAgfSkuam9pbignXFxuJykuc3Vic3RyKDIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0ciA9ICdcXG4nICsgc3RyLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24obGluZSkge1xuICAgICAgICAgICAgcmV0dXJuICcgICAnICsgbGluZTtcbiAgICAgICAgICB9KS5qb2luKCdcXG4nKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0NpcmN1bGFyXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICB9XG4gIGlmICh0eXBlb2YgbmFtZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAoYXJyYXkgJiYga2V5Lm1hdGNoKC9eXFxkKyQvKSkge1xuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgbmFtZSA9IEpTT04uc3RyaW5naWZ5KCcnICsga2V5KTtcbiAgICBpZiAobmFtZS5tYXRjaCgvXlwiKFthLXpBLVpfXVthLXpBLVpfMC05XSopXCIkLykpIHtcbiAgICAgIG5hbWUgPSBuYW1lLnN1YnN0cigxLCBuYW1lLmxlbmd0aCAtIDIpO1xuICAgICAgbmFtZSA9IGN0eC5zdHlsaXplKG5hbWUsICduYW1lJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKVxuICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXFwiL2csICdcIicpXG4gICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8oXlwifFwiJCkvZywgXCInXCIpO1xuICAgICAgbmFtZSA9IGN0eC5zdHlsaXplKG5hbWUsICdzdHJpbmcnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmFtZSArICc6ICcgKyBzdHI7XG59XG5cblxuZnVuY3Rpb24gcmVkdWNlVG9TaW5nbGVTdHJpbmcob3V0cHV0LCBiYXNlLCBicmFjZXMpIHtcbiAgdmFyIG51bUxpbmVzRXN0ID0gMDtcbiAgdmFyIGxlbmd0aCA9IG91dHB1dC5yZWR1Y2UoZnVuY3Rpb24ocHJldiwgY3VyKSB7XG4gICAgbnVtTGluZXNFc3QrKztcbiAgICBpZiAoY3VyLmluZGV4T2YoJ1xcbicpID49IDApIG51bUxpbmVzRXN0Kys7XG4gICAgcmV0dXJuIHByZXYgKyBjdXIubGVuZ3RoICsgMTtcbiAgfSwgMCk7XG5cbiAgaWYgKGxlbmd0aCA+IDYwKSB7XG4gICAgcmV0dXJuIGJyYWNlc1swXSArXG4gICAgICAgICAgIChiYXNlID09PSAnJyA/ICcnIDogYmFzZSArICdcXG4gJykgK1xuICAgICAgICAgICAnICcgK1xuICAgICAgICAgICBvdXRwdXQuam9pbignLFxcbiAgJykgK1xuICAgICAgICAgICAnICcgK1xuICAgICAgICAgICBicmFjZXNbMV07XG4gIH1cblxuICByZXR1cm4gYnJhY2VzWzBdICsgYmFzZSArICcgJyArIG91dHB1dC5qb2luKCcsICcpICsgJyAnICsgYnJhY2VzWzFdO1xufVxuXG5mdW5jdGlvbiBpc0FycmF5KGFyKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KGFyKSB8fFxuICAgICAgICAgKHR5cGVvZiBhciA9PT0gJ29iamVjdCcgJiYgb2JqZWN0VG9TdHJpbmcoYXIpID09PSAnW29iamVjdCBBcnJheV0nKTtcbn1cblxuZnVuY3Rpb24gaXNSZWdFeHAocmUpIHtcbiAgcmV0dXJuIHR5cGVvZiByZSA9PT0gJ29iamVjdCcgJiYgb2JqZWN0VG9TdHJpbmcocmUpID09PSAnW29iamVjdCBSZWdFeHBdJztcbn1cblxuZnVuY3Rpb24gaXNEYXRlKGQpIHtcbiAgcmV0dXJuIHR5cGVvZiBkID09PSAnb2JqZWN0JyAmJiBvYmplY3RUb1N0cmluZyhkKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuXG5mdW5jdGlvbiBpc0Vycm9yKGUpIHtcbiAgcmV0dXJuIHR5cGVvZiBlID09PSAnb2JqZWN0JyAmJiBvYmplY3RUb1N0cmluZyhlKSA9PT0gJ1tvYmplY3QgRXJyb3JdJztcbn1cblxuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcobykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pO1xufVxuXG59KS5jYWxsKHRoaXMscmVxdWlyZShcIi9ob21lL2Rvc3RvZGFic2kvY29kZS9iYWtrL2V4cGVyaW1lbnQtdGVtcGxhdGUvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvaW5zZXJ0LW1vZHVsZS1nbG9iYWxzL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy9pbnNwZWN0LmpzXCIsXCIvLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4vKiFcbiAqIENoYWkgLSBmbGFnIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKiFcbiAqIE1vZHVsZSBkZXBlbmRhbmNpZXNcbiAqL1xuXG52YXIgaW5zcGVjdCA9IHJlcXVpcmUoJy4vaW5zcGVjdCcpO1xuXG4vKipcbiAqICMjIyAub2JqRGlzcGxheSAob2JqZWN0KVxuICpcbiAqIERldGVybWluZXMgaWYgYW4gb2JqZWN0IG9yIGFuIGFycmF5IG1hdGNoZXNcbiAqIGNyaXRlcmlhIHRvIGJlIGluc3BlY3RlZCBpbi1saW5lIGZvciBlcnJvclxuICogbWVzc2FnZXMgb3Igc2hvdWxkIGJlIHRydW5jYXRlZC5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSBqYXZhc2NyaXB0IG9iamVjdCB0byBpbnNwZWN0XG4gKiBAbmFtZSBvYmpEaXNwbGF5XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICB2YXIgc3RyID0gaW5zcGVjdChvYmopXG4gICAgLCB0eXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaik7XG5cbiAgaWYgKHN0ci5sZW5ndGggPj0gNDApIHtcbiAgICBpZiAodHlwZSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJykge1xuICAgICAgcmV0dXJuICFvYmoubmFtZSB8fCBvYmoubmFtZSA9PT0gJydcbiAgICAgICAgPyAnW0Z1bmN0aW9uXSdcbiAgICAgICAgOiAnW0Z1bmN0aW9uOiAnICsgb2JqLm5hbWUgKyAnXSc7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnW29iamVjdCBBcnJheV0nKSB7XG4gICAgICByZXR1cm4gJ1sgQXJyYXkoJyArIG9iai5sZW5ndGggKyAnKSBdJztcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdbb2JqZWN0IE9iamVjdF0nKSB7XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iailcbiAgICAgICAgLCBrc3RyID0ga2V5cy5sZW5ndGggPiAyXG4gICAgICAgICAgPyBrZXlzLnNwbGljZSgwLCAyKS5qb2luKCcsICcpICsgJywgLi4uJ1xuICAgICAgICAgIDoga2V5cy5qb2luKCcsICcpO1xuICAgICAgcmV0dXJuICd7IE9iamVjdCAoJyArIGtzdHIgKyAnKSB9JztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxufTtcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCIvaG9tZS9kb3N0b2RhYnNpL2NvZGUvYmFray9leHBlcmltZW50LXRlbXBsYXRlL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvb2JqRGlzcGxheS5qc1wiLFwiLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL3V0aWxzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuLyohXG4gKiBDaGFpIC0gb3ZlcndyaXRlQ2hhaW5hYmxlTWV0aG9kIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKipcbiAqICMjIyBvdmVyd3JpdGVDaGFpbmFibGVNZXRob2QgKGN0eCwgbmFtZSwgZm4pXG4gKlxuICogT3ZlcndpdGVzIGFuIGFscmVhZHkgZXhpc3RpbmcgY2hhaW5hYmxlIG1ldGhvZFxuICogYW5kIHByb3ZpZGVzIGFjY2VzcyB0byB0aGUgcHJldmlvdXMgZnVuY3Rpb24gb3JcbiAqIHByb3BlcnR5LiAgTXVzdCByZXR1cm4gZnVuY3Rpb25zIHRvIGJlIHVzZWQgZm9yXG4gKiBuYW1lLlxuICpcbiAqICAgICB1dGlscy5vdmVyd3JpdGVDaGFpbmFibGVNZXRob2QoY2hhaS5Bc3NlcnRpb24ucHJvdG90eXBlLCAnbGVuZ3RoJyxcbiAqICAgICAgIGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAqICAgICAgIH1cbiAqICAgICAsIGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAqICAgICAgIH1cbiAqICAgICApO1xuICpcbiAqIENhbiBhbHNvIGJlIGFjY2Vzc2VkIGRpcmVjdGx5IGZyb20gYGNoYWkuQXNzZXJ0aW9uYC5cbiAqXG4gKiAgICAgY2hhaS5Bc3NlcnRpb24ub3ZlcndyaXRlQ2hhaW5hYmxlTWV0aG9kKCdmb28nLCBmbiwgZm4pO1xuICpcbiAqIFRoZW4gY2FuIGJlIHVzZWQgYXMgYW55IG90aGVyIGFzc2VydGlvbi5cbiAqXG4gKiAgICAgZXhwZWN0KG15Rm9vKS50by5oYXZlLmxlbmd0aCgzKTtcbiAqICAgICBleHBlY3QobXlGb28pLnRvLmhhdmUubGVuZ3RoLmFib3ZlKDMpO1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjdHggb2JqZWN0IHdob3NlIG1ldGhvZCAvIHByb3BlcnR5IGlzIHRvIGJlIG92ZXJ3cml0dGVuXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBvZiBtZXRob2QgLyBwcm9wZXJ0eSB0byBvdmVyd3JpdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1ldGhvZCBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBmdW5jdGlvbiB0byBiZSB1c2VkIGZvciBuYW1lXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjaGFpbmluZ0JlaGF2aW9yIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIGZ1bmN0aW9uIHRvIGJlIHVzZWQgZm9yIHByb3BlcnR5XG4gKiBAbmFtZSBvdmVyd3JpdGVDaGFpbmFibGVNZXRob2RcbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3R4LCBuYW1lLCBtZXRob2QsIGNoYWluaW5nQmVoYXZpb3IpIHtcbiAgdmFyIGNoYWluYWJsZUJlaGF2aW9yID0gY3R4Ll9fbWV0aG9kc1tuYW1lXTtcblxuICB2YXIgX2NoYWluaW5nQmVoYXZpb3IgPSBjaGFpbmFibGVCZWhhdmlvci5jaGFpbmluZ0JlaGF2aW9yO1xuICBjaGFpbmFibGVCZWhhdmlvci5jaGFpbmluZ0JlaGF2aW9yID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciByZXN1bHQgPSBjaGFpbmluZ0JlaGF2aW9yKF9jaGFpbmluZ0JlaGF2aW9yKS5jYWxsKHRoaXMpO1xuICAgIHJldHVybiByZXN1bHQgPT09IHVuZGVmaW5lZCA/IHRoaXMgOiByZXN1bHQ7XG4gIH07XG5cbiAgdmFyIF9tZXRob2QgPSBjaGFpbmFibGVCZWhhdmlvci5tZXRob2Q7XG4gIGNoYWluYWJsZUJlaGF2aW9yLm1ldGhvZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcmVzdWx0ID0gbWV0aG9kKF9tZXRob2QpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIHJlc3VsdCA9PT0gdW5kZWZpbmVkID8gdGhpcyA6IHJlc3VsdDtcbiAgfTtcbn07XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiL2hvbWUvZG9zdG9kYWJzaS9jb2RlL2Jha2svZXhwZXJpbWVudC10ZW1wbGF0ZS9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9pbnNlcnQtbW9kdWxlLWdsb2JhbHMvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL3V0aWxzL292ZXJ3cml0ZUNoYWluYWJsZU1ldGhvZC5qc1wiLFwiLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL3V0aWxzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuLyohXG4gKiBDaGFpIC0gb3ZlcndyaXRlTWV0aG9kIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKipcbiAqICMjIyBvdmVyd3JpdGVNZXRob2QgKGN0eCwgbmFtZSwgZm4pXG4gKlxuICogT3ZlcndpdGVzIGFuIGFscmVhZHkgZXhpc3RpbmcgbWV0aG9kIGFuZCBwcm92aWRlc1xuICogYWNjZXNzIHRvIHByZXZpb3VzIGZ1bmN0aW9uLiBNdXN0IHJldHVybiBmdW5jdGlvblxuICogdG8gYmUgdXNlZCBmb3IgbmFtZS5cbiAqXG4gKiAgICAgdXRpbHMub3ZlcndyaXRlTWV0aG9kKGNoYWkuQXNzZXJ0aW9uLnByb3RvdHlwZSwgJ2VxdWFsJywgZnVuY3Rpb24gKF9zdXBlcikge1xuICogICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdHIpIHtcbiAqICAgICAgICAgdmFyIG9iaiA9IHV0aWxzLmZsYWcodGhpcywgJ29iamVjdCcpO1xuICogICAgICAgICBpZiAob2JqIGluc3RhbmNlb2YgRm9vKSB7XG4gKiAgICAgICAgICAgbmV3IGNoYWkuQXNzZXJ0aW9uKG9iai52YWx1ZSkudG8uZXF1YWwoc3RyKTtcbiAqICAgICAgICAgfSBlbHNlIHtcbiAqICAgICAgICAgICBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAqICAgICAgICAgfVxuICogICAgICAgfVxuICogICAgIH0pO1xuICpcbiAqIENhbiBhbHNvIGJlIGFjY2Vzc2VkIGRpcmVjdGx5IGZyb20gYGNoYWkuQXNzZXJ0aW9uYC5cbiAqXG4gKiAgICAgY2hhaS5Bc3NlcnRpb24ub3ZlcndyaXRlTWV0aG9kKCdmb28nLCBmbik7XG4gKlxuICogVGhlbiBjYW4gYmUgdXNlZCBhcyBhbnkgb3RoZXIgYXNzZXJ0aW9uLlxuICpcbiAqICAgICBleHBlY3QobXlGb28pLnRvLmVxdWFsKCdiYXInKTtcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY3R4IG9iamVjdCB3aG9zZSBtZXRob2QgaXMgdG8gYmUgb3ZlcndyaXR0ZW5cbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIG9mIG1ldGhvZCB0byBvdmVyd3JpdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1ldGhvZCBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBmdW5jdGlvbiB0byBiZSB1c2VkIGZvciBuYW1lXG4gKiBAbmFtZSBvdmVyd3JpdGVNZXRob2RcbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3R4LCBuYW1lLCBtZXRob2QpIHtcbiAgdmFyIF9tZXRob2QgPSBjdHhbbmFtZV1cbiAgICAsIF9zdXBlciA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH07XG5cbiAgaWYgKF9tZXRob2QgJiYgJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIF9tZXRob2QpXG4gICAgX3N1cGVyID0gX21ldGhvZDtcblxuICBjdHhbbmFtZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJlc3VsdCA9IG1ldGhvZChfc3VwZXIpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIHJlc3VsdCA9PT0gdW5kZWZpbmVkID8gdGhpcyA6IHJlc3VsdDtcbiAgfVxufTtcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCIvaG9tZS9kb3N0b2RhYnNpL2NvZGUvYmFray9leHBlcmltZW50LXRlbXBsYXRlL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHMvb3ZlcndyaXRlTWV0aG9kLmpzXCIsXCIvLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4vKiFcbiAqIENoYWkgLSBvdmVyd3JpdGVQcm9wZXJ0eSB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuLyoqXG4gKiAjIyMgb3ZlcndyaXRlUHJvcGVydHkgKGN0eCwgbmFtZSwgZm4pXG4gKlxuICogT3ZlcndpdGVzIGFuIGFscmVhZHkgZXhpc3RpbmcgcHJvcGVydHkgZ2V0dGVyIGFuZCBwcm92aWRlc1xuICogYWNjZXNzIHRvIHByZXZpb3VzIHZhbHVlLiBNdXN0IHJldHVybiBmdW5jdGlvbiB0byB1c2UgYXMgZ2V0dGVyLlxuICpcbiAqICAgICB1dGlscy5vdmVyd3JpdGVQcm9wZXJ0eShjaGFpLkFzc2VydGlvbi5wcm90b3R5cGUsICdvaycsIGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAqICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gKiAgICAgICAgIHZhciBvYmogPSB1dGlscy5mbGFnKHRoaXMsICdvYmplY3QnKTtcbiAqICAgICAgICAgaWYgKG9iaiBpbnN0YW5jZW9mIEZvbykge1xuICogICAgICAgICAgIG5ldyBjaGFpLkFzc2VydGlvbihvYmoubmFtZSkudG8uZXF1YWwoJ2JhcicpO1xuICogICAgICAgICB9IGVsc2Uge1xuICogICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICogICAgICAgICB9XG4gKiAgICAgICB9XG4gKiAgICAgfSk7XG4gKlxuICpcbiAqIENhbiBhbHNvIGJlIGFjY2Vzc2VkIGRpcmVjdGx5IGZyb20gYGNoYWkuQXNzZXJ0aW9uYC5cbiAqXG4gKiAgICAgY2hhaS5Bc3NlcnRpb24ub3ZlcndyaXRlUHJvcGVydHkoJ2ZvbycsIGZuKTtcbiAqXG4gKiBUaGVuIGNhbiBiZSB1c2VkIGFzIGFueSBvdGhlciBhc3NlcnRpb24uXG4gKlxuICogICAgIGV4cGVjdChteUZvbykudG8uYmUub2s7XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGN0eCBvYmplY3Qgd2hvc2UgcHJvcGVydHkgaXMgdG8gYmUgb3ZlcndyaXR0ZW5cbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIG9mIHByb3BlcnR5IHRvIG92ZXJ3cml0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZ2V0dGVyIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIGdldHRlciBmdW5jdGlvbiB0byBiZSB1c2VkIGZvciBuYW1lXG4gKiBAbmFtZSBvdmVyd3JpdGVQcm9wZXJ0eVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjdHgsIG5hbWUsIGdldHRlcikge1xuICB2YXIgX2dldCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY3R4LCBuYW1lKVxuICAgICwgX3N1cGVyID0gZnVuY3Rpb24gKCkge307XG5cbiAgaWYgKF9nZXQgJiYgJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIF9nZXQuZ2V0KVxuICAgIF9zdXBlciA9IF9nZXQuZ2V0XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN0eCwgbmFtZSxcbiAgICB7IGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gZ2V0dGVyKF9zdXBlcikuY2FsbCh0aGlzKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdCA9PT0gdW5kZWZpbmVkID8gdGhpcyA6IHJlc3VsdDtcbiAgICAgIH1cbiAgICAsIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn07XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiL2hvbWUvZG9zdG9kYWJzaS9jb2RlL2Jha2svZXhwZXJpbWVudC10ZW1wbGF0ZS9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9pbnNlcnQtbW9kdWxlLWdsb2JhbHMvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL3V0aWxzL292ZXJ3cml0ZVByb3BlcnR5LmpzXCIsXCIvLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4vKiFcbiAqIENoYWkgLSB0ZXN0IHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKiFcbiAqIE1vZHVsZSBkZXBlbmRhbmNpZXNcbiAqL1xuXG52YXIgZmxhZyA9IHJlcXVpcmUoJy4vZmxhZycpO1xuXG4vKipcbiAqICMgdGVzdChvYmplY3QsIGV4cHJlc3Npb24pXG4gKlxuICogVGVzdCBhbmQgb2JqZWN0IGZvciBleHByZXNzaW9uLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgKGNvbnN0cnVjdGVkIEFzc2VydGlvbilcbiAqIEBwYXJhbSB7QXJndW1lbnRzfSBjaGFpLkFzc2VydGlvbi5wcm90b3R5cGUuYXNzZXJ0IGFyZ3VtZW50c1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaiwgYXJncykge1xuICB2YXIgbmVnYXRlID0gZmxhZyhvYmosICduZWdhdGUnKVxuICAgICwgZXhwciA9IGFyZ3NbMF07XG4gIHJldHVybiBuZWdhdGUgPyAhZXhwciA6IGV4cHI7XG59O1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZShcIi9ob21lL2Rvc3RvZGFic2kvY29kZS9iYWtrL2V4cGVyaW1lbnQtdGVtcGxhdGUvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvaW5zZXJ0LW1vZHVsZS1nbG9iYWxzL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlscy90ZXN0LmpzXCIsXCIvLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NoYWkvbGliL2NoYWkvdXRpbHNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4vKiFcbiAqIENoYWkgLSB0cmFuc2ZlckZsYWdzIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKipcbiAqICMjIyB0cmFuc2ZlckZsYWdzKGFzc2VydGlvbiwgb2JqZWN0LCBpbmNsdWRlQWxsID0gdHJ1ZSlcbiAqXG4gKiBUcmFuc2ZlciBhbGwgdGhlIGZsYWdzIGZvciBgYXNzZXJ0aW9uYCB0byBgb2JqZWN0YC4gSWZcbiAqIGBpbmNsdWRlQWxsYCBpcyBzZXQgdG8gYGZhbHNlYCwgdGhlbiB0aGUgYmFzZSBDaGFpXG4gKiBhc3NlcnRpb24gZmxhZ3MgKG5hbWVseSBgb2JqZWN0YCwgYHNzZmlgLCBhbmQgYG1lc3NhZ2VgKVxuICogd2lsbCBub3QgYmUgdHJhbnNmZXJyZWQuXG4gKlxuICpcbiAqICAgICB2YXIgbmV3QXNzZXJ0aW9uID0gbmV3IEFzc2VydGlvbigpO1xuICogICAgIHV0aWxzLnRyYW5zZmVyRmxhZ3MoYXNzZXJ0aW9uLCBuZXdBc3NlcnRpb24pO1xuICpcbiAqICAgICB2YXIgYW5vdGhlckFzc2VyaXRvbiA9IG5ldyBBc3NlcnRpb24obXlPYmopO1xuICogICAgIHV0aWxzLnRyYW5zZmVyRmxhZ3MoYXNzZXJ0aW9uLCBhbm90aGVyQXNzZXJ0aW9uLCBmYWxzZSk7XG4gKlxuICogQHBhcmFtIHtBc3NlcnRpb259IGFzc2VydGlvbiB0aGUgYXNzZXJ0aW9uIHRvIHRyYW5zZmVyIHRoZSBmbGFncyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IHRoZSBvYmplY3QgdG8gdHJhbnNmZXIgdGhlIGZsYWdzIHRvbzsgdXN1YWxseSBhIG5ldyBhc3NlcnRpb25cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaW5jbHVkZUFsbFxuICogQG5hbWUgZ2V0QWxsRmxhZ3NcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFzc2VydGlvbiwgb2JqZWN0LCBpbmNsdWRlQWxsKSB7XG4gIHZhciBmbGFncyA9IGFzc2VydGlvbi5fX2ZsYWdzIHx8IChhc3NlcnRpb24uX19mbGFncyA9IE9iamVjdC5jcmVhdGUobnVsbCkpO1xuXG4gIGlmICghb2JqZWN0Ll9fZmxhZ3MpIHtcbiAgICBvYmplY3QuX19mbGFncyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIH1cblxuICBpbmNsdWRlQWxsID0gYXJndW1lbnRzLmxlbmd0aCA9PT0gMyA/IGluY2x1ZGVBbGwgOiB0cnVlO1xuXG4gIGZvciAodmFyIGZsYWcgaW4gZmxhZ3MpIHtcbiAgICBpZiAoaW5jbHVkZUFsbCB8fFxuICAgICAgICAoZmxhZyAhPT0gJ29iamVjdCcgJiYgZmxhZyAhPT0gJ3NzZmknICYmIGZsYWcgIT0gJ21lc3NhZ2UnKSkge1xuICAgICAgb2JqZWN0Ll9fZmxhZ3NbZmxhZ10gPSBmbGFnc1tmbGFnXTtcbiAgICB9XG4gIH1cbn07XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiL2hvbWUvZG9zdG9kYWJzaS9jb2RlL2Jha2svZXhwZXJpbWVudC10ZW1wbGF0ZS9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9pbnNlcnQtbW9kdWxlLWdsb2JhbHMvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL3V0aWxzL3RyYW5zZmVyRmxhZ3MuanNcIixcIi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlsc1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbi8qIVxuICogQ2hhaSAtIHR5cGUgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qIVxuICogRGV0ZWN0YWJsZSBqYXZhc2NyaXB0IG5hdGl2ZXNcbiAqL1xuXG52YXIgbmF0aXZlcyA9IHtcbiAgICAnW29iamVjdCBBcmd1bWVudHNdJzogJ2FyZ3VtZW50cydcbiAgLCAnW29iamVjdCBBcnJheV0nOiAnYXJyYXknXG4gICwgJ1tvYmplY3QgRGF0ZV0nOiAnZGF0ZSdcbiAgLCAnW29iamVjdCBGdW5jdGlvbl0nOiAnZnVuY3Rpb24nXG4gICwgJ1tvYmplY3QgTnVtYmVyXSc6ICdudW1iZXInXG4gICwgJ1tvYmplY3QgUmVnRXhwXSc6ICdyZWdleHAnXG4gICwgJ1tvYmplY3QgU3RyaW5nXSc6ICdzdHJpbmcnXG59O1xuXG4vKipcbiAqICMjIyB0eXBlKG9iamVjdClcbiAqXG4gKiBCZXR0ZXIgaW1wbGVtZW50YXRpb24gb2YgYHR5cGVvZmAgZGV0ZWN0aW9uIHRoYXQgY2FuXG4gKiBiZSB1c2VkIGNyb3NzLWJyb3dzZXIuIEhhbmRsZXMgdGhlIGluY29uc2lzdGVuY2llcyBvZlxuICogQXJyYXksIGBudWxsYCwgYW5kIGB1bmRlZmluZWRgIGRldGVjdGlvbi5cbiAqXG4gKiAgICAgdXRpbHMudHlwZSh7fSkgLy8gJ29iamVjdCdcbiAqICAgICB1dGlscy50eXBlKG51bGwpIC8vIGBudWxsJ1xuICogICAgIHV0aWxzLnR5cGUodW5kZWZpbmVkKSAvLyBgdW5kZWZpbmVkYFxuICogICAgIHV0aWxzLnR5cGUoW10pIC8vIGBhcnJheWBcbiAqXG4gKiBAcGFyYW0ge01peGVkfSBvYmplY3QgdG8gZGV0ZWN0IHR5cGUgb2ZcbiAqIEBuYW1lIHR5cGVcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICB2YXIgc3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaik7XG4gIGlmIChuYXRpdmVzW3N0cl0pIHJldHVybiBuYXRpdmVzW3N0cl07XG4gIGlmIChvYmogPT09IG51bGwpIHJldHVybiAnbnVsbCc7XG4gIGlmIChvYmogPT09IHVuZGVmaW5lZCkgcmV0dXJuICd1bmRlZmluZWQnO1xuICBpZiAob2JqID09PSBPYmplY3Qob2JqKSkgcmV0dXJuICdvYmplY3QnO1xuICByZXR1cm4gdHlwZW9mIG9iajtcbn07XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiL2hvbWUvZG9zdG9kYWJzaS9jb2RlL2Jha2svZXhwZXJpbWVudC10ZW1wbGF0ZS9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9pbnNlcnQtbW9kdWxlLWdsb2JhbHMvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jaGFpL2xpYi9jaGFpL3V0aWxzL3R5cGUuanNcIixcIi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY2hhaS9saWIvY2hhaS91dGlsc1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbi8qIVxuICogYXNzZXJ0aW9uLWVycm9yXG4gKiBDb3B5cmlnaHQoYykgMjAxMyBKYWtlIEx1ZXIgPGpha2VAcXVhbGlhbmN5LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qIVxuICogUmV0dXJuIGEgZnVuY3Rpb24gdGhhdCB3aWxsIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBvbmUgb2JqZWN0IHRvIGFub3RoZXIgZXhjbHVkaW5nIGFueSBvcmlnaW5hbGx5XG4gKiBsaXN0ZWQuIFJldHVybmVkIGZ1bmN0aW9uIHdpbGwgY3JlYXRlIGEgbmV3IGB7fWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV4Y2x1ZGVkIHByb3BlcnRpZXMgLi4uXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqL1xuXG5mdW5jdGlvbiBleGNsdWRlICgpIHtcbiAgdmFyIGV4Y2x1ZGVzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXG4gIGZ1bmN0aW9uIGV4Y2x1ZGVQcm9wcyAocmVzLCBvYmopIHtcbiAgICBPYmplY3Qua2V5cyhvYmopLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgaWYgKCF+ZXhjbHVkZXMuaW5kZXhPZihrZXkpKSByZXNba2V5XSA9IG9ialtrZXldO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIGV4dGVuZEV4Y2x1ZGUgKCkge1xuICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpXG4gICAgICAsIGkgPSAwXG4gICAgICAsIHJlcyA9IHt9O1xuXG4gICAgZm9yICg7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBleGNsdWRlUHJvcHMocmVzLCBhcmdzW2ldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuICB9O1xufTtcblxuLyohXG4gKiBQcmltYXJ5IEV4cG9ydHNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFzc2VydGlvbkVycm9yO1xuXG4vKipcbiAqICMjIyBBc3NlcnRpb25FcnJvclxuICpcbiAqIEFuIGV4dGVuc2lvbiBvZiB0aGUgSmF2YVNjcmlwdCBgRXJyb3JgIGNvbnN0cnVjdG9yIGZvclxuICogYXNzZXJ0aW9uIGFuZCB2YWxpZGF0aW9uIHNjZW5hcmlvcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICogQHBhcmFtIHtPYmplY3R9IHByb3BlcnRpZXMgdG8gaW5jbHVkZSAob3B0aW9uYWwpXG4gKiBAcGFyYW0ge2NhbGxlZX0gc3RhcnQgc3RhY2sgZnVuY3Rpb24gKG9wdGlvbmFsKVxuICovXG5cbmZ1bmN0aW9uIEFzc2VydGlvbkVycm9yIChtZXNzYWdlLCBfcHJvcHMsIHNzZikge1xuICB2YXIgZXh0ZW5kID0gZXhjbHVkZSgnbmFtZScsICdtZXNzYWdlJywgJ3N0YWNrJywgJ2NvbnN0cnVjdG9yJywgJ3RvSlNPTicpXG4gICAgLCBwcm9wcyA9IGV4dGVuZChfcHJvcHMgfHwge30pO1xuXG4gIC8vIGRlZmF1bHQgdmFsdWVzXG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2UgfHwgJ1Vuc3BlY2lmaWVkIEFzc2VydGlvbkVycm9yJztcbiAgdGhpcy5zaG93RGlmZiA9IGZhbHNlO1xuXG4gIC8vIGNvcHkgZnJvbSBwcm9wZXJ0aWVzXG4gIGZvciAodmFyIGtleSBpbiBwcm9wcykge1xuICAgIHRoaXNba2V5XSA9IHByb3BzW2tleV07XG4gIH1cblxuICAvLyBjYXB0dXJlIHN0YWNrIHRyYWNlXG4gIHNzZiA9IHNzZiB8fCBhcmd1bWVudHMuY2FsbGVlO1xuICBpZiAoc3NmICYmIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgc3NmKTtcbiAgfVxufVxuXG4vKiFcbiAqIEluaGVyaXQgZnJvbSBFcnJvci5wcm90b3R5cGVcbiAqL1xuXG5Bc3NlcnRpb25FcnJvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSk7XG5cbi8qIVxuICogU3RhdGljYWxseSBzZXQgbmFtZVxuICovXG5cbkFzc2VydGlvbkVycm9yLnByb3RvdHlwZS5uYW1lID0gJ0Fzc2VydGlvbkVycm9yJztcblxuLyohXG4gKiBFbnN1cmUgY29ycmVjdCBjb25zdHJ1Y3RvclxuICovXG5cbkFzc2VydGlvbkVycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEFzc2VydGlvbkVycm9yO1xuXG4vKipcbiAqIEFsbG93IGVycm9ycyB0byBiZSBjb252ZXJ0ZWQgdG8gSlNPTiBmb3Igc3RhdGljIHRyYW5zZmVyLlxuICpcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaW5jbHVkZSBzdGFjayAoZGVmYXVsdDogYHRydWVgKVxuICogQHJldHVybiB7T2JqZWN0fSBvYmplY3QgdGhhdCBjYW4gYmUgYEpTT04uc3RyaW5naWZ5YFxuICovXG5cbkFzc2VydGlvbkVycm9yLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoc3RhY2spIHtcbiAgdmFyIGV4dGVuZCA9IGV4Y2x1ZGUoJ2NvbnN0cnVjdG9yJywgJ3RvSlNPTicsICdzdGFjaycpXG4gICAgLCBwcm9wcyA9IGV4dGVuZCh7IG5hbWU6IHRoaXMubmFtZSB9LCB0aGlzKTtcblxuICAvLyBpbmNsdWRlIHN0YWNrIGlmIGV4aXN0cyBhbmQgbm90IHR1cm5lZCBvZmZcbiAgaWYgKGZhbHNlICE9PSBzdGFjayAmJiB0aGlzLnN0YWNrKSB7XG4gICAgcHJvcHMuc3RhY2sgPSB0aGlzLnN0YWNrO1xuICB9XG5cbiAgcmV0dXJuIHByb3BzO1xufTtcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCIvaG9tZS9kb3N0b2RhYnNpL2NvZGUvYmFray9leHBlcmltZW50LXRlbXBsYXRlL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NoYWkvbm9kZV9tb2R1bGVzL2Fzc2VydGlvbi1lcnJvci9pbmRleC5qc1wiLFwiLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jaGFpL25vZGVfbW9kdWxlcy9hc3NlcnRpb24tZXJyb3JcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2VxbCcpO1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZShcIi9ob21lL2Rvc3RvZGFic2kvY29kZS9iYWtrL2V4cGVyaW1lbnQtdGVtcGxhdGUvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvaW5zZXJ0LW1vZHVsZS1nbG9iYWxzL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY2hhaS9ub2RlX21vZHVsZXMvZGVlcC1lcWwvaW5kZXguanNcIixcIi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY2hhaS9ub2RlX21vZHVsZXMvZGVlcC1lcWxcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4vKiFcbiAqIGRlZXAtZXFsXG4gKiBDb3B5cmlnaHQoYykgMjAxMyBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qIVxuICogTW9kdWxlIGRlcGVuZGVuY2llc1xuICovXG5cbnZhciB0eXBlID0gcmVxdWlyZSgndHlwZS1kZXRlY3QnKTtcblxuLyohXG4gKiBCdWZmZXIuaXNCdWZmZXIgYnJvd3NlciBzaGltXG4gKi9cblxudmFyIEJ1ZmZlcjtcbnRyeSB7IEJ1ZmZlciA9IHJlcXVpcmUoJ2J1ZmZlcicpLkJ1ZmZlcjsgfVxuY2F0Y2goZXgpIHtcbiAgQnVmZmVyID0ge307XG4gIEJ1ZmZlci5pc0J1ZmZlciA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gZmFsc2U7IH1cbn1cblxuLyohXG4gKiBQcmltYXJ5IEV4cG9ydFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZGVlcEVxdWFsO1xuXG4vKipcbiAqIEFzc2VydCBzdXBlci1zdHJpY3QgKGVnYWwpIGVxdWFsaXR5IGJldHdlZW5cbiAqIHR3byBvYmplY3RzIG9mIGFueSB0eXBlLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IGFcbiAqIEBwYXJhbSB7TWl4ZWR9IGJcbiAqIEBwYXJhbSB7QXJyYXl9IG1lbW9pc2VkIChvcHRpb25hbClcbiAqIEByZXR1cm4ge0Jvb2xlYW59IGVxdWFsIG1hdGNoXG4gKi9cblxuZnVuY3Rpb24gZGVlcEVxdWFsKGEsIGIsIG0pIHtcbiAgaWYgKHNhbWVWYWx1ZShhLCBiKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2UgaWYgKCdkYXRlJyA9PT0gdHlwZShhKSkge1xuICAgIHJldHVybiBkYXRlRXF1YWwoYSwgYik7XG4gIH0gZWxzZSBpZiAoJ3JlZ2V4cCcgPT09IHR5cGUoYSkpIHtcbiAgICByZXR1cm4gcmVnZXhwRXF1YWwoYSwgYik7XG4gIH0gZWxzZSBpZiAoQnVmZmVyLmlzQnVmZmVyKGEpKSB7XG4gICAgcmV0dXJuIGJ1ZmZlckVxdWFsKGEsIGIpO1xuICB9IGVsc2UgaWYgKCdhcmd1bWVudHMnID09PSB0eXBlKGEpKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50c0VxdWFsKGEsIGIsIG0pO1xuICB9IGVsc2UgaWYgKCF0eXBlRXF1YWwoYSwgYikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0gZWxzZSBpZiAoKCdvYmplY3QnICE9PSB0eXBlKGEpICYmICdvYmplY3QnICE9PSB0eXBlKGIpKVxuICAmJiAoJ2FycmF5JyAhPT0gdHlwZShhKSAmJiAnYXJyYXknICE9PSB0eXBlKGIpKSkge1xuICAgIHJldHVybiBzYW1lVmFsdWUoYSwgYik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG9iamVjdEVxdWFsKGEsIGIsIG0pO1xuICB9XG59XG5cbi8qIVxuICogU3RyaWN0IChlZ2FsKSBlcXVhbGl0eSB0ZXN0LiBFbnN1cmVzIHRoYXQgTmFOIGFsd2F5c1xuICogZXF1YWxzIE5hTiBhbmQgYC0wYCBkb2VzIG5vdCBlcXVhbCBgKzBgLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IGFcbiAqIEBwYXJhbSB7TWl4ZWR9IGJcbiAqIEByZXR1cm4ge0Jvb2xlYW59IGVxdWFsIG1hdGNoXG4gKi9cblxuZnVuY3Rpb24gc2FtZVZhbHVlKGEsIGIpIHtcbiAgaWYgKGEgPT09IGIpIHJldHVybiBhICE9PSAwIHx8IDEgLyBhID09PSAxIC8gYjtcbiAgcmV0dXJuIGEgIT09IGEgJiYgYiAhPT0gYjtcbn1cblxuLyohXG4gKiBDb21wYXJlIHRoZSB0eXBlcyBvZiB0d28gZ2l2ZW4gb2JqZWN0cyBhbmRcbiAqIHJldHVybiBpZiB0aGV5IGFyZSBlcXVhbC4gTm90ZSB0aGF0IGFuIEFycmF5XG4gKiBoYXMgYSB0eXBlIG9mIGBhcnJheWAgKG5vdCBgb2JqZWN0YCkgYW5kIGFyZ3VtZW50c1xuICogaGF2ZSBhIHR5cGUgb2YgYGFyZ3VtZW50c2AgKG5vdCBgYXJyYXlgL2BvYmplY3RgKS5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSBhXG4gKiBAcGFyYW0ge01peGVkfSBiXG4gKiBAcmV0dXJuIHtCb29sZWFufSByZXN1bHRcbiAqL1xuXG5mdW5jdGlvbiB0eXBlRXF1YWwoYSwgYikge1xuICByZXR1cm4gdHlwZShhKSA9PT0gdHlwZShiKTtcbn1cblxuLyohXG4gKiBDb21wYXJlIHR3byBEYXRlIG9iamVjdHMgYnkgYXNzZXJ0aW5nIHRoYXRcbiAqIHRoZSB0aW1lIHZhbHVlcyBhcmUgZXF1YWwgdXNpbmcgYHNhdmVWYWx1ZWAuXG4gKlxuICogQHBhcmFtIHtEYXRlfSBhXG4gKiBAcGFyYW0ge0RhdGV9IGJcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHJlc3VsdFxuICovXG5cbmZ1bmN0aW9uIGRhdGVFcXVhbChhLCBiKSB7XG4gIGlmICgnZGF0ZScgIT09IHR5cGUoYikpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIHNhbWVWYWx1ZShhLmdldFRpbWUoKSwgYi5nZXRUaW1lKCkpO1xufVxuXG4vKiFcbiAqIENvbXBhcmUgdHdvIHJlZ3VsYXIgZXhwcmVzc2lvbnMgYnkgY29udmVydGluZyB0aGVtXG4gKiB0byBzdHJpbmcgYW5kIGNoZWNraW5nIGZvciBgc2FtZVZhbHVlYC5cbiAqXG4gKiBAcGFyYW0ge1JlZ0V4cH0gYVxuICogQHBhcmFtIHtSZWdFeHB9IGJcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHJlc3VsdFxuICovXG5cbmZ1bmN0aW9uIHJlZ2V4cEVxdWFsKGEsIGIpIHtcbiAgaWYgKCdyZWdleHAnICE9PSB0eXBlKGIpKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBzYW1lVmFsdWUoYS50b1N0cmluZygpLCBiLnRvU3RyaW5nKCkpO1xufVxuXG4vKiFcbiAqIEFzc2VydCBkZWVwIGVxdWFsaXR5IG9mIHR3byBgYXJndW1lbnRzYCBvYmplY3RzLlxuICogVW5mb3J0dW5hdGVseSwgdGhlc2UgbXVzdCBiZSBzbGljZWQgdG8gYXJyYXlzXG4gKiBwcmlvciB0byB0ZXN0IHRvIGVuc3VyZSBubyBiYWQgYmVoYXZpb3IuXG4gKlxuICogQHBhcmFtIHtBcmd1bWVudHN9IGFcbiAqIEBwYXJhbSB7QXJndW1lbnRzfSBiXG4gKiBAcGFyYW0ge0FycmF5fSBtZW1vaXplIChvcHRpb25hbClcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHJlc3VsdFxuICovXG5cbmZ1bmN0aW9uIGFyZ3VtZW50c0VxdWFsKGEsIGIsIG0pIHtcbiAgaWYgKCdhcmd1bWVudHMnICE9PSB0eXBlKGIpKSByZXR1cm4gZmFsc2U7XG4gIGEgPSBbXS5zbGljZS5jYWxsKGEpO1xuICBiID0gW10uc2xpY2UuY2FsbChiKTtcbiAgcmV0dXJuIGRlZXBFcXVhbChhLCBiLCBtKTtcbn1cblxuLyohXG4gKiBHZXQgZW51bWVyYWJsZSBwcm9wZXJ0aWVzIG9mIGEgZ2l2ZW4gb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhXG4gKiBAcmV0dXJuIHtBcnJheX0gcHJvcGVydHkgbmFtZXNcbiAqL1xuXG5mdW5jdGlvbiBlbnVtZXJhYmxlKGEpIHtcbiAgdmFyIHJlcyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gYSkgcmVzLnB1c2goa2V5KTtcbiAgcmV0dXJuIHJlcztcbn1cblxuLyohXG4gKiBTaW1wbGUgZXF1YWxpdHkgZm9yIGZsYXQgaXRlcmFibGUgb2JqZWN0c1xuICogc3VjaCBhcyBBcnJheXMgb3IgTm9kZS5qcyBidWZmZXJzLlxuICpcbiAqIEBwYXJhbSB7SXRlcmFibGV9IGFcbiAqIEBwYXJhbSB7SXRlcmFibGV9IGJcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHJlc3VsdFxuICovXG5cbmZ1bmN0aW9uIGl0ZXJhYmxlRXF1YWwoYSwgYikge1xuICBpZiAoYS5sZW5ndGggIT09ICBiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuXG4gIHZhciBpID0gMDtcbiAgdmFyIG1hdGNoID0gdHJ1ZTtcblxuICBmb3IgKDsgaSA8IGEubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgbWF0Y2ggPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBtYXRjaDtcbn1cblxuLyohXG4gKiBFeHRlbnNpb24gdG8gYGl0ZXJhYmxlRXF1YWxgIHNwZWNpZmljYWxseVxuICogZm9yIE5vZGUuanMgQnVmZmVycy5cbiAqXG4gKiBAcGFyYW0ge0J1ZmZlcn0gYVxuICogQHBhcmFtIHtNaXhlZH0gYlxuICogQHJldHVybiB7Qm9vbGVhbn0gcmVzdWx0XG4gKi9cblxuZnVuY3Rpb24gYnVmZmVyRXF1YWwoYSwgYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihiKSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gaXRlcmFibGVFcXVhbChhLCBiKTtcbn1cblxuLyohXG4gKiBCbG9jayBmb3IgYG9iamVjdEVxdWFsYCBlbnN1cmluZyBub24tZXhpc3RpbmdcbiAqIHZhbHVlcyBkb24ndCBnZXQgaW4uXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gb2JqZWN0XG4gKiBAcmV0dXJuIHtCb29sZWFufSByZXN1bHRcbiAqL1xuXG5mdW5jdGlvbiBpc1ZhbHVlKGEpIHtcbiAgcmV0dXJuIGEgIT09IG51bGwgJiYgYSAhPT0gdW5kZWZpbmVkO1xufVxuXG4vKiFcbiAqIFJlY3Vyc2l2ZWx5IGNoZWNrIHRoZSBlcXVhbGl0eSBvZiB0d28gb2JqZWN0cy5cbiAqIE9uY2UgYmFzaWMgc2FtZW5lc3MgaGFzIGJlZW4gZXN0YWJsaXNoZWQgaXQgd2lsbFxuICogZGVmZXIgdG8gYGRlZXBFcXVhbGAgZm9yIGVhY2ggZW51bWVyYWJsZSBrZXlcbiAqIGluIHRoZSBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gYVxuICogQHBhcmFtIHtNaXhlZH0gYlxuICogQHJldHVybiB7Qm9vbGVhbn0gcmVzdWx0XG4gKi9cblxuZnVuY3Rpb24gb2JqZWN0RXF1YWwoYSwgYiwgbSkge1xuICBpZiAoIWlzVmFsdWUoYSkgfHwgIWlzVmFsdWUoYikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoYS5wcm90b3R5cGUgIT09IGIucHJvdG90eXBlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIGk7XG4gIGlmIChtKSB7XG4gICAgZm9yIChpID0gMDsgaSA8IG0ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICgobVtpXVswXSA9PT0gYSAmJiBtW2ldWzFdID09PSBiKVxuICAgICAgfHwgIChtW2ldWzBdID09PSBiICYmIG1baV1bMV0gPT09IGEpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBtID0gW107XG4gIH1cblxuICB0cnkge1xuICAgIHZhciBrYSA9IGVudW1lcmFibGUoYSk7XG4gICAgdmFyIGtiID0gZW51bWVyYWJsZShiKTtcbiAgfSBjYXRjaCAoZXgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBrYS5zb3J0KCk7XG4gIGtiLnNvcnQoKTtcblxuICBpZiAoIWl0ZXJhYmxlRXF1YWwoa2EsIGtiKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIG0ucHVzaChbIGEsIGIgXSk7XG5cbiAgdmFyIGtleTtcbiAgZm9yIChpID0ga2EubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICBrZXkgPSBrYVtpXTtcbiAgICBpZiAoIWRlZXBFcXVhbChhW2tleV0sIGJba2V5XSwgbSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCIvaG9tZS9kb3N0b2RhYnNpL2NvZGUvYmFray9leHBlcmltZW50LXRlbXBsYXRlL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NoYWkvbm9kZV9tb2R1bGVzL2RlZXAtZXFsL2xpYi9lcWwuanNcIixcIi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY2hhaS9ub2RlX21vZHVsZXMvZGVlcC1lcWwvbGliXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi90eXBlJyk7XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiL2hvbWUvZG9zdG9kYWJzaS9jb2RlL2Jha2svZXhwZXJpbWVudC10ZW1wbGF0ZS9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9pbnNlcnQtbW9kdWxlLWdsb2JhbHMvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jaGFpL25vZGVfbW9kdWxlcy9kZWVwLWVxbC9ub2RlX21vZHVsZXMvdHlwZS1kZXRlY3QvaW5kZXguanNcIixcIi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY2hhaS9ub2RlX21vZHVsZXMvZGVlcC1lcWwvbm9kZV9tb2R1bGVzL3R5cGUtZGV0ZWN0XCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuLyohXG4gKiB0eXBlLWRldGVjdFxuICogQ29weXJpZ2h0KGMpIDIwMTMgamFrZSBsdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKiFcbiAqIFByaW1hcnkgRXhwb3J0c1xuICovXG5cbnZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBnZXRUeXBlO1xuXG4vKiFcbiAqIERldGVjdGFibGUgamF2YXNjcmlwdCBuYXRpdmVzXG4gKi9cblxudmFyIG5hdGl2ZXMgPSB7XG4gICAgJ1tvYmplY3QgQXJyYXldJzogJ2FycmF5J1xuICAsICdbb2JqZWN0IFJlZ0V4cF0nOiAncmVnZXhwJ1xuICAsICdbb2JqZWN0IEZ1bmN0aW9uXSc6ICdmdW5jdGlvbidcbiAgLCAnW29iamVjdCBBcmd1bWVudHNdJzogJ2FyZ3VtZW50cydcbiAgLCAnW29iamVjdCBEYXRlXSc6ICdkYXRlJ1xufTtcblxuLyoqXG4gKiAjIyMgdHlwZU9mIChvYmopXG4gKlxuICogVXNlIHNldmVyYWwgZGlmZmVyZW50IHRlY2huaXF1ZXMgdG8gZGV0ZXJtaW5lXG4gKiB0aGUgdHlwZSBvZiBvYmplY3QgYmVpbmcgdGVzdGVkLlxuICpcbiAqXG4gKiBAcGFyYW0ge01peGVkfSBvYmplY3RcbiAqIEByZXR1cm4ge1N0cmluZ30gb2JqZWN0IHR5cGVcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZ2V0VHlwZSAob2JqKSB7XG4gIHZhciBzdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKTtcbiAgaWYgKG5hdGl2ZXNbc3RyXSkgcmV0dXJuIG5hdGl2ZXNbc3RyXTtcbiAgaWYgKG9iaiA9PT0gbnVsbCkgcmV0dXJuICdudWxsJztcbiAgaWYgKG9iaiA9PT0gdW5kZWZpbmVkKSByZXR1cm4gJ3VuZGVmaW5lZCc7XG4gIGlmIChvYmogPT09IE9iamVjdChvYmopKSByZXR1cm4gJ29iamVjdCc7XG4gIHJldHVybiB0eXBlb2Ygb2JqO1xufVxuXG5leHBvcnRzLkxpYnJhcnkgPSBMaWJyYXJ5O1xuXG4vKipcbiAqICMjIyBMaWJyYXJ5XG4gKlxuICogQ3JlYXRlIGEgcmVwb3NpdG9yeSBmb3IgY3VzdG9tIHR5cGUgZGV0ZWN0aW9uLlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgbGliID0gbmV3IHR5cGUuTGlicmFyeTtcbiAqIGBgYFxuICpcbiAqL1xuXG5mdW5jdGlvbiBMaWJyYXJ5ICgpIHtcbiAgdGhpcy50ZXN0cyA9IHt9O1xufVxuXG4vKipcbiAqICMjIyMgLm9mIChvYmopXG4gKlxuICogRXhwb3NlIHJlcGxhY2VtZW50IGB0eXBlb2ZgIGRldGVjdGlvbiB0byB0aGUgbGlicmFyeS5cbiAqXG4gKiBgYGBqc1xuICogaWYgKCdzdHJpbmcnID09PSBsaWIub2YoJ2hlbGxvIHdvcmxkJykpIHtcbiAqICAgLy8gLi4uXG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge01peGVkfSBvYmplY3QgdG8gdGVzdFxuICogQHJldHVybiB7U3RyaW5nfSB0eXBlXG4gKi9cblxuTGlicmFyeS5wcm90b3R5cGUub2YgPSBnZXRUeXBlO1xuXG4vKipcbiAqICMjIyMgLmRlZmluZSAodHlwZSwgdGVzdClcbiAqXG4gKiBBZGQgYSB0ZXN0IHRvIGZvciB0aGUgYC50ZXN0KClgIGFzc2VydGlvbi5cbiAqXG4gKiBDYW4gYmUgZGVmaW5lZCBhcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbjpcbiAqXG4gKiBgYGBqc1xuICogbGliLmRlZmluZSgnaW50JywgL15bMC05XSskLyk7XG4gKiBgYGBcbiAqXG4gKiAuLi4gb3IgYXMgYSBmdW5jdGlvbjpcbiAqXG4gKiBgYGBqc1xuICogbGliLmRlZmluZSgnYmxuJywgZnVuY3Rpb24gKG9iaikge1xuICogICBpZiAoJ2Jvb2xlYW4nID09PSBsaWIub2Yob2JqKSkgcmV0dXJuIHRydWU7XG4gKiAgIHZhciBibG5zID0gWyAneWVzJywgJ25vJywgJ3RydWUnLCAnZmFsc2UnLCAxLCAwIF07XG4gKiAgIGlmICgnc3RyaW5nJyA9PT0gbGliLm9mKG9iaikpIG9iaiA9IG9iai50b0xvd2VyQ2FzZSgpO1xuICogICByZXR1cm4gISEgfmJsbnMuaW5kZXhPZihvYmopO1xuICogfSk7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtSZWdFeHB8RnVuY3Rpb259IHRlc3RcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuTGlicmFyeS5wcm90b3R5cGUuZGVmaW5lID0gZnVuY3Rpb24gKHR5cGUsIHRlc3QpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHJldHVybiB0aGlzLnRlc3RzW3R5cGVdO1xuICB0aGlzLnRlc3RzW3R5cGVdID0gdGVzdDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqICMjIyMgLnRlc3QgKG9iaiwgdGVzdClcbiAqXG4gKiBBc3NlcnQgdGhhdCBhbiBvYmplY3QgaXMgb2YgdHlwZS4gV2lsbCBmaXJzdFxuICogY2hlY2sgbmF0aXZlcywgYW5kIGlmIHRoYXQgZG9lcyBub3QgcGFzcyBpdCB3aWxsXG4gKiB1c2UgdGhlIHVzZXIgZGVmaW5lZCBjdXN0b20gdGVzdHMuXG4gKlxuICogYGBganNcbiAqIGFzc2VydChsaWIudGVzdCgnMScsICdpbnQnKSk7XG4gKiBhc3NlcnQobGliLnRlc3QoJ3llcycsICdibG4nKSk7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge01peGVkfSBvYmplY3RcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcmV0dXJuIHtCb29sZWFufSByZXN1bHRcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuTGlicmFyeS5wcm90b3R5cGUudGVzdCA9IGZ1bmN0aW9uIChvYmosIHR5cGUpIHtcbiAgaWYgKHR5cGUgPT09IGdldFR5cGUob2JqKSkgcmV0dXJuIHRydWU7XG4gIHZhciB0ZXN0ID0gdGhpcy50ZXN0c1t0eXBlXTtcblxuICBpZiAodGVzdCAmJiAncmVnZXhwJyA9PT0gZ2V0VHlwZSh0ZXN0KSkge1xuICAgIHJldHVybiB0ZXN0LnRlc3Qob2JqKTtcbiAgfSBlbHNlIGlmICh0ZXN0ICYmICdmdW5jdGlvbicgPT09IGdldFR5cGUodGVzdCkpIHtcbiAgICByZXR1cm4gdGVzdChvYmopO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcignVHlwZSB0ZXN0IFwiJyArIHR5cGUgKyAnXCIgbm90IGRlZmluZWQgb3IgaW52YWxpZC4nKTtcbiAgfVxufTtcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCIvaG9tZS9kb3N0b2RhYnNpL2NvZGUvYmFray9leHBlcmltZW50LXRlbXBsYXRlL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2NoYWkvbm9kZV9tb2R1bGVzL2RlZXAtZXFsL25vZGVfbW9kdWxlcy90eXBlLWRldGVjdC9saWIvdHlwZS5qc1wiLFwiLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jaGFpL25vZGVfbW9kdWxlcy9kZWVwLWVxbC9ub2RlX21vZHVsZXMvdHlwZS1kZXRlY3QvbGliXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuLyoqXG4gKiBUaGUgYnVmZmVyIG1vZHVsZSBmcm9tIG5vZGUuanMsIGZvciB0aGUgYnJvd3Nlci5cbiAqXG4gKiBBdXRob3I6ICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIExpY2Vuc2U6ICBNSVRcbiAqXG4gKiBgbnBtIGluc3RhbGwgYnVmZmVyYFxuICovXG5cbnZhciBiYXNlNjQgPSByZXF1aXJlKCdiYXNlNjQtanMnKVxudmFyIGllZWU3NTQgPSByZXF1aXJlKCdpZWVlNzU0JylcblxuZXhwb3J0cy5CdWZmZXIgPSBCdWZmZXJcbmV4cG9ydHMuU2xvd0J1ZmZlciA9IEJ1ZmZlclxuZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFUyA9IDUwXG5CdWZmZXIucG9vbFNpemUgPSA4MTkyXG5cbi8qKlxuICogSWYgYEJ1ZmZlci5fdXNlVHlwZWRBcnJheXNgOlxuICogICA9PT0gdHJ1ZSAgICBVc2UgVWludDhBcnJheSBpbXBsZW1lbnRhdGlvbiAoZmFzdGVzdClcbiAqICAgPT09IGZhbHNlICAgVXNlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiAoY29tcGF0aWJsZSBkb3duIHRvIElFNilcbiAqL1xuQnVmZmVyLl91c2VUeXBlZEFycmF5cyA9IChmdW5jdGlvbiAoKSB7XG4gICAvLyBEZXRlY3QgaWYgYnJvd3NlciBzdXBwb3J0cyBUeXBlZCBBcnJheXMuIFN1cHBvcnRlZCBicm93c2VycyBhcmUgSUUgMTArLFxuICAgLy8gRmlyZWZveCA0KywgQ2hyb21lIDcrLCBTYWZhcmkgNS4xKywgT3BlcmEgMTEuNissIGlPUyA0LjIrLlxuICBpZiAodHlwZW9mIFVpbnQ4QXJyYXkgIT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIEFycmF5QnVmZmVyICE9PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiBmYWxzZVxuXG4gIC8vIERvZXMgdGhlIGJyb3dzZXIgc3VwcG9ydCBhZGRpbmcgcHJvcGVydGllcyB0byBgVWludDhBcnJheWAgaW5zdGFuY2VzPyBJZlxuICAvLyBub3QsIHRoZW4gdGhhdCdzIHRoZSBzYW1lIGFzIG5vIGBVaW50OEFycmF5YCBzdXBwb3J0LiBXZSBuZWVkIHRvIGJlIGFibGUgdG9cbiAgLy8gYWRkIGFsbCB0aGUgbm9kZSBCdWZmZXIgQVBJIG1ldGhvZHMuXG4gIC8vIEJ1ZyBpbiBGaXJlZm94IDQtMjksIG5vdyBmaXhlZDogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njk1NDM4XG4gIHRyeSB7XG4gICAgdmFyIGFyciA9IG5ldyBVaW50OEFycmF5KDApXG4gICAgYXJyLmZvbyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDQyIH1cbiAgICByZXR1cm4gNDIgPT09IGFyci5mb28oKSAmJlxuICAgICAgICB0eXBlb2YgYXJyLnN1YmFycmF5ID09PSAnZnVuY3Rpb24nIC8vIENocm9tZSA5LTEwIGxhY2sgYHN1YmFycmF5YFxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn0pKClcblxuLyoqXG4gKiBDbGFzczogQnVmZmVyXG4gKiA9PT09PT09PT09PT09XG4gKlxuICogVGhlIEJ1ZmZlciBjb25zdHJ1Y3RvciByZXR1cm5zIGluc3RhbmNlcyBvZiBgVWludDhBcnJheWAgdGhhdCBhcmUgYXVnbWVudGVkXG4gKiB3aXRoIGZ1bmN0aW9uIHByb3BlcnRpZXMgZm9yIGFsbCB0aGUgbm9kZSBgQnVmZmVyYCBBUEkgZnVuY3Rpb25zLiBXZSB1c2VcbiAqIGBVaW50OEFycmF5YCBzbyB0aGF0IHNxdWFyZSBicmFja2V0IG5vdGF0aW9uIHdvcmtzIGFzIGV4cGVjdGVkIC0tIGl0IHJldHVybnNcbiAqIGEgc2luZ2xlIG9jdGV0LlxuICpcbiAqIEJ5IGF1Z21lbnRpbmcgdGhlIGluc3RhbmNlcywgd2UgY2FuIGF2b2lkIG1vZGlmeWluZyB0aGUgYFVpbnQ4QXJyYXlgXG4gKiBwcm90b3R5cGUuXG4gKi9cbmZ1bmN0aW9uIEJ1ZmZlciAoc3ViamVjdCwgZW5jb2RpbmcsIG5vWmVybykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgQnVmZmVyKSlcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcihzdWJqZWN0LCBlbmNvZGluZywgbm9aZXJvKVxuXG4gIHZhciB0eXBlID0gdHlwZW9mIHN1YmplY3RcblxuICAvLyBXb3JrYXJvdW5kOiBub2RlJ3MgYmFzZTY0IGltcGxlbWVudGF0aW9uIGFsbG93cyBmb3Igbm9uLXBhZGRlZCBzdHJpbmdzXG4gIC8vIHdoaWxlIGJhc2U2NC1qcyBkb2VzIG5vdC5cbiAgaWYgKGVuY29kaW5nID09PSAnYmFzZTY0JyAmJiB0eXBlID09PSAnc3RyaW5nJykge1xuICAgIHN1YmplY3QgPSBzdHJpbmd0cmltKHN1YmplY3QpXG4gICAgd2hpbGUgKHN1YmplY3QubGVuZ3RoICUgNCAhPT0gMCkge1xuICAgICAgc3ViamVjdCA9IHN1YmplY3QgKyAnPSdcbiAgICB9XG4gIH1cblxuICAvLyBGaW5kIHRoZSBsZW5ndGhcbiAgdmFyIGxlbmd0aFxuICBpZiAodHlwZSA9PT0gJ251bWJlcicpXG4gICAgbGVuZ3RoID0gY29lcmNlKHN1YmplY3QpXG4gIGVsc2UgaWYgKHR5cGUgPT09ICdzdHJpbmcnKVxuICAgIGxlbmd0aCA9IEJ1ZmZlci5ieXRlTGVuZ3RoKHN1YmplY3QsIGVuY29kaW5nKVxuICBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0JylcbiAgICBsZW5ndGggPSBjb2VyY2Uoc3ViamVjdC5sZW5ndGgpIC8vIEFzc3VtZSBvYmplY3QgaXMgYW4gYXJyYXlcbiAgZWxzZVxuICAgIHRocm93IG5ldyBFcnJvcignRmlyc3QgYXJndW1lbnQgbmVlZHMgdG8gYmUgYSBudW1iZXIsIGFycmF5IG9yIHN0cmluZy4nKVxuXG4gIHZhciBidWZcbiAgaWYgKEJ1ZmZlci5fdXNlVHlwZWRBcnJheXMpIHtcbiAgICAvLyBQcmVmZXJyZWQ6IFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlIGZvciBiZXN0IHBlcmZvcm1hbmNlXG4gICAgYnVmID0gYXVnbWVudChuZXcgVWludDhBcnJheShsZW5ndGgpKVxuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrOiBSZXR1cm4gVEhJUyBpbnN0YW5jZSBvZiBCdWZmZXIgKGNyZWF0ZWQgYnkgYG5ld2ApXG4gICAgYnVmID0gdGhpc1xuICAgIGJ1Zi5sZW5ndGggPSBsZW5ndGhcbiAgICBidWYuX2lzQnVmZmVyID0gdHJ1ZVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKEJ1ZmZlci5fdXNlVHlwZWRBcnJheXMgJiYgdHlwZW9mIFVpbnQ4QXJyYXkgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIHN1YmplY3QgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgLy8gU3BlZWQgb3B0aW1pemF0aW9uIC0tIHVzZSBzZXQgaWYgd2UncmUgY29weWluZyBmcm9tIGEgVWludDhBcnJheVxuICAgIGJ1Zi5fc2V0KHN1YmplY3QpXG4gIH0gZWxzZSBpZiAoaXNBcnJheWlzaChzdWJqZWN0KSkge1xuICAgIC8vIFRyZWF0IGFycmF5LWlzaCBvYmplY3RzIGFzIGEgYnl0ZSBhcnJheVxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihzdWJqZWN0KSlcbiAgICAgICAgYnVmW2ldID0gc3ViamVjdC5yZWFkVUludDgoaSlcbiAgICAgIGVsc2VcbiAgICAgICAgYnVmW2ldID0gc3ViamVjdFtpXVxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xuICAgIGJ1Zi53cml0ZShzdWJqZWN0LCAwLCBlbmNvZGluZylcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnbnVtYmVyJyAmJiAhQnVmZmVyLl91c2VUeXBlZEFycmF5cyAmJiAhbm9aZXJvKSB7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBidWZbaV0gPSAwXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1ZlxufVxuXG4vLyBTVEFUSUMgTUVUSE9EU1xuLy8gPT09PT09PT09PT09PT1cblxuQnVmZmVyLmlzRW5jb2RpbmcgPSBmdW5jdGlvbiAoZW5jb2RpbmcpIHtcbiAgc3dpdGNoIChTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgIGNhc2UgJ3Jhdyc6XG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldHVybiB0cnVlXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbkJ1ZmZlci5pc0J1ZmZlciA9IGZ1bmN0aW9uIChiKSB7XG4gIHJldHVybiAhIShiICE9PSBudWxsICYmIGIgIT09IHVuZGVmaW5lZCAmJiBiLl9pc0J1ZmZlcilcbn1cblxuQnVmZmVyLmJ5dGVMZW5ndGggPSBmdW5jdGlvbiAoc3RyLCBlbmNvZGluZykge1xuICB2YXIgcmV0XG4gIHN0ciA9IHN0ciArICcnXG4gIHN3aXRjaCAoZW5jb2RpbmcgfHwgJ3V0ZjgnKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICAgIHJldCA9IHN0ci5sZW5ndGggLyAyXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIHJldCA9IHV0ZjhUb0J5dGVzKHN0cikubGVuZ3RoXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ3Jhdyc6XG4gICAgICByZXQgPSBzdHIubGVuZ3RoXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICByZXQgPSBiYXNlNjRUb0J5dGVzKHN0cikubGVuZ3RoXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXQgPSBzdHIubGVuZ3RoICogMlxuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGVuY29kaW5nJylcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbkJ1ZmZlci5jb25jYXQgPSBmdW5jdGlvbiAobGlzdCwgdG90YWxMZW5ndGgpIHtcbiAgYXNzZXJ0KGlzQXJyYXkobGlzdCksICdVc2FnZTogQnVmZmVyLmNvbmNhdChsaXN0LCBbdG90YWxMZW5ndGhdKVxcbicgK1xuICAgICAgJ2xpc3Qgc2hvdWxkIGJlIGFuIEFycmF5LicpXG5cbiAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG5ldyBCdWZmZXIoMClcbiAgfSBlbHNlIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBsaXN0WzBdXG4gIH1cblxuICB2YXIgaVxuICBpZiAodHlwZW9mIHRvdGFsTGVuZ3RoICE9PSAnbnVtYmVyJykge1xuICAgIHRvdGFsTGVuZ3RoID0gMFxuICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB0b3RhbExlbmd0aCArPSBsaXN0W2ldLmxlbmd0aFxuICAgIH1cbiAgfVxuXG4gIHZhciBidWYgPSBuZXcgQnVmZmVyKHRvdGFsTGVuZ3RoKVxuICB2YXIgcG9zID0gMFxuICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXVxuICAgIGl0ZW0uY29weShidWYsIHBvcylcbiAgICBwb3MgKz0gaXRlbS5sZW5ndGhcbiAgfVxuICByZXR1cm4gYnVmXG59XG5cbi8vIEJVRkZFUiBJTlNUQU5DRSBNRVRIT0RTXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PVxuXG5mdW5jdGlvbiBfaGV4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICBvZmZzZXQgPSBOdW1iZXIob2Zmc2V0KSB8fCAwXG4gIHZhciByZW1haW5pbmcgPSBidWYubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cblxuICAvLyBtdXN0IGJlIGFuIGV2ZW4gbnVtYmVyIG9mIGRpZ2l0c1xuICB2YXIgc3RyTGVuID0gc3RyaW5nLmxlbmd0aFxuICBhc3NlcnQoc3RyTGVuICUgMiA9PT0gMCwgJ0ludmFsaWQgaGV4IHN0cmluZycpXG5cbiAgaWYgKGxlbmd0aCA+IHN0ckxlbiAvIDIpIHtcbiAgICBsZW5ndGggPSBzdHJMZW4gLyAyXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHZhciBieXRlID0gcGFyc2VJbnQoc3RyaW5nLnN1YnN0cihpICogMiwgMiksIDE2KVxuICAgIGFzc2VydCghaXNOYU4oYnl0ZSksICdJbnZhbGlkIGhleCBzdHJpbmcnKVxuICAgIGJ1ZltvZmZzZXQgKyBpXSA9IGJ5dGVcbiAgfVxuICBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9IGkgKiAyXG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIF91dGY4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgY2hhcnNXcml0dGVuID0gQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPVxuICAgIGJsaXRCdWZmZXIodXRmOFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbiAgcmV0dXJuIGNoYXJzV3JpdHRlblxufVxuXG5mdW5jdGlvbiBfYXNjaWlXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9XG4gICAgYmxpdEJ1ZmZlcihhc2NpaVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbiAgcmV0dXJuIGNoYXJzV3JpdHRlblxufVxuXG5mdW5jdGlvbiBfYmluYXJ5V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gX2FzY2lpV3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBfYmFzZTY0V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgY2hhcnNXcml0dGVuID0gQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPVxuICAgIGJsaXRCdWZmZXIoYmFzZTY0VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxuICByZXR1cm4gY2hhcnNXcml0dGVuXG59XG5cbmZ1bmN0aW9uIF91dGYxNmxlV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgY2hhcnNXcml0dGVuID0gQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPVxuICAgIGJsaXRCdWZmZXIodXRmMTZsZVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbiAgcmV0dXJuIGNoYXJzV3JpdHRlblxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gKHN0cmluZywgb2Zmc2V0LCBsZW5ndGgsIGVuY29kaW5nKSB7XG4gIC8vIFN1cHBvcnQgYm90aCAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpXG4gIC8vIGFuZCB0aGUgbGVnYWN5IChzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgaWYgKGlzRmluaXRlKG9mZnNldCkpIHtcbiAgICBpZiAoIWlzRmluaXRlKGxlbmd0aCkpIHtcbiAgICAgIGVuY29kaW5nID0gbGVuZ3RoXG4gICAgICBsZW5ndGggPSB1bmRlZmluZWRcbiAgICB9XG4gIH0gZWxzZSB7ICAvLyBsZWdhY3lcbiAgICB2YXIgc3dhcCA9IGVuY29kaW5nXG4gICAgZW5jb2RpbmcgPSBvZmZzZXRcbiAgICBvZmZzZXQgPSBsZW5ndGhcbiAgICBsZW5ndGggPSBzd2FwXG4gIH1cblxuICBvZmZzZXQgPSBOdW1iZXIob2Zmc2V0KSB8fCAwXG4gIHZhciByZW1haW5pbmcgPSB0aGlzLmxlbmd0aCAtIG9mZnNldFxuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpXG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gICAgfVxuICB9XG4gIGVuY29kaW5nID0gU3RyaW5nKGVuY29kaW5nIHx8ICd1dGY4JykudG9Mb3dlckNhc2UoKVxuXG4gIHZhciByZXRcbiAgc3dpdGNoIChlbmNvZGluZykge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgICByZXQgPSBfaGV4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgICAgcmV0ID0gX3V0ZjhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgICByZXQgPSBfYXNjaWlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdiaW5hcnknOlxuICAgICAgcmV0ID0gX2JpbmFyeVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICByZXQgPSBfYmFzZTY0V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldCA9IF91dGYxNmxlV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBlbmNvZGluZycpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIHZhciBzZWxmID0gdGhpc1xuXG4gIGVuY29kaW5nID0gU3RyaW5nKGVuY29kaW5nIHx8ICd1dGY4JykudG9Mb3dlckNhc2UoKVxuICBzdGFydCA9IE51bWJlcihzdGFydCkgfHwgMFxuICBlbmQgPSAoZW5kICE9PSB1bmRlZmluZWQpXG4gICAgPyBOdW1iZXIoZW5kKVxuICAgIDogZW5kID0gc2VsZi5sZW5ndGhcblxuICAvLyBGYXN0cGF0aCBlbXB0eSBzdHJpbmdzXG4gIGlmIChlbmQgPT09IHN0YXJ0KVxuICAgIHJldHVybiAnJ1xuXG4gIHZhciByZXRcbiAgc3dpdGNoIChlbmNvZGluZykge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgICByZXQgPSBfaGV4U2xpY2Uoc2VsZiwgc3RhcnQsIGVuZClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgICAgcmV0ID0gX3V0ZjhTbGljZShzZWxmLCBzdGFydCwgZW5kKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgICByZXQgPSBfYXNjaWlTbGljZShzZWxmLCBzdGFydCwgZW5kKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdiaW5hcnknOlxuICAgICAgcmV0ID0gX2JpbmFyeVNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICByZXQgPSBfYmFzZTY0U2xpY2Uoc2VsZiwgc3RhcnQsIGVuZClcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldCA9IF91dGYxNmxlU2xpY2Uoc2VsZiwgc3RhcnQsIGVuZClcbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBlbmNvZGluZycpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnQnVmZmVyJyxcbiAgICBkYXRhOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLl9hcnIgfHwgdGhpcywgMClcbiAgfVxufVxuXG4vLyBjb3B5KHRhcmdldEJ1ZmZlciwgdGFyZ2V0U3RhcnQ9MCwgc291cmNlU3RhcnQ9MCwgc291cmNlRW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmNvcHkgPSBmdW5jdGlvbiAodGFyZ2V0LCB0YXJnZXRfc3RhcnQsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHNvdXJjZSA9IHRoaXNcblxuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgJiYgZW5kICE9PSAwKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAoIXRhcmdldF9zdGFydCkgdGFyZ2V0X3N0YXJ0ID0gMFxuXG4gIC8vIENvcHkgMCBieXRlczsgd2UncmUgZG9uZVxuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuXG4gIGlmICh0YXJnZXQubGVuZ3RoID09PSAwIHx8IHNvdXJjZS5sZW5ndGggPT09IDApIHJldHVyblxuXG4gIC8vIEZhdGFsIGVycm9yIGNvbmRpdGlvbnNcbiAgYXNzZXJ0KGVuZCA+PSBzdGFydCwgJ3NvdXJjZUVuZCA8IHNvdXJjZVN0YXJ0JylcbiAgYXNzZXJ0KHRhcmdldF9zdGFydCA+PSAwICYmIHRhcmdldF9zdGFydCA8IHRhcmdldC5sZW5ndGgsXG4gICAgICAndGFyZ2V0U3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIGFzc2VydChzdGFydCA+PSAwICYmIHN0YXJ0IDwgc291cmNlLmxlbmd0aCwgJ3NvdXJjZVN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICBhc3NlcnQoZW5kID49IDAgJiYgZW5kIDw9IHNvdXJjZS5sZW5ndGgsICdzb3VyY2VFbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgLy8gQXJlIHdlIG9vYj9cbiAgaWYgKGVuZCA+IHRoaXMubGVuZ3RoKVxuICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0X3N0YXJ0IDwgZW5kIC0gc3RhcnQpXG4gICAgZW5kID0gdGFyZ2V0Lmxlbmd0aCAtIHRhcmdldF9zdGFydCArIHN0YXJ0XG5cbiAgLy8gY29weSFcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbmQgLSBzdGFydDsgaSsrKVxuICAgIHRhcmdldFtpICsgdGFyZ2V0X3N0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxufVxuXG5mdW5jdGlvbiBfYmFzZTY0U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBpZiAoc3RhcnQgPT09IDAgJiYgZW5kID09PSBidWYubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1ZilcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmLnNsaWNlKHN0YXJ0LCBlbmQpKVxuICB9XG59XG5cbmZ1bmN0aW9uIF91dGY4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmVzID0gJydcbiAgdmFyIHRtcCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgIGlmIChidWZbaV0gPD0gMHg3Rikge1xuICAgICAgcmVzICs9IGRlY29kZVV0ZjhDaGFyKHRtcCkgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSlcbiAgICAgIHRtcCA9ICcnXG4gICAgfSBlbHNlIHtcbiAgICAgIHRtcCArPSAnJScgKyBidWZbaV0udG9TdHJpbmcoMTYpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcyArIGRlY29kZVV0ZjhDaGFyKHRtcClcbn1cblxuZnVuY3Rpb24gX2FzY2lpU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKVxuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSlcbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBfYmluYXJ5U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICByZXR1cm4gX2FzY2lpU2xpY2UoYnVmLCBzdGFydCwgZW5kKVxufVxuXG5mdW5jdGlvbiBfaGV4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuXG4gIGlmICghc3RhcnQgfHwgc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgfHwgZW5kIDwgMCB8fCBlbmQgPiBsZW4pIGVuZCA9IGxlblxuXG4gIHZhciBvdXQgPSAnJ1xuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgIG91dCArPSB0b0hleChidWZbaV0pXG4gIH1cbiAgcmV0dXJuIG91dFxufVxuXG5mdW5jdGlvbiBfdXRmMTZsZVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGJ5dGVzID0gYnVmLnNsaWNlKHN0YXJ0LCBlbmQpXG4gIHZhciByZXMgPSAnJ1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0gKyBieXRlc1tpKzFdICogMjU2KVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBzdGFydCA9IGNsYW1wKHN0YXJ0LCBsZW4sIDApXG4gIGVuZCA9IGNsYW1wKGVuZCwgbGVuLCBsZW4pXG5cbiAgaWYgKEJ1ZmZlci5fdXNlVHlwZWRBcnJheXMpIHtcbiAgICByZXR1cm4gYXVnbWVudCh0aGlzLnN1YmFycmF5KHN0YXJ0LCBlbmQpKVxuICB9IGVsc2Uge1xuICAgIHZhciBzbGljZUxlbiA9IGVuZCAtIHN0YXJ0XG4gICAgdmFyIG5ld0J1ZiA9IG5ldyBCdWZmZXIoc2xpY2VMZW4sIHVuZGVmaW5lZCwgdHJ1ZSlcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWNlTGVuOyBpKyspIHtcbiAgICAgIG5ld0J1ZltpXSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgICByZXR1cm4gbmV3QnVmXG4gIH1cbn1cblxuLy8gYGdldGAgd2lsbCBiZSByZW1vdmVkIGluIE5vZGUgMC4xMytcbkJ1ZmZlci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKG9mZnNldCkge1xuICBjb25zb2xlLmxvZygnLmdldCgpIGlzIGRlcHJlY2F0ZWQuIEFjY2VzcyB1c2luZyBhcnJheSBpbmRleGVzIGluc3RlYWQuJylcbiAgcmV0dXJuIHRoaXMucmVhZFVJbnQ4KG9mZnNldClcbn1cblxuLy8gYHNldGAgd2lsbCBiZSByZW1vdmVkIGluIE5vZGUgMC4xMytcbkJ1ZmZlci5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKHYsIG9mZnNldCkge1xuICBjb25zb2xlLmxvZygnLnNldCgpIGlzIGRlcHJlY2F0ZWQuIEFjY2VzcyB1c2luZyBhcnJheSBpbmRleGVzIGluc3RlYWQuJylcbiAgcmV0dXJuIHRoaXMud3JpdGVVSW50OCh2LCBvZmZzZXQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQ4ID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCA8IHRoaXMubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgaWYgKG9mZnNldCA+PSB0aGlzLmxlbmd0aClcbiAgICByZXR1cm5cblxuICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbmZ1bmN0aW9uIF9yZWFkVUludDE2IChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDEgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgdmFyIHZhbFxuICBpZiAobGl0dGxlRW5kaWFuKSB7XG4gICAgdmFsID0gYnVmW29mZnNldF1cbiAgICBpZiAob2Zmc2V0ICsgMSA8IGxlbilcbiAgICAgIHZhbCB8PSBidWZbb2Zmc2V0ICsgMV0gPDwgOFxuICB9IGVsc2Uge1xuICAgIHZhbCA9IGJ1ZltvZmZzZXRdIDw8IDhcbiAgICBpZiAob2Zmc2V0ICsgMSA8IGxlbilcbiAgICAgIHZhbCB8PSBidWZbb2Zmc2V0ICsgMV1cbiAgfVxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkVUludDE2KHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkVUludDE2KHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfcmVhZFVJbnQzMiAoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIHZhciB2YWxcbiAgaWYgKGxpdHRsZUVuZGlhbikge1xuICAgIGlmIChvZmZzZXQgKyAyIDwgbGVuKVxuICAgICAgdmFsID0gYnVmW29mZnNldCArIDJdIDw8IDE2XG4gICAgaWYgKG9mZnNldCArIDEgPCBsZW4pXG4gICAgICB2YWwgfD0gYnVmW29mZnNldCArIDFdIDw8IDhcbiAgICB2YWwgfD0gYnVmW29mZnNldF1cbiAgICBpZiAob2Zmc2V0ICsgMyA8IGxlbilcbiAgICAgIHZhbCA9IHZhbCArIChidWZbb2Zmc2V0ICsgM10gPDwgMjQgPj4+IDApXG4gIH0gZWxzZSB7XG4gICAgaWYgKG9mZnNldCArIDEgPCBsZW4pXG4gICAgICB2YWwgPSBidWZbb2Zmc2V0ICsgMV0gPDwgMTZcbiAgICBpZiAob2Zmc2V0ICsgMiA8IGxlbilcbiAgICAgIHZhbCB8PSBidWZbb2Zmc2V0ICsgMl0gPDwgOFxuICAgIGlmIChvZmZzZXQgKyAzIDwgbGVuKVxuICAgICAgdmFsIHw9IGJ1ZltvZmZzZXQgKyAzXVxuICAgIHZhbCA9IHZhbCArIChidWZbb2Zmc2V0XSA8PCAyNCA+Pj4gMClcbiAgfVxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkVUludDMyKHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkVUludDMyKHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQ4ID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsXG4gICAgICAgICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCA8IHRoaXMubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgaWYgKG9mZnNldCA+PSB0aGlzLmxlbmd0aClcbiAgICByZXR1cm5cblxuICB2YXIgbmVnID0gdGhpc1tvZmZzZXRdICYgMHg4MFxuICBpZiAobmVnKVxuICAgIHJldHVybiAoMHhmZiAtIHRoaXNbb2Zmc2V0XSArIDEpICogLTFcbiAgZWxzZVxuICAgIHJldHVybiB0aGlzW29mZnNldF1cbn1cblxuZnVuY3Rpb24gX3JlYWRJbnQxNiAoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAxIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIHZhciB2YWwgPSBfcmVhZFVJbnQxNihidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCB0cnVlKVxuICB2YXIgbmVnID0gdmFsICYgMHg4MDAwXG4gIGlmIChuZWcpXG4gICAgcmV0dXJuICgweGZmZmYgLSB2YWwgKyAxKSAqIC0xXG4gIGVsc2VcbiAgICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2TEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRJbnQxNih0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkSW50MTYodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF9yZWFkSW50MzIgKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICB2YXIgdmFsID0gX3JlYWRVSW50MzIoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgdHJ1ZSlcbiAgdmFyIG5lZyA9IHZhbCAmIDB4ODAwMDAwMDBcbiAgaWYgKG5lZylcbiAgICByZXR1cm4gKDB4ZmZmZmZmZmYgLSB2YWwgKyAxKSAqIC0xXG4gIGVsc2VcbiAgICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyTEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRJbnQzMih0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkSW50MzIodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF9yZWFkRmxvYXQgKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgcmV0dXJuIGllZWU3NTQucmVhZChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEZsb2F0KHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0QkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRGbG9hdCh0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3JlYWREb3VibGUgKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCArIDcgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICB9XG5cbiAgcmV0dXJuIGllZWU3NTQucmVhZChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCA1MiwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlTEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWREb3VibGUodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlQkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWREb3VibGUodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50OCA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgPCB0aGlzLmxlbmd0aCwgJ3RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZ1aW50KHZhbHVlLCAweGZmKVxuICB9XG5cbiAgaWYgKG9mZnNldCA+PSB0aGlzLmxlbmd0aCkgcmV0dXJuXG5cbiAgdGhpc1tvZmZzZXRdID0gdmFsdWVcbn1cblxuZnVuY3Rpb24gX3dyaXRlVUludDE2IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDEgPCBidWYubGVuZ3RoLCAndHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZnVpbnQodmFsdWUsIDB4ZmZmZilcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4obGVuIC0gb2Zmc2V0LCAyKTsgaSA8IGo7IGkrKykge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9XG4gICAgICAgICh2YWx1ZSAmICgweGZmIDw8ICg4ICogKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkpKSkgPj4+XG4gICAgICAgICAgICAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSAqIDhcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2TEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3dyaXRlVUludDMyIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAndHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZnVpbnQodmFsdWUsIDB4ZmZmZmZmZmYpXG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuICBpZiAob2Zmc2V0ID49IGxlbilcbiAgICByZXR1cm5cblxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGxlbiAtIG9mZnNldCwgNCk7IGkgPCBqOyBpKyspIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPVxuICAgICAgICAodmFsdWUgPj4+IChsaXR0bGVFbmRpYW4gPyBpIDogMyAtIGkpICogOCkgJiAweGZmXG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQ4ID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCA8IHRoaXMubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZnNpbnQodmFsdWUsIDB4N2YsIC0weDgwKVxuICB9XG5cbiAgaWYgKG9mZnNldCA+PSB0aGlzLmxlbmd0aClcbiAgICByZXR1cm5cblxuICBpZiAodmFsdWUgPj0gMClcbiAgICB0aGlzLndyaXRlVUludDgodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpXG4gIGVsc2VcbiAgICB0aGlzLndyaXRlVUludDgoMHhmZiArIHZhbHVlICsgMSwgb2Zmc2V0LCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gX3dyaXRlSW50MTYgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJylcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpXG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0JylcbiAgICBhc3NlcnQob2Zmc2V0ICsgMSA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxuICAgIHZlcmlmc2ludCh2YWx1ZSwgMHg3ZmZmLCAtMHg4MDAwKVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgaWYgKHZhbHVlID49IDApXG4gICAgX3dyaXRlVUludDE2KGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydClcbiAgZWxzZVxuICAgIF93cml0ZVVJbnQxNihidWYsIDB4ZmZmZiArIHZhbHVlICsgMSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2QkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiBfd3JpdGVJbnQzMiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZzaW50KHZhbHVlLCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG4gIGlmIChvZmZzZXQgPj0gbGVuKVxuICAgIHJldHVyblxuXG4gIGlmICh2YWx1ZSA+PSAwKVxuICAgIF93cml0ZVVJbnQzMihidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpXG4gIGVsc2VcbiAgICBfd3JpdGVVSW50MzIoYnVmLCAweGZmZmZmZmZmICsgdmFsdWUgKyAxLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF93cml0ZUZsb2F0IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpXG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKVxuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpXG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbiAgICB2ZXJpZklFRUU3NTQodmFsdWUsIDMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgsIC0zLjQwMjgyMzQ2NjM4NTI4ODZlKzM4KVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdExFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIF93cml0ZURvdWJsZSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKVxuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJylcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKVxuICAgIGFzc2VydChvZmZzZXQgKyA3IDwgYnVmLmxlbmd0aCxcbiAgICAgICAgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG4gICAgdmVyaWZJRUVFNzU0KHZhbHVlLCAxLjc5NzY5MzEzNDg2MjMxNTdFKzMwOCwgLTEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4KVxuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcbiAgaWYgKG9mZnNldCA+PSBsZW4pXG4gICAgcmV0dXJuXG5cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG4vLyBmaWxsKHZhbHVlLCBzdGFydD0wLCBlbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uICh2YWx1ZSwgc3RhcnQsIGVuZCkge1xuICBpZiAoIXZhbHVlKSB2YWx1ZSA9IDBcbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwXG4gIGlmICghZW5kKSBlbmQgPSB0aGlzLmxlbmd0aFxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFsdWUgPSB2YWx1ZS5jaGFyQ29kZUF0KDApXG4gIH1cblxuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiAhaXNOYU4odmFsdWUpLCAndmFsdWUgaXMgbm90IGEgbnVtYmVyJylcbiAgYXNzZXJ0KGVuZCA+PSBzdGFydCwgJ2VuZCA8IHN0YXJ0JylcblxuICAvLyBGaWxsIDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVyblxuICBpZiAodGhpcy5sZW5ndGggPT09IDApIHJldHVyblxuXG4gIGFzc2VydChzdGFydCA+PSAwICYmIHN0YXJ0IDwgdGhpcy5sZW5ndGgsICdzdGFydCBvdXQgb2YgYm91bmRzJylcbiAgYXNzZXJ0KGVuZCA+PSAwICYmIGVuZCA8PSB0aGlzLmxlbmd0aCwgJ2VuZCBvdXQgb2YgYm91bmRzJylcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgIHRoaXNbaV0gPSB2YWx1ZVxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIG91dCA9IFtdXG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgb3V0W2ldID0gdG9IZXgodGhpc1tpXSlcbiAgICBpZiAoaSA9PT0gZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFUykge1xuICAgICAgb3V0W2kgKyAxXSA9ICcuLi4nXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuICByZXR1cm4gJzxCdWZmZXIgJyArIG91dC5qb2luKCcgJykgKyAnPidcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGBBcnJheUJ1ZmZlcmAgd2l0aCB0aGUgKmNvcGllZCogbWVtb3J5IG9mIHRoZSBidWZmZXIgaW5zdGFuY2UuXG4gKiBBZGRlZCBpbiBOb2RlIDAuMTIuIE9ubHkgYXZhaWxhYmxlIGluIGJyb3dzZXJzIHRoYXQgc3VwcG9ydCBBcnJheUJ1ZmZlci5cbiAqL1xuQnVmZmVyLnByb3RvdHlwZS50b0FycmF5QnVmZmVyID0gZnVuY3Rpb24gKCkge1xuICBpZiAodHlwZW9mIFVpbnQ4QXJyYXkgPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoQnVmZmVyLl91c2VUeXBlZEFycmF5cykge1xuICAgICAgcmV0dXJuIChuZXcgQnVmZmVyKHRoaXMpKS5idWZmZXJcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGJ1ZiA9IG5ldyBVaW50OEFycmF5KHRoaXMubGVuZ3RoKVxuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGJ1Zi5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMSlcbiAgICAgICAgYnVmW2ldID0gdGhpc1tpXVxuICAgICAgcmV0dXJuIGJ1Zi5idWZmZXJcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdCdWZmZXIudG9BcnJheUJ1ZmZlciBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlcicpXG4gIH1cbn1cblxuLy8gSEVMUEVSIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09PVxuXG5mdW5jdGlvbiBzdHJpbmd0cmltIChzdHIpIHtcbiAgaWYgKHN0ci50cmltKSByZXR1cm4gc3RyLnRyaW0oKVxuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKVxufVxuXG52YXIgQlAgPSBCdWZmZXIucHJvdG90eXBlXG5cbi8qKlxuICogQXVnbWVudCB0aGUgVWludDhBcnJheSAqaW5zdGFuY2UqIChub3QgdGhlIGNsYXNzISkgd2l0aCBCdWZmZXIgbWV0aG9kc1xuICovXG5mdW5jdGlvbiBhdWdtZW50IChhcnIpIHtcbiAgYXJyLl9pc0J1ZmZlciA9IHRydWVcblxuICAvLyBzYXZlIHJlZmVyZW5jZSB0byBvcmlnaW5hbCBVaW50OEFycmF5IGdldC9zZXQgbWV0aG9kcyBiZWZvcmUgb3ZlcndyaXRpbmdcbiAgYXJyLl9nZXQgPSBhcnIuZ2V0XG4gIGFyci5fc2V0ID0gYXJyLnNldFxuXG4gIC8vIGRlcHJlY2F0ZWQsIHdpbGwgYmUgcmVtb3ZlZCBpbiBub2RlIDAuMTMrXG4gIGFyci5nZXQgPSBCUC5nZXRcbiAgYXJyLnNldCA9IEJQLnNldFxuXG4gIGFyci53cml0ZSA9IEJQLndyaXRlXG4gIGFyci50b1N0cmluZyA9IEJQLnRvU3RyaW5nXG4gIGFyci50b0xvY2FsZVN0cmluZyA9IEJQLnRvU3RyaW5nXG4gIGFyci50b0pTT04gPSBCUC50b0pTT05cbiAgYXJyLmNvcHkgPSBCUC5jb3B5XG4gIGFyci5zbGljZSA9IEJQLnNsaWNlXG4gIGFyci5yZWFkVUludDggPSBCUC5yZWFkVUludDhcbiAgYXJyLnJlYWRVSW50MTZMRSA9IEJQLnJlYWRVSW50MTZMRVxuICBhcnIucmVhZFVJbnQxNkJFID0gQlAucmVhZFVJbnQxNkJFXG4gIGFyci5yZWFkVUludDMyTEUgPSBCUC5yZWFkVUludDMyTEVcbiAgYXJyLnJlYWRVSW50MzJCRSA9IEJQLnJlYWRVSW50MzJCRVxuICBhcnIucmVhZEludDggPSBCUC5yZWFkSW50OFxuICBhcnIucmVhZEludDE2TEUgPSBCUC5yZWFkSW50MTZMRVxuICBhcnIucmVhZEludDE2QkUgPSBCUC5yZWFkSW50MTZCRVxuICBhcnIucmVhZEludDMyTEUgPSBCUC5yZWFkSW50MzJMRVxuICBhcnIucmVhZEludDMyQkUgPSBCUC5yZWFkSW50MzJCRVxuICBhcnIucmVhZEZsb2F0TEUgPSBCUC5yZWFkRmxvYXRMRVxuICBhcnIucmVhZEZsb2F0QkUgPSBCUC5yZWFkRmxvYXRCRVxuICBhcnIucmVhZERvdWJsZUxFID0gQlAucmVhZERvdWJsZUxFXG4gIGFyci5yZWFkRG91YmxlQkUgPSBCUC5yZWFkRG91YmxlQkVcbiAgYXJyLndyaXRlVUludDggPSBCUC53cml0ZVVJbnQ4XG4gIGFyci53cml0ZVVJbnQxNkxFID0gQlAud3JpdGVVSW50MTZMRVxuICBhcnIud3JpdGVVSW50MTZCRSA9IEJQLndyaXRlVUludDE2QkVcbiAgYXJyLndyaXRlVUludDMyTEUgPSBCUC53cml0ZVVJbnQzMkxFXG4gIGFyci53cml0ZVVJbnQzMkJFID0gQlAud3JpdGVVSW50MzJCRVxuICBhcnIud3JpdGVJbnQ4ID0gQlAud3JpdGVJbnQ4XG4gIGFyci53cml0ZUludDE2TEUgPSBCUC53cml0ZUludDE2TEVcbiAgYXJyLndyaXRlSW50MTZCRSA9IEJQLndyaXRlSW50MTZCRVxuICBhcnIud3JpdGVJbnQzMkxFID0gQlAud3JpdGVJbnQzMkxFXG4gIGFyci53cml0ZUludDMyQkUgPSBCUC53cml0ZUludDMyQkVcbiAgYXJyLndyaXRlRmxvYXRMRSA9IEJQLndyaXRlRmxvYXRMRVxuICBhcnIud3JpdGVGbG9hdEJFID0gQlAud3JpdGVGbG9hdEJFXG4gIGFyci53cml0ZURvdWJsZUxFID0gQlAud3JpdGVEb3VibGVMRVxuICBhcnIud3JpdGVEb3VibGVCRSA9IEJQLndyaXRlRG91YmxlQkVcbiAgYXJyLmZpbGwgPSBCUC5maWxsXG4gIGFyci5pbnNwZWN0ID0gQlAuaW5zcGVjdFxuICBhcnIudG9BcnJheUJ1ZmZlciA9IEJQLnRvQXJyYXlCdWZmZXJcblxuICByZXR1cm4gYXJyXG59XG5cbi8vIHNsaWNlKHN0YXJ0LCBlbmQpXG5mdW5jdGlvbiBjbGFtcCAoaW5kZXgsIGxlbiwgZGVmYXVsdFZhbHVlKSB7XG4gIGlmICh0eXBlb2YgaW5kZXggIT09ICdudW1iZXInKSByZXR1cm4gZGVmYXVsdFZhbHVlXG4gIGluZGV4ID0gfn5pbmRleDsgIC8vIENvZXJjZSB0byBpbnRlZ2VyLlxuICBpZiAoaW5kZXggPj0gbGVuKSByZXR1cm4gbGVuXG4gIGlmIChpbmRleCA+PSAwKSByZXR1cm4gaW5kZXhcbiAgaW5kZXggKz0gbGVuXG4gIGlmIChpbmRleCA+PSAwKSByZXR1cm4gaW5kZXhcbiAgcmV0dXJuIDBcbn1cblxuZnVuY3Rpb24gY29lcmNlIChsZW5ndGgpIHtcbiAgLy8gQ29lcmNlIGxlbmd0aCB0byBhIG51bWJlciAocG9zc2libHkgTmFOKSwgcm91bmQgdXBcbiAgLy8gaW4gY2FzZSBpdCdzIGZyYWN0aW9uYWwgKGUuZy4gMTIzLjQ1NikgdGhlbiBkbyBhXG4gIC8vIGRvdWJsZSBuZWdhdGUgdG8gY29lcmNlIGEgTmFOIHRvIDAuIEVhc3ksIHJpZ2h0P1xuICBsZW5ndGggPSB+fk1hdGguY2VpbCgrbGVuZ3RoKVxuICByZXR1cm4gbGVuZ3RoIDwgMCA/IDAgOiBsZW5ndGhcbn1cblxuZnVuY3Rpb24gaXNBcnJheSAoc3ViamVjdCkge1xuICByZXR1cm4gKEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKHN1YmplY3QpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN1YmplY3QpID09PSAnW29iamVjdCBBcnJheV0nXG4gIH0pKHN1YmplY3QpXG59XG5cbmZ1bmN0aW9uIGlzQXJyYXlpc2ggKHN1YmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXkoc3ViamVjdCkgfHwgQnVmZmVyLmlzQnVmZmVyKHN1YmplY3QpIHx8XG4gICAgICBzdWJqZWN0ICYmIHR5cGVvZiBzdWJqZWN0ID09PSAnb2JqZWN0JyAmJlxuICAgICAgdHlwZW9mIHN1YmplY3QubGVuZ3RoID09PSAnbnVtYmVyJ1xufVxuXG5mdW5jdGlvbiB0b0hleCAobikge1xuICBpZiAobiA8IDE2KSByZXR1cm4gJzAnICsgbi50b1N0cmluZygxNilcbiAgcmV0dXJuIG4udG9TdHJpbmcoMTYpXG59XG5cbmZ1bmN0aW9uIHV0ZjhUb0J5dGVzIChzdHIpIHtcbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGIgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGlmIChiIDw9IDB4N0YpXG4gICAgICBieXRlQXJyYXkucHVzaChzdHIuY2hhckNvZGVBdChpKSlcbiAgICBlbHNlIHtcbiAgICAgIHZhciBzdGFydCA9IGlcbiAgICAgIGlmIChiID49IDB4RDgwMCAmJiBiIDw9IDB4REZGRikgaSsrXG4gICAgICB2YXIgaCA9IGVuY29kZVVSSUNvbXBvbmVudChzdHIuc2xpY2Uoc3RhcnQsIGkrMSkpLnN1YnN0cigxKS5zcGxpdCgnJScpXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGgubGVuZ3RoOyBqKyspXG4gICAgICAgIGJ5dGVBcnJheS5wdXNoKHBhcnNlSW50KGhbal0sIDE2KSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiBhc2NpaVRvQnl0ZXMgKHN0cikge1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBOb2RlJ3MgY29kZSBzZWVtcyB0byBiZSBkb2luZyB0aGlzIGFuZCBub3QgJiAweDdGLi5cbiAgICBieXRlQXJyYXkucHVzaChzdHIuY2hhckNvZGVBdChpKSAmIDB4RkYpXG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiB1dGYxNmxlVG9CeXRlcyAoc3RyKSB7XG4gIHZhciBjLCBoaSwgbG9cbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgYyA9IHN0ci5jaGFyQ29kZUF0KGkpXG4gICAgaGkgPSBjID4+IDhcbiAgICBsbyA9IGMgJSAyNTZcbiAgICBieXRlQXJyYXkucHVzaChsbylcbiAgICBieXRlQXJyYXkucHVzaChoaSlcbiAgfVxuXG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gYmFzZTY0VG9CeXRlcyAoc3RyKSB7XG4gIHJldHVybiBiYXNlNjQudG9CeXRlQXJyYXkoc3RyKVxufVxuXG5mdW5jdGlvbiBibGl0QnVmZmVyIChzcmMsIGRzdCwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIHBvc1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKChpICsgb2Zmc2V0ID49IGRzdC5sZW5ndGgpIHx8IChpID49IHNyYy5sZW5ndGgpKVxuICAgICAgYnJlYWtcbiAgICBkc3RbaSArIG9mZnNldF0gPSBzcmNbaV1cbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiBkZWNvZGVVdGY4Q2hhciAoc3RyKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzdHIpXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4RkZGRCkgLy8gVVRGIDggaW52YWxpZCBjaGFyXG4gIH1cbn1cblxuLypcbiAqIFdlIGhhdmUgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIHZhbHVlIGlzIGEgdmFsaWQgaW50ZWdlci4gVGhpcyBtZWFucyB0aGF0IGl0XG4gKiBpcyBub24tbmVnYXRpdmUuIEl0IGhhcyBubyBmcmFjdGlvbmFsIGNvbXBvbmVudCBhbmQgdGhhdCBpdCBkb2VzIG5vdFxuICogZXhjZWVkIHRoZSBtYXhpbXVtIGFsbG93ZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHZlcmlmdWludCAodmFsdWUsIG1heCkge1xuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJywgJ2Nhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXInKVxuICBhc3NlcnQodmFsdWUgPj0gMCwgJ3NwZWNpZmllZCBhIG5lZ2F0aXZlIHZhbHVlIGZvciB3cml0aW5nIGFuIHVuc2lnbmVkIHZhbHVlJylcbiAgYXNzZXJ0KHZhbHVlIDw9IG1heCwgJ3ZhbHVlIGlzIGxhcmdlciB0aGFuIG1heGltdW0gdmFsdWUgZm9yIHR5cGUnKVxuICBhc3NlcnQoTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlLCAndmFsdWUgaGFzIGEgZnJhY3Rpb25hbCBjb21wb25lbnQnKVxufVxuXG5mdW5jdGlvbiB2ZXJpZnNpbnQgKHZhbHVlLCBtYXgsIG1pbikge1xuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJywgJ2Nhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXInKVxuICBhc3NlcnQodmFsdWUgPD0gbWF4LCAndmFsdWUgbGFyZ2VyIHRoYW4gbWF4aW11bSBhbGxvd2VkIHZhbHVlJylcbiAgYXNzZXJ0KHZhbHVlID49IG1pbiwgJ3ZhbHVlIHNtYWxsZXIgdGhhbiBtaW5pbXVtIGFsbG93ZWQgdmFsdWUnKVxuICBhc3NlcnQoTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlLCAndmFsdWUgaGFzIGEgZnJhY3Rpb25hbCBjb21wb25lbnQnKVxufVxuXG5mdW5jdGlvbiB2ZXJpZklFRUU3NTQgKHZhbHVlLCBtYXgsIG1pbikge1xuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJywgJ2Nhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXInKVxuICBhc3NlcnQodmFsdWUgPD0gbWF4LCAndmFsdWUgbGFyZ2VyIHRoYW4gbWF4aW11bSBhbGxvd2VkIHZhbHVlJylcbiAgYXNzZXJ0KHZhbHVlID49IG1pbiwgJ3ZhbHVlIHNtYWxsZXIgdGhhbiBtaW5pbXVtIGFsbG93ZWQgdmFsdWUnKVxufVxuXG5mdW5jdGlvbiBhc3NlcnQgKHRlc3QsIG1lc3NhZ2UpIHtcbiAgaWYgKCF0ZXN0KSB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCAnRmFpbGVkIGFzc2VydGlvbicpXG59XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiL2hvbWUvZG9zdG9kYWJzaS9jb2RlL2Jha2svZXhwZXJpbWVudC10ZW1wbGF0ZS9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9pbnNlcnQtbW9kdWxlLWdsb2JhbHMvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2J1ZmZlci9pbmRleC5qc1wiLFwiLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2J1ZmZlclwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbnZhciBsb29rdXAgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7XG5cbjsoZnVuY3Rpb24gKGV4cG9ydHMpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG4gIHZhciBBcnIgPSAodHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnKVxuICAgID8gVWludDhBcnJheVxuICAgIDogQXJyYXlcblxuXHR2YXIgWkVSTyAgID0gJzAnLmNoYXJDb2RlQXQoMClcblx0dmFyIFBMVVMgICA9ICcrJy5jaGFyQ29kZUF0KDApXG5cdHZhciBTTEFTSCAgPSAnLycuY2hhckNvZGVBdCgwKVxuXHR2YXIgTlVNQkVSID0gJzAnLmNoYXJDb2RlQXQoMClcblx0dmFyIExPV0VSICA9ICdhJy5jaGFyQ29kZUF0KDApXG5cdHZhciBVUFBFUiAgPSAnQScuY2hhckNvZGVBdCgwKVxuXG5cdGZ1bmN0aW9uIGRlY29kZSAoZWx0KSB7XG5cdFx0dmFyIGNvZGUgPSBlbHQuY2hhckNvZGVBdCgwKVxuXHRcdGlmIChjb2RlID09PSBQTFVTKVxuXHRcdFx0cmV0dXJuIDYyIC8vICcrJ1xuXHRcdGlmIChjb2RlID09PSBTTEFTSClcblx0XHRcdHJldHVybiA2MyAvLyAnLydcblx0XHRpZiAoY29kZSA8IE5VTUJFUilcblx0XHRcdHJldHVybiAtMSAvL25vIG1hdGNoXG5cdFx0aWYgKGNvZGUgPCBOVU1CRVIgKyAxMClcblx0XHRcdHJldHVybiBjb2RlIC0gTlVNQkVSICsgMjYgKyAyNlxuXHRcdGlmIChjb2RlIDwgVVBQRVIgKyAyNilcblx0XHRcdHJldHVybiBjb2RlIC0gVVBQRVJcblx0XHRpZiAoY29kZSA8IExPV0VSICsgMjYpXG5cdFx0XHRyZXR1cm4gY29kZSAtIExPV0VSICsgMjZcblx0fVxuXG5cdGZ1bmN0aW9uIGI2NFRvQnl0ZUFycmF5IChiNjQpIHtcblx0XHR2YXIgaSwgaiwgbCwgdG1wLCBwbGFjZUhvbGRlcnMsIGFyclxuXG5cdFx0aWYgKGI2NC5sZW5ndGggJSA0ID4gMCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN0cmluZy4gTGVuZ3RoIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA0Jylcblx0XHR9XG5cblx0XHQvLyB0aGUgbnVtYmVyIG9mIGVxdWFsIHNpZ25zIChwbGFjZSBob2xkZXJzKVxuXHRcdC8vIGlmIHRoZXJlIGFyZSB0d28gcGxhY2Vob2xkZXJzLCB0aGFuIHRoZSB0d28gY2hhcmFjdGVycyBiZWZvcmUgaXRcblx0XHQvLyByZXByZXNlbnQgb25lIGJ5dGVcblx0XHQvLyBpZiB0aGVyZSBpcyBvbmx5IG9uZSwgdGhlbiB0aGUgdGhyZWUgY2hhcmFjdGVycyBiZWZvcmUgaXQgcmVwcmVzZW50IDIgYnl0ZXNcblx0XHQvLyB0aGlzIGlzIGp1c3QgYSBjaGVhcCBoYWNrIHRvIG5vdCBkbyBpbmRleE9mIHR3aWNlXG5cdFx0dmFyIGxlbiA9IGI2NC5sZW5ndGhcblx0XHRwbGFjZUhvbGRlcnMgPSAnPScgPT09IGI2NC5jaGFyQXQobGVuIC0gMikgPyAyIDogJz0nID09PSBiNjQuY2hhckF0KGxlbiAtIDEpID8gMSA6IDBcblxuXHRcdC8vIGJhc2U2NCBpcyA0LzMgKyB1cCB0byB0d28gY2hhcmFjdGVycyBvZiB0aGUgb3JpZ2luYWwgZGF0YVxuXHRcdGFyciA9IG5ldyBBcnIoYjY0Lmxlbmd0aCAqIDMgLyA0IC0gcGxhY2VIb2xkZXJzKVxuXG5cdFx0Ly8gaWYgdGhlcmUgYXJlIHBsYWNlaG9sZGVycywgb25seSBnZXQgdXAgdG8gdGhlIGxhc3QgY29tcGxldGUgNCBjaGFyc1xuXHRcdGwgPSBwbGFjZUhvbGRlcnMgPiAwID8gYjY0Lmxlbmd0aCAtIDQgOiBiNjQubGVuZ3RoXG5cblx0XHR2YXIgTCA9IDBcblxuXHRcdGZ1bmN0aW9uIHB1c2ggKHYpIHtcblx0XHRcdGFycltMKytdID0gdlxuXHRcdH1cblxuXHRcdGZvciAoaSA9IDAsIGogPSAwOyBpIDwgbDsgaSArPSA0LCBqICs9IDMpIHtcblx0XHRcdHRtcCA9IChkZWNvZGUoYjY0LmNoYXJBdChpKSkgPDwgMTgpIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAxKSkgPDwgMTIpIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAyKSkgPDwgNikgfCBkZWNvZGUoYjY0LmNoYXJBdChpICsgMykpXG5cdFx0XHRwdXNoKCh0bXAgJiAweEZGMDAwMCkgPj4gMTYpXG5cdFx0XHRwdXNoKCh0bXAgJiAweEZGMDApID4+IDgpXG5cdFx0XHRwdXNoKHRtcCAmIDB4RkYpXG5cdFx0fVxuXG5cdFx0aWYgKHBsYWNlSG9sZGVycyA9PT0gMikge1xuXHRcdFx0dG1wID0gKGRlY29kZShiNjQuY2hhckF0KGkpKSA8PCAyKSB8IChkZWNvZGUoYjY0LmNoYXJBdChpICsgMSkpID4+IDQpXG5cdFx0XHRwdXNoKHRtcCAmIDB4RkYpXG5cdFx0fSBlbHNlIGlmIChwbGFjZUhvbGRlcnMgPT09IDEpIHtcblx0XHRcdHRtcCA9IChkZWNvZGUoYjY0LmNoYXJBdChpKSkgPDwgMTApIHwgKGRlY29kZShiNjQuY2hhckF0KGkgKyAxKSkgPDwgNCkgfCAoZGVjb2RlKGI2NC5jaGFyQXQoaSArIDIpKSA+PiAyKVxuXHRcdFx0cHVzaCgodG1wID4+IDgpICYgMHhGRilcblx0XHRcdHB1c2godG1wICYgMHhGRilcblx0XHR9XG5cblx0XHRyZXR1cm4gYXJyXG5cdH1cblxuXHRmdW5jdGlvbiB1aW50OFRvQmFzZTY0ICh1aW50OCkge1xuXHRcdHZhciBpLFxuXHRcdFx0ZXh0cmFCeXRlcyA9IHVpbnQ4Lmxlbmd0aCAlIDMsIC8vIGlmIHdlIGhhdmUgMSBieXRlIGxlZnQsIHBhZCAyIGJ5dGVzXG5cdFx0XHRvdXRwdXQgPSBcIlwiLFxuXHRcdFx0dGVtcCwgbGVuZ3RoXG5cblx0XHRmdW5jdGlvbiBlbmNvZGUgKG51bSkge1xuXHRcdFx0cmV0dXJuIGxvb2t1cC5jaGFyQXQobnVtKVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHRyaXBsZXRUb0Jhc2U2NCAobnVtKSB7XG5cdFx0XHRyZXR1cm4gZW5jb2RlKG51bSA+PiAxOCAmIDB4M0YpICsgZW5jb2RlKG51bSA+PiAxMiAmIDB4M0YpICsgZW5jb2RlKG51bSA+PiA2ICYgMHgzRikgKyBlbmNvZGUobnVtICYgMHgzRilcblx0XHR9XG5cblx0XHQvLyBnbyB0aHJvdWdoIHRoZSBhcnJheSBldmVyeSB0aHJlZSBieXRlcywgd2UnbGwgZGVhbCB3aXRoIHRyYWlsaW5nIHN0dWZmIGxhdGVyXG5cdFx0Zm9yIChpID0gMCwgbGVuZ3RoID0gdWludDgubGVuZ3RoIC0gZXh0cmFCeXRlczsgaSA8IGxlbmd0aDsgaSArPSAzKSB7XG5cdFx0XHR0ZW1wID0gKHVpbnQ4W2ldIDw8IDE2KSArICh1aW50OFtpICsgMV0gPDwgOCkgKyAodWludDhbaSArIDJdKVxuXHRcdFx0b3V0cHV0ICs9IHRyaXBsZXRUb0Jhc2U2NCh0ZW1wKVxuXHRcdH1cblxuXHRcdC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcblx0XHRzd2l0Y2ggKGV4dHJhQnl0ZXMpIHtcblx0XHRcdGNhc2UgMTpcblx0XHRcdFx0dGVtcCA9IHVpbnQ4W3VpbnQ4Lmxlbmd0aCAtIDFdXG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUodGVtcCA+PiAyKVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKCh0ZW1wIDw8IDQpICYgMHgzRilcblx0XHRcdFx0b3V0cHV0ICs9ICc9PSdcblx0XHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgMjpcblx0XHRcdFx0dGVtcCA9ICh1aW50OFt1aW50OC5sZW5ndGggLSAyXSA8PCA4KSArICh1aW50OFt1aW50OC5sZW5ndGggLSAxXSlcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSh0ZW1wID4+IDEwKVxuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKCh0ZW1wID4+IDQpICYgMHgzRilcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSgodGVtcCA8PCAyKSAmIDB4M0YpXG5cdFx0XHRcdG91dHB1dCArPSAnPSdcblx0XHRcdFx0YnJlYWtcblx0XHR9XG5cblx0XHRyZXR1cm4gb3V0cHV0XG5cdH1cblxuXHRtb2R1bGUuZXhwb3J0cy50b0J5dGVBcnJheSA9IGI2NFRvQnl0ZUFycmF5XG5cdG1vZHVsZS5leHBvcnRzLmZyb21CeXRlQXJyYXkgPSB1aW50OFRvQmFzZTY0XG59KCkpXG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiL2hvbWUvZG9zdG9kYWJzaS9jb2RlL2Jha2svZXhwZXJpbWVudC10ZW1wbGF0ZS9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9pbnNlcnQtbW9kdWxlLWdsb2JhbHMvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2J1ZmZlci9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2xpYi9iNjQuanNcIixcIi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9idWZmZXIvbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9saWJcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG5leHBvcnRzLnJlYWQgPSBmdW5jdGlvbihidWZmZXIsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLFxuICAgICAgZUxlbiA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMSxcbiAgICAgIGVNYXggPSAoMSA8PCBlTGVuKSAtIDEsXG4gICAgICBlQmlhcyA9IGVNYXggPj4gMSxcbiAgICAgIG5CaXRzID0gLTcsXG4gICAgICBpID0gaXNMRSA/IChuQnl0ZXMgLSAxKSA6IDAsXG4gICAgICBkID0gaXNMRSA/IC0xIDogMSxcbiAgICAgIHMgPSBidWZmZXJbb2Zmc2V0ICsgaV07XG5cbiAgaSArPSBkO1xuXG4gIGUgPSBzICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpO1xuICBzID4+PSAoLW5CaXRzKTtcbiAgbkJpdHMgKz0gZUxlbjtcbiAgZm9yICg7IG5CaXRzID4gMDsgZSA9IGUgKiAyNTYgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCk7XG5cbiAgbSA9IGUgJiAoKDEgPDwgKC1uQml0cykpIC0gMSk7XG4gIGUgPj49ICgtbkJpdHMpO1xuICBuQml0cyArPSBtTGVuO1xuICBmb3IgKDsgbkJpdHMgPiAwOyBtID0gbSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KTtcblxuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXM7XG4gIH0gZWxzZSBpZiAoZSA9PT0gZU1heCkge1xuICAgIHJldHVybiBtID8gTmFOIDogKChzID8gLTEgOiAxKSAqIEluZmluaXR5KTtcbiAgfSBlbHNlIHtcbiAgICBtID0gbSArIE1hdGgucG93KDIsIG1MZW4pO1xuICAgIGUgPSBlIC0gZUJpYXM7XG4gIH1cbiAgcmV0dXJuIChzID8gLTEgOiAxKSAqIG0gKiBNYXRoLnBvdygyLCBlIC0gbUxlbik7XG59O1xuXG5leHBvcnRzLndyaXRlID0gZnVuY3Rpb24oYnVmZmVyLCB2YWx1ZSwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG0sIGMsXG4gICAgICBlTGVuID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxLFxuICAgICAgZU1heCA9ICgxIDw8IGVMZW4pIC0gMSxcbiAgICAgIGVCaWFzID0gZU1heCA+PiAxLFxuICAgICAgcnQgPSAobUxlbiA9PT0gMjMgPyBNYXRoLnBvdygyLCAtMjQpIC0gTWF0aC5wb3coMiwgLTc3KSA6IDApLFxuICAgICAgaSA9IGlzTEUgPyAwIDogKG5CeXRlcyAtIDEpLFxuICAgICAgZCA9IGlzTEUgPyAxIDogLTEsXG4gICAgICBzID0gdmFsdWUgPCAwIHx8ICh2YWx1ZSA9PT0gMCAmJiAxIC8gdmFsdWUgPCAwKSA/IDEgOiAwO1xuXG4gIHZhbHVlID0gTWF0aC5hYnModmFsdWUpO1xuXG4gIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IEluZmluaXR5KSB7XG4gICAgbSA9IGlzTmFOKHZhbHVlKSA/IDEgOiAwO1xuICAgIGUgPSBlTWF4O1xuICB9IGVsc2Uge1xuICAgIGUgPSBNYXRoLmZsb29yKE1hdGgubG9nKHZhbHVlKSAvIE1hdGguTE4yKTtcbiAgICBpZiAodmFsdWUgKiAoYyA9IE1hdGgucG93KDIsIC1lKSkgPCAxKSB7XG4gICAgICBlLS07XG4gICAgICBjICo9IDI7XG4gICAgfVxuICAgIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgdmFsdWUgKz0gcnQgLyBjO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIE1hdGgucG93KDIsIDEgLSBlQmlhcyk7XG4gICAgfVxuICAgIGlmICh2YWx1ZSAqIGMgPj0gMikge1xuICAgICAgZSsrO1xuICAgICAgYyAvPSAyO1xuICAgIH1cblxuICAgIGlmIChlICsgZUJpYXMgPj0gZU1heCkge1xuICAgICAgbSA9IDA7XG4gICAgICBlID0gZU1heDtcbiAgICB9IGVsc2UgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICBtID0gKHZhbHVlICogYyAtIDEpICogTWF0aC5wb3coMiwgbUxlbik7XG4gICAgICBlID0gZSArIGVCaWFzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gdmFsdWUgKiBNYXRoLnBvdygyLCBlQmlhcyAtIDEpICogTWF0aC5wb3coMiwgbUxlbik7XG4gICAgICBlID0gMDtcbiAgICB9XG4gIH1cblxuICBmb3IgKDsgbUxlbiA+PSA4OyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBtICYgMHhmZiwgaSArPSBkLCBtIC89IDI1NiwgbUxlbiAtPSA4KTtcblxuICBlID0gKGUgPDwgbUxlbikgfCBtO1xuICBlTGVuICs9IG1MZW47XG4gIGZvciAoOyBlTGVuID4gMDsgYnVmZmVyW29mZnNldCArIGldID0gZSAmIDB4ZmYsIGkgKz0gZCwgZSAvPSAyNTYsIGVMZW4gLT0gOCk7XG5cbiAgYnVmZmVyW29mZnNldCArIGkgLSBkXSB8PSBzICogMTI4O1xufTtcblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCIvaG9tZS9kb3N0b2RhYnNpL2NvZGUvYmFray9leHBlcmltZW50LXRlbXBsYXRlL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzXCIsXCIvLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnVmZmVyL25vZGVfbW9kdWxlcy9pZWVlNzU0XCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxucHJvY2Vzcy5uZXh0VGljayA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhblNldEltbWVkaWF0ZSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnNldEltbWVkaWF0ZTtcbiAgICB2YXIgY2FuUG9zdCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnBvc3RNZXNzYWdlICYmIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyXG4gICAgO1xuXG4gICAgaWYgKGNhblNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGYpIHsgcmV0dXJuIHdpbmRvdy5zZXRJbW1lZGlhdGUoZikgfTtcbiAgICB9XG5cbiAgICBpZiAoY2FuUG9zdCkge1xuICAgICAgICB2YXIgcXVldWUgPSBbXTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBldi5zb3VyY2U7XG4gICAgICAgICAgICBpZiAoKHNvdXJjZSA9PT0gd2luZG93IHx8IHNvdXJjZSA9PT0gbnVsbCkgJiYgZXYuZGF0YSA9PT0gJ3Byb2Nlc3MtdGljaycpIHtcbiAgICAgICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm4gPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKGZuKTtcbiAgICAgICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSgncHJvY2Vzcy10aWNrJywgJyonKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgfTtcbn0pKCk7XG5cbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn1cblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG59KS5jYWxsKHRoaXMscmVxdWlyZShcIi9ob21lL2Rvc3RvZGFic2kvY29kZS9iYWtrL2V4cGVyaW1lbnQtdGVtcGxhdGUvbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvaW5zZXJ0LW1vZHVsZS1nbG9iYWxzL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9pbnNlcnQtbW9kdWxlLWdsb2JhbHMvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1wiLFwiLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2luc2VydC1tb2R1bGUtZ2xvYmFscy9ub2RlX21vZHVsZXMvcHJvY2Vzc1wiKSJdfQ==
