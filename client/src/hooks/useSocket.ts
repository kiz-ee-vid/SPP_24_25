import io from "socket.io-client";
import {showToast, ToastReason} from "../utils/showToast";

const socket = io("http://localhost:5000");

const useSocket = () => {
    const connectToRoomHandler = (roomId: string) => {
        socket.emit("join_room", roomId);
    };

    const todosChangeNotifier = (roomId: string) => {
        showToast("Send change event", ToastReason.SUCCESS);
        socket.emit("change_event_occurs", roomId);
    };

    const todosChangeListener = (onEvent: () => void) => {
        socket.on("change_event_notify", () => {
            showToast("Content updated", ToastReason.SUCCESS);
            onEvent();
        });
    }

    return {
        socket,
        connectToRoomHandler,
        todosChangeNotifier,
        todosChangeListener
    }
}

export default useSocket