import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Swal from "sweetalert2";

export default function Avatar({ uid, url, size, onUpload }) {
  const supabase = useSupabaseClient();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const errorSwal = {
    title: "No pudimos cargar tu imagen",
    icon: "warning",
  };

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error);
    }
  }

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${uid}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }
      onUpload(filePath);
    } catch (error) {
      Swal.fire(errorSwal);
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="avatar image rounded-full border-brand-light-green border-2"
          style={{ height: size, width: size }}
        />
      ) : (
        <div
          className="avatar no-image rounded-full border-brand-light-green p-2 border-2"
          style={{ height: size, width: size }}
        />
      )}
      <div style={{ width: size }}>
        <label
          className="bg-brand-light-green button primary block mt-2 text-white font-bold text-center rounded-lg text-sm pt-1.5 pb-1.5"
          htmlFor="single"
        >
          {uploading ? "Cargando..." : "Cargar"}
        </label>

        <input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
}
