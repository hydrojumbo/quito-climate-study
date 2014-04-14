'use strict';

describe('Service: Layerattribute', function () {

  // load the service's module
  beforeEach(module('quitoClimateStudyApp'));

  // instantiate service
  var Layerattribute;
  beforeEach(inject(function (_Layerattribute_) {
    Layerattribute = _Layerattribute_;
  }));

  it('should do something', function () {
    expect(!!Layerattribute).toBe(true);
  });

});
