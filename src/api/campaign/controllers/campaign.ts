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
  }),
);
