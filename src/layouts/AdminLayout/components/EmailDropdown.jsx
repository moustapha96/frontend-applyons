// import { Link } from "react-router-dom";
// import { messages } from "../data";
// import { LuMail } from "react-icons/lu";

// const EmailDropdown = () => {
//   return (
//     <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
//       <button
//         id="hs-dropdown-with-header"
//         type="button"
//         className="hs-dropdown-toggle inline-flex size-9 flex-shrink-0 items-center justify-center gap-2 rounded-md align-middle font-medium text-zinc-200 transition-all duration-300 hover:bg-white/10"
//       >
//         <LuMail className="size-5" />
//         <span className="absolute -end-0 -top-0 size-4 rounded-full bg-blueLogo text-xs font-medium text-white">
//           2
//         </span>
//       </button>
//       <div className="hs-dropdown-menu duration mt-2 hidden min-w-[20rem] rounded-lg border border-default-200 bg-white opacity-0 shadow-md transition-[opacity,margin] hs-dropdown-open:opacity-100 dark:bg-default-50">
//         <div className="flex items-center justify-between px-4 py-3">
//           <h6 className="text-base font-semibold text-default-900">Messages</h6>
//           <Link
//             to=""
//             className="border-b border-dashed border-default-300 font-semibold text-default-800"
//           >
//             <small>Clear All</small>
//           </Link>
//         </div>
//         <div className="h-52 overflow-y-auto border-y border-dashed border-default-200 py-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-default-300 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1">
//           {messages.map((message, idx) => {
//             const Icon = message.icon;
//             return (
//               <Link
//                 to=""
//                 key={idx}
//                 className="mx-2 flex items-center rounded px-2 py-4 transition-all duration-200 hover:bg-default-100"
//               >
//                 <span
//                   className={`inline-flex size-9 items-center justify-center rounded-full bg-${message.variant}/20 text-${message.variant}`}
//                 >
//                   <Icon className="size-5" />
//                 </span>
//                 <span className="px-3">
//                   <h6 className="text-sm font-semibold text-default-800">
//                     {message.title}
//                   </h6>
//                   <p className="text-xs text-default-600">
//                     {message.description}
//                   </p>
//                 </span>
//               </Link>
//             );
//           })}
//         </div>
//         <Link
//           to=""
//           className="block px-4 py-3 text-center text-sm font-medium text-blueLogo"
//         >
//           View All
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default EmailDropdown;

import { Dropdown, Badge, Button, Typography, Divider, List, Avatar } from "antd"
import { MailOutlined, UserOutlined, BellOutlined, FileTextOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"

const { Text, Title } = Typography

const EmailDropdown = () => {
  const messages = [
    {
      id: 1,
      title: "Nouveau message",
      description: "Vous avez reçu un nouveau message",
      icon: <UserOutlined style={{ color: "#1677ff" }} />,
      time: "Il y a 5 min",
    },
    {
      id: 2,
      title: "Nouvelle demande",
      description: "Une nouvelle demande a été soumise",
      icon: <FileTextOutlined style={{ color: "#52c41a" }} />,
      time: "Il y a 2 heures",
    },
    {
      id: 3,
      title: "Alerte système",
      description: "Mise à jour système disponible",
      icon: <BellOutlined style={{ color: "#faad14" }} />,
      time: "Il y a 1 jour",
    },
  ]

  const menu = (
    <div style={{ width: 300, maxHeight: 400, overflow: "hidden" }}>
      <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Title level={5} style={{ margin: 0 }}>
          Messages
        </Title>
        <Link to="">
          <Text type="secondary" style={{ fontSize: 12 }}>
            Tout effacer
          </Text>
        </Link>
      </div>
      <Divider style={{ margin: "0 0 8px 0" }} />
      <div style={{ maxHeight: 250, overflow: "auto", padding: "0 8px" }}>
        <List
          itemLayout="horizontal"
          dataSource={messages}
          renderItem={(item) => (
            <List.Item style={{ padding: "8px 8px" }}>
              <List.Item.Meta
                avatar={<Avatar icon={item.icon} style={{ backgroundColor: "transparent" }} />}
                title={<Text strong>{item.title}</Text>}
                description={
                  <div>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {item.description}
                    </Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 11 }}>
                      {item.time}
                    </Text>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
      <Divider style={{ margin: "8px 0 0 0" }} />
      <div style={{ padding: "12px 16px", textAlign: "center" }}>
        <Link to="">
          <Text style={{ color: "#1677ff" }}>Voir tout</Text>
        </Link>
      </div>
    </div>
  )

  return (
    <Dropdown dropdownRender={() => menu} placement="bottomRight" arrow={{ pointAtCenter: true }} trigger={["click"]}>
      <Badge count={2} size="small">
        <Button type="text" icon={<MailOutlined />} size="large" shape="circle" />
      </Badge>
    </Dropdown>
  )
}

export default EmailDropdown
