import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Button } from "../ui";
// import { useNavigate } from "react-router-dom";
import "../style/login.css";
import "../style/ui.css";

interface FormValues {
  email: string;
  password: string;
}

 const Login: React.FC = () => {
  // const navigate = useNavigate();

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
validationSchema: Yup.object({

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

}),

    onSubmit: (values) => {
      alert("Connexion réussie !");
      console.log(values);
      // navigate("./productForm.tsx");

    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="header">
        <h2>Connectez-vous!</h2>
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

      <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
        <Button label="Se connecter" type="submit" variant="primary" />
      </div>
    </form>
  );
};

export default Login
