from flask import Blueprint, request, jsonify
import json
from genes_flask.models import Post
import pandas as pd
from genes_flask import bcrypt, db
from genes_flask.api.utils import get_coords
from genes_flask.api.forms import RegistrationForm, LoginForm
from genes_flask.models import Gene, User
from flask_login import current_user, login_user


api = Blueprint('api', __name__)

@api.route("/api/")
@api.route("/api/home")
def home():
    # page = request.args.get('page', 1, type=int)
    posts = Post.query.all()
    return jsonify({
        'posts': 
            [{'title': item.title,
              'content': item.content} 
            for item in posts]
    })


@api.route("/api/search", methods=['GET'])
def search():
    return jsonify({
        'status': 'ok'
    })


@api.route("/api/search", methods=['POST'])
def search_ans():
    proteins = request.args.get('proteins')
    if not proteins:
        return jsonify({'error': 'Bad request'})
    print(proteins)
    proteins = proteins.replace(' ', '').split(',')
    genes, no_genes = dict(), set()
    idx = 0
    for protein in proteins:
        gene = Gene.query.filter_by(Original_request=protein).first()
        if gene:
            genes[idx] = {"Name": gene.Original_request, "Function": gene.Function, "GO": gene.GO}
            idx += 1
        else:
            no_genes.add(protein.upper())
    
    no_genes = list(no_genes)
    if len(genes) < 3:
        return jsonify({'error': 'There should be 3 or more genes'})
    
    df = pd.DataFrame.from_dict(genes, orient='index')
    coords = json.loads(get_coords(df))
    response = jsonify({'genes': genes, 'no_genes': no_genes, 'coords': coords})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@api.route('/api/register', methods=['GET'])
def register_get():
    if current_user.is_authenticated:
        return jsonify({'status': 'already in account'})
    return jsonify({'status': 'ok'})


@api.route('/api/register', methods=['POST'])
def register_post():
    form = RegistrationForm()
    form.username.data = request.args.get('username')
    form.email.data = request.args.get('email')
    form.password.data = request.args.get('password')
    form.confirm_password.data = request.args.get('confirm_password')
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user = User(username=form.username.data, email=form.email.data, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        return jsonify({'status': 'ok'})
    return jsonify({'status': 'user did not created'})


@api.route('/api/login', methods=['GET'])
def login_get():
    if current_user.is_authenticated:
        return jsonify({'status': 'already in account'})
    return jsonify({'status': 'ok'})


@api.route('/api/login', methods=['POST'])
def login_post():
    form = LoginForm()
    form.email.data = request.args.get('email')
    form.password.data = request.args.get('password')
    form.remember.data = request.args.get('remember')
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user, remember=form.remember.data)
            next_page = request.args.get('next')
            return jsonify({'status': 'ok'})
        else:
            return jsonify({'status': 'Login unsuccessful. Please check email or password'})
    return jsonify({'status': 'user did not created'})

