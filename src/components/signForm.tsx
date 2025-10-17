import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "../ui";
import "../style/login.css";
import "../style/ui.css";

interface FormValues {
  name: string;
  email: string;
  password: string;
  cpassword: string;
}

export const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  
  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Le nom est requis.")
        .matches(
          /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/,
          "Le nom ne doit contenir que des lettres sans espace."
        ),
      email: Yup.string()
        .required("L'e-mail est requis.")
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "L'e-mail n'est pas valide."
        ),
      password: Yup.string()
        .required("Le mot de passe est requis.")
        .min(6, "Le mot de passe doit contenir au moins 6 caractères.")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{6,}$/,
          "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial."
        ),
      cpassword: Yup.string()
        .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas.")
        .required("Confirmation requise."),
    }),
    onSubmit: (values) => {
      alert("Inscription réussie !");
      console.log(values);
      // Redirection vers la liste de produits après inscription
      navigate("/products");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="header">
        <h2>Créez votre compte</h2>
      </div>
      <div className="container">
        {formik.touched.name && formik.errors.name && (
          <p className="error">{formik.errors.name}</p>
        )}
        <Input
          label="Nom"
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Entrez votre nom"
        />
      </div>
      <div className="container">
        {formik.touched.email && formik.errors.email && (
          <p className="error">{formik.errors.email}</p>
        )}
        <Input
          label="Email"
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Entrez votre adresse email"
        />
      </div>
      <div className="container">
        {formik.touched.password && formik.errors.password && (
          <p className="error">{formik.errors.password}</p>
        )}
        <Input
          label="Mot de passe"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Entrez votre mot de passe"
        />
      </div>
      <div className="container">
        {formik.touched.cpassword && formik.errors.cpassword && (
          <p className="error">{formik.errors.cpassword}</p>
        )}
        <Input
          label="Confirmation du mot de passe"
          type="password"
          name="cpassword"
          value={formik.values.cpassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Confirmez le mot de passe"
        />
      </div>
      <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
        <Button label="S'inscrire" type="submit" variant="primary" />
        <Button 
          label="Annuler" 
          type="button" 
          variant="secondary" 
          onClick={() => navigate("/login")} 
        />
      </div>
    </form>
  );
};

export default SignupForm;