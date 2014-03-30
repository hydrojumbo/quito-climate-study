'use strict';

describe('Service: Titleservice', function () {

  // load the service's module
  beforeEach(module('quitoClimateStudyApp'));

  // instantiate service
  var Titleservice;
  beforeEach(inject(function (_Titleservice_) {
    Titleservice = _Titleservice_;
  }));

  it('should do something', function () {
    expect(!!Titleservice).toBe(true);
  });

});
