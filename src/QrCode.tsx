import QRCode from "react-qr-code";

type qr = {
    qrtext:string
}

export const QrCodeGenerater = (props: qr) => {
    return (
        <QRCode value={props.qrtext}/>
    )
}