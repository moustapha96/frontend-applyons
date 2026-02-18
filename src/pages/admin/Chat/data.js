import avatar1 from "@/assets/images/avatars/img-1.jpg";
import avatar2 from "@/assets/images/avatars/img-2.jpg";
import avatar3 from "@/assets/images/avatars/img-3.jpg";
import avatar4 from "@/assets/images/avatars/img-4.jpg";
import avatar5 from "@/assets/images/avatars/img-5.jpg";
import avatar6 from "@/assets/images/avatars/img-6.jpg";
import avatar7 from "@/assets/images/avatars/img-7.jpg";
import avatar8 from "@/assets/images/avatars/img-8.jpg";
import avatar9 from "@/assets/images/avatars/img-9.jpg";

const users = [
  {
    id: 1,
    name: "Brandon Smith",
    avatar: avatar2,
    lastMessage: "How are you today?",
    totalUnread: 3,
    lastMessageOn: "4:30am",
  },
  {
    id: 2,
    name: "John Kish",
    avatar: avatar5,
    lastMessage: "typing...",
    totalUnread: 0,
    lastMessageOn: "5:30am",
  },
  {
    id: 3,
    name: "Dominic A",
    avatar: avatar4,
    lastMessage: "Are we going to have planning meeting today?",
    totalUnread: 2,
    lastMessageOn: "Thu",
  },
  {
    id: 4,
    name: "Ronda D",
    avatar: avatar9,
    lastMessage: "Please check these design assets..",
    totalUnread: 0,
    lastMessageOn: "Wed",
  },
  {
    id: 5,
    name: "Michael H",
    avatar: avatar6,
    lastMessage: "I something have awesome...",
    totalUnread: 6,
    lastMessageOn: "Tue",
  },
  {
    id: 6,
    name: "Thomas R",
    avatar: avatar7,
    lastMessage: "You and Tony Meet Today...",
    totalUnread: 0,
    lastMessageOn: "Tue",
  },
  {
    id: 7,
    name: "Thomas J",
    avatar: avatar8,
    lastMessage: "Howdy?",
    totalUnread: 0,
    lastMessageOn: "Tue",
  },
  {
    id: 8,
    name: "Rikcy J",
    avatar: avatar3,
    lastMessage: "Are you interested in learning?",
    totalUnread: 28,
    lastMessageOn: "Mon",
  },
  {
    id: 9,
    name: "Jonsy K",
    avatar: avatar8,
    lastMessage: "Howdy?",
    totalUnread: 0,
    lastMessageOn: "tue",
  },
];

const messages = [];

const defaultTo = {
  id: 9,
  name: "Diane B",
  avatar: avatar1,
};

for (const user of users) {
  messages.push(
    {
      id: 1,
      message: {
        type: "text",
        value: "Hello!",
      },
      to: defaultTo,
      from: user,
      sendOn: "10:00",
    },
    {
      id: 2,
      message: {
        type: "text",
        value: "Hi, How are you? What about our next meeting?",
      },
      to: user,
      from: defaultTo,
      sendOn: "10:01",
    },
    {
      id: 3,
      message: {
        type: "text",
        value: "Yeah everything is fine",
      },
      to: defaultTo,
      from: user,
      sendOn: "10:01",
    },
    {
      id: 4,
      message: {
        type: "text",
        value: "Awesome!",
      },
      to: user,
      from: defaultTo,
      sendOn: "10:02",
    },
    {
      id: 5,
      message: {
        type: "text",
        value: "Let's have it today if you are free",
      },
      to: defaultTo,
      from: user,
      sendOn: "10:03",
    },
    {
      id: 6,
      message: {
        type: "text",
        value: "Sure thing! let me know if 2pm works for you",
      },
      to: user,
      from: defaultTo,
      sendOn: "10:03",
    },
    {
      id: 7,
      message: {
        type: "text",
        value:
          "Sorry, I have another meeting scheduled at 2pm. Can we have it at 3pm instead?",
      },
      to: defaultTo,
      from: user,
      sendOn: "10:04",
    },
    {
      id: 8,
      message: {
        type: "text",
        value:
          "We can also discuss about the presentation talk format if you have some extra mins",
      },
      to: defaultTo,
      from: user,
      sendOn: "10:04",
    },
    {
      id: 9,
      message: {
        type: "text",
        value:
          "3pm it is. Sure, let's discuss about presentation format, it would be great to finalize today. I am attaching the last year format and assets here..",
      },
      to: user,
      from: defaultTo,
      sendOn: "10:05",
    },
    {
      id: 10,
      message: {
        type: "file",
        value: {
          file: "AeroPage-sketch.zip",
          size: "2.3MB",
        },
      },
      to: user,
      from: defaultTo,
      sendOn: "10:05",
    }
  );
}

export { users, messages };
