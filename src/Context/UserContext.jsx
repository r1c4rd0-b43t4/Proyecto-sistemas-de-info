import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../../credentials";
import { doc, getDoc, getFirestore } from "firebase/firestore";

 

const UserContext = createContext(null);


const auth = getAuth(app)

const db = getFirestore(app)

const UserProvider = ({ children }) => {

    const [user, setUser] = useState('')
    const [profile, setProfile] = useState({})

    const [logged, setLogged] = useState(false)




    useEffect(() => {


        const unsubscribe = onAuthStateChanged(auth, async (userConnected) => {
            if (userConnected) {
             

                try {
            
                setUser(userConnected)
                    setLogged(true)



                } catch (error) {
                    console.log(error)
                    setProfile({})
                }


            } else {
                setProfile({})
                setLogged(false)
            }

        })


        return () => unsubscribe()








    }, [])






    return (<UserContext value={{ user, setUser, profile, setProfile, logged }}  > {children}</UserContext>)



}


export { UserContext, UserProvider }


