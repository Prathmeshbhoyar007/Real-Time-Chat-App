import { useAuthContext } from '../../context/AuthContex'
import useConversation from '../../zustand/useConversation';
import {useEffect} from 'react'
import { extractTime } from "../../utils/extractTime"

const Message = ({message}) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation()
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt)
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePicture = fromMe ? authUser.profilePicture :  selectedConversation?.profilePicture  ;
  const bubbleBgColor = fromMe ? 'bg-blue-500' : "";
  const shakeClass = message.shouldShake ? "shake" : ""

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
            <img src={`${profilePicture}`} alt="chat bubble" />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} `}>{message.message}</div>
      <div className={`chat-footer opacity-50 text-xs gap-1 items-center`}>{formattedTime}</div>
    </div>
  )
}

export default Message
