import { initializeApp } from 'firebase/app'
import 'firebase/database'
import * as db from 'firebase/database'

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyB6SVC23HBDMIO_FAAgm4Q26TjE_ho6Wdg',
  authDomain: 'testeclinicalvet.firebaseapp.com',
  projectId: 'testeclinicalvet',
  storageBucket: 'testeclinicalvet.appspot.com',
  messagingSenderId: '193788880892',
  appId: '1:193788880892:web:d032f87c2e45cb12a77479',
  measurementId: 'G-GWCG7TQL15'
})

const database = db.getDatabase(firebaseApp)
const ref = db.ref
const get = db.get
const onValue = db.onValue
const set = db.set
const push = db.push
const remove = db.remove
const child = db.child
const update = db.update

export { database, ref, get, onValue, set, push, remove, child, update }
