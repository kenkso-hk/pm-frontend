var apiURL = import.meta.env.VITE_APP_API_URL;

const genericRequestJson = () => {
  return {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("JWT"),
    },
    referrerPolicy: "no-referrer",
  };
};

const genericRequestJsonNoJWT = () => {
  return {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    referrerPolicy: "no-referrer",
  };
};

const Api = {
  auth: {
    login: (data) => {
      return fetch(apiURL + "/auth/login", {
        ...genericRequestJson(),
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    forgotPassword: (data) => {
      return fetch(apiURL + "/auth/forgot-pass", {
        ...genericRequestJson(),
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    confirmForgotPassword: (data) => {
      return fetch(apiURL + "/auth/confirm-forgot-pass/", {
        ...genericRequestJsonNoJWT(),
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    verifyEmail: (data) => {
      return fetch(apiURL + "/auth/verify-email/", {
        ...genericRequestJsonNoJWT(),
        method: "POST",
        body: JSON.stringify(data),
      });
    },
  },
  users: {
    create: (data) => {
      return fetch(apiURL + "/user/", {
        ...genericRequestJson(),
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    get: (id) => {
      return fetch(apiURL + "/user/" + id, genericRequestJson());
    },
    getMyUser: () => {
      return fetch(apiURL + "/user/my-user", genericRequestJson());
    },
    list: () => {
      return fetch(apiURL + "/user/", genericRequestJson());
    },
    update: (id, data) => {
      return fetch(apiURL + "/user/" + id, {
        ...genericRequestJson(),
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
  },
  landlord: {
    create: (data) => {
      return fetch(apiURL + "/landlord/", {
        ...genericRequestJson(),
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    get: (id) => {
      return fetch(apiURL + "/landlord/" + id, genericRequestJson());
    },
    getMyLandlord: () => {
      return fetch(apiURL + "/landlord/my-landlord", genericRequestJson());
    },
    list: () => {
      return fetch(apiURL + "/landlord/", genericRequestJson());
    },
    update: (id, data) => {
      return fetch(apiURL + "/landlord/" + id, {
        ...genericRequestJson(),
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
  },
  complex: {
    create: (data) => {
      return fetch(apiURL + "/complex/", {
        ...genericRequestJson(),
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    get: (id) => {
      return fetch(apiURL + "/complex/" + id, genericRequestJson());
    },
    list: (query = "") => {
      return fetch(apiURL + "/complex" + query, genericRequestJson());

    },
    update: (id, data) => {
      return fetch(apiURL + "/complex/" + id, {
        ...genericRequestJson(),
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
  },
  unit: {
    create: (data) => {
      return fetch(apiURL + "/unit/", {
        ...genericRequestJson(),
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    get: (id) => {
      return fetch(apiURL + "/unit/" + id, genericRequestJson());
    },
    list: () => {
      return fetch(apiURL + "/unit/", genericRequestJson());
    },
    update: (id, data) => {
      return fetch(apiURL + "/unit/" + id, {
        ...genericRequestJson(),
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
  },
  application: {
    create: (data) => {
      return fetch(apiURL + "/application/", {
        ...genericRequestJson(),
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    get: (id) => {
      return fetch(apiURL + "/application/" + id, genericRequestJson());
    },
    list: (query) => {
      if (query) return fetch(apiURL + "/application" + query, genericRequestJson());
      else return fetch(apiURL + "/application/", genericRequestJson());

    },
    update: (id, data) => {
      return fetch(apiURL + "/application/" + id, {
        ...genericRequestJson(),
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
  },
  survey: {
    create: (data) => {
      return fetch(apiURL + "/survey/", {
        ...genericRequestJson(),
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    get: (id) => {
      return fetch(apiURL + "/survey/" + id, genericRequestJson());
    },
    list: () => {
      return fetch(apiURL + "/survey/", genericRequestJson());
    },
    update: (id, data) => {
      return fetch(apiURL + "/survey/" + id, {
        ...genericRequestJson(),
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
  },
};

export default Api;
