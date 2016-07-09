/**
 * @file main.js
 * @method ModalCarousel
 * @desc Accesses the Flickr API to display a grid list of images that are clickable to launch a dialog. The dialog then has a carousel effect to quickly move through the larger images.
 * @author Jim O'Harra-Sutton
 * @since 7/06/16 10:33 AM
 *
 * @constructs ModalCarousel
 * @returns {Object} this
 */

var MC,
	ModalCarousel = function () {
	'use strict';

	var self = this;

	/**
	 * @class Details
	 * @desc Provides a polyfill for the &lt;details&gt; tag
	 *
	 * @type {Object}
	 * @memberof ModalCarousel
	 *
	 * @constructs Details
	 */
	this.Details = {
		/**
		 * @method init
		 * @desc Initializes a &lt;details&gt; polyfill
		 *
		 * @memberof ModalCarousel.Details
		 *
		 * @borrows this.detailsPolyFill()
		 */
		init: function () {
			var root = document.getElementsByTagName('body');

			if (root.length) {
				root = root[0];

				if (root) {
					this.detailsPolyFill(root.ownerDocument);
				}
			}
		},
		/**
		 * @method handleSummaryOpen
		 * @desc Collects a &lt;summary> tag and sets the closed attribute if the item is currently open
		 *
		 * @memberof ModalCarousel.Details
		 *
		 * @param e {Object} root object
		 *
		 */
		handleSummaryOpen: function (e) {
			var target = e.target,
				details;

			if (target.nodeName !== 'SUMMARY') {
				return;
			} else {
				if (e.type === 'keypress' && e.which !== 13 && e.which !== 32) {
					return;
				}
				details = target.parentNode;
				if (details.getAttribute('closed')) {
					details.removeAttribute('closed');
				} else {
					details.setAttribute('closed', 'closed');
				}
			}
		},
		/**
		 * @method detailsPolyFill
		 * @desc Collects &lt;summary&gt; tags and sets click bindings, fulfilling the polyfill
		 *
		 * @memberof ModalCarousel.Details
		 *
		 * @param doc {Object} Target element to initiate the search for &lt;summary&gt; tags
		 *
		 * @borrows this.handleSummaryOpen()
		 */
		detailsPolyFill: function (doc) {
			var summaries,
				len,
				i;

			summaries = doc.querySelectorAll('summary');
			len = summaries.length;

			for (i = 0; i < len; i++) {
				summaries[i].setAttribute('tabindex', '0');
				/**
				 * @event {summary} click
				 * @memberof ModalCarousel.Details
				 */
				summaries[i].addEventListener('click', this.handleSummaryOpen);
				/**
				 * @event {summary} keypress
				 * @memberof ModalCarousel.Details
				 */
				summaries[i].addEventListener('keypress', this.handleSummaryOpen);
			}
		}
	};

	/**
	 * @class Flickr
	 * @desc Connects to the Flickr API and processes the info
	 *
	 * @type {Object}
	 * @memberof ModalCarousel
	 *
	 * @constructs Flickr
	 */
	this.Flickr = {
		url: 'https://api.flickr.com/services/feeds/photos_public.gne?tags=nature&format=json',
		/**
		 * @method fetch
		 * @desc Sets the &lt;script&gt; tag for a JSONP-like, asynchronous Flickr API call
		 *
		 * @memberof ModalCarousel.Flickr
		 *
		 * @param url {String} ModalCarousel.Flickr.url
		 */
		fetch: function (url) {
			var api = document.createElement('script');
			api.src = url;
			api.async = true;
			api.defer = true;
			document.getElementsByTagName('body')[0].appendChild(api);
		},
		/**
		 * @method createSection
		 * @desc Creates a set of elements for a new &lt;section&gt;
		 *
		 * @memberof ModalCarousel.Flickr
		 *
		 * @returns {Object} section -> details -> summary -> article -> ul
		 */
		createSection: function () {
			return {
				section: document.createElement('section'),
				details: document.createElement('details'),
				summary: document.createElement('summary'),
				article: document.createElement('article'),
				ul: document.createElement('ul')
			};
		},
		/**
		 * @method applySection
		 * @desc Applies the DOM returned from this.createSection()
		 *
		 * @memberof ModalCarousel.Flickr
		 *
		 * @param data {Object} returned from window.jsonFlickrFeed()
		 * @borrows this.createItem()
		 * @borrows this.applyArticle()
		 */
		applySection: function (data) {
			var newSection = this.createSection(),
				title = document.createTextNode(data.title),
				closed = document.getElementById('Closed'),
				main = document.getElementsByTagName('main')[0];

			// Section & details
			newSection.summary.appendChild(title);
			newSection.details.appendChild(newSection.summary);
			newSection.section.appendChild(newSection.details);
			newSection.section.appendChild(newSection.article);
			newSection.article.appendChild(newSection.ul);
			main.appendChild(newSection.section);
			self.Details.init();
			closed.disabled = true;

			this.applyArticle(data, newSection);
		},
		/**
		 * @method applyArticle
		 * @desc loops through the API data
		 *
		 * @memberof ModalCarousel.Flickr
		 *
		 * @param data {Object} passed from this.applySection()
		 * @param newSection {Object} DOM object passed from this.applySection()
		 *
		 * @borrows this.sortItem()
		 * @borrows this.createDialog()
		 */
		applyArticle: function (data, newSection) {
			var i,
				newItem,
				item,
				itemTitle;

			for (i = 0; i < data.items.length; i++) {
				newItem = this.createItem();
				item = this.sortItem(data.items[i]);
				itemTitle = document.createTextNode(item.title || i);
				newSection.ul.appendChild(newItem.li);
				newItem.li.appendChild(newItem.figure);
				newItem.figure.appendChild(newItem.figcaption);
				newItem.figcaption.appendChild(itemTitle);
				newItem.figure.appendChild(newItem.label);
				newItem.label.setAttribute('for', i.toString());
				newItem.label.appendChild(newItem.img);
				newItem.img.src = item.img;
				newItem.img.title = item.title;
				this.createDialog(i, item, (data.items.length - 1));
			}
		},
		/**
		 * @method createItem
		 * @desc Creates a set of elements for a new &lt;section&gt;
		 *
		 * @memberof ModalCarousel.Flickr
		 *
		 * @returns {Object} li -> figure -> figcaption, label -> img
		 */
		createItem: function () {
			return {
				label: document.createElement('label'),
				img: document.createElement('img'),
				li: document.createElement('li'),
				h2: document.createElement('h2'),
				figure: document.createElement('figure'),
				figcaption: document.createElement('figcaption')
			};
		},
		/**
		 * @method createDialog
		 * @desc Puts together the DOM for a Modal dialog
		 *
		 * @memberof ModalCarousel.Flickr
		 *
		 * @param i {int} Counter, passed from this.applyArticle()
		 * @param data {Object} Flickr data sent from this.applyArticle()
		 * @param length {int} Flickr array length sent from this.applyArticle()
		 *
		 * @borrows this.handleCarouselButtons()
		 * @borrows this.handleClicks()
		 *
		 */
		createDialog: function (i, data, length) {
			var content = document.querySelector('template').content,
				input = content.querySelector('input'),
				dialog = content.querySelector('dialog'),
				aside = dialog.querySelector('aside'),
				h2 = aside.querySelector('h2'),
				div = aside.querySelector('div'),
				nav = dialog.querySelector('nav'),
				prev = nav.querySelectorAll('label')[0],
				next = nav.querySelectorAll('label')[1],
				closed = document.getElementById('Closed'),
				closeButton,
				img;

			input.id = i;
			dialog.id = 'Dialog' + i;
			h2.textContent = data.title;
			div.innerHTML = data.description.replace('_m.jpg', '_b.jpg');
			img = div.querySelector('img');
			img.removeAttribute('width');
			img.removeAttribute('height');

			this.handleCarouselButtons(i, length, next, prev);
			document.body.appendChild(document.importNode(content, true));
			closeButton = document.getElementById('Dialog' + i).querySelector('label span');

			this.handleClicks(i, closed, closeButton);
		},
		/**
		 * @method handleCarouselButtons
		 * @desc Sets the Previous and Next input items for the Carousel arrows
		 *
		 * @memberof ModalCarousel.Flickr
		 *
		 * @param i {int} Counter, passed from this.applyArticle()
		 * @param length {int} item length passed from this.applyArticle()
		 * @param next {Object} Next arrow
		 * @param prev {Object} Previous arrow
		 */
		handleCarouselButtons: function (i, length, next, prev) {
			if (i === length) {
				next.setAttribute('for', '0');
			} else {
				next.setAttribute('for', (i + 1).toString());
			}

			if (i === 0) {
				prev.setAttribute('for', length.toString());
			} else {
				prev.setAttribute('for', (i - 1).toString());
			}
		},
		/**
		 * @method handleClicks
		 * @desc Sets the &lt;dialog&gt; background as clickable to close the Dialog
		 *
		 * @memberof ModalCarousel.Flickr
		 *
		 * @param i {int} Counter, passed from this.applyArticle()
		 * @param closed {Object} #Closed &lt;input&gt; item to mark "none" selected
		 * @param closeButton {Object} (X) button in the upper right of the Dialog
		 */
		handleClicks: function (i, closed, closeButton) {
			var dialog = document.getElementById('Dialog' + i);

			/**
			 * @event {dialog->aside} click
			 * @memberof ModalCarousel.Flickr
			 */
			dialog.querySelector('aside').addEventListener('click', function (ev) {
				ev.stopPropagation();
			});

			/**
			 * @event {dialog} click
			 * @memberof ModalCarousel.Flickr
			 */
			dialog.addEventListener('click', function () {
				closed.checked = true;
				closed.disabled = true;
			});

			/**
			 * @event {closeButton} click
			 * @memberof ModalCarousel.Flickr
			 */
			closeButton.addEventListener('click', function () {
				closed.checked = true;
				closed.disabled = true;
			});
		},
		/**
		 * @method sortItem
		 * @desc Sanitizes the data sent from window.jsonFlickrFeed()
		 *
		 * @memberof ModalCarousel.Flickr
		 *
		 * @param item {int} Counter, passed from this.applyArticle()
		 * @returns sortedItem {Object} title, description & img
		 */
		sortItem: function (item) {
			var sortedItem = {
				title: item.title,
				description: item.description
			};

			if (item.media !== null && item.media.m !== null) {
				sortedItem.img = item.media.m;
			}

			return sortedItem;
		}
	};
	return this;
};

(function () {
	'use strict';

	/**
	 * @global
	 * @callback jsonFlickrFeed
	 * @desc Callback method used when the Flickr API has loaded the data
	 *
	 * @memberof window
	 *
	 * @param rsp {Object} JSON formatted response data
	 * @borrows ModalCarousel.Flickr.applySection()
	 */
	window.jsonFlickrFeed = function (rsp) {
		if (rsp.title !== '') {
			MC.Flickr.applySection(rsp);
		}
	};

	MC = new ModalCarousel();
	MC.Flickr.fetch(MC.Flickr.url);
}());
