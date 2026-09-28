import type { Core } from "@strapi/strapi";

const auditCharacterAction: Core.MiddlewareFactory = (_config, { strapi }) => {
  return async (ctx, next) => {
    const start = Date.now();
    try {
      await next();
    } catch (error) {
      const durationMilliseconds = Date.now() - start;

      strapi.log.error(
        `Character request failed: ${ctx.method} ${ctx.path} (${durationMilliseconds} ms)`,
        error,
      );
      throw error;
    }
    const durationMilliseconds = Date.now() - start;
    strapi.log.info(
      `Character Action: ${ctx.method} ${ctx.path} (${durationMilliseconds} ms) ${ctx.status}`,
    );
  };
};
export default auditCharacterAction;
