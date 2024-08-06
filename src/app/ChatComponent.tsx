"use client"

import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Typewriter } from 'react-simple-typewriter'

const ChatComponent = () => {

const [userInput, setInput] = useState("")
const [apiResponse, setApiResponse] = useState("")
const [userQuery, setUserQuery] = useState("")
const [typingTexts, setTypingtexts] = useState({display : "block"})



const handleSubmit = (e: { preventDefault: () => void }) => {
  e.preventDefault()
  setUserQuery(userInput)  
  generateResponse(userInput) 
  setInput("")
 

}

const handleChange = (e: { target: { value: React.SetStateAction<string> } }) => {
  setInput(e.target.value)
  setTypingtexts({display : "none"})

}

async function generateResponse(userInput: string) {
  const response = await axios({
    url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.NEXT_PUBLIC_API_KEY}`,
    method: "post",
    headers: {
      'Content-Type': 'application/json',
     
      
    },
    data: {"contents":[{"parts":[{"text": `You are Fashion and Beauty Assistant and you will only answer questions related to Fashion, Beauty, Hair and Makeup. If the question is not about Fashion, you'll simply say that you are a Fashion Assistant and can't answer questions that are unrelated to it. My question is-  ${userInput}`}]}]}
  })

  let answer = response["data"]["candidates"][0]["content"]["parts"][0]["text"]  
 

  let answerTwo = answer.replaceAll("**", "\r\n")
  let answerThree = answerTwo.replaceAll("*", "\r\n-")
 let filteredAnswer = answerThree.replaceAll(":", "-")
 
 
  setApiResponse(filteredAnswer)


  //  let reqdResponse = ""
  // let prevResponse = JSON.parse(localStorage.getItem("airesponse"))
  // if (prevResponse)  {
  //   reqdResponse = userInput + "\n" + prevResponse +  "\n" +  filteredAnswer   

  // }
  // else {
  //   reqdResponse = filteredAnswer
  // }

  // localStorage.setItem = ("aiResponse", JSON.stringify(`User\n${userInput}\nGippity\n${reqdResponse}\n`))

  // console.log(reqdResponse) 
 


}


  return (
    <div className='w-screen rounded-b-md flex justify-center h-screen flex-col items-center'>
      <div className='w-3/5 bg-gradient-to-br from-purple-200 to-orange-200  border-2 border-zinc-200 hover:shadow-2xl rounded'>
      <div className='w-full bg-pink-200 py-6 px-3 font-semibold'> Your Own Personal Fashion Assistant</div>
    <div className='p-4 '>
    <div >
    

    <h2 className='font-semibold'> User</h2>

    <p   className='text-sm mb-6 '> {userQuery} </p>

    <h2 className= 'font-semibold'> GeminiAI</h2>
    <p className='text-sm mb-6 font-semibold'> {apiResponse}  </p>
     </div>



      <form onSubmit={handleSubmit}> 
          <p> Ask me your fashion queries</p>
          <textarea 
          className='w-full py-4 px-2 text-black mt-6'
          placeholder= ""
          
          value={userInput}
          onChange={handleChange}
          id = "userinput"
          >   
 
          </textarea>

          <div className='text-slate-600 my-4 text-sm' style={typingTexts}  >  <Typewriter  words={["Will green emerald bracelets look good on white dress?", 
            "Can I wear beads bracelet with a formal outfit?",
            "Will curly hair look good on heavy-makeup?",
            "Is yellow-tshirt on blue shorts a good idea?",
            "What should I wear with my purple shorts for a morning walk?",
            "Should I wear red dress or a blue one for a date"  ]}  loop = {30}  typeSpeed={40} deleteSpeed={25}  /> </div>

        <div className='flex'>
        <button className='w-36 p-3 mt-3 bg-purple-700 text-white mr-3  hover:border-black hover:border-2 hover:text-black hover:bg-pink-800 '>   Submit </button>
        <button className=' p-3 mt-3 bg-purple-700 text-white '  onClick={() => {window.location.reload()} }  >   Another Question </button>
        </div>



      </form>
    </div>
      </div>
      
    </div>
  )
}

export default ChatComponent
