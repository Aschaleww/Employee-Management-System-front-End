import React from "react";
import axios from "axios";

const REST_BASE_URI = "http://localhost:8082/api/v1";

export const listEmployees = () => axios.get(REST_BASE_URI);
export const createEmployee = (employee) => {
  return axios.post(REST_BASE_URI, employee);
};

export const getEmployee = (employeeId) => {
  return axios.get(REST_BASE_URI + "/" + employeeId);
};
export const updateEmployee = (id, employee) => {
  return axios.put(REST_BASE_URI + "/" + id, employee);
};

export const deleteEmployee = (id) => {
  return axios.delete(REST_BASE_URI + "/" + id);
};
