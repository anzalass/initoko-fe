import { stat } from 'fs';
import { get } from 'http';
import create from 'zustand';
import { persist } from 'zustand/middleware';

type Product = {
    id: number;
    email: string;
    img : string;
    title: string;
    price: number;
    qty : number;
};
type Checkout = {
    id: number;
    email: string;
    img : string;
    title: string;
    price: number;
    qty : number;
};


interface StoreState {
    products: Product[];
    checkout: Checkout[];
    total: number;
    totalcheckout: number;
    addProduct: (product: Product) => void;
    incrementProduct: (idproduct: number) => void;
    decrementProduct: (idproduct: number) => void;
    removeProduct: (idproduct: number) => void;
    totalHarga: () => void;
    addCheckout: (product: Product) => void
    removeCheckout: (idproduct: number) => void
    deleteToCheckout: (idproduct: number) => void
    deleteInCheckout: (idproduct: number) => void
    totalHargainCheckout: () => void
}

export const useStoree = create<StoreState>()(
    persist(
        (set) => ({
            products: [],
            total: 0,
            totalcheckout :0,
            checkout : [],
            addProduct: (product) => {
                set((state) => {
                   // const existingProduct = state.products.find((p) => p.id === product.id);
                    // if (existingProduct) {
                    //     const updatedProducts = state.products.map((p) =>
                    //         p.id === existingProduct.id ? { ...p, qty: p.qty + 1 } : p
                    //     );
                    //     return { products: updatedProducts };
                    // } else {
                    //     return { products: [...state.products, { ...product, qty: 1 }] };
                    // }

                    const existingProductIndex = state.products.findIndex((p) => p.id === product.id);
                    if (existingProductIndex !== -1) {
                        // Produk sudah ada dalam keranjang, tingkatkan jumlahnya
                        const updatedProducts = [...state.products];
                        updatedProducts[existingProductIndex] = {
                            ...updatedProducts[existingProductIndex],
                            qty: updatedProducts[existingProductIndex].qty + product.qty,
                        };
                        return { products: updatedProducts };
                    } else {
                        // Produk belum ada dalam keranjang, tambahkan ke keranjang
                        return { products: [...state.products, { ...product, }] };
                    }
                
                });
               
            },
            incrementProduct: (idproduct : number) => {
                set((state) => {
                    const existingProductIndex = state.products.findIndex((p) => p.id === idproduct);
                    if (existingProductIndex !== -1) {
                        // Produk sudah ada dalam keranjang, tingkatkan jumlahnya
                        const updatedProducts = [...state.products];
                        updatedProducts[existingProductIndex] = {
                            ...updatedProducts[existingProductIndex],
                            qty: updatedProducts[existingProductIndex].qty + 1,
                        };
                        return { products: updatedProducts };
                    }
                    return state;
                })
            },
            decrementProduct: (idproduct: number) => {
                set((state) => {
                    const foundindex = state.products.findIndex((p:any) => p.id === idproduct);
                    if (foundindex !== -1) {
                        if (state.products[foundindex].qty === 1) {
                            const updatedProducts = [...state.products];
                            updatedProducts.splice(foundindex, 1);
                            return { products: updatedProducts };
                        } else {
                            const updatedProducts = [...state.products];
                            updatedProducts[foundindex] = {
                                ...updatedProducts[foundindex],
                                qty: updatedProducts[foundindex].qty - 1,
                            };
                            return { products: updatedProducts };
                        }
                    } 
                    return state;
                }, )
            },
            removeProduct: (idproduct: number) => {
                set((state) => {
                    const updatedProducts = state.products.filter((p) => p.id !== idproduct);
                    return { products: updatedProducts };
                })
            },
            // totalHarga: () => {
            //     set((state) => {
            //       const  tttll = state.products.reduce((ttl:any, item:any) => {
            //             ttl = (item.price * item.qty)
            //       },0)
            //        return {total : tttll}
            //     })
            // },
            totalHarga: () => {
                set((state) => {
                    const total = state.products.reduce((ttl, item) => {
                        return ttl + item.price * item.qty; 
                    }, 0);
                    return { ...state, total }; // Mengembalikan objek baru dengan total harga yang dihitung
                });
            },
            addCheckout: (product) => {
                set((state) => {
                  const existingProductIndex = state.checkout.findIndex((p:any) => p.id === product.id);
                  if (existingProductIndex !== -1) {
                    // Product already exists in the checkout array, do nothing
                    return state;
                  } else {
                    // Product does not exist, add it to the checkout array
                    return { checkout: [...state.checkout, product] };
                  }
                });
              },
            removeCheckout: (idproduct: number) => {
                set((state) => {
                    const updatedProducts = state.checkout.filter((p : any) => p.id !== idproduct);
                    return { checkout: updatedProducts };
                })
            },
            deleteToCheckout: (id: number) => {
                set((state) => {
                    const updatedProducts = state.products.filter((p : any) => p.id !== id);
                    return { products: updatedProducts };
                })
         
            },
            deleteInCheckout: (id: number) => {
                set((state) => {
                    const updatedProducts = state.checkout.filter((p : any) => p.id !== id);
                    return { checkout: updatedProducts };
                })
         
            },
            totalHargainCheckout: () => {
                set((state) => {
                    const total = state.checkout.reduce((ttl, item) => {
                        return ttl + item.price * item.qty; 
                    }, 0);
                    return { ...state, total }; // Mengembalikan objek baru dengan total harga yang dihitung
                });
            },

        }),

        {
            name: 'cartstorage', // name of the item in the storage (must be unique)
            getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
        }
    )
);


