// import { useContext } from "react";
// import { useState } from "react";
// import { UserContext } from "../UserContext";
// import { Navigate, useParams } from "react-router-dom";
// import axios from "axios";
// import HostPage from "./HostPage";
// import AccountNav from "../AccountNav";

// export default function ProfilePage() {
//     const [redirect, setRedirect] = useState(null);
//     const { ready, user, setUser } = useContext(UserContext);
//     let { subpage } = useParams();
//     if (subpage === undefined) {
//         subpage = 'profile';
//     }

//     async function logout() {
//         await axios.post('/logout');
//         setRedirect('/');
//         setUser(null);
//     }
      
//     if (!ready) {
//         return 'Loading...';
//     }

//     if (ready && !user && !redirect) {
//         return <Navigate to={'/login'} />
//     }

//     if (redirect) {
//         return <Navigate to={redirect} />
//     }

//     return (
//         <div>
//             <AccountNav />
//             {subpage === 'profile' && (
//                 <div className="text-center max-w-lg mx-auto">
//                     Logged in as {user.name} ({user.email})<br />
//                     <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
//                 </div>
//             )}
//             {subpage === 'hosted' && (
//                 <HostPage />
//             )}
//         </div>
//     );
// }

import { useContext, useEffect } from "react";
import { useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import HostPage from "./HostPage";
import AccountNav from "../AccountNav";

// export default function ProfilePage() {
//     const [redirect, setRedirect] = useState(null);
//     const { ready, user, setUser, isAdmin } = useContext(UserContext);
//     let { subpage } = useParams();
//     if (subpage === undefined) {
//         subpage = 'profile';
//     }

//     useEffect(() => {
//         if (!user) {
//             axios.get('/profile').then(({ data }) => {
//                 console.log("User object from server:", data);
//                 setUser(data);
//                 setRedirect(null); // Reset redirect state
//             });
//         }
//     }, [user, setUser]);

//     // async function logout() {
//     //     await axios.post('/logout');
//     //     setRedirect('/');
//     //     setUser(null);
//     // }
//     async function logout() {
//         try {
//             await axios.post('/logout');
//             setRedirect('/');
//             setUser(null);
//         } catch (error) {
//             console.error('Error during logout:', error);
//             // Handle the error as needed, e.g., show a message to the user
//         }
//     }
    

//     if (!ready) {
//         return 'Loading...';
//     }

//     if (ready && !user && !redirect) {
//         return <Navigate to={'/login'} />;
//     }

//     if (redirect) {
//         return <Navigate to={redirect} />;
//     }

//     return (
//         <div>
//             <AccountNav />
//             {subpage === 'profile' && (
//                 <div className="text-center max-w-lg mx-auto">
//                     Logged in as {user.name} ({user.email})<br />
//                     {isAdmin && (
//                         <div>
//                             Admin Username: {user.userName}<br />
//                             {/* Admin Password: {user.adminPassword} */}
//                         </div>
//                     )}
//                     <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
//                 </div>
//             )}
//             {subpage === 'hosted' && (
//                 <HostPage />
//             )}
//         </div>
//     );
// }


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
                <div className="text-center max-w-lg mx-auto">
                    Logged in as {user.name} ({user.email})<br />
                    {isAdmin && (
                        <div>
                            Admin Username: {user.userName}<br />
                            {/* Admin Password: {user.adminPassword} */}
                        </div>
                    )}
                    <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                </div>
            )}
            {subpage === 'hosted' && (
                <HostPage />
            )}
        </div>
    );
}
