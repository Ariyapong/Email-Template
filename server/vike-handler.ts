/// <reference lib="webworker" />
import { renderPage } from "vike/server";
import type { Request, Response, NextFunction } from "express";

// export async function vikeHandler<
//   Context extends Record<string | number | symbol, unknown>,
// >(request: Request, context?: Context): Promise<Response> {
export async function vikeHandler<
  Context extends Record<string | number | symbol, unknown>,
>(req: Request, res: Response, next: NextFunction): Promise<any> {
  const pageContextInit = {
    // ...context,
    urlOriginal: req.url,
    headersOriginal: req.headers,
  };
  const pageContext = await renderPage(pageContextInit);

  if (!pageContext.httpResponse) {
    return next();
  }
  const { headers, contentType } = pageContext.httpResponse;
  // headers.push(["Content-Type", contentType])
  // const { readable, writable } = new TransformStream();
  // response?.pipe(writable);
  res.status(200).type(contentType);
  pageContext.httpResponse.pipe(res);
  
  // return new Response(readable, {
  //   status: response?.statusCode,
  //   // headers: response?.headers,
  //   headers: headers,
  // });
}
