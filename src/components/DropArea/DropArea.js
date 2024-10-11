import { useState } from "react";


function DropArea({ onDropTask }) {
  const [showDrop, setShowDrop] = useState(false);

  return (
    <section
      aria-label="drop-area-section"
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDrop={() => {
        onDropTask();
        setShowDrop(false);
      }}
      onDragOver={(e) => e.preventDefault()}
      style={{
        height:showDrop? '100px': '10px',
        backgroundColor: showDrop ? '#f0f0f0' : '#fff',  // Change background color when dragging
        border: showDrop ? '1px dashed #dcdcdc': 0,  // Change border when dragging
        borderRadius: '10px',
        padding: '12px',
        margin: showDrop ? '12px 0': 0,
        textAlign: 'center',
        opacity: showDrop ? 1 : 0,  // Change opacity when dragging
        transition: 'all 0.2s ease-in-out',
      }}
    >
      Drop Area
    </section>
  );
}

export default DropArea;
