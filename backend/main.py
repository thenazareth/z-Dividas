from fastapi import FastAPI, HTTPException
from psycopg.errors import UniqueViolation
from fastapi.middleware.cors import CORSMiddleware

from schemas import UserCreate, Userlogin
from database import get_connection
from database import create_user, authenticate_user

'''
This file contains the main FastAPI application.
It defines the endpoints for the API and handles the requests and responses.
'''


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#this endpoint is for testing the API
@app.get("/")
def home():
    return {"message": "Zero Dívidas API funcionando!"}


#this endpoint is for testing the database connection
@app.get("/test-db")
def test_db():
    try:
        with get_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT version();")
                result = cursor.fetchone()

        return {
            "message": "Conexão com PostgreSQL realizada!",
            "database_version": result[0]
        }

    except Exception as error:
        return {"error": str(error)}

#this endpoint is for registering a new user
@app.post("/users")
def register_user(user: UserCreate):
    try:
        new_user = create_user(
            user.name,
            user.email,
            user.password
        )

        return {
            "id": new_user[0],
            "name": new_user[1],
            "email": new_user[2]
        }

    except UniqueViolation:
        raise HTTPException(
            status_code=409,
            detail="E-mail já cadastrado."
        )

#this endpoint is for authenticating a user (login)
@app.post("/login")
def login_user(auth_user: Userlogin):
    user = authenticate_user(
        auth_user.email,
        auth_user.password_hash
        )

    if user is None or user[3] != auth_user.password_hash:
        raise HTTPException(
            status_code=401,
            detail="Credenciais inválidas."
        )

    return {
        "id": user[0],
        "name": user[1],
        "email": user[2]
    }
    