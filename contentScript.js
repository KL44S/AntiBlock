var srciptElement = document.createElement('script');
srciptElement.src = chrome.extension.getURL('antiBlock.js');

(document.head||document.documentElement).appendChild(srciptElement);

srciptElement.onload = function() {
    srciptElement.parentNode.removeChild(srciptElement);
};