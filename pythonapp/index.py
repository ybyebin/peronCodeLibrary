#coding=utf-8
from flask import Flask, request, json
from flask import render_template
app = Flask(__name__, static_url_path='')


@app.route('/')
@app.route('/login')
def index():
	return app.send_static_file('login.html')


# @app.route('/post/<int:post_id>')
# def show_post(post_id):
# 	return 'Post %d' % post_id


# 模板
@app.route('/model')
def models():
	# 用户名
	user = {'name':'叶彬'}
	# 提交内容
	posts = [
				{ 
					'author':'张三' , 
					'body':'组长' 
				},
				{ 
					'author':'李四' , 
					'body': '组员' 
				}
			]
	return render_template("index.html",
							title = 'Home',
							posts = posts,
							user = user
							)

@app.route('/login', methods=['POST'])
def login():
	# return 'hello'
	para = request.data
	para = json.loads(para) 
	if (para['name']=='admin' and para['psw']=='admin'):
		return  json.dumps({'success':True,'data':'main.html'})
	else:
		return json.dumps({'success':False,'data':'用户名或密码错误'})

@app.route('/content',methods=['GET'])
def content():
	data = [{'python-1':'python函数'},{'python-2':'python注释'},{'python-3':'python表达式'}]
	return json.dumps(data)


# @app.route('/',methods=['GET','POST'])
# def function():
# 	type = request.method;


if __name__ == "__main__":
	app.run(debug = True,port=9999)

