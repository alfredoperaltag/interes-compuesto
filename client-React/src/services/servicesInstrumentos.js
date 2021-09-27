class servicesInstrumentos {
    url = 'http://localhost:3000/api/instrumentos/'

    get = async () => {    
        return await fetch(this.url, {
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                //console.log(response)
                return response
            });
    }
}

export default servicesInstrumentos