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
        middlewares: ["api::character.audit-character-action"],
      },
    },
    {
      method: "POST",
      path: "/characters/:documentId/award-experience",
      handler: "api::character.character.awardExperience",
      config: {
        policies: [],
        middlewares: ["api::character.audit-character-action"],
      },
    },
    {
      method: "GET",
      path: "/characters/search",
      handler: "api::character.character.search",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/characters/leaderboard",
      handler: "api::character.character.getLeaderBoard",
      config: {
        policies: [],
        middlewares: ["api::character.response-time"],
      },
    },
  ],
};

export default routes;
