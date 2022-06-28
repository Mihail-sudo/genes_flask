from transformers import AutoTokenizer, AutoModel
import pandas as pd
import numpy as np
import torch
from tqdm import tqdm

tokenizer = AutoTokenizer.from_pretrained("bionlp/bluebert_pubmed_mimic_uncased_L-12_H-768_A-12")
model = AutoModel.from_pretrained("bionlp/bluebert_pubmed_mimic_uncased_L-12_H-768_A-12") 


def get_coords(genes):
    Summary = genes
    text = Summary["Function"].values.tolist() # Function - текстовые описания генов 
    list_of_tensors = []

    for i in tqdm(text): # проходит по описаниям каждого гена по-отдельности
        tokens = tokenizer.encode_plus(i, add_special_tokens=False, 
                                    return_tensors='pt') # скрипт для разделения текста на куски по 510 
        input_id_chunks = tokens['input_ids'][0].split(510) 
        mask_chunks = tokens['attention_mask'][0].split(510)
        
        chunksize = 512
        input_id_chunks = list(input_id_chunks) # батчи токенов
        mask_chunks = list(mask_chunks) # батчи attention mask

        for i in range(len(input_id_chunks)):
            input_id_chunks[i] = torch.cat([
                torch.Tensor([101]), input_id_chunks[i], torch.Tensor([102]) # добавление разделяющих токенов
            ])
            mask_chunks[i] = torch.cat([
                torch.Tensor([1]), mask_chunks[i], torch.Tensor([1]) # указываем это в attention mask
            ])

            pad_len = chunksize - input_id_chunks[i].shape[0] # padding
            if pad_len > 0:
                input_id_chunks[i] = torch.cat([
                    input_id_chunks[i], torch.Tensor([0]* pad_len) 
                ])
                mask_chunks[i] = torch.cat([
                    mask_chunks[i], torch.Tensor([0]*pad_len) # также указываем padding в attention mask
                ])


        input_ids = torch.stack(input_id_chunks)   # склеивание батчей токенов и attention mask в словарь для модели
        attention_mask = torch.stack(mask_chunks)
        input_dict = {
            'input_ids': input_ids.long(),
            'attention_mask': attention_mask.int()
        }



        output = model(**input_dict)   # использование модели
        temp = output[1].detach().numpy() # считываем выходные данные 
        list_of_tensors.append(temp)

    for i in tqdm(range(len(list_of_tensors))):    # объединение порезанного текста по векторам
        a = np.empty(0)
        for j in range(len(list_of_tensors[i])):
            a = np.concatenate((a, list_of_tensors[i][j]), axis=None)
        list_of_tensors[i]= a

    df = pd.DataFrame(list_of_tensors).fillna(0) # создаем датафрейм с которым будем работать и зануляем NaN

    abbs = Summary['Function'].str.findall('[a-z0-9]{0,3}[A-Z]{2,3}[a-z0-9]{0,3}').values # находит акронимы в тексте
    abb = pd.DataFrame(abbs)
    flat_list = [item for sublist in abbs for item in sublist] # собирает все акронимы в один список
    lst = list(set(flat_list)) # оставляет только уникальные акронимы
    dic = dict.fromkeys(lst, 0) 

    for i in tqdm(range(len(abb[0]))): 
        temp_dic = dic.copy()
        for j in abb[0][i]:
            if j in temp_dic:
                temp_dic[j] = 1
        abb[0][i] = list(temp_dic.values())
        
    df_abb = pd.DataFrame(abb[0].tolist())

    go_terms_list = Summary["GO"].dropna().tolist() 
    unique_go_terms = sorted(list(set(' '.join(go_terms_list).split(" ")))) # собирается список GO-terms 
    go_dic = dict.fromkeys(unique_go_terms, 0) # Создается словарь где ключи - GO-terms, а значения зануляются
    go_terms = pd.DataFrame(Summary["GO"]).fillna("pad")
    for i in tqdm(range(len(go_terms["GO"]))):
        temp_dic = go_dic.copy()
        for j in go_terms["GO"][i].split():
            if j in temp_dic:
                temp_dic[j] = 1
        go_terms['GO'][i] = list(temp_dic.values())
        
    go_df = pd.DataFrame(go_terms['GO'].tolist())
    from umap import UMAP
    reducer = UMAP(n_components = 200, random_state = 0, init='random')  
    second_reducer = UMAP(n_components = 2, random_state = 0, init='random')
    go_reduced = pd.DataFrame(reducer.fit_transform(go_df))
    abb_reduced = pd.DataFrame(reducer.fit_transform(df_abb))
    emb_reduced = pd.DataFrame(reducer.fit_transform(df))

    final_df = pd.concat([emb_reduced, abb_reduced], axis=1)
    final_df = pd.concat([final_df, go_reduced], axis=1)

    coord = pd.DataFrame(second_reducer.fit_transform(final_df))

    from sklearn.cluster import DBSCAN

    clusterer = DBSCAN(min_samples=3)
    clusterer.fit(coord)

    data = pd.concat([coord, pd.DataFrame(clusterer.labels_, columns=['labels'])], axis=1).to_json(orient="split")
    return data
