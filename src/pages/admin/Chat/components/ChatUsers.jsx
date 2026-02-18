import { cn } from "@/utils";
import { users } from "../data";

const ChatUsers = ({ onUserSelect, selectedUser }) => {
  /**
   * Activates the user
   * @param {*} user
   */
  const activateUser = (user) => {
    if (onUserSelect) {
      onUserSelect(user);
    }
  };
  return (
    <div className="overflow-hidden rounded-xl border border-default-200 bg-white dark:bg-default-50 lg:min-w-96">
      <div className="border-b border-default-200 px-6 py-4">
        <h6 className="text-lg font-medium text-default-900">Contacts</h6>
      </div>
      <div className="h-[calc(100vh-370px)] divide-y divide-default-200 overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-default-300 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1">
        {users.map((user, idx) => {
          return (
            <div
              className="cursor-pointer"
              onClick={() => {
                activateUser(user);
              }}
              key={idx}
            >
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3",
                  selectedUser === user && "bg-default-100"
                )}
              >
                <img
                  src={user.avatar}
                  className="h-10 rounded-full"
                  alt="Apply Ons"
                />
                <div className="w-full">
                  <div className="flex justify-between">
                    <h6 className="text-default-900">{user.name}</h6>
                    <small className="text-default-400">
                      {user.lastMessageOn}
                    </small>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-light text-default-400">
                      {user.lastMessage}
                    </span>
                    <span>
                      {user.totalUnread !== 0 && (
                        <span className="rounded-full bg-red-500/25 px-1 py-0.5 text-xs text-red-500">
                          {user.totalUnread}
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatUsers;
