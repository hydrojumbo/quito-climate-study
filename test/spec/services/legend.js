'use strict';

describe('Service: Legend', function () {

  // load the service's module
  beforeEach(module('quitoClimateStudyApp'));

  // instantiate service
  var Legend;
  beforeEach(inject(function (_Legend_) {
    Legend = _Legend_;
  }));

  it('should do something', function () {
    expect(!!Legend).toBe(true);
  });

});
