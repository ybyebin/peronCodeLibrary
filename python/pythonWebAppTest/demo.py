
#coding=utf-8
from flask import Flask, request, json, abort
app = Flask(__name__, static_url_path='')


@app.route('/')
def home():
    return app.send_static_file('index.html')


@app.route('/getName', methods=['Get'])
def getName():
    return 'admin'
tasks = [
    {
        'id': 1,
        'title': u'Buy groceries',
        'description': u'Milk, Cheese, Pizza, Fruit, Tylenol',
        'done': False
    },
    {
        'id': 2,
        'title': u'Learn Python',
        'description': u'Need to find a good Python tutorial on the web',
        'done': False
    }
]


@app.route('/getData', methods=['POST'])
def getData():
    s = request.query_string
    # para=request.form['name']#ajax 未制定contentType时
    para = request.data
    para = json.loads(para)
    returnData = {'inputID': para['id'], 'inputName':para['name']}
    s = json.dumps(returnData)
    print(s)
    return json.dumps(returnData)


if __name__ == "__main__":
    app.run()
