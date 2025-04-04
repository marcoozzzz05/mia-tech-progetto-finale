import { useParams } from "react-router";
import { getUserProfile } from "../services/userService";

const User = () => {
    const { userId } = useParams();

    const fecthUserData = async () => {
        try {
            const response = await getUserProfile(userId);
            const userData = response.data;
            console.log(userData);
        }
        catch(error) {
            console.error(error);
        }
    }

    fecthUserData();

  return (
    <div>
      <p>{userId}</p>
    </div>
  )
}

export default User