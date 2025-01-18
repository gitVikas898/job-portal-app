import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function applyToJob(token,_,jobData) {
    const supabase = await supabaseClient(token);

    const random = Math.floor(Math.random()*9000);
    const fileName = `resume-${random}-${jobData.candidate_id};`;


  const{error : storangeError} = await supabase.storage
  .from(`resumes`)
  .upload(fileName,jobData.resume);


    if(storangeError){
        console.error("Error Uploading Resume : ",error);
        return null;
    }


    const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;

    const {data,error} = await supabase
    .from("applications")
    .insert([
        {...jobData,
            resume,
        }
    ]).select();

    if(error){
        console.error("Error Submiting Application",error);
        return null;
    }

    return data
}