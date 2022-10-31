from typing import List
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends, FastAPI, HTTPException, Response
from sqlalchemy.orm import Session
from starlette import status

import models
import schemas
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def get_all(db: Session = Depends(get_db)):
    instance = db.query(models.PhoneBook).all()
    return instance


@app.get("/{id}")
def get_user_by_id(id: int, db: Session = Depends(get_db)):
    instance = db.query(models.PhoneBook).get(id)
    if not instance:
        raise HTTPException(status_code=404, detail=f"User with ID {id} not found")
    return instance


@app.post("/", status_code=status.HTTP_201_CREATED)
def create(phone: schemas.PhoneBook, db: Session = Depends(get_db)):
    instance = models.PhoneBook(**phone.dict())
    db.add(instance)
    db.commit()
    db.close()
    return instance


@app.put("/{id}", )
def update(id: int, phone: schemas.PhoneBook, db: Session = Depends(get_db)):
    instance = db.get(models.PhoneBook, id)
    if instance:
        instance.first_name = phone.first_name
        instance.last_name = phone.last_name
        instance.phone_number = phone.phone_number
        db.add(instance)
        db.commit()
        db.refresh(instance)
    if not instance:
        raise HTTPException(status_code=404, detail=f"User with ID {id} not found")
    return instance


@app.delete("/{id}")
def delete(id: int, db: Session = Depends(get_db)):
    instance = db.query(models.PhoneBook).get(id)
    db.delete(instance)
    db.commit()
    db.close()
    if not instance:
        raise HTTPException(status_code=404, detail=f"User with ID {id} not found")
    return {
        'message': 'User deleted successfully'
    }
