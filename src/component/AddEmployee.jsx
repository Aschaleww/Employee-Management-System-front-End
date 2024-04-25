import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../service/EmployeeService";

const AddEmployee = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: " ",
    email: " ",
  });
  const { id } = useParams();
  const navigator = useNavigate();
  function Cancel() {
    navigator("/employee");
  }

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setfirstName(response.data.firstName),
            setlastName(response.data.lastName),
            setEmail(response.data.email);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  function SaveorUpdateEmployee(e) {
    e.preventDefault();

    if (validateForm()) {
      const employee = { firstName, lastName, email };
      // console.log(employee);

      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employee");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createEmployee(employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employee");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }
  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "firstname is required";
      valid = false;
    }
    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "LastName id required";
      valid = false;
    }
    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "email is required";
      valid = false;
    }
    setErrors(errorsCopy);
    return valid;
  }

  function Title() {
    if (id) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      <h2 className="text-center">Add Employee</h2>;
    }
  }

  return (
    <div className="container">
      <br></br> <br></br>
      <div className="row ">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {Title()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">FirstName</label>
                <input
                  type="text"
                  placeholder="firstName"
                  name="firstName"
                  value={firstName}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setfirstName(e.target.value)}
                ></input>
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">LastName</label>
                <input
                  type="text"
                  placeholder="lastName"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setlastName(e.target.value)}
                ></input>
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  placeholder="email"
                  name="email"
                  value={email}
                  className={`form-control ${
                    errors.email ? "is-invalid" : " "
                  }`}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                {errors.email && (
                  <div className="invalid-feedback"> {errors.email}</div>
                )}
              </div>
              <button
                className="btn btn-success"
                onClick={SaveorUpdateEmployee}
              >
                Submit
              </button>
              <button
                className="btn btn-danger"
                onClick={Cancel}
                style={{ marginLeft: "19px" }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
