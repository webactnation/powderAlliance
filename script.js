/*  * Custom Interacative Map
* Feb 24, 2023
* Version 1.0.0

*Upon purchase of this widget, you acquire the right to use it; you're not actually 
acquiring the widget itself.TheCamel.co is the owner of the intellectual property of this widget.
The widget is for use only, it is not to be on sold, lent, rented, given away, gifted you can’t 
even put it in your will. It is for use for your sites only on the duda dashboard we install the item in.

*Kindly refer to our Terms and Conditions for more info - http://www.thecamel.co/terms-and-conditions

*/

let usamapList = data.config.usamapList;

console.log(usamapList);

// $(element).find( ".map-img-con i" ).click(function() {
$(element)
	.find('.countryBox')
	.click(function () {
		let mapData = $(this).attr('data-map');
		console.log(mapData, 'mapData');

		if (mapData === 'usa') {
			$(element).find('.worldmap-wrapper').addClass('hideMap');
			$(element).find('.mapwrapper').removeClass('showmap');
			$(element).find('.usa-map-wrapper').addClass('showmap');
		}
		if (mapData === 'canada') {
			$(element).find('.worldmap-wrapper').addClass('hideMap');
			$(element).find('.mapwrapper').removeClass('showmap');
			$(element).find('.canada-map-wrapper').addClass('showmap');
		}
		if (mapData === 'japan') {
			$(element).find('.worldmap-wrapper').addClass('hideMap');
			$(element).find('.mapwrapper').removeClass('showmap');
			$(element).find('.japan-map-wrapper').addClass('showmap');
		}
		if (mapData === 'new-zealand') {
			$('.worldmap-wrapper').addClass('hideMap');
			$('.mapwrapper').removeClass('showmap');
			$('.newZealand-map-wrapper').addClass('showmap');
		}
	});

$(element)
	.find('.back')
	.click(function () {
		$(element).find('.worldmap-wrapper').removeClass('hideMap');
		$(element).find('.mapwrapper').removeClass('showmap');
	});

dmAPI.runOnReady('init', function () {
	console.log(usamapList, 'usamapList');

	let mapUsa = usamapList.filter(function (u) {
		return u.Country === 'usa';
	});
	let mapCanada = usamapList.filter(function (u) {
		return u.Country === 'canada';
	});
	let mapJapan = usamapList.filter(function (u) {
		return u.Country === 'japan';
	});
	let mapNewZealand = usamapList.filter(function (u) {
		return u.Country === 'new zealand';
	});

	mapUsa.map(function (a) {
		let s = createBox(a);
		$(element).find('.usa-map-wrapper .img').after(s);
	});
	mapCanada.map(function (a) {
		let s = createBox(a);
		$(element).find('.canada-map-wrapper .img').after(s);
	});
	mapJapan.map(function (a) {
		let s = createBox(a);
		$(element).find('.japan-map-wrapper .img').after(s);
	});
	mapNewZealand.map(function (a) {
		let s = createBox(a);
		$(element).find('.newZealand-map-wrapper .img').after(s);
	});

	//fade animation
	// $(element)
	// 	.find('.countryBox, .resHotpot')
	// 	.chainFade({
	// 		startAt: 0,
	// 		interval: 700,
	// 		speed: 700,
	// 		fx: 'fade',
	// 		distance: 50,
	// 		direction: 'forward',
	// 		toThe: 'bottom',
	// 		fixedHeight: false,
	// 		messages: false,
	// 		queue: true,
	// 		ease: 'swing',
	// 		after: function () {},
	// 	});
});

