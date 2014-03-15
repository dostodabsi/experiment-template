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
