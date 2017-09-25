
var CONST_EVENT_NAME = require('modules/monitoring/CONST_EVENT_NAME/index.es');
var CONST_DOM_TYPE = require('modules/monitoring/CONST_DOM_TYPE/index.es');
var CONST_EVENT_NAME = require('./CONST_EVENT_NAME/index.es');
var EventEmitter = require('modules/lib/EventEmitter/EventEmitter.js');
var eventEmitter = new EventEmitter();
require('util/template/template').template;
import {guid, uuid} from 'modules/util/guid/guid';

module.exports = {
    CONST_EVENT_NAME: CONST_EVENT_NAME,
    CONST_DOM_TYPE:CONST_DOM_TYPE,
    eventEmitter: eventEmitter,
    guid: guid,
    uuid: uuid
};
