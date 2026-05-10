
import { InputConteiner } from "./styles";

export const Input = ({value}) => {
  return (
    <InputConteiner>
      <input disabled value={value}/>
    </InputConteiner>
  );
};

export default Input;
