import { useProduct } from "../hooks/useProduct";
import type { Product } from "../hooks/useProduct";
import { useState, useEffect } from "react";
import { Button, Input, Modal } from "../ui";
import "../style/ui.css";
import "../style/login.css";
import { Header } from "./Header";

export const ProductList: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProduct();
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

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

    setFormData({ name: "", categorie: "", prix: 0.0 });
    setEditId(null);
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      setDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setProductToDelete(null);
  };

  return (
    <>
      <Header userName="Jean Dupont" />
      <section className="product-layout">
        <form className="product-form" onSubmit={handleSubmit}>
          <div className="header">
            <h3>
              {editId !== null
                ? "Mise à jour du produit"
                : "Ajout d'un nouveau produit"}
            </h3>
          </div>
          <div className="container">
            <Input
              label="Nom du produit"
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Ex : Ordinateur"
            />
          </div>

          <div className="container">
            <Input
              label="Catégorie"
              type="text"
              name="categorie"
              value={formData.categorie}
              onChange={(e) =>
                setFormData({ ...formData, categorie: e.target.value })
              }
              placeholder="Ex : Électronique"
            />
          </div>

          <div className="container">
            <Input
              label="Prix"
              type="number"
              name="prix"
              value={formData.prix.toString()}
              onChange={(e) =>
                setFormData({ ...formData, prix: parseFloat(e.target.value) || 0 })
              }
              placeholder="Ex : 299.99"
            />
          </div>

          <div className="form-buttons">
            <Button
              label={editId !== null ? "Modifier" : "Ajouter"}
              type="submit"
              variant="primary"
            />
            {editId !== null && (
              <Button
                label="Annuler"
                type="button"
                variant="secondary"
                onClick={() => setEditId(null)}
              />
            )}
          </div>
        </form>

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
              {products.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", padding: "2rem", color: "#64748b" }}>
                    Aucun produit pour le moment
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.categorie}</td>
                    <td>{p.prix} FCFA</td>
                    <td>
                      <Button
                        label="Modifier"
                        variant="info"
                        type="button"
                        onClick={() => setEditId(p.id)}
                      />
                      <Button
                        label="Supprimer"
                        variant="danger"
                        type="button"
                        onClick={() => handleDeleteClick(p)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* MODAL DE CONFIRMATION */}
      <Modal
        open={deleteModalOpen}
        onClose={cancelDelete}
        title="Confirmer la suppression"
      >
        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ marginBottom: "1rem", color: "#2d3748", fontSize: "15px" }}>
            Êtes-vous sûr de vouloir supprimer ce produit ?
          </p>
          {productToDelete && (
            <div
              style={{
                background: "#f7fafc",
                padding: "1rem",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
              }}
            >
              <p style={{ margin: "0 0 0.5rem 0", fontWeight: "600", color: "#1a202c" }}>
                {productToDelete.name}
              </p>
              <p style={{ margin: "0", fontSize: "14px", color: "#64748b" }}>
                Catégorie: {productToDelete.categorie} | Prix: {productToDelete.prix} FCFA
              </p>
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
          <Button
            label="Annuler"
            variant="secondary"
            type="button"
            onClick={cancelDelete}
          />
          <Button
            label="Supprimer"
            variant="danger"
            type="button"
            onClick={confirmDelete}
          />
        </div>
      </Modal>
    </>
  );
};

export default ProductList;