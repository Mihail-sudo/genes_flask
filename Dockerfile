FROM python:3.8

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY ./genes_flask ./app

CMD [ "python", "./app/app.py"]