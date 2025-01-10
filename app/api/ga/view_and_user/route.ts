import { BetaAnalyticsDataClient } from "@google-analytics/data";

interface Data {
	date: string,
	Views: number,
	Users: number,
};

export async function GET() {

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const analyticsDataClient = new BetaAnalyticsDataClient();
  const data: Data[] = [];
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${process.env.PROPERTY_ID}`,
    dateRanges: [
      {
        startDate: sevenDaysAgo.toISOString().split('T')[0],
        endDate: "today",
      },
    ],
    dimensions: [{ name: "date" }],
    metrics: [{ name: "screenPageViews" }, { name: "activeUsers" }],
    orderBys: [
      {
        dimension: {
          dimensionName: "date",
        },
      },
    ],
  });

  if (response.rows) {
    response.rows.forEach((row) => {
      const dateValue = row.dimensionValues || [];
      const metricValues = row.metricValues || [];
      const dataRow: Data = { date: "", Views: 0, Users: 0 };

      if (dateValue.length > 0) {
        dataRow.date = `${dateValue[0].value?.slice(6, 8)}-${dateValue[0].value?.slice(4, 6)}`;

        if (metricValues.length > 0) {
          dataRow.Views = parseInt(metricValues[0].value || "0");
          dataRow.Users = parseInt(metricValues[1].value || "0");
        }
        data.push(dataRow);
      }
    });

    return new Response(JSON.stringify({
      data: data
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } else {
    return new Response(JSON.stringify({
      data: []
    }), {
      status: 400,
      headers: {
        "Content-Type": "application/json"
      }
    });
  };
}