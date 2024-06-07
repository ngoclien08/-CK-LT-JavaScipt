import styled from "styled-components";
export const LoginContainer = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
  margin: auto;
  margin-top: 100px;

  @media (max-width: 768px) {
    width: 80%;
  }
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin: 10px 0;
  font-weight: bold;
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 16px;
`;

export const Button = styled.button`
  padding: 12px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #218838;
  }
`;
