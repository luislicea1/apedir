import supabase from "./client";

async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
}

async function login(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      const message = "Email o contraseña incorrectos";
      return { message: message, isValid: false };
    } else {
      const { d, err } = await supabase
        .from("profiles")
        .update([
          {
            isActive: true,
          },
        ])
        .eq("id", data.user.id)
        .select();
      return { session: data.session, message: "Login Exitoso", isValid: true };
    }
  } catch (error) {
    return { message: error.message, isValid: false };
  }
}

async function register(
  name,
  last_name,
  phone,
  email,
  password,
  confirmPassword
) {
  if (password.length < 6 || confirmPassword.length < 6) {
    return {
      message: "La contraseña tiene que tener al menos 6 caracteres",
      isValid: false,
    };
  } else if (password !== confirmPassword) {
    return { message: "Las contraseñas no coinciden", isValid: false };
  }

  try {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) return { message: error.message, isValid: false };
    else {
      const { d, error } = await supabase
        .from("profiles")
        .update([
          {
            name: name,
            last_name: last_name,
            phone_number: phone,
            email: email,
            isActive: false,
          },
        ])
        .eq("id", data.user.id)
        .select();

      return {
        message: "Revisa tu correo electrónico para confirmar tu registro.",
        isValid: true,
      };
    }
  } catch (error) {
    return { message: error.message, isValid: false };
  }
}

export { signInWithGoogle, login, register };
