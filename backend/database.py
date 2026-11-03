import os
import psycopg
from dotenv import load_dotenv

'''
This file contains the functions to interact with the database.
'''



load_dotenv()

def get_connection():
    return psycopg.connect(
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT"),
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD")
    )


def create_user(name, email, password):
    with get_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(
                """
                INSERT INTO users (name, email, password_hash)
                VALUES (%s, %s, %s)
                RETURNING id, name, email;
                """,
                (name, email, password)
            )

            user = cursor.fetchone()

    return user

def authenticate_user(email, password_hash):
    with get_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute(
                """
                SELECT id, name, email, password_hash
                FROM users
                WHERE email = %s;
                """,
                (email,)
            )

            auth_user = cursor.fetchone()

    return auth_user