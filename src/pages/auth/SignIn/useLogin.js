"use client";
import { useAuthContext } from "@/context";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import * as yup from "yup";
import { AppContext } from "../../../AppContext";
import { useTranslation } from "react-i18next";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { urlApi } = useContext(AppContext);
  const { t } = useTranslation();

  const { saveSession, role, isAuthenticated, rememberMe, setRememberMe } =
    useAuthContext();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setValue("email", savedEmail);
    }
  }, []);

  const loginFormSchema = yup.object({
    email: yup
      .string()
      .email("Veuillez entrer un email valide")
      .required("Veuillez entrer votre email"),
    password: yup.string().required("Veuillez entrer votre mot de passe"),
  });

  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const redirectUrl = searchParams.get("redirectTo") ?? "/admin/dashboard";

  useEffect(() => {
    if (
      isAuthenticated &&
      role &&
      role == "ROLE_ADMIN" &&
      redirectUrl == "/admin/dashboard"
    ) {
      navigate("/admin/dashboard");
    }
    if (
      isAuthenticated &&
      role &&
      role == "ROLE_DEMANDEUR" &&
      redirectUrl == "/demandeur/dashboard"
    ) {
      navigate("/demandeur/dashboard");
    }
    if (
      isAuthenticated &&
      role &&
      role == "ROLE_INSTITUT" &&
      redirectUrl == "/institut/dashboard"
    ) {
      navigate("/institut/dashboard");
    }
    if (
      isAuthenticated &&
      role &&
      role == "ROLE_INSTITUT_READ" &&
      redirectUrl == "/institut/dashboard"
    ) {
      navigate("/institut/dashboard");
    }
    if (
      isAuthenticated &&
      role &&
      role == "ROLE_INSTITUT_WRITE" &&
      redirectUrl == "/institut/dashboard"
    ) {
      navigate("/institut/dashboard");
    }

    if (
      isAuthenticated &&
      role &&
      role == "ROLE_TRADUCTEUR" &&
      redirectUrl == "/institut-traducteur/dashboard"
    ) {
      navigate("/institut-traducteur/dashboard");
    }
  }, [isAuthenticated, navigate, redirectUrl]);

  const login = handleSubmit(async (values) => {
    setLoading(true);

    try {
      // Handle remember me functionality
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", values.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      const response = await fetch(urlApi + "login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const res = await response.json();
      console.log("Login response:");
      console.log(res);
      if (res.code == "401") {
        toast.error(res.message, {
          position: "top-right",
          duration: 2000,
        });
        return;
      }
      if (res.code == "403") {
        toast.error(`${t("auth.signIn.accountNotVerified")}`, {
          position: "top-right",
          duration: 2000,
        });
        return;
      }

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      if (res.token) {
        // Save session with remember me preference
        saveSession({
          token: res.token,
          user: res.user,
          role: res.user.roles,
          institut: res.user?.institut ?? null,
          demandeur: res.user?.demandeur ?? null,
          rememberMe: rememberMe,
          superviseur: res.user?.superviseur,
        });

        toast.success(t("auth.signIn.success"), {
          position: "top-right",
          duration: 2000,
        });

        let redirectTo = redirectUrl;

        // if (
        //   res.user.roles.includes("ROLE_INSTITUT") ||
        //   res.user.roles.includes("ROLE_INSTITUT_READ") ||
        //   res.user.roles.includes("ROLE_INSTITUT_WRITE") ||
        //   res.user.roles.includes("ROLE_TRADUCTEUR")
        // ) {
        //   if (res.user.roles.includes("ROLE_INSTITUT") && !res.user.institut.hasDepartement ) {
        //     redirectTo = "/institut/programme";
        //   } else {
        //     redirectTo = "/institut/dashboard";
        //   }
        //   navigate(redirectTo);
        // } else if (res.user.roles.includes("ROLE_DEMANDEUR")) {
        //   redirectTo = "/demandeur/dashboard";
        //   navigate(redirectTo);
        // } else if (res.user.roles.includes("ROLE_ADMIN")) {
        //   redirectTo = "/admin/dashboard";
        //   navigate(redirectTo);
        // } else if (res.user.roles.includes("ROLE_TRADUCTEUR")) {
        //   redirectTo = "/institut-traducteur/dashboard";
        //   navigate(redirectTo);
        // }
        if (res.user.roles.includes("ROLE_TRADUCTEUR")) {
          redirectTo = "/institut-traducteur/dashboard";
          navigate(redirectTo);
        } else if (
          res.user.roles.includes("ROLE_INSTITUT") ||
          res.user.roles.includes("ROLE_INSTITUT_READ") ||
          res.user.roles.includes("ROLE_INSTITUT_WRITE")
        ) {
          if (
            res.user.roles.includes("ROLE_INSTITUT") &&
            !res.user.institut.hasDepartement
          ) {
            redirectTo = "/institut/programme";
          } else {
            redirectTo = "/institut/dashboard";
          }
          navigate(redirectTo);
        } else if (res.user.roles.includes("ROLE_DEMANDEUR")) {
          redirectTo = "/demandeur/dashboard";
          navigate(redirectTo);
        } else if (res.user.roles.includes("ROLE_ADMIN")) {
          redirectTo = "/admin/dashboard";
          navigate(redirectTo);
        }
      }
    } catch (e) {
      // if (e.response?.data?.error) {
      //   toast.error(e.response.data.error, {
      //     position: "top-right",
      //     duration: 2000,
      //   })
      // } else {
      //   toast.error("Une erreur s'est produite lors de la connexion.", {
      //     position: "top-right",
      //     duration: 2000,
      //   })
      // }
      console.error("Login error:", e);
      toast.error(e.response.data.error, {
        position: "top-right",
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  });

  return { loading, login, control, rememberMe, setRememberMe };
};

export default useLogin;
