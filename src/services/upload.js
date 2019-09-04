import * as axios from 'axios'

const BASE_URL = 'http://localhost:3000'

function upload (formData) {
    const url = `${BASE_URL}/`
    return axios.post(url, formData)
        // get data
        .then(x => { console.log('response', x); return x.data })
}

export { upload }
