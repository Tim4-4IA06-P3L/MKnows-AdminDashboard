import { BetaAnalyticsDataClient } from "@google-analytics/data";

interface PageData {
  Title: string;
  Views: number;
}

export async function GET() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const base64EncodedServiceAccount =
    process.env.GOOGLE_CREDENTIALS_JSON_ENCODED || "";
  const decodedServiceAccount = Buffer.from(
    base64EncodedServiceAccount,
    "base64"
  ).toString("utf-8");
  const credentials = JSON.parse(decodedServiceAccount);

  const analyticsDataClient = new BetaAnalyticsDataClient({ credentials });
  const pageData: PageData[] = [];
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${process.env.PROPERTY_ID}`,
    dateRanges: [
      {
        startDate: sevenDaysAgo.toISOString().split("T")[0],
        endDate: "today",
      },
    ],
    dimensions: [{ name: "pageTitle" }],
    metrics: [{ name: "screenPageViews" }],
    orderBys: [
      {
        metric: {
          metricName: "screenPageViews",
        },
        desc: true,
      },
    ],
  });

  if (response.rows) {
    response.rows.forEach((row, index) => {
      if (index < 5) {
        const pageTitleValue = row.dimensionValues || [];
        const numViews = row.metricValues || [];
        const dataRow: PageData = { Title: "", Views: 0 };
        dataRow.Title =
          pageTitleValue[0].value?.replace(" - M-Knows Consulting", "") || "";
        dataRow.Views = parseInt(numViews[0].value || "0");
        pageData.push(dataRow);
      }
    });

    return new Response(
      JSON.stringify({
        data: pageData,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } else {
    return new Response(
      JSON.stringify({
        data: [],
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
