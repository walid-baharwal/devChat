import { MessageCircleIcon } from "lucide-react"


export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center dark:bg-gray-800/40">
        <MessageCircleIcon/>
      <h2>Dev Chat</h2>
      <p>Send and recieve messages</p>
      </div>
    </>
  );
}
