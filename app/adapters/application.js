/* global Cookies */

import JsonApiAdapter from 'ember-json-api/json-api-adapter';

export default JsonApiAdapter.extend({
  
  host: 'http://api.fumcpensacola.com',
  namespace: 'api/v3',

  headers: function () {
    return {
      token: Cookies.get('token')
    };
  }.property().volatile()

});
