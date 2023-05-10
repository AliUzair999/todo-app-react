import { useState } from "react"
import { db, storage, auth } from "../../config/firebase"
import { uploadBytes, getDownloadURL, ref } from "firebase/storage"
import { doc, addDoc, updateDoc, arrayRemove, arrayUnion, getDoc, setDoc, collection } from "firebase/firestore"
import { useNavigate } from 'react-router-dom'

import Logout from "../../component/Logout"


export default function CreateAd(props) {
    const [adData, setAdData] = useState({})
    const navigate = useNavigate()

    const updateAdData = (key, value) => {
        setAdData({ ...adData, [key]: value })
    }


    // const [imagesURL, setImagesURL] = useState([])
    let imagesURL = [];

    // const [curAds, setCurAds] = useState([])
    const createNew = async () => {
        // console.log(adData)
        // console.log(adData.images)
        // console.log(adData.images.length)


        try {
            const uid = props.userData.uid
            adData.uid = props.userData.uid
            // console.log(uid)

            for (let i = 0; i < adData.images.length; i++) {
                const adImageRef = await ref(storage, "adImages/" + adData.images[i].name)
                // console.log(i, "ref", adImageRef)
                const adImageUpload = await uploadBytes(adImageRef, adData.images[i])
                // console.log(i, "upload", adImageUpload)
                const adImageUrl = await getDownloadURL(adImageUpload.ref)
                // console.log(i, "url", adImageUrl)

                imagesURL.push(adImageUrl)

                // let arr = [...imagesURL]
                // console.log(arr)
                // arr.push(adImageUrl)
                // console.log(arr)
                // setImagesURL(arr)

            }

            adData.imagesURL = imagesURL

            // updateAdData("images","")
            delete adData.images
            // adData.images = [];

            const docRef = collection(db, "ads")
            const adRef = await addDoc(docRef, adData,)
            // console.log(adRef)

            setAdData({ title: "", description: "", price: "", imagesURL: [] })
            imagesURL = []

            alert("Ad posted Successfully")





            // If you want to add ads of a user in the same document, rather than creating individual document for every ad


            // const uid = props.userData.uid
            // // console.log(uid)
            // const docRef = collection(db, "ads")
            // const currentAdsRef = await getDoc(docRef)
            // // console.log(currentAdsRef.data())

            // const currentAds = currentAdsRef.data()
            // // console.log(currentAds)


            // if (currentAds){
            //     // console.log("yes")


            //     const totalAds = currentAds.totalAds
            //     // console.log(totalAds)
            //     const newAdRef = await updateDoc(docRef, {ads: arrayUnion(adData)})
            //     const totalAdsRef = await updateDoc(docRef, {totalAds: totalAds+1})

            //     // const oldAds = [...currentAds]
            //     // console.log("oldAds", oldAds)
            //     //  setCurAds(oldAds)

            //     // const adRef = await updateDoc(docRef, {ads: arrayUnion(adData)})

            // }
            // else{
            //     // console.log("NO")

            //     const adRef = await setDoc(docRef, {uid:uid, ads: [adData], totalAds: 1})

            // }
        }

        catch (err) {
            console.log(err.code)
            console.log(err.message)
        }


    }

    return <>
        <h2>Create an advertisement</h2>

        <input
            type="text"
            placeholder="Title"
            value={adData.title}
            onChange={(e) => updateAdData("title", e.target.value)}
        ></input>

        <input
            type="text"
            placeholder="Description"
            value={adData.description}
            onChange={(e) => updateAdData("description", e.target.value)}
        ></input>

        <input
            type="number"
            placeholder="Price"
            value={adData.price}
            onChange={(e) => updateAdData("price", e.target.value)}
        ></input>

        <input
            type="file"
            placeholder="Images"
            id="adImages"
            multiple
            onChange={(e) => updateAdData("images", e.target.files)}
        ></input>

        <button onClick={createNew}>Ad new</button>

        <button onClick={() => navigate('/dashboard', { replace: true })}>Dashborad</button>
        {/* <button onClick={() => navigate(-1)}>Dashborad</button> */}
        <button onClick={() => {
            Logout()
            navigate('/login', { replace: true })
        }}>Log me Out</button>

    </>

}