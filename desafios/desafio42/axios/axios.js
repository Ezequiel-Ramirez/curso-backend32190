import axios from 'axios'

/* 
get
http://localhost:8080/product/

getById
http://localhost:8080/product/:id

post
http://localhost:8080/product/

put
http://localhost:8080/product/:id

delete
http://localhost:8080/product/:id

de estas rutas ejecutar el metodo correspondiente de axios y mostrar en consola el resultado
*/

const url = 'http://localhost:8080/product/'

const get = async () => {
  try {
    const response = await axios.get(url)
    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
}

const getById = async (id) => {
    try {
        const response = await axios.get(`${url}${id}`)
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
    }

const post = async (data) => {
    try {
        const response = await axios.post(url, data)
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
    }

const put = async (id, data) => {
    try {
        const response = await axios.put(`${url}${id}`, data)
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
    }

const del = async (id) => {
    try {
        const response = await axios.delete(`${url}${id}`)
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
    }

get()
//getById(1)
/* post({
	"title": "producto 4 de prueba",
	"price": 300,
	"description": "producto 4 de prueba",
	"code":  "252",
	"image": "imagen.jpg",
	"stock": 10,
	"timestamp": "today"
}) */
/* put(1, {
	"title": "producto 1 de prueba",
	"price": 100,
	"description": "producto 1 de prueba",
	"code":  "123",
	"image": "imagen.jpg",
	"stock": 10,
	"timestamp": "today"
}) */
//del(1)
