import type { Core } from "@strapi/strapi";

const routes: Core.RouterConfig = {
  type: "content-api",
  routes: [
    {
      method: "GET",
      path: "/campaigns/:documentId/summary",
      handler: "api::campaign.campaign.getSummary",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/campaigns/:documentId/top-character",
      handler: "api::campaign.campaign.getTopCharacter",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/campaigns/:documentId/close",
      handler: "api::campaign.campaign.close",
      config: {
        policies: ["api::character.require-game-master-key"],
        middlewares: [],
      },
    },
  ],
};

export default routes;
