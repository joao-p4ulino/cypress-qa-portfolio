/**
 * API testing showcase using cy.request (no browser UI).
 * AutomationExercise exposes a public REST API at /api/*.
 * This spec demonstrates:
 *  - GET requests and status code assertion
 *  - Response body schema validation
 *  - POST with form data
 *  - Error case handling (404-equivalent responses)
 *
 * Note: the API returns Content-Type: text/html so Cypress does not auto-parse
 * the response body as JSON — manual JSON.parse is required.
 */

const BASE_API = 'https://automationexercise.com/api';

const parseBody = (body: unknown) =>
  typeof body === 'string' ? JSON.parse(body) : (body as Record<string, unknown>);

describe('AutomationExercise — Products API', () => {
  describe('GET /productsList', () => {
    it('returns HTTP 200', () => {
      cy.request('GET', `${BASE_API}/productsList`).then((response) => {
        expect(response.status).to.eq(200);
      });
    });

    it('returns a JSON body with a products array', () => {
      cy.request('GET', `${BASE_API}/productsList`).then((response) => {
        const body = parseBody(response.body);
        expect(body).to.have.property('products');
        expect(body.products).to.be.an('array');
        expect((body.products as unknown[]).length).to.be.greaterThan(0);
      });
    });

    it('each product has id, name, price, brand, category', () => {
      cy.request('GET', `${BASE_API}/productsList`).then((response) => {
        const body = parseBody(response.body);
        const firstProduct = (body.products as Record<string, unknown>[])[0];
        expect(firstProduct).to.have.all.keys('id', 'name', 'price', 'brand', 'category');
      });
    });
  });

  describe('GET /brandsList', () => {
    it('returns HTTP 200', () => {
      cy.request('GET', `${BASE_API}/brandsList`).then((response) => {
        expect(response.status).to.eq(200);
      });
    });

    it('returns a JSON body with a brands array', () => {
      cy.request('GET', `${BASE_API}/brandsList`).then((response) => {
        const body = parseBody(response.body);
        expect(body).to.have.property('brands');
        expect(body.brands).to.be.an('array');
      });
    });
  });

  describe('POST /searchProduct', () => {
    it('returns products matching the search term', () => {
      cy.request({
        method: 'POST',
        url: `${BASE_API}/searchProduct`,
        form: true,
        body: { search_product: 'top' },
      }).then((response) => {
        expect(response.status).to.eq(200);
        const body = parseBody(response.body);
        expect(body.products).to.be.an('array');
        expect((body.products as unknown[]).length).to.be.greaterThan(0);
      });
    });

    it('returns response code 400 when search_product param is missing', () => {
      cy.request({
        method: 'POST',
        url: `${BASE_API}/searchProduct`,
        form: true,
        body: {},
        failOnStatusCode: false,
      }).then((response) => {
        const body = parseBody(response.body);
        expect(body.responseCode).to.eq(400);
      });
    });
  });

  describe('POST /verifyLogin', () => {
    it('returns 400 response code when credentials are missing', () => {
      cy.request({
        method: 'POST',
        url: `${BASE_API}/verifyLogin`,
        form: true,
        body: {},
        failOnStatusCode: false,
      }).then((response) => {
        const body = parseBody(response.body);
        expect(body.responseCode).to.eq(400);
      });
    });

    it('returns 404 response code for unregistered user', () => {
      cy.request({
        method: 'POST',
        url: `${BASE_API}/verifyLogin`,
        form: true,
        body: {
          email: 'notexisting@test.com',
          password: 'wrongpassword',
        },
        failOnStatusCode: false,
      }).then((response) => {
        const body = parseBody(response.body);
        expect(body.responseCode).to.eq(404);
      });
    });
  });

  describe('DELETE /deleteAccount (method not allowed)', () => {
    it('returns a non-success HTTP status for GET on delete endpoint', () => {
      cy.request({
        method: 'GET',
        url: `${BASE_API}/deleteAccount`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.gte(400);
      });
    });
  });
});
