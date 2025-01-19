import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function getCompanies(token) {
    const supabase = await supabaseClient(token);

    const {data,error} = await supabase
    .from("companies")
    .select("*");

    if(error){
        console.error("Error fetching Companies",error);
        return null;
    }

    return data
}

export async function addNewCompany(token,_,companyData) {
    const supabase = await supabaseClient(token);

    const random = Math.floor(Math.random() * 90000);
    const fileName = `logo-${random}-${companyData.name}`;

    const{error : storangeError} = await supabase.storage
    .from("company-logo")
    .upload(fileName,companyData.logo);

    if(storangeError){
        console.error("Error Uploading Company Logo",storangeError);
        return null;
    }

    const logo_url = `${supabaseUrl}/storage/v1/object/public/company-logo/${fileName}`



    const {data,error} = await supabase
    .from("companies")
    .insert([{
        name:companyData.name,
        logo_url,

    }])
    .select();

    if(error){
        console.error("Error Submitting Companies",error);
        return null;
    }

    return data
}