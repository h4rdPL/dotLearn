import { PlatformLayout } from "../../../templates/PlatformLayout";
import { Cta } from "../../../components/atoms/Button/Cta";
import { ClassInput } from "../../../components/atoms/Input/ClassInput";
import { useState } from "react";
import { getAuthTokenFromCookies } from "../../../utils/getAuthToken";
import { useNavigate } from "react-router-dom";

interface ButtonInterface {
  (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

export const AddToClassPage: React.FC = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState<string | any>();
  const handleClassCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCode(value);
  };

  const handleAddToClass: ButtonInterface = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const authToken = getAuthTokenFromCookies();

      const formData = new FormData();
      formData.append("classCode", code);

      await fetch(
        `https://localhost:7024/api/Class/JoinToClassByCode?classCode=${code}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          credentials: "include",
          body: formData,
        }
      ).then((r) => r.json());
      return navigate("/platform/class");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <PlatformLayout>
      <ClassInput
        type="text"
        onChange={handleClassCode}
        placeholder="Kod klasy np. 0E33ADDB"
      />
      <Cta
        style={{ alignSelf: "flex-start" }}
        label="Dołącz do klasy"
        onClick={handleAddToClass}
        isJobOffer
      />
    </PlatformLayout>
  );
};
