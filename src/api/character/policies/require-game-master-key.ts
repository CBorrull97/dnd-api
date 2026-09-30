import type { Core } from "@strapi/strapi";

const requireGameMasterKey: Core.PolicyHandler = (
  policyContext,
  _config,
  { strapi },
) => {
  const receivedKey = policyContext.request.headers["x-game-master-key"];

  const expectedKey = strapi.config.get<string | undefined>(
    "character.gameMasterKey",
  );
  return (
    typeof expectedKey === "string" &&
    expectedKey.length > 0 &&
    receivedKey === expectedKey
  );
};

export default requireGameMasterKey;
