var express = require('express');
var router = express.Router();

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});
// 定义产品详情banner
router.get('/cd/banner', function(req, res) {
	res.json({
		success: true,
		data: [{
			url: 'https://ae01.alicdn.com/kf/HTB1v.XjRFXXXXbRXFXXq6xXFXXX0/KEYSION-Waterproof-Bag-With-Luminous-Underwater-Pouch-Phone-Case-For-iPhone-7-7-Plus-6-6s.jpg_640x640.jpg_.webp',
		}, {
			url: 'https://ae01.alicdn.com/kf/HTB10Qo9RpXXXXa7aXXXq6xXFXXXm/KEYSION-Waterproof-Bag-With-Luminous-Underwater-Pouch-Phone-Case-For-iPhone-7-7-Plus-6-6s.jpg_640x640.jpg_.webp',
		}, {
			url: 'https://ae01.alicdn.com/kf/HTB1p7ZSRpXXXXcyapXXq6xXFXXXt/KEYSION-Waterproof-Bag-With-Luminous-Underwater-Pouch-Phone-Case-For-iPhone-7-7-Plus-6-6s.jpg_640x640.jpg_.webp',
		}, {
			url: 'https://ae01.alicdn.com/kf/HTB17lZWRpXXXXXRaFXXq6xXFXXXk/KEYSION-Waterproof-Bag-With-Luminous-Underwater-Pouch-Phone-Case-For-iPhone-7-7-Plus-6-6s.jpg_640x640.jpg_.webp'
		},{
			url: 'https://ae01.alicdn.com/kf/HTB1SNNcRFXXXXcFXVXXq6xXFXXXr/KEYSION-Waterproof-Bag-With-Luminous-Underwater-Pouch-Phone-Case-For-iPhone-7-7-Plus-6-6s.jpg_640x640.jpg_.webp',
		},{
			url: 'https://ae01.alicdn.com/kf/HTB1HyBwRFXXXXcpXpXXq6xXFXXX8/KEYSION-Waterproof-Bag-With-Luminous-Underwater-Pouch-Phone-Case-For-iPhone-7-7-Plus-6-6s.jpg_640x640.jpg_.webp',
		},]
	});
});
// 定义产品详情banner
router.get('/cd/ad', function(req, res) {
	res.json({
		success: true,
		data: [{
			url: 'https://ae01.alicdn.com/kf/HTB1v.XjRFXXXXbRXFXXq6xXFXXX0/KEYSION-Waterproof-Bag-With-Luminous-Underwater-Pouch-Phone-Case-For-iPhone-7-7-Plus-6-6s.jpg_640x640.jpg_.webp',
		}, {
			url: 'https://ae01.alicdn.com/kf/HTB10Qo9RpXXXXa7aXXXq6xXFXXXm/KEYSION-Waterproof-Bag-With-Luminous-Underwater-Pouch-Phone-Case-For-iPhone-7-7-Plus-6-6s.jpg_640x640.jpg_.webp',
		}, {
			url: 'https://ae01.alicdn.com/kf/HTB1p7ZSRpXXXXcyapXXq6xXFXXXt/KEYSION-Waterproof-Bag-With-Luminous-Underwater-Pouch-Phone-Case-For-iPhone-7-7-Plus-6-6s.jpg_640x640.jpg_.webp',
		}, {
			url: 'https://ae01.alicdn.com/kf/HTB17lZWRpXXXXXRaFXXq6xXFXXXk/KEYSION-Waterproof-Bag-With-Luminous-Underwater-Pouch-Phone-Case-For-iPhone-7-7-Plus-6-6s.jpg_640x640.jpg_.webp'
		},{
			url: 'https://ae01.alicdn.com/kf/HTB1SNNcRFXXXXcFXVXXq6xXFXXXr/KEYSION-Waterproof-Bag-With-Luminous-Underwater-Pouch-Phone-Case-For-iPhone-7-7-Plus-6-6s.jpg_640x640.jpg_.webp',
		},{
			url: 'https://ae01.alicdn.com/kf/HTB1HyBwRFXXXXcpXpXXq6xXFXXX8/KEYSION-Waterproof-Bag-With-Luminous-Underwater-Pouch-Phone-Case-For-iPhone-7-7-Plus-6-6s.jpg_640x640.jpg_.webp',
		},]
	});
});

module.exports = router;