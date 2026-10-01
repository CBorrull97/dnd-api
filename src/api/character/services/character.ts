/**
 * character service
 */

import { factories } from "@strapi/strapi";
import { errors } from "@strapi/utils";
import type { CharacterClass } from "../utils/character-class";
import { LeaderBoard } from "../utils/character-leaderBoard";

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

    async getLeaderBoard(): Promise<LeaderBoard[]> {
      const characters = await strapi.db
        .query("api::character.character")
        .findMany({
          limit: 5,
          orderBy: {
            experiencePoints: "desc",
            name: "asc",
          },
        });
      if (characters.length === 0) {
        return [];
      }
      const rankedCharacters: LeaderBoard[] = [];
      let rank = 1;
      for (const character of characters) {
        const rankedCharacter: LeaderBoard = {
          rank: rank,
          documentId: character.documentId,
          name: character.name,
          characterClass: character.characterClass,
          level: character.level,
          experiencePoints: character.experiencePoints,
        };
        rankedCharacters.push(rankedCharacter);
        rank++;
      }
      return rankedCharacters;
    },

    async equipArmor(characterDocumentId: string, armorDocumentId: string) {
      const character = await super.findOne(characterDocumentId, {
        populate: {
          armors: true,
        },
      });
      if (!character) {
        throw new errors.NotFoundError("Character not found");
      }
      const armor = await strapi
        .service("api::armor.armor")
        .findOne(armorDocumentId);
      if (!armor) {
        throw new errors.NotFoundError("Armor not found");
      }
      const armors = character.armors ?? [];
      let armorPossession = false;
      for (const ownedArmor of armors) {
        if (ownedArmor.documentId === armorDocumentId) {
          armorPossession = true;
        }
      }
      if (!armorPossession) {
        throw new errors.ValidationError("Character does not own this armor");
      }
      const updatedCharacter = await super.update(characterDocumentId, {
        data: {
          equippedArmor: armorDocumentId,
        },
        populate: {
          equippedArmor: true,
        },
      });
      return updatedCharacter;
    },
  }),
);
