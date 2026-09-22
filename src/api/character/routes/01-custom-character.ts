import type { Core } from "@strapi/strapi";

const routes: Core.RouterConfig = {
  type: "content-api",
  routes: [
    {
      method: "POST",
      path: "/characters/:documentId/level-up",
      handler: "api::character.character.levelUp",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};

export default routes;
