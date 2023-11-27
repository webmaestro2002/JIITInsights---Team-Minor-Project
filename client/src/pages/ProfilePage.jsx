import { useContext, useEffect } from "react";
import { useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import HostPage from "./HostPage";
import AccountNav from "../AccountNav";


export default function ProfilePage() {
    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser, isAdmin } = useContext(UserContext);
    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }

    useEffect(() => {
        if (!user) {
            axios.get('/profile').then(({ data }) => {
                console.log("User object from server:", data);
                setUser(data);
                setRedirect(null); // Reset redirect state
            });
        }
    }, [user, setUser]);

    // Move the logout function declaration outside of the useEffect
    async function logout() {
        try {
            await axios.post('/logout');
            setRedirect('/');
            setUser(null);
        } catch (error) {
            console.error('Error during logout:', error);
            // Handle the error as needed, e.g., show a message to the user
        }
    }

    if (!ready) {
        return 'Loading...';
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />;
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
            <div>
              <AccountNav />
              {subpage === 'profile' && (
                <div className="flex justify-center items-center h-screen">
                  <div className="bg-white shadow-md rounded-md p-6 max-w-2xl w-full">
                    <div className="text-center mb-4">
                      <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                        <p className="text-lg font-semibold text-white">
                          {user.name && user.name.charAt(0).toUpperCase()}
                        </p>
                      </div>
                      <p className="text-lg font-semibold text-black">
                        Logged in as {user.name} ({user.email})
                      </p>
                      {isAdmin && (
                        <div className="mt-2">
                          <p className="text-gray-600">
                            Admin Username: {user.userName}<br />
                            {/* Uncomment the line below if you want to display the admin password */}
                            {/* Admin Password: {user.adminPassword} */}
                          </p>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={logout}
                      className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
              {subpage === 'hosted' && (
                <HostPage />
              )}
            </div>
          );    
}
