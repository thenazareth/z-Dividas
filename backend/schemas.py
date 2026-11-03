from pydantic import BaseModel, EmailStr

'''
This file contains the Pydantic models for the API. 
These models are used to validate the data received in the
requests and to define the structure of the responses.
'''


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class Userlogin(BaseModel):
    email: EmailStr
    password_hash: str