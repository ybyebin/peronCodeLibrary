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

@app.route('/equmentdata', methods=['POST'])
def datamonitoring():
	para = request.data
	para = json.loads(para)
	if(para['page']==1):
		return  json.dumps([{'name':'电一','ip':255,'number':100,'status':'正常'},{'name':'电一','ip':1,'number':100,'status':'正常'},{'name':'电一','ip':1,'number':100,'status':'正常'},{'name':'电一','ip':1,'number':100,'status':'正常'},{'name':'电一','ip':1,'number':100,'status':'正常'},{'name':'电一','ip':1,'number':100,'status':'正常'},{'name':'电一','ip':1,'number':100,'status':'正常'},{'name':'电一','ip':1,'number':100,'status':'正常'},{'name':'电一','ip':1,'number':100,'status':'正常'},{'name':'电一','ip':1,'number':100,'status':'正常'},{'name':'电一','ip':1,'number':100,'status':'正常'},{'name':'电一','ip':1,'number':100,'status':'正常'},{'name':'电一','ip':1,'number':100,'status':'正常'},{'name':'电一','ip':1,'number':100,'status':'正常'},{'name':'电一','ip':1,'number':100,'status':'正常'},{'name':'电一','ip':1,'number':100,'status':'正常'},{'name':'电一','ip':1,'number':100,'status':'正常'},{'name':'电一','ip':1,'number':100,'status':'正常'},{'name':'电一','ip':1,'number':100,'status':'正常'},{'name':'电一','ip':1,'number':100,'status':'正常'},{'name':'电一','ip':1,'number':100,'status':'正常'},{'name':'电一','ip':1,'number':100,'status':'正常'},{'name':'电一','ip':1,'number':100,'status':'正常'},{'name':'电一','ip':1,'number':100,'status':'正常'},{'name':'电一','ip':1,'number':100,'status':'正常'},{'name':'电一','ip':1,'number':100,'status':'正常'},{'name':'电一','ip':1,'number':100,'status':'正常'}])
	else:
		return  json.dumps([{'name':'呵呵','ip':1,'number':100,'status':'正常'}])

@app.route('/pointdata', methods=['POST'])
def datapoint():
	para = request.data
	para = json.loads(para)
	if(para['page']==1):
		return  json.dumps([{'name':'电一','id':1,'number':100,'status':'正常'},{'name':'电一','id':1,'number':100,'status':'正常'},{'name':'电一','id':1,'number':100,'status':'正常'},{'name':'电一','id':1,'number':100,'status':'正常'},{'name':'电一','id':1,'number':100,'status':'正常'},{'name':'电一','id':1,'number':100,'status':'正常'},{'name':'电一','id':1,'number':100,'status':'正常'},{'name':'电一','id':1,'number':100,'status':'正常'},{'name':'电一','id':1,'number':100,'status':'正常'},{'name':'电一','id':1,'number':100,'status':'正常'},{'name':'电一','id':1,'number':100,'status':'正常'},{'name':'电一','id':1,'number':100,'status':'正常'},{'name':'电一','id':1,'number':100,'status':'正常'},{'name':'电一','id':1,'number':100,'status':'正常'},{'name':'电一','id':1,'number':100,'status':'正常'},{'name':'电一','id':1,'number':100,'status':'正常'},{'name':'电一','id':1,'number':100,'status':'正常'},{'name':'电一','id':1,'number':100,'status':'正常'},{'name':'电一','id':1,'number':100,'status':'正常'},{'name':'电一','id':1,'number':100,'status':'正常'},{'name':'电一','id':1,'number':100,'status':'正常'},{'name':'电一','id':1,'number':100,'status':'正常'},{'name':'电一','id':1,'number':100,'status':'正常'},{'name':'电一','id':1,'number':100,'status':'正常'},{'name':'电一','id':1,'number':100,'status':'正常'},{'name':'电一','id':1,'number':100,'status':'正常'},{'name':'电一','id':1,'number':100,'status':'正常'}])
	else:
		return  json.dumps([{'name':'呵呵','id':1,'number':123,'status':'正常'},{'name':'电一','id':1,'number':100,'status':'正常'}])

@app.route('/content',methods=['GET'])
def content():
	data = [{'python-1':'python函数'},{'python-2':'python注释'},{'python-3':'python表达式'}]
	return json.dumps(data)

