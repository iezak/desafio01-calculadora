import { ButtonConteiner } from "./styles";

export const Button = ({ label, onClick, size }) => {
  return (
    <ButtonConteiner onClick={onClick} $size={size}>
      {label}
    </ButtonConteiner>
  );
};

export default Button;