Lollipop.Module('cookie', function() {
	function setCookie(cookie, value) {
		document.cookie = cookie + '=' + value;
	}

	function getCookie(cookie) {
		var matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : void 0;
	}

	var str = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0987654321';

	if(getCookie('_id') !== void 0) {
		var id = '', len = 30;
		while(len--) {
			id += str[Math.floor(Math.random()*62)];
		}
		setCookie('_id', id);
	}
});