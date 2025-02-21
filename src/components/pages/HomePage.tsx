import React, { useEffect, useRef, useState } from "react";
import HomeTemplate from "../templates/HomeTemplate";
import UploadTab from "../organisms/UploadTab";
import Logo from "../atoms/Logo";
import Subtitle from "../atoms/Subtitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/atoms/tabs"
import RecieveTab from "../organisms/RecieveTab";
import { socket } from "@/lib/socket";
import { FileData, RecieveData, RecievedData, RecieverJoinedData, RoomData } from "@/types/types";


const HomePage: React.FC = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [files, setFiles] = useState<File[]>([]);
  const [roomId, setRoomId] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("send");

  // Refs para manter os valores atualizados
  const filesRef = useRef(files);
  const roomIdRef = useRef(roomId);

  // Atualiza as refs sempre que os states mudam
  useEffect(() => {
    filesRef.current = files;
  }, [files]);

  useEffect(() => {
    roomIdRef.current = roomId;
  }, [roomId]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      console.log("connected");
      socket.emit("join", new Date().getTime());
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    const onRecieverJoined = async (data: RecieverJoinedData) => {
      const currentFiles = filesRef.current;
      const currentRoomId = roomIdRef.current;
    
      // Converte os arquivos para ArrayBuffer antes de enviar
      const processedFiles = await Promise.all(
        currentFiles.map(async (file) => {
          const arrayBuffer = await file.arrayBuffer();
          return { name: file.name, data: arrayBuffer };
        })
      );
    
      console.log("Enviando arquivos convertidos...");
      console.log({ roomId: currentRoomId, files: processedFiles });
    
      socket.emit(
        "sendFile",
        { roomId: currentRoomId, files: processedFiles },
        (response: { success?: boolean; error?: string }) => {
          if (response?.error) {
            console.error("Erro ao enviar arquivo:", response.error);
          } else {
            console.log("Arquivos enviados com sucesso!");
          }
        }
      );
    };

    // Outros handlers
    const onRecieved = (data: RecievedData) => {
      console.log(data);
      data.files.forEach((file) => {
        const url = URL.createObjectURL(new Blob([file.data!]));
        const a = document.createElement("a");    
        a.href = url;
        a.download = file.name;
        a.click();
        URL.revokeObjectURL(url);
      });
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("receiveFile", onRecieved);
    socket.on("receiverJoined", onRecieverJoined);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("receiveFile", onRecieved);
      socket.off("receiverJoined", onRecieverJoined);
    };
  }, []); // Registrado apenas uma vez, mas usando refs para acessar valores atualizados

  const onRecieve = (code: string) => {
    socket.emit("joinRoom", code, (response: RecieveData) =>
      console.log(response.success)
    );
    console.log(socket.id);
  };

  const onSend = (files: File[]) => {
    socket.emit("createRoom", "", (response: RoomData) =>
      setRoomId(response.roomId)
    );
    console.log(files);
    setFiles(files);
  };

  return (
    <HomeTemplate>
      <div className="flex flex-col items-center justify-center gap-10 h-auto">
        <div className="flex flex-col items-center gap-4">
          <Logo />
          <Subtitle />
        </div>
        <Tabs
          defaultValue={activeTab}
          onValueChange={(value) => setActiveTab(value)}
          className="flex flex-col items-center gap-2 min-h-72"
        >
          <TabsList>
            <TabsTrigger value="send">send</TabsTrigger>
            <TabsTrigger value="recieve">recieve</TabsTrigger>
          </TabsList>
          <TabsContent value="send">
            <UploadTab onSend={onSend} roomId={roomId} />
          </TabsContent>
          <TabsContent value="recieve">
            <RecieveTab onRecieve={onRecieve} />
          </TabsContent>
        </Tabs>
      </div>
    </HomeTemplate>
  );
};

export default HomePage;