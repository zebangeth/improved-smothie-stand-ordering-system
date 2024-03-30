<template>
  <div class="mx-3 my-3">
    <b-jumbotron bg-variant="primary" text-variant="white" :header="`Welcome, ${name}`" />

    <h2>Orders</h2>
    <b-button @click="refresh" class="mb-2">Refresh</b-button>
    <b-table v-if="customer" :items="customer.orders" :fields="orderFields" />
    
    <h2>Draft Order</h2>
    <div>
      <b-button v-for="ingredient in possibleIngredients" :key="ingredient._id" @click="addIngredientById(ingredient._id)" class="m-1">
        Add {{ ingredient.name }} (${{ ingredient.cost.toFixed(2) }})
      </b-button>
    </div>
    <div class="mt-2">
      <b-list-group>
        <b-list-group-item v-for="(ingredient, index) in draftOrderIngredients" :key="index">
          {{ getIngredientName(ingredient) }}
          <b-button @click="removeIngredient(index)" variant="danger" size="sm" class="float-right">Delete</b-button>
        </b-list-group-item>
      </b-list-group>
    </div>
    <div class="mt-2">
      Total Cost: ${{ totalCost.toFixed(2) }}
    </div>
    <div class="mt-2">
      <b-button @click="save">Save</b-button>
    </div>
    <div class="mt-2">
      <b-button @click="submit">Submit</b-button>
      Note: must save before submitting
    </div>
    <br>
      <h2>Order Bot</h2>
    <ChatBot :possible-ingredients="possibleIngredientNames" @ingredient-clicked="addIngredient" />

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, Ref } from 'vue'
import { CustomerWithOrders, Ingredient } from "../../../server/data"
import ChatBot from '../components/ChatBot.vue'

// props
interface Props {
  customerId: string
}

// default values for props
const props = withDefaults(defineProps<Props>(), {
  customerId: "",
})

const customer: Ref<CustomerWithOrders | null> = ref(null)

const name = computed(() => customer.value?.name || props.customerId)
const draftOrderIngredients: Ref<string[]> = ref([])
const possibleIngredients: Ref<Ingredient[]> = ref([])

const orderFields = [
  '_id',
  {
    key: 'ingredientIds',
    label: 'Ingredients',
    formatter: (value: string[]) => value.map(getIngredientName).join(', ')
  },
  'state'
]

async function refresh() {
  possibleIngredients.value = await (await fetch("/api/possible-ingredients")).json()

  if (props.customerId) {
    customer.value = await (await fetch("/api/customer/" + encodeURIComponent(props.customerId))).json()
    draftOrderIngredients.value = (await (await fetch("/api/customer/" + encodeURIComponent(props.customerId) + "/draft-order")).json())?.ingredientIds || []
  }
}
onMounted(refresh)

function getIngredientName(ingredientId: string) {
  return possibleIngredients.value.find(i => i._id === ingredientId)?.name || 'Unknown Ingredient'
}

function addIngredientById(ingredientId: string) {
  draftOrderIngredients.value.push(ingredientId)
}

function removeIngredient(index: number) {
  draftOrderIngredients.value.splice(index, 1)
}

const totalCost = computed(() => {
  return draftOrderIngredients.value.reduce((total, ingredientId) => {
    const ingredient = possibleIngredients.value.find(i => i._id === ingredientId)
    return total + (ingredient?.cost || 0)
  }, 0)
})

async function save() {
  await fetch(
    "/api/customer/" + encodeURIComponent(props.customerId) + "/draft-order",
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({ ingredientIds: draftOrderIngredients.value })
    }
  )
}

async function submit() {
  await fetch(
    "/api/customer/" + encodeURIComponent(props.customerId) + "/submit-draft-order",
    { method: "POST" }
  )
  await refresh()
}

const possibleIngredientNames = computed(() => possibleIngredients.value.map(i => i.name))

function addIngredient(ingredientName: string) {
  const ingredient = possibleIngredients.value.find(i => i.name === ingredientName)
  if (ingredient) {
    draftOrderIngredients.value.push(ingredient._id)
  }
}

</script>