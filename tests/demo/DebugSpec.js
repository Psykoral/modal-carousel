/* global ModalCarousel */
define(['main'], function () {
	'use strict';
	var MC = new ModalCarousel();

	describe('Details{} items should be defined:', function () {
		it('MC.Details should be defined', function () {
			expect(MC.Details).toBeDefined();
		});

		it('MC.Details.init should be defined', function () {
			expect(MC.Details.init).toBeDefined();
		});

		it('MC.Details.handleSummaryOpen should be defined', function () {
			expect(MC.Details.handleSummaryOpen).toBeDefined();
		});

		it('MC.Details.detailsPolyFill should be defined', function () {
			expect(MC.Details.detailsPolyFill).toBeDefined();
		});
	});

	describe('Flickr{} items should be defined', function () {
		it('MC.Flickr should be defined', function () {
			expect(MC.Flickr).toBeDefined();
		});

		it('MC.Flickr.fetch should be defined', function () {
			expect(MC.Flickr.fetch).toBeDefined();
		});

		it('MC.Flickr.createSection should be defined', function () {
			expect(MC.Flickr.createSection).toBeDefined();
		});

		it('MC.Flickr.applySection should be defined', function () {
			expect(MC.Flickr.applySection).toBeDefined();
		});

		it('MC.Flickr.createItem should be defined', function () {
			expect(MC.Flickr.createItem).toBeDefined();
		});

		it('MC.Flickr.createDialog should be defined', function () {
			expect(MC.Flickr.createDialog).toBeDefined();
		});

		it('MC.Flickr.handleCarouselButtons should be defined', function () {
			expect(MC.Flickr.handleCarouselButtons).toBeDefined();
		});

		it('MC.Flickr.handleClicks should be defined', function () {
			expect(MC.Flickr.handleClicks).toBeDefined();
		});

		it('MC.Flickr.sortItem should be defined', function () {
			expect(MC.Flickr.sortItem).toBeDefined();
		});

		it('MC.Flickr.url should be defined', function () {
			expect(MC.Flickr.url).toBeDefined();
		});
	});
});
