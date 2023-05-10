import { useState } from "react"
import { auth } from '../../config/firebase'
import { db } from "../../config/firebase"
import { storage } from "../../config/firebase"

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

import { useNavigate } from "react-router-dom"

export default function Signup(props) {
    const [data, setData] = useState({ name: "ali", age: 23, email: "ali@uzair.com", password: "123456", images: [] })
    // console.log(data)

    const navigate = useNavigate()
    const updateData = (key, value) => {
        setData({ ...data, [key]: value })
    }


    const submitForm = async () => {

        // USING .THEN AND .CATCH
        // createUserWithEmailAndPassword(auth, data.email, data.password,)
        //     .then((suc) => {
        //         console.log(suc);
        //         setData({ name: "", age: "", email: "", password: "", images: {} });
        //         console.log(auth.currentUser)
        //         console.log(suc.user.uid)
        //     })
        //     .catch((err) => { 
        //         console.log(err)
        //     })


        // console.log(data.images)

        // USING ASYNCS AWAIT AND TRY AND CATCH
        try {
            // console.log("data before user", data)
            const createRes = await createUserWithEmailAndPassword(auth, data.email, data.password)
            // console.log("data after user", data)
            // console.log(createRes)

            const uid = createRes.user.uid

            const profileImageRef = await ref(storage, "profileImages/" + data.images[0].name)
            // console.log(profileImageRef)

            const profileImageUpload = await uploadBytes(profileImageRef, data.images[0])
            // console.log(profileImageUpload)

            const profileImageUrl = await getDownloadURL(profileImageUpload.ref)
            console.log(typeof profileImageUrl)
            
            data.images = []

            const docRes = await setDoc(doc(db, "users", uid), { ...data, uid: uid, profileImage: profileImageUrl })
            // console.log(docRes)





            setData({ name: "", age: "", email: "", password: "", images: [] });
            // return {
            //     status: "success"
            // }

            // props.setPage("login")
            navigate('/login', {replace:true})
        }
        catch (err) {
            console.log(err)
            // return {
            //     status: "error",
            //     error: err.message
            // }
        }


    }
    // console.log(submitForm.status)


    return <>
        <input type="text" placeholder="Name" value={data.name} onChange={(e) => updateData("name", e.target.value)} />
        <input type="number" placeholder="Age" value={data.age} onChange={(e) => updateData("age", e.target.value)} />
        <input type="text" placeholder="Email" value={data.email} onChange={(e) => updateData("email", e.target.value)} />
        <input type="password" placeholder="Password" value={data.password} onChange={(e) => updateData("password", e.target.value)} />
        <input type="file" onChange={(e) => updateData("images", e.target.files)} />

        <button onClick={submitForm}> Submit</button>

        <p>Already have an acocunt <button onClick={() => navigate('/login', {replace:true})}>Login</button></p>
    </>
}