//CREATE JOB GRID LAYOUT
function createBox(a) {
	let itemLink = window.location.href.includes(data.siteId)
		? `/site/${data.siteId}${a.page_item_url}?preview=true&nee=true&showOriginal=true&dm_checkSync=1&dm_try_mode=true&dm_device=${data.device}`
		: a.page_item_url;
	if (typeof a.page_item_url == 'object') {
		itemLink = a.page_item_url.href;
	}
	let j = `<div class="resHotpot hspot-1" style="top: ${a.Top}; left: ${a.Left};">
            <a href="${itemLink}">
                <img src="${a.Logo}" alt="${a.Resort}">
            </a>
        </div>`;
	return j;
}

//CREATE FONT AWESOME LINK SOURCE
const cssId = 'fontAwesomeSource';
if (!document.getElementById(cssId)) {
	var head = document.getElementsByTagName('head')[0];
	var link = document.createElement('link');
	link.id = 'fontAwesomeSource';
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = 'https://use.fontawesome.com/releases/v6.2.0/css/all.css';
	link.crossOrigin = 'anonymous';
	head.appendChild(link);
}

dmAPI.loadScript(
	'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js',
	() => {
		let worldMap = element
			.querySelector('.worldmap-wrapper')
			.querySelector('img');
		let usMap = element
			.querySelector('.usa-map-wrapper')
			.querySelector('img');
		let canadaMap = element
			.querySelector('.canada-map-wrapper')
			.querySelector('img');
		let japanMap = element
			.querySelector('.japan-map-wrapper')
			.querySelector('img');
		let newZealandMap = element
			.querySelector('.newZealand-map-wrapper')
			.querySelector('img');

        // let allResHotspot = element.querySelectorAll('.resHotpot')


		$(document).ready(function () {
			var request = null;
			var mouse = { x: 0, y: 0 };
			var cx = window.innerWidth ;
			var cy = window.innerHeight ;

			$('.dudaContainer').mousemove(function (event) {
				mouse.x = event.pageX;
				mouse.y = event.pageY;

				cancelAnimationFrame(request);
				request = requestAnimationFrame(update);
			});

			function update() {
				dx = mouse.x - cx;
				dy = mouse.y - cy;

				tiltx = dy / cy;
				tilty = -(dx / cx);
				radius = Math.sqrt(Math.pow(tiltx, 2) + Math.pow(tilty, 2));
				degree = radius * 20;
				TweenLite.to(worldMap, 1, {
					transform:
						'rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)',
					ease: Power2.easeOut,
				});
				TweenLite.to(usMap, 1, {
					transform:
						'rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)',
					ease: Power2.easeOut,
				});
				TweenLite.to(canadaMap, 1, {
					transform:
						'rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)',
					ease: Power2.easeOut,
				});
				TweenLite.to(japanMap, 1, {
					transform:
						'rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)',
					ease: Power2.easeOut,
				});
				TweenLite.to(newZealandMap, 1, {
					transform:
						'rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)',
					ease: Power2.easeOut,
				});
                // allResHotspot.forEach(v => {
                //     TweenLite.to(v, 1, {
                //         transform:
                //             'rotate3d(' + tiltx + ', ' + tilty + ', 0, ' + degree + 'deg)',
                //         ease: Power2.easeOut,
                //     });
                // })
			}

			$(window).resize(function () {
				cx = window.innerWidth / 2;
				cy = window.innerHeight / 2;
			});
		});
	}
);

function fitOnScreen() {
	dudaContainer = element.querySelector('.dudaContainer');
	widgetContainer = element.querySelector(
		'.customInteractiveMap-Main-Container'
	);
	let widgetHeight = widgetContainer.offsetHeight;
	let containerHeight = dudaContainer.offsetHeight;

	console.log('widgetHeight:', widgetHeight);
	console.log('availHeight:', window.screen.availHeight);

	// console.log(widgetHeight > window.screen.availHeight)

	if (widgetHeight > window.screen.availHeight) {
		dudaContainer.classList.add('dudaContainerFit');
	} else {
		dudaContainer.classList.remove('dudaContainerFit');
	}
}

fitOnScreen();
window.addEventListener('resize', () => {
	fitOnScreen();
});
