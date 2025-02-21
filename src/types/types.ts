export type FileData = {
  data: string | ArrayBuffer | null | undefined;
  name: string;
};

export type RoomData = {
  roomId: string;
};

export type RecieveData = {
  success: boolean;
};

export type RecieverJoinedData = {
  receiverId: string;
};

export type RecievedData = {
  files: FileData[];
};
