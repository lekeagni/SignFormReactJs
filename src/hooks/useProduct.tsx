import { useState } from "react";

export interface Product {
    id: number;
    name: string;
    categorie: string;
    prix: number;
}

export const  useProduct = () => {
    const[products, setProducts] = useState<Product[]> ([]);

    const addProduct = (product: Omit<Product,"id">) =>{
        setProducts((prev) =>[...prev, {id: Date.now(), ...product}]);
    };

    const updateProduct = (id: number, updated: Omit<Product, "id">) => {
        setProducts((prev) =>
            prev.map((p) => (p.id=== id ? { ...p, ...updated} : p))
        );
    };

    const deleteProduct = (id: number) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };
    return {products, addProduct, updateProduct, deleteProduct};
}