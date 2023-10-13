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

    console.log({ error }, { data });
    if (error) {
      const message = "Email o contraseña incorrectos";
      return { message: message, isValid: false };
    } else
      return { session: data.session, message: "Login Exitoso", isValid: true };
  } catch (error) {
    return { message: error.message, isValid: false };
  }
}

async function register(email, password, confirmPassword) {
  console.log(email, password, confirmPassword);
  if (password !== confirmPassword) {
    const error = "Las contraseñas no coinciden";
    return error, false;
  }

  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    console.log(error);
    if (error) return error, false;
    else "Registro exitoso", true;
  } catch (error) {
    return error, false;
  }
}

export { signInWithGoogle, login, register };
