import pandas as pd
import sqlite3

conn = sqlite3.connect('/Volumes/Toshiba/genes_flask/genes_flask/genes_flask/site.db')
genes = pd.read_csv('/Volumes/Toshiba/genes_flask/genes.csv')

genes.to_sql('genes', conn, if_exists='append', index = False)


