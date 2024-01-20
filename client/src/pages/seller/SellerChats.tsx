import { useQuery } from "@tanstack/react-query";
import { sellerApi } from "../../config/axios";
import { useAuth, useSeller } from "../../store/hooks/storeHooks";
import { Chats } from "../../types/general";
import { useDispatch } from "react-redux";
import {
  ChatBar,
  setSellerChatBar,
  setSellerChats,
} from "../../store/reducers/seller.Reducer";

export default function SellerChats() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { chatBar } = useSeller();
  const { isLoading } = useQuery({
    queryKey: ["sellerChats"],
    queryFn: async () => {
      const { data: chats }: { data: Chats[] } = await sellerApi.get(
        `/chats?seller=${user?.id}`
      );
      const userchats: ChatBar[] = chats.map((chat) => {
        const username = chat.user.username;
        const message = chat.messages.reverse()[0].content;
        return { username, message };
      });
      dispatch(setSellerChatBar(userchats));
      dispatch(setSellerChats(chats));
      return null;
    },
  });
  return (
    <div className="flex flex-col gap-3 px-4">
      {chatBar?.map((chat, i) => (
        <div
          key={i}
          className=" cursor-pointer bg-slate-700 w-full p-2 rounded-md flex items-center gap-4">
          <img src="/user.jpg" alt="user" className="w-12 h-12 rounded-full" />
          <div className="flex flex-col ">
            <h3 className="text-white font-light font-Nerko text-[25px]">
              {chat.username}
            </h3>
            <p className="font-[400] font-Kanit text-[17px]">
              {chat.message.slice(0, 40)}...
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
