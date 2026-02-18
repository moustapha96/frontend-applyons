// "use client"

// import { createContext, useContext, useState, useMemo, useCallback, useEffect } from "react"
// import { deleteCookie, hasCookie, getCookie, setCookie } from "cookies-next"
// import { HttpClient } from "../helpers"
// import { useNavigate } from "react-router-dom"

// const AuthContext = createContext(undefined)

// export function useAuthContext() {
//   const navigate = useNavigate()

//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useAuthContext must be used within an AuthProvider")
//   }
//   return context
// }

// const authSessionKey = "__APPLYONS_REACT_AUTH"
// const authSessionKeyRole = "__APPLYONS_REACT_AUTH__ROLE"
// const authSessionKeyDemandeur = "__APPLYONS_REACT_AUTH__DEMANDEUR"
// const authSessionKeyInstitut = "__APPLYONS_REACT_AUTH__INSTITUT"
// const authSessionKeyToken = "__APPLYONS_REACT_AUTH__TOKEN"
// const authSessionKeyAvatar = "__APPLYONS_REACT_AVATAR"
// const authSessionKeySuperviseur = "__APPLYONS_REACT_AUTH__SUPERVISEUR"


// export function AuthProvider({ children }) {

//   const [profileImage, setProfileImage] = useState(() => {
//     const imageFromStorage = localStorage.getItem(authSessionKeyAvatar)
//     const imageFromCookie = getCookie(authSessionKeyAvatar)
//     return imageFromStorage ? JSON.parse(imageFromStorage) : imageFromCookie ? JSON.parse(imageFromCookie) : undefined
//   })


//   const [superviseur, setSuperviseur] = useState(() => {
//     const superviseurFromStorage = localStorage.getItem(authSessionKeySuperviseur)
//     const superviseurFromCookie = getCookie(authSessionKeySuperviseur)
//     return superviseurFromStorage ? JSON.parse(superviseurFromStorage) : superviseurFromCookie ? JSON.parse(superviseurFromCookie) : undefined
//   })


//   const [token, setToken] = useState(() => {
//     const tokenFromStorage = localStorage.getItem(authSessionKeyToken)
//     const tokenFromCookie = getCookie(authSessionKeyToken)
//     return tokenFromStorage
//       ? JSON.parse(tokenFromStorage)
//       : tokenFromCookie
//         ? JSON.parse(tokenFromCookie)
//         : undefined
//   })

//   const [institut, setInstitut] = useState(() => {
//     const institutFromStorage = localStorage.getItem(authSessionKeyInstitut)
//     const institutFromCookie = getCookie(authSessionKeyInstitut)
//     return institutFromStorage
//       ? JSON.parse(institutFromStorage)
//       : institutFromCookie
//         ? JSON.parse(institutFromCookie)
//         : undefined
//   })

//   const [demandeur, setDemandeur] = useState(() => {
//     const demandeurFromStorage = localStorage.getItem(authSessionKeyDemandeur)
//     const demandeurFromCookie = getCookie(authSessionKeyDemandeur)
//     return demandeurFromStorage
//       ? JSON.parse(demandeurFromStorage)
//       : demandeurFromCookie
//         ? JSON.parse(demandeurFromCookie)
//         : undefined
//   })

//   const [role, setRole] = useState(() => {
//     const roleFromStorage = localStorage.getItem(authSessionKeyRole)
//     const roleFromCookie = getCookie(authSessionKeyRole)
//     return roleFromStorage ? JSON.parse(roleFromStorage) : roleFromCookie ? JSON.parse(roleFromCookie) : undefined
//   })

//   const [rememberMe, setRememberMe] = useState(() => {
//     const rememberMeFromStorage = localStorage.getItem("rememberMe")
//     return rememberMeFromStorage ? JSON.parse(rememberMeFromStorage) : false
//   })

