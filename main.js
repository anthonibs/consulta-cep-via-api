const btn = document.querySelector('[data-consultar]')
const cep = document.querySelector('#cep')


const showData = (result) => {
    for (const campo in result) {
        if (document.querySelector('#' + campo)) {
            document.querySelector('#' + campo).value = result[campo]
        }
    }
}


cep.addEventListener('blur', event => {
    event.preventDefault()

    console.log(event);

    const isValidBRZip = zip => /^[0-9]{8}$|^([0-9]){5}-([0-9]){3}$/gm.test(zip);
    const search = isValidBRZip(cep.value)

    if (search === true) {
        const isValid = cep.value
        console.log(isValid);

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
                    })
            })
            .catch(error => {
                console.log("Deu error: ", error.message);
            })
    } else {
        console.log("CEP inválido!!");
    }
})

