const CabinBuckets = ({ selectedFiles, setSelectedFiles }) => {

  const handleDeleteClick = (i) => {
    selectedFiles.splice(i, 1);
    setSelectedFiles([...selectedFiles]);
  }

  return (
    <div className="max-w-xl m-auto">
      <div className="flex flex-col items-center space-y-4">
        <label htmlFor="file_input" className="font-medium text-lg">
          Seleccionar imágenes:
        </label>
        <input
          type="file"
          id="file_input"
          name="file_input"
          accept=".jpg, .jpeg, .png"
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onChange={(e) => {
            setSelectedFiles([...selectedFiles, ...e.target.files]);
          }}
          multiple
        />
        {selectedFiles.length > 0 && (
          <div className="flex flex-col items-center space-y-4 w-full">
            <div className="w-full flex flex-wrap justify-center">
              {selectedFiles.map((file, index) => (
                <div key={file.name} className="flex flex-col items-center w-1/4 m-2 border rounded-lg">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Archivo seleccionado"
                    className="rounded-t-md shadow-sm w-full h-14 object-cover"
                  />
                  <button
                    onClick={() => handleDeleteClick(index)}
                    className="bg-red-500 text-white rounded-b-md hover:bg-red-600
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                  w-full"
                  >
                    Borrar
                  </button>
                </div>
              ))}
            </div>
            {/* <div className="flex w-1/2">
              <button
                onClick={handleUpload}
                className={`px-4 py-2 w-1/2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${uploading
                  ? "bg-gray-500 cursor-default"
                  : "bg-blue-500 hover:bg-blue-600"
                  } text-white`}
                disabled={uploading}
              >
                {uploading ? "Subiendo..." : "Subir"}
              </button>
              <button
                onClick={() => setSelectedFiles([])}
                className="px-4 py-2 w-1/2 bg-slate-300 text-slate-600 rounded-r-md
                hover:bg-slate-400
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancelar
              </button>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default CabinBuckets;
