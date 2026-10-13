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
        policies: ["api::character.require-game-master-key"],
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
    {
      method: "POST",
      path: "/characters/:documentId/equip-armor",
      handler: "api::character.character.equipArmor",
      config: {
        policies: ["api::character.require-game-master-key"],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/characters/:documentId/transfer-campaign",
      handler: "api::character.character.transferCampaign",
      config: {
        policies: ["api::character.require-game-master-key"],
        middlewares: ["api::character.audit-character-action"],
      },
    },
  ],
};

export default routes;
