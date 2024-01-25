import { invoke_command } from "./sendRequest/invoke_command";

export async function convert_file(file_path, pin) {
    let result = await invoke_command("convert", { file: file_path, pin });
    return result;
}