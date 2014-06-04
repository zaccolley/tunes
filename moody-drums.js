var baudio = require('baudio');
var tau = 2 * Math.PI;

var melody = [0, 1/3, 1/4, 2/3, 2/3, 1/4, 1/3, 1/4].map(function(x){
	return Math.pow(2, x);
});

var b = baudio(function (t) {
	var m = melody[Math.floor(t * 4 % melody.length)];

	var tune = t % 4 > 2
				? t % 2 > 1 
					? sin(50 * m) + sin(400 * m) + sin(300 * m)
					: sin(75 * m) + sin(400 * m) + sin(300 * m)
				: sin(75 * m);


	var drum = Math.random() * (sin(2) + sin(1));
	var drum2 = Math.random()*2 * sin(4);
	
	return tune + drum + drum2;

	function sin(freq){
		return Math.sin(tau * t * freq);
	}

});
b.play();
