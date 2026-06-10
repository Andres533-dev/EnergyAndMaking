// lib/supabase/Storageservice.js
import { supabase } from "./Client";

const BUCKET_NAME = 'products';

export async function uploadProductImage(file, userId) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${Date.now()}.${fileExt}`;
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, file, { cacheControl: '3600', upsert: false });
  if (error) throw error;
  const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path);
  return urlData.publicUrl;
}