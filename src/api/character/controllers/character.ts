/**
 * character controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::character.character",
  ({ strapi }) => ({
    async levelUp(ctx) {
      const { documentId } = ctx.params;
      const updatedCharacter = await strapi
        .service("api::character.character")
        .levelUp(documentId);
      const sanitizedCharacter = await this.sanitizeOutput!(
        updatedCharacter,
        ctx,
      );
      return this.transformResponse!(sanitizedCharacter);
    },
    async awardExperience(ctx) {
      const { documentId } = ctx.params;

      const points = ctx.request.body?.data?.points;
      if (
        typeof points !== "number" ||
        !Number.isInteger(points) ||
        points <= 0
      ) {
        return ctx.badRequest(
          "Points must be an integer number greater than 0",
        );
      }
      const awardedExperience = await strapi
        .service("api::character.character")
        .awardExperience(documentId, points);
      const sanitizedCharacter = await this.sanitizeOutput!(
        awardedExperience,
        ctx,
      );
      return this.transformResponse!(sanitizedCharacter);
    },
  }),
);
