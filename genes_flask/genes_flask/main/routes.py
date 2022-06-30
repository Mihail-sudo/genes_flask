from flask import Blueprint, redirect, request, render_template, url_for
from genes_flask.models import Post
from genes_flask.main.forms import ProteinsForm
from genes_flask.models import Gene


main = Blueprint('main', __name__)

@main.route("/")
@main.route("/home")
def home():
    page = request.args.get('page', 1, type=int)
    posts = Post.query.order_by(Post.date_posted.desc()).paginate(page=page, per_page=10)
    return render_template('home.html', posts=posts)


@main.route("/search", methods=['GET', 'POST'])
def search():
    form = ProteinsForm()
    if form.validate_on_submit():
        genes, no_genes = set(), set()
        proteins = form.proteins.data.replace(' ', '').split(',')
        for protein in proteins:
            gene = Gene.query.filter_by(Original_request=protein.upper()).first()
            if gene:
                genes.add(gene)
            else:
                no_genes.add(protein.upper())
        return redirect(url_for('main.answer', genes=genes, no_genes=no_genes))
    return render_template('search.html', title='Find genes', form=form)

@main.route("/answer")
def answer():
    genes = request.args.get('genes')     # genes_by_proteins(json.loads(request.args.get('proteins')))
    no_genes = request.args.get('no_genes') 
    return render_template('answer.html', genes=genes, no_genes=no_genes)
