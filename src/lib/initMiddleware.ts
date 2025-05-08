// lib/init-middleware.js
/* eslint-disable @typescript-eslint/no-explicit-any */

export default function initMiddleware(middleware: any) {
  return (req: any, res: any) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result: any) => {
        return result instanceof Error ? reject(result) : resolve(result);
      });
    });
}
