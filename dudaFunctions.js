const element = document;

const dmAPI = {
	loadScript: function (source, callback) {
		var script = document.createElement('script');
		var prior = document.getElementsByTagName('script')[0];
		script.async = 1;

		script.onload = script.onreadystatechange = function (_, isAbort) {
			if (
				isAbort ||
				!script.readyState ||
				/loaded|complete/.test(script.readyState)
			) {
				script.onload = script.onreadystatechange = null;
				script = undefined;

				if (!isAbort && callback) setTimeout(callback, 0);
			}
		};

		script.src = source;
		prior.parentNode.insertBefore(script, prior);
	},
	getCurrentDeviceType: function () {
		return 'desktop';
	},
	runOnReady: function (n, func) {
		func();
	},
};

const data = {
	config: {
		usamapList: usamapListData,
	},
};
