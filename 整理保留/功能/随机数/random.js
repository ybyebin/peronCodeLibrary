
Math.round(Math.random())//可均衡获取0到1的随机整数。
Math.floor(Math.random() * 10);// 可均衡获取0到9的随机整数。
Math.ceil() //返回大于等于数字参数的最小整数(取整函数)， 对数字进行上舍入
Math.floor() //返回小于等于数字参数的最大整数， 对数字进行下舍入　
Math.round() //返回数字最接近的整数， 四舍五入

function TheRandomNumber(n, m) {
  //生成n-m，包含n但不包含m的整数：
  return parseInt(Math.random() * (m - n) + n, 10);
  //生成n-m，不包含n但包含m的整数：​
  return Math.floor(Math.random() * (m - n) + n) + 1;
  //生成n-m，不包含n和m的整数：
  return Math.round(Math.random() * (m - n - 2) + n + 1)
   // return Math.ceil(Math.random()*(m - n)+n+1)
    //生成n-m，包含n和m的随机数：
  return Math.round(Math.random() * (m - n) + n) 
  // return  Math.ceil(Math.random()*(m - n)+n)
  // 
    
}