(function() {

	function getValueOfCssProperty(element, cssProperty) {
		if (element != undefined && element != null) {
			var allCssProperties = getComputedStyle(element);

			return allCssProperties.getPropertyValue(cssProperty);
		}
	}

	function unlock() {
		var elements = document.getElementsByTagName('div');
		var frontElements = [];

		for (var i = 0; i < elements.length; i++) {
			var zindex = getValueOfCssProperty(elements[i], "z-index");
			var lastZindex = getValueOfCssProperty(frontElements[frontElements.length - 1], "z-index");
			var push = false;

			if (zindex != undefined && zindex != null && zindex.length && !isNaN(zindex)) {

				if (lastZindex == undefined || lastZindex == null || !lastZindex.length && isNaN(lastZindex)) {
					push = true;
				}
				else {
					if (zindex >= lastZindex) {
						if (zindex > lastZindex) frontElements.length = 0;
						push = true;
					}
				}

			}

			if (push) frontElements.push(elements[i]);

		}


		frontElements.forEach(function(currentValue, index) {
			currentValue.style.display = "none";
		});
	}

	window.onload = function() {
		unlock();
	}
	
}());