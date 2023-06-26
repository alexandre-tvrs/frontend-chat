import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Solicitations from "views/examples/Solicitations.js";
import Groups from "views/examples/Groups.js";
import Group from "views/examples/Group.js";
import Chat from "views/examples/Chat.js";

var routes = [
  {
    path: "/group/:id/timeline",
    name: "Timeline",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/groups",
    name: "Grupos",
    icon: "ni ni-books text-green",
    component: <Groups />,
    layout: "/admin",
  },
  {
    path: "/solicitations",
    name: "Solicitações",
    icon: "ni ni-books text-green",
    component: <Solicitations />,
    layout: "/admin",
  },
  {
    path: "/group/new",
    name: "Novo Grupo",
    icon: "ni ni-books text-green",
    component: <Group />,
    layout: "/admin",
  },
  {
    path: "/group/:id",
    name: "Grupo",
    icon: "ni ni-books text-green",
    component: <Group />,
    layout: "/admin",
  },
  {
    path: "/group/:id/chat",
    name: "Chat",
    icon: "ni ni-laptop text-orange",
    component: <Chat />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Registro",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
];
export default routes;
