'use strict';

var storageKey = 'VN_TRANSLATE';

// ReSharper disable once InconsistentNaming
function Translate($translate, storage, options, disableTranslations) {
	this.$translate = $translate;
//	this.$translatePartialLoader = $translatePartialLoader;
	this.storage = storage;
	this.disableTranslations = disableTranslations;
	this.configure(angular.extend(options, this.getConfig()));
//	this.addPart = $translatePartialLoader.addPart;
}

Translate.prototype.getConfig = function() {
	var storage = this.storage;
	var config = JSON.parse(storage.get(storageKey)) || {};
	var lang = storage.get('NG_TRANSLATE_LANG_KEY');
	if (!this.disableTranslations && lang && lang !== 'undefined') {
		config.lang = lang;
	}
	return config;
};

Translate.prototype.configure = function(config) {
	config = angular.extend(this.getConfig(), config);
	this.storage.set(storageKey, JSON.stringify(config));
	this.$translate.use(config.lang);
};

//Translate.prototype.addParts = function() {
//	if (this.disableTranslations) {
//		return true;
//	}
//
//	var loader = this.$translatePartialLoader;
//	angular.forEach(arguments, angular.bind(this, function(part) {
//		loader.addPart(part);
//	}));
//	return this.$translate.refresh();
//};

function TranslateProvider($translateProvider) {
	this.$translateProvider = $translateProvider;
	this.setPreferredLanguage = $translateProvider.preferredLanguage;
}

TranslateProvider.prototype.$get = [
	'$translate', 'storage',
	function($translate, storage) {
		var options = this.options;

		return new Translate($translate, storage, {
			region: options.region,
			lang: options.lang,
			country: options.country
		}, options.disableTranslations);
	}
];

TranslateProvider.prototype.configure = function(options) {
	options = angular.extend({ region: 'us', lang: 'en', country: 'us' }, options);

	this.options = options;

	if (!options.disableTranslations) {
		this.initTranslateProvider(options.lang);
	}

	if (options.lang) {
		this.setPreferredLanguage(options.lang);
	}
};

TranslateProvider.prototype.initTranslateProvider = function(lang) {
	var $translateProvider = this.$translateProvider;
//	$translateProvider.useLoader('$translatePartialLoader', {
//		urlTemplate: '/translations/{part}/{lang}.json'
//	});

//	$translateProvider.translations('en', {
//		'index': {
//			'about': 'About Us',
//			'contact': 'Contact Us',
//			'toggleNavigation': 'Toggle Navigation',
//			'promo': 'Free shipping on all orders over $99!',
//			'myCart': 'My Bag',
//			'signIn': 'Sign In',
//			'createAccount': 'Create Account',
//			'myFavorites': 'My Favorites',
//			'signUpForNewsletter': 'Sign-Up for Our Newsletter',
//			'newsletterSignUpButton': 'Go',
//			'smartNavMoreLinkText': 'More'
//		}
//	});

	$translateProvider.useStaticFilesLoader({
		prefix: '/translations/locale-',
		suffix: '.json'
	});
	if (lang === 'en') {
		//$translateProvider.useMessageFormatInterpolation();
	}
	$translateProvider.useMissingTranslationHandlerLog();
	$translateProvider.useLocalStorage();
};

angular.module('Volusion.services')
	.provider('translate', ['$translateProvider', TranslateProvider]);
