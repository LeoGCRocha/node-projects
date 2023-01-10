import './EditProfile.css'

import { uploads } from '../../utils/config'
// hooks
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Redux
import { profile, resetMessage, updateProfile } from '../../slices/userSlice'

// components
import Message from '../../components/Message'


const EditProfile = () => {
    
    const { user, message, error, loading } = useSelector(state => state.user)

    const dispatch = useDispatch()

    // states
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [bio, setBio] = useState('')
    const [ profileImage, setProfileImage ] = useState('')
    
    // load information
    useEffect(() => {
        dispatch(profile())
    }, [dispatch])

    // fill form with user data
    useEffect(() => {
        if (user) {
            setName(user.name)
            setBio(user.bio)
            setEmail(user.email)
        }
    }, [user])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const userData = {
            name
        }


        if (profileImage) {
            userData.profileImage = profileImage
        }

        if (bio) {
            userData.bio = bio
        }

        if (password) {
            userData.password = password
        }

        const formData = new FormData()
        const userFormData = Object.keys(userData)

        userFormData.forEach(key => {
            formData.append(key, userData[key])
        })

        formData.append('user', userFormData)

        await dispatch(updateProfile(formData))
        
        // remove message after seconds
        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)
    }

    const handleFile = (e) => {
        // image file
        const img = e.target.files[0]
        setProfileImage(img)
    }

    return (
        <div id="edit-profile">
            <h2>Edite seus dados</h2>
            <p className='subtitle'>Adicione uma imagem de perfil e conte mais sobre você...</p>
            { 
            // Create object url, create a temporay image to show before upload
            (user.profileImage || profileImage) && (
                <img alt='' className='profile-image'
                    src={
                        profileImage ? URL.createObjectURL(profileImage) : `${uploads}/users/${user.profileImage}`
                    }
                />
            )
            }
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder='Nome'
                    onChange={(e) => setName(e.target.value)}
                    value={name || ""}
                />
                <input 
                    type="email" 
                    placeholder='E-mail' 
                    value={email || ""}
                    disabled 
                />

                <label>
                    <span>Imagem do Perfil</span>
                    <input type="file"  onChange={handleFile}/>
                </label>

                <label>
                    Bio
                    <input
                        type="text" 
                        placeholder='Descrição do perfil' 
                        onChange={(e) => setBio(e.target.value)}
                        value={bio || ""}
                    />
                </label>

                <label>
                    <span>Quer alterar a senha?</span>
                    <input 
                        type="password"
                        autoComplete='off'
                        placeholder='Digite sua nova senha' 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                {!loading && <button type='submit'>Entrar</button>}
                {loading && <button disabled type='submit'>Aguarde...</button>}
                {error && <Message msg={error} type='error' />}
                {message && <Message msg={message} type='success' />}

            </form>
        </div>
    )
}

export default EditProfile