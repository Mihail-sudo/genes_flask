from flask import Blueprint, redirect, request, url_for, jsonify
import json
from genes_flask.models import Post
import pandas as pd
from genes_flask.api.utils import get_coords
from genes_flask.models import Gene


api = Blueprint('api', __name__)

@api.route("/api/")
@api.route("/api/home")
def home():
    page = request.args.get('page', 1, type=int)
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
    for idx, protein in enumerate(proteins):
        gene = Gene.query.filter_by(Original_request=protein.upper()).first()
        if gene:
            genes[idx] = {"Name": gene.Original_request, "Function": gene.Function, "GO": gene.GO}
        else:
            no_genes.add(protein.upper())
    
    # return redirect(url_for('api.answer', genes=json.dumps(genes), no_genes=no_genes))
    no_genes = list(no_genes)
    if len(genes) < 3:
        return jsonify({'error': 'There shiuld be 3 or more genes'})
    
    df = pd.DataFrame.from_dict(genes, orient='index')
    coords = get_coords(df)
    return jsonify({'genes': genes, 'no_genes': no_genes, 'coords': coords}) #redirect(url_for('api.answer', genes=json.dumps(genes), coords=coords, no_genes=no_genes))
