import { storage, db, auth } from "../../config/firebase"
import { doc, getDoc, collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'

import Logout from "../../component/Logout"


export default function Dashboard(props) {
    // console.log(auth?.currentUser?.uid)

    const [totalAds, setTotalAds] = useState([])
    // console.log("before useEffect", totalAds)
    const [done, setDone] = useState(false)
    const [search, setSearch] = useState("")
    let uid = auth?.currentUser?.uid;

    const navigate = useNavigate()


    // // trying to do it the other way

    // const [done1, setDone1] = useState(false)
    // const [done2, setDone2] = useState(false)

    // if (done1 && done2) {
    //     setDone(true)
    // }


    // const getUserData = async () => {
    //     const uid = auth.currentUser.uid
    //     const usersDocRef = await doc(db, "users", uid)
    //     const usersDocData = await getDoc(usersDocRef)
    //     // console.log(usersDocData)
    //     // console.log(usersDocData.data())
    //     props.setUserData({ ...usersDocData.data() })
    //     console.log("getUserData worked")
    //     setDone1(true)
    // }

    // const getAdsData = async () => {
    //     let adsSnapshot = await getDocs(collection(db, "ads"))
    //     let arr = []
    //     adsSnapshot.forEach((doc) => {
    //         arr.push(doc.data())

    //     })
    //     setTotalAds(arr)
    //     // console.log("after useEffect", totalAds)
    //     console.log("getAdsData worked")

    //     setDone2(true)

    // }

    // useEffect(() =>getUserData, [])

    // useEffect(() =>getAdsData, [])


    // Doing it the normal way

    useEffect(() => {
        async function getData() {

            const usersDocRef = await doc(db, "users", uid)
            const usersDocData = await getDoc(usersDocRef)
            // console.log(usersDocData)
            // console.log(usersDocData.data())
            props.setUserData({ ...usersDocData.data() })

            let adsSnapshot = await getDocs(collection(db, "ads"))
            let arr = []
            adsSnapshot.forEach((doc) => {
                arr.push(doc.data())

            })
            setTotalAds(arr)
            // console.log("after useEffect", totalAds)
            setDone(true)
        }
        getData()
    }, [])


     if (!uid) {
        return  <p>You are not logged in <button onClick={() => {navigate('/login', {replace:true})}}>Login</button></p>
    }
    else if (!done) {
        return  <p>Loading</p>
    }
   
    else {
        return <>
            <h3>This is Dashboard</h3>

            <p> <img alt="profile-img" width={30} height={30} src={props.userData.profileImage} /> Welcome {props.userData.name}</p>
            <input
                placeholder="Looking for something"
                value={search}
                onChange={(e) => { setSearch(e.target.value) }}
            ></input>
            <button onClick={() => navigate("create-ad")}>Post an Ad</button>
            <button onClick={() => navigate('my-profile')}>My Profile</button>
            <button onClick={() =>{
                Logout()
                navigate('/login', {replace: true})
            }}>Log me Out</button>

            {/* {console.log("after return", totalAds)} */}
            <p>Total ads are;  </p>

            {totalAds.map((val, ind) => {

                {
                    if (!search) {
                        return <>
                            <div id={"ad" + (ind + 1)} key={"ad" + (ind + 1)}>

                                <p key={"adp" + (ind + 1)} id={"adp" + (ind + 1)}> <img alt={"adi" + (ind + 1)} src={val.imagesURL[0]} width={30} height={30} key={"adi" + (ind + 1)} id={"adi" + (ind + 1)} /> {val.title}
                                    <br /> price: USD.{val.price}</p>

                            </div>
                        </>
                    }

                    else if (val.title.includes(search)) {
                        return <>
                        <div id={"ad" + (ind + 1)} key={"ad" + (ind + 1)}>

                            <p key={"adp" + (ind + 1)} id={"adp" + (ind + 1)}> <img alt={"adi" + (ind + 1)} src={val.imagesURL[0]} width={30} height={30} key={"adi" + (ind + 1)} id={"adi" + (ind + 1)} /> {val.title}
                                <br /> price: USD.{val.price}</p>

                        </div>
                        </>
                    }
                }


                // {
                //     if (search && val.title.includes(search)) {

                //         return <>
                //             <div id={"ad" + (ind + 1)} key={"ad" + (ind + 1)}>

                //                 <p key={"adp" + (ind + 1)} id={"adp" + (ind + 1)}> <img alt={"adi" + (ind + 1)} src={val.imagesURL[0]} width={30} height={30} key={"adi" + (ind + 1)} id={"adi" + (ind + 1)} /> {val.title}
                //                     <br /> price: USD.{val.price}</p>

                //             </div>
                //         </>
                //     }
                // }


            })}
            {/* {totalAds.forEach((doc) => {
                    console.log(doc.id, "=>", doc.data())
                })}
                {console.log(totalAds)} */}



        </>
    }









}