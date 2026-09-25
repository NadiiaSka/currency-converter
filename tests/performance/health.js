import http from "k6/http";
import { check, sleep } from "k6";

const baseUrl = __ENV.BASE_URL || "http://127.0.0.1:5173";

export const options = {
  scenarios: {
    health_check_load: {
      executor: "constant-vus",
      vus: 5,
      duration: "30s",
    },
  },
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<200"],
  },
};

export default function () {
  const response = http.get(`${baseUrl}/api/health`);

  check(response, {
    "returns HTTP 200": (result) => result.status === 200,
    "returns healthy status": (result) =>
      result.status === 200 &&
      result.body !== null &&
      result.json("status") === "ok",
  });

  sleep(1);
}
