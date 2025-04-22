import React, { useRef, useState } from 'react';
import SignaturePad from 'react-signature-pad-wrapper';
import Webcam from 'react-webcam';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import axios from 'axios';

export default function SignatureForm() {
  const sigRef = useRef(null);
  const webcamRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    try {
      // ✅ Get signature image
      const signatureImage = sigRef.current?.toDataURL();

      // ✅ Get webcam photo (JPEG base64)
      const webcamImage = webcamRef.current.getScreenshot();

      // ✅ Get fingerprint
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      const fingerprint = result.visitorId;

      // ✅ Get IP
      const ipResponse = await axios.get("https://api.ipify.org?format=json");
      const ip = ipResponse.data.ip;

      // ✅ Log and send data
      console.log("✅ Submitting:", {
        signatureImage,
        screenshotImage: webcamImage,
        fingerprint,
        ip
      });

      await axios.post("https://5a05-143-92-149-87.ngrok-free.app/api/signature", {
        signatureImage,
        screenshotImage: webcamImage, // real photo now!
        fingerprint,
        ip
      });

      setSubmitted(true);
    } catch (error) {
      console.error("❌ Submission error:", error);
      alert("Something went wrong during submission.");
    }
  };

  return (
    <div style={{ padding: 20, border: '1px solid #ccc', maxWidth: 700, margin: 'auto' }}>
      <h2>Demo Contract Signing</h2>
      <p>Please sign and allow your identity photo to be captured for verification.</p>

      <SignaturePad
        ref={sigRef}
        options={{ minWidth: 1, penColor: 'black' }}
        canvasProps={{
          width: 500,
          height: 150,
          style: { border: '1px solid black' }
        }}
      />

      <p><strong>Live Photo (Camera)</strong></p>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={300}
        videoConstraints={{ facingMode: "user" }}
        style={{ border: '1px solid #000', marginBottom: 10 }}
      />

      <button onClick={handleSubmit} style={{ marginTop: 20 }}>
        Submit Signature
      </button>

      {submitted && <p style={{ color: 'green' }}>Signature submitted successfully ✅</p>}
    </div>
  );
}
