const express = require('express');
// var path = require('path');
const app = express();

// 产品详情
const comdet = require('./router/product.js');
app.use(express.static('shop'))

app.use(comdet);

app.listen(8080, () => {
 	console.log('Server running at http://127.0.0.1:8080/')
})





