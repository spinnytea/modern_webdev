define([
	'angular',
	'lodash',
	'bluebird',
	'src/site/siteModule',
	'test/pokedex/pokedexFactory.mock',

	'json!test/test resources/save_1_0.json',
	'json!test/test resources/save_1_1.json',
], function (angular, _, Promise, siteModule, pokedexFactoryMock,
	json_save_1_0, json_save_1_1) {
	return describe('Site IO Factory', function () {
		var fileIOFactory, settingsFactory, teamFactory, pokedexFactory;
		var siteIO;
		beforeEach(angular.mock.module(siteModule.name, function ($provide) {
			fileIOFactory = jasmine.createSpyObj('fileIO', ['uploadJson', 'downloadJson']);
			settingsFactory = {
				colorfulCards: true,
				someOtherSetting: 'usually ignored',
			};
			teamFactory = [
				_.clone(pokedexFactoryMock.list.Bulbasaur),
			];
			pokedexFactory = {
				list: [
					_.clone(pokedexFactoryMock.list.Bulbasaur),
					_.clone(pokedexFactoryMock.list.Charmander),
					_.clone(pokedexFactoryMock.list.Squirtle),
					_.clone(pokedexFactoryMock.list.Pikachu),
				],
			};
			$provide.value('po_ke_type.utils.fileIO.factory', fileIOFactory);
			$provide.value('po_ke_type.site.settings.factory', settingsFactory);
			$provide.value('po_ke_type.pokedex.team.factory', teamFactory);
			$provide.value('po_ke_type.pokedex.factory', pokedexFactory);
		}));
		beforeEach(angular.mock.inject(['po_ke_type.site.siteIO.factory', function (_siteIO_) {
			siteIO = _siteIO_;
		}]));

		function setupSpies() {
			// spy on ALL the unit methods (spies are removed after each test)
			spyOn(siteIO.units, 'load_1');
			spyOn(siteIO.units, 'save_1_0');
			spyOn(siteIO.units, 'save_1_1');
		}

		it('init', function () {
			// if this list changes, stub a test for the new one
			// - you don't need to implement the test immediately, but at least stub it out
			expect(Object.keys(siteIO).sort()).toEqual(['load', 'save']);
			expect(Object.keys(siteIO.units).sort()).toEqual(['load_1', 'save_1_0', 'save_1_1']);
		});

		describe('save', function () {
			describe('integration', function () {
				beforeEach(setupSpies);

				it('call save_1_1', function () {
					siteIO.units.save_1_1.and.returnValue('integration test');
					expect(siteIO.units.save_1_1).not.toHaveBeenCalled();
					expect(fileIOFactory.downloadJson).not.toHaveBeenCalled();

					siteIO.save();

					expect(siteIO.units.save_1_1).toHaveBeenCalled();
					expect(fileIOFactory.downloadJson).toHaveBeenCalledWith('poketypeSettings', 'integration test');
					expect(siteIO.units.load_1).not.toHaveBeenCalled();
					expect(siteIO.units.save_1_0).not.toHaveBeenCalled();
				});
			}); // end integration

			describe('all', function () {
				it('save_1_0', function () {
					var data = siteIO.units.save_1_0();
					expect(Object.keys(data).sort()).toEqual(['date', 'settings', 'team', 'version']);
					expect(data.version).toBe('1.0');
					expect(data.date).toEqual(jasmine.any(String));
					expect(data.settings).toBe(null);
					expect(data.team).toBe(null);
				});

				it('save_1_1', function () {
					var data = siteIO.units.save_1_1();
					expect(Object.keys(data).sort()).toEqual(['date', 'settings', 'team', 'version']);
					expect(data.version).toBe('1.1');
					expect(data.date).toEqual(jasmine.any(String));
					expect(data.settings).toEqual(jasmine.any(Object));
					expect(data.settings).toEqual({
						colorfulCards: true,
					});
					expect(data.team).toEqual(jasmine.any(Array));
					expect(data.team).toEqual([
						{ name: 'Bulbasaur', specialname: '' },
					]);
				});
			}); // end all
		}); // end save

		describe('load', function () {
			describe('integration', function () {
				var data;
				beforeEach(setupSpies);
				beforeEach(function () {
					data = {
						version: '1.1',
						date: '1970-01-01T00:00:00.000Z',
					};
					fileIOFactory.uploadJson.and.returnValue(Promise.resolve(data));
				});

				it('no version', function () {
					delete data.version;
					expect(fileIOFactory.uploadJson).not.toHaveBeenCalled();

					return siteIO.load().then(function () {
						throw new Error('should fail');
					}, function (error) {
						expect(fileIOFactory.uploadJson).toHaveBeenCalled();
						expect(error).toEqual(new Error('no version'));
					});
				});

				it('invalid version format', function () {
					data.version = 'banana';
					expect(fileIOFactory.uploadJson).not.toHaveBeenCalled();

					return siteIO.load().then(function () {
						throw new Error('should fail');
					}, function (error) {
						expect(fileIOFactory.uploadJson).toHaveBeenCalled();
						expect(error).toEqual(new Error('invalid date format'));
					});
				});

				it('invalid version', function () {
					data.version = '9001.1';
					expect(fileIOFactory.uploadJson).not.toHaveBeenCalled();

					return siteIO.load().then(function () {
						throw new Error('should fail');
					}, function (error) {
						expect(fileIOFactory.uploadJson).toHaveBeenCalled();
						expect(error).toEqual(new Error('cannot load file, unknown version 9001.1'));
					});
				});

				it('no date', function () {
					delete data.date;
					expect(fileIOFactory.uploadJson).not.toHaveBeenCalled();

					return siteIO.load().then(function () {
						throw new Error('should fail');
					}, function (error) {
						expect(fileIOFactory.uploadJson).toHaveBeenCalled();
						expect(error).toEqual(new Error('no date'));
					});
				});

				it('invalid date');

				it('call load_1', function () {
					expect(fileIOFactory.uploadJson).not.toHaveBeenCalled();

					return siteIO.load().then(function () {
						expect(fileIOFactory.uploadJson).toHaveBeenCalled();
					}, function () {
						throw new Error('should pass');
					});
				});
			}); // end integration

			describe('all', function () {
				describe('load_1', function () {
					it('save_1_0', function () {
						siteIO.units.load_1(json_save_1_0);
						// TEST check something
					});

					it('save_1_1', function () {
						siteIO.units.load_1(json_save_1_1);
						// TEST check something
					});
				}); // end load_1
			}); // end all
		}); // end load
	}); // end Site IO Factory
});