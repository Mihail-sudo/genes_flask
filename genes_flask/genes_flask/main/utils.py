import csv

GENES_FILE = 'genes.csv'


def genes_by_proteins(proteins):
    proteins = proteins.split(',')
    proteins = dict.fromkeys(proteins, None)
    with open(GENES_FILE) as f:
        csv_reder = csv.DictReader(f, delimiter=',')
        for name in proteins:
            for gene in csv_reder:
                if name == gene['Original.request']:
                    proteins[name] = gene['Function']
                    break
    return proteins
