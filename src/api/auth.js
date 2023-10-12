import supabase from "./client";



async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
}

export { signInWithGoogle };
