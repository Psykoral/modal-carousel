/**
 * @file Flippydisk Modal Carousel
 * @author Jim O'Harra-Sutton
 */

(function () {
	'use strict';

	var Flickr = {
		url: 'https://api.flickr.com/services/feeds/photos_public.gne?tags=nature&format=json',
		main: document.getElementsByTagName('main')[0],
		fetch: function (url) {
			var api = document.createElement('script');
			api.src = url;
			api.async = true;
			api.defer = true;
			document.getElementsByTagName('body')[0].appendChild(api);
		},
		createSection: function () {
			return {
				section: document.createElement('section'),
				details: document.createElement('details'),
				summary: document.createElement('summary'),
				article: document.createElement('article'),
				ul: document.createElement('ul')
			};
		},
		applySection: function (data) {
			var newSection = this.createSection(),
				title = document.createTextNode(data.title),
				i,
				newItem,
				item,
				itemTitle;

			// Section & details
			newSection.summary.appendChild(title);
			newSection.details.appendChild(newSection.summary);
			newSection.section.appendChild(newSection.details);
			newSection.section.appendChild(newSection.article);
			newSection.article.appendChild(newSection.ul);
			this.main.appendChild(newSection.section);

			// Article
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
			closed.disabled = false;
			document.body.appendChild(document.importNode(content, true));
			closeButton = document.getElementById('Dialog' + i).querySelector('label span');

			this.handleClicks(i, closed, closeButton);
		},
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
		handleClicks: function (i, closed, closeButton) {
			document.getElementById('Dialog' + i).querySelector('aside').addEventListener('click', function (ev) {
				ev.stopPropagation();
			});

			document.getElementById('Dialog' + i).addEventListener('click', function () {
				closed.checked = true;
				closed.disabled = true;
			});

			closeButton.addEventListener('click', function () {
				closed.checked = true;
				closed.disabled = true;
			});
		},
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

	window.jsonFlickrFeed = function (rsp) {
		if (rsp.title !== '') {
			Flickr.applySection(rsp);
		}
	};

	Flickr.fetch(Flickr.url);
})();
