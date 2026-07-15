import { useEffect, useRef } from "react";
import { useLoading } from "../../context/LoadingProvider";
import { setProgress } from "../Loading";

const Scene = () => {
  const { setLoading } = useLoading();
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let progress = setProgress((value) => setLoading(value));
    
    const finishLoading = () => {
      progress.loaded().then(() => {
        // loading complete
      });
    };

    // If the image is already complete (cached), finish loading
    if (imageRef.current?.complete) {
      setTimeout(finishLoading, 500);
    }

    return () => {
      progress.clear();
    };
  }, [setLoading]);

  return (
    <>
      <div className="character-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", position: "relative", zIndex: 10 }}>
        <img 
          ref={imageRef}
          src="/images/profile.png?v=2" 
          alt="Profile" 
          style={{ maxWidth: "100%", maxHeight: "85vh", objectFit: "contain", transform: "translateY(10vh)" }}
          onLoad={() => {
            const progress = setProgress((value) => setLoading(value));
            progress.loaded();
          }}
        />
      </div>
    </>
  );
};

export default Scene;
