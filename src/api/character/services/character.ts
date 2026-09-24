/**
 * character service
 */

import { factories } from "@strapi/strapi";
import { errors } from "@strapi/utils";
import type { CharacterClass } from "../utils/character-class";

export default factories.createCoreService(
  "api::character.character",
  ({ strapi }) => ({
    async levelUp(characterDocumentId: string) {
      const character = await super.findOne(characterDocumentId);
      if (!character) {
        throw new errors.NotFoundError("Character not found");
      }
      if (character.level >= 20) {
        throw new errors.ValidationError("Character is already at max level");
      }
      const updatedCharacter = await super.update(characterDocumentId, {
        data: {
          level: character.level + 1,
        },
      });
      return updatedCharacter;
    },
    async awardExperience(characterDocumentId: string, points: number) {
      const character = await super.findOne(characterDocumentId);
      if (!character) {
        throw new errors.NotFoundError("Character not found");
      }
      const updatedCharacter = await super.update(characterDocumentId, {
        data: {
          experiencePoints: character.experiencePoints + points,
        },
      });
      return updatedCharacter;
    },

    async search(characterClass: CharacterClass, minimumLevel: number) {
      const characters = await strapi
        .documents("api::character.character")
        .findMany({
          filters: {
            characterClass: characterClass,
            level: {
              $gte: minimumLevel,
            },
          },
          sort: {
            level: "asc",
          },
        });
      return characters;
    },
  }),
);
