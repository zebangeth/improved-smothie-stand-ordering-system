<template>
  <div class="mx-3 my-3">
    <b-jumbotron bg-variant="info" text-variant="white" :header="`Work Screen for ${name}`" />
    <h2>Orders</h2>
    <b-button @click="refresh" class="mb-2">Refresh</b-button>
    <b-table :items="orders" :fields="orderFields">
      <template #cell(operatorId)="cellScope">
        <span v-if="cellScope.value">
          {{ cellScope.value }}
          <b-button @click="updateOrder(cellScope.item._id, 'done')" v-if="cellScope.value === operatorId && cellScope.item.state !== 'done'">
            Done
          </b-button>
        </span>
        <b-button v-else @click="updateOrder(cellScope.item._id, 'blending')">Start Blending</b-button>
      </template>
    </b-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, Ref } from 'vue'
import { Operator, Order, Ingredient } from "../../../server/data"

// props
interface Props {
  operatorId: string
}

// default values for props
const props = withDefaults(defineProps<Props>(), {
  operatorId: "",
})

const operator: Ref<Operator | null> = ref(null)
const orders: Ref<Order[]> = ref([])
const possibleIngredients: Ref<Ingredient[]> = ref([])

const name = computed(() => operator.value?.name || props.operatorId)

async function refresh() {
  if (props.operatorId) {
    operator.value = await (await fetch("/api/operator/" + encodeURIComponent(props.operatorId))).json()
  }
  orders.value = await (await fetch("/api/orders/")).json()
  possibleIngredients.value = await (await fetch("/api/possible-ingredients")).json()
}
onMounted(refresh)

function getIngredientName(ingredientId: string) {
  return possibleIngredients.value.find(i => i._id === ingredientId)?.name || 'Unknown Ingredient'
}

const orderFields = [
  '_id', 'customerId', 'state',
  {
    key: 'ingredientIds',
    label: 'Ingredients',
    formatter: (value: string[]) => value.map(getIngredientName).join(', ')
  },
  'operatorId'
]

async function updateOrder(orderId: string, state: string) {
  await fetch(
    "/api/order/" + encodeURIComponent(orderId),
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        operatorId: props.operatorId,
        state,
      })
    }
  )
  await refresh()
}
</script>