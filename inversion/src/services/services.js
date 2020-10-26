const services = async (url, method, data) => {
    return await fetch(url, {
        method: method, // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export default services