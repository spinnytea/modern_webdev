define([
	'angular',
	'src/utils/utilsModule',
	'angular-mocks',
], function (angular, utilsModule) {
	return describe('Tours Factory', function () {
		var tours, Tour;
		beforeEach(angular.mock.module(utilsModule.name));
		beforeEach(angular.mock.inject(['po_ke_type.utils.tours.factory', 'Tour', function (_tours_, _Tour_) {
			tours = _tours_;
			Tour = _Tour_;
		}]));

		it('init', function () {
			// NOTE if this list changes, stub a test for the new one
			// - you don't need to implement the test immediately, but at least stub it out
			expect(Object.keys(tours)).toEqual(['register', 'start']);
		});

		describe('register', function () {
			describe('valid', function () {
				beforeEach(function () {
					expect(Tour.init).toHaveBeenCalledTimes(0);
				});
				afterEach(function () {
					expect(Tour.init).toHaveBeenCalledTimes(1);
				});

				it('without path', function () {
					tours.register({
						name: 'specTourWithoutPath',
						steps: [{
							element: '#elem1',
							placement: 'top',
							content: 'Content 1',
						}, {
							element: '#elem2',
							placement: 'top',
							content: 'Content 2',
						}],
					});
				});

				it('with path', function () {
					tours.register({
						name: 'specTourWithPath',
						steps: [{
							path: '/one',
							element: '#elem1',
							placement: 'top',
							content: 'Content 1',
						}, {
							path: '/two',
							element: '#elem2',
							placement: 'top',
							content: 'Content 2',
						}],
					});
				});

				it('orphan', function () {
					tours.register({
						name: 'specTourOrhanDemo',
						steps: [{
							orphan: true,
							content: 'Content 1',
						}, {
							orphan: true,
							content: 'Content 2',
						}],
					});
				});

				describe('overwrite title', function () {
					it('as undefined');

					it('as string');
				});
			}); // end valid

			describe('errors', function () {
				var config; // initially valied, each test will break it
				beforeEach(function () {
					config = {
						name: 'exampleErrorTour',
						title: 'Example',
						steps: [{
							element: '#elem1',
							placement: 'top',
							content: 'Content 1',
						}, {
							element: '#elem2',
							placement: 'top',
							content: 'Content 2',
						}],
					};
				});
				function registerTour() {
					tours.register(config);
				}

				it('no config', function () {
					config = undefined;
					expect(registerTour).toThrow(new Error('config must be present'));
				});

				it('missing name', function () {
					delete config.name;
					expect(registerTour).toThrow(new Error('tours must have a name'));
				});

				it('invalid name', function () {
					config.name = 'wish we could use spaces...';
					expect(registerTour).toThrow(new Error('tour names must be alphanumeric'));
				});

				it('invalid title', function () {
					config.title = 3;
					expect(registerTour).toThrow(new Error('tour titles must be a string'));
				});

				it('no steps', function () {
					delete config.steps;
					expect(registerTour).toThrow(new Error('tours must have steps'));
				});

				it('empty steps', function () {
					config.steps.splice(0);
					expect(registerTour).toThrow(new Error('tours must have at least one step'));
				});

				it('mismatched paths between steps', function () {
					config.steps[0].path = '/';
					expect(registerTour).toThrow(new Error('either no steps can use path, or all steps use path, there isn\'t an in between'));
				});

				describe('bad path format', function () {
					it('leading hash', function () {
						config.steps.forEach(function (step) { step.path = '#/'; });
						expect(registerTour).toThrow(new Error('no need to prefix paths with #, that is automatic'));
					});

					it('leading slash hash', function () {
						config.steps.forEach(function (step) { step.path = '/#/'; });
						expect(registerTour).toThrow(new Error('no need to prefix paths with /#, that is automatic'));
					});
				}); // end bad path format

				it('missing element', function () {
					delete config.steps[0].element;
					expect(registerTour).toThrow(new Error('each step must have an element'));
				});

				it('missing placement', function () {
					delete config.steps[0].placement;
					expect(registerTour).toThrow(new Error('each step must have a placement'));
				});

				it('invalid placement', function () {
					config.steps[0].placement = 'banana';
					expect(registerTour).toThrow(new Error('incorrect placement'));
				});

				it('missing content', function () {
					delete config.steps[0].content;
					expect(registerTour).toThrow(new Error('each step must have content'));
				});

				describe('bad orphan config', function () {
					it('has element', function () {
						config.steps[0].orphan = true;
						delete config.steps[0].placement;
						expect(registerTour).toThrow(new Error("orphaned steps don't need an element"));
					});

					it('has placement', function () {
						config.steps[0].orphan = true;
						delete config.steps[0].element;
						expect(registerTour).toThrow(new Error("orphaned steps don't need a placement"));
					});
				}); // end bad orphan config
			}); // end errors
		}); // end register

		describe('start', function () {
			beforeEach(function () {
				tours.register({
					name: 'specTourStart',
					steps: [{
						element: '#elem1',
						placement: 'top',
						content: 'Content 1',
					}, {
						element: '#elem2',
						placement: 'top',
						content: 'Content 2',
					}],
				});
			});

			it('not a tour', function () {
				expect(Tour.restart).not.toHaveBeenCalled();

				tours.start('notATour');

				expect(Tour.restart).not.toHaveBeenCalled();
			});

			it('is a tour', function () {
				expect(Tour.restart).not.toHaveBeenCalled();

				tours.start('specTourStart');

				expect(Tour.restart).toHaveBeenCalled();
			});
		}); // end start
	}); // end Tours Factory
});