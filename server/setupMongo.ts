import { MongoClient } from 'mongodb'
import { Operator, Customer, Ingredient } from './data'

// Connection URL
const url = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(url)

const operators: Operator[] = [
  {
    _id: "jim",
    name: "Jim",
  },
  {
    _id: "mary",
    name: "Mary",
  },
]

const customers: Customer[] = [
  {
    _id: "alice",
    name: "Alice",
  },
  {
    _id: "bob",
    name: "Bob",
  },
]

// New default possible ingredients
const possibleIngredients: Ingredient[] = [
  { _id: "i1", name: "Strawberry", cost: 1 },
  { _id: "i2", name: "Banana", cost: 0.8 },
  { _id: "i3", name: "Mango", cost: 1.2 },
  { _id: "i4", name: "Spinach", cost: 0.5 },
  { _id: "i5", name: "Kale", cost: 0.5 },
  { _id: "i6", name: "Blueberry", cost: 1 },
  { _id: "i7", name: "Almond Milk", cost: 0.6 },
  { _id: "i8", name: "Oat Milk", cost: 0.4 },
  { _id: "i9", name: "Greek Yogurt", cost: 0.9 },
  { _id: "i10", name: "Honey", cost: 0.7 },
]

async function main() {
  await client.connect()
  console.log('Connected successfully to MongoDB')

  const db = client.db("test")

  db.collection("orders").createIndex(
    { customerId: 1 }, 
    { unique: true, partialFilterExpression: { state: "draft" } }
  )

  console.log("inserting customers", await db.collection("customers").insertMany(customers as any))
  console.log("inserting operators", await db.collection("operators").insertMany(operators as any))
  
  // Insert possible ingredients
  console.log("inserting possible ingredients", await db.collection("possibleIngredients").insertMany(possibleIngredients as any))

  process.exit(0)
}

main()
