// import { StateCreator } from 'zustand';
// type Product = {
// 	id: string;
// 	title: string;
// 	price: number;
// };
// type CartProduct = Product & { qty: number };
// type CartState = {
//     products: CartProduct[];
//     total : number;
// }

// type CartActions = {
//     addProdduct: (product: Product) => void;
//     removeProduct: (productid: number) => void;
//     incQty: (productid: number) => void;
//     decQty: (productid: number) => void;
//     getProductById: (productid: number) => CartProduct | undefined;
// 	setTotal: (total: number) => void;
// 	reset: () => void;
// }

// export type CartSlice = CartState & CartActions;
// const initialState: CartState = {
//     products: [],
//     total: 0,
// }

// export const createCartSlice: StateCreator<
//     CartSlice,
//     [['zustand/immer', never]],
//     [],
//     CartSlice
//     > = (set :any, get : any) => ({
//         ...initialState,
//         incQty: (productid) => set((state : any) => {
//             const foundproduct = state.products.find((product :any) => product.id === productid);
//             if (foundproduct) {
//                 foundproduct.qty += 1
//             }
//         }),
//         decQty: (productid) => set((state : any) => { 
//             const foundindex = state.products.findIndex((product : any) => product.id === productid);
//             if (foundindex !== -1) {
//                 if (state.products[foundindex].qty === 1) {
//                     state.products.splice(foundindex, 1);
//                 } else {
//                     state.products[foundindex].qty -= 1
//                 }
//             }
//         }),
//         addProdduct: (product) => set((state : any) => {
//             state.products.push({ ...product, qty: 1 });
//         }),
//         removeProduct: (productid) => set((state : any) => { 
//             state.products = state.products.filter(
// 				(product:any) => product.id !== productid
// 			);
//         }),
//         getProductById: (productid) => get().products.find((product:any) => product.id === productid),
//         setTotal: (total) => set((state : any) => {
//             state.total = total;
//         }),
//         reset: () => set(() => initialState),
//     }) 