import mjml2html from "mjml";

export async function generateEmailTemplateHandler<
  Context extends Record<string | number | symbol, unknown>,
>(request: Request, _context?: Context): Promise<Response> {
  // In a real case, user-provided data should ALWAYS be validated with tools like zod
  const newTodo = (await request.json()) as { greetingText: string, name: string, meta: string };
  const {
    greetingText,
    name,
    meta
  } = newTodo;
  console.log("Received Email Generated huhu...", newTodo);

  const htmlOutput = mjml2html(`
      <mjml>
  <mj-body background-color="#eee">
    <mj-section>
      <mj-column>
        <mj-image width="100px" src="/assets/img/logo-small.png"></mj-image>

        <mj-divider border-color="#F45E43"></mj-divider>

        <mj-text font-size="20px" color="#F45E43" font-family="helvetica">${greetingText ?? 'HelloBoi'}</mj-text>
        <mj-text font-size="20px" color="#0000FE" font-family="helvetica">${name ?? 'DefaultName!!'}</mj-text>
        <mj-text font-size="20px" color="#EF0555" font-family="helvetica">${meta ?? 'DefaultMeta!!'}</mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
    `);

  /*
  Print the responsive HTML generated and MJML errors if any
*/
  // console.log(htmlOutput);

  return new Response(
    JSON.stringify({
      status: "OK Email Generated ✅",
      requestedData: newTodo,
      htmlOutput: htmlOutput,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
