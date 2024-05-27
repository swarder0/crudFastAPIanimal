from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from uuid import uuid4

app = FastAPI()

origins = ['http://127.0.0.1:5500', 'http://localhost:5500']


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

class Animal(BaseModel):
    id: str = None
    nome: str
    idade: int
    sexo: str
    cor: str
    raça: str
    

banco: List[Animal] = []

@app.get('/animais')
def lista_animais():
    return banco

@app.get('/animal/{animal_id}')
def obter_animal(animal_id: str):
    for animal in banco:
        if animal.id == animal_id:
            return animal
    return{'erro': 'Animal nao localizado'}

@app.delete('/animal/{animal_id}')
def remover_animal(animal_id: str):
    posicao = -1
    for index, animal in enumerate(banco):
        if animal.id == animal_id:
            posicao = index
            break
    if posicao != -1:
        banco.pop(posicao)
        return{'mensagem': 'Animal removido com sucesso'}
    else:
        return{'erro': 'Animal nao localizado'}

@app.post('/animais')
def criar_animais(animal: Animal):
    if animal.id is None:
        animal.id = str(uuid4())
    banco.append(animal)
    return None

@app.put('/animal/{animal_id}')
def atualizar_animal(animal_id: str, novo_animal: Animal):
    for animal in banco:
        if animal.id == animal_id:
            animal.nome = novo_animal.nome
            animal.idade = novo_animal.idade
            animal.sexo = novo_animal.sexo
            animal.cor = novo_animal.cor
            animal.raça = novo_animal.raça
            return {'mensagem': 'Animal atualizado com sucesso'}
    

