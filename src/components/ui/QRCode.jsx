import { useEffect, useRef } from 'react';
import QRCodeLib from 'qrcode';

export const QRCode = ({ url, size = 200, className = "" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !url) return;
    QRCodeLib.toCanvas(canvasRef.current, url, {
      width: size,
      margin: 2,
      color: { dark: '#1A1A1A', light: '#FFFFFF' },
      errorCorrectionLevel: 'M',
    });
  }, [url, size]);

  return (
    <div className={`bg-white p-6 rounded-3xl shadow-lg shadow-black/[0.03] border border-black/5 inline-block ${className}`}>
      <canvas ref={canvasRef} />
    </div>
  );
};