//   const [session, setSession] = useState(() => {
//     const sessionFromStorage = localStorage.getItem(authSessionKey)
//     const sessionFromCookie = getCookie(authSessionKey)
//     return sessionFromStorage
//       ? JSON.parse(sessionFromStorage)
//       : sessionFromCookie
//         ? JSON.parse(sessionFromCookie)
//         : undefined
//   })

//   useEffect(() => {
//     if (token) {
//       localStorage.setItem(authSessionKeyToken, JSON.stringify(token))
//       setCookie(authSessionKeyToken, JSON.stringify(token))
//     }
//   }, [token])

//   useEffect(() => {
//     if (session) {
//       localStorage.setItem(authSessionKey, JSON.stringify(session))
//       localStorage.setItem("isAuthenticated", "true")
//       setCookie(authSessionKey, JSON.stringify(session))
//       setCookie("isAuthenticated", "true")
//     }
//   }, [session])

//   useEffect(() => {
//     if (role) {
//       localStorage.setItem(authSessionKeyRole, JSON.stringify(role))
//       setCookie(authSessionKeyRole, JSON.stringify(role))
//     }
//   }, [role])

//   useEffect(() => {
//     if (demandeur) {
//       localStorage.setItem(authSessionKeyDemandeur, JSON.stringify(demandeur))
//       setCookie(authSessionKeyDemandeur, JSON.stringify(demandeur))
//     }
//   }, [demandeur])


//   useEffect(() => {
//     if (superviseur) {
//       localStorage.setItem(authSessionKeySuperviseur, JSON.stringify(superviseur))
//       setCookie(authSessionKeySuperviseur, JSON.stringify(superviseur))
//     }
//   }, [superviseur])


//   useEffect(() => {
//     if (institut) {
//       localStorage.setItem(authSessionKeyInstitut, JSON.stringify(institut))
//       setCookie(authSessionKeyInstitut, JSON.stringify(institut))
//     }
//   }, [institut])


//   useEffect(() => {
//     if (profileImage) {
//       localStorage.setItem(authSessionKeyAvatar, JSON.stringify(profileImage))
//       setCookie(authSessionKeyAvatar, JSON.stringify(profileImage))
//     }
//   }, [profileImage])


//   const saveSession = (data) => {
//     // Extract rememberMe flag from data
//     console.log(data)
//     const { rememberMe = false, ...sessionData } = data

//     const cookieOptions = rememberMe ? { maxAge: 30 * 24 * 60 * 60 } : {}

//     setCookie(authSessionKey, JSON.stringify(sessionData.user), cookieOptions)
//     setCookie(authSessionKeyToken, JSON.stringify(sessionData.token), cookieOptions)
//     setCookie(authSessionKeyRole, JSON.stringify(sessionData.role[0]), cookieOptions)
//     setCookie(authSessionKeyInstitut, JSON.stringify(sessionData.institut), cookieOptions)
//     setCookie(authSessionKeyAvatar, JSON.stringify(sessionData.user.avatar), cookieOptions)
//     setCookie(authSessionKeyDemandeur, JSON.stringify(sessionData.demandeur), cookieOptions)
//     setCookie(authSessionKeySuperviseur, JSON.stringify(sessionData.superviseur), cookieOptions)
//     setCookie("rememberMe", JSON.stringify(rememberMe), cookieOptions)


//     // Always save to localStorage for the current session
//     localStorage.setItem(authSessionKey, JSON.stringify(sessionData.user))
//     localStorage.setItem(authSessionKeyToken, JSON.stringify(sessionData.token))
//     localStorage.setItem(authSessionKeyRole, JSON.stringify(sessionData.role[0]))
//     localStorage.setItem(authSessionKeyInstitut, JSON.stringify(sessionData.institut))
//     localStorage.setItem(authSessionKeyDemandeur, JSON.stringify(sessionData.demandeur))
//     localStorage.setItem(authSessionKeyAvatar, JSON.stringify(sessionData.user.avatar))
//     localStorage.setItem(authSessionKeySuperviseur, JSON.stringify(sessionData.superviseur))

