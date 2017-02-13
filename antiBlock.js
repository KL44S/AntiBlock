var elements = document.getElementsByTagName('div');
var frontElements = [];

for (var i = 0; i < elements.length; i++) {
	var zindex = $(elements[i]).css("z-index");
	var lastZindex = $(frontElements[frontElements.length - 1]).css("z-index");
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