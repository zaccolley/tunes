var baudio = require('baudio');
var tau = 2 * Math.PI;

var melody1 = [1, 1, 0, 1, 2/3, 2/3, 1/4].map(function(x){
	return Math.pow(2, x);
});

var melody2 = [0, 0, 1, 0].map(function(x){
	return Math.pow(2, x);
});

var b = baudio(function (t) {
	var rand = Math.random()*4;
	var m = t % 2 > 1
			 	? melody1[Math.floor(t * 4 % melody1.length)]
			 	: melody2[Math.floor(t * rand % melody2.length)];

	var tune = t % 4 > 2
				? t % 2 > 1 
					? sin(100 * m) + sin(200 * m) + sin(300 * m) + sin(400 * m)
					: sin(100 * m) + sin(400 * m) + sin(300 * m)
				: sin(75 * m);

	var tune2 = t % 2 > 1
					? sin(100 * m*5) * (sin(95) + sin(100))
					: sin( sin(100 * m*5) * (sin(95) + sin(100)) );

	var drum2 = t % 2 > 1
					? Math.min(.05, Math.random()*2 * sin(2))
					: Math.random()*2 * sin(2);
	
	return (tune + tune2 + drum2)/2;

	function sin(freq){
		return Math.sin(tau * t * freq);
	}

});
b.play();
