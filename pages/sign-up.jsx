import Head from "next/head";
import navStyles from "../styles/Nav.module.css";
import signUpStyles from "../styles/SignUp.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContent";
import { useRouter } from "next/router";

const Input = ({ name, placeholder, value, onChange, type = "text" }) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={navStyles.input}
    />
  );
};

// Hook for the auth
const SignUpForm = () => {
  const router = useRouter();
  const { user, createAccountWithEmailPassword } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      createAccountWithEmailPassword(formData);
    } catch (error) {
      console.log("Error signing up!");
      console.log(error);
    }
  };

  /* If user is already logged in, return to the home page! */
  if (user) {
    router.replace("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={signUpStyles.input_group}>
        <label htmlFor="name">Full name</label>
        <Input
          type="text"
          name="name"
          placeholder="Input name"
          required
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className={signUpStyles.input_group}>
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          name="email"
          placeholder="Input email"
          required
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className={signUpStyles.input_group}>
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          name="password"
          placeholder="Input password"
          required
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      <div className={signUpStyles.input_group}>
        <button className={navStyles.nav__login}>
          <p style={{ padding: "4px 0" }}>Sign Up</p>
        </button>
      </div>
    </form>
  );
};

//Page Rendering 
const SignUpPage = () => {
  return (
    <>
      <Head>
        <title>Vivo - Sign Up Page</title>
        <meta name="description" content="Vivo registration page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
        }}
      >
        <SignUpForm />
      </main>
    </>
  );
};

export default SignUpPage;
