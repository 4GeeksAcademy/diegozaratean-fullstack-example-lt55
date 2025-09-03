"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Consola
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/consolas', methods=['GET'])
def get_consolas():
    all_consolas = Consola.query.all()
    results = list(map( lambda consola: consola.serialize(), all_consolas))

    return jsonify(results), 200

@api.route('/consolas/<int:consola_id>', methods=['GET'])
def get_consola(consola_id):
    consola = Consola.query.filter_by(id=consola_id).first()
    if consola is None:
        return {"error-msg":"que deberia hacer ???"},400

    return jsonify(consola.serialize()), 200


@api.route('/consolas/<int:consola_id>', methods=['DELETE'])
def delete_consola(consola_id):
    consola = Consola.query.filter_by(id=consola_id).first()
    if consola is None:
        return {"error-msg":"que deberia hacer ???"},400

    db.session.delete(consola)
    db.session.commit()

    response_body = {
        "message": "Se elimino la consola " + consola.name
    }
    return jsonify(response_body), 200

@api.route('/consolas', methods=['POST'])
def add_consolas():
    body = request.get_json()
    consola = Consola(**body)
    db.session.add(consola)
    db.session.commit()
    response_body = {
        "message": "Se creo la consola ",
         "consola":  consola.serialize()
    }

    return jsonify(response_body), 200


@api.route('/consolas/<int:consola_id>', methods=['PUT'])
def update_consola(consola_id):
    consola = Consola.query.filter_by(id=consola_id).first()
    if consola is None:
        return {"error-msg":"no existe esa consola"},400
    
    body = request.get_json()

    consola.name = body['name']
    consola.precio = body['precio']
    db.session.commit()

    response_body = {
        "message": "Se actualizo la consola " + consola.name
    }
    return jsonify(response_body), 200