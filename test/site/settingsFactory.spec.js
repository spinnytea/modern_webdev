define([
	'angular',
	'src/site/siteModule',
], function (angular, pokedexModule) {
	return describe('Settings Factory', function () {
		var settings, $rootScope;
		var localStorageService;
		beforeEach(angular.mock.module(pokedexModule.name, function ($provide) {
			localStorageService = jasmine.createSpyObj('localStorageService', ['get', 'set', 'remove']);
			$provide.value('localStorageService', localStorageService);

			$provide.constant('po_ke_type.site.settings.defaults', {
				colorfulCards: false,
				dexGen: 6,
				theme: 'spacelab',
				preferredTypeChart: 'squares',
			});
		}));
		beforeEach(angular.mock.inject(['po_ke_type.site.settings.factory', '$rootScope', function (_settings_, _$rootScope_) {
			settings = _settings_;
			$rootScope = _$rootScope_;
		}]));

		it('init', function () {
			// if this list changes, stub a test for the new one
			// - you don't need to implement the test immediately, but at least stub it out
			expect(Object.keys(settings).sort()).toEqual([
				'availableTypeCharts',
				'colorfulCards',
				'dexGen',
				'pokedexGenerations',
				'pokedexSortOrders',
				'preferredTypeChart',
				'theme',
				'themes',
			]);

			expect(settings.theme).toBe('spacelab');
			expect(settings.preferredTypeChart).toBe('squares');
			expect(settings.dexGen).toBe(6);
			expect(settings.colorfulCards).toBe(false);

			expect(localStorageService.get).toHaveBeenCalledTimes(4);
			expect(localStorageService.get).toHaveBeenCalledWith('theme');
			expect(localStorageService.get).toHaveBeenCalledWith('preferredTypeChart');
			expect(localStorageService.get).toHaveBeenCalledWith('dexGen');
			expect(localStorageService.get).toHaveBeenCalledWith('colorfulCards');

			expect(settings.themes.length).toBe(19);
			expect(settings.availableTypeCharts.length).toBe(3);
			expect(settings.pokedexGenerations.length).toBe(6);
		});

		it('restore defaults', function () {
			settings.theme = 1;
			settings.dexGen = 2;

			// delete something else
			$rootScope.$broadcast('LocalStorageModule.notification.removeitem', { key: 'not in settings' });
			$rootScope.$digest();
			expect(settings).toEqual(jasmine.objectContaining({
				theme: 1,
				preferredTypeChart: 'squares',
				dexGen: 2,
				colorfulCards: false,
			}));
			expect(localStorageService.remove).not.toHaveBeenCalledWith('theme');
			expect(localStorageService.remove).not.toHaveBeenCalledWith('dexGen');
			expect(localStorageService.set).toHaveBeenCalledWith('dexGen', 2);

			// delete
			$rootScope.$broadcast('LocalStorageModule.notification.removeitem', { key: 'theme' });
			$rootScope.$digest();
			expect(settings).toEqual(jasmine.objectContaining({
				theme: 'spacelab',
				preferredTypeChart: 'squares',
				dexGen: 2,
				colorfulCards: false,
			}));
			expect(localStorageService.remove).toHaveBeenCalledWith('theme');
			expect(localStorageService.remove).not.toHaveBeenCalledWith('dexGen');
		});
	}); // end Settings Factory
});