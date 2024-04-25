import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteEmployee, listEmployees } from "../service/EmployeeService";

const ListEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployee();
  }, []);
  function getAllEmployee() {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function remove(id) {
    deleteEmployee(id)
      .then((response) => {
        getAllEmployee();
        console.log(id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function AddEmployee() {
    navigator("/add-employee");
  }
  function updateEmployee(id) {
    navigator(`/edit-employee/${id}`);
  }

  return (
    <div className="container">
      <h1 className="text-center">List of Employee</h1>
      <button className="btn btn-primary mb-3" onClick={AddEmployee}>
        Add Employee
      </button>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee Email </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>
                <button
                  className="btn btn-info"
                  type="submit"
                  onClick={() => updateEmployee(employee.id)}
                >
                  Update
                </button>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => remove(employee.id)}
                  style={{ marginLeft: "19px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployee;
