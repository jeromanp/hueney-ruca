import { useState, useEffect } from "react";
import { supabase } from "utils/supabase";
import Swal from "sweetalert2";

const CabinGallery = ({ id }) => {
  const urlBucket =
    "https://kwmjganrkoyleqdillhu.supabase.co/storage/v1/object/public/cabanas_gallery";

  const [files, setFiles] = useState([]);
  const [imageDeleted, setImageDeleted] = useState(false);

  // console.log(files);

  const listFiles = async () => {
    if (id) {
      try {
        const { data: files, error } = await supabase.storage
          .from("cabanas_gallery")
          .list(`${id}`);
  
        if (error) {
          console.error(error);
          return [];
        }
  
        const fileList = files.map((file) => {
          const fileUrl = `${urlBucket}/${id}/${file.name}`;
          return {
            name: file.name,
            path: fileUrl,
          };
        });
        return fileList;
      } catch (error) {
        Swal.fire(errorSwal);
        console.log(error);
      }
    }
  };

  const handleDelete = async (file) => {
    setImageDeleted(true);
    Swal.fire({
      title: "¿Desea eliminar esta imagen para siempre?",
      text: "Ya no se podrá recuperar una vez confirmado",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data, error } = await supabase.storage
          .from("cabanas_gallery")
          .remove(`${id}/${file.name}`);

        const newImages = files.filter(image => image.name !== file.name)
        const { err } = await supabase.from("rooms").update({ images: newImages }).eq("id", id)

        if (error || err) {
          console.error(error || err);
          Swal.fire({
            title: "Error!",
            text: error.message || err.message,
            icon: "warning",
          });
          return;
        }

        const newFiles = files.filter((f) => f.name !== file.name);
        setFiles(newImages);

        Swal.fire({
          title: "Se eliminó la imagen correctamente",
          icon: "success",
        });
      }
    });
  };

  useEffect(() => {
    const getFiles = async () => {
      const fileList = await listFiles();
      setFiles(fileList);
    };
    const interval = setInterval(() => {
      getFiles();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="max-w-xl">
      {id && files.length > 1 ? (
        <>
          <div className="flex flex-wrap">
            {files.map((file, index) => (
              <div key={index} className="w-1/4 md:w-1/2 p-2">
                <img
                  src={`${urlBucket}/${id}/${file.name}`}
                  alt={file.name}
                  className="max-w-full rounded-t-md shadow-sm w-full h-14 object-cover"
                  width="100px"
                  height="100px"
                />
                <button
                  onClick={() => handleDelete(file)}
                  className="w-full px-1 py-0.5 bg-red-500 text-white rounded-b-md hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>No hay imágenes en este bucket</p>
      )}
    </div>
  );
};

export default CabinGallery;
