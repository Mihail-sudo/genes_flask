from itsdangerous import URLSafeTimedSerializer as Serializer
from datetime import datetime
from random import randint

from genes_flask import db, login_manager
from flask import current_app
from flask_login import UserMixin


default_account_images = [
    'default-1.jpg',
    'default-2.jpg',
    'default-3.jpg',
    'default-4.jpg',
    'default-5.jpg',
]


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image_file = db.Column(db.String(20), nullable=False, default=default_account_images[randint(0, 4)])
    password = db.Column(db.String(60), nullable=False)
    #history = db.Column(db.ARRAY(db.String))
    posts = db.relationship('Post', backref='author', lazy=True)
    
    def get_reset_token(self):
        s = Serializer(current_app.config['SECRET_KEY'],)
        return s.dumps({'user_id': self.id})
    
    @staticmethod
    def verify_reset_token(token, expires_sec=1800):
        s = Serializer(current_app.config['SECRET_KEY'])
        try:
            user_id=s.loads(token, expires_sec)['user_id']
        except:  
            return None
        return User.query.get(user_id)
    
    def __repr__(self) -> str:
        return f'User {self.username}, {self.email}, {self.image_file}'
    

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    
    def __repr__(self) -> str:
        return f'Post {self.title}, {self.date_posted}'
    
    
class Gene(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    X = db.Column(db.Integer)
    Unnamed = db.Column(db.Integer)
    Original_request = db.Column(db.String(20), nullable=False)
    Function = db.Column(db.Text, nullable=False)
    Entry = db.Column(db.String(20))
    Entry_name = db.Column(db.String(40))
    Protein_names = db.Column(db.Text)
    Gene_names = db.Column(db.Text)
    Organism = db.Column(db.Text)
    Length = db.Column(db.Integer)
    GO = db.Column(db.Text)
    Disease = db.Column(db.String(40))
    Expr = db.Column(db.String(40))
