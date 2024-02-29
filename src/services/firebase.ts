import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import 'firebase/database'
import * as db from 'firebase/firestore'

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBqodEbWze5iaSPjpAo0ZgJy4Z-KhbJZIE',
  authDomain: 'erenix-ce045.firebaseapp.com',
  projectId: 'erenix-ce045',
  storageBucket: 'erenix-ce045.appspot.com',
  messagingSenderId: '588124218312',
  appId: '1:588124218312:web:3141e2f65e48f50a5a56fd',
  measurementId: 'G-5XP87Q7VCD'
})

const database = getFirestore(firebaseApp)
const doc = db.doc
const setDoc = db.setDoc
const getDoc = db.getDoc
const collection = db.collection
const getDocs = db.getDocs

export { database, doc, setDoc, getDoc, collection, getDocs }
