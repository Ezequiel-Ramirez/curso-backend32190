import { faker } from '@faker-js/faker'
faker.locale = 'en'

function getProduct(id) {
    return {
        id: id,
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        thumbnail: faker.image.abstract()
    }
}

export { getProduct }
