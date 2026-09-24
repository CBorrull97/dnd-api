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
  ],
};

export default routes;
