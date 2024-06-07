import { Routes, Route } from "react-router-dom";

import AccountBox from "./scenes/accountBox/accountBox";
import Homepage from "./scenes/homepage/homepage";
import Base from "./scenes/Base/Base";
import UserEdit from "./scenes/userEdit/userEdit";
import { CHECK_ACCESS } from "./api/handleCheckAccess";
import { useQuery } from "@tanstack/react-query";
import UserMusic from "./scenes/userMusic/userMusic";
function App() {
  const CHECKACCESS = useQuery({
    queryKey: ["Access"],
    queryFn: async () => {
      const result = await CHECK_ACCESS();
      return result; // Ensure the result is returned
    },
  });
  return (
    <Routes>
      <Route path="/" element={<AccountBox />} />
      <Route
        path="/Homepage"
        element={
          <Base>
            <Homepage />
          </Base>
        }
      />
      <Route
        path="/my-music"
        element={
          <Base>
            <UserMusic />
          </Base>
        }
      />
      <Route
        path="/edit-user"
        element={
          <Base>
            <UserEdit />
          </Base>
        }
      />
    </Routes>
  );
}

export default App;
