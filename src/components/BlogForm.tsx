import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import BlogModal from "./BlogModal";

export default function BlogForm() {
  const [value, setValue] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons

    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ["link", "image"],
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    ["blockquote", "code-block"],
  ];

  const module = {
    toolbar: toolbarOptions,
  };

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <div className="flex w-[90%] m-auto flex-col mt-20 justify-center items-center">
      <div>
        <ReactQuill
          theme="snow"
          modules={module}
          value={value}
          onChange={setValue}
        />
        <button onClick={openModal} className="btn w-28 mt-10 self-start">
          Save Blog
        </button>
      </div>
      {isModalOpen && (
        <BlogModal content={value} isOpen={isModalOpen} onClose={closeModal} />
      )}
    </div>
  );
}
