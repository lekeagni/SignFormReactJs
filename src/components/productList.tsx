import { useProduct } from "../hooks/useProduct";
import type { Product } from "../hooks/useProduct";
import { useState, useEffect } from "react";
import { Button, Input } from "../ui";
import "../style/ui.css";
import "../style/login.css";

export const ProductList: React.FC = () => {
    const { products, addProduct, updateProduct, deleteProduct } = useProduct();
    const [editId, setEditId] = useState<number | null>(null);

    const [formData, setFormData] = useState<Omit<Product, "id">>({
        name: "",
        categorie: "",
        prix: 0.0,
    });

    useEffect(() => {
        if (editId !== null) {
            const product = products.find((p) => p.id === editId);
            if (product) {
                setFormData({
                    name: product.name,
                    categorie: product.categorie,
                    prix: product.prix,
                });
            }
        } else {
            // reset form
            setFormData({ name: "", categorie: "", prix: 0.0 });
        }
    }, [editId, products]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.categorie || !formData.prix) {
            alert("Tous les champs sont obligatoires");
            return;
        }

        if (editId !== null) {
            updateProduct(editId, formData);
        } else {
            addProduct(formData);
        }

        // Reset form
        setFormData({ name: "", categorie: "", prix: 0.0 });
        setEditId(null);
    };

    return (
        <section className="product-layout">
            <form className="product-form" onSubmit={handleSubmit}>
                <div className="header">
                    <h3>{editId !== null ? "Mis a jour du produit" : "Ajout d'un nouveau produit"}</h3>

                </div>
                <div className="container">
                    <Input
                        label="Nom du produit"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex : Ordinateur"
                    />
                </div>

                <div className="container">
                    <Input
                        label="Catégorie"
                        type="text"
                        name="categorie"
                        value={formData.categorie}
                        onChange={(e) => setFormData({ ...formData, categorie: e.target.value })}
                        placeholder="Ex : Électronique"
                    />
                </div>

                <div className="container">
                    <Input
                        label="Prix"
                        type="number"
                        name="prix"
                        value={formData.prix.toString()}
                        onChange={(e) => setFormData({ ...formData, prix: parseFloat(e.target.value) })}
                        placeholder="Ex : 299.99"
                    />
                </div>

                <div className="form-buttons">
                    <Button label={editId !== null ? "Modifier" : "Ajouter"} type="submit" variant="primary" />
                    {editId !== null && (
                        <Button label="Annuler" type="button" variant="secondary" onClick={() => setEditId(null)} />
                    )}
                </div>
            </form>

            {/* TABLEAU À DROITE */}
            <div className="product-table-container">
                <h2>Liste des produits</h2>
                <table className="table-bordered table-stripped">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Catégorie</th>
                            <th>Prix</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p) => (
                            <tr key={p.id}>
                                <td>{p.name}</td>
                                <td>{p.categorie}</td>
                                <td>{p.prix} fcfa</td>
                                <td>
                                    <Button
                                        label="Modifier"
                                        variant="info"
                                        onClick={() => setEditId(p.id)}
                                    />
                                    <Button
                                        label="Supprimer"
                                        variant="danger"
                                        onClick={() => deleteProduct(p.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ProductList;
