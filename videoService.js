import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://gusozvtmmqdfrjtmojej.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1c296dnRtbXFkZnJqdG1vamVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzNDIyNzcsImV4cCI6MTk4MzkxODI3N30.GTjZooqbeCNs_6lz4bMstWQP40Fv7-RiKxGSOY2Ar_4"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export default function getAllVideos() {
    return supabase.from("video")
            .select("*");
}

