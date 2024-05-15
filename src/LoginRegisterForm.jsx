import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { registerUserAPI, loginAPI } from '../Services/allAPIs';
import Swal from 'sweetalert2';
import './LoginRegisterForm.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function LoginRegisterForm({ setIsAuthenticated }) {
  const [isRegistered, setIsRegistered] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [validated, setValidated] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    // Simulate registration process
    const userData = { name, email, password };
    console.log("Registering user:", { name, email, password });
    const result = await registerUserAPI(userData);
    console.log(result);
    if (result.status === 200) {
      Swal.fire({
        title: 'Success',
        text: 'Successfully Registered',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      setIsRegistered(true);
    }
    else if (result.response.status === 406) {
      Swal.fire({
        title: 'Failed',
        text: result.response.data,
        icon: 'error',
        confirmButtonText: 'Back'
      });
    }

  };

  const handleLogin = async (event) => {
    event.preventDefault();
    // Simulate login process
    const userData = { email, password };
    console.log("Logging in user:", { email, password });
    const result = await loginAPI(userData);
    console.log(result);
    if (result.status == 200) {
      sessionStorage.setItem("name", result.data.existingUser.name)
      sessionStorage.setItem("email", result.data.existingUser.email)
      sessionStorage.setItem("token", result.data.token)

      Swal.fire({
        title: 'Success',
        text: 'Login Successfull',
        icon: 'success',
        confirmButtonText: 'Ok'
      });

      setIsAuthenticated(true); // Simulate successful login
    }
    else if (result.response.status == 404) {
      Swal.fire({
        title: 'Failed',
        text: result.response.data,
        icon: 'error',
        confirmButtonText: 'Back'
      });
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (isRegistered) {
        handleLogin(event);
      } else {
        handleRegister(event);
      }
    }

    setValidated(true);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} xs={12}>
          <div className="form-box">
            {isRegistered ? (
              <>
                <h4 className='text-center'>Login</h4>
                <p className='text-center'><i>Welcome back! Please sign in to continue.</i></p>
              </>
            ) : (
              <>
                <h4 className='text-center'>Register</h4>
                <p className='text-center'><i>Join our community today! Create an account to get started.</i></p>
              </>
            )}
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="mt-3">
              {!isRegistered && (
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide your name.
                  </Form.Control.Feedback>
                </Form.Group>
              )}

              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <div className="password-input">
                  <Form.Control
                    required
                    type={showPassword ? "text" : "password"} // Ternary operator to toggle password visibility
                    placeholder="Password"
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Icon for toggling password visibility */}
                  </span>

                </div>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid password. (Min 6 characters)
                </Form.Control.Feedback>
              </Form.Group>


              <Button variant="primary" className='mt-2' type="submit" block>
                {isRegistered ? 'Login' : 'Register'}
              </Button>
            </Form>

            <div className="mt-3">
              {isRegistered ? (
                <p>
                  New here? <span onClick={() => setIsRegistered(false)} style={{ color: 'blue', cursor: 'pointer' }}>Register here</span>
                </p>
              ) : (
                <p>
                  Already registered? <span onClick={() => setIsRegistered(true)} style={{ color: 'blue', cursor: 'pointer' }}>Login here</span>
                </p>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginRegisterForm;
