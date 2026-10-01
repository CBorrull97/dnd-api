/**
 * campaign controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::campaign.campaign",
  ({ strapi }) => ({
    async getSummary(ctx) {
      const { documentId } = ctx.params;
      const campaignSummary = await strapi
        .service("api::campaign.campaign")
        .getSummary(documentId);
      if (campaignSummary === undefined) {
        return ctx.notFound("Campaign not found");
      }
      return this.transformResponse!(campaignSummary);
    },

    async getTopCharacter(ctx) {
      const { documentId } = ctx.params;
      const topCharacter = await strapi
        .service("api::campaign.campaign")
        .getTopCharacter(documentId);
      if (topCharacter === undefined) {
        return ctx.notFound("Campaign not found");
      }
      if (topCharacter === null) {
        return {
          data: null,
          meta: {},
        };
      }
      return this.transformResponse!(topCharacter);
    },

    async close(ctx) {
      const { documentId } = ctx.params;
      const updatedCampaign = await strapi
        .service("api::campaign.campaign")
        .close(documentId);
      const sanitizedCampaign = await this.sanitizeOutput!(
        updatedCampaign,
        ctx,
      );
      return this.transformResponse!(sanitizedCampaign);
    },
  }),
);
