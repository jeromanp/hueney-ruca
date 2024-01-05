import { useState, useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import Avatar from "./Avatar";
import Swal from "sweetalert2";
import { getProfileId } from "helpers/dbHelpers";

export default function Account({ session }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [userId, setUserId] = useState("");

  const successSwal = {
    title: "Perfil actualizado",
    icon: "success",
  };

  const errorSwal = {
    title: "Algo salió mal :(",
    icon: "warning",
  };

  const fatalErrorSwal = {
    title: "No pudimos cargar tu perfil",
    icon: "warning",
    confirmButtonText: "Volver",
  };

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      //console.log(await getProfileId(session.user.id));
      const { userId: profileUserId, error: profileError } = await getProfileId(
        user.id
      );
      if (profileError) {
        throw profileError;
      }

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`id,username, full_name, avatar_url`)
        .eq("id", profileUserId)
        .single();

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        setUsername(data.username);
        setFullName(data.full_name);
        setAvatarUrl(data.avatar_url);
        setUserId(data.id);
      }
    } catch (error) {
      Swal.fire(fatalErrorSwal).then(() => window.history.back());
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const changeHandler = (e) => {
    const { name, value } = e.target;

    // Validaciones de inputs
    let error = null;
    switch (name) {
      case "username":
        if (value.length > 64) {
          error = "El nombre de usuario debe tener como máximo 64 caracteres";
        } else {
          setUsername(value);
        }
        break;

      case "full_name":
        const regex = /^[^\d]*$/;
        if (!regex.test(value)) {
          error = "Por favor no ingrese numeros";
        }
        if (value.length > 96) {
          error = "El nombre completo debe tener como máximo 96 caracteres";
        } else {
          setFullName(value);
        }
        break;

      default:
        break;
    }
    setErrors({
      ...errors,
      [name]: error,
    });
  };

  async function updateProfile({ username, full_name, avatar_url }) {
    try {
      if (Object.values(errors).some((error) => error !== null)) {
        // Si hay un error, se evita hacer el submit y tira un alert vintage
        Swal.fire("Debes correjir los errores", "", "warning");
        return;
      }

      setLoading(true);

      const updates = {
        id: userId,
        username: username,
        full_name,
        avatar_url,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;
      Swal.fire(successSwal);
    } catch (error) {
      Swal.fire(errorSwal);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="pt-4 pb-4">
        <div className="border-2 rounded-3xl border-brand-light-green shadow-lg p-6">
          <h1 className="text-xl font-bold mb-4 text-brand-green">
            Bienvenido
            {username ? ` ${username}` : fullName ? ` ${fullName}` : ""}!
          </h1>
          <Avatar
            uid={userId}
            url={avatarUrl}
            size={150}
            onUpload={(url) => {
              setAvatarUrl(url);
              updateProfile({
                username,
                full_name: fullName,
                avatar_url: url,
              });
            }}
          />
          <div className="mb-2 mt-3">
            <label htmlFor="email" className="block font-bold mb-2 text-sm">
              Email
            </label>
            <input
              id="email"
              type="text"
              value={session.user.email}
              className="bg-gray-100 border-2 border-brand-light-green rounded-lg px-3 py-2 w-full text-sm"
              disabled
            />
          </div>
          <div className="mb-2">
            <label htmlFor="username" className="block font-bold mb-2 text-sm">
              Usuario
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={username || ""}
              onChange={changeHandler}
              className="bg-gray-100 border-2 border-brand-light-green rounded-lg px-3 py-2 w-full text-sm"
            />
            {errors.username && <div className="error">{errors.username}</div>}
          </div>
          <div className="mb-4">
            <label htmlFor="full_name" className="block font-bold mb-2 text-sm">
              Nombre
            </label>
            <input
              id="full_name"
              name="full_name"
              type="text"
              value={fullName || ""}
              onChange={changeHandler}
              className="bg-gray-100 border-2 border-brand-light-green rounded-lg px-3 py-2 w-full text-sm"
            />
            {errors.full_name && (
              <div className="error">{errors.full_name}</div>
            )}
          </div>

          <div className="mb-3">
            <button
              className="bg-brand-light-green text-white font-bold py-2 px-4 rounded-lg block w-full text-sm"
              onClick={() =>
                updateProfile({
                  username: username,
                  full_name: fullName,
                  avatar_url: avatarUrl,
                })
              }
              disabled={loading}
            >
              {loading ? "Cargando..." : "Actualizar"}
            </button>
          </div>

          <div>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded block w-full text-sm"
              onClick={() => supabase.auth.signOut()}
            >
              Desloguearse
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
