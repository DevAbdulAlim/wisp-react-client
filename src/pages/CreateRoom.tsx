import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";

const socket: Socket = io();

export default function CreateRoom() {
  const [room, setRoom] = useState<string>();

  const navigate = useNavigate();

  const handleCreateRoom = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (room) {
      socket.emit("createRoom", room);
      navigate(`/groups/${room}`);
    } else {
      setRoom("");
    }
  };

  return (
    <div>
      <form onSubmit={handleCreateRoom}>
        <input
          type="text"
          className="py-2 px-3 border"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Enter room name"
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
