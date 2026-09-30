import type { Modules } from "@strapi/strapi";

const cronTasks: Modules.Cron.CronTasks = {
  countActiveCampaigns: {
    task: async ({ strapi }) => {
      const activeCampaigns = await strapi
        .service("api::campaign.campaign")
        .countActive();
      strapi.log.info("Number of active Campaigns: " + activeCampaigns);
    },
    options: "0 0 * * *",
  },
};

export default cronTasks;
