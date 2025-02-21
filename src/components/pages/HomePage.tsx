import React, { useEffect, useState } from "react";
import HomeTemplate from "../templates/HomeTemplate";
import UploadTab from "../organisms/UploadTab";
import Logo from "../atoms/Logo";
import Subtitle from "../atoms/Subtitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/atoms/tabs"
import RecieveTab from "../organisms/RecieveTab";
import { socket } from "@/lib/socket";
import { FileData, RoomData } from "@/types/types";


const HomePage: React.FC = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [files, setFiles] = useState<File[]>([]);
    const [roomId, setRoomId] = useState<string>("");
    const [activeTab, setActiveTab] = useState<string>("send");

    useEffect(() => {
        function onConnect() {
          setIsConnected(true);
          console.log('connected');
          console.log(socket);
          socket.emit("join", new Date().getTime());
        }
    
        function onDisconnect() {
          setIsConnected(false);
        }
    
    
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('recieved', onRecieved);
    
        return () => {
          socket.off('connect', onConnect);
          socket.off('disconnect', onDisconnect);
          socket.off('recieved', onRecieved);
        };
      }, []);

      const onRecieved = (data:FileData) => {
        console.log(data);
        const blob = new Blob([data.data]);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = data.name;
        a.click();
      }

      const onSend = (files: File[]) => {
        socket.emit("createRoom", "", (response: RoomData) => setRoomId(response.roomId));
        setFiles(files);

        // console.log((files))
        // files.forEach((file) => {
        //   const reader = new FileReader();
        //   reader.onload = (event) => {
        //     const data = event.target?.result;
        //     socket.emit("send", { data, name: file.name });
        //   };
        //   reader.readAsArrayBuffer(file);
        // });
      }

    return (
        <HomeTemplate>
            <div className="flex flex-col items-center justify-center gap-10 h-auto">
               <div className="flex flex-col items-center gap-4">
                <Logo />
                <Subtitle />
               </div>
                <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value)} className="flex flex-col items-center gap-2 min-h-72">
                    <TabsList>
                        <TabsTrigger value="send">send</TabsTrigger>
                        <TabsTrigger value="recieve">recieve</TabsTrigger>
                    </TabsList>
                    <TabsContent value="send">                
                        <UploadTab onSend={onSend} roomId={roomId} />
                    </TabsContent>
                    <TabsContent value="recieve">
                        <RecieveTab onRecieve={(code) => console.log(code)} />
                    </TabsContent>
                </Tabs>

            </div>
        </HomeTemplate>
    )
};

export default HomePage;