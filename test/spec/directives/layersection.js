'use strict';

describe('Directive: layerSection', function () {

  // load the directive's module
  beforeEach(module('quitoClimateStudyApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<layer-section></layer-section>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the layerSection directive');
  }));
});
