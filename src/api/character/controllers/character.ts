/**
 * character controller
 */

import { factories } from "@strapi/strapi";
import { isCharacterClass } from "../utils/character-class";

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

    async search(ctx) {
      const { characterClass, minimumLevel } = ctx.query;
      if (typeof characterClass !== "string" || characterClass.length === 0) {
        return ctx.badRequest(
          "Query parameter characterClass is required and cannot be empty",
        );
      }
      if (!isCharacterClass(characterClass)) {
        return ctx.badRequest(
          "Query parameter characterClass must be a valid class",
        );
      }
      const parsedMinimumLevel = Number(minimumLevel);
      if (
        !Number.isInteger(parsedMinimumLevel) ||
        parsedMinimumLevel < 1 ||
        parsedMinimumLevel > 20
      ) {
        return ctx.badRequest(
          "Query parameter minimumLevel must be an integer number between 1 and 20",
        );
      }
      const results = await strapi
        .service("api::character.character")
        .search(characterClass, parsedMinimumLevel);
      const sanitizedResults = await this.sanitizeOutput!(results, ctx);
      return this.transformResponse!(sanitizedResults);
    },
    async getLeaderBoard() {
      const rankedCharacters = await strapi
        .service("api::character.character")
        .getLeaderBoard();
      return this.transformResponse!(rankedCharacters);
    },
  }),
);
