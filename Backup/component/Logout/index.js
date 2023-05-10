import { auth } from '../../config/firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
    // const navigate = useNavigate()
    signOut(auth)
    alert('successfully signed our')
    // navigate('/login', { replace: true })

}