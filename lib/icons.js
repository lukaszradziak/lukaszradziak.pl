import dynamic from "next/dynamic";

const icons = {
  Laravel: dynamic(() => import("simple-icons/icons/laravel.svg")),
  React: dynamic(() => import("simple-icons/icons/react.svg")),
  Mysql: dynamic(() => import("simple-icons/icons/mysql.svg")),
  Prisma: dynamic(() => import("simple-icons/icons/prisma.svg")),
  Php: dynamic(() => import("simple-icons/icons/php.svg")),
  Javascript: dynamic(() => import("simple-icons/icons/javascript.svg")),
  Arduino: dynamic(() => import("simple-icons/icons/arduino.svg")),
  Threedotjs: dynamic(() => import("simple-icons/icons/threedotjs.svg")),
  Proxmox: dynamic(() => import("simple-icons/icons/proxmox.svg")),
  Wordpress: dynamic(() => import("simple-icons/icons/wordpress.svg")),
  Laravelnova: dynamic(() => import("simple-icons/icons/laravelnova.svg")),
  Pusher: dynamic(() => import("simple-icons/icons/pusher.svg")),
  Cplusplus: dynamic(() => import("simple-icons/icons/cplusplus.svg")),
  Datocms: dynamic(() => import("simple-icons/icons/datocms.svg")),
  Nextdotjs: dynamic(() => import("simple-icons/icons/nextdotjs.svg")),
};

export default icons;
