from flask import Flask,jsonify,json,request,redirect,abort
from flask_sqlalchemy import SQLAlchemy
import string
import random
app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
db = SQLAlchemy(app)

class URL(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    original_url=db.Column(db.String(255))
    slug=db.Column(db.String(3))
    def url_serializer(self):
       return {"id": self.id, "original_url": self.original_url,"slug":self.slug}
@app.before_first_request
def create_tables():
    db.create_all()

def shorten_url():
    letters=string.ascii_letters
    while True:
        rand_letters=random.choices(letters,k=3)
        rand_letters="".join(rand_letters)
        foundUrl=URL.query.filter_by(slug=rand_letters).first()
        if  foundUrl==None:
            return rand_letters
@app.route("/shortlinks",methods=['POST'])
def makeShorten():
    if request.method=='POST':
       url=json.loads(request.data)['url']
       foundUrl=URL.query.filter_by(original_url=url).first()
       print(request.host_url)
       
       if foundUrl==None:
          createdSlug=shorten_url()
          newUrl=URL(original_url=url,slug=createdSlug)
          db.session.add(newUrl)
          db.session.commit()
          return {'url':newUrl.url_serializer()} 
       else:
           return {'url':foundUrl.url_serializer()} 

@app.route('/shortlinks',methods=['GET'])       
def getUrls():
    
    if request.method=="GET":
        return jsonify([*map(URL.url_serializer,URL.query.all())]) 

@app.route('/shortlinks/<string:slug>',methods=['GET'])       
def getUrlFromShorten(slug):
    if request.method=="GET":
        slugKey=slug
        requestedUrl=URL.query.filter_by(slug=slugKey).first()
        if requestedUrl==None:
            return {'message':'Not Found'},404
        else:return  {'url':requestedUrl.url_serializer()} 

if __name__=="__main__":
    app.run(debug=True,port=5000)