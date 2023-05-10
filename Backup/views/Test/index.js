import { useState, useEffect } from "react"

import { db, storage } from "../../config/firebase"
import { doc, setDoc, arrayUnion, updateDoc } from "firebase/firestore"




export default function Test(props) {

    const [test, setTest] = useState({})
    const [number, setNumber] = useState(0)

    const updateTest = (key, value) => {
        setTest({ ...test, [key]: value })
    }
    const bas = {
        abc: "abc",
        xyz: [{ name: "ali", age: 21 }, { name: "uzaiee", age: 21 }]
    }

    const uzi = {name: "uysa", age: 43}

    const submitTest = async () => {
        try {
            console.log(test)
            const testRef = doc(db, "ads", 'abc' + number)
            const testAdd = await updateDoc(testRef, {xyz: arrayUnion(uzi)})
            setNumber(number + 1)
        }
        catch (err) {
            console.log(err)
        }

        
    }




    return <>

        <input
            placeholder="name"
            type="text"
            onChange={(e) => updateTest("name", e.target.value)}
        ></input>

        <input
            placeholder="AGE"
            type="number"
            onChange={(e) => updateTest("age", e.target.value)}
        ></input>

        <button onClick={submitTest}>submit</button>
    </>
}