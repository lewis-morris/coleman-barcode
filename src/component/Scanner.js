import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import Quagga from 'quagga';

const BarcodeScanner = () => {
    const [barcode, setBarcode] = useState('');

    const onDetected = (result) => {
        setBarcode(result.codeResult.code);
    };

    useEffect(() => {
        Quagga.init({
            inputStream: {
                type: "LiveStream",
                constraints: {
                    width: { min: 640 },
                    height: { min: 480 },
                    facingMode: "environment",
                },
                target: document.querySelector('#interactive') // Pass the ID of the video element
            },
            decoder: {
                readers: ["upc_reader", "ean_reader", "code_39_reader"] // Specify barcode types
            },
        }, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            Quagga.start();
        });

        Quagga.onDetected(onDetected);

        return () => {
            Quagga.offDetected(onDetected);
            Quagga.stop();
        };
    }, []);

    return (
        <div>
            <div id="interactive" style={{ position: 'relative' }}>
                <Webcam />
            </div>
            <div>
                <p>Scanned Barcode: {barcode}</p>
            </div>
        </div>
    );
};

export default BarcodeScanner;
