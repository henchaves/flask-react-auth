from flask import request
from flask_restx import Namespace, Resource, fields

from src.api.users.crud import add_user, get_user_by_email

auth_namespace = Namespace("auth")

user = auth_namespace.model(
    "User",
    {"username": fields.String(required=True), "email": fields.String(required=True)},
)

full_user = auth_namespace.clone(
    "Full User", user, {"password": fields.String(required=True)}
)


class Register(Resource):
    @auth_namespace.marshal_with(user)
    @auth_namespace.expect(full_user, validate=True)
    @auth_namespace.response(201, "Success")
    @auth_namespace.response(400, "Sorry. That email already exists.")
    def post(self):
        post_data = request.get_json()
        username = post_data.get("username")
        email = post_data.get("email")
        password = post_data.get("password")

        user = get_user_by_email(email)
        if user:
            auth_namespace.abort(400, "Sorry. That email already exists.")
        user = add_user(username, email, password)
        return user, 201


class Login(Resource):
    def post(self):
        pass


class Refresh(Resource):
    def post(self):
        pass


class Status(Resource):
    def get(self):
        pass


auth_namespace.add_resource(Register, "/register")
auth_namespace.add_resource(Login, "/login")
auth_namespace.add_resource(Refresh, "/refresh")
auth_namespace.add_resource(Status, "/status")
