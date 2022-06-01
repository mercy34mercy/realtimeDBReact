import { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';


export const QrCodeReader = (props) => {
    const [data, setData] = useState('No result');
    const navigate = useNavigate();

    return (
        <>
            <QrReader
                constraints={{ facingMode: 'environment' }}
                onResult={(result, error) => {
                    if (!!result) {
                        setData(result?.text);
                        navigate("/app?" + String(result).split('?')[1])
                    }

                    if (!!error) {
                        console.info(error);
                    }
                }}
                style={{ width: '100%'}}
            />
            <p>{data}</p>
        </>
    );
};