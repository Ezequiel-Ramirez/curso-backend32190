//test con mocha supertest chai con axios
import axios from 'axios'
import { expect } from 'chai'
import { describe, it } from 'mocha'
import { get, getById, post, put, del } from './axios/axios.js'
import supertest from 'supertest'

const getAxios = () => axios.get('http://localhost:8080/product/')
const getByIdAxios = id => axios.get(`http://localhost:8080/product/${id}`)
const postAxios = product => axios.post('http://localhost:8080/product/', product)
const putAxios = (id, product) => axios.put(`http://localhost:8080/product/${id}`, product)
const delAxios = id => axios.delete(`http://localhost:8080/product/${id}`)


describe('Test de rutas', () => {

    before(async () => { console.log('inicio de test Rutas') })

    it('GET /product/', async () => {
        const response = await getAxios()
        expect(response.status).to.equal(200)
    })
    it('GET /product/:id', async () => {
        const response = await getByIdAxios('641d9a2033b1e56433816dfb')
        expect(response.status).to.equal(200)
    })
    it('POST /product/', async () => {
        const productTest = {
            "title": "producto x de prueba",
            "price": 300,
            "description": "producto x de prueba",
            "code":  "252",
            "image": "imagen.jpg",
            "stock": 10,
            "timestamp": "today"
        }
        const response = await postAxios(productTest)
        expect(response.status).to.equal(200)
    })
    it('PUT /product/:id', async () => {
        const productTest = {
            "title": "cebollas",
            "price": 300,
            "description": "producto 4 de prueba",
            "code":  "252",
            "image": "imagen.jpg",
            "stock": 10,
            "timestamp": "today"
        }
        const response = await putAxios('641d9a2033b1e56433816dfb', productTest)
        expect(response.status).to.equal(200)
    })

    //COMENTADO PARA QUE NO BORRE PERO FUNCIONA OK
    /* it('DELETE /product/:id', async () => {
        const response = await delAxios('641d9a2033b1e56433816dfb')
        expect(response.status).to.equal(200)
    }) */

    after(async () => { console.log('fin de test Rutas') })
})

describe('Test de producto con title tomate', () => {
    
        before(async () => { console.log('inicio de test producto con title tomate') })
    
        it('GET /product/', async () => {
            const response = await getAxios()
            expect(response.data[2].title).to.equal('tomate')
        })
    
        after(async () => { console.log('fin de test producto con title tomate') })
    })

describe('Test de producto con price 100', () => {
        
            before(async () => { console.log('inicio de test producto con price 100') })
        
            it('GET /product/', async () => {
                const response = await getAxios()
                expect(response.data[0].price).to.equal(100)
            })
        
            after(async () => { console.log('fin de test producto con price 100') })
        })






