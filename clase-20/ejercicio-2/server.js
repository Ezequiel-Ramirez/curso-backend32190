
import admin from 'firebase-admin';
import fs from 'fs';

const serviceAccount = JSON.parse(fs.readFileSync('./db/backendcurso-firebase-adminsdk-c9rn8-231e263eeb.json', 'utf8'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

/* const query = db.collection('test')

const coll = await query.get()
coll.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
}); */

const query = db.collection('colores')

const red = await query.add({nombre: 'rojo', valor: '#ff0000'})
const green = await query.add({nombre: 'verde', valor: '#00ff00'})
const blue = await query.add({nombre: 'azul', valor: '#0000ff'})

console.log('colores creados')

const allColors = await query.get()
allColors.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
});

//cambio el nombre del color blue con update
await query.doc(blue.id).update({nombre: 'navy'})
console.log('color azul actualizado')

//eliminar el color green con delete
await query.doc(green.id).delete()
console.log('color verde eliminado')