//     localStorage.setItem("rememberMe", JSON.stringify(rememberMe))

//     setProfileImage(sessionData.user.avatar)
//     setSuperviseur(sessionData.superviseur)
//     setDemandeur(sessionData.demandeur)
//     setInstitut(sessionData.institut)
//     setRole(sessionData.role[0])
//     setSession(sessionData.user)
//     setToken(sessionData.token)

//   }

//   const saveProfilImage = useCallback((image) => {
//     setProfileImage(image)
//     localStorage.setItem(authSessionKeyAvatar, JSON.stringify(image))
//     setCookie(authSessionKeyAvatar, JSON.stringify(image))

//     setSession((prevSession) => {
//       const updatedSession = { ...prevSession, avatar: image }
//       localStorage.setItem(authSessionKey, JSON.stringify(updatedSession))
//       setCookie(authSessionKey, JSON.stringify(updatedSession))
//       return updatedSession
//     })
//   }, [])


//   const saveDemandeur = (data) => {
//     setCookie(authSessionKeyDemandeur, JSON.stringify(data))
//     localStorage.setItem(authSessionKeyDemandeur, JSON.stringify(data))
//     setDemandeur(data)
//   }

//   const saveSuperviseur = (data) => {
//     setCookie(authSessionKeySuperviseur, JSON.stringify(data))
//     localStorage.setItem(authSessionKeySuperviseur, JSON.stringify(data))
//     setSuperviseur(data)
//   }


//   const removeSession = () => {
//     deleteCookie(authSessionKeySuperviseur)
//     deleteCookie(authSessionKeyDemandeur)
//     deleteCookie(authSessionKeyInstitut)
//     deleteCookie(authSessionKeyAvatar)
//     deleteCookie(authSessionKeyToken)
//     deleteCookie(authSessionKeyRole)
//     deleteCookie(authSessionKey)

//     setRole(undefined)
//     setToken(undefined)
//     setSession(undefined)
//     setInstitut(undefined)
//     setDemandeur(undefined)
//     setSuperviseur(undefined)
//     setProfileImage(undefined)

//   }

//   const logout = useCallback(async () => {
//     // //console.log("Logging out...");
//     removeSession()
//     localStorage.removeItem("user")
//     localStorage.removeItem("accessToken")
//     localStorage.removeItem("token")
//     localStorage.removeItem("uid")
//     localStorage.removeItem("expires_in")
//     localStorage.removeItem("is_verified")
//     localStorage.removeItem("refresh_expires_in")
//     localStorage.removeItem("refresh_token")
//     localStorage.removeItem("company_id")
//     localStorage.removeItem("user_context")
//     localStorage.removeItem("partner_id")
//     localStorage.removeItem("parent")
//     localStorage.removeItem("rememberMe")
//     localStorage.removeItem(authSessionKeySuperviseur)
//     localStorage.removeItem(authSessionKeyAvatar)
//     // //console.log("Logout complete");
//   }, [removeSession])


//   const checkAuthStatus = useCallback(async () => {
//     try {
//       const response = await HttpClient.get("/auth/status")
//       return true
//     } catch (error) {
//       // //console.log(error)
//       if (error.response && error.status === 401) {
//         // removeSession();
//         navigate("/auth/sign-in")
//       }
//       if (error.response && error.status === 404) {
//         return false
//       }
//     }
//   }, [saveSession, removeSession])


//   const getToken = () => session?.token

//   return (
//     <AuthContext.Provider
//       value={useMemo(
//         () => ({
//           role,
//           session,
//           logout,
//           token,
//           getToken,
//           saveProfilImage,
//           profileImage,
//           institut,
//           setInstitut,
//           setSession,
//           setToken,
//           setRole,
//           setDemandeur,
//           setProfileImage,
//           demandeur,
//           saveSession,
//           saveSuperviseur,
//           superviseur,
//           removeSession,
//           saveDemandeur,
//           checkAuthStatus,
//           rememberMe,
//           setRememberMe,
//           isAuthenticated: hasCookie(authSessionKey),
//           isInstitutAuthenticated: hasCookie(authSessionKeyInstitut),
//           isDemandeurAuthenticated: hasCookie(authSessionKeyDemandeur),
//         }),
//         [session, token, profileImage, role, rememberMe, superviseur,
//           saveProfilImage, checkAuthStatus, institut, superviseur, demandeur],
//       )}
//     >
//       {children}
//     </AuthContext.Provider>
//   )
// }
"use client"

