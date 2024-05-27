async function carregarAnimais(){

    const response = await axios.get('http://localhost:8000/animais')
        
    const animais = (response.data)

    const lista = document.getElementById('lista_animais')

    lista.innerHTML = ''

    const racaToClassMap = {
        'Cachorro': 'cachorro-background',
        'Gato': 'gato-background',
        'Passarinho': 'passarinho-background',
        'Roedor': 'roedor-background'
    };



    animais.forEach(animal => {
        const item = document.createElement('ul')
        const nome = document.createElement('li')        
        const idade = document.createElement('li')
        const sexo = document.createElement('li')
        const cor = document.createElement('li')
        const imageButton = document.createElement('img')
        const updateButton = document.createElement('img')
        

        nome.innerText = `Nome: ${animal.nome}`
        idade.innerText = `Idade: ${animal.idade}`
        sexo.innerText = `Sexo: ${animal.sexo}`
        cor.innerText = `Cor: ${animal.cor}`

        imageButton.src = '/data/delete.png'
        imageButton.alt = 'Deletar';
        imageButton.classList.add('image-button')

        updateButton.src = '/data/logoCorgi.png'
        updateButton.alt = 'Atualizar'
        updateButton.classList.add('image-button')

        updateButton.addEventListener('click', async () => {
            await atualizarAnimal(animal.id)
            location.reload()
        });
        imageButton.addEventListener('click', async () => {
            await deletarAnimal(animal.id)
            location.reload()
        });


        item.appendChild(updateButton)
        item.appendChild(imageButton)
        item.appendChild(nome)
        item.appendChild(idade)
        item.appendChild(cor)
        item.appendChild(sexo)
        const backgroundClass = racaToClassMap[animal.raça];
        if (backgroundClass) {
            item.classList.add(backgroundClass);
        }
        lista.appendChild(item)
    });

} 



function manipularFormulario() {
    const formulario = document.getElementById('lista-animal')
    const input_nome = document.getElementById('nome')
    const input_idade = document.getElementById('idade')
    const input_cor = document.getElementById('cor')
    const select_sexo = document.getElementById('sexo')
    const selectRaça = document.getElementById('raça')


    formulario.onsubmit = async (event) => {
        event.preventDefault()
        const nome_animal = input_nome.value
        const idade_animal = input_idade.value
        const cor_animal = input_cor.value
        const sexo_animal = select_sexo.value
        const raça_animal = selectRaça.value
        

        await axios.post('http://localhost:8000/animais', {
            nome: nome_animal,
            idade: idade_animal,
            sexo: sexo_animal,
            cor: cor_animal,
            raça: raça_animal
            
        })
        location.reload();
     };
}


async function deletarAnimal(animalId) {

        const response = await axios.delete(`http://localhost:8000/animal/${animalId}`);

        if (response.status === 200) {
            console.log("Animal removido com sucesso!");
        } else {
            console.error("Erro ao remover o animal:", response.data);
        }
}


async function atualizarAnimal(animalId) {
    const nome_animal = prompt("Digite o novo nome do animal:");
    const idade_animal = prompt("Digite a nova idade do animal:");
    const cor_animal = prompt("Digite a nova cor do animal:");
    const sexo_animal = prompt("Digite o novo sexo do animal:");
    const raça_animal = prompt("Digite a nova raça do animal:");

    const response = await axios.put(`http://localhost:8000/animal/${animalId}`, {
        nome: nome_animal,
        idade: idade_animal,
        sexo: sexo_animal,
        cor: cor_animal,
        raça: raça_animal
    });

    if (response.status === 200) {
        console.log("Animal atualizado com sucesso!");
        location.reload();
    } else {
        console.error("Erro ao atualizar o animal:", response.data);
    }
}


function app(){
    console.log('App iniciada')
    carregarAnimais()
    manipularFormulario()
    deletarAnimal()
}

app()


