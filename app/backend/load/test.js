import http from 'k6/http';
import { check, sleep } from 'k6';

// The options object configures the load test.
export const options = {
  scenarios: {
    // A scenario to simulate a constant arrival rate of users.
    contacts_scenario: {
      executor: 'constant-arrival-rate',

      // Number of iterations to start per timeUnit.
      // This means we'll start 100 iterations (users) every second.
      rate: 100,

      // The time unit for the rate.
      timeUnit: '1s',

      // Total duration of the test.
      duration: '2m',

      // VUs to pre-allocate before the test starts.
      preAllocatedVUs: 100,

      // Maximum number of VUs to use.
      // K6 will scale up VUs as needed to meet the target rate.
      maxVUs: 200,
    },
  },
  // Thresholds are pass/fail criteria for the test.
  thresholds: {
    'http_req_failed': ['rate<0.01'], // http errors should be less than 1%
    'http_req_duration': ['p(95)<200'], // 95% of requests should be below 200ms
  },
};

// The default function is the entry point for the virtual users.
// K6 will execute this function for each iteration.
export default function () {
  // Read BASE_URL from an environment variable, or default to localhost.
  const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

  // Example GET request.
  const res = http.get(`${BASE_URL}/booking/availableRooms?hotelId=47c1082c-2fa6-11f0-819b-325096b39f47&startDate=2025-01-16&endDate=2025-01-20`);

  // Check if the request was successful.
  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  // Optional: add a sleep to simulate user think time.
  // With constant-arrival-rate, this doesn't affect the RPS,
  // but it does affect the number of concurrent VUs needed.
  sleep(1);
}
