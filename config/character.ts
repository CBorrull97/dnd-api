import type { Core } from "@strapi/strapi";

const characterConfig = ({ env }: Core.Config.Shared.ConfigParams) => ({
  gameMasterKey: env("GAME_MASTER_KEY"),
});

export default characterConfig;
