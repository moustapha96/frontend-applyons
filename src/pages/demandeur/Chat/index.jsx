import { useState } from "react";
import ChatArea from "./components/ChatArea";
import ChatUsers from "./components/ChatUsers";
import { users } from "./data";
import { AdminBreadcrumb } from "@/components";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(users[1]);

  /**
   * On user change
   */
  const onUserChange = (user) => {
    setSelectedUser(user);
  };
  return (
    <>
      <AdminBreadcrumb title="Chat" />
      <section>
        <div className="container">
          <div className="my-6 space-y-6">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <ChatUsers
                  onUserSelect={onUserChange}
                  selectedUser={selectedUser}
                />
              </div>
              {/* Chat Conversation */}
              <div className="lg:col-span-2">
                <ChatArea selectedUser={selectedUser} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Chat;
