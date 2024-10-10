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
        width: '100%',
        height: '100px',
        backgroundColor: showDrop ? '#f0f0f0' : '#fff',  // Change background color when dragging
        border: showDrop ? '2px solid #000' : '1px dashed #dcdcdc',  // Change border when dragging
        borderRadius: '10px',
        padding: '15px',
        marginBottom: '15px',
        opacity: showDrop ? 1 : 0,  // Change opacity when dragging
        transition: 'all 0.2s ease-in-out',
        cursor: showDrop ? 'pointer' : 'default',  // Change cursor style when dragging
      }}
    >
      Drop Area
    </section>
  );
}

export default DropArea;
