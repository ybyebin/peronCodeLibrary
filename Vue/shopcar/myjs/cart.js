var vm = new Vue({
	el: '#app',
	data: {
		totaleMoney: 0,
		productList: [],
		checkedAll:false,
		delFlag: false,
		curProduct: ''

	},
	mounted: function() {
		this.$nextTick(function() {
			this.cartView();
		})
	},
	filters: {
		addDanwei:function(value,type){
			return '￥'+value + type;
		}
	},
	methods: {
		cartView: function() {
			var data = {
				"status": 1,
				"result": {
					"totalMoney": 109,
					"list": [{
						"productId": "600100002115",
						"productName": "黄鹤楼香烟",
						"productPrice": 19,
						"productQuantity": 1,
						"productImage": "img/goods-1.jpg",
						"parts": [{
							"partsId": "10001",
							"partsName": "打火机",
							"imgSrc": "img/part-1.jpg"
						}, {
							"partsId": "10002",
							"partsName": "打火机",
							"imgSrc": "img/part-1.jpg"
						}]
					}, {
						"productId": "600100002120",
						"productName": "加多宝",
						"productPrice": 8,
						"productQuantity": 5,
						"productImage": "img/goods-2.jpg",
						"parts": [{
							"partsId": "20001",
							"partsName": "吸管",
							"imgSrc": "img/part-2.jpg"
						}]
					}, {
						"productId": "600100002117",
						"productName": "金装黄鹤楼",
						"productPrice": 25,
						"productQuantity": 2,
						"productImage": "img/goods-1.jpg",
						"parts": [{
							"partsId": "10001",
							"partsName": "打火机-1",
							"imgSrc": "static/img/part-1.jpg"
						}, {
							"partsId": "10002",
							"partsName": "打火机-2",
							"imgSrc": "img/part-1.jpg"
						}, {
							"partsId": "10002",
							"partsName": "打火机-2",
							"imgSrc": "img/part-1.jpg"
						}, {
							"partsId": "10002",
							"partsName": "打火机-2",
							"imgSrc": "img/part-1.jpg"
						}]
					}]
				},
				"message": ""
			};
			this.productList = data.result.list;

		},

		// 是否选中产品
		selectedProduct:function(item){
			console.log(item.checked)
			if (typeof item.checked == 'underfined') {
				this.$set(item,'checked',true);
			}else{
				item.checked = !item.checked;
			}
			this.calcTotalPrice();
		},
		// 产品数量增减
		changeSPNumber:function(item,type){
			if (type < 0) {
				if (item.productQuantity > 0) {
					item.productQuantity -= 1;
				}
				
			}else{
				item.productQuantity += 1;
			}

			this.calcTotalPrice();
		},
		// 全选/取消全选
		checkAllProduct:function(){
			
			this.checkedAll = !this.checkedAll;
			if (this.checkedAll) {
				this.productList.forEach(function(value, index) {
					if (typeof value.checked == 'underfined') {
						this.$set(value, 'checked', true);
					} else {
						value.checked = true;
					}

				});
			}else{
				this.productList.forEach(function(value, index) {
					if (typeof value.checked == 'underfined') {
						this.$set(value, 'checked', false);
					} else {
						value.checked = false;
					}

				});
			}
			this.calcTotalPrice();
		},

		delConfirm:function(item){
			this.delFlag = true;
			this.curProduct = item;
		},
		delProduct:function(){
			var indexs = this.productList.indexOf(this.curProduct);
			this.productList.splice(indexs,1);
			this.delFlag = false;
		},
		// 总价
		calcTotalPrice:function(){
			var _this = this;
			this.totaleMoney = 0;
			this.productList.forEach(function(value,index){
				if (value.checked) {
					_this.totaleMoney += value.productPrice * value.productQuantity;
				}
			});
		}

	}
})