import { createContext, useContext, useState, useMemo, useCallback, useEffect } from "react"
import { deleteCookie, hasCookie, getCookie, setCookie } from "cookies-next"
import { HttpClient } from "../helpers"
import { useNavigate } from "react-router-dom"


const AuthContext = createContext(undefined)

export function useAuthContext() {


  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}

const authSessionKey = "__APPLYONS_REACT_AUTH"
const authSessionKeyRole = "__APPLYONS_REACT_AUTH__ROLE"
const authSessionKeyDemandeur = "__APPLYONS_REACT_AUTH__DEMANDEUR"
const authSessionKeyInstitut = "__APPLYONS_REACT_AUTH__INSTITUT"
const authSessionKeyToken = "__APPLYONS_REACT_AUTH__TOKEN"
const authSessionKeyAvatar = "__APPLYONS_REACT_AVATAR"
const authSessionKeySuperviseur = "__APPLYONS_REACT_AUTH__SUPERVISEUR"

export function AuthProvider({ children }) {

  const navigate = useNavigate()

  const [profileImage, setProfileImage] = useState(() => {
    try {
      const imageFromStorage = localStorage.getItem(authSessionKeyAvatar)
      const imageFromCookie = getCookie(authSessionKeyAvatar)
      return imageFromStorage ? JSON.parse(imageFromStorage) : imageFromCookie ? JSON.parse(imageFromCookie) : null
    } catch (e) {
      return null
    }
  })

  const [superviseur, setSuperviseur] = useState(() => {
    try {
      const superviseurFromStorage = localStorage.getItem(authSessionKeySuperviseur)
      const superviseurFromCookie = getCookie(authSessionKeySuperviseur)
      return superviseurFromStorage ? JSON.parse(superviseurFromStorage) : superviseurFromCookie ? JSON.parse(superviseurFromCookie) : null
    } catch (e) {
      return null
    }
  })

  const [token, setToken] = useState(() => {
    try {
      const tokenFromStorage = localStorage.getItem(authSessionKeyToken)
      const tokenFromCookie = getCookie(authSessionKeyToken)
      return tokenFromStorage ? JSON.parse(tokenFromStorage) : tokenFromCookie ? JSON.parse(tokenFromCookie) : null
    } catch (e) {
      return null
    }
  })

  const [institut, setInstitut] = useState(() => {
    try {
      const institutFromStorage = localStorage.getItem(authSessionKeyInstitut)
      const institutFromCookie = getCookie(authSessionKeyInstitut)
      return institutFromStorage ? JSON.parse(institutFromStorage) : institutFromCookie ? JSON.parse(institutFromCookie) : null
    } catch (e) {
      return null
    }
  })

  const [demandeur, setDemandeur] = useState(() => {
    try {
      const demandeurFromStorage = localStorage.getItem(authSessionKeyDemandeur)
      const demandeurFromCookie = getCookie(authSessionKeyDemandeur)
      return demandeurFromStorage ? JSON.parse(demandeurFromStorage) : demandeurFromCookie ? JSON.parse(demandeurFromCookie) : null
    } catch (e) {
      return null
    }
  })

  const [role, setRole] = useState(() => {
    try {
      const roleFromStorage = localStorage.getItem(authSessionKeyRole)
      const roleFromCookie = getCookie(authSessionKeyRole)
      return roleFromStorage ? JSON.parse(roleFromStorage) : roleFromCookie ? JSON.parse(roleFromCookie) : null
    } catch (e) {
      return null
    }
  })

  const [rememberMe, setRememberMe] = useState(() => {
    try {
      const rememberMeFromStorage = localStorage.getItem("rememberMe")
      return rememberMeFromStorage ? JSON.parse(rememberMeFromStorage) : false
    } catch (e) {
      return false
    }
  })

  const [session, setSession] = useState(() => {
    try {
      const sessionFromStorage = localStorage.getItem(authSessionKey)
      const sessionFromCookie = getCookie(authSessionKey)
      return sessionFromStorage ? JSON.parse(sessionFromStorage) : sessionFromCookie ? JSON.parse(sessionFromCookie) : null
    } catch (e) {
      return null
    }
  })

  useEffect(() => {
    if (token) {
      localStorage.setItem(authSessionKeyToken, JSON.stringify(token))
      setCookie(authSessionKeyToken, JSON.stringify(token))
    }
  }, [token])

  useEffect(() => {
    if (session) {
      localStorage.setItem(authSessionKey, JSON.stringify(session))
      localStorage.setItem("isAuthenticated", "true")
      setCookie(authSessionKey, JSON.stringify(session))
      setCookie("isAuthenticated", "true")
    }
  }, [session])

  useEffect(() => {
    if (role) {
      localStorage.setItem(authSessionKeyRole, JSON.stringify(role))
      setCookie(authSessionKeyRole, JSON.stringify(role))
    }
  }, [role])

  useEffect(() => {
    if (demandeur) {
      localStorage.setItem(authSessionKeyDemandeur, JSON.stringify(demandeur))
      setCookie(authSessionKeyDemandeur, JSON.stringify(demandeur))
    }
  }, [demandeur])

  useEffect(() => {
    if (superviseur) {
      localStorage.setItem(authSessionKeySuperviseur, JSON.stringify(superviseur))
      setCookie(authSessionKeySuperviseur, JSON.stringify(superviseur))
    }
  }, [superviseur])

  useEffect(() => {
    if (institut) {
      localStorage.setItem(authSessionKeyInstitut, JSON.stringify(institut))
      setCookie(authSessionKeyInstitut, JSON.stringify(institut))
    }
  }, [institut])

  useEffect(() => {
    if (profileImage) {
      localStorage.setItem(authSessionKeyAvatar, JSON.stringify(profileImage))
      setCookie(authSessionKeyAvatar, JSON.stringify(profileImage))
    }
  }, [profileImage])

  const saveSession = (data) => {
    const { rememberMe = false, ...sessionData } = data
    const cookieOptions = rememberMe ? { maxAge: 30 * 24 * 60 * 60 } : {}

    setCookie(authSessionKey, JSON.stringify(sessionData.user), cookieOptions)
    setCookie(authSessionKeyToken, JSON.stringify(sessionData.token), cookieOptions)
    setCookie(authSessionKeyRole, JSON.stringify(sessionData.role[0]), cookieOptions)
    setCookie(authSessionKeyInstitut, JSON.stringify(sessionData.institut), cookieOptions)
    setCookie(authSessionKeyAvatar, JSON.stringify(sessionData.user.avatar), cookieOptions)
    setCookie(authSessionKeyDemandeur, JSON.stringify(sessionData.demandeur), cookieOptions)
    setCookie(authSessionKeySuperviseur, JSON.stringify(sessionData.superviseur), cookieOptions)
    setCookie("rememberMe", JSON.stringify(rememberMe), cookieOptions)

    localStorage.setItem(authSessionKey, JSON.stringify(sessionData.user))
    localStorage.setItem(authSessionKeyToken, JSON.stringify(sessionData.token))
    localStorage.setItem(authSessionKeyRole, JSON.stringify(sessionData.role[0]))
    localStorage.setItem(authSessionKeyInstitut, JSON.stringify(sessionData.institut))
    localStorage.setItem(authSessionKeyDemandeur, JSON.stringify(sessionData.demandeur))
    localStorage.setItem(authSessionKeyAvatar, JSON.stringify(sessionData.user.avatar))
    localStorage.setItem(authSessionKeySuperviseur, JSON.stringify(sessionData.superviseur))
    localStorage.setItem("rememberMe", JSON.stringify(rememberMe))

    setProfileImage(sessionData.user.avatar)
    setSuperviseur(sessionData.superviseur)
    setDemandeur(sessionData.demandeur)
    setInstitut(sessionData.institut)
    setRole(sessionData.role[0])
    setSession(sessionData.user)
    setToken(sessionData.token)
  }

  const saveProfilImage = useCallback((image) => {
    setProfileImage(image)
    localStorage.setItem(authSessionKeyAvatar, JSON.stringify(image))
    setCookie(authSessionKeyAvatar, JSON.stringify(image))

    setSession((prevSession) => {
      const updatedSession = { ...prevSession, avatar: image }
      localStorage.setItem(authSessionKey, JSON.stringify(updatedSession))
      setCookie(authSessionKey, JSON.stringify(updatedSession))
      return updatedSession
    })
  }, [])

  const saveDemandeur = (data) => {
    setCookie(authSessionKeyDemandeur, JSON.stringify(data))
    localStorage.setItem(authSessionKeyDemandeur, JSON.stringify(data))
    setDemandeur(data)
  }

  const saveSuperviseur = (data) => {
    setCookie(authSessionKeySuperviseur, JSON.stringify(data))
    localStorage.setItem(authSessionKeySuperviseur, JSON.stringify(data))
    setSuperviseur(data)
  }

  const removeSession = () => {
    deleteCookie(authSessionKeySuperviseur)
    deleteCookie(authSessionKeyDemandeur)
    deleteCookie(authSessionKeyInstitut)
    deleteCookie(authSessionKeyAvatar)
    deleteCookie(authSessionKeyToken)
    deleteCookie(authSessionKeyRole)
    deleteCookie(authSessionKey)

    setRole(null)
    setToken(null)
    setSession(null)
    setInstitut(null)
    setDemandeur(null)
    setSuperviseur(null)
    setProfileImage(null)
  }

  const logout = useCallback(async () => {
    removeSession()
    localStorage.removeItem("user")
    localStorage.removeItem("accessToken")
    localStorage.removeItem("token")
    localStorage.removeItem("uid")
    localStorage.removeItem("expires_in")
    localStorage.removeItem("is_verified")
    localStorage.removeItem("refresh_expires_in")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("company_id")
    localStorage.removeItem("user_context")
    localStorage.removeItem("partner_id")
    localStorage.removeItem("parent")
    localStorage.removeItem("rememberMe")
    localStorage.removeItem(authSessionKeySuperviseur)
    localStorage.removeItem(authSessionKeyAvatar)
  }, [removeSession])

  const checkAuthStatus = useCallback(async () => {
    try {
      const response = await HttpClient.get("/auth/status")
      return true
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/auth/sign-in")
      }
      if (error.response && error.response.status === 404) {
        return false
      }
    }
  }, [navigate])

  const getToken = () => session?.token

  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({
          role,
          session,
          logout,
          token,
          getToken,
          saveProfilImage,
          profileImage,
          institut,
          setInstitut,
          setSession,
          setToken,
          setRole,
          setDemandeur,
          setProfileImage,
          demandeur,
          saveSession,
          saveSuperviseur,
          superviseur,
          removeSession,
          saveDemandeur,
          checkAuthStatus,
          rememberMe,
          setRememberMe,
          isAuthenticated: hasCookie(authSessionKey),
          isInstitutAuthenticated: hasCookie(authSessionKeyInstitut),
          isDemandeurAuthenticated: hasCookie(authSessionKeyDemandeur),
        }),
        [session, token, profileImage, role, rememberMe, superviseur, institut, demandeur],
      )}
    >
      {children}
    </AuthContext.Provider>
  )
}