import {Product} from "@/models/product";
import {ActionContext, Store} from "vuex";

interface State {
    products: Product[]
}

export const productStore = {
    state: (): State => ({
        products: []
    }),
    mutations: {
        add(state: State, product: Product) {
            state.products.push(product)
            localStorage.setItem('products', JSON.stringify(state.products))
        },
        delete(state: State, indexes: number[]) {
            state.products = state.products.filter((_:Product, index: number) => !indexes.includes(index))
            localStorage.setItem('products', JSON.stringify(state.products))
        },
        setProducts(state: State, products: Product[]) {
            state.products = products
        }
    },
    getters: {
        products(state: State) {
            return state.products;
        },
        total: (state: State): number => state.products.reduce((acc: number, product: Product) => {
            acc += product.price! * product.qty!
            return acc
        }, 0),
    },
    actions: {
        init({commit}: ActionContext<State, State>) {
            if (localStorage.getItem('products')) {
                const products = JSON.parse(localStorage.getItem('products') as string)
                commit('setProducts', products)
            }
        },
        addProduct({commit}: ActionContext<State, State>, product: Product) {
            commit('add', product)
        },
        deleteProduct({commit}: ActionContext<State, State>, indexes: number[]) {
            commit('delete', indexes)
        }
    }
};
