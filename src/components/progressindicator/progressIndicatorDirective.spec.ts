import * as angular from 'angular';

describe('progressIndicatorDirective: <uif-progress-indicator />', () => {
  let element: JQuery;
  let scope: angular.IScope;

  beforeEach(() => {
    angular.mock.module('officeuifabric.core');
    angular.mock.module('officeuifabric.components.progressindicator');
  });

  beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function) => {
    element =
      angular.element('<uif-progress-indicator uif-name="MyFile.docx" uif-description="This is a sample." uif-percent-complete="65">' +
        '</uif-progress-indicator>');
    scope = $rootScope;
    $compile(element)(scope);
    scope.$digest();
    // fix for jQuery in tests
    element = jQuery(element[0]);
  }));

  /**
   * Verifies directive generates the correct HTML element.
   */
  it('should render correct HTML', () => {
    // get the rendered progress indicator element
    let progressIndicatorElement: JQuery = element.find('div');

    // make sure found the progress indicator
    expect(progressIndicatorElement.length).toBe(6);
  });

  /**
   * Verifies directive generates the correct CSS classes.
   */
  it('should render correct Office UI Fabric CSS classes', () => {
    // get the rendered overlay element
    let progressIndicatorElement: JQuery = element.find('div');

    // ensure overlay has the correct classes
    expect(progressIndicatorElement.eq(0)).toHaveClass('ms-ProgressIndicator');
  });

  /**
   * Verifies directive is setting the name.
   */
  it('should be able to set name', () => {
    // get the rendered overlay element
    let progressIndicatorNameElement: JQuery = element.find('div.ms-ProgressIndicator-itemName');

    // ensure overlay has the correct classes
    expect(progressIndicatorNameElement.eq(0)).toContainText('MyFile.docx');
  });

  /**
   * Verifies directive is setting the description.
   */
  it('should be able to set description', () => {
    // get the rendered overlay element
    let progressIndicatorDescriptionElement: JQuery = element.find('div.ms-ProgressIndicator-itemDescription');

    // ensure overlay has the correct classes
    expect(progressIndicatorDescriptionElement.eq(0)).toContainText('This is a sample.');
  });

  /**
   * Verifies directive is setting the percent complete.
   */
  it('should be able to set the percent complete', () => {
    // get the rendered overlay element
    let progressIndicatorProgressBarElement: JQuery = element.find('div.ms-ProgressIndicator-itemProgress ' +
      'div.ms-ProgressIndicator-progressBar');

    // ensure overlay has the correct classes
    expect(progressIndicatorProgressBarElement.eq(0)).toHaveCss({ width: '65%' });
  });

  /**
   * Verifies directive is setting keeping the percent complete within range (0..100).
   */
  it('should not go below range on percent complete (e.g. < 0)', inject(($compile: Function) => {
    // get the rendered overlay element
    let progressIndicator: JQuery = $compile('<uif-progress-indicator uif-percent-complete="-1"></uif-progress-indicator>')(scope);
    progressIndicator = jQuery(progressIndicator[0]);
    scope.$apply();
    let progressIndicatorProgressBarElement: JQuery = progressIndicator.find('div.ms-ProgressIndicator-itemProgress ' +
      'div.ms-ProgressIndicator-progressBar');

    // ensure overlay has the correct classes
    expect(progressIndicatorProgressBarElement.eq(0)).toHaveCss({ width: '0%' });
  }));

  /**
   * Verifies directive is setting keeping the percent complete within range (0..100).
   */
  it('should not go above range on percent complete (e.g. > 0)', inject(($compile: Function) => {
    // get the rendered overlay element
    let progressIndicator: JQuery = $compile('<uif-progress-indicator uif-percent-complete="1000"></uif-progress-indicator>')(scope);
    progressIndicator = jQuery(progressIndicator[0]);
    scope.$apply();
    let progressIndicatorProgressBarElement: JQuery = progressIndicator.find('div.ms-ProgressIndicator-itemProgress ' +
      'div.ms-ProgressIndicator-progressBar');

    // ensure overlay has the correct classes
    expect(progressIndicatorProgressBarElement.eq(0)).toHaveCss({ width: '100%' });
  }));

});
