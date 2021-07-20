from flask import Flask,jsonify,json,request,redirect,abort
from flask_mongoengine import MongoEngine
from flask_sqlalchemy import SQLAlchemy
import string
import random
app = Flask(__name__)


app.config['MONGODB_SETTINGS'] = {
    'host':'mongodb+srv://BsAdmin:nCzpWoEqoOIBOn2Z@cluster0.h60bt.mongodb.net/flaskDB?retryWrites=true&w=majority'
}
db = MongoEngine(app)



class URL(db.Document):
    _id=db.StringField()
    id=db.StringField()
    original_url=db.StringField()
    slug=db.StringField()
    def url_serializer(self):
       return { "id":str(self._id),"original_url": self.original_url,"slug":self.slug}


def shorten_url():
    letters=string.ascii_letters
    while True:
        rand_letters=random.choices(letters,k=3)
        rand_letters="".join(rand_letters)
        foundUrl=URL.objects(slug=rand_letters).first()
        if  foundUrl==None:
            return rand_letters
@app.route("/shortlinks",methods=['POST'])
def makeShorten():
    if request.method=='POST':
       url=json.loads(request.data)['url']
       foundUrl=URL.objects(original_url=url).first()
       
       if foundUrl==None:
          createdSlug=shorten_url()
          newUrl=URL(original_url=url,slug=createdSlug)
        #   db.session.add(newUrl)
        #   db.session.commit()
         
          newUrl.save()
          newUrl=URL.objects(original_url=url).first()
          
          return {'url':newUrl.url_serializer()} 
       else:
          
           return {'url':foundUrl.url_serializer()} 

@app.route('/shortlinks',methods=['GET'])       
def getUrls():
    
    if request.method=="GET":
        return jsonify([*map(URL.url_serializer,URL.objects())]) 

@app.route('/shortlinks/<string:slug>',methods=['GET'])       
def getUrlFromShorten(slug):
    if request.method=="GET":
        slugKey=slug
        requestedUrl=URL.objects(slug=slugKey).first()
        if requestedUrl==None:
            return {'message':'Not Found'},404
        else:return  {'url':requestedUrl.url_serializer()} 

if __name__=="__main__":
    app.run(debug=True,port=5000)