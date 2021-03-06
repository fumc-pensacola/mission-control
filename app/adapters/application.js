/* global Cookies */

import DS from 'ember-data';
import config from '../config/environment';

export default DS.JSONAPIAdapter.extend({
  
  host: config.host,
  namespace: config.namespace,

  headers: function () {
    return {
      token: Cookies.get('token')
    };
  }.property().volatile()

});
