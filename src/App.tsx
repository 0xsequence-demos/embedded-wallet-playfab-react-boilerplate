import { useState } from 'react'
import { sequence } from './config'
import { useGoogleLogin } from '@react-oauth/google'
import './App.css'

function App() {
  const [walletAddress, setWalletAddress] = useState<string | any>('')

  const handleGooglePlayfabLogin = useGoogleLogin({
    flow: 'implicit',
    onSuccess: tokenResponse => {
      ;(window as any).PlayFabClientSDK.LoginWithGoogleAccount(
        {
          AccessToken: tokenResponse.access_token, // This access token is generated after a user has signed into Google
          CreateAccount: true,
          TitleId: import.meta.env.VITE_PLAYFAB_TITLE_ID
        },
        async (response?: { data: { SessionTicket: string } }, error?: Error) => {
          if (response) {
            try {
              const seqRes = await sequence.signIn(
                {
                  playFabTitleId: import.meta.env.VITE_PLAYFAB_TITLE_ID,
                  playFabSessionTicket: response.data.SessionTicket
                },
                'playfab session'
              )
              setWalletAddress(seqRes.wallet)
            } catch (e) {
              console.error('Error: ' + JSON.stringify(error))
            }
          } else if (error) {
            console.error('Error: ' + JSON.stringify(error))
          }
        }
      )
    }
  })

  const signOut = async () => {
    setWalletAddress(null)
    try {
      const sessions = await sequence.listSessions()
      await sequence.dropSession({ sessionId: sessions[0].id })
    }catch(err){
      console.log(err)
    }
  }

  return (
    <>
      <div className='App'>
        <h1>PlayFab Sign In (via Google)</h1>
        {
          walletAddress ? 
            <button onClick={() => signOut()}>signOut</button>
          :
            <button onClick={() => handleGooglePlayfabLogin()}>sign in</button>
        }
        <br/>
        <br/>
        {walletAddress}
      </div>
    </>
  )
}

export default App