var baudio = require('baudio');
var tau = 2 * Math.PI;

var melody = [  0, 0, 1, 0,
				0, 1, 0, 0,

				0, 1/3, 1, 0,
				1/4, 1/4, 1/6, 1/8,

				0, 0, 1, 0,
				0, 1, 0, 0,

				0, 1/3, 1, 0,
				2/3, 2/3, 1/2, 1/8,

				0, 0, 1, 0,
				0, 1, 0, 0,

				0, 1/3, 1, 0,
				1/4, 1/4, 1/6, 1/8,

				1, 1, 1, 1,
				1/2, 1/2, 1/2, 1/2,
				2/3, 2/3, 2/3, 2/3,
				1/8, 1/8, 1/8, 1/8
			]
	.map(function(x){
		return Math.pow(2, x);
	}
);	

var b = baudio(function (t) {

	var m = melody[Math.floor(t * 4 % melody.length)];

	var tune = sin(25 * m) + sin(50 * m) +  sin(50 * m) + sin(100 * m) + sin(400 * m);
	var high = t % 2 > 1
				? sin(500 * m) * (sin(1) + sin(2)) + sin(100 * m)
				: 0;

	var hi = Math.min(.05, Math.random() * (square(1) + square(2)) );
	var hat = Math.min(.95, Math.random() * (square(2) + square(4)) );
	
	var hihat =  (hi + hat)/10;

	var kick1 = t % 1 < .15
				? Math.random() * (square(5) + square(10))
				: 0;

	var kick2 = t % 3.5 < .5
				? Math.random() * (sin(1) + sin(2))
				: 0;

	var kick = kick1 + kick2/2;

	return kick + hihat/2 + tune/15 + high/10;

	function sin(freq){
		return Math.sin(tau * t * freq);
	}

	function square(freq){
		return Math.sin(tau * t * freq) < 0 ? 1 : -1;
	}

});
b.play();
