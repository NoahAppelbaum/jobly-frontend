const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 *
 */

class JoblyApi {

  static token = "";

  static async request(endpoint, data = {}, method = "GET") {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    const headers = {
      authorization: `Bearer ${JoblyApi.token}`,
      'content-type': 'application/json',
    };

    url.search = (method === "GET")
      ? new URLSearchParams(data).toString()
      : "";

    // set to undefined since the body property cannot exist on a GET method
    const body = (method !== "GET")
      ? JSON.stringify(data)
      : undefined;

    const resp = await fetch(url, { method, body, headers });

    //fetch API does not throw an error, have to dig into the resp for msgs
    if (!resp.ok) {
      console.error("API Error:", resp.statusText, resp.status);
      const { error } = await resp.json();
      throw Array.isArray(error) ? error : [error];
    }

    return await resp.json();
  }

  // Individual API routes

  /****************************** Company Routes */

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get information on all companies, filterable */

  static async getCompanies(filters = {}) {
    let res = await this.request("companies", filters);
    return res.companies;
  }

  /******************************* Job Routes */

  /** Get information on all jobs, filterable */

  static async getJobs(filters = {}) {
    let res = await this.request("jobs", filters);
    return res.jobs;
  }

  /******************************** Auth Routes */

  /** Attempts to log in a user
   * Accepts { username, password }
   * returns JWT token or { errors }
   */

  static async login(loginDetails) {
    let res = await this.request("auth/token", loginDetails, "POST");
    return res.token;
  }

  /** Register a new user
   * Accepts { username, password, firstName, lastName, email }
   * returns JWT or { errors }
   */

  static async register(user) {
    let res = await this.request("auth/register", user, "POST");
    return res.token;
  }

  /******************************** User Routes */

  /** gets user data
   * Accepts (string) username
   * returns { username, firstName, lastName, isAdmin, jobs }
   *    where jobs is { id, title, companyHandle, companyName, state }
   */

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res;
  }

  /** updates a user
   * Accepts (string) username and
   *  updateData (can include:{ firstName, lastName, password, email })
   * returns { username, firstName, lastName, email, isAdmin }
  */

  static async updateUser(username, updateData) {
    let res = await this.request(`users/${username}`, updateData, "PATCH");
    return res.user;
  }

  /** makes job application for user, based on jobId */

  static async applyForJob(username, jobId) {
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "POST");
    return res;
  }
}

export default JoblyApi;
