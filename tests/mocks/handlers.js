import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://api.fxratesapi.com/latest", ({ request }) => {
    const url = new URL(request.url);
    const base = url.searchParams.get("base");
    const currencies = url.searchParams.get("currencies");
    const amount = Number(url.searchParams.get("amount") || 0);

    if (base === "USD" && currencies === "UAH") {
      return HttpResponse.json({
        rates: {
          UAH: amount * 38.2,
        },
      });
    }

    if (base === "USD" && currencies === "EUR") {
      return HttpResponse.json({
        rates: {
          EUR: amount * 0.92,
        },
      });
    }

    return HttpResponse.json({
      rates: {
        UAH: amount,
      },
    });
  }),
];
