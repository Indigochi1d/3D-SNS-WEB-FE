import {useEffect} from "react";
import {socket} from "../../sockets/clientSocket.ts";

export const ClientSocketControls = () => {

    const handleConnect = () : void => {
        console.log('ClientSocketControls Connected');
    };

    const handleDisconnect = (): void => {
        console.log('ClientSocketControls Disconnected');
    };

    const handleInitialize = (): void => {
        console.log('ClientSocketControls Initialized');
    };

    const handleEnter = (): void => {
        console.log('ClientSocketControls Enter');
    };

    const handleExit = (): void => {
        console.log('ClientSocketControls Exit');
    };

    const handlePlayers = (): void => {
        console.log('ClientSocketControls Players');
    };

    const handleNewText = (): void => {
        console.log('ClientSocketControls New Text');
    };



    useEffect(() => {
        socket.on("connect", handleConnect);
        socket.on("disconnect", handleDisconnect);
        socket.on("initialize", handleInitialize);
        socket.on("enter", handleEnter);
        socket.on("exit", handleExit);
        socket.on("players", handlePlayers);
        socket.on("newText", handleNewText);

        return () => {
            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);
            socket.off("initialize", handleInitialize);
            socket.off("enter", handleEnter);
            socket.off("exit", handleExit);
            socket.off("players", handlePlayers);
            socket.off("newText", handleNewText);
        };
    }, []);

};

