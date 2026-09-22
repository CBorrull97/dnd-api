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
  }),
);
