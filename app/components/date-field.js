/* global moment, Pikaday */

import Ember from 'ember';

export default Ember.TextField.extend({
  picker: null,
  differenceWhenFormatted: 0,

  init: function() {
    this._super();
    let date = moment(this.get('date'));
    if (date && date.isValid()) {
      this.differenceWhenFormatted = moment.tz(new Date(date.format('L')), 'America/Chicago') - date;
    }
  },

  updateValue: function () {
    var date = moment(this.get('date'));
    if (this.element && date.isValid() && !this.$().is(':focus')) {
      this.set('value', date.format('L'));
      this.get('picker').setDate(date.format('L'));
    }
  }.observes('date'),

  updateDate: function () {
    var date = moment.tz(new Date(this.get('value')), 'America/Chicago');
    if (date.isValid()) {
      this.set('date', new Date(date - this.differenceWhenFormatted));
    } else {
      this.set('date', null);
    }
  }.observes('value'),

  didInsertElement: function () {
    var picker = new Pikaday({
      field: this.$()[0],
      format: 'MM/DD/YYYY'
    });
    this.set('picker', picker);
    Ember.run.scheduleOnce('afterRender', this, 'updateValue');
  },

  willDestroyElement: function (){
    var picker = this.get('picker');
    if (picker) {
      picker.destroy();
    }
    this.set('picker', null);
  }
});
