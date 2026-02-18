// import avatar1 from "@/assets/images/avatars/avatar.png";
// import { LuLogOut, LuNewspaper, LuPlusCircle, LuSettings, LuUser } from "react-icons/lu";
// import { Link } from "react-router-dom";
// import { useAuthContext } from "@/context";

// const ProfileDropdown = () => {
//   const { session, profileImage, logout } = useAuthContext();

//   return (
//     <div className="hs-dropdown relative inline-flex">
//       <button
//         id="hs-dropdown-with-header"
//         type="button"
//         className="hs-dropdown-toggle inline-flex flex-shrink-0 items-center justify-center gap-2 align-middle text-xs font-medium transition-all"
//       >

//         <img className="inline-block size-9 rounded-full" src={profileImage ? `data:image/jpeg;base64,${profileImage}` : avatar1} />

//         <div className="hidden text-start lg:block">
//           <p className="text-sm font-bold text-white">{session && session.email}</p>
//           <p className="mt-1 text-xs font-semibold text-zinc-400">Admin</p>
//         </div>
//       </button>
//       <div className="hs-dropdown-menu duration mt-2 hidden min-w-[12rem] rounded-lg border border-default-200 bg-white p-2 opacity-0 shadow-md transition-[opacity,margin] hs-dropdown-open:opacity-100 dark:bg-default-50">
//         <Link
//           className="flex items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-default-800 transition-all hover:bg-default-100"
//           to="/admin/profil"
//         >
//           <LuUser className="size-4" />
//           Mon Profil
//         </Link>

//         <Link
//           className="flex items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-default-800 transition-all hover:bg-default-100"
//           to="/admin/configurations"
//         >
//           <LuSettings className="size-4" />
//           Configuration
//         </Link>

//         <hr className="-mx-2 my-2 border-default-200" />
//         <Link
//           className="flex items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-red-500 hover:bg-red-500/10"
//           to="/auth/sign-in"
//           onClick={() => {
//             logout();
//           }}
//         >
//           <LuLogOut className="size-4" />
//           Déconnexion
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ProfileDropdown;

"use client"
import { Dropdown, Avatar, Space, Typography } from "antd"
import { UserOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { useAuthContext } from "@/context"

const { Text } = Typography

const ProfileDropdown = () => {
  const { session, profileImage, logout } = useAuthContext()

  const items = [
    {
      key: "profile",
      label: <Link to="/admin/profil">Mon Profil</Link>,
      icon: <UserOutlined />,
    },
    {
      key: "settings",
      label: <Link to="/admin/configurations">Configuration</Link>,
      icon: <SettingOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: <span onClick={logout}>Déconnexion</span>,
      icon: <LogoutOutlined />,
      danger: true,
    },
  ]

  return (
    <Dropdown menu={{ items }} placement="bottomRight" arrow={{ pointAtCenter: true }} trigger={["click"]}>
      <Space style={{ cursor: "pointer" }}>
        <Avatar
          src={profileImage ? `data:image/jpeg;base64,${profileImage}` : null}
          icon={!profileImage && <UserOutlined />}
          size="default"
        />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <Text strong>{session?.email}</Text>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            Admin
          </Text>
        </div>
      </Space>
    </Dropdown>
  )
}

export default ProfileDropdown
