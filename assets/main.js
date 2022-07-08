const btnConsultar = document.querySelector('[data-consultar]')
const cep = document.querySelector('#cep')
const formError = document.querySelector('.form-error')

const showData = (result) => {
    for (const campo in result) {
        if (document.querySelector('#' + campo)) {
            document.querySelector('#' + campo).value = result[campo]
        }
    }
}

const tiposDeErros = [
    "customError",
    "patternMismatch",
    "valueMissing"
]

const errosValor = {
    customError: {
        cep: "O cep inválido."
    },
    patternMismatch: {
        cep: "O campo precisa ser preenchido com números do cep."
    },
    valueMissing: {
        cep: "O campo cep precisa está preenchido."
    }
}

function mostraMensagem(id, dados) {
    let mensagem = ''
    tiposDeErros.forEach(erro => {
        if (dados.validity[erro]) {
            mensagem = errosValor[erro][id]
        }
    })

    return mensagem
}

cep.addEventListener('blur', event => {
    event.preventDefault()
    const isValidity = event.target
    const isValidBRZip = zip => /^[0-9]{8}$|^([0-9]){5}-([0-9]){3}$/gm.test(zip);
    const search = isValidBRZip(cep.value)

    if (search === true) {
        const isValid = cep.value

        const options = {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        }

        fetch(`https://viacep.com.br/ws/${isValid}/json/`, options)
            .then(res => {
                res.json()
                    .then(data => {
                        showData(data);
                        document.querySelector('.form-error').classList.remove('ativo')
                        formError.innerHTML = "00000-000"
                    })
            })
            .catch(error => {
                console.log("Deu error: ", error.message);
            })
    } else {
        document.querySelector('.form-error').classList.add('ativo')
        formError.innerHTML = mostraMensagem(isValidity.id, isValidity)
    }
})
