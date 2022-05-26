import json
from genes_flask.models import Gene
from genes_flask import db, create_app
from sqlalchemy.orm import session


with open('/Volumes/Toshiba/genes_flask/genes.json') as f:
    data = json.loads(f.read())
    
db.init_app(app=create_app())

for elem in data:
    gen = Gene(Field1=elem["FIELD1"], X=elem["X"], 
               Unnamed=elem["Unnamed..0"], Original_request=elem['Original.request'], 
               Functoin=elem['Function'], Entry=elem['Entry'], Entry_name=elem['Entry.name'], 
               Protein_names=elem['Protein.names'], Gene_names=elem['Gene.names'], 
               Organism=elem['Organism'], Length=elem['Length'], Go=elem['GO'], 
               Disease=elem['Disease'], Expr=['Expr'])
    db.session.add(gen)
db.session.commit()
