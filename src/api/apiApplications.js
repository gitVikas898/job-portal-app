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


export async function updateApplicationStatus(token,{job_id},status) {
    const supabase = await supabaseClient(token);

    const {data,error} = await supabase
    .from("applications")
    .update({status})
    .eq("job_id",job_id)
    .select();

    if(error || data.length === 0){
        console.error("Error Updating Application Status",error);
        return null;
    }

    return data
}

export async function getApplications(token,{user_id}) {
    const supabase = await supabaseClient(token);

    const {data,error} = await supabase
    .from("applications")
    .select("*,job:jobs(title,company:companies(name))")
    .eq("candidate_id",user_id)

    if(error){
        console.error("Error Showing Applications",error);
        return null;
    }

    return data
}



export async function addNewJob(token,_,jobData) {
    const supabase = await supabaseClient(token);

    const {data,error} = await supabase
    .from("jobs")
    .insert([jobData])
    .select();

    if(error){
        console.error("Error Creating a Job",error);
        return null;
    }

    return data
}

export async function getSavedJobs(token) {
    const supabase = await supabaseClient(token);

    const {data,error} = await supabase
    .from("saved_jobs")
    .select("*,job:jobs(*,company:companies(name,logo_url))");


    if(error){
        console.error("Error Fetching Saved Jobs",error);
        return null;
    }

    return data
}


export async function getMyJobs(token,{recruiter_id}) {
    const supabase = await supabaseClient(token);

    const {data,error} = await supabase
    .from("jobs")
    .select("*,company:companies(name,logo_url)")
    .eq("recruiter_id",recruiter_id);

    if(error){
        console.error("Error Fetching Jobs",error);
        return null;
    }

    return data
}


export async function deleteJob(token,{job_id}) {
    const supabase = await supabaseClient(token);

    const {data,error} = await supabase
    .from("jobs")
    .delete()
    .eq("id",job_id)
    .select();

    if(error){
        console.error("Error Deleting Jobs",error);
        return null;
    }

    return data
}


