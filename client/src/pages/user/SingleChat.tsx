import { Navigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../store/hooks/storeHooks";
import { useEffect, useRef, useState } from "react";
import { socket } from "../../sockets/socket";
import { useToast } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Chats } from "../../types/general";
import { BsThreeDots } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";

export default function SingleChat() {
  const toast = useToast();
  const { user } = useAuth();
  const messageRef = useRef<HTMLInputElement>(null);
  if (!user) return <Navigate to={"/"} />;

  const search = useSearchParams();
  const sender = search[0].get("userId");
  const seller = search[0].get("sellerId");
  const [chats, setChats] = useState<Chats[]>([]);
  const [sellerProps, setSellerProps] = useState<Chats["seller"] | undefined>();
  if (sender === seller || !(seller || sender)) return <Navigate to={"/"} />;
  useQuery({
    queryKey: ["createChat"],
    queryFn: () => {
      socket.emit("createChat", { seller, sender });
      return null;
    },
  });
  const sendMessage = async () => {
    if (messageRef.current?.value === "") {
      toast({
        title: "Please enter a message",
        status: "warning",
        isClosable: true,
      });
      return;
    }
    socket.emit("message", {
      content: messageRef.current?.value,
      sender: sellerProps?._id,
      chatId: chats[0]._id,
    });
    if (messageRef.current) {
      messageRef.current.value = "";
    }
  };
  useEffect(() => {
    socket.on("chatCreated", (message: string) => {
      toast({
        title: message,
        status: "success",
        isClosable: true,
      });
    });
  }, [socket]);
  useEffect(() => {
    socket.on("chats", (chats: Chats[]) => {
      setSellerProps(chats[0].seller);
      setChats(chats);
    });
  }, [socket]);
  return (
    <div className="flex flex-col py-2 relative w-full h-[93vh] ">
      <div className="flex justify-between items-center border-b border-purple-500 px-2">
        <div className="flex items-center gap-3">
          <img src="user.jpg" className="w-12 h-12 rounded-full" />
          <p className="text-[18px] font-Fira">
            {sellerProps ? sellerProps.username : ""}
          </p>
        </div>
        <BsThreeDots size={25} cursor="pointer" />
      </div>
      <div className="flex flex-col  h-[78vh] overflow-y-scroll hide-scrollbar">
        <h1 className="text-4xl">messages</h1>
      </div>
      <div className="fixed bottom-[4px] border-2 w-full p-[6px] rounded-md flex items-center justify-between">
        <input
          type="text"
          ref={messageRef}
          className="bg-transparent text-[17px] font-JetBrains border-none w-full outline-none font-semibold"
        />
        <button className="bg-purple-500 p-2 rounded-sm" onClick={sendMessage}>
          <IoMdSend size={25} />
        </button>
      </div>
    </div>
  );
}
