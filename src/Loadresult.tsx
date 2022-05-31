import { useEffect, useRef, useReducer } from 'react';
import { getDatabase, ref, set, get, child } from "firebase/database";
import React from 'react';

export const LoadRusult = (roomid:string) => {
    const [firedata, setfiredata] = React.useState<string[]>([])
    const [load, setload] = React.useState(true)

    const [isLoading,setLoading] = React.useState(false)

    const currentFireref = useRef(firedata)

    useEffect(() => {
        if (load == true) {
            setLoading(true)
            const dbRef = ref(getDatabase());
            var varfiredata: string[]
            console.log(roomid)
            if (roomid === undefined || roomid.length < 1) {

            } else {
                get(child(dbRef, 'users/' + roomid + "/")).then((DataSnapshot) => {
                    if (DataSnapshot.exists()) {
                        // console.log(DataSnapshot.val());
                        DataSnapshot.forEach((element: any) => {
                            console.log(element.val().restrauntname)
                            if (element.val().restrauntname != undefined) {
                                firedata.push(element.val().restrauntname)
                                console.log("firedata1", firedata)

                            }
                        })
                        setfiredata(firedata)
                        setload(false)
                        console.log("firedata", firedata)
                        currentFireref.current = firedata

                        console.log("firebaseと通信")

                    } else {
                        console.log("No data available");
                    }
                }
                ).catch((error) => {

                });
                console.log("refdata", currentFireref.current)


            }
        } else {
            currentFireref.current = firedata
            setLoading(false)
            setfiredata(firedata)
        }
    }, [])
    return { isLoading,firedata }
}