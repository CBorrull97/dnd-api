/**
 * campaign service
 */

import { factories } from "@strapi/strapi";
import type { CampaignSummary } from "../utils/campaign-summary";

export default factories.createCoreService(
  "api::campaign.campaign",
  ({ strapi }) => ({
    async getSummary(documentId: string): Promise<CampaignSummary | undefined> {
      const campaign = await strapi
        .documents("api::campaign.campaign")
        .findOne({
          documentId: documentId,
          populate: {
            characters: true,
          },
        });
      if (!campaign) {
        return undefined;
      }
      if (typeof campaign.name !== "string") {
        throw new Error("Campaign has no valid name");
      }
      const characters = campaign.characters ?? [];
      const campaignSummary: CampaignSummary = {
        documentId: documentId,
        name: campaign.name,
        characterCount: characters.length,
        averageLevel: 0,
      };
      if (characters.length === 0) {
        campaignSummary.averageLevel = 0;
      } else {
        let total = 0;
        for (const character of characters) {
          if (typeof character.level !== "number") {
            throw new Error("Character has no valid level");
          }
          total += character.level;
        }
        const averageLevel = Math.round((total / characters.length) * 10);
        campaignSummary.averageLevel = averageLevel / 10;
      }
      return campaignSummary;
    },

    async countActive() {
      return strapi.documents("api::campaign.campaign").count({
        filters: {
          active: true,
        },
      });
    },
  }),
);
