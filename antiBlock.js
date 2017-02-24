(function() {

	function getValueOfCssProperty(element, cssProperty) {
		if (element != undefined && element != null) {
			var allCssProperties = getComputedStyle(element);

			return allCssProperties.getPropertyValue(cssProperty);
		}
	}

	function getElementsWidthGreaterZindex(elements) {
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

		return frontElements;
	}

	function getElementsWithBackgroundOpacity(elements) {
		var frontElements = [];

		for (var i = 0; i < elements.length; i++) {
			var opacity = getValueOfCssProperty(elements[i], "opacity");
			var width = getValueOfCssProperty(elements[i], "width");
			var height = getValueOfCssProperty(elements[i], "height");

			if (opacity != undefined && opacity != null && opacity.length && !isNaN(opacity) && opacity < 1 && opacity > 0) {

				if (width != undefined && width != null && width.length && width === "100%") {
 					
 					if (height != undefined && height != null && height.length && height === "100%") {
 						frontElements.push(elements[i]);
					}

				}
			}
		}

		return frontElements;
	}

	function getElementsModalOrDialog(elements) {
		var frontElements = [];

		for (var i = 0; i < elements.length; i++) {
			var cssClasses = elements[i].getAttribute("class");

			if (cssClasses != null) {

				cssClasses = cssClasses.toLowerCase();

				if (cssClasses.includes("modal") || cssClasses.includes("dialog"))
					frontElements.push(elements[i]);

			}

		}

		return frontElements;
	}

	function classicUnlock(elements) {
		var frontElements = getElementsModalOrDialog(elements);
		frontElements = frontElements.concat(getElementsWithBackgroundOpacity(elements));

		return frontElements;
	}

	function deepUnlock(elements) {
		var frontElements = classicUnlock(elements);
		frontElements = frontElements.concat(getElementsWidthGreaterZindex(elements));

		return frontElements;
	}

	function unlock(unlockType) {
		if (unlockType != undefined && unlockType != null) {
			var elements = document.getElementsByTagName('div');
			var frontElements = [];

			unlockType = unlockType.toLowerCase();

			switch(unlockType) {
				case 'c':
					frontElements = classicUnlock(elements);
					break;

				case 'd':
					frontElements = classicUnlock(elements);
					frontElements = deepUnlock(elements);
					break;

				default:
					break;
			}

			frontElements.forEach(function(currentValue, index) {
				currentValue.style.display = "none";
			});			
		}

	}
	
}());