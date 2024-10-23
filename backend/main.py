from flask import Flask, jsonify, request
from flask_cors import CORS

from db import *
from model import load_model

app = Flask(__name__)
CORS(app)

@app.route('/geography')
def geography():
    return jsonify(list_geography)

@app.route('/gender')
def gender():
    return jsonify(list_gender)

@app.route('/hasCrCard')
def hasCrCard():
    return jsonify(list_hasCrCard)

@app.route('/isActivMember')
def isActivMember():
    return jsonify(list_isActivMember)


@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        credit_score = data['credit_score']
        age = data['age']
        tenure_months = data['tenure_months']
        balance = data['balance']
        num_of_products = data['num_of_products']
        estimated_salary = data['estimated_salary']
        loyalty_score = data['loyalty_score']
        geography = data['geography']
        gender = data['gender']
        hasCrCard = data['hasCrCard']
        isActivMember = data['isActivMember']

        if credit_score < 600:
            credit_score_category = list_credit_score_category[1][0]
        elif credit_score >= 600 and credit_score <= 800:
            credit_score_category = list_credit_score_category[0][0]
        else:
            credit_score_category = list_credit_score_category[2][0]

        if tenure_months < 12:
            tenure_group = list_tenure_group[1][0]
        elif tenure_months >= 12 and tenure_months < 36:
            tenure_group = list_tenure_group[0][0]
        elif tenure_months >= 36 and tenure_months < 60:
            tenure_group = list_tenure_group[3][0]
        else:
            tenure_group = list_tenure_group[2][0]

        atr = [credit_score, age, tenure_months, balance, num_of_products, estimated_salary, loyalty_score, geography, gender, hasCrCard, isActivMember, credit_score_category, tenure_group]

        predict = load_model(atr)
        if predict == 0:
            predict_cat = 'Não'
        else:
            predict_cat = 'Sim'


        return jsonify({'predict': predict_cat})


    except KeyError as err:
        print(err)
        return jsonify({'err': 'Preencha todos os campos.'}), 400

if __name__ == '__main__':
    app.run(debug=True)