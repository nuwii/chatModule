import React, { useState, useEffect } from 'react';
import { useFirebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { useSelector, useDispatch } from "react-redux";
import { Menu } from "semantic-ui-react";
import { setCurrentChannel } from "../../store/actions/channel"
import { useFirebase } from "react-redux-firebase";

const ChannelList = () => {
    useFirebaseConnect([{ path: "channels" }])
    const dispatch = useDispatch();

    var channels = useSelector((state) => state.firebase.ordered.channels);
    var [result, setResult] = useState([])
    const currentChannel = useSelector((state) => state.channels.currentChannel);
    const [mounted, setMounted] = useState(false)
    const [strings, setString] = useState("")

    useEffect(() => {
        
        console.log(strings )
        if (!mounted && !isEmpty(channels)) {
            const arr = ['-MYiAXmjTGcl13Rpd5dH', '-MYhvDsY6iV-elUHSNmM']

            console.log(result);
            arr.map((res, index) => {

                result[index] = channels.filter(word => word.key == res)
            })
        }
    })


    const setActiveChannel = channel => {

        dispatch(setCurrentChannel(channel));
    };

    if (!isLoaded(result.flat())) {
        return "Loading channels..."
    };

    if (isEmpty(result.flat())) {
        return "No channels..."
    };



    return (
        <div>
            <input type="text" onChange={e=>
                setString(e.target.value)
            } />
        <Menu.Menu>
            {result.flat() ? (
                result.flat().map(({ key, value }) => (
                    <Menu.Item
                        key={key}
                        name={value?.name}
                        as="a"
                        icon="hashtag"
                        active={currentChannel?.key === key}
                        onClick={() => setActiveChannel({ key, ...value })}
                    />
                ))
            ) : (
                "Kişi listesiniz yok"
            )}
        </Menu.Menu>
        </div>
    )
}

export default ChannelList;
