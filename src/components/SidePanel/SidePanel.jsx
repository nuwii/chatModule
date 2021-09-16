import React, { useState } from 'react';
import { Popup, Menu, Icon } from "semantic-ui-react";
import CreateChannelForm from "../Channels/CreateChannelForm";
import ChannelList from "../Channels/ChannelList";
import UserPanel from "../UserPanel/UserPanel";

const SidePanel = () => {

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            <Menu
                vertical
                inverted
                secondary
                
                fixed="left"
                style={{
                    width: "18vw",
                    fontSize: "1.3rem",
                }}
            >
                <Menu.Item>
                    {/*<User Panel/>*/}
                    <UserPanel/>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>
                        Kanallar
                    <span style={{ float: "right" }}>
                            <Popup
                                content="Yeni kanal oluştur"
                                trigger={<Icon name="add" onClick={(event) => handleOpen()} />}>
                            </Popup>
                        </span>
                    </Menu.Header>
                    {/*Kanallar*/}
                    <ChannelList/>                    
                </Menu.Item>
            </Menu>

            <CreateChannelForm
                open={open}
                onOpen={handleOpen}
                onClose={handleClose}
            />



        </>

    )
}

export default SidePanel
