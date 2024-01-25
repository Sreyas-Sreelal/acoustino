#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod util;

use util::{do_conversion, extract_mxl_file};

#[tauri::command]
fn convert(file: &str, pin: isize) -> Result<String, String> {
    print!("file is {}", file);
    if file.ends_with(".mxl") {
        match extract_mxl_file(file) {
            Ok(path) => {
                match do_conversion(&path, pin) {
                    Ok(output) => return Ok(output),
                    Err(e) => return Err(e.to_string()),
                };
            }
            Err(e) => return Err(e.to_string()),
        }
    }
    match do_conversion(file, pin) {
        Ok(output) => Ok(output),
        Err(e) => Err(e.to_string()),
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![convert])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
