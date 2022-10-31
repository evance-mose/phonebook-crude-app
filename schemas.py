from pydantic import BaseModel


class PhoneBook(BaseModel):
    firstname: str
    lastname: str
    phone: str

    class Config:
        orm_mode = True
