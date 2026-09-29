import type { Core } from "@strapi/strapi";

const responseTime: Core.MiddlewareFactory = () => {
  return async (ctx, next) => {
    const start = Date.now();
    await next();
    const durationMilliseconds = Date.now() - start;
    ctx.set("X-Response-Time-Ms", `${durationMilliseconds}`);
  };
};
export default responseTime;
