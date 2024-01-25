import { invoke } from "@tauri-apps/api/tauri";

export async function invoke_command(cmd, args) {
    let response = await invoke(cmd, args);
    return response;
}

