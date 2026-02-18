// import logoutImg from "@/assets/images/other/logout.png";
// import { PageMetaData } from "@/components";
// import { useAuthContext } from "@/context";
// import { Link } from "react-router-dom";

// const Logout = () => {
//   const { removeSession } = useAuthContext();
//   removeSession();
//   return (
//     <>
//       <PageMetaData title="Logout" />

//       <div className="my-auto text-center">
//         <h4 className="mb-4 text-2xl font-bold text-white">See you Again!</h4>
//         <p className="mx-auto mb-5 max-w-sm text-default-300">
//           You are now successfully sign out.
//         </p>
//         <div className="flex items-start justify-center">
//           <img src={logoutImg} className="h-40" />
//         </div>
//       </div>
//       <p className="shrink text-center text-zinc-200">
//         Already have an account ?
//         <Link to="/auth/sign-in" className="ms-1 text-primary">
//           <b>Login</b>
//         </Link>
//       </p>
//     </>
//   );
// };

// export default Logout;

"use client"

import logoutImg from "@/assets/images/other/logout.png"
import { PageMetaData } from "@/components"
import { useAuthContext } from "@/context"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

const Logout = () => {
  const { removeSession } = useAuthContext()
  const { t } = useTranslation()

  removeSession()

  return (
    <>
      <PageMetaData title={t("auth.logout.title")} />

      <div className="my-auto text-center">
        <h4 className="mb-4 text-2xl font-bold text-white">
          {t("auth.logout.heading")}
        </h4>
        <p className="mx-auto mb-5 max-w-sm text-default-300">
          {t("auth.logout.description")}
        </p>
        <div className="flex items-start justify-center">
          <img src={logoutImg} className="h-40" alt="Logout illustration" />
        </div>
      </div>

      <p className="shrink text-center text-zinc-200">
        {t("logout.alreadyAccount")}
        <Link to="/auth/sign-in" className="ms-1 text-primary">
          <b>{t("auth.logout.login")}</b>
        </Link>
      </p>
    </>
  )
}

export default Logout
