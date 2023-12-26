import supabase from "./client";

const getBussiness = async (searchInput) => {
    const { data, error } = await supabase
        .from("bussiness")
        .select("*")
        .ilikeAnyOf("name, description, address, province, email", searchInput)
    return data
}


export {
    getBussiness
}



