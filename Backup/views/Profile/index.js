
import { db, storage } from "../../config/firebase"
import { doc, collection, getDocs, query, where, deleteDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import Logout from "../../component/Logout"

export default function Profile(props) {
    // console.log(props.userData)

    const navigate = useNavigate()

    const [myAds, setMyAds] = useState([])

    // console.log("before useEffect",)
    const [done, setDone] = useState(false)

    const deleteAd = async (id) => {
        // console.log(id)
        const delRef = await deleteDoc(doc(db, "ads", id))
        // console.log("Ad deleted")
    }

    // async function deleteAd (id){
    //     console.log(id)
    //     // const delRef = await deleteDoc(doc(db, "ads", myAds.id))
    //     console.log("Ad deleted")
    // }


    useEffect(() => {
        const getData = async () => {

            const uid = props.userData.uid
            // console.log(uid)
            const q = query(collection(db, "ads"), where("uid", '==', uid))
            // console.log(q)
            const querySnapshot = await getDocs(q)
            // console.log(querySnapshot)
            let arr = [];
            querySnapshot.forEach((doc) => {
                // console.log(doc.id, "=>", doc.data())

                let abc = { ...doc.data() }
                abc.id = doc.id
                arr.push(abc)
                // console.log(abc)
                // console.log(arr)

            })
            setMyAds(arr)

            // console.log("after useEffect", myAds)
            setDone(true)
        }
        getData()
    }, [deleteAd])

    if (!done) {
        return <p>Loading</p>
    }
    else {

        return <>
            <p>This is my profile</p>
            <p> <img alt="profile-img" width={30} height={30} src={props.userData.profileImage} /> Welcome {props.userData.name}
                <br /> You are {props.userData.age} years old
                <br />Your email is <b>{props.userData.email} </b></p >
            <button onClick={() => { navigate(-1) }}>Go to Dashboard</button>
            <br /><button onClick={() => navigate("/dashboard/create-ad", { replace: true })}>Post an Ad</button>
            <br /><button onClick={() => {
                Logout()
                navigate('/login', { replace: true })
            }}>Log me Out</button>

            <h3>My Ads;  </h3>

            {(myAds.length == 0) && <p>You don't have any ads yet </p>}

            {/* {(myAds.length != 0) && <>

            </>
            } */}

            {myAds.map((val, ind) => {
                return <>
                    <div id={"ad" + (ind + 1)} key={"ad" + (ind + 1)}>

                        <p key={"adp" + (ind + 1)} id={"adp" + (ind + 1)}> <img src={val.imagesURL[0]} width={30} height={30} key={"adi" + (ind + 1)} id={"adi" + (ind + 1)} /> {val.title}
                            <br /> price: USD.{val.price}
                            <br /><button onClick={() => {
                                deleteAd(val.id)
                            }}>Delete Add</button></p>

                    </div>
                </>
            })}
        </>

    }
} 