@app.route('/pointdata',methods=['GET'])
def searchData():
	data = {
	'success':True,
	'data':{
	'pageCount':15,
	'data':[
		{
		'id':1,
		'name':'测试点1',
		'eIP':'255.255.255.0',
		'eport':'9094',
		'eID':'1',
		'address':'1',
		'dataType':'1',
		'hsxs':'0.2',
		'pointID':'1',
		'dsfb':'true',
		'fbtime':'1',
		'covfb':'true',
		},
		{
		'id':1,
		'name':'测试点1',
		'eIP':'255.255.255.0',
		'eport':'9094',
		'eID':'1',
		'address':'1',
		'dataType':'1',
		'hsxs':'0.2',
		'pointID':'1',
		'dsfb':'true',
		'fbtime':'1',
		'covfb':'true',
		},{
		'id':1,
		'name':'测试点1',
		'eIP':'255.255.255.0',
		'eport':'9094',
		'eID':'1',
		'address':'1',
		'dataType':'1',
		'hsxs':'0.2',
		'pointID':'1',
		'dsfb':'true',
		'fbtime':'1',
		'covfb':'true',
		},{
		'id':1,
		'name':'测试点1',
		'eIP':'255.255.255.0',
		'eport':'9094',
		'eID':'1',
		'address':'1',
		'dataType':'1',
		'hsxs':'0.2',
		'pointID':'1',
		'dsfb':'true',
		'fbtime':'1',
		'covfb':'true',
		},{
		'id':1,
		'name':'测试点1',
		'eIP':'255.255.255.0',
		'eport':'9094',
		'eID':'1',
		'address':'1',
		'dataType':'1',
		'hsxs':'0.2',
		'pointID':'1',
		'dsfb':'true',
		'fbtime':'1',
		'covfb':'true',
		},{
		'id':1,
		'name':'测试点1',
		'eIP':'255.255.255.0',
		'eport':'9094',
		'eID':'1',
		'address':'1',
		'dataType':'1',
		'hsxs':'0.2',
		'pointID':'1',
		'dsfb':'true',
		'fbtime':'1',
		'covfb':'true',
		},{
		'id':1,
		'name':'测试点1',
		'eIP':'255.255.255.0',
		'eport':'9094',
		'eID':'1',
		'address':'1',
		'dataType':'1',
		'hsxs':'0.2',
		'pointID':'1',
		'dsfb':'true',
		'fbtime':'1',
		'covfb':'true',
		},{
		'id':1,
		'name':'测试点1',
		'eIP':'255.255.255.0',
		'eport':'9094',
		'eID':'1',
		'address':'1',
		'dataType':'1',
		'hsxs':'0.2',
		'pointID':'1',
		'dsfb':'true',
		'fbtime':'1',
		'covfb':'true',
		},{
		'id':1,
		'name':'测试点1',
		'eIP':'255.255.255.0',
		'eport':'9094',
		'eID':'1',
		'address':'1',
		'dataType':'1',
		'hsxs':'0.2',
		'pointID':'1',
		'dsfb':'true',
		'fbtime':'1',
		'covfb':'true',
		},{
		'id':1,
		'name':'测试点1',
		'eIP':'255.255.255.0',
		'eport':'9094',
		'eID':'1',
		'address':'1',
		'dataType':'1',
		'hsxs':'0.2',
		'pointID':'1',
		'dsfb':'true',
		'fbtime':'1',
		'covfb':'true',
		},{
		'id':1,
		'name':'测试点1',
		'eIP':'255.255.255.0',
		'eport':'9094',
		'eID':'1',
		'address':'1',
		'dataType':'1',
		'hsxs':'0.2',
		'pointID':'1',
		'dsfb':'true',
		'fbtime':'1',
		'covfb':'true',
		},{
		'id':1,
		'name':'测试点1',
		'eIP':'255.255.255.0',
		'eport':'9094',
		'eID':'1',
		'address':'1',
		'dataType':'1',
		'hsxs':'0.2',
		'pointID':'1',
		'dsfb':'true',
		'fbtime':'1',
		'covfb':'true',
		},{
		'id':1,
		'name':'测试点1',
		'eIP':'255.255.255.0',
		'eport':'9094',
		'eID':'1',
		'address':'1',
		'dataType':'1',
		'hsxs':'0.2',
		'pointID':'1',
		'dsfb':'true',
		'fbtime':'1',
		'covfb':'true',
		},{
		'id':1,
		'name':'测试点1',
		'eIP':'255.255.255.0',
		'eport':'9094',
		'eID':'1',
		'address':'1',
		'dataType':'1',
		'hsxs':'0.2',
		'pointID':'1',
		'dsfb':'true',
		'fbtime':'1',
		'covfb':'true',
		},{
		'id':1,
		'name':'测试点1',
		'eIP':'255.255.255.0',
		'eport':'9094',
		'eID':'1',
		'address':'1',
		'dataType':'1',
		'hsxs':'0.2',
		'pointID':'1',
		'dsfb':'true',
		'fbtime':'1',
		'covfb':'true',
		},{
		'id':1,
		'name':'测试点1',
		'eIP':'255.255.255.0',
		'eport':'9094',
		'eID':'1',
		'address':'1',
		'dataType':'1',
		'hsxs':'0.2',
		'pointID':'1',
		'dsfb':'true',
		'fbtime':'1',
		'covfb':'true',
		},{
		'id':1,
		'name':'测试点1',
		'eIP':'255.255.255.0',
		'eport':'9094',
		'eID':'1',
		'address':'1',
		'dataType':'1',
		'hsxs':'0.2',
		'pointID':'1',
		'dsfb':'true',
		'fbtime':'1',
		'covfb':'true',
		},{
		'id':1,
		'name':'测试点1',
		'eIP':'255.255.255.0',
		'eport':'9094',
		'eID':'1',
		'address':'1',
		'dataType':'1',
		'hsxs':'0.2',
		'pointID':'1',
		'dsfb':'true',
		'fbtime':'1',
		'covfb':'true',
		},{
		'id':1,
		'name':'测试点1',
		'eIP':'255.255.255.0',
		'eport':'9094',
		'eID':'1',
		'address':'1',
		'dataType':'1',
		'hsxs':'0.2',
		'pointID':'1',
		'dsfb':'true',
		'fbtime':'1',
		'covfb':'true',
		},{
		'id':1,
		'name':'测试点1',
		'eIP':'255.255.255.0',
		'eport':'9094',
		'eID':'1',
		'address':'1',
		'dataType':'1',
		'hsxs':'0.2',
		'pointID':'1',
		'dsfb':'true',
		'fbtime':'1',
		'covfb':'true',
		},
		{
		'id':2,
		'name':'测试点45345',
		'eIP':'255.255.255.0',
		'eport':'9094',
		'eID':'2',
		'address':'2',
		'dataType':'2',
		'hsxs':'0.2',
		'pointID':'2',
		'dsfb':'true',
		'fbtime':'2',
		'covfb':'true',
		}
	]
	}
	}
	return json.dumps(data)


# @app.route('/',methods=['GET','POST'])
# def function():
# 	type = request.method;


if __name__ == "__main__":
	app.run(debug = True,port=9999)

