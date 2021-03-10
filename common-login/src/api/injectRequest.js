const API = {
  LOGIN: "/auth/login",
  COMPANIES: "/uaa/api/organization/area/companies",
  PROJECT_COMPANIES: "/uaa/api/organization/project/companies",
  SWITCH_TENANT: "/uaa/api/organization/tenant/switch",
};

export default (reqObj) => {
  reqObj.handleLogin = (username, password) =>
    reqObj
      .post(`${API.LOGIN}`, { username: username, password: password })
      .then((res) => Promise.resolve(res));

  reqObj.getCompanies = () =>
    reqObj.get(`${API.COMPANIES}`).then((res) => Promise.resolve(res));

  reqObj.getProjectCompanies = (areaCompanyId) =>
    reqObj
      .get(`${API.PROJECT_COMPANIES}`, { areaCompanyId })
      .then((res) => Promise.resolve(res));

  reqObj.switchTenant = (code) =>
    reqObj
      .put(`${API.SWITCH_TENANT}`, { code })
      .then((res) => Promise.resolve(res));
};
