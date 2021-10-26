<template>
  <div class="main-container">
    <div class="title">
      <h1>Vue Invoice Calc</h1>
    </div>
    <div class="form-container">
      <form class="form-group">
        <input class="input-product-name" type="text" v-model="product.name" name="product name" value=""
               placeholder="Product name">
        <input class="input-price" type="text" v-model="product.price" name="price" value="" placeholder="Price">
        <input class="input-qty" type="text" v-model="product.qty" name="qty" value="" placeholder="Qty">
      </form>
      <button @click="createProduct(product)">Add</button>
    </div>
    <div class="table-container">
      <table>
        <thead>
        <tr>
          <th><input type="checkbox" :checked="isAllSelected()" @change="markToDelete()"></th>
          <th>Product name</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Sum</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in products" :key="index">
          <td><input type="checkbox" :checked="productsToDelete.includes(index)" @change="markToDelete(index)"></td>
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.qty }}</td>
          <td>{{ item.price * item.qty }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="footer-container">
      <button @click="deleteProducts()" style="height: 22px">Delete</button>
      <div>
        <span>Total:</span>
        <span>{{ total }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Product} from "@/models/product"
import {mapActions, mapGetters} from "vuex";
import Vue from "vue";

interface Data {
  product: Product,
  productsToDelete: number[]
}

export default Vue.extend({
  name: 'Main',
  data(): Data {
    return {
      product: {
        name: '',
        price: null,
        qty: null,
      },
      productsToDelete: []
    }
  },
  created() {
    this.init()
  },
  computed: {
    ...mapGetters(['products', 'total']),
  },
  methods: {
    ...mapActions(['addProduct', 'deleteProduct', 'init']),
    createProduct(product: Product) {
      if (product.name && product.price && product.qty) {
        this.addProduct({...product})
        this.product.name = '';
        this.product.price = 0;
        this.product.qty = 1;
      } else {
        alert("Please, fill all fields")
      }
    },
    markToDelete(index?: number) {
      if (typeof index !== "number" && this.products.length) {
        if (this.isAllSelected()) {
          this.productsToDelete = []
        } else {
          this.productsToDelete = this.products.map((_: Product, index: number) => index)
        }
      } else if (typeof index === "number") {
        if (this.productsToDelete.includes(index)) {
          this.productsToDelete = this.productsToDelete.filter(i => i !== index)
        } else {
          this.productsToDelete.push(index)
        }
      }
    },
    isAllSelected() {
      return this.products.length && this.products.every((_: Product, i: number) => this.productsToDelete.includes(i))
    },
    deleteProducts() {
      this.deleteProduct(this.productsToDelete)
      this.productsToDelete = []
    }
  }
})
</script>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 50px 200px 0 200px;
}

.title {
  text-align: left;
}

.form-container {
  padding: 0 0 20px 0;
  display: flex;
  justify-content: space-between;
}

.input-product-name {
  width: 500px;
}

.input-price, .input-qty {
  width: 70px;
  margin-left: 50px
}

.footer-container {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
}

button {
  box-shadow: 3px 3px 3px 0;
}

table {
  align-self: center;
  border-collapse: collapse;
  border: 1px solid black;
  text-align: left;
  width: 100%;
}

thead {
  background: darkgrey;
}

tbody > tr:nth-child(odd) {
  background: lightgray;
}

td,
th {
  border: 1px solid black;
  padding: 0.75rem;
  border-top: none;
  border-bottom: none;
}

@media (max-width: 567px) {
  .main-container {
    padding: 0;
  }

  .title {
    text-align: center;
  }

  .input-product-name {
    width: 100px;
  }

  .input-price, .input-qty {
    margin-left: 10px;
    width: 30px;
  }

  th, td {
    font-size: 10px;
    font-weight: bolder;
  }
}
